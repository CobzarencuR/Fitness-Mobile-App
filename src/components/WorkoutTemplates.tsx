export interface ExercisePlanItem {
    name: string;
    difficulty: 'beginner' | 'intermediate' | 'advanced';
    equipment: string;
    movement: string;
    primary_muscle_group: string;
    secondary_muscle_group: string | null;
    tertiary_muscle_group: string | null;
    sets: number;
    reps: number;
    weight: string;
}

export type PersonType = 'underweight' | 'normal' | 'overweight'

export const PlanTemplates: Record<'lose' | 'maintain' | 'gain', Record<'beginner' | 'intermediate' | 'advanced', Record<PersonType, Record<number, ExercisePlanItem[][]>>>
> = {
    lose: {
        beginner: {
            underweight: {},
            normal: {
                2: [
                    [{ name: 'Squats', difficulty: 'beginner', equipment: 'barbell', movement: 'compound', primary_muscle_group: 'quads', secondary_muscle_group: 'hamstrings', tertiary_muscle_group: 'glutes', sets: 3, reps: 10, weight: 'TBD' }, { name: 'Leg Press', difficulty: 'beginner', equipment: 'machine', movement: 'compound', primary_muscle_group: 'quads', secondary_muscle_group: 'hamstrings', tertiary_muscle_group: 'glutes', sets: 3, reps: 10, weight: 'TBD' }, { name: 'Low Row', difficulty: 'beginner', equipment: 'machine', movement: 'compound', primary_muscle_group: 'middleback', secondary_muscle_group: 'biceps', tertiary_muscle_group: null, sets: 3, reps: 10, weight: 'TBD' }, { name: 'Lat Pulldown', difficulty: 'beginner', equipment: 'machine', movement: 'compound', primary_muscle_group: 'lats', secondary_muscle_group: 'biceps', tertiary_muscle_group: null, sets: 3, reps: 10, weight: 'TBD' }, { name: 'Dumbbell Bench Press', difficulty: 'beginner', equipment: 'dumbbell', movement: 'compound', primary_muscle_group: 'chest', secondary_muscle_group: 'triceps', tertiary_muscle_group: 'shoulders', sets: 3, reps: 10, weight: 'TBD' }, { name: 'Incline Dumbbell Press', difficulty: 'intermediate', equipment: 'dumbbell', movement: 'compound', primary_muscle_group: 'upperchest', secondary_muscle_group: 'shoulders', tertiary_muscle_group: 'triceps', sets: 3, reps: 10, weight: 'TBD' }],
                    [{ name: 'Squats', difficulty: 'beginner', equipment: 'barbell', movement: 'compound', primary_muscle_group: 'quads', secondary_muscle_group: 'hamstrings', tertiary_muscle_group: 'glutes', sets: 3, reps: 10, weight: 'TBD' }, { name: 'Leg Press', difficulty: 'beginner', equipment: 'machine', movement: 'compound', primary_muscle_group: 'quads', secondary_muscle_group: 'hamstrings', tertiary_muscle_group: 'glutes', sets: 3, reps: 10, weight: 'TBD' }, { name: 'Cable Row', difficulty: 'beginner', equipment: 'machine', movement: 'compound', primary_muscle_group: 'middleback', secondary_muscle_group: 'biceps', tertiary_muscle_group: null, sets: 3, reps: 10, weight: 'TBD' }, { name: 'Lat Pulldown', difficulty: 'beginner', equipment: 'machine', movement: 'compound', primary_muscle_group: 'lats', secondary_muscle_group: 'biceps', tertiary_muscle_group: null, sets: 3, reps: 10, weight: 'TBD' }, { name: 'Dumbbell Bench Press', difficulty: 'beginner', equipment: 'dumbbell', movement: 'compound', primary_muscle_group: 'chest', secondary_muscle_group: 'triceps', tertiary_muscle_group: 'shoulders', sets: 3, reps: 10, weight: 'TBD' }, { name: 'Incline Dumbbell Press', difficulty: 'intermediate', equipment: 'dumbbell', movement: 'compound', primary_muscle_group: 'upperchest', secondary_muscle_group: 'shoulders', tertiary_muscle_group: 'triceps', sets: 3, reps: 10, weight: 'TBD' }]
                ],
                3: [
                    [{ name: 'Barbell Bench Press', difficulty: 'beginner', equipment: 'barbell', movement: 'compound', primary_muscle_group: 'chest', secondary_muscle_group: 'triceps', tertiary_muscle_group: 'shoulders', sets: 3, reps: 10, weight: 'TBD' }, { name: 'Incline Dumbbell Press', difficulty: 'intermediate', equipment: 'dumbbell', movement: 'compound', primary_muscle_group: 'upperchest', secondary_muscle_group: 'shoulders', tertiary_muscle_group: 'triceps', sets: 3, reps: 10, weight: 'TBD' }, { name: 'Cable Chest Flys', difficulty: 'beginner', equipment: 'cable', movement: 'isolation', primary_muscle_group: 'rearshoulders', secondary_muscle_group: null, tertiary_muscle_group: null, sets: 3, reps: 10, weight: 'TBD' }, { name: 'Lateral Raises', difficulty: 'beginner', equipment: 'dumbbell', movement: 'isolation', primary_muscle_group: 'lateralshoulders', secondary_muscle_group: null, tertiary_muscle_group: null, sets: 3, reps: 12, weight: 'TBD' }, { name: 'Tricep Pushdowns', difficulty: 'beginner', equipment: 'cable', movement: 'isolation', primary_muscle_group: 'lateraltriceps', secondary_muscle_group: null, tertiary_muscle_group: null, sets: 3, reps: 12, weight: 'TBD' }, { name: 'Incline Dumbbell Skull Crushers', difficulty: 'beginner', equipment: 'dumbbell', movement: 'isolation', primary_muscle_group: 'longtriceps', secondary_muscle_group: null, tertiary_muscle_group: null, sets: 3, reps: 12, weight: 'TBD' }],
                    [{ name: 'Pull-ups', difficulty: 'beginner', equipment: 'bodyweight', movement: 'compound', primary_muscle_group: 'lats', secondary_muscle_group: 'biceps', tertiary_muscle_group: null, sets: 3, reps: 10, weight: 'TBD' }, { name: 'Cable Row', difficulty: 'beginner', equipment: 'machine', movement: 'compound', primary_muscle_group: 'middleback', secondary_muscle_group: 'biceps', tertiary_muscle_group: null, sets: 3, reps: 10, weight: 'TBD' }, { name: 'Lat Pulldown', difficulty: 'beginner', equipment: 'machine', movement: 'compound', primary_muscle_group: 'lats', secondary_muscle_group: 'biceps', tertiary_muscle_group: null, sets: 3, reps: 10, weight: 'TBD' }, { name: 'Cable Cross', difficulty: 'beginner', equipment: 'cable', movement: 'isolation', primary_muscle_group: 'rearshoulders', secondary_muscle_group: null, tertiary_muscle_group: null, sets: 3, reps: 10, weight: 'TBD' }, { name: 'Bicep Curls', difficulty: 'beginner', equipment: 'dumbbell', movement: 'isolation', primary_muscle_group: 'biceps', secondary_muscle_group: null, tertiary_muscle_group: null, sets: 3, reps: 12, weight: 'TBD' }, { name: 'Hammer Curls', difficulty: 'beginner', equipment: 'dumbbell', movement: 'isolation', primary_muscle_group: 'brachialis', secondary_muscle_group: null, tertiary_muscle_group: null, sets: 3, reps: 12, weight: 'TBD' }],
                    [{ name: 'Squats', difficulty: 'beginner', equipment: 'barbell', movement: 'compound', primary_muscle_group: 'quads', secondary_muscle_group: 'hamstrings', tertiary_muscle_group: 'glutes', sets: 3, reps: 10, weight: 'TBD' }, { name: 'Leg Press', difficulty: 'beginner', equipment: 'machine', movement: 'compound', primary_muscle_group: 'quads', secondary_muscle_group: 'hamstrings', tertiary_muscle_group: 'glutes', sets: 3, reps: 10, weight: 'TBD' }, { name: 'Leg Extension', difficulty: 'beginner', equipment: 'machine', movement: 'isolation', primary_muscle_group: 'quads', secondary_muscle_group: null, tertiary_muscle_group: null, sets: 3, reps: 12, weight: 'TBD' }, { name: 'Leg Curl', difficulty: 'beginner', equipment: 'machine', movement: 'isolation', primary_muscle_group: 'hamstrings', secondary_muscle_group: null, tertiary_muscle_group: null, sets: 3, reps: 12, weight: 'TBD' }, { name: 'Knee Raises', difficulty: 'beginner', equipment: 'machine', movement: 'isolation', primary_muscle_group: 'abs', secondary_muscle_group: null, tertiary_muscle_group: null, sets: 3, reps: 15, weight: 'TBD' }]
                ],
                4: [
                    [
                        { name: 'Barbell Bench Press', difficulty: 'beginner', equipment: 'barbell', movement: 'compound', primary_muscle_group: 'chest', secondary_muscle_group: 'triceps', tertiary_muscle_group: 'shoulders', sets: 3, reps: 10, weight: 'TBD' },
                        { name: 'Lat Pulldown', difficulty: 'beginner', equipment: 'machine', movement: 'compound', primary_muscle_group: 'lats', secondary_muscle_group: 'biceps', tertiary_muscle_group: null, sets: 3, reps: 10, weight: 'TBD' },
                        { name: 'Cable Chest Flys', difficulty: 'beginner', equipment: 'cable', movement: 'isolation', primary_muscle_group: 'rearshoulders', secondary_muscle_group: null, tertiary_muscle_group: null, sets: 3, reps: 10, weight: 'TBD' },
                        { name: 'Cable Row', difficulty: 'beginner', equipment: 'machine', movement: 'compound', primary_muscle_group: 'middleback', secondary_muscle_group: 'biceps', tertiary_muscle_group: null, sets: 3, reps: 10, weight: 'TBD' },
                        { name: 'Lateral Raises', difficulty: 'beginner', equipment: 'dumbbell', movement: 'isolation', primary_muscle_group: 'lateralshoulders', secondary_muscle_group: null, tertiary_muscle_group: null, sets: 3, reps: 12, weight: 'TBD' },
                        { name: 'Tricep Pushdowns', difficulty: 'beginner', equipment: 'cable', movement: 'isolation', primary_muscle_group: 'lateraltriceps', secondary_muscle_group: null, tertiary_muscle_group: null, sets: 3, reps: 12, weight: 'TBD' },
                        { name: 'Bicep Curls', difficulty: 'beginner', equipment: 'dumbbell', movement: 'isolation', primary_muscle_group: 'biceps', secondary_muscle_group: null, tertiary_muscle_group: null, sets: 3, reps: 12, weight: 'TBD' },
                        { name: 'Incline Dumbbell Skull Crushers', difficulty: 'beginner', equipment: 'dumbbell', movement: 'isolation', primary_muscle_group: 'longtriceps', secondary_muscle_group: null, tertiary_muscle_group: null, sets: 3, reps: 12, weight: 'TBD' }
                    ],
                    [{ name: 'Squats', difficulty: 'beginner', equipment: 'barbell', movement: 'compound', primary_muscle_group: 'quads', secondary_muscle_group: 'hamstrings', tertiary_muscle_group: 'glutes', sets: 3, reps: 10, weight: 'TBD' }, { name: 'Leg Press', difficulty: 'beginner', equipment: 'machine', movement: 'compound', primary_muscle_group: 'quads', secondary_muscle_group: 'hamstrings', tertiary_muscle_group: 'glutes', sets: 3, reps: 10, weight: 'TBD' }, { name: 'Leg Extension', difficulty: 'beginner', equipment: 'machine', movement: 'isolation', primary_muscle_group: 'quads', secondary_muscle_group: null, tertiary_muscle_group: null, sets: 3, reps: 12, weight: 'TBD' }, { name: 'Leg Curl', difficulty: 'beginner', equipment: 'machine', movement: 'isolation', primary_muscle_group: 'hamstrings', secondary_muscle_group: null, tertiary_muscle_group: null, sets: 3, reps: 12, weight: 'TBD' }, { name: 'Knee Raises', difficulty: 'beginner', equipment: 'machine', movement: 'isolation', primary_muscle_group: 'abs', secondary_muscle_group: null, tertiary_muscle_group: null, sets: 3, reps: 15, weight: 'TBD' }],
                    [
                        { name: 'Pull-ups', difficulty: 'beginner', equipment: 'bodyweight', movement: 'compound', primary_muscle_group: 'lats', secondary_muscle_group: 'biceps', tertiary_muscle_group: null, sets: 3, reps: 10, weight: 'TBD' },
                        { name: 'Dumbbell Bench Press', difficulty: 'beginner', equipment: 'dumbbell', movement: 'compound', primary_muscle_group: 'chest', secondary_muscle_group: 'triceps', tertiary_muscle_group: 'shoulders', sets: 3, reps: 10, weight: 'TBD' },
                        { name: 'Cable Row', difficulty: 'beginner', equipment: 'machine', movement: 'compound', primary_muscle_group: 'middleback', secondary_muscle_group: 'biceps', tertiary_muscle_group: null, sets: 3, reps: 10, weight: 'TBD' },
                        { name: 'Cable Chest Flys', difficulty: 'beginner', equipment: 'cable', movement: 'isolation', primary_muscle_group: 'rearshoulders', secondary_muscle_group: null, tertiary_muscle_group: null, sets: 3, reps: 10, weight: 'TBD' },
                        { name: 'Lateral Raises', difficulty: 'beginner', equipment: 'dumbbell', movement: 'isolation', primary_muscle_group: 'lateralshoulders', secondary_muscle_group: null, tertiary_muscle_group: null, sets: 3, reps: 12, weight: 'TBD' },
                        { name: 'Cable Cross', difficulty: 'beginner', equipment: 'cable', movement: 'isolation', primary_muscle_group: 'rearshoulders', secondary_muscle_group: null, tertiary_muscle_group: null, sets: 3, reps: 10, weight: 'TBD' },
                        { name: 'EZ Bar Close Grip Curls', difficulty: 'beginner', equipment: 'barbell', movement: 'isolation', primary_muscle_group: 'longbiceps', secondary_muscle_group: null, tertiary_muscle_group: null, sets: 3, reps: 12, weight: 'TBD' },
                        { name: 'EZ Bar Skull Crushers', difficulty: 'beginner', equipment: 'barbell', movement: 'isolation', primary_muscle_group: 'longtriceps', secondary_muscle_group: null, tertiary_muscle_group: null, sets: 3, reps: 12, weight: 'TBD' },
                        { name: 'Wide Grip Barbell Curls', difficulty: 'beginner', equipment: 'barbell', movement: 'isolation', primary_muscle_group: 'shortbiceps', secondary_muscle_group: null, tertiary_muscle_group: null, sets: 3, reps: 12, weight: 'TBD' }
                    ],
                    [{ name: 'Squats', difficulty: 'beginner', equipment: 'barbell', movement: 'compound', primary_muscle_group: 'quads', secondary_muscle_group: 'hamstrings', tertiary_muscle_group: 'glutes', sets: 3, reps: 10, weight: 'TBD' }, { name: 'Leg Press', difficulty: 'beginner', equipment: 'machine', movement: 'compound', primary_muscle_group: 'quads', secondary_muscle_group: 'hamstrings', tertiary_muscle_group: 'glutes', sets: 3, reps: 10, weight: 'TBD' }, { name: 'Leg Extension', difficulty: 'beginner', equipment: 'machine', movement: 'isolation', primary_muscle_group: 'quads', secondary_muscle_group: null, tertiary_muscle_group: null, sets: 3, reps: 12, weight: 'TBD' }, { name: 'Leg Curl', difficulty: 'beginner', equipment: 'machine', movement: 'isolation', primary_muscle_group: 'hamstrings', secondary_muscle_group: null, tertiary_muscle_group: null, sets: 3, reps: 12, weight: 'TBD' }, { name: 'Knee Raises', difficulty: 'beginner', equipment: 'machine', movement: 'isolation', primary_muscle_group: 'abs', secondary_muscle_group: null, tertiary_muscle_group: null, sets: 3, reps: 15, weight: 'TBD' }]
                ],
                5: [[
                    { name: 'Barbell Bench Press', difficulty: 'beginner', equipment: 'barbell', movement: 'compound', primary_muscle_group: 'chest', secondary_muscle_group: 'triceps', tertiary_muscle_group: 'shoulders', sets: 3, reps: 10, weight: 'TBD' },
                    { name: 'Incline Dumbbell Press', difficulty: 'intermediate', equipment: 'dumbbell', movement: 'compound', primary_muscle_group: 'upperchest', secondary_muscle_group: 'shoulders', tertiary_muscle_group: 'triceps', sets: 3, reps: 10, weight: 'TBD' },
                    { name: 'Cable Chest Flys', difficulty: 'beginner', equipment: 'cable', movement: 'isolation', primary_muscle_group: 'rearshoulders', secondary_muscle_group: null, tertiary_muscle_group: null, sets: 3, reps: 10, weight: 'TBD' },
                    { name: 'Lateral Raises', difficulty: 'beginner', equipment: 'dumbbell', movement: 'isolation', primary_muscle_group: 'lateralshoulders', secondary_muscle_group: null, tertiary_muscle_group: null, sets: 3, reps: 12, weight: 'TBD' },
                    { name: 'Tricep Pushdowns', difficulty: 'beginner', equipment: 'cable', movement: 'isolation', primary_muscle_group: 'lateraltriceps', secondary_muscle_group: null, tertiary_muscle_group: null, sets: 3, reps: 12, weight: 'TBD' },
                    { name: 'Incline Dumbbell Skull Crushers', difficulty: 'beginner', equipment: 'dumbbell', movement: 'isolation', primary_muscle_group: 'longtriceps', secondary_muscle_group: null, tertiary_muscle_group: null, sets: 3, reps: 12, weight: 'TBD' }
                ],
                [
                    { name: 'Pull-ups', difficulty: 'beginner', equipment: 'bodyweight', movement: 'compound', primary_muscle_group: 'lats', secondary_muscle_group: 'biceps', tertiary_muscle_group: null, sets: 3, reps: 10, weight: 'TBD' },
                    { name: 'Cable Row', difficulty: 'beginner', equipment: 'machine', movement: 'compound', primary_muscle_group: 'middleback', secondary_muscle_group: 'biceps', tertiary_muscle_group: null, sets: 3, reps: 10, weight: 'TBD' },
                    { name: 'Lat Pulldown', difficulty: 'beginner', equipment: 'machine', movement: 'compound', primary_muscle_group: 'lats', secondary_muscle_group: 'biceps', tertiary_muscle_group: null, sets: 3, reps: 10, weight: 'TBD' },
                    { name: 'Cable Cross', difficulty: 'beginner', equipment: 'cable', movement: 'isolation', primary_muscle_group: 'rearshoulders', secondary_muscle_group: null, tertiary_muscle_group: null, sets: 3, reps: 10, weight: 'TBD' },
                    { name: 'Bicep Curls', difficulty: 'beginner', equipment: 'dumbbell', movement: 'isolation', primary_muscle_group: 'biceps', secondary_muscle_group: null, tertiary_muscle_group: null, sets: 3, reps: 12, weight: 'TBD' },
                    { name: 'Hammer Curls', difficulty: 'beginner', equipment: 'dumbbell', movement: 'isolation', primary_muscle_group: 'brachialis', secondary_muscle_group: null, tertiary_muscle_group: null, sets: 3, reps: 12, weight: 'TBD' }
                ],
                [
                    { name: 'Squats', difficulty: 'beginner', equipment: 'bodyweight', movement: 'compound', primary_muscle_group: 'quads', secondary_muscle_group: 'hamstrings', tertiary_muscle_group: 'glutes', sets: 3, reps: 10, weight: 'TBD' },
                    { name: 'Leg Press', difficulty: 'beginner', equipment: 'machine', movement: 'compound', primary_muscle_group: 'quads', secondary_muscle_group: 'hamstrings', tertiary_muscle_group: 'glutes', sets: 3, reps: 10, weight: 'TBD' },
                    { name: 'Leg Extension', difficulty: 'beginner', equipment: 'machine', movement: 'isolation', primary_muscle_group: 'quads', secondary_muscle_group: null, tertiary_muscle_group: null, sets: 3, reps: 12, weight: 'TBD' },
                    { name: 'Leg Curl', difficulty: 'beginner', equipment: 'machine', movement: 'isolation', primary_muscle_group: 'hamstrings', secondary_muscle_group: null, tertiary_muscle_group: null, sets: 3, reps: 12, weight: 'TBD' },
                    { name: 'Knee Raises', difficulty: 'beginner', equipment: 'machine', movement: 'isolation', primary_muscle_group: 'abs', secondary_muscle_group: null, tertiary_muscle_group: null, sets: 3, reps: 15, weight: 'TBD' }
                ],
                [
                    { name: 'Barbell Bench Press', difficulty: 'beginner', equipment: 'barbell', movement: 'compound', primary_muscle_group: 'chest', secondary_muscle_group: 'triceps', tertiary_muscle_group: 'shoulders', sets: 3, reps: 10, weight: 'TBD' },
                    { name: 'Lat Pulldown', difficulty: 'beginner', equipment: 'machine', movement: 'compound', primary_muscle_group: 'lats', secondary_muscle_group: 'biceps', tertiary_muscle_group: null, sets: 3, reps: 10, weight: 'TBD' },
                    { name: 'Cable Chest Flys', difficulty: 'beginner', equipment: 'cable', movement: 'isolation', primary_muscle_group: 'rearshoulders', secondary_muscle_group: null, tertiary_muscle_group: null, sets: 3, reps: 10, weight: 'TBD' },
                    { name: 'Cable Row', difficulty: 'beginner', equipment: 'machine', movement: 'compound', primary_muscle_group: 'middleback', secondary_muscle_group: 'biceps', tertiary_muscle_group: null, sets: 3, reps: 10, weight: 'TBD' },
                    { name: 'Lateral Raises', difficulty: 'beginner', equipment: 'dumbbell', movement: 'isolation', primary_muscle_group: 'lateralshoulders', secondary_muscle_group: null, tertiary_muscle_group: null, sets: 3, reps: 12, weight: 'TBD' },
                    { name: 'Tricep Pushdowns', difficulty: 'beginner', equipment: 'cable', movement: 'isolation', primary_muscle_group: 'lateraltriceps', secondary_muscle_group: null, tertiary_muscle_group: null, sets: 3, reps: 12, weight: 'TBD' },
                    { name: 'Bicep Curls', difficulty: 'beginner', equipment: 'dumbbell', movement: 'isolation', primary_muscle_group: 'biceps', secondary_muscle_group: null, tertiary_muscle_group: null, sets: 3, reps: 12, weight: 'TBD' },
                    { name: 'Incline Dumbbell Skull Crushers', difficulty: 'beginner', equipment: 'dumbbell', movement: 'isolation', primary_muscle_group: 'longtriceps', secondary_muscle_group: null, tertiary_muscle_group: null, sets: 3, reps: 12, weight: 'TBD' }
                ],
                [
                    { name: 'Squats', difficulty: 'beginner', equipment: 'bodyweight', movement: 'compound', primary_muscle_group: 'quads', secondary_muscle_group: 'hamstrings', tertiary_muscle_group: 'glutes', sets: 3, reps: 10, weight: 'TBD' },
                    { name: 'Leg Press', difficulty: 'beginner', equipment: 'machine', movement: 'compound', primary_muscle_group: 'quads', secondary_muscle_group: 'hamstrings', tertiary_muscle_group: 'glutes', sets: 3, reps: 10, weight: 'TBD' },
                    { name: 'Leg Extension', difficulty: 'beginner', equipment: 'machine', movement: 'isolation', primary_muscle_group: 'quads', secondary_muscle_group: null, tertiary_muscle_group: null, sets: 3, reps: 12, weight: 'TBD' },
                    { name: 'Leg Curl', difficulty: 'beginner', equipment: 'machine', movement: 'isolation', primary_muscle_group: 'hamstrings', secondary_muscle_group: null, tertiary_muscle_group: null, sets: 3, reps: 12, weight: 'TBD' },
                    { name: 'Knee Raises', difficulty: 'beginner', equipment: 'machine', movement: 'isolation', primary_muscle_group: 'abs', secondary_muscle_group: null, tertiary_muscle_group: null, sets: 3, reps: 15, weight: 'TBD' }
                ]
                ],
                6: [
                    [
                        { name: 'Barbell Bench Press', difficulty: 'beginner', equipment: 'barbell', movement: 'compound', primary_muscle_group: 'chest', secondary_muscle_group: 'triceps', tertiary_muscle_group: 'shoulders', sets: 3, reps: 10, weight: 'TBD' },
                        { name: 'Incline Dumbbell Press', difficulty: 'intermediate', equipment: 'dumbbell', movement: 'compound', primary_muscle_group: 'upperchest', secondary_muscle_group: 'shoulders', tertiary_muscle_group: 'triceps', sets: 3, reps: 10, weight: 'TBD' },
                        { name: 'Cable Chest Flys', difficulty: 'beginner', equipment: 'cable', movement: 'isolation', primary_muscle_group: 'rearshoulders', secondary_muscle_group: null, tertiary_muscle_group: null, sets: 3, reps: 10, weight: 'TBD' },
                        { name: 'Lateral Raises', difficulty: 'beginner', equipment: 'dumbbell', movement: 'isolation', primary_muscle_group: 'lateralshoulders', secondary_muscle_group: null, tertiary_muscle_group: null, sets: 3, reps: 12, weight: 'TBD' },
                        { name: 'Tricep Pushdowns', difficulty: 'beginner', equipment: 'cable', movement: 'isolation', primary_muscle_group: 'lateraltriceps', secondary_muscle_group: null, tertiary_muscle_group: null, sets: 3, reps: 12, weight: 'TBD' },
                        { name: 'Incline Dumbbell Skull Crushers', difficulty: 'beginner', equipment: 'dumbbell', movement: 'isolation', primary_muscle_group: 'longtriceps', secondary_muscle_group: null, tertiary_muscle_group: null, sets: 3, reps: 12, weight: 'TBD' }
                    ],
                    [
                        { name: 'Pull-ups', difficulty: 'beginner', equipment: 'bodyweight', movement: 'compound', primary_muscle_group: 'lats', secondary_muscle_group: 'biceps', tertiary_muscle_group: null, sets: 3, reps: 10, weight: 'TBD' },
                        { name: 'Cable Row', difficulty: 'beginner', equipment: 'machine', movement: 'compound', primary_muscle_group: 'middleback', secondary_muscle_group: 'biceps', tertiary_muscle_group: null, sets: 3, reps: 10, weight: 'TBD' },
                        { name: 'Lat Pulldown', difficulty: 'beginner', equipment: 'machine', movement: 'compound', primary_muscle_group: 'lats', secondary_muscle_group: 'biceps', tertiary_muscle_group: null, sets: 3, reps: 10, weight: 'TBD' },
                        { name: 'Cable Cross', difficulty: 'beginner', equipment: 'cable', movement: 'isolation', primary_muscle_group: 'rearshoulders', secondary_muscle_group: null, tertiary_muscle_group: null, sets: 3, reps: 10, weight: 'TBD' },
                        { name: 'Bicep Curls', difficulty: 'beginner', equipment: 'dumbbell', movement: 'isolation', primary_muscle_group: 'biceps', secondary_muscle_group: null, tertiary_muscle_group: null, sets: 3, reps: 12, weight: 'TBD' },
                        { name: 'Hammer Curls', difficulty: 'beginner', equipment: 'dumbbell', movement: 'isolation', primary_muscle_group: 'brachialis', secondary_muscle_group: null, tertiary_muscle_group: null, sets: 3, reps: 12, weight: 'TBD' }
                    ],
                    [
                        { name: 'Squats', difficulty: 'beginner', equipment: 'bodyweight', movement: 'compound', primary_muscle_group: 'quads', secondary_muscle_group: 'hamstrings', tertiary_muscle_group: 'glutes', sets: 3, reps: 10, weight: 'TBD' },
                        { name: 'Leg Press', difficulty: 'beginner', equipment: 'machine', movement: 'compound', primary_muscle_group: 'quads', secondary_muscle_group: 'hamstrings', tertiary_muscle_group: 'glutes', sets: 3, reps: 10, weight: 'TBD' },
                        { name: 'Leg Extension', difficulty: 'beginner', equipment: 'machine', movement: 'isolation', primary_muscle_group: 'quads', secondary_muscle_group: null, tertiary_muscle_group: null, sets: 3, reps: 12, weight: 'TBD' },
                        { name: 'Leg Curl', difficulty: 'beginner', equipment: 'machine', movement: 'isolation', primary_muscle_group: 'hamstrings', secondary_muscle_group: null, tertiary_muscle_group: null, sets: 3, reps: 12, weight: 'TBD' },
                        { name: 'Knee Raises', difficulty: 'beginner', equipment: 'machine', movement: 'isolation', primary_muscle_group: 'abs', secondary_muscle_group: null, tertiary_muscle_group: null, sets: 3, reps: 15, weight: 'TBD' }
                    ],
                    [
                        { name: 'Barbell Bench Press', difficulty: 'beginner', equipment: 'barbell', movement: 'compound', primary_muscle_group: 'chest', secondary_muscle_group: 'triceps', tertiary_muscle_group: 'shoulders', sets: 3, reps: 10, weight: 'TBD' },
                        { name: 'Incline Dumbbell Press', difficulty: 'intermediate', equipment: 'dumbbell', movement: 'compound', primary_muscle_group: 'upperchest', secondary_muscle_group: 'shoulders', tertiary_muscle_group: 'triceps', sets: 3, reps: 10, weight: 'TBD' },
                        { name: 'Cable Chest Flys', difficulty: 'beginner', equipment: 'cable', movement: 'isolation', primary_muscle_group: 'rearshoulders', secondary_muscle_group: null, tertiary_muscle_group: null, sets: 3, reps: 10, weight: 'TBD' },
                        { name: 'Lateral Raises', difficulty: 'beginner', equipment: 'dumbbell', movement: 'isolation', primary_muscle_group: 'lateralshoulders', secondary_muscle_group: null, tertiary_muscle_group: null, sets: 3, reps: 12, weight: 'TBD' },
                        { name: 'Tricep Pushdowns', difficulty: 'beginner', equipment: 'cable', movement: 'isolation', primary_muscle_group: 'lateraltriceps', secondary_muscle_group: null, tertiary_muscle_group: null, sets: 3, reps: 12, weight: 'TBD' },
                        { name: 'Incline Dumbbell Skull Crushers', difficulty: 'beginner', equipment: 'dumbbell', movement: 'isolation', primary_muscle_group: 'longtriceps', secondary_muscle_group: null, tertiary_muscle_group: null, sets: 3, reps: 12, weight: 'TBD' }
                    ],
                    [
                        { name: 'Pull-ups', difficulty: 'beginner', equipment: 'bodyweight', movement: 'compound', primary_muscle_group: 'lats', secondary_muscle_group: 'biceps', tertiary_muscle_group: null, sets: 3, reps: 10, weight: 'TBD' },
                        { name: 'Cable Row', difficulty: 'beginner', equipment: 'machine', movement: 'compound', primary_muscle_group: 'middleback', secondary_muscle_group: 'biceps', tertiary_muscle_group: null, sets: 3, reps: 10, weight: 'TBD' },
                        { name: 'Lat Pulldown', difficulty: 'beginner', equipment: 'machine', movement: 'compound', primary_muscle_group: 'lats', secondary_muscle_group: 'biceps', tertiary_muscle_group: null, sets: 3, reps: 10, weight: 'TBD' },
                        { name: 'Cable Cross', difficulty: 'beginner', equipment: 'cable', movement: 'isolation', primary_muscle_group: 'rearshoulders', secondary_muscle_group: null, tertiary_muscle_group: null, sets: 3, reps: 10, weight: 'TBD' },
                        { name: 'Bicep Curls', difficulty: 'beginner', equipment: 'dumbbell', movement: 'isolation', primary_muscle_group: 'biceps', secondary_muscle_group: null, tertiary_muscle_group: null, sets: 3, reps: 12, weight: 'TBD' },
                        { name: 'Hammer Curls', difficulty: 'beginner', equipment: 'dumbbell', movement: 'isolation', primary_muscle_group: 'brachialis', secondary_muscle_group: null, tertiary_muscle_group: null, sets: 3, reps: 12, weight: 'TBD' }
                    ],
                    [
                        { name: 'Squats', difficulty: 'beginner', equipment: 'bodyweight', movement: 'compound', primary_muscle_group: 'quads', secondary_muscle_group: 'hamstrings', tertiary_muscle_group: 'glutes', sets: 3, reps: 10, weight: 'TBD' },
                        { name: 'Leg Press', difficulty: 'beginner', equipment: 'machine', movement: 'compound', primary_muscle_group: 'quads', secondary_muscle_group: 'hamstrings', tertiary_muscle_group: 'glutes', sets: 3, reps: 10, weight: 'TBD' },
                        { name: 'Leg Extension', difficulty: 'beginner', equipment: 'machine', movement: 'isolation', primary_muscle_group: 'quads', secondary_muscle_group: null, tertiary_muscle_group: null, sets: 3, reps: 12, weight: 'TBD' },
                        { name: 'Leg Curl', difficulty: 'beginner', equipment: 'machine', movement: 'isolation', primary_muscle_group: 'hamstrings', secondary_muscle_group: null, tertiary_muscle_group: null, sets: 3, reps: 12, weight: 'TBD' },
                        { name: 'Knee Raises', difficulty: 'beginner', equipment: 'machine', movement: 'isolation', primary_muscle_group: 'abs', secondary_muscle_group: null, tertiary_muscle_group: null, sets: 3, reps: 15, weight: 'TBD' }
                    ]
                ],
                7: [
                    [
                        { name: 'Barbell Bench Press', difficulty: 'beginner', equipment: 'barbell', movement: 'compound', primary_muscle_group: 'chest', secondary_muscle_group: 'triceps', tertiary_muscle_group: 'shoulders', sets: 3, reps: 10, weight: 'TBD' },
                        { name: 'Incline Dumbbell Press', difficulty: 'intermediate', equipment: 'dumbbell', movement: 'compound', primary_muscle_group: 'upperchest', secondary_muscle_group: 'shoulders', tertiary_muscle_group: 'triceps', sets: 3, reps: 10, weight: 'TBD' },
                        { name: 'Cable Chest Flys', difficulty: 'beginner', equipment: 'cable', movement: 'isolation', primary_muscle_group: 'rearshoulders', secondary_muscle_group: null, tertiary_muscle_group: null, sets: 3, reps: 10, weight: 'TBD' },
                        { name: 'Lateral Raises', difficulty: 'beginner', equipment: 'dumbbell', movement: 'isolation', primary_muscle_group: 'lateralshoulders', secondary_muscle_group: null, tertiary_muscle_group: null, sets: 3, reps: 12, weight: 'TBD' },
                        { name: 'Tricep Pushdowns', difficulty: 'beginner', equipment: 'cable', movement: 'isolation', primary_muscle_group: 'lateraltriceps', secondary_muscle_group: null, tertiary_muscle_group: null, sets: 3, reps: 12, weight: 'TBD' },
                        { name: 'Incline Dumbbell Skull Crushers', difficulty: 'beginner', equipment: 'dumbbell', movement: 'isolation', primary_muscle_group: 'longtriceps', secondary_muscle_group: null, tertiary_muscle_group: null, sets: 3, reps: 12, weight: 'TBD' }
                    ],
                    [
                        { name: 'Pull-ups', difficulty: 'beginner', equipment: 'bodyweight', movement: 'compound', primary_muscle_group: 'lats', secondary_muscle_group: 'biceps', tertiary_muscle_group: null, sets: 3, reps: 10, weight: 'TBD' },
                        { name: 'Cable Row', difficulty: 'beginner', equipment: 'machine', movement: 'compound', primary_muscle_group: 'middleback', secondary_muscle_group: 'biceps', tertiary_muscle_group: null, sets: 3, reps: 10, weight: 'TBD' },
                        { name: 'Lat Pulldown', difficulty: 'beginner', equipment: 'machine', movement: 'compound', primary_muscle_group: 'lats', secondary_muscle_group: 'biceps', tertiary_muscle_group: null, sets: 3, reps: 10, weight: 'TBD' },
                        { name: 'Cable Cross', difficulty: 'beginner', equipment: 'cable', movement: 'isolation', primary_muscle_group: 'rearshoulders', secondary_muscle_group: null, tertiary_muscle_group: null, sets: 3, reps: 10, weight: 'TBD' },
                        { name: 'Bicep Curls', difficulty: 'beginner', equipment: 'dumbbell', movement: 'isolation', primary_muscle_group: 'biceps', secondary_muscle_group: null, tertiary_muscle_group: null, sets: 3, reps: 12, weight: 'TBD' },
                        { name: 'Hammer Curls', difficulty: 'beginner', equipment: 'dumbbell', movement: 'isolation', primary_muscle_group: 'brachialis', secondary_muscle_group: null, tertiary_muscle_group: null, sets: 3, reps: 12, weight: 'TBD' }
                    ],
                    [
                        { name: 'Squats', difficulty: 'beginner', equipment: 'bodyweight', movement: 'compound', primary_muscle_group: 'quads', secondary_muscle_group: 'hamstrings', tertiary_muscle_group: 'glutes', sets: 3, reps: 10, weight: 'TBD' },
                        { name: 'Leg Press', difficulty: 'beginner', equipment: 'machine', movement: 'compound', primary_muscle_group: 'quads', secondary_muscle_group: 'hamstrings', tertiary_muscle_group: 'glutes', sets: 3, reps: 10, weight: 'TBD' },
                        { name: 'Leg Extension', difficulty: 'beginner', equipment: 'machine', movement: 'isolation', primary_muscle_group: 'quads', secondary_muscle_group: null, tertiary_muscle_group: null, sets: 3, reps: 12, weight: 'TBD' },
                        { name: 'Leg Curl', difficulty: 'beginner', equipment: 'machine', movement: 'isolation', primary_muscle_group: 'hamstrings', secondary_muscle_group: null, tertiary_muscle_group: null, sets: 3, reps: 12, weight: 'TBD' },
                        { name: 'Knee Raises', difficulty: 'beginner', equipment: 'machine', movement: 'isolation', primary_muscle_group: 'abs', secondary_muscle_group: null, tertiary_muscle_group: null, sets: 3, reps: 15, weight: 'TBD' }
                    ],
                    [
                        { name: 'Shoulder Press', difficulty: 'beginner', equipment: 'dumbbell', movement: 'isolation', primary_muscle_group: 'frontalshoulders', secondary_muscle_group: null, tertiary_muscle_group: null, sets: 3, reps: 10, weight: 'TBD' },
                        { name: 'Lateral Raises', difficulty: 'beginner', equipment: 'dumbbell', movement: 'isolation', primary_muscle_group: 'lateralshoulders', secondary_muscle_group: null, tertiary_muscle_group: null, sets: 3, reps: 12, weight: 'TBD' },
                        { name: 'Cable Cross', difficulty: 'beginner', equipment: 'cable', movement: 'isolation', primary_muscle_group: 'rearshoulders', secondary_muscle_group: null, tertiary_muscle_group: null, sets: 3, reps: 10, weight: 'TBD' },
                        { name: 'EZ Bar Close Grip Curls', difficulty: 'beginner', equipment: 'barbell', movement: 'isolation', primary_muscle_group: 'longbiceps', secondary_muscle_group: null, tertiary_muscle_group: null, sets: 3, reps: 12, weight: 'TBD' },
                        { name: 'EZ Bar Skull Crushers', difficulty: 'beginner', equipment: 'barbell', movement: 'isolation', primary_muscle_group: 'longtriceps', secondary_muscle_group: null, tertiary_muscle_group: null, sets: 3, reps: 12, weight: 'TBD' },
                        { name: 'Wide Grip Barbell Curls', difficulty: 'beginner', equipment: 'barbell', movement: 'isolation', primary_muscle_group: 'shortbiceps', secondary_muscle_group: null, tertiary_muscle_group: null, sets: 3, reps: 12, weight: 'TBD' },
                        { name: 'Tricep Pushdowns', difficulty: 'beginner', equipment: 'cable', movement: 'isolation', primary_muscle_group: 'lateraltriceps', secondary_muscle_group: null, tertiary_muscle_group: null, sets: 3, reps: 12, weight: 'TBD' }
                    ],
                    [
                        { name: 'Barbell Bench Press', difficulty: 'beginner', equipment: 'barbell', movement: 'compound', primary_muscle_group: 'chest', secondary_muscle_group: 'triceps', tertiary_muscle_group: 'shoulders', sets: 3, reps: 10, weight: 'TBD' },
                        { name: 'Incline Dumbbell Press', difficulty: 'intermediate', equipment: 'dumbbell', movement: 'compound', primary_muscle_group: 'upperchest', secondary_muscle_group: 'shoulders', tertiary_muscle_group: 'triceps', sets: 3, reps: 10, weight: 'TBD' },
                        { name: 'Cable Chest Flys', difficulty: 'beginner', equipment: 'cable', movement: 'isolation', primary_muscle_group: 'rearshoulders', secondary_muscle_group: null, tertiary_muscle_group: null, sets: 3, reps: 10, weight: 'TBD' },
                        { name: 'Lateral Raises', difficulty: 'beginner', equipment: 'dumbbell', movement: 'isolation', primary_muscle_group: 'lateralshoulders', secondary_muscle_group: null, tertiary_muscle_group: null, sets: 3, reps: 12, weight: 'TBD' },
                        { name: 'Tricep Pushdowns', difficulty: 'beginner', equipment: 'cable', movement: 'isolation', primary_muscle_group: 'lateraltriceps', secondary_muscle_group: null, tertiary_muscle_group: null, sets: 3, reps: 12, weight: 'TBD' },
                        { name: 'Incline Dumbbell Skull Crushers', difficulty: 'beginner', equipment: 'dumbbell', movement: 'isolation', primary_muscle_group: 'longtriceps', secondary_muscle_group: null, tertiary_muscle_group: null, sets: 3, reps: 12, weight: 'TBD' }
                    ],
                    [
                        { name: 'Pull-ups', difficulty: 'beginner', equipment: 'bodyweight', movement: 'compound', primary_muscle_group: 'lats', secondary_muscle_group: 'biceps', tertiary_muscle_group: null, sets: 3, reps: 10, weight: 'TBD' },
                        { name: 'Cable Row', difficulty: 'beginner', equipment: 'machine', movement: 'compound', primary_muscle_group: 'middleback', secondary_muscle_group: 'biceps', tertiary_muscle_group: null, sets: 3, reps: 10, weight: 'TBD' },
                        { name: 'Lat Pulldown', difficulty: 'beginner', equipment: 'machine', movement: 'compound', primary_muscle_group: 'lats', secondary_muscle_group: 'biceps', tertiary_muscle_group: null, sets: 3, reps: 10, weight: 'TBD' },
                        { name: 'Cable Cross', difficulty: 'beginner', equipment: 'cable', movement: 'isolation', primary_muscle_group: 'rearshoulders', secondary_muscle_group: null, tertiary_muscle_group: null, sets: 3, reps: 10, weight: 'TBD' },
                        { name: 'Bicep Curls', difficulty: 'beginner', equipment: 'dumbbell', movement: 'isolation', primary_muscle_group: 'biceps', secondary_muscle_group: null, tertiary_muscle_group: null, sets: 3, reps: 12, weight: 'TBD' },
                        { name: 'Hammer Curls', difficulty: 'beginner', equipment: 'dumbbell', movement: 'isolation', primary_muscle_group: 'brachialis', secondary_muscle_group: null, tertiary_muscle_group: null, sets: 3, reps: 12, weight: 'TBD' }
                    ],
                    [
                        { name: 'Squats', difficulty: 'beginner', equipment: 'bodyweight', movement: 'compound', primary_muscle_group: 'quads', secondary_muscle_group: 'hamstrings', tertiary_muscle_group: 'glutes', sets: 3, reps: 10, weight: 'TBD' },
                        { name: 'Leg Press', difficulty: 'beginner', equipment: 'machine', movement: 'compound', primary_muscle_group: 'quads', secondary_muscle_group: 'hamstrings', tertiary_muscle_group: 'glutes', sets: 3, reps: 10, weight: 'TBD' },
                        { name: 'Leg Extension', difficulty: 'beginner', equipment: 'machine', movement: 'isolation', primary_muscle_group: 'quads', secondary_muscle_group: null, tertiary_muscle_group: null, sets: 3, reps: 12, weight: 'TBD' },
                        { name: 'Leg Curl', difficulty: 'beginner', equipment: 'machine', movement: 'isolation', primary_muscle_group: 'hamstrings', secondary_muscle_group: null, tertiary_muscle_group: null, sets: 3, reps: 12, weight: 'TBD' },
                        { name: 'Knee Raises', difficulty: 'beginner', equipment: 'machine', movement: 'isolation', primary_muscle_group: 'abs', secondary_muscle_group: null, tertiary_muscle_group: null, sets: 3, reps: 15, weight: 'TBD' }
                    ]
                ]
            },
            overweight: {},
        },
        intermediate: {
            underweight: {},
            normal: {},
            overweight: {
                3: [

                ],
                4: [ /* … */],
            },
        },
        advanced: {
            underweight: {},
            normal: {},
            overweight: {
                3: [

                ],
                4: [ /* … */],
            },
        },
    },

    maintain: {
        beginner: {
            underweight: {},
            normal: {
                2: [
                    [{ name: 'Squats', difficulty: 'beginner', equipment: 'barbell', movement: 'compound', primary_muscle_group: 'quads', secondary_muscle_group: 'hamstrings', tertiary_muscle_group: 'glutes', sets: 3, reps: 10, weight: 'TBD' }, { name: 'Leg Press', difficulty: 'beginner', equipment: 'machine', movement: 'compound', primary_muscle_group: 'quads', secondary_muscle_group: 'hamstrings', tertiary_muscle_group: 'glutes', sets: 3, reps: 10, weight: 'TBD' }, { name: 'Low Row', difficulty: 'beginner', equipment: 'machine', movement: 'compound', primary_muscle_group: 'middleback', secondary_muscle_group: 'biceps', tertiary_muscle_group: null, sets: 3, reps: 10, weight: 'TBD' }, { name: 'Lat Pulldown', difficulty: 'beginner', equipment: 'machine', movement: 'compound', primary_muscle_group: 'lats', secondary_muscle_group: 'biceps', tertiary_muscle_group: null, sets: 3, reps: 10, weight: 'TBD' }, { name: 'Dumbbell Bench Press', difficulty: 'beginner', equipment: 'dumbbell', movement: 'compound', primary_muscle_group: 'chest', secondary_muscle_group: 'triceps', tertiary_muscle_group: 'shoulders', sets: 3, reps: 10, weight: 'TBD' }, { name: 'Incline Dumbbell Press', difficulty: 'intermediate', equipment: 'dumbbell', movement: 'compound', primary_muscle_group: 'upperchest', secondary_muscle_group: 'shoulders', tertiary_muscle_group: 'triceps', sets: 3, reps: 10, weight: 'TBD' }],
                    [{ name: 'Squats', difficulty: 'beginner', equipment: 'barbell', movement: 'compound', primary_muscle_group: 'quads', secondary_muscle_group: 'hamstrings', tertiary_muscle_group: 'glutes', sets: 3, reps: 10, weight: 'TBD' }, { name: 'Leg Press', difficulty: 'beginner', equipment: 'machine', movement: 'compound', primary_muscle_group: 'quads', secondary_muscle_group: 'hamstrings', tertiary_muscle_group: 'glutes', sets: 3, reps: 10, weight: 'TBD' }, { name: 'Cable Row', difficulty: 'beginner', equipment: 'machine', movement: 'compound', primary_muscle_group: 'middleback', secondary_muscle_group: 'biceps', tertiary_muscle_group: null, sets: 3, reps: 10, weight: 'TBD' }, { name: 'Lat Pulldown', difficulty: 'beginner', equipment: 'machine', movement: 'compound', primary_muscle_group: 'lats', secondary_muscle_group: 'biceps', tertiary_muscle_group: null, sets: 3, reps: 10, weight: 'TBD' }, { name: 'Dumbbell Bench Press', difficulty: 'beginner', equipment: 'dumbbell', movement: 'compound', primary_muscle_group: 'chest', secondary_muscle_group: 'triceps', tertiary_muscle_group: 'shoulders', sets: 3, reps: 10, weight: 'TBD' }, { name: 'Incline Dumbbell Press', difficulty: 'intermediate', equipment: 'dumbbell', movement: 'compound', primary_muscle_group: 'upperchest', secondary_muscle_group: 'shoulders', tertiary_muscle_group: 'triceps', sets: 3, reps: 10, weight: 'TBD' }]
                ],
                3: [
                    [{ name: 'Barbell Bench Press', difficulty: 'beginner', equipment: 'barbell', movement: 'compound', primary_muscle_group: 'chest', secondary_muscle_group: 'triceps', tertiary_muscle_group: 'shoulders', sets: 3, reps: 10, weight: 'TBD' }, { name: 'Incline Dumbbell Press', difficulty: 'intermediate', equipment: 'dumbbell', movement: 'compound', primary_muscle_group: 'upperchest', secondary_muscle_group: 'shoulders', tertiary_muscle_group: 'triceps', sets: 3, reps: 10, weight: 'TBD' }, { name: 'Cable Chest Flys', difficulty: 'beginner', equipment: 'cable', movement: 'isolation', primary_muscle_group: 'rearshoulders', secondary_muscle_group: null, tertiary_muscle_group: null, sets: 3, reps: 10, weight: 'TBD' }, { name: 'Lateral Raises', difficulty: 'beginner', equipment: 'dumbbell', movement: 'isolation', primary_muscle_group: 'lateralshoulders', secondary_muscle_group: null, tertiary_muscle_group: null, sets: 3, reps: 12, weight: 'TBD' }, { name: 'Tricep Pushdowns', difficulty: 'beginner', equipment: 'cable', movement: 'isolation', primary_muscle_group: 'lateraltriceps', secondary_muscle_group: null, tertiary_muscle_group: null, sets: 3, reps: 12, weight: 'TBD' }, { name: 'Incline Dumbbell Skull Crushers', difficulty: 'beginner', equipment: 'dumbbell', movement: 'isolation', primary_muscle_group: 'longtriceps', secondary_muscle_group: null, tertiary_muscle_group: null, sets: 3, reps: 12, weight: 'TBD' }],
                    [{ name: 'Pull-ups', difficulty: 'beginner', equipment: 'bodyweight', movement: 'compound', primary_muscle_group: 'lats', secondary_muscle_group: 'biceps', tertiary_muscle_group: null, sets: 3, reps: 10, weight: 'TBD' }, { name: 'Cable Row', difficulty: 'beginner', equipment: 'machine', movement: 'compound', primary_muscle_group: 'middleback', secondary_muscle_group: 'biceps', tertiary_muscle_group: null, sets: 3, reps: 10, weight: 'TBD' }, { name: 'Lat Pulldown', difficulty: 'beginner', equipment: 'machine', movement: 'compound', primary_muscle_group: 'lats', secondary_muscle_group: 'biceps', tertiary_muscle_group: null, sets: 3, reps: 10, weight: 'TBD' }, { name: 'Cable Cross', difficulty: 'beginner', equipment: 'cable', movement: 'isolation', primary_muscle_group: 'rearshoulders', secondary_muscle_group: null, tertiary_muscle_group: null, sets: 3, reps: 10, weight: 'TBD' }, { name: 'Bicep Curls', difficulty: 'beginner', equipment: 'dumbbell', movement: 'isolation', primary_muscle_group: 'biceps', secondary_muscle_group: null, tertiary_muscle_group: null, sets: 3, reps: 12, weight: 'TBD' }, { name: 'Hammer Curls', difficulty: 'beginner', equipment: 'dumbbell', movement: 'isolation', primary_muscle_group: 'brachialis', secondary_muscle_group: null, tertiary_muscle_group: null, sets: 3, reps: 12, weight: 'TBD' }],
                    [{ name: 'Squats', difficulty: 'beginner', equipment: 'barbell', movement: 'compound', primary_muscle_group: 'quads', secondary_muscle_group: 'hamstrings', tertiary_muscle_group: 'glutes', sets: 3, reps: 10, weight: 'TBD' }, { name: 'Leg Press', difficulty: 'beginner', equipment: 'machine', movement: 'compound', primary_muscle_group: 'quads', secondary_muscle_group: 'hamstrings', tertiary_muscle_group: 'glutes', sets: 3, reps: 10, weight: 'TBD' }, { name: 'Leg Extension', difficulty: 'beginner', equipment: 'machine', movement: 'isolation', primary_muscle_group: 'quads', secondary_muscle_group: null, tertiary_muscle_group: null, sets: 3, reps: 12, weight: 'TBD' }, { name: 'Leg Curl', difficulty: 'beginner', equipment: 'machine', movement: 'isolation', primary_muscle_group: 'hamstrings', secondary_muscle_group: null, tertiary_muscle_group: null, sets: 3, reps: 12, weight: 'TBD' }, { name: 'Knee Raises', difficulty: 'beginner', equipment: 'machine', movement: 'isolation', primary_muscle_group: 'abs', secondary_muscle_group: null, tertiary_muscle_group: null, sets: 3, reps: 15, weight: 'TBD' }]
                ],
                4: [
                    [
                        { name: 'Barbell Bench Press', difficulty: 'beginner', equipment: 'barbell', movement: 'compound', primary_muscle_group: 'chest', secondary_muscle_group: 'triceps', tertiary_muscle_group: 'shoulders', sets: 3, reps: 10, weight: 'TBD' },
                        { name: 'Lat Pulldown', difficulty: 'beginner', equipment: 'machine', movement: 'compound', primary_muscle_group: 'lats', secondary_muscle_group: 'biceps', tertiary_muscle_group: null, sets: 3, reps: 10, weight: 'TBD' },
                        { name: 'Cable Chest Flys', difficulty: 'beginner', equipment: 'cable', movement: 'isolation', primary_muscle_group: 'rearshoulders', secondary_muscle_group: null, tertiary_muscle_group: null, sets: 3, reps: 10, weight: 'TBD' },
                        { name: 'Cable Row', difficulty: 'beginner', equipment: 'machine', movement: 'compound', primary_muscle_group: 'middleback', secondary_muscle_group: 'biceps', tertiary_muscle_group: null, sets: 3, reps: 10, weight: 'TBD' },
                        { name: 'Lateral Raises', difficulty: 'beginner', equipment: 'dumbbell', movement: 'isolation', primary_muscle_group: 'lateralshoulders', secondary_muscle_group: null, tertiary_muscle_group: null, sets: 3, reps: 12, weight: 'TBD' },
                        { name: 'Tricep Pushdowns', difficulty: 'beginner', equipment: 'cable', movement: 'isolation', primary_muscle_group: 'lateraltriceps', secondary_muscle_group: null, tertiary_muscle_group: null, sets: 3, reps: 12, weight: 'TBD' },
                        { name: 'Bicep Curls', difficulty: 'beginner', equipment: 'dumbbell', movement: 'isolation', primary_muscle_group: 'biceps', secondary_muscle_group: null, tertiary_muscle_group: null, sets: 3, reps: 12, weight: 'TBD' },
                        { name: 'Incline Dumbbell Skull Crushers', difficulty: 'beginner', equipment: 'dumbbell', movement: 'isolation', primary_muscle_group: 'longtriceps', secondary_muscle_group: null, tertiary_muscle_group: null, sets: 3, reps: 12, weight: 'TBD' }
                    ],
                    [{ name: 'Squats', difficulty: 'beginner', equipment: 'barbell', movement: 'compound', primary_muscle_group: 'quads', secondary_muscle_group: 'hamstrings', tertiary_muscle_group: 'glutes', sets: 3, reps: 10, weight: 'TBD' }, { name: 'Leg Press', difficulty: 'beginner', equipment: 'machine', movement: 'compound', primary_muscle_group: 'quads', secondary_muscle_group: 'hamstrings', tertiary_muscle_group: 'glutes', sets: 3, reps: 10, weight: 'TBD' }, { name: 'Leg Extension', difficulty: 'beginner', equipment: 'machine', movement: 'isolation', primary_muscle_group: 'quads', secondary_muscle_group: null, tertiary_muscle_group: null, sets: 3, reps: 12, weight: 'TBD' }, { name: 'Leg Curl', difficulty: 'beginner', equipment: 'machine', movement: 'isolation', primary_muscle_group: 'hamstrings', secondary_muscle_group: null, tertiary_muscle_group: null, sets: 3, reps: 12, weight: 'TBD' }, { name: 'Knee Raises', difficulty: 'beginner', equipment: 'machine', movement: 'isolation', primary_muscle_group: 'abs', secondary_muscle_group: null, tertiary_muscle_group: null, sets: 3, reps: 15, weight: 'TBD' }],
                    [
                        { name: 'Pull-ups', difficulty: 'beginner', equipment: 'bodyweight', movement: 'compound', primary_muscle_group: 'lats', secondary_muscle_group: 'biceps', tertiary_muscle_group: null, sets: 3, reps: 10, weight: 'TBD' },
                        { name: 'Dumbbell Bench Press', difficulty: 'beginner', equipment: 'dumbbell', movement: 'compound', primary_muscle_group: 'chest', secondary_muscle_group: 'triceps', tertiary_muscle_group: 'shoulders', sets: 3, reps: 10, weight: 'TBD' },
                        { name: 'Cable Row', difficulty: 'beginner', equipment: 'machine', movement: 'compound', primary_muscle_group: 'middleback', secondary_muscle_group: 'biceps', tertiary_muscle_group: null, sets: 3, reps: 10, weight: 'TBD' },
                        { name: 'Cable Chest Flys', difficulty: 'beginner', equipment: 'cable', movement: 'isolation', primary_muscle_group: 'rearshoulders', secondary_muscle_group: null, tertiary_muscle_group: null, sets: 3, reps: 10, weight: 'TBD' },
                        { name: 'Lateral Raises', difficulty: 'beginner', equipment: 'dumbbell', movement: 'isolation', primary_muscle_group: 'lateralshoulders', secondary_muscle_group: null, tertiary_muscle_group: null, sets: 3, reps: 12, weight: 'TBD' },
                        { name: 'Cable Cross', difficulty: 'beginner', equipment: 'cable', movement: 'isolation', primary_muscle_group: 'rearshoulders', secondary_muscle_group: null, tertiary_muscle_group: null, sets: 3, reps: 10, weight: 'TBD' },
                        { name: 'EZ Bar Close Grip Curls', difficulty: 'beginner', equipment: 'barbell', movement: 'isolation', primary_muscle_group: 'longbiceps', secondary_muscle_group: null, tertiary_muscle_group: null, sets: 3, reps: 12, weight: 'TBD' },
                        { name: 'EZ Bar Skull Crushers', difficulty: 'beginner', equipment: 'barbell', movement: 'isolation', primary_muscle_group: 'longtriceps', secondary_muscle_group: null, tertiary_muscle_group: null, sets: 3, reps: 12, weight: 'TBD' },
                        { name: 'Wide Grip Barbell Curls', difficulty: 'beginner', equipment: 'barbell', movement: 'isolation', primary_muscle_group: 'shortbiceps', secondary_muscle_group: null, tertiary_muscle_group: null, sets: 3, reps: 12, weight: 'TBD' }
                    ],
                    [{ name: 'Squats', difficulty: 'beginner', equipment: 'barbell', movement: 'compound', primary_muscle_group: 'quads', secondary_muscle_group: 'hamstrings', tertiary_muscle_group: 'glutes', sets: 3, reps: 10, weight: 'TBD' }, { name: 'Leg Press', difficulty: 'beginner', equipment: 'machine', movement: 'compound', primary_muscle_group: 'quads', secondary_muscle_group: 'hamstrings', tertiary_muscle_group: 'glutes', sets: 3, reps: 10, weight: 'TBD' }, { name: 'Leg Extension', difficulty: 'beginner', equipment: 'machine', movement: 'isolation', primary_muscle_group: 'quads', secondary_muscle_group: null, tertiary_muscle_group: null, sets: 3, reps: 12, weight: 'TBD' }, { name: 'Leg Curl', difficulty: 'beginner', equipment: 'machine', movement: 'isolation', primary_muscle_group: 'hamstrings', secondary_muscle_group: null, tertiary_muscle_group: null, sets: 3, reps: 12, weight: 'TBD' }, { name: 'Knee Raises', difficulty: 'beginner', equipment: 'machine', movement: 'isolation', primary_muscle_group: 'abs', secondary_muscle_group: null, tertiary_muscle_group: null, sets: 3, reps: 15, weight: 'TBD' }]
                ],
                5: [[
                    { name: 'Barbell Bench Press', difficulty: 'beginner', equipment: 'barbell', movement: 'compound', primary_muscle_group: 'chest', secondary_muscle_group: 'triceps', tertiary_muscle_group: 'shoulders', sets: 3, reps: 10, weight: 'TBD' },
                    { name: 'Incline Dumbbell Press', difficulty: 'intermediate', equipment: 'dumbbell', movement: 'compound', primary_muscle_group: 'upperchest', secondary_muscle_group: 'shoulders', tertiary_muscle_group: 'triceps', sets: 3, reps: 10, weight: 'TBD' },
                    { name: 'Cable Chest Flys', difficulty: 'beginner', equipment: 'cable', movement: 'isolation', primary_muscle_group: 'rearshoulders', secondary_muscle_group: null, tertiary_muscle_group: null, sets: 3, reps: 10, weight: 'TBD' },
                    { name: 'Lateral Raises', difficulty: 'beginner', equipment: 'dumbbell', movement: 'isolation', primary_muscle_group: 'lateralshoulders', secondary_muscle_group: null, tertiary_muscle_group: null, sets: 3, reps: 12, weight: 'TBD' },
                    { name: 'Tricep Pushdowns', difficulty: 'beginner', equipment: 'cable', movement: 'isolation', primary_muscle_group: 'lateraltriceps', secondary_muscle_group: null, tertiary_muscle_group: null, sets: 3, reps: 12, weight: 'TBD' },
                    { name: 'Incline Dumbbell Skull Crushers', difficulty: 'beginner', equipment: 'dumbbell', movement: 'isolation', primary_muscle_group: 'longtriceps', secondary_muscle_group: null, tertiary_muscle_group: null, sets: 3, reps: 12, weight: 'TBD' }
                ],
                [
                    { name: 'Pull-ups', difficulty: 'beginner', equipment: 'bodyweight', movement: 'compound', primary_muscle_group: 'lats', secondary_muscle_group: 'biceps', tertiary_muscle_group: null, sets: 3, reps: 10, weight: 'TBD' },
                    { name: 'Cable Row', difficulty: 'beginner', equipment: 'machine', movement: 'compound', primary_muscle_group: 'middleback', secondary_muscle_group: 'biceps', tertiary_muscle_group: null, sets: 3, reps: 10, weight: 'TBD' },
                    { name: 'Lat Pulldown', difficulty: 'beginner', equipment: 'machine', movement: 'compound', primary_muscle_group: 'lats', secondary_muscle_group: 'biceps', tertiary_muscle_group: null, sets: 3, reps: 10, weight: 'TBD' },
                    { name: 'Cable Cross', difficulty: 'beginner', equipment: 'cable', movement: 'isolation', primary_muscle_group: 'rearshoulders', secondary_muscle_group: null, tertiary_muscle_group: null, sets: 3, reps: 10, weight: 'TBD' },
                    { name: 'Bicep Curls', difficulty: 'beginner', equipment: 'dumbbell', movement: 'isolation', primary_muscle_group: 'biceps', secondary_muscle_group: null, tertiary_muscle_group: null, sets: 3, reps: 12, weight: 'TBD' },
                    { name: 'Hammer Curls', difficulty: 'beginner', equipment: 'dumbbell', movement: 'isolation', primary_muscle_group: 'brachialis', secondary_muscle_group: null, tertiary_muscle_group: null, sets: 3, reps: 12, weight: 'TBD' }
                ],
                [
                    { name: 'Squats', difficulty: 'beginner', equipment: 'bodyweight', movement: 'compound', primary_muscle_group: 'quads', secondary_muscle_group: 'hamstrings', tertiary_muscle_group: 'glutes', sets: 3, reps: 10, weight: 'TBD' },
                    { name: 'Leg Press', difficulty: 'beginner', equipment: 'machine', movement: 'compound', primary_muscle_group: 'quads', secondary_muscle_group: 'hamstrings', tertiary_muscle_group: 'glutes', sets: 3, reps: 10, weight: 'TBD' },
                    { name: 'Leg Extension', difficulty: 'beginner', equipment: 'machine', movement: 'isolation', primary_muscle_group: 'quads', secondary_muscle_group: null, tertiary_muscle_group: null, sets: 3, reps: 12, weight: 'TBD' },
                    { name: 'Leg Curl', difficulty: 'beginner', equipment: 'machine', movement: 'isolation', primary_muscle_group: 'hamstrings', secondary_muscle_group: null, tertiary_muscle_group: null, sets: 3, reps: 12, weight: 'TBD' },
                    { name: 'Knee Raises', difficulty: 'beginner', equipment: 'machine', movement: 'isolation', primary_muscle_group: 'abs', secondary_muscle_group: null, tertiary_muscle_group: null, sets: 3, reps: 15, weight: 'TBD' }
                ],
                [
                    { name: 'Barbell Bench Press', difficulty: 'beginner', equipment: 'barbell', movement: 'compound', primary_muscle_group: 'chest', secondary_muscle_group: 'triceps', tertiary_muscle_group: 'shoulders', sets: 3, reps: 10, weight: 'TBD' },
                    { name: 'Lat Pulldown', difficulty: 'beginner', equipment: 'machine', movement: 'compound', primary_muscle_group: 'lats', secondary_muscle_group: 'biceps', tertiary_muscle_group: null, sets: 3, reps: 10, weight: 'TBD' },
                    { name: 'Cable Chest Flys', difficulty: 'beginner', equipment: 'cable', movement: 'isolation', primary_muscle_group: 'rearshoulders', secondary_muscle_group: null, tertiary_muscle_group: null, sets: 3, reps: 10, weight: 'TBD' },
                    { name: 'Cable Row', difficulty: 'beginner', equipment: 'machine', movement: 'compound', primary_muscle_group: 'middleback', secondary_muscle_group: 'biceps', tertiary_muscle_group: null, sets: 3, reps: 10, weight: 'TBD' },
                    { name: 'Lateral Raises', difficulty: 'beginner', equipment: 'dumbbell', movement: 'isolation', primary_muscle_group: 'lateralshoulders', secondary_muscle_group: null, tertiary_muscle_group: null, sets: 3, reps: 12, weight: 'TBD' },
                    { name: 'Tricep Pushdowns', difficulty: 'beginner', equipment: 'cable', movement: 'isolation', primary_muscle_group: 'lateraltriceps', secondary_muscle_group: null, tertiary_muscle_group: null, sets: 3, reps: 12, weight: 'TBD' },
                    { name: 'Bicep Curls', difficulty: 'beginner', equipment: 'dumbbell', movement: 'isolation', primary_muscle_group: 'biceps', secondary_muscle_group: null, tertiary_muscle_group: null, sets: 3, reps: 12, weight: 'TBD' },
                    { name: 'Incline Dumbbell Skull Crushers', difficulty: 'beginner', equipment: 'dumbbell', movement: 'isolation', primary_muscle_group: 'longtriceps', secondary_muscle_group: null, tertiary_muscle_group: null, sets: 3, reps: 12, weight: 'TBD' }
                ],
                [
                    { name: 'Squats', difficulty: 'beginner', equipment: 'bodyweight', movement: 'compound', primary_muscle_group: 'quads', secondary_muscle_group: 'hamstrings', tertiary_muscle_group: 'glutes', sets: 3, reps: 10, weight: 'TBD' },
                    { name: 'Leg Press', difficulty: 'beginner', equipment: 'machine', movement: 'compound', primary_muscle_group: 'quads', secondary_muscle_group: 'hamstrings', tertiary_muscle_group: 'glutes', sets: 3, reps: 10, weight: 'TBD' },
                    { name: 'Leg Extension', difficulty: 'beginner', equipment: 'machine', movement: 'isolation', primary_muscle_group: 'quads', secondary_muscle_group: null, tertiary_muscle_group: null, sets: 3, reps: 12, weight: 'TBD' },
                    { name: 'Leg Curl', difficulty: 'beginner', equipment: 'machine', movement: 'isolation', primary_muscle_group: 'hamstrings', secondary_muscle_group: null, tertiary_muscle_group: null, sets: 3, reps: 12, weight: 'TBD' },
                    { name: 'Knee Raises', difficulty: 'beginner', equipment: 'machine', movement: 'isolation', primary_muscle_group: 'abs', secondary_muscle_group: null, tertiary_muscle_group: null, sets: 3, reps: 15, weight: 'TBD' }
                ]
                ],
                6: [
                    [
                        { name: 'Barbell Bench Press', difficulty: 'beginner', equipment: 'barbell', movement: 'compound', primary_muscle_group: 'chest', secondary_muscle_group: 'triceps', tertiary_muscle_group: 'shoulders', sets: 3, reps: 10, weight: 'TBD' },
                        { name: 'Incline Dumbbell Press', difficulty: 'intermediate', equipment: 'dumbbell', movement: 'compound', primary_muscle_group: 'upperchest', secondary_muscle_group: 'shoulders', tertiary_muscle_group: 'triceps', sets: 3, reps: 10, weight: 'TBD' },
                        { name: 'Cable Chest Flys', difficulty: 'beginner', equipment: 'cable', movement: 'isolation', primary_muscle_group: 'rearshoulders', secondary_muscle_group: null, tertiary_muscle_group: null, sets: 3, reps: 10, weight: 'TBD' },
                        { name: 'Lateral Raises', difficulty: 'beginner', equipment: 'dumbbell', movement: 'isolation', primary_muscle_group: 'lateralshoulders', secondary_muscle_group: null, tertiary_muscle_group: null, sets: 3, reps: 12, weight: 'TBD' },
                        { name: 'Tricep Pushdowns', difficulty: 'beginner', equipment: 'cable', movement: 'isolation', primary_muscle_group: 'lateraltriceps', secondary_muscle_group: null, tertiary_muscle_group: null, sets: 3, reps: 12, weight: 'TBD' },
                        { name: 'Incline Dumbbell Skull Crushers', difficulty: 'beginner', equipment: 'dumbbell', movement: 'isolation', primary_muscle_group: 'longtriceps', secondary_muscle_group: null, tertiary_muscle_group: null, sets: 3, reps: 12, weight: 'TBD' }
                    ],
                    [
                        { name: 'Pull-ups', difficulty: 'beginner', equipment: 'bodyweight', movement: 'compound', primary_muscle_group: 'lats', secondary_muscle_group: 'biceps', tertiary_muscle_group: null, sets: 3, reps: 10, weight: 'TBD' },
                        { name: 'Cable Row', difficulty: 'beginner', equipment: 'machine', movement: 'compound', primary_muscle_group: 'middleback', secondary_muscle_group: 'biceps', tertiary_muscle_group: null, sets: 3, reps: 10, weight: 'TBD' },
                        { name: 'Lat Pulldown', difficulty: 'beginner', equipment: 'machine', movement: 'compound', primary_muscle_group: 'lats', secondary_muscle_group: 'biceps', tertiary_muscle_group: null, sets: 3, reps: 10, weight: 'TBD' },
                        { name: 'Cable Cross', difficulty: 'beginner', equipment: 'cable', movement: 'isolation', primary_muscle_group: 'rearshoulders', secondary_muscle_group: null, tertiary_muscle_group: null, sets: 3, reps: 10, weight: 'TBD' },
                        { name: 'Bicep Curls', difficulty: 'beginner', equipment: 'dumbbell', movement: 'isolation', primary_muscle_group: 'biceps', secondary_muscle_group: null, tertiary_muscle_group: null, sets: 3, reps: 12, weight: 'TBD' },
                        { name: 'Hammer Curls', difficulty: 'beginner', equipment: 'dumbbell', movement: 'isolation', primary_muscle_group: 'brachialis', secondary_muscle_group: null, tertiary_muscle_group: null, sets: 3, reps: 12, weight: 'TBD' }
                    ],
                    [
                        { name: 'Squats', difficulty: 'beginner', equipment: 'bodyweight', movement: 'compound', primary_muscle_group: 'quads', secondary_muscle_group: 'hamstrings', tertiary_muscle_group: 'glutes', sets: 3, reps: 10, weight: 'TBD' },
                        { name: 'Leg Press', difficulty: 'beginner', equipment: 'machine', movement: 'compound', primary_muscle_group: 'quads', secondary_muscle_group: 'hamstrings', tertiary_muscle_group: 'glutes', sets: 3, reps: 10, weight: 'TBD' },
                        { name: 'Leg Extension', difficulty: 'beginner', equipment: 'machine', movement: 'isolation', primary_muscle_group: 'quads', secondary_muscle_group: null, tertiary_muscle_group: null, sets: 3, reps: 12, weight: 'TBD' },
                        { name: 'Leg Curl', difficulty: 'beginner', equipment: 'machine', movement: 'isolation', primary_muscle_group: 'hamstrings', secondary_muscle_group: null, tertiary_muscle_group: null, sets: 3, reps: 12, weight: 'TBD' },
                        { name: 'Knee Raises', difficulty: 'beginner', equipment: 'machine', movement: 'isolation', primary_muscle_group: 'abs', secondary_muscle_group: null, tertiary_muscle_group: null, sets: 3, reps: 15, weight: 'TBD' }
                    ],
                    [
                        { name: 'Barbell Bench Press', difficulty: 'beginner', equipment: 'barbell', movement: 'compound', primary_muscle_group: 'chest', secondary_muscle_group: 'triceps', tertiary_muscle_group: 'shoulders', sets: 3, reps: 10, weight: 'TBD' },
                        { name: 'Incline Dumbbell Press', difficulty: 'intermediate', equipment: 'dumbbell', movement: 'compound', primary_muscle_group: 'upperchest', secondary_muscle_group: 'shoulders', tertiary_muscle_group: 'triceps', sets: 3, reps: 10, weight: 'TBD' },
                        { name: 'Cable Chest Flys', difficulty: 'beginner', equipment: 'cable', movement: 'isolation', primary_muscle_group: 'rearshoulders', secondary_muscle_group: null, tertiary_muscle_group: null, sets: 3, reps: 10, weight: 'TBD' },
                        { name: 'Lateral Raises', difficulty: 'beginner', equipment: 'dumbbell', movement: 'isolation', primary_muscle_group: 'lateralshoulders', secondary_muscle_group: null, tertiary_muscle_group: null, sets: 3, reps: 12, weight: 'TBD' },
                        { name: 'Tricep Pushdowns', difficulty: 'beginner', equipment: 'cable', movement: 'isolation', primary_muscle_group: 'lateraltriceps', secondary_muscle_group: null, tertiary_muscle_group: null, sets: 3, reps: 12, weight: 'TBD' },
                        { name: 'Incline Dumbbell Skull Crushers', difficulty: 'beginner', equipment: 'dumbbell', movement: 'isolation', primary_muscle_group: 'longtriceps', secondary_muscle_group: null, tertiary_muscle_group: null, sets: 3, reps: 12, weight: 'TBD' }
                    ],
                    [
                        { name: 'Pull-ups', difficulty: 'beginner', equipment: 'bodyweight', movement: 'compound', primary_muscle_group: 'lats', secondary_muscle_group: 'biceps', tertiary_muscle_group: null, sets: 3, reps: 10, weight: 'TBD' },
                        { name: 'Cable Row', difficulty: 'beginner', equipment: 'machine', movement: 'compound', primary_muscle_group: 'middleback', secondary_muscle_group: 'biceps', tertiary_muscle_group: null, sets: 3, reps: 10, weight: 'TBD' },
                        { name: 'Lat Pulldown', difficulty: 'beginner', equipment: 'machine', movement: 'compound', primary_muscle_group: 'lats', secondary_muscle_group: 'biceps', tertiary_muscle_group: null, sets: 3, reps: 10, weight: 'TBD' },
                        { name: 'Cable Cross', difficulty: 'beginner', equipment: 'cable', movement: 'isolation', primary_muscle_group: 'rearshoulders', secondary_muscle_group: null, tertiary_muscle_group: null, sets: 3, reps: 10, weight: 'TBD' },
                        { name: 'Bicep Curls', difficulty: 'beginner', equipment: 'dumbbell', movement: 'isolation', primary_muscle_group: 'biceps', secondary_muscle_group: null, tertiary_muscle_group: null, sets: 3, reps: 12, weight: 'TBD' },
                        { name: 'Hammer Curls', difficulty: 'beginner', equipment: 'dumbbell', movement: 'isolation', primary_muscle_group: 'brachialis', secondary_muscle_group: null, tertiary_muscle_group: null, sets: 3, reps: 12, weight: 'TBD' }
                    ],
                    [
                        { name: 'Squats', difficulty: 'beginner', equipment: 'bodyweight', movement: 'compound', primary_muscle_group: 'quads', secondary_muscle_group: 'hamstrings', tertiary_muscle_group: 'glutes', sets: 3, reps: 10, weight: 'TBD' },
                        { name: 'Leg Press', difficulty: 'beginner', equipment: 'machine', movement: 'compound', primary_muscle_group: 'quads', secondary_muscle_group: 'hamstrings', tertiary_muscle_group: 'glutes', sets: 3, reps: 10, weight: 'TBD' },
                        { name: 'Leg Extension', difficulty: 'beginner', equipment: 'machine', movement: 'isolation', primary_muscle_group: 'quads', secondary_muscle_group: null, tertiary_muscle_group: null, sets: 3, reps: 12, weight: 'TBD' },
                        { name: 'Leg Curl', difficulty: 'beginner', equipment: 'machine', movement: 'isolation', primary_muscle_group: 'hamstrings', secondary_muscle_group: null, tertiary_muscle_group: null, sets: 3, reps: 12, weight: 'TBD' },
                        { name: 'Knee Raises', difficulty: 'beginner', equipment: 'machine', movement: 'isolation', primary_muscle_group: 'abs', secondary_muscle_group: null, tertiary_muscle_group: null, sets: 3, reps: 15, weight: 'TBD' }
                    ]
                ],
                7: [
                    [
                        { name: 'Barbell Bench Press', difficulty: 'beginner', equipment: 'barbell', movement: 'compound', primary_muscle_group: 'chest', secondary_muscle_group: 'triceps', tertiary_muscle_group: 'shoulders', sets: 3, reps: 10, weight: 'TBD' },
                        { name: 'Incline Dumbbell Press', difficulty: 'intermediate', equipment: 'dumbbell', movement: 'compound', primary_muscle_group: 'upperchest', secondary_muscle_group: 'shoulders', tertiary_muscle_group: 'triceps', sets: 3, reps: 10, weight: 'TBD' },
                        { name: 'Cable Chest Flys', difficulty: 'beginner', equipment: 'cable', movement: 'isolation', primary_muscle_group: 'rearshoulders', secondary_muscle_group: null, tertiary_muscle_group: null, sets: 3, reps: 10, weight: 'TBD' },
                        { name: 'Lateral Raises', difficulty: 'beginner', equipment: 'dumbbell', movement: 'isolation', primary_muscle_group: 'lateralshoulders', secondary_muscle_group: null, tertiary_muscle_group: null, sets: 3, reps: 12, weight: 'TBD' },
                        { name: 'Tricep Pushdowns', difficulty: 'beginner', equipment: 'cable', movement: 'isolation', primary_muscle_group: 'lateraltriceps', secondary_muscle_group: null, tertiary_muscle_group: null, sets: 3, reps: 12, weight: 'TBD' },
                        { name: 'Incline Dumbbell Skull Crushers', difficulty: 'beginner', equipment: 'dumbbell', movement: 'isolation', primary_muscle_group: 'longtriceps', secondary_muscle_group: null, tertiary_muscle_group: null, sets: 3, reps: 12, weight: 'TBD' }
                    ],
                    [
                        { name: 'Pull-ups', difficulty: 'beginner', equipment: 'bodyweight', movement: 'compound', primary_muscle_group: 'lats', secondary_muscle_group: 'biceps', tertiary_muscle_group: null, sets: 3, reps: 10, weight: 'TBD' },
                        { name: 'Cable Row', difficulty: 'beginner', equipment: 'machine', movement: 'compound', primary_muscle_group: 'middleback', secondary_muscle_group: 'biceps', tertiary_muscle_group: null, sets: 3, reps: 10, weight: 'TBD' },
                        { name: 'Lat Pulldown', difficulty: 'beginner', equipment: 'machine', movement: 'compound', primary_muscle_group: 'lats', secondary_muscle_group: 'biceps', tertiary_muscle_group: null, sets: 3, reps: 10, weight: 'TBD' },
                        { name: 'Cable Cross', difficulty: 'beginner', equipment: 'cable', movement: 'isolation', primary_muscle_group: 'rearshoulders', secondary_muscle_group: null, tertiary_muscle_group: null, sets: 3, reps: 10, weight: 'TBD' },
                        { name: 'Bicep Curls', difficulty: 'beginner', equipment: 'dumbbell', movement: 'isolation', primary_muscle_group: 'biceps', secondary_muscle_group: null, tertiary_muscle_group: null, sets: 3, reps: 12, weight: 'TBD' },
                        { name: 'Hammer Curls', difficulty: 'beginner', equipment: 'dumbbell', movement: 'isolation', primary_muscle_group: 'brachialis', secondary_muscle_group: null, tertiary_muscle_group: null, sets: 3, reps: 12, weight: 'TBD' }
                    ],
                    [
                        { name: 'Squats', difficulty: 'beginner', equipment: 'bodyweight', movement: 'compound', primary_muscle_group: 'quads', secondary_muscle_group: 'hamstrings', tertiary_muscle_group: 'glutes', sets: 3, reps: 10, weight: 'TBD' },
                        { name: 'Leg Press', difficulty: 'beginner', equipment: 'machine', movement: 'compound', primary_muscle_group: 'quads', secondary_muscle_group: 'hamstrings', tertiary_muscle_group: 'glutes', sets: 3, reps: 10, weight: 'TBD' },
                        { name: 'Leg Extension', difficulty: 'beginner', equipment: 'machine', movement: 'isolation', primary_muscle_group: 'quads', secondary_muscle_group: null, tertiary_muscle_group: null, sets: 3, reps: 12, weight: 'TBD' },
                        { name: 'Leg Curl', difficulty: 'beginner', equipment: 'machine', movement: 'isolation', primary_muscle_group: 'hamstrings', secondary_muscle_group: null, tertiary_muscle_group: null, sets: 3, reps: 12, weight: 'TBD' },
                        { name: 'Knee Raises', difficulty: 'beginner', equipment: 'machine', movement: 'isolation', primary_muscle_group: 'abs', secondary_muscle_group: null, tertiary_muscle_group: null, sets: 3, reps: 15, weight: 'TBD' }
                    ],
                    [
                        { name: 'Shoulder Press', difficulty: 'beginner', equipment: 'dumbbell', movement: 'isolation', primary_muscle_group: 'frontalshoulders', secondary_muscle_group: null, tertiary_muscle_group: null, sets: 3, reps: 10, weight: 'TBD' },
                        { name: 'Lateral Raises', difficulty: 'beginner', equipment: 'dumbbell', movement: 'isolation', primary_muscle_group: 'lateralshoulders', secondary_muscle_group: null, tertiary_muscle_group: null, sets: 3, reps: 12, weight: 'TBD' },
                        { name: 'Cable Cross', difficulty: 'beginner', equipment: 'cable', movement: 'isolation', primary_muscle_group: 'rearshoulders', secondary_muscle_group: null, tertiary_muscle_group: null, sets: 3, reps: 10, weight: 'TBD' },
                        { name: 'EZ Bar Close Grip Curls', difficulty: 'beginner', equipment: 'barbell', movement: 'isolation', primary_muscle_group: 'longbiceps', secondary_muscle_group: null, tertiary_muscle_group: null, sets: 3, reps: 12, weight: 'TBD' },
                        { name: 'EZ Bar Skull Crushers', difficulty: 'beginner', equipment: 'barbell', movement: 'isolation', primary_muscle_group: 'longtriceps', secondary_muscle_group: null, tertiary_muscle_group: null, sets: 3, reps: 12, weight: 'TBD' },
                        { name: 'Wide Grip Barbell Curls', difficulty: 'beginner', equipment: 'barbell', movement: 'isolation', primary_muscle_group: 'shortbiceps', secondary_muscle_group: null, tertiary_muscle_group: null, sets: 3, reps: 12, weight: 'TBD' },
                        { name: 'Tricep Pushdowns', difficulty: 'beginner', equipment: 'cable', movement: 'isolation', primary_muscle_group: 'lateraltriceps', secondary_muscle_group: null, tertiary_muscle_group: null, sets: 3, reps: 12, weight: 'TBD' }
                    ],
                    [
                        { name: 'Barbell Bench Press', difficulty: 'beginner', equipment: 'barbell', movement: 'compound', primary_muscle_group: 'chest', secondary_muscle_group: 'triceps', tertiary_muscle_group: 'shoulders', sets: 3, reps: 10, weight: 'TBD' },
                        { name: 'Incline Dumbbell Press', difficulty: 'intermediate', equipment: 'dumbbell', movement: 'compound', primary_muscle_group: 'upperchest', secondary_muscle_group: 'shoulders', tertiary_muscle_group: 'triceps', sets: 3, reps: 10, weight: 'TBD' },
                        { name: 'Cable Chest Flys', difficulty: 'beginner', equipment: 'cable', movement: 'isolation', primary_muscle_group: 'rearshoulders', secondary_muscle_group: null, tertiary_muscle_group: null, sets: 3, reps: 10, weight: 'TBD' },
                        { name: 'Lateral Raises', difficulty: 'beginner', equipment: 'dumbbell', movement: 'isolation', primary_muscle_group: 'lateralshoulders', secondary_muscle_group: null, tertiary_muscle_group: null, sets: 3, reps: 12, weight: 'TBD' },
                        { name: 'Tricep Pushdowns', difficulty: 'beginner', equipment: 'cable', movement: 'isolation', primary_muscle_group: 'lateraltriceps', secondary_muscle_group: null, tertiary_muscle_group: null, sets: 3, reps: 12, weight: 'TBD' },
                        { name: 'Incline Dumbbell Skull Crushers', difficulty: 'beginner', equipment: 'dumbbell', movement: 'isolation', primary_muscle_group: 'longtriceps', secondary_muscle_group: null, tertiary_muscle_group: null, sets: 3, reps: 12, weight: 'TBD' }
                    ],
                    [
                        { name: 'Pull-ups', difficulty: 'beginner', equipment: 'bodyweight', movement: 'compound', primary_muscle_group: 'lats', secondary_muscle_group: 'biceps', tertiary_muscle_group: null, sets: 3, reps: 10, weight: 'TBD' },
                        { name: 'Cable Row', difficulty: 'beginner', equipment: 'machine', movement: 'compound', primary_muscle_group: 'middleback', secondary_muscle_group: 'biceps', tertiary_muscle_group: null, sets: 3, reps: 10, weight: 'TBD' },
                        { name: 'Lat Pulldown', difficulty: 'beginner', equipment: 'machine', movement: 'compound', primary_muscle_group: 'lats', secondary_muscle_group: 'biceps', tertiary_muscle_group: null, sets: 3, reps: 10, weight: 'TBD' },
                        { name: 'Cable Cross', difficulty: 'beginner', equipment: 'cable', movement: 'isolation', primary_muscle_group: 'rearshoulders', secondary_muscle_group: null, tertiary_muscle_group: null, sets: 3, reps: 10, weight: 'TBD' },
                        { name: 'Bicep Curls', difficulty: 'beginner', equipment: 'dumbbell', movement: 'isolation', primary_muscle_group: 'biceps', secondary_muscle_group: null, tertiary_muscle_group: null, sets: 3, reps: 12, weight: 'TBD' },
                        { name: 'Hammer Curls', difficulty: 'beginner', equipment: 'dumbbell', movement: 'isolation', primary_muscle_group: 'brachialis', secondary_muscle_group: null, tertiary_muscle_group: null, sets: 3, reps: 12, weight: 'TBD' }
                    ],
                    [
                        { name: 'Squats', difficulty: 'beginner', equipment: 'bodyweight', movement: 'compound', primary_muscle_group: 'quads', secondary_muscle_group: 'hamstrings', tertiary_muscle_group: 'glutes', sets: 3, reps: 10, weight: 'TBD' },
                        { name: 'Leg Press', difficulty: 'beginner', equipment: 'machine', movement: 'compound', primary_muscle_group: 'quads', secondary_muscle_group: 'hamstrings', tertiary_muscle_group: 'glutes', sets: 3, reps: 10, weight: 'TBD' },
                        { name: 'Leg Extension', difficulty: 'beginner', equipment: 'machine', movement: 'isolation', primary_muscle_group: 'quads', secondary_muscle_group: null, tertiary_muscle_group: null, sets: 3, reps: 12, weight: 'TBD' },
                        { name: 'Leg Curl', difficulty: 'beginner', equipment: 'machine', movement: 'isolation', primary_muscle_group: 'hamstrings', secondary_muscle_group: null, tertiary_muscle_group: null, sets: 3, reps: 12, weight: 'TBD' },
                        { name: 'Knee Raises', difficulty: 'beginner', equipment: 'machine', movement: 'isolation', primary_muscle_group: 'abs', secondary_muscle_group: null, tertiary_muscle_group: null, sets: 3, reps: 15, weight: 'TBD' }
                    ]
                ]
            },
            overweight: {
                3: [
                    [{ name: 'Dumbbell Bench Press', difficulty: 'beginner', equipment: 'dumbbell', movement: 'compound', primary_muscle_group: 'chest', secondary_muscle_group: 'triceps', tertiary_muscle_group: 'shoulders', sets: 3, reps: 10, weight: 'TBD' }, { name: 'Incline Dumbbell Press', difficulty: 'intermediate', equipment: 'dumbbell', movement: 'compound', primary_muscle_group: 'upperchest', secondary_muscle_group: 'shoulders', tertiary_muscle_group: 'triceps', sets: 3, reps: 10, weight: 'TBD' }, { name: 'Cable Chest Flys', difficulty: 'beginner', equipment: 'cable', movement: 'isolation', primary_muscle_group: 'rearshoulders', secondary_muscle_group: null, tertiary_muscle_group: null, sets: 3, reps: 10, weight: 'TBD' }, { name: 'Lateral Raises', difficulty: 'beginner', equipment: 'dumbbell', movement: 'isolation', primary_muscle_group: 'lateralshoulders', secondary_muscle_group: null, tertiary_muscle_group: null, sets: 3, reps: 12, weight: 'TBD' }, { name: 'Tricep Pushdowns', difficulty: 'beginner', equipment: 'cable', movement: 'isolation', primary_muscle_group: 'lateraltriceps', secondary_muscle_group: null, tertiary_muscle_group: null, sets: 3, reps: 12, weight: 'TBD' }, { name: 'Incline Dumbbell Skull Crushers', difficulty: 'beginner', equipment: 'dumbbell', movement: 'isolation', primary_muscle_group: 'longtriceps', secondary_muscle_group: null, tertiary_muscle_group: null, sets: 3, reps: 12, weight: 'TBD' }],
                    [{ name: 'Pull-ups', difficulty: 'beginner', equipment: 'bodyweight', movement: 'compound', primary_muscle_group: 'lats', secondary_muscle_group: 'biceps', tertiary_muscle_group: null, sets: 3, reps: 10, weight: 'TBD' }, { name: 'Cable Row', difficulty: 'beginner', equipment: 'machine', movement: 'compound', primary_muscle_group: 'middleback', secondary_muscle_group: 'biceps', tertiary_muscle_group: null, sets: 3, reps: 10, weight: 'TBD' }, { name: 'Lat Pulldown', difficulty: 'beginner', equipment: 'machine', movement: 'compound', primary_muscle_group: 'lats', secondary_muscle_group: 'biceps', tertiary_muscle_group: null, sets: 3, reps: 10, weight: 'TBD' }, { name: 'Cable Cross', difficulty: 'beginner', equipment: 'cable', movement: 'isolation', primary_muscle_group: 'rearshoulders', secondary_muscle_group: null, tertiary_muscle_group: null, sets: 3, reps: 10, weight: 'TBD' }, { name: 'Bicep Curls', difficulty: 'beginner', equipment: 'dumbbell', movement: 'isolation', primary_muscle_group: 'biceps', secondary_muscle_group: null, tertiary_muscle_group: null, sets: 3, reps: 12, weight: 'TBD' }, { name: 'Hammer Curls', difficulty: 'beginner', equipment: 'dumbbell', movement: 'isolation', primary_muscle_group: 'brachialis', secondary_muscle_group: null, tertiary_muscle_group: null, sets: 3, reps: 12, weight: 'TBD' }],
                    [{ name: 'Squats', difficulty: 'beginner', equipment: 'barbell', movement: 'compound', primary_muscle_group: 'quads', secondary_muscle_group: 'hamstrings', tertiary_muscle_group: 'glutes', sets: 3, reps: 10, weight: 'TBD' }, { name: 'Leg Press', difficulty: 'beginner', equipment: 'machine', movement: 'compound', primary_muscle_group: 'quads', secondary_muscle_group: 'hamstrings', tertiary_muscle_group: 'glutes', sets: 3, reps: 10, weight: 'TBD' }, { name: 'Leg Extension', difficulty: 'beginner', equipment: 'machine', movement: 'isolation', primary_muscle_group: 'quads', secondary_muscle_group: null, tertiary_muscle_group: null, sets: 3, reps: 12, weight: 'TBD' }, { name: 'Leg Curl', difficulty: 'beginner', equipment: 'machine', movement: 'isolation', primary_muscle_group: 'hamstrings', secondary_muscle_group: null, tertiary_muscle_group: null, sets: 3, reps: 12, weight: 'TBD' }, { name: 'Knee Raises', difficulty: 'beginner', equipment: 'machine', movement: 'isolation', primary_muscle_group: 'abs', secondary_muscle_group: null, tertiary_muscle_group: null, sets: 3, reps: 15, weight: 'TBD' }]
                ],
            },
        },
        intermediate: {
            underweight: {},
            normal: {},
            overweight: {
                3: [

                ],
                4: [ /* … */],
            },
        },
        advanced: {
            underweight: {},
            normal: {},
            overweight: {
                3: [

                ],
                4: [ /* … */],
            },
        },
    },

    gain: {
        beginner: {
            underweight: {},
            normal: {
                2: [
                    [{ name: 'Squats', difficulty: 'beginner', equipment: 'barbell', movement: 'compound', primary_muscle_group: 'quads', secondary_muscle_group: 'hamstrings', tertiary_muscle_group: 'glutes', sets: 3, reps: 10, weight: 'TBD' }, { name: 'Leg Press', difficulty: 'beginner', equipment: 'machine', movement: 'compound', primary_muscle_group: 'quads', secondary_muscle_group: 'hamstrings', tertiary_muscle_group: 'glutes', sets: 3, reps: 10, weight: 'TBD' }, { name: 'Low Row', difficulty: 'beginner', equipment: 'machine', movement: 'compound', primary_muscle_group: 'middleback', secondary_muscle_group: 'biceps', tertiary_muscle_group: null, sets: 3, reps: 10, weight: 'TBD' }, { name: 'Lat Pulldown', difficulty: 'beginner', equipment: 'machine', movement: 'compound', primary_muscle_group: 'lats', secondary_muscle_group: 'biceps', tertiary_muscle_group: null, sets: 3, reps: 10, weight: 'TBD' }, { name: 'Dumbbell Bench Press', difficulty: 'beginner', equipment: 'dumbbell', movement: 'compound', primary_muscle_group: 'chest', secondary_muscle_group: 'triceps', tertiary_muscle_group: 'shoulders', sets: 3, reps: 10, weight: 'TBD' }, { name: 'Incline Dumbbell Press', difficulty: 'intermediate', equipment: 'dumbbell', movement: 'compound', primary_muscle_group: 'upperchest', secondary_muscle_group: 'shoulders', tertiary_muscle_group: 'triceps', sets: 3, reps: 10, weight: 'TBD' }],
                    [{ name: 'Squats', difficulty: 'beginner', equipment: 'barbell', movement: 'compound', primary_muscle_group: 'quads', secondary_muscle_group: 'hamstrings', tertiary_muscle_group: 'glutes', sets: 3, reps: 10, weight: 'TBD' }, { name: 'Leg Press', difficulty: 'beginner', equipment: 'machine', movement: 'compound', primary_muscle_group: 'quads', secondary_muscle_group: 'hamstrings', tertiary_muscle_group: 'glutes', sets: 3, reps: 10, weight: 'TBD' }, { name: 'Cable Row', difficulty: 'beginner', equipment: 'machine', movement: 'compound', primary_muscle_group: 'middleback', secondary_muscle_group: 'biceps', tertiary_muscle_group: null, sets: 3, reps: 10, weight: 'TBD' }, { name: 'Lat Pulldown', difficulty: 'beginner', equipment: 'machine', movement: 'compound', primary_muscle_group: 'lats', secondary_muscle_group: 'biceps', tertiary_muscle_group: null, sets: 3, reps: 10, weight: 'TBD' }, { name: 'Dumbbell Bench Press', difficulty: 'beginner', equipment: 'dumbbell', movement: 'compound', primary_muscle_group: 'chest', secondary_muscle_group: 'triceps', tertiary_muscle_group: 'shoulders', sets: 3, reps: 10, weight: 'TBD' }, { name: 'Incline Dumbbell Press', difficulty: 'intermediate', equipment: 'dumbbell', movement: 'compound', primary_muscle_group: 'upperchest', secondary_muscle_group: 'shoulders', tertiary_muscle_group: 'triceps', sets: 3, reps: 10, weight: 'TBD' }]
                ],
                3: [
                    [{ name: 'Barbell Bench Press', difficulty: 'beginner', equipment: 'barbell', movement: 'compound', primary_muscle_group: 'chest', secondary_muscle_group: 'triceps', tertiary_muscle_group: 'shoulders', sets: 3, reps: 10, weight: 'TBD' }, { name: 'Incline Dumbbell Press', difficulty: 'intermediate', equipment: 'dumbbell', movement: 'compound', primary_muscle_group: 'upperchest', secondary_muscle_group: 'shoulders', tertiary_muscle_group: 'triceps', sets: 3, reps: 10, weight: 'TBD' }, { name: 'Cable Chest Flys', difficulty: 'beginner', equipment: 'cable', movement: 'isolation', primary_muscle_group: 'rearshoulders', secondary_muscle_group: null, tertiary_muscle_group: null, sets: 3, reps: 10, weight: 'TBD' }, { name: 'Lateral Raises', difficulty: 'beginner', equipment: 'dumbbell', movement: 'isolation', primary_muscle_group: 'lateralshoulders', secondary_muscle_group: null, tertiary_muscle_group: null, sets: 3, reps: 12, weight: 'TBD' }, { name: 'Tricep Pushdowns', difficulty: 'beginner', equipment: 'cable', movement: 'isolation', primary_muscle_group: 'lateraltriceps', secondary_muscle_group: null, tertiary_muscle_group: null, sets: 3, reps: 12, weight: 'TBD' }, { name: 'Incline Dumbbell Skull Crushers', difficulty: 'beginner', equipment: 'dumbbell', movement: 'isolation', primary_muscle_group: 'longtriceps', secondary_muscle_group: null, tertiary_muscle_group: null, sets: 3, reps: 12, weight: 'TBD' }],
                    [{ name: 'Pull-ups', difficulty: 'beginner', equipment: 'bodyweight', movement: 'compound', primary_muscle_group: 'lats', secondary_muscle_group: 'biceps', tertiary_muscle_group: null, sets: 3, reps: 10, weight: 'TBD' }, { name: 'Cable Row', difficulty: 'beginner', equipment: 'machine', movement: 'compound', primary_muscle_group: 'middleback', secondary_muscle_group: 'biceps', tertiary_muscle_group: null, sets: 3, reps: 10, weight: 'TBD' }, { name: 'Lat Pulldown', difficulty: 'beginner', equipment: 'machine', movement: 'compound', primary_muscle_group: 'lats', secondary_muscle_group: 'biceps', tertiary_muscle_group: null, sets: 3, reps: 10, weight: 'TBD' }, { name: 'Cable Cross', difficulty: 'beginner', equipment: 'cable', movement: 'isolation', primary_muscle_group: 'rearshoulders', secondary_muscle_group: null, tertiary_muscle_group: null, sets: 3, reps: 10, weight: 'TBD' }, { name: 'Bicep Curls', difficulty: 'beginner', equipment: 'dumbbell', movement: 'isolation', primary_muscle_group: 'biceps', secondary_muscle_group: null, tertiary_muscle_group: null, sets: 3, reps: 12, weight: 'TBD' }, { name: 'Hammer Curls', difficulty: 'beginner', equipment: 'dumbbell', movement: 'isolation', primary_muscle_group: 'brachialis', secondary_muscle_group: null, tertiary_muscle_group: null, sets: 3, reps: 12, weight: 'TBD' }],
                    [{ name: 'Squats', difficulty: 'beginner', equipment: 'barbell', movement: 'compound', primary_muscle_group: 'quads', secondary_muscle_group: 'hamstrings', tertiary_muscle_group: 'glutes', sets: 3, reps: 10, weight: 'TBD' }, { name: 'Leg Press', difficulty: 'beginner', equipment: 'machine', movement: 'compound', primary_muscle_group: 'quads', secondary_muscle_group: 'hamstrings', tertiary_muscle_group: 'glutes', sets: 3, reps: 10, weight: 'TBD' }, { name: 'Leg Extension', difficulty: 'beginner', equipment: 'machine', movement: 'isolation', primary_muscle_group: 'quads', secondary_muscle_group: null, tertiary_muscle_group: null, sets: 3, reps: 12, weight: 'TBD' }, { name: 'Leg Curl', difficulty: 'beginner', equipment: 'machine', movement: 'isolation', primary_muscle_group: 'hamstrings', secondary_muscle_group: null, tertiary_muscle_group: null, sets: 3, reps: 12, weight: 'TBD' }, { name: 'Knee Raises', difficulty: 'beginner', equipment: 'machine', movement: 'isolation', primary_muscle_group: 'abs', secondary_muscle_group: null, tertiary_muscle_group: null, sets: 3, reps: 15, weight: 'TBD' }]
                ],
                4: [
                    [
                        { name: 'Barbell Bench Press', difficulty: 'beginner', equipment: 'barbell', movement: 'compound', primary_muscle_group: 'chest', secondary_muscle_group: 'triceps', tertiary_muscle_group: 'shoulders', sets: 3, reps: 10, weight: 'TBD' },
                        { name: 'Lat Pulldown', difficulty: 'beginner', equipment: 'machine', movement: 'compound', primary_muscle_group: 'lats', secondary_muscle_group: 'biceps', tertiary_muscle_group: null, sets: 3, reps: 10, weight: 'TBD' },
                        { name: 'Cable Chest Flys', difficulty: 'beginner', equipment: 'cable', movement: 'isolation', primary_muscle_group: 'rearshoulders', secondary_muscle_group: null, tertiary_muscle_group: null, sets: 3, reps: 10, weight: 'TBD' },
                        { name: 'Cable Row', difficulty: 'beginner', equipment: 'machine', movement: 'compound', primary_muscle_group: 'middleback', secondary_muscle_group: 'biceps', tertiary_muscle_group: null, sets: 3, reps: 10, weight: 'TBD' },
                        { name: 'Lateral Raises', difficulty: 'beginner', equipment: 'dumbbell', movement: 'isolation', primary_muscle_group: 'lateralshoulders', secondary_muscle_group: null, tertiary_muscle_group: null, sets: 3, reps: 12, weight: 'TBD' },
                        { name: 'Tricep Pushdowns', difficulty: 'beginner', equipment: 'cable', movement: 'isolation', primary_muscle_group: 'lateraltriceps', secondary_muscle_group: null, tertiary_muscle_group: null, sets: 3, reps: 12, weight: 'TBD' },
                        { name: 'Bicep Curls', difficulty: 'beginner', equipment: 'dumbbell', movement: 'isolation', primary_muscle_group: 'biceps', secondary_muscle_group: null, tertiary_muscle_group: null, sets: 3, reps: 12, weight: 'TBD' },
                        { name: 'Incline Dumbbell Skull Crushers', difficulty: 'beginner', equipment: 'dumbbell', movement: 'isolation', primary_muscle_group: 'longtriceps', secondary_muscle_group: null, tertiary_muscle_group: null, sets: 3, reps: 12, weight: 'TBD' }
                    ],
                    [{ name: 'Squats', difficulty: 'beginner', equipment: 'barbell', movement: 'compound', primary_muscle_group: 'quads', secondary_muscle_group: 'hamstrings', tertiary_muscle_group: 'glutes', sets: 3, reps: 10, weight: 'TBD' }, { name: 'Leg Press', difficulty: 'beginner', equipment: 'machine', movement: 'compound', primary_muscle_group: 'quads', secondary_muscle_group: 'hamstrings', tertiary_muscle_group: 'glutes', sets: 3, reps: 10, weight: 'TBD' }, { name: 'Leg Extension', difficulty: 'beginner', equipment: 'machine', movement: 'isolation', primary_muscle_group: 'quads', secondary_muscle_group: null, tertiary_muscle_group: null, sets: 3, reps: 12, weight: 'TBD' }, { name: 'Leg Curl', difficulty: 'beginner', equipment: 'machine', movement: 'isolation', primary_muscle_group: 'hamstrings', secondary_muscle_group: null, tertiary_muscle_group: null, sets: 3, reps: 12, weight: 'TBD' }, { name: 'Knee Raises', difficulty: 'beginner', equipment: 'machine', movement: 'isolation', primary_muscle_group: 'abs', secondary_muscle_group: null, tertiary_muscle_group: null, sets: 3, reps: 15, weight: 'TBD' }],
                    [
                        { name: 'Pull-ups', difficulty: 'beginner', equipment: 'bodyweight', movement: 'compound', primary_muscle_group: 'lats', secondary_muscle_group: 'biceps', tertiary_muscle_group: null, sets: 3, reps: 10, weight: 'TBD' },
                        { name: 'Dumbbell Bench Press', difficulty: 'beginner', equipment: 'dumbbell', movement: 'compound', primary_muscle_group: 'chest', secondary_muscle_group: 'triceps', tertiary_muscle_group: 'shoulders', sets: 3, reps: 10, weight: 'TBD' },
                        { name: 'Cable Row', difficulty: 'beginner', equipment: 'machine', movement: 'compound', primary_muscle_group: 'middleback', secondary_muscle_group: 'biceps', tertiary_muscle_group: null, sets: 3, reps: 10, weight: 'TBD' },
                        { name: 'Cable Chest Flys', difficulty: 'beginner', equipment: 'cable', movement: 'isolation', primary_muscle_group: 'rearshoulders', secondary_muscle_group: null, tertiary_muscle_group: null, sets: 3, reps: 10, weight: 'TBD' },
                        { name: 'Lateral Raises', difficulty: 'beginner', equipment: 'dumbbell', movement: 'isolation', primary_muscle_group: 'lateralshoulders', secondary_muscle_group: null, tertiary_muscle_group: null, sets: 3, reps: 12, weight: 'TBD' },
                        { name: 'Cable Cross', difficulty: 'beginner', equipment: 'cable', movement: 'isolation', primary_muscle_group: 'rearshoulders', secondary_muscle_group: null, tertiary_muscle_group: null, sets: 3, reps: 10, weight: 'TBD' },
                        { name: 'EZ Bar Close Grip Curls', difficulty: 'beginner', equipment: 'barbell', movement: 'isolation', primary_muscle_group: 'longbiceps', secondary_muscle_group: null, tertiary_muscle_group: null, sets: 3, reps: 12, weight: 'TBD' },
                        { name: 'EZ Bar Skull Crushers', difficulty: 'beginner', equipment: 'barbell', movement: 'isolation', primary_muscle_group: 'longtriceps', secondary_muscle_group: null, tertiary_muscle_group: null, sets: 3, reps: 12, weight: 'TBD' },
                        { name: 'Wide Grip Barbell Curls', difficulty: 'beginner', equipment: 'barbell', movement: 'isolation', primary_muscle_group: 'shortbiceps', secondary_muscle_group: null, tertiary_muscle_group: null, sets: 3, reps: 12, weight: 'TBD' }
                    ],
                    [{ name: 'Squats', difficulty: 'beginner', equipment: 'barbell', movement: 'compound', primary_muscle_group: 'quads', secondary_muscle_group: 'hamstrings', tertiary_muscle_group: 'glutes', sets: 3, reps: 10, weight: 'TBD' }, { name: 'Leg Press', difficulty: 'beginner', equipment: 'machine', movement: 'compound', primary_muscle_group: 'quads', secondary_muscle_group: 'hamstrings', tertiary_muscle_group: 'glutes', sets: 3, reps: 10, weight: 'TBD' }, { name: 'Leg Extension', difficulty: 'beginner', equipment: 'machine', movement: 'isolation', primary_muscle_group: 'quads', secondary_muscle_group: null, tertiary_muscle_group: null, sets: 3, reps: 12, weight: 'TBD' }, { name: 'Leg Curl', difficulty: 'beginner', equipment: 'machine', movement: 'isolation', primary_muscle_group: 'hamstrings', secondary_muscle_group: null, tertiary_muscle_group: null, sets: 3, reps: 12, weight: 'TBD' }, { name: 'Knee Raises', difficulty: 'beginner', equipment: 'machine', movement: 'isolation', primary_muscle_group: 'abs', secondary_muscle_group: null, tertiary_muscle_group: null, sets: 3, reps: 15, weight: 'TBD' }]
                ],
                5: [[
                    { name: 'Barbell Bench Press', difficulty: 'beginner', equipment: 'barbell', movement: 'compound', primary_muscle_group: 'chest', secondary_muscle_group: 'triceps', tertiary_muscle_group: 'shoulders', sets: 3, reps: 10, weight: 'TBD' },
                    { name: 'Incline Dumbbell Press', difficulty: 'intermediate', equipment: 'dumbbell', movement: 'compound', primary_muscle_group: 'upperchest', secondary_muscle_group: 'shoulders', tertiary_muscle_group: 'triceps', sets: 3, reps: 10, weight: 'TBD' },
                    { name: 'Cable Chest Flys', difficulty: 'beginner', equipment: 'cable', movement: 'isolation', primary_muscle_group: 'rearshoulders', secondary_muscle_group: null, tertiary_muscle_group: null, sets: 3, reps: 10, weight: 'TBD' },
                    { name: 'Lateral Raises', difficulty: 'beginner', equipment: 'dumbbell', movement: 'isolation', primary_muscle_group: 'lateralshoulders', secondary_muscle_group: null, tertiary_muscle_group: null, sets: 3, reps: 12, weight: 'TBD' },
                    { name: 'Tricep Pushdowns', difficulty: 'beginner', equipment: 'cable', movement: 'isolation', primary_muscle_group: 'lateraltriceps', secondary_muscle_group: null, tertiary_muscle_group: null, sets: 3, reps: 12, weight: 'TBD' },
                    { name: 'Incline Dumbbell Skull Crushers', difficulty: 'beginner', equipment: 'dumbbell', movement: 'isolation', primary_muscle_group: 'longtriceps', secondary_muscle_group: null, tertiary_muscle_group: null, sets: 3, reps: 12, weight: 'TBD' }
                ],
                [
                    { name: 'Pull-ups', difficulty: 'beginner', equipment: 'bodyweight', movement: 'compound', primary_muscle_group: 'lats', secondary_muscle_group: 'biceps', tertiary_muscle_group: null, sets: 3, reps: 10, weight: 'TBD' },
                    { name: 'Cable Row', difficulty: 'beginner', equipment: 'machine', movement: 'compound', primary_muscle_group: 'middleback', secondary_muscle_group: 'biceps', tertiary_muscle_group: null, sets: 3, reps: 10, weight: 'TBD' },
                    { name: 'Lat Pulldown', difficulty: 'beginner', equipment: 'machine', movement: 'compound', primary_muscle_group: 'lats', secondary_muscle_group: 'biceps', tertiary_muscle_group: null, sets: 3, reps: 10, weight: 'TBD' },
                    { name: 'Cable Cross', difficulty: 'beginner', equipment: 'cable', movement: 'isolation', primary_muscle_group: 'rearshoulders', secondary_muscle_group: null, tertiary_muscle_group: null, sets: 3, reps: 10, weight: 'TBD' },
                    { name: 'Bicep Curls', difficulty: 'beginner', equipment: 'dumbbell', movement: 'isolation', primary_muscle_group: 'biceps', secondary_muscle_group: null, tertiary_muscle_group: null, sets: 3, reps: 12, weight: 'TBD' },
                    { name: 'Hammer Curls', difficulty: 'beginner', equipment: 'dumbbell', movement: 'isolation', primary_muscle_group: 'brachialis', secondary_muscle_group: null, tertiary_muscle_group: null, sets: 3, reps: 12, weight: 'TBD' }
                ],
                [
                    { name: 'Squats', difficulty: 'beginner', equipment: 'bodyweight', movement: 'compound', primary_muscle_group: 'quads', secondary_muscle_group: 'hamstrings', tertiary_muscle_group: 'glutes', sets: 3, reps: 10, weight: 'TBD' },
                    { name: 'Leg Press', difficulty: 'beginner', equipment: 'machine', movement: 'compound', primary_muscle_group: 'quads', secondary_muscle_group: 'hamstrings', tertiary_muscle_group: 'glutes', sets: 3, reps: 10, weight: 'TBD' },
                    { name: 'Leg Extension', difficulty: 'beginner', equipment: 'machine', movement: 'isolation', primary_muscle_group: 'quads', secondary_muscle_group: null, tertiary_muscle_group: null, sets: 3, reps: 12, weight: 'TBD' },
                    { name: 'Leg Curl', difficulty: 'beginner', equipment: 'machine', movement: 'isolation', primary_muscle_group: 'hamstrings', secondary_muscle_group: null, tertiary_muscle_group: null, sets: 3, reps: 12, weight: 'TBD' },
                    { name: 'Knee Raises', difficulty: 'beginner', equipment: 'machine', movement: 'isolation', primary_muscle_group: 'abs', secondary_muscle_group: null, tertiary_muscle_group: null, sets: 3, reps: 15, weight: 'TBD' }
                ],
                [
                    { name: 'Barbell Bench Press', difficulty: 'beginner', equipment: 'barbell', movement: 'compound', primary_muscle_group: 'chest', secondary_muscle_group: 'triceps', tertiary_muscle_group: 'shoulders', sets: 3, reps: 10, weight: 'TBD' },
                    { name: 'Lat Pulldown', difficulty: 'beginner', equipment: 'machine', movement: 'compound', primary_muscle_group: 'lats', secondary_muscle_group: 'biceps', tertiary_muscle_group: null, sets: 3, reps: 10, weight: 'TBD' },
                    { name: 'Cable Chest Flys', difficulty: 'beginner', equipment: 'cable', movement: 'isolation', primary_muscle_group: 'rearshoulders', secondary_muscle_group: null, tertiary_muscle_group: null, sets: 3, reps: 10, weight: 'TBD' },
                    { name: 'Cable Row', difficulty: 'beginner', equipment: 'machine', movement: 'compound', primary_muscle_group: 'middleback', secondary_muscle_group: 'biceps', tertiary_muscle_group: null, sets: 3, reps: 10, weight: 'TBD' },
                    { name: 'Lateral Raises', difficulty: 'beginner', equipment: 'dumbbell', movement: 'isolation', primary_muscle_group: 'lateralshoulders', secondary_muscle_group: null, tertiary_muscle_group: null, sets: 3, reps: 12, weight: 'TBD' },
                    { name: 'Tricep Pushdowns', difficulty: 'beginner', equipment: 'cable', movement: 'isolation', primary_muscle_group: 'lateraltriceps', secondary_muscle_group: null, tertiary_muscle_group: null, sets: 3, reps: 12, weight: 'TBD' },
                    { name: 'Bicep Curls', difficulty: 'beginner', equipment: 'dumbbell', movement: 'isolation', primary_muscle_group: 'biceps', secondary_muscle_group: null, tertiary_muscle_group: null, sets: 3, reps: 12, weight: 'TBD' },
                    { name: 'Incline Dumbbell Skull Crushers', difficulty: 'beginner', equipment: 'dumbbell', movement: 'isolation', primary_muscle_group: 'longtriceps', secondary_muscle_group: null, tertiary_muscle_group: null, sets: 3, reps: 12, weight: 'TBD' }
                ],
                [
                    { name: 'Squats', difficulty: 'beginner', equipment: 'bodyweight', movement: 'compound', primary_muscle_group: 'quads', secondary_muscle_group: 'hamstrings', tertiary_muscle_group: 'glutes', sets: 3, reps: 10, weight: 'TBD' },
                    { name: 'Leg Press', difficulty: 'beginner', equipment: 'machine', movement: 'compound', primary_muscle_group: 'quads', secondary_muscle_group: 'hamstrings', tertiary_muscle_group: 'glutes', sets: 3, reps: 10, weight: 'TBD' },
                    { name: 'Leg Extension', difficulty: 'beginner', equipment: 'machine', movement: 'isolation', primary_muscle_group: 'quads', secondary_muscle_group: null, tertiary_muscle_group: null, sets: 3, reps: 12, weight: 'TBD' },
                    { name: 'Leg Curl', difficulty: 'beginner', equipment: 'machine', movement: 'isolation', primary_muscle_group: 'hamstrings', secondary_muscle_group: null, tertiary_muscle_group: null, sets: 3, reps: 12, weight: 'TBD' },
                    { name: 'Knee Raises', difficulty: 'beginner', equipment: 'machine', movement: 'isolation', primary_muscle_group: 'abs', secondary_muscle_group: null, tertiary_muscle_group: null, sets: 3, reps: 15, weight: 'TBD' }
                ]
                ],
                6: [
                    [
                        { name: 'Barbell Bench Press', difficulty: 'beginner', equipment: 'barbell', movement: 'compound', primary_muscle_group: 'chest', secondary_muscle_group: 'triceps', tertiary_muscle_group: 'shoulders', sets: 3, reps: 10, weight: 'TBD' },
                        { name: 'Incline Dumbbell Press', difficulty: 'intermediate', equipment: 'dumbbell', movement: 'compound', primary_muscle_group: 'upperchest', secondary_muscle_group: 'shoulders', tertiary_muscle_group: 'triceps', sets: 3, reps: 10, weight: 'TBD' },
                        { name: 'Cable Chest Flys', difficulty: 'beginner', equipment: 'cable', movement: 'isolation', primary_muscle_group: 'rearshoulders', secondary_muscle_group: null, tertiary_muscle_group: null, sets: 3, reps: 10, weight: 'TBD' },
                        { name: 'Lateral Raises', difficulty: 'beginner', equipment: 'dumbbell', movement: 'isolation', primary_muscle_group: 'lateralshoulders', secondary_muscle_group: null, tertiary_muscle_group: null, sets: 3, reps: 12, weight: 'TBD' },
                        { name: 'Tricep Pushdowns', difficulty: 'beginner', equipment: 'cable', movement: 'isolation', primary_muscle_group: 'lateraltriceps', secondary_muscle_group: null, tertiary_muscle_group: null, sets: 3, reps: 12, weight: 'TBD' },
                        { name: 'Incline Dumbbell Skull Crushers', difficulty: 'beginner', equipment: 'dumbbell', movement: 'isolation', primary_muscle_group: 'longtriceps', secondary_muscle_group: null, tertiary_muscle_group: null, sets: 3, reps: 12, weight: 'TBD' }
                    ],
                    [
                        { name: 'Pull-ups', difficulty: 'beginner', equipment: 'bodyweight', movement: 'compound', primary_muscle_group: 'lats', secondary_muscle_group: 'biceps', tertiary_muscle_group: null, sets: 3, reps: 10, weight: 'TBD' },
                        { name: 'Cable Row', difficulty: 'beginner', equipment: 'machine', movement: 'compound', primary_muscle_group: 'middleback', secondary_muscle_group: 'biceps', tertiary_muscle_group: null, sets: 3, reps: 10, weight: 'TBD' },
                        { name: 'Lat Pulldown', difficulty: 'beginner', equipment: 'machine', movement: 'compound', primary_muscle_group: 'lats', secondary_muscle_group: 'biceps', tertiary_muscle_group: null, sets: 3, reps: 10, weight: 'TBD' },
                        { name: 'Cable Cross', difficulty: 'beginner', equipment: 'cable', movement: 'isolation', primary_muscle_group: 'rearshoulders', secondary_muscle_group: null, tertiary_muscle_group: null, sets: 3, reps: 10, weight: 'TBD' },
                        { name: 'Bicep Curls', difficulty: 'beginner', equipment: 'dumbbell', movement: 'isolation', primary_muscle_group: 'biceps', secondary_muscle_group: null, tertiary_muscle_group: null, sets: 3, reps: 12, weight: 'TBD' },
                        { name: 'Hammer Curls', difficulty: 'beginner', equipment: 'dumbbell', movement: 'isolation', primary_muscle_group: 'brachialis', secondary_muscle_group: null, tertiary_muscle_group: null, sets: 3, reps: 12, weight: 'TBD' }
                    ],
                    [
                        { name: 'Squats', difficulty: 'beginner', equipment: 'bodyweight', movement: 'compound', primary_muscle_group: 'quads', secondary_muscle_group: 'hamstrings', tertiary_muscle_group: 'glutes', sets: 3, reps: 10, weight: 'TBD' },
                        { name: 'Leg Press', difficulty: 'beginner', equipment: 'machine', movement: 'compound', primary_muscle_group: 'quads', secondary_muscle_group: 'hamstrings', tertiary_muscle_group: 'glutes', sets: 3, reps: 10, weight: 'TBD' },
                        { name: 'Leg Extension', difficulty: 'beginner', equipment: 'machine', movement: 'isolation', primary_muscle_group: 'quads', secondary_muscle_group: null, tertiary_muscle_group: null, sets: 3, reps: 12, weight: 'TBD' },
                        { name: 'Leg Curl', difficulty: 'beginner', equipment: 'machine', movement: 'isolation', primary_muscle_group: 'hamstrings', secondary_muscle_group: null, tertiary_muscle_group: null, sets: 3, reps: 12, weight: 'TBD' },
                        { name: 'Knee Raises', difficulty: 'beginner', equipment: 'machine', movement: 'isolation', primary_muscle_group: 'abs', secondary_muscle_group: null, tertiary_muscle_group: null, sets: 3, reps: 15, weight: 'TBD' }
                    ],
                    [
                        { name: 'Barbell Bench Press', difficulty: 'beginner', equipment: 'barbell', movement: 'compound', primary_muscle_group: 'chest', secondary_muscle_group: 'triceps', tertiary_muscle_group: 'shoulders', sets: 3, reps: 10, weight: 'TBD' },
                        { name: 'Incline Dumbbell Press', difficulty: 'intermediate', equipment: 'dumbbell', movement: 'compound', primary_muscle_group: 'upperchest', secondary_muscle_group: 'shoulders', tertiary_muscle_group: 'triceps', sets: 3, reps: 10, weight: 'TBD' },
                        { name: 'Cable Chest Flys', difficulty: 'beginner', equipment: 'cable', movement: 'isolation', primary_muscle_group: 'rearshoulders', secondary_muscle_group: null, tertiary_muscle_group: null, sets: 3, reps: 10, weight: 'TBD' },
                        { name: 'Lateral Raises', difficulty: 'beginner', equipment: 'dumbbell', movement: 'isolation', primary_muscle_group: 'lateralshoulders', secondary_muscle_group: null, tertiary_muscle_group: null, sets: 3, reps: 12, weight: 'TBD' },
                        { name: 'Tricep Pushdowns', difficulty: 'beginner', equipment: 'cable', movement: 'isolation', primary_muscle_group: 'lateraltriceps', secondary_muscle_group: null, tertiary_muscle_group: null, sets: 3, reps: 12, weight: 'TBD' },
                        { name: 'Incline Dumbbell Skull Crushers', difficulty: 'beginner', equipment: 'dumbbell', movement: 'isolation', primary_muscle_group: 'longtriceps', secondary_muscle_group: null, tertiary_muscle_group: null, sets: 3, reps: 12, weight: 'TBD' }
                    ],
                    [
                        { name: 'Pull-ups', difficulty: 'beginner', equipment: 'bodyweight', movement: 'compound', primary_muscle_group: 'lats', secondary_muscle_group: 'biceps', tertiary_muscle_group: null, sets: 3, reps: 10, weight: 'TBD' },
                        { name: 'Cable Row', difficulty: 'beginner', equipment: 'machine', movement: 'compound', primary_muscle_group: 'middleback', secondary_muscle_group: 'biceps', tertiary_muscle_group: null, sets: 3, reps: 10, weight: 'TBD' },
                        { name: 'Lat Pulldown', difficulty: 'beginner', equipment: 'machine', movement: 'compound', primary_muscle_group: 'lats', secondary_muscle_group: 'biceps', tertiary_muscle_group: null, sets: 3, reps: 10, weight: 'TBD' },
                        { name: 'Cable Cross', difficulty: 'beginner', equipment: 'cable', movement: 'isolation', primary_muscle_group: 'rearshoulders', secondary_muscle_group: null, tertiary_muscle_group: null, sets: 3, reps: 10, weight: 'TBD' },
                        { name: 'Bicep Curls', difficulty: 'beginner', equipment: 'dumbbell', movement: 'isolation', primary_muscle_group: 'biceps', secondary_muscle_group: null, tertiary_muscle_group: null, sets: 3, reps: 12, weight: 'TBD' },
                        { name: 'Hammer Curls', difficulty: 'beginner', equipment: 'dumbbell', movement: 'isolation', primary_muscle_group: 'brachialis', secondary_muscle_group: null, tertiary_muscle_group: null, sets: 3, reps: 12, weight: 'TBD' }
                    ],
                    [
                        { name: 'Squats', difficulty: 'beginner', equipment: 'bodyweight', movement: 'compound', primary_muscle_group: 'quads', secondary_muscle_group: 'hamstrings', tertiary_muscle_group: 'glutes', sets: 3, reps: 10, weight: 'TBD' },
                        { name: 'Leg Press', difficulty: 'beginner', equipment: 'machine', movement: 'compound', primary_muscle_group: 'quads', secondary_muscle_group: 'hamstrings', tertiary_muscle_group: 'glutes', sets: 3, reps: 10, weight: 'TBD' },
                        { name: 'Leg Extension', difficulty: 'beginner', equipment: 'machine', movement: 'isolation', primary_muscle_group: 'quads', secondary_muscle_group: null, tertiary_muscle_group: null, sets: 3, reps: 12, weight: 'TBD' },
                        { name: 'Leg Curl', difficulty: 'beginner', equipment: 'machine', movement: 'isolation', primary_muscle_group: 'hamstrings', secondary_muscle_group: null, tertiary_muscle_group: null, sets: 3, reps: 12, weight: 'TBD' },
                        { name: 'Knee Raises', difficulty: 'beginner', equipment: 'machine', movement: 'isolation', primary_muscle_group: 'abs', secondary_muscle_group: null, tertiary_muscle_group: null, sets: 3, reps: 15, weight: 'TBD' }
                    ]
                ],
                7: [
                    [
                        { name: 'Barbell Bench Press', difficulty: 'beginner', equipment: 'barbell', movement: 'compound', primary_muscle_group: 'chest', secondary_muscle_group: 'triceps', tertiary_muscle_group: 'shoulders', sets: 3, reps: 10, weight: 'TBD' },
                        { name: 'Incline Dumbbell Press', difficulty: 'intermediate', equipment: 'dumbbell', movement: 'compound', primary_muscle_group: 'upperchest', secondary_muscle_group: 'shoulders', tertiary_muscle_group: 'triceps', sets: 3, reps: 10, weight: 'TBD' },
                        { name: 'Cable Chest Flys', difficulty: 'beginner', equipment: 'cable', movement: 'isolation', primary_muscle_group: 'rearshoulders', secondary_muscle_group: null, tertiary_muscle_group: null, sets: 3, reps: 10, weight: 'TBD' },
                        { name: 'Lateral Raises', difficulty: 'beginner', equipment: 'dumbbell', movement: 'isolation', primary_muscle_group: 'lateralshoulders', secondary_muscle_group: null, tertiary_muscle_group: null, sets: 3, reps: 12, weight: 'TBD' },
                        { name: 'Tricep Pushdowns', difficulty: 'beginner', equipment: 'cable', movement: 'isolation', primary_muscle_group: 'lateraltriceps', secondary_muscle_group: null, tertiary_muscle_group: null, sets: 3, reps: 12, weight: 'TBD' },
                        { name: 'Incline Dumbbell Skull Crushers', difficulty: 'beginner', equipment: 'dumbbell', movement: 'isolation', primary_muscle_group: 'longtriceps', secondary_muscle_group: null, tertiary_muscle_group: null, sets: 3, reps: 12, weight: 'TBD' }
                    ],
                    [
                        { name: 'Pull-ups', difficulty: 'beginner', equipment: 'bodyweight', movement: 'compound', primary_muscle_group: 'lats', secondary_muscle_group: 'biceps', tertiary_muscle_group: null, sets: 3, reps: 10, weight: 'TBD' },
                        { name: 'Cable Row', difficulty: 'beginner', equipment: 'machine', movement: 'compound', primary_muscle_group: 'middleback', secondary_muscle_group: 'biceps', tertiary_muscle_group: null, sets: 3, reps: 10, weight: 'TBD' },
                        { name: 'Lat Pulldown', difficulty: 'beginner', equipment: 'machine', movement: 'compound', primary_muscle_group: 'lats', secondary_muscle_group: 'biceps', tertiary_muscle_group: null, sets: 3, reps: 10, weight: 'TBD' },
                        { name: 'Cable Cross', difficulty: 'beginner', equipment: 'cable', movement: 'isolation', primary_muscle_group: 'rearshoulders', secondary_muscle_group: null, tertiary_muscle_group: null, sets: 3, reps: 10, weight: 'TBD' },
                        { name: 'Bicep Curls', difficulty: 'beginner', equipment: 'dumbbell', movement: 'isolation', primary_muscle_group: 'biceps', secondary_muscle_group: null, tertiary_muscle_group: null, sets: 3, reps: 12, weight: 'TBD' },
                        { name: 'Hammer Curls', difficulty: 'beginner', equipment: 'dumbbell', movement: 'isolation', primary_muscle_group: 'brachialis', secondary_muscle_group: null, tertiary_muscle_group: null, sets: 3, reps: 12, weight: 'TBD' }
                    ],
                    [
                        { name: 'Squats', difficulty: 'beginner', equipment: 'bodyweight', movement: 'compound', primary_muscle_group: 'quads', secondary_muscle_group: 'hamstrings', tertiary_muscle_group: 'glutes', sets: 3, reps: 10, weight: 'TBD' },
                        { name: 'Leg Press', difficulty: 'beginner', equipment: 'machine', movement: 'compound', primary_muscle_group: 'quads', secondary_muscle_group: 'hamstrings', tertiary_muscle_group: 'glutes', sets: 3, reps: 10, weight: 'TBD' },
                        { name: 'Leg Extension', difficulty: 'beginner', equipment: 'machine', movement: 'isolation', primary_muscle_group: 'quads', secondary_muscle_group: null, tertiary_muscle_group: null, sets: 3, reps: 12, weight: 'TBD' },
                        { name: 'Leg Curl', difficulty: 'beginner', equipment: 'machine', movement: 'isolation', primary_muscle_group: 'hamstrings', secondary_muscle_group: null, tertiary_muscle_group: null, sets: 3, reps: 12, weight: 'TBD' },
                        { name: 'Knee Raises', difficulty: 'beginner', equipment: 'machine', movement: 'isolation', primary_muscle_group: 'abs', secondary_muscle_group: null, tertiary_muscle_group: null, sets: 3, reps: 15, weight: 'TBD' }
                    ],
                    [
                        { name: 'Shoulder Press', difficulty: 'beginner', equipment: 'dumbbell', movement: 'isolation', primary_muscle_group: 'frontalshoulders', secondary_muscle_group: null, tertiary_muscle_group: null, sets: 3, reps: 10, weight: 'TBD' },
                        { name: 'Lateral Raises', difficulty: 'beginner', equipment: 'dumbbell', movement: 'isolation', primary_muscle_group: 'lateralshoulders', secondary_muscle_group: null, tertiary_muscle_group: null, sets: 3, reps: 12, weight: 'TBD' },
                        { name: 'Cable Cross', difficulty: 'beginner', equipment: 'cable', movement: 'isolation', primary_muscle_group: 'rearshoulders', secondary_muscle_group: null, tertiary_muscle_group: null, sets: 3, reps: 10, weight: 'TBD' },
                        { name: 'EZ Bar Close Grip Curls', difficulty: 'beginner', equipment: 'barbell', movement: 'isolation', primary_muscle_group: 'longbiceps', secondary_muscle_group: null, tertiary_muscle_group: null, sets: 3, reps: 12, weight: 'TBD' },
                        { name: 'EZ Bar Skull Crushers', difficulty: 'beginner', equipment: 'barbell', movement: 'isolation', primary_muscle_group: 'longtriceps', secondary_muscle_group: null, tertiary_muscle_group: null, sets: 3, reps: 12, weight: 'TBD' },
                        { name: 'Wide Grip Barbell Curls', difficulty: 'beginner', equipment: 'barbell', movement: 'isolation', primary_muscle_group: 'shortbiceps', secondary_muscle_group: null, tertiary_muscle_group: null, sets: 3, reps: 12, weight: 'TBD' },
                        { name: 'Tricep Pushdowns', difficulty: 'beginner', equipment: 'cable', movement: 'isolation', primary_muscle_group: 'lateraltriceps', secondary_muscle_group: null, tertiary_muscle_group: null, sets: 3, reps: 12, weight: 'TBD' }
                    ],
                    [
                        { name: 'Barbell Bench Press', difficulty: 'beginner', equipment: 'barbell', movement: 'compound', primary_muscle_group: 'chest', secondary_muscle_group: 'triceps', tertiary_muscle_group: 'shoulders', sets: 3, reps: 10, weight: 'TBD' },
                        { name: 'Incline Dumbbell Press', difficulty: 'intermediate', equipment: 'dumbbell', movement: 'compound', primary_muscle_group: 'upperchest', secondary_muscle_group: 'shoulders', tertiary_muscle_group: 'triceps', sets: 3, reps: 10, weight: 'TBD' },
                        { name: 'Cable Chest Flys', difficulty: 'beginner', equipment: 'cable', movement: 'isolation', primary_muscle_group: 'rearshoulders', secondary_muscle_group: null, tertiary_muscle_group: null, sets: 3, reps: 10, weight: 'TBD' },
                        { name: 'Lateral Raises', difficulty: 'beginner', equipment: 'dumbbell', movement: 'isolation', primary_muscle_group: 'lateralshoulders', secondary_muscle_group: null, tertiary_muscle_group: null, sets: 3, reps: 12, weight: 'TBD' },
                        { name: 'Tricep Pushdowns', difficulty: 'beginner', equipment: 'cable', movement: 'isolation', primary_muscle_group: 'lateraltriceps', secondary_muscle_group: null, tertiary_muscle_group: null, sets: 3, reps: 12, weight: 'TBD' },
                        { name: 'Incline Dumbbell Skull Crushers', difficulty: 'beginner', equipment: 'dumbbell', movement: 'isolation', primary_muscle_group: 'longtriceps', secondary_muscle_group: null, tertiary_muscle_group: null, sets: 3, reps: 12, weight: 'TBD' }
                    ],
                    [
                        { name: 'Pull-ups', difficulty: 'beginner', equipment: 'bodyweight', movement: 'compound', primary_muscle_group: 'lats', secondary_muscle_group: 'biceps', tertiary_muscle_group: null, sets: 3, reps: 10, weight: 'TBD' },
                        { name: 'Cable Row', difficulty: 'beginner', equipment: 'machine', movement: 'compound', primary_muscle_group: 'middleback', secondary_muscle_group: 'biceps', tertiary_muscle_group: null, sets: 3, reps: 10, weight: 'TBD' },
                        { name: 'Lat Pulldown', difficulty: 'beginner', equipment: 'machine', movement: 'compound', primary_muscle_group: 'lats', secondary_muscle_group: 'biceps', tertiary_muscle_group: null, sets: 3, reps: 10, weight: 'TBD' },
                        { name: 'Cable Cross', difficulty: 'beginner', equipment: 'cable', movement: 'isolation', primary_muscle_group: 'rearshoulders', secondary_muscle_group: null, tertiary_muscle_group: null, sets: 3, reps: 10, weight: 'TBD' },
                        { name: 'Bicep Curls', difficulty: 'beginner', equipment: 'dumbbell', movement: 'isolation', primary_muscle_group: 'biceps', secondary_muscle_group: null, tertiary_muscle_group: null, sets: 3, reps: 12, weight: 'TBD' },
                        { name: 'Hammer Curls', difficulty: 'beginner', equipment: 'dumbbell', movement: 'isolation', primary_muscle_group: 'brachialis', secondary_muscle_group: null, tertiary_muscle_group: null, sets: 3, reps: 12, weight: 'TBD' }
                    ],
                    [
                        { name: 'Squats', difficulty: 'beginner', equipment: 'bodyweight', movement: 'compound', primary_muscle_group: 'quads', secondary_muscle_group: 'hamstrings', tertiary_muscle_group: 'glutes', sets: 3, reps: 10, weight: 'TBD' },
                        { name: 'Leg Press', difficulty: 'beginner', equipment: 'machine', movement: 'compound', primary_muscle_group: 'quads', secondary_muscle_group: 'hamstrings', tertiary_muscle_group: 'glutes', sets: 3, reps: 10, weight: 'TBD' },
                        { name: 'Leg Extension', difficulty: 'beginner', equipment: 'machine', movement: 'isolation', primary_muscle_group: 'quads', secondary_muscle_group: null, tertiary_muscle_group: null, sets: 3, reps: 12, weight: 'TBD' },
                        { name: 'Leg Curl', difficulty: 'beginner', equipment: 'machine', movement: 'isolation', primary_muscle_group: 'hamstrings', secondary_muscle_group: null, tertiary_muscle_group: null, sets: 3, reps: 12, weight: 'TBD' },
                        { name: 'Knee Raises', difficulty: 'beginner', equipment: 'machine', movement: 'isolation', primary_muscle_group: 'abs', secondary_muscle_group: null, tertiary_muscle_group: null, sets: 3, reps: 15, weight: 'TBD' }
                    ]
                ]
            },
            overweight: {},
        },
        intermediate: {
            underweight: {},
            normal: {},
            overweight: {
                3: [

                ],
                4: [ /* … */],
            },
        },
        advanced: {
            underweight: {},
            normal: {},
            overweight: {
                3: [

                ],
                4: [ /* … */],
            },
        },
    },
}