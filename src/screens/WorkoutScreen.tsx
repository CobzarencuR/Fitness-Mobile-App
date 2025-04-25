import React, { useCallback, useContext, useEffect, useState } from 'react'
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    ActivityIndicator,
    TouchableOpacity,
    Modal,
    Pressable,
} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useFocusEffect } from '@react-navigation/native'
import { WorkoutContext } from '../context/WorkoutContext'
import { UserContext } from '../context/UserContext'
import {
    PlanTemplates,
    ExercisePlanItem,
    PersonType,
} from '../components/WorkoutTemplates'

type SplitDay = { name: string }
const splitKeysByDays: Record<number, SplitDay[]> = {
    2: [{ name: 'Full Body' }, { name: 'Full Body' }],
    3: [{ name: 'Push' }, { name: 'Pull' }, { name: 'Legs' }],
    4: [{ name: 'Upper' }, { name: 'Lower' }, { name: 'Upper' }, { name: 'Lower' }],
    5: [{ name: 'Push' }, { name: 'Pull' }, { name: 'Legs' }, { name: 'Upper' }, { name: 'Lower' }],
    6: [{ name: 'Push' }, { name: 'Pull' }, { name: 'Legs' }, { name: 'Push' }, { name: 'Pull' }, { name: 'Legs' }],
    7: [{ name: 'Push' }, { name: 'Pull' }, { name: 'Legs' }, { name: 'Arms & Shoulders' }, { name: 'Push' }, { name: 'Pull' }, { name: 'Legs' }],
}

const TOTAL_WEEKS = 12 // 3 months × 4 weeks
const BACKEND = 'http://10.0.2.2:3000'
// Map difficulty to rank
const difficultyRank: Record<'beginner' | 'intermediate' | 'advanced', number> = {
    beginner: 1,
    intermediate: 2,
    advanced: 3,
}

export default function WorkoutScreen() {
    const { height, weight, sex, objective, trainingDays, experience, reload } = useContext(WorkoutContext)
    const { user } = useContext(UserContext)

    const [plans, setPlans] = useState<ExercisePlanItem[][][]>([])
    const [weekIndex, setWeekIndex] = useState(0)
    const [loading, setLoading] = useState(true)

    // Modal + swap state
    const [descModalVisible, setDescModalVisible] = useState(false)
    const [swapModalVisible, setSwapModalVisible] = useState(false)
    const [selectedExercise, setSelectedExercise] = useState<ExercisePlanItem | null>(null)
    const [selectedPosition, setSelectedPosition] = useState<{ day: number; index: number } | null>(null)
    const [swapList, setSwapList] = useState<ExercisePlanItem[]>([])

    // Reload metrics whenever screen focuses
    useFocusEffect(
        useCallback(() => {
            reload()
        }, [reload])
    )

    // Create the person type based on height and weight
    let personType = React.useMemo<'underweight' | 'normal' | 'overweight'>(() => {
        if (height != null && weight != null) {
            if ((height <= 160 && weight >= 80) || (height <= 170 && weight >= 90)) {
                return 'overweight'
            }
            if ((height >= 180 && weight <= 60) || (height >= 190 && weight <= 65)) {
                return 'underweight'
            }
        }
        return 'normal'
    }, [height, weight])

    // Fetch always from server or regenerate on split/experience mismatch
    useEffect(() => {
        let isActive = true

        async function loadPlan() {
            setLoading(true)
            if (!user?.username || !sex || !objective || !trainingDays || !experience) {
                setPlans([])
                setLoading(false)
                return
            }
            const userRank = difficultyRank[experience]
            const key = `workoutPlan:${user.username}`

            // 1) Try server
            let serverPlan: ExercisePlanItem[][][] | null = null
            try {
                const res = await fetch(
                    `${BACKEND}/getWorkoutPlan?username=${encodeURIComponent(user.username)}`
                )
                const contentType = res.headers.get('content-type') || ''
                if (res.ok && contentType.includes('application/json')) {
                    const { plan } = await res.json()
                    serverPlan = Array.isArray(plan) ? plan : null
                } else {
                    await res.text() // drain
                }
            } catch {
                // network error
            }

            // Validate serverPlan: correct split & difficulty
            const validServerPlan = serverPlan && Array.isArray(serverPlan[0]) &&
                serverPlan[0].length === trainingDays &&
                !serverPlan.some(week =>
                    week.some(day =>
                        day.some(ex => difficultyRank[ex.difficulty] > userRank)
                    )
                )

            if (validServerPlan && isActive) {
                setPlans(serverPlan!)  // trust server
                setLoading(false)
                return
            }

            // 2) Generate fresh template
            const tpl = PlanTemplates[experience]?.[personType]?.[trainingDays] ?? splitKeysByDays[trainingDays].map(() => [])
            const fresh = Array.from({ length: TOTAL_WEEKS }, () => tpl.map(day => day.map(ex => ({ ...ex }))))
            if (isActive) setPlans(fresh)

            // Persist new plan locally & remotely
            AsyncStorage.setItem(key, JSON.stringify(fresh)).catch(() => { })
            fetch(`${BACKEND}/saveWorkoutPlan`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username: user.username, plan: fresh }),
            }).catch(() => { })

            setLoading(false)
        }

        loadPlan()
        return () => { isActive = false }
    }, [user?.username, sex, objective, trainingDays, experience, personType])

    // Swap handler: replace only selected instance
    const doSwap = async (newEx: ExercisePlanItem) => {
        if (!user?.username || !selectedPosition) return
        const { day, index } = selectedPosition
        const updated = plans.map((week, wIdx) =>
            wIdx === weekIndex ?
                week.map((dayExs, dIdx) =>
                    dIdx === day ?
                        dayExs.map((ex, exIdx) =>
                            exIdx === index ? { ...newEx, sets: ex.sets, reps: ex.reps, weight: ex.weight } : ex
                        ) : dayExs
                ) : week
        )
        setPlans(updated)
        setSwapModalVisible(false)
        const key = `workoutPlan:${user.username}`
        AsyncStorage.setItem(key, JSON.stringify(updated)).catch(() => { })
        fetch(`${BACKEND}/saveWorkoutPlan`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: user.username, plan: updated }),
        }).catch(() => { })
    }

    // Capture position and filter swaps by allowed difficulties
    const onExerciseLongPress = async (ex: ExercisePlanItem, dayIdx: number, exIdx: number) => {
        setSelectedExercise(ex)
        setSelectedPosition({ day: dayIdx, index: exIdx })
        try {
            const res = await fetch(
                `${BACKEND}/getExercisesByPrimaryMuscle?muscles=${encodeURIComponent(ex.primary_muscle_group)}`
            )
            const list = (await res.json()) as ExercisePlanItem[]
            const userRank = difficultyRank[experience as keyof typeof difficultyRank]
            const filtered = list.filter(e =>
                difficultyRank[e.difficulty] <= userRank && e.name !== ex.name
            )
            setSwapList(filtered)
        } catch {
            setSwapList([])
        }
        setSwapModalVisible(true)
    }

    if (loading) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" />
            </View>
        )
    }

    // Render with pagination
    const atStart = weekIndex === 0
    const atEnd = weekIndex === TOTAL_WEEKS - 1
    const month = Math.floor(weekIndex / 4) + 1
    const weekOfMon = (weekIndex % 4) + 1
    const dayTemplates = splitKeysByDays[trainingDays!] || []
    const currentPlan = plans[weekIndex] || dayTemplates.map(() => [])

    return (
        <View style={styles.container}>
            <View style={styles.weekNav}>
                <TouchableOpacity disabled={atStart} onPress={() => setWeekIndex(idx => Math.max(0, idx - 1))}>
                    <Text style={[styles.arrow, atStart && styles.arrowDisabled]}>‹</Text>
                </TouchableOpacity>
                <Text style={styles.weekLabel}>Month {month} Week {weekOfMon}</Text>
                <TouchableOpacity disabled={atEnd} onPress={() => setWeekIndex(idx => Math.min(TOTAL_WEEKS - 1, idx + 1))}>
                    <Text style={[styles.arrow, atEnd && styles.arrowDisabled]}>›</Text>
                </TouchableOpacity>
            </View>
            <Text style={styles.header}>{trainingDays}-Day Split — {user?.username}</Text>
            <FlatList
                data={dayTemplates}
                keyExtractor={(_, i) => i.toString()}
                renderItem={({ item, index: dayIdx }) => (
                    <View style={styles.dayBox}>
                        <Text style={styles.dayLabel}>Day {dayIdx + 1}: {item.name}</Text>
                        {currentPlan[dayIdx]?.map((ex, exIdx) => (
                            <TouchableOpacity
                                key={`${dayIdx}-${exIdx}`}
                                onPress={() => { setSelectedExercise(ex); setSelectedPosition({ day: dayIdx, index: exIdx }); setDescModalVisible(true) }}
                                onLongPress={() => onExerciseLongPress(ex, dayIdx, exIdx)}
                                style={styles.exItem}
                            >
                                <Text style={styles.exName}>{ex.name}</Text>
                                <Text style={styles.exDetails}>{ex.sets}×{ex.reps} @ {ex.weight}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                )}
            />

            {/* Description Modal */}
            <Modal visible={descModalVisible} transparent animationType="slide" onRequestClose={() => setDescModalVisible(false)}>
                <View style={styles.modalOverlay}>
                    <View style={styles.modalBox}>
                        <Text style={styles.modalTitle}>{selectedExercise?.name}</Text>
                        <Text>Equipment: {selectedExercise?.equipment}</Text>
                        <Text>Primary: {selectedExercise?.primary_muscle_group}</Text>
                        {selectedExercise?.secondary_muscle_group && (<Text>Secondary: {selectedExercise.secondary_muscle_group}</Text>)}
                        {selectedExercise?.tertiary_muscle_group && (<Text>Tertiary: {selectedExercise.tertiary_muscle_group}</Text>)}
                        <Pressable onPress={() => setDescModalVisible(false)} style={styles.closeBtn}>
                            <Text style={styles.closeText}>Close</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>

            {/* Swap Modal */}
            <Modal visible={swapModalVisible} transparent animationType="slide" onRequestClose={() => setSwapModalVisible(false)}>
                <View style={styles.modalOverlay}>
                    <View style={styles.modalBox}>
                        <Text style={styles.modalTitle}>Swap “{selectedExercise?.name}” for:</Text>
                        <FlatList
                            data={swapList}
                            keyExtractor={(e, idx) => `${e.name}-${idx}`}
                            renderItem={({ item }) => (
                                <Pressable onPress={() => doSwap(item)} style={styles.swapOption}>
                                    <Text>{item.name}</Text>
                                </Pressable>
                            )}
                        />
                        <Pressable onPress={() => setSwapModalVisible(false)} style={styles.closeBtn}>
                            <Text style={styles.closeText}>Cancel</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    container: { flex: 1, padding: 16, backgroundColor: '#fff' },
    weekNav: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
    arrow: { fontSize: 28, width: 32, textAlign: 'center' },
    arrowDisabled: { color: '#ccc' },
    weekLabel: { fontSize: 16, fontWeight: '600' },
    header: { fontSize: 20, fontWeight: 'bold', marginBottom: 12, textAlign: 'center' },
    dayBox: { marginBottom: 20, padding: 12, backgroundColor: '#f0f4f7', borderRadius: 8 },
    dayLabel: { fontSize: 18, fontWeight: '600', marginBottom: 8 },
    exItem: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
    exName: { fontSize: 16, flex: 1 },
    exDetails: { fontSize: 14, textAlign: 'right' },
    modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center' },
    modalBox: { margin: 20, backgroundColor: 'white', borderRadius: 8, padding: 16 },
    modalTitle: { fontSize: 18, fontWeight: '600', marginBottom: 8 },
    swapOption: { padding: 12, borderBottomWidth: 1, borderColor: '#eee' },
    closeBtn: { marginTop: 12, padding: 10, borderRadius: 5, alignItems: 'center', backgroundColor: '#ddd' },
    closeText: { fontSize: 16 },
})