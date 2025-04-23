import React, { useCallback, useContext, useEffect, useState } from 'react'
import { View, Text, FlatList, StyleSheet, ActivityIndicator, TouchableOpacity, Modal, Pressable } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useFocusEffect } from '@react-navigation/native'
import { WorkoutContext } from '../context/WorkoutContext'
import { UserContext } from '../context/UserContext'
import { PlanTemplates, ExercisePlanItem } from '../components/WorkoutTemplates'

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

export default function WorkoutScreen() {
    const { sex, objective, trainingDays, reload } = useContext(WorkoutContext)
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

    // Fetch always from server, fallback to template
    useEffect(() => {
        let isActive = true
        async function loadPlan() {
            setLoading(true)
            if (!user?.username || !sex || !objective || !trainingDays) {
                setPlans([])
                setLoading(false)
                return
            }

            const key = `workoutPlan:${user.username}`
            try {
                const res = await fetch(
                    `${BACKEND}/getWorkoutPlan?username=${encodeURIComponent(user.username)}`
                )
                const contentType = res.headers.get('content-type') || ''
                if (res.ok && contentType.includes('application/json')) {
                    const json = await res.json()
                    if (isActive) {
                        if (json.plan) {
                            setPlans(json.plan)
                        } else {
                            const tpl = PlanTemplates[objective]?.[sex]?.[trainingDays] ?? splitKeysByDays[trainingDays].map(() => [])
                            const all = Array.from({ length: TOTAL_WEEKS }, () => tpl.map(day => day.map(ex => ({ ...ex }))))
                            setPlans(all)
                            // persist new template
                            fetch(`${BACKEND}/saveWorkoutPlan`, {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({ username: user.username, plan: all }),
                            }).catch()
                            AsyncStorage.setItem(key, JSON.stringify(all)).catch()
                        }
                        setLoading(false)
                        return
                    }
                } else {
                    const text = await res.text()
                    console.warn(`getWorkoutPlan returned status ${res.status}: ${text}`)
                }
            } catch (e) {
                console.warn('Server fetch failed, loading template.', e)
            }

            if (isActive) {
                const tpl = PlanTemplates[objective]?.[sex]?.[trainingDays] ?? splitKeysByDays[trainingDays].map(() => [])
                const all = Array.from({ length: TOTAL_WEEKS }, () => tpl.map(day => day.map(ex => ({ ...ex }))))
                setPlans(all)
                setLoading(false)
            }
        }

        loadPlan()
        return () => { isActive = false }
    }, [user?.username, sex, objective, trainingDays])

    // Swap handler: only replace the selected instance
    const doSwap = async (newEx: ExercisePlanItem) => {
        if (!user?.username || !selectedPosition) return
        const { day, index } = selectedPosition
        const updated = plans.map((week, wIdx) =>
            wIdx === weekIndex
                ? week.map((dayExs, dIdx) =>
                    dIdx === day
                        ? dayExs.map((ex, exIdx) =>
                            exIdx === index
                                ? { ...newEx, sets: ex.sets, reps: ex.reps, weight: ex.weight }
                                : ex
                        )
                        : dayExs
                )
                : week
        )
        setPlans(updated)
        setSwapModalVisible(false)

        const key = `workoutPlan:${user.username}`
        AsyncStorage.setItem(key, JSON.stringify(updated)).catch()
        fetch(`${BACKEND}/saveWorkoutPlan`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: user.username, plan: updated }),
        }).catch(e => console.error('Swap save failed:', e))
    }

    // Capture both exercise and its position on long press
    const onExerciseLongPress = async (ex: ExercisePlanItem, dayIdx: number, exIdx: number) => {
        setSelectedExercise(ex)
        setSelectedPosition({ day: dayIdx, index: exIdx })
        try {
            const res = await fetch(
                `${BACKEND}/getExercisesByPrimaryMuscle?muscles=${encodeURIComponent(ex.primary_muscle_group)}`
            )
            const list = (await res.json()) as ExercisePlanItem[]
            setSwapList(list.filter(e => e.difficulty === ex.difficulty && e.name !== ex.name))
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

    // Pagination and rendering
    const atStart = weekIndex === 0
    const atEnd = weekIndex === TOTAL_WEEKS - 1
    const month = Math.floor(weekIndex / 4) + 1
    const weekOfMon = (weekIndex % 4) + 1
    const dayTemplates = splitKeysByDays[trainingDays!] || []
    const currentPlan = plans[weekIndex] || dayTemplates.map(() => [])

    return (
        <View style={styles.container}>
            <View style={styles.weekNav}>
                <TouchableOpacity disabled={atStart} onPress={() => !atStart && setWeekIndex(weekIndex - 1)}>
                    <Text style={[styles.arrow, atStart && styles.arrowDisabled]}>‹</Text>
                </TouchableOpacity>
                <Text style={styles.weekLabel}>Month {month} Week {weekOfMon}</Text>
                <TouchableOpacity disabled={atEnd} onPress={() => !atEnd && setWeekIndex(weekIndex + 1)}>
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
                        <Text>Equip: {selectedExercise?.equipment}</Text>
                        <Text>Primary: {selectedExercise?.primary_muscle_group}</Text>
                        {selectedExercise?.secondary_muscle_group && (<Text>Secondary: {selectedExercise.secondary_muscle_group}</Text>)}
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