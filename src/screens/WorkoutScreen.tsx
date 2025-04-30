import React, { useCallback, useContext, useEffect, useState, useMemo } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, TouchableOpacity, Modal, Pressable } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { WorkoutContext } from '../context/WorkoutContext';
import { UserContext } from '../context/UserContext';
import { PlanTemplates, PersonType } from '../components/WorkoutTemplates';
import { WebView } from 'react-native-webview';
import type { ExercisePlanItem } from '../components/WorkoutTemplates';

const TOTAL_WEEKS = 12;
const BACKEND_URL = 'http://localhost:3000';
const difficultyRank = { beginner: 1, intermediate: 2, advanced: 3 };
const splitSchedule = {
    2: ['Full Body', 'Full Body'],
    3: ['Push', 'Pull', 'Legs'],
    4: ['Upper', 'Lower', 'Upper', 'Lower'],
    5: ['Push', 'Pull', 'Legs', 'Upper', 'Lower'],
    6: ['Push', 'Pull', 'Legs', 'Push', 'Pull', 'Legs'],
    7: ['Push', 'Pull', 'Legs', 'Arms & Shoulders', 'Push', 'Pull', 'Legs'],
};

// Helpers
function classifyPersonType(height: number, weight: number): PersonType {
    if ((height <= 160 && weight >= 80) || (height <= 170 && weight >= 90)) return 'overweight';
    if ((height >= 180 && weight <= 60) || (height >= 190 && weight <= 65)) return 'underweight';
    return 'normal';
}

async function fetchExerciseDetail(name: string) {
    const res = await fetch(`${BACKEND_URL}/getExerciseDetail?name=${encodeURIComponent(name)}`);
    if (!res.ok) throw new Error('Failed to load exercise detail');
    return res.json();
}

async function fetchServerPlan(username: string) {
    const res = await fetch(`${BACKEND_URL}/getWorkoutPlan?username=${encodeURIComponent(username)}`);
    if (!res.ok) return null;
    const data = await res.json();
    return data.plan;
}

function extractUniqueNames(plan: any[][][]) {
    return Array.from(new Set(plan.flat(2).map((item: any) => item.name)));
}

async function rehydratePlan(
    minimalPlan: any[][][],
    experience: 'beginner' | 'intermediate' | 'advanced'
) {
    const flatNames = extractUniqueNames(minimalPlan);
    const res = await fetch(`${BACKEND_URL}/getExercisesByNames`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ names: flatNames }),
    });
    if (!res.ok) return null;
    const details: ExercisePlanItem[] = await res.json();
    const detailMap = new Map(details.map((d) => [d.name, d]));
    const expectedSets = experience === 'beginner' ? 3 : 4;

    // if first item matches sets, rehydrate
    const first = minimalPlan[0]?.[0]?.[0];
    if (first?.sets !== expectedSets) return null;

    return minimalPlan.map((week) =>
        week.map((day) =>
            day.map((item: any) => {
                const detail = detailMap.get(item.name)!;
                return { ...detail, sets: item.sets, reps: item.reps, weight: item.weight };
            })
        )
    );
}

async function generateFreshPlan(
    experience: 'beginner' | 'intermediate' | 'advanced',
    personType: PersonType,
    trainingDays: number
) {
    const template = PlanTemplates[experience][personType][trainingDays] || [];
    const uniqueNames = Array.from(new Set(template.flat()));

    const res = await fetch(`${BACKEND_URL}/getExercisesByNames`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ names: uniqueNames }),
    });
    const details: ExercisePlanItem[] = res.ok ? await res.json() : [];
    const detailMap = new Map(details.map((d) => [d.name, d]));

    return Array.from({ length: TOTAL_WEEKS }, (_, weekIdx) => {
        const monthOffset = Math.floor(weekIdx / 4);
        return template.map((dayNames) =>
            dayNames.map((name) => {
                const base = detailMap.get(name)!;
                const sets = experience === 'beginner' ? 3 : 4;
                const reps = (base.movement === 'compound' ? 8 : 10) + monthOffset;
                return { ...base, sets, reps, weight: 'TBD' };
            })
        );
    });
}

export default function WorkoutScreen() {
    const { height, weight, sex, objective, trainingDays, experience, reload } = useContext(WorkoutContext);
    const { user } = useContext(UserContext);

    const [plans, setPlans] = useState<ExercisePlanItem[][][]>([]);
    const [weekIndex, setWeekIndex] = useState(0);
    const [loading, setLoading] = useState(true);

    const [descVisible, setDescVisible] = useState(false);
    const [swapVisible, setSwapVisible] = useState(false);
    const [selectedEx, setSelectedEx] = useState<ExercisePlanItem | null>(null);
    const [modalDay, setModalDay] = useState<number | null>(null);
    const [modalIdx, setModalIdx] = useState<number | null>(null);
    const [swapOptions, setSwapOptions] = useState<ExercisePlanItem[]>([]);
    const [exDetail, setExDetail] = useState<ExercisePlanItem | null>(null);

    const personType = useMemo(() => {
        if (height !== null && weight !== null) {
            return classifyPersonType(height, weight);
        }
        return 'normal';
    }, [height, weight]);

    const dayLabels = splitSchedule[trainingDays! as keyof typeof splitSchedule] || [];
    const currentWeek = plans[weekIndex] || [];
    const atStart = weekIndex === 0;
    const atEnd = weekIndex === TOTAL_WEEKS - 1;
    const monthNum = Math.floor(weekIndex / 4) + 1;
    const weekNum = (weekIndex % 4) + 1;

    // Reload on focus
    useFocusEffect(useCallback(() => { reload(); }, [reload]));

    // Fetch fresh detail when opening description modal
    useEffect(() => {
        if (descVisible && selectedEx) {
            fetchExerciseDetail(selectedEx.name)
                .then(setExDetail)
                .catch(() => setExDetail(null));
        } else {
            setExDetail(null);
        }
    }, [descVisible, selectedEx]);

    // Load or regenerate plan when dependencies change
    useEffect(() => {
        let isActive = true;

        async function loadPlan() {
            if (!user?.username || !sex || !objective || !trainingDays || !experience) {
                setPlans([]);
                setLoading(false);
                return;
            }

            setLoading(true);
            const metaKey = `workoutMeta:${user.username}`;
            const planKey = `workoutPlan:${user.username}`;

            // Check stored metadata
            let useSaved = false;
            try {
                const rawMeta = await AsyncStorage.getItem(metaKey);
                const meta = rawMeta ? JSON.parse(rawMeta) : {};
                useSaved = (
                    meta.experience === experience &&
                    meta.personType === personType &&
                    meta.trainingDays === trainingDays
                );
            } catch { }

            // Try rehydrate saved plan
            let loaded = null;
            if (useSaved) {
                const serverPlan = await fetchServerPlan(user.username);
                loaded = serverPlan
                    ? await rehydratePlan(serverPlan, experience)
                    : null;
                if (loaded) {
                    setPlans(loaded);
                    setLoading(false);
                    return;
                }
            }

            // Otherwise generate fresh
            const freshPlan = await generateFreshPlan(experience, personType, trainingDays!);
            if (!isActive) return;
            setPlans(freshPlan);
            setLoading(false);

            // Persist minimal and metadata
            const minimal = freshPlan.map(week => week.map(day => day.map(({ name, sets, reps, weight }) => ({ name, sets, reps, weight }))));
            AsyncStorage.setItem(planKey, JSON.stringify(minimal));
            AsyncStorage.setItem(metaKey, JSON.stringify({ experience, personType, trainingDays }));
            fetch(`${BACKEND_URL}/saveWorkoutPlan`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username: user.username, plan: minimal }),
            }).catch(() => { });
        }

        loadPlan();
        return () => { isActive = false; };
    }, [user?.username, sex, objective, trainingDays, experience, personType]);

    // Swap exercise
    const handleLongPress = async (ex: ExercisePlanItem, day: number, idx: number) => {
        setSelectedEx(ex);
        setModalDay(day);
        setModalIdx(idx);
        try {
            const res = await fetch(
                `${BACKEND_URL}/getExercisesByPrimaryMuscle?muscles=${encodeURIComponent(ex.primary_muscle_group)}`
            );
            const list: ExercisePlanItem[] = await res.json();
            const maxRank = difficultyRank[experience!];
            setSwapOptions(list.filter(e =>
                e.name !== ex.name &&
                e.movement === ex.movement &&
                e.primary_muscle_group === ex.primary_muscle_group &&
                difficultyRank[e.difficulty] <= maxRank
            ));
        } catch {
            setSwapOptions([]);
        }
        setSwapVisible(true);
    };

    const applySwap = (newEx: ExercisePlanItem) => {
        if (modalDay === null || modalIdx === null || !selectedEx) return;
        const updated = plans.map((week, w) =>
            w === weekIndex
                ? week.map((day, d) =>
                    d === modalDay
                        ? day.map((e, i) => i === modalIdx ? { ...newEx, sets: e.sets, reps: e.reps, weight: e.weight } : e)
                        : day
                )
                : week
        );
        setPlans(updated);
        setSwapVisible(false);
        // persist swap
        const minimal = updated.map(w => w.map(d => d.map(({ name, sets, reps, weight }) => ({ name, sets, reps, weight }))));
        AsyncStorage.setItem(
            `workoutPlan:${user!.username}`,
            JSON.stringify(minimal)
        );
        fetch(`${BACKEND_URL}/saveWorkoutPlan`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: user!.username, plan: minimal }),
        }).catch(() => { });
    };

    if (loading) return (
        <View style={styles.center}><ActivityIndicator size="large" /></View>
    );

    return (
        <View style={styles.container}>
            {/* Navigation */}
            <View style={styles.weekNav}>
                <TouchableOpacity disabled={atStart} onPress={() => setWeekIndex(i => Math.max(0, i - 1))}>
                    <Text style={[styles.arrow, atStart && styles.disabled]}>‹</Text>
                </TouchableOpacity>
                <Text style={styles.weekLabel}>Month {monthNum} Week {weekNum}</Text>
                <TouchableOpacity disabled={atEnd} onPress={() => setWeekIndex(i => Math.min(TOTAL_WEEKS - 1, i + 1))}>
                    <Text style={[styles.arrow, atEnd && styles.disabled]}>›</Text>
                </TouchableOpacity>
            </View>

            <Text style={styles.header}>{trainingDays}-Day Split</Text>

            <FlatList
                data={dayLabels}
                keyExtractor={(_, i) => String(i)}
                renderItem={({ item, index }) => (
                    <View style={styles.dayBox}>
                        <Text style={styles.dayLabel}>Day {index + 1}: {item}</Text>
                        {(currentWeek[index] || []).map((ex, idx) => (
                            <TouchableOpacity
                                key={ex.name + idx}
                                style={styles.exerciseRow}
                                onPress={() => { setSelectedEx(ex); setDescVisible(true); }}
                                onLongPress={() => handleLongPress(ex, index, idx)}
                            >
                                <Text style={styles.exerciseName}>{ex.name}</Text>
                                <Text style={styles.exerciseDetails}>{ex.sets}×{ex.reps} @ {ex.weight}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                )}
            />

            {/* Detail Modal */}
            <Modal visible={descVisible} transparent animationType="slide" onRequestClose={() => setDescVisible(false)}>
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>{exDetail?.name}</Text>
                        <Text>Equipment: {exDetail?.equipment}</Text>
                        <Text>Primary muscle: {exDetail?.primary_muscle_group}</Text>
                        {exDetail?.secondary_muscle_group && <Text>Secondary muscle: {exDetail.secondary_muscle_group}</Text>}
                        {exDetail?.tertiary_muscle_group && <Text>Tertiary muscle: {exDetail.tertiary_muscle_group}</Text>}
                        {exDetail?.video_url
                            ? <View style={styles.videoBox}>
                                <WebView
                                    source={{ uri: exDetail.video_url }}
                                    javaScriptEnabled
                                    domStorageEnabled
                                />
                            </View>
                            : <Text style={styles.videoText}>
                                No video available for this exercise
                            </Text>
                        }
                        <Pressable style={styles.closeBtn} onPress={() => setDescVisible(false)}>
                            <Text style={styles.closeText}>Close</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>

            {/* Swap Modal */}
            <Modal visible={swapVisible} transparent animationType="slide" onRequestClose={() => setSwapVisible(false)}>
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Swap “{selectedEx?.name}” for:</Text>
                        <FlatList
                            data={swapOptions}
                            keyExtractor={(e, i) => e.name + i}
                            renderItem={({ item }) => (
                                <Pressable style={styles.swapOption} onPress={() => applySwap(item)}>
                                    <Text>{item.name}</Text>
                                </Pressable>
                            )}
                        />
                        <Pressable style={styles.closeBtn} onPress={() => setSwapVisible(false)}>
                            <Text style={styles.closeText}>Cancel</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    container: { flex: 1, padding: 16, backgroundColor: '#fff' },
    weekNav: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
    arrow: { fontSize: 28, width: 32, textAlign: 'center' },
    disabled: { color: '#ccc' },
    weekLabel: { fontSize: 16, fontWeight: '600' },
    header: { fontSize: 20, fontWeight: 'bold', marginBottom: 12, textAlign: 'center' },
    dayBox: { marginBottom: 20, padding: 12, backgroundColor: '#f0f4f7', borderRadius: 8 },
    dayLabel: { fontSize: 18, fontWeight: '600', marginBottom: 8 },
    exerciseRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
    exerciseName: { fontSize: 16, flex: 1 },
    exerciseDetails: { fontSize: 14, textAlign: 'right' },
    videoBox: { width: '100%', aspectRatio: 16 / 9, marginTop: 12 },
    videoText: { marginTop: 12, fontStyle: 'italic' },
    modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center' },
    modalContent: { margin: 20, backgroundColor: 'white', borderRadius: 8, padding: 16 },
    modalTitle: { fontSize: 18, fontWeight: '600', marginBottom: 8 },
    swapOption: { padding: 12, borderBottomWidth: 1, borderColor: '#eee' },
    closeBtn: { marginTop: 12, padding: 10, borderRadius: 5, alignItems: 'center', backgroundColor: '#ddd' },
    closeText: { fontSize: 16 },
});
