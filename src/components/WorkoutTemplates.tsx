export interface ExercisePlanItem {
    exerciseid: number;
    name: string;
    name_ro?: string;
    difficulty: 'beginner' | 'intermediate' | 'advanced';
    equipment: string;
    equipment_ro?: string;
    movement: string;
    primary_muscle_group: string;
    primary_muscle_group_ro?: string;
    secondary_muscle_group: string | null;
    secondary_muscle_group_ro?: string | null;
    tertiary_muscle_group: string | null;
    tertiary_muscle_group_ro?: string | null;
    video_url?: string | null;
    sets: number;
    reps: number;
    weight: string;
}

export type PersonType = 'underweight' | 'normal' | 'overweight';

export const PlanTemplates: Record<
    'beginner' | 'intermediate' | 'advanced',
    Record<PersonType, Record<number, string[][]>>
> = {
    beginner: {
        underweight: {
            2: [
                ['Squats', 'Leg Press', 'Low Row', 'Lat Pulldown', 'Dumbbell Bench Press', 'Incline Dumbbell Press'],
                ['Squats', 'Leg Press', 'Cable Row', 'Lat Pulldown', 'Dumbbell Bench Press', 'Incline Dumbbell Press'],
            ],
            3: [
                ["Barbell Bench Press", "Incline Dumbbell Press", "Cable Chest Flys", "Lateral Raises", "Tricep Pushdowns", "Incline Dumbbell Skull Crushers"],
                ["Pull-ups", "Cable Row", "Lat Pulldown", "Cable Rear Delt Fly", "Bicep Curls", "Hammer Curls"],
                ["Squats", "Leg Press", "Seated Leg Extensions", "Lying Leg Curls", "Knee Raises"]
            ],
            4: [
                ["Barbell Bench Press", "Lat Pulldown", "Cable Chest Flys", "Cable Row", "Lateral Raises", "Tricep Pushdowns", "Bicep Curls", "Incline Dumbbell Skull Crushers"],
                ["Squats", "Leg Press", "Seated Leg Extensions", "Lying Leg Curls", "Knee Raises"],
                ["Pull-ups", "Dumbbell Bench Press", "Cable Row", "Cable Chest Flys", "Lateral Raises", "Cable Rear Delt Fly", "EZ Bar Close Grip Curls", "EZ Bar Skull Crushers", "Wide Grip Barbell Curls"],
                ["Squats", "Leg Press", "Seated Leg Extensions", "Lying Leg Curls", "Knee Raises"]
            ],
            5: [
                ["Barbell Bench Press", "Incline Dumbbell Press", "Cable Chest Flys", "Lateral Raises", "Tricep Pushdowns", "Incline Dumbbell Skull Crushers"],
                ["Pull-ups", "Cable Row", "Lat Pulldown", "Cable Rear Delt Fly", "Bicep Curls", "Hammer Curls"],
                ["Squats", "Leg Press", "Seated Leg Extensions", "Lying Leg Curls", "Knee Raises"],
                ["Barbell Bench Press", "Lat Pulldown", "Cable Chest Flys", "Cable Row", "Lateral Raises", "Tricep Pushdowns", "Bicep Curls", "Incline Dumbbell Skull Crushers"],
                ["Squats", "Leg Press", "Seated Leg Extensions", "Lying Leg Curls", "Knee Raises"],
            ],
            6: [
                ["Barbell Bench Press", "Incline Dumbbell Press", "Cable Chest Flys", "Lateral Raises", "Tricep Pushdowns", "Incline Dumbbell Skull Crushers"],
                ["Pull-ups", "Cable Row", "Lat Pulldown", "Cable Rear Delt Fly", "Bicep Curls", "Hammer Curls"],
                ["Squats", "Leg Press", "Seated Leg Extensions", "Lying Leg Curls", "Knee Raises"],
                ["Barbell Bench Press", "Lat Pulldown", "Cable Chest Flys", "Cable Row", "Lateral Raises", "Tricep Pushdowns", "Bicep Curls", "Incline Dumbbell Skull Crushers"],
                ["Pull-ups", "Cable Row", "Lat Pulldown", "Cable Rear Delt Fly", "Bicep Curls", "Hammer Curls"],
                ["Squats", "Leg Press", "Seated Leg Extensions", "Lying Leg Curls", "Knee Raises"]
            ],
            7: [
                ["Barbell Bench Press", "Incline Dumbbell Press", "Cable Chest Flys", "Lateral Raises", "Tricep Pushdowns", "Incline Dumbbell Skull Crushers"],
                ["Pull-ups", "Cable Row", "Lat Pulldown", "Cable Rear Delt Fly", "Bicep Curls", "Hammer Curls"],
                ["Squats", "Leg Press", "Seated Leg Extensions", "Lying Leg Curls", "Knee Raises"],
                ["Shoulder Press", "Lateral Raises", "Cable Rear Delt Fly", "EZ Bar Close Grip Curls", "EZ Bar Skull Crushers", "Wide Grip Barbell Curls", "Tricep Pushdowns"],
                ["Barbell Bench Press", "Incline Dumbbell Press", "Cable Chest Flys", "Lateral Raises", "Tricep Pushdowns", "Incline Dumbbell Skull Crushers"],
                ["Pull-ups", "Cable Row", "Lat Pulldown", "Cable Rear Delt Fly", "Bicep Curls", "Hammer Curls"],
                ["Squats", "Leg Press", "Seated Leg Extensions", "Lying Leg Curls", "Knee Raises"]
            ]
        },
        normal: {
            "2": [
                ["Squats", "Leg Press", "Low Row", "Lat Pulldown", "Dumbbell Bench Press", "Incline Dumbbell Press"],
                ["Squats", "Leg Press", "Cable Row", "Lat Pulldown", "Dumbbell Bench Press", "Incline Dumbbell Press"]
            ],
            "3": [
                ["Barbell Bench Press", "Incline Dumbbell Press", "Cable Chest Flys", "Lateral Raises", "Tricep Pushdowns", "Incline Dumbbell Skull Crushers"],
                ["Pull-ups", "Cable Row", "Lat Pulldown", "Cable Rear Delt Fly", "Bicep Curls", "Hammer Curls"],
                ["Squats", "Leg Press", "Seated Leg Extensions", "Lying Leg Curls", "Knee Raises"]
            ],
            "4": [
                ["Barbell Bench Press", "Lat Pulldown", "Cable Chest Flys", "Cable Row", "Lateral Raises", "Tricep Pushdowns", "Bicep Curls", "Incline Dumbbell Skull Crushers"],
                ["Squats", "Leg Press", "Seated Leg Extensions", "Lying Leg Curls", "Knee Raises"],
                ["Pull-ups", "Dumbbell Bench Press", "Cable Row", "Cable Chest Flys", "Lateral Raises", "Cable Rear Delt Fly", "EZ Bar Close Grip Curls", "EZ Bar Skull Crushers", "Wide Grip Barbell Curls"],
                ["Squats", "Leg Press", "Seated Leg Extensions", "Lying Leg Curls", "Knee Raises"]
            ],
            5: [
                ["Barbell Bench Press", "Incline Dumbbell Press", "Cable Chest Flys", "Lateral Raises", "Tricep Pushdowns", "Incline Dumbbell Skull Crushers"],
                ["Pull-ups", "Cable Row", "Lat Pulldown", "Cable Rear Delt Fly", "Bicep Curls", "Hammer Curls"],
                ["Squats", "Leg Press", "Seated Leg Extensions", "Lying Leg Curls", "Knee Raises"],
                ["Barbell Bench Press", "Lat Pulldown", "Cable Chest Flys", "Cable Row", "Lateral Raises", "Tricep Pushdowns", "Bicep Curls", "Incline Dumbbell Skull Crushers"],
                ["Squats", "Leg Press", "Seated Leg Extensions", "Lying Leg Curls", "Knee Raises"],
            ],
            "6": [
                ["Barbell Bench Press", "Incline Dumbbell Press", "Cable Chest Flys", "Lateral Raises", "Tricep Pushdowns", "Incline Dumbbell Skull Crushers"],
                ["Pull-ups", "Cable Row", "Lat Pulldown", "Cable Rear Delt Fly", "Bicep Curls", "Hammer Curls"],
                ["Squats", "Leg Press", "Seated Leg Extensions", "Lying Leg Curls", "Knee Raises"],
                ["Barbell Bench Press", "Lat Pulldown", "Cable Chest Flys", "Cable Row", "Lateral Raises", "Tricep Pushdowns", "Bicep Curls", "Incline Dumbbell Skull Crushers"],
                ["Pull-ups", "Cable Row", "Lat Pulldown", "Cable Rear Delt Fly", "Bicep Curls", "Hammer Curls"],
                ["Squats", "Leg Press", "Seated Leg Extensions", "Lying Leg Curls", "Knee Raises"]
            ],
            "7": [
                ["Barbell Bench Press", "Incline Dumbbell Press", "Cable Chest Flys", "Lateral Raises", "Tricep Pushdowns", "Incline Dumbbell Skull Crushers"],
                ["Pull-ups", "Cable Row", "Lat Pulldown", "Cable Rear Delt Fly", "Bicep Curls", "Hammer Curls"],
                ["Squats", "Leg Press", "Seated Leg Extensions", "Lying Leg Curls", "Knee Raises"],
                ["Shoulder Press", "Lateral Raises", "Cable Rear Delt Fly", "EZ Bar Close Grip Curls", "EZ Bar Skull Crushers", "Wide Grip Barbell Curls", "Tricep Pushdowns"],
                ["Barbell Bench Press", "Incline Dumbbell Press", "Cable Chest Flys", "Lateral Raises", "Tricep Pushdowns", "Incline Dumbbell Skull Crushers"],
                ["Pull-ups", "Cable Row", "Lat Pulldown", "Cable Rear Delt Fly", "Bicep Curls", "Hammer Curls"],
                ["Squats", "Leg Press", "Seated Leg Extensions", "Lying Leg Curls", "Knee Raises"]
            ]
        },
        overweight: {
            "2": [
                ["Hack Squats", "Leg Press", "Low Row", "Lat Pulldown", "Dumbbell Bench Press", "Incline Dumbbell Press"],
                ["Hack Squats", "Leg Press", "Cable Row", "Lat Pulldown", "Dumbbell Bench Press", "Incline Dumbbell Press"]
            ],
            "3": [
                ["Barbell Bench Press", "Incline Dumbbell Press", "Cable Chest Flys", "Lateral Raises", "Tricep Pushdowns", "Incline Dumbbell Skull Crushers"],
                ["Low Row", "Cable Row", "Lat Pulldown", "Cable Rear Delt Fly", "Bicep Curls", "Hammer Curls"],
                ["Hack Squats", "Leg Press", "Seated Leg Extensions", "Lying Leg Curls", "Knee Raises"]
            ],
            "4": [
                ["Barbell Bench Press", "Lat Pulldown", "Cable Chest Flys", "Cable Row", "Lateral Raises", "Tricep Pushdowns", "Bicep Curls", "Incline Dumbbell Skull Crushers"],
                ["Hack Squats", "Leg Press", "Seated Leg Extensions", "Lying Leg Curls", "Knee Raises"],
                ["Lat Pulldown", "Dumbbell Bench Press", "Cable Row", "Cable Chest Flys", "Lateral Raises", "Cable Rear Delt Fly", "EZ Bar Close Grip Curls", "EZ Bar Skull Crushers", "Wide Grip Barbell Curls"],
                ["Hack Squats", "Leg Press", "Seated Leg Extensions", "Lying Leg Curls", "Knee Raises"]
            ],
            "5": [
                ["Barbell Bench Press", "Incline Dumbbell Press", "Cable Chest Flys", "Lateral Raises", "Tricep Pushdowns", "Incline Dumbbell Skull Crushers"],
                ["Low Row", "Cable Row", "Lat Pulldown", "Cable Rear Delt Fly", "Bicep Curls", "Hammer Curls"],
                ["Hack Squats", "Leg Press", "Seated Leg Extensions", "Lying Leg Curls", "Knee Raises"],
                ["Barbell Bench Press", "Lat Pulldown", "Cable Chest Flys", "Cable Row", "Lateral Raises", "Tricep Pushdowns", "Bicep Curls", "Incline Dumbbell Skull Crushers"],
                ["Hack Squats", "Leg Press", "Seated Leg Extensions", "Lying Leg Curls", "Knee Raises"],
            ],
            "6": [
                ["Barbell Bench Press", "Incline Dumbbell Press", "Cable Chest Flys", "Lateral Raises", "Tricep Pushdowns", "Incline Dumbbell Skull Crushers"],
                ["Pull-ups", "Cable Row", "Lat Pulldown", "Cable Rear Delt Fly", "Bicep Curls", "Hammer Curls"],
                ["Hack Squats", "Leg Press", "Seated Leg Extensions", "Lying Leg Curls", "Knee Raises"],
                ["Shoulder Press", "Lateral Raises", "Cable Rear Delt Fly", "EZ Bar Close Grip Curls", "EZ Bar Skull Crushers", "Wide Grip Barbell Curls"],
                ["Pull-ups", "Cable Row", "Lat Pulldown", "Cable Rear Delt Fly", "Bicep Curls", "Hammer Curls"],
                ["Hack Squats", "Leg Press", "Seated Leg Extensions", "Lying Leg Curls", "Knee Raises"]
            ],
            "7": [
                ["Barbell Bench Press", "Incline Dumbbell Press", "Cable Chest Flys", "Lateral Raises", "Tricep Pushdowns", "Incline Dumbbell Skull Crushers"],
                ["Low Row", "Cable Row", "Lat Pulldown", "Cable Rear Delt Fly", "Bicep Curls", "Hammer Curls"],
                ["Hack Squats", "Leg Press", "Seated Leg Extensions", "Lying Leg Curls", "Knee Raises"],
                ["Shoulder Press", "Lateral Raises", "Cable Rear Delt Fly", "EZ Bar Close Grip Curls", "EZ Bar Skull Crushers", "Wide Grip Barbell Curls"],
                ["Barbell Bench Press", "Incline Dumbbell Press", "Cable Chest Flys", "Lateral Raises", "Tricep Pushdowns", "Incline Dumbbell Skull Crushers"],
                ["Low Row", "Cable Row", "Lat Pulldown", "Cable Rear Delt Fly", "Bicep Curls", "Hammer Curls"],
                ["Hack Squats", "Leg Press", "Seated Leg Extensions", "Lying Leg Curls", "Knee Raises"]
            ]
        },
    },

    intermediate: {
        underweight: {
            2: [
                ['Squats', 'Leg Press', 'Low Row', 'Lat Pulldown', 'Dumbbell Bench Press', 'Incline Dumbbell Press'],
                ['Squats', 'Leg Press', 'Cable Row', 'Lat Pulldown', 'Dumbbell Bench Press', 'Incline Dumbbell Press'],
            ],
            3: [
                ["Barbell Bench Press", "Incline Dumbbell Press", "Cable Chest Flys", "Lateral Raises", "Tricep Pushdowns", "Incline Dumbbell Skull Crushers"],
                ["Pull-ups", "Cable Row", "Lat Pulldown", "Cable Rear Delt Fly", "Bicep Curls", "Hammer Curls"],
                ["Squats", "Leg Press", "Seated Leg Extensions", "Lying Leg Curls", "Knee Raises"]
            ],
            4: [
                ["Barbell Bench Press", "Lat Pulldown", "Cable Chest Flys", "Cable Row", "Lateral Raises", "Tricep Pushdowns", "Bicep Curls", "Incline Dumbbell Skull Crushers"],
                ["Squats", "Leg Press", "Seated Leg Extensions", "Lying Leg Curls", "Knee Raises"],
                ["Pull-ups", "Dumbbell Bench Press", "Cable Row", "Cable Chest Flys", "Lateral Raises", "Cable Rear Delt Fly", "EZ Bar Close Grip Curls", "EZ Bar Skull Crushers", "Wide Grip Barbell Curls"],
                ["Squats", "Leg Press", "Seated Leg Extensions", "Lying Leg Curls", "Knee Raises"]
            ],
            5: [
                ["Barbell Bench Press", "Incline Dumbbell Press", "Cable Chest Flys", "Lateral Raises", "Tricep Pushdowns", "Incline Dumbbell Skull Crushers"],
                ["Pull-ups", "Cable Row", "Lat Pulldown", "Cable Rear Delt Fly", "Bicep Curls", "Hammer Curls"],
                ["Squats", "Leg Press", "Seated Leg Extensions", "Lying Leg Curls", "Knee Raises"],
                ["Barbell Bench Press", "Lat Pulldown", "Cable Chest Flys", "Cable Row", "Lateral Raises", "Tricep Pushdowns", "Bicep Curls", "Incline Dumbbell Skull Crushers"],
                ["Squats", "Leg Press", "Seated Leg Extensions", "Lying Leg Curls", "Knee Raises"],
            ],
            6: [
                ["Barbell Bench Press", "Incline Dumbbell Press", "Cable Chest Flys", "Lateral Raises", "Tricep Pushdowns", "Incline Dumbbell Skull Crushers"],
                ["Pull-ups", "Cable Row", "Lat Pulldown", "Cable Rear Delt Fly", "Bicep Curls", "Hammer Curls"],
                ["Squats", "Leg Press", "Seated Leg Extensions", "Lying Leg Curls", "Knee Raises"],
                ["Barbell Bench Press", "Lat Pulldown", "Cable Chest Flys", "Cable Row", "Lateral Raises", "Tricep Pushdowns", "Bicep Curls", "Incline Dumbbell Skull Crushers"],
                ["Pull-ups", "Cable Row", "Lat Pulldown", "Cable Rear Delt Fly", "Bicep Curls", "Hammer Curls"],
                ["Squats", "Leg Press", "Seated Leg Extensions", "Lying Leg Curls", "Knee Raises"]
            ],
            7: [
                ["Barbell Bench Press", "Incline Dumbbell Press", "Cable Chest Flys", "Lateral Raises", "Tricep Pushdowns", "Incline Dumbbell Skull Crushers"],
                ["Pull-ups", "Cable Row", "Lat Pulldown", "Cable Rear Delt Fly", "Bicep Curls", "Hammer Curls"],
                ["Squats", "Leg Press", "Seated Leg Extensions", "Lying Leg Curls", "Knee Raises"],
                ["Shoulder Press", "Lateral Raises", "Cable Rear Delt Fly", "EZ Bar Close Grip Curls", "EZ Bar Skull Crushers", "Wide Grip Barbell Curls", "Tricep Pushdowns"],
                ["Barbell Bench Press", "Incline Dumbbell Press", "Cable Chest Flys", "Lateral Raises", "Tricep Pushdowns", "Incline Dumbbell Skull Crushers"],
                ["Pull-ups", "Cable Row", "Lat Pulldown", "Cable Rear Delt Fly", "Bicep Curls", "Hammer Curls"],
                ["Squats", "Leg Press", "Seated Leg Extensions", "Lying Leg Curls", "Knee Raises"]
            ]
        },
        normal: {
            "2": [
                ["Squats", "Leg Press", "Low Row", "Lat Pulldown", "Dumbbell Bench Press", "Incline Dumbbell Press"],
                ["Squats", "Leg Press", "Cable Row", "Lat Pulldown", "Dumbbell Bench Press", "Incline Dumbbell Press"]
            ],
            "3": [
                ["Barbell Bench Press", "Incline Dumbbell Press", "Cable Chest Flys", "Lateral Raises", "Tricep Pushdowns", "Incline Dumbbell Skull Crushers"],
                ["Pull-ups", "Cable Row", "Lat Pulldown", "Cable Rear Delt Fly", "Bicep Curls", "Hammer Curls"],
                ["Squats", "Leg Press", "Seated Leg Extensions", "Lying Leg Curls", "Knee Raises"]
            ],
            "4": [
                ["Barbell Bench Press", "Lat Pulldown", "Cable Chest Flys", "Cable Row", "Lateral Raises", "Tricep Pushdowns", "Bicep Curls", "Incline Dumbbell Skull Crushers"],
                ["Squats", "Leg Press", "Seated Leg Extensions", "Lying Leg Curls", "Knee Raises"],
                ["Pull-ups", "Dumbbell Bench Press", "Cable Row", "Cable Chest Flys", "Lateral Raises", "Cable Rear Delt Fly", "EZ Bar Close Grip Curls", "EZ Bar Skull Crushers", "Wide Grip Barbell Curls"],
                ["Squats", "Leg Press", "Seated Leg Extensions", "Lying Leg Curls", "Knee Raises"]
            ],
            5: [
                ["Barbell Bench Press", "Incline Dumbbell Press", "Cable Chest Flys", "Lateral Raises", "Tricep Pushdowns", "Incline Dumbbell Skull Crushers"],
                ["Pull-ups", "Cable Row", "Lat Pulldown", "Cable Rear Delt Fly", "Bicep Curls", "Hammer Curls"],
                ["Squats", "Leg Press", "Seated Leg Extensions", "Lying Leg Curls", "Knee Raises"],
                ["Barbell Bench Press", "Lat Pulldown", "Cable Chest Flys", "Cable Row", "Lateral Raises", "Tricep Pushdowns", "Bicep Curls", "Incline Dumbbell Skull Crushers"],
                ["Squats", "Leg Press", "Seated Leg Extensions", "Lying Leg Curls", "Knee Raises"],
            ],
            "6": [
                ["Barbell Bench Press", "Incline Dumbbell Press", "Cable Chest Flys", "Lateral Raises", "Tricep Pushdowns", "Incline Dumbbell Skull Crushers"],
                ["Pull-ups", "Cable Row", "Lat Pulldown", "Cable Rear Delt Fly", "Bicep Curls", "Hammer Curls"],
                ["Squats", "Leg Press", "Seated Leg Extensions", "Lying Leg Curls", "Knee Raises"],
                ["Barbell Bench Press", "Lat Pulldown", "Cable Chest Flys", "Cable Row", "Lateral Raises", "Tricep Pushdowns", "Bicep Curls", "Incline Dumbbell Skull Crushers"],
                ["Pull-ups", "Cable Row", "Lat Pulldown", "Cable Rear Delt Fly", "Bicep Curls", "Hammer Curls"],
                ["Squats", "Leg Press", "Seated Leg Extensions", "Lying Leg Curls", "Knee Raises"]
            ],
            "7": [
                ["Barbell Bench Press", "Incline Dumbbell Press", "Cable Chest Flys", "Lateral Raises", "Tricep Pushdowns", "Incline Dumbbell Skull Crushers"],
                ["Pull-ups", "Cable Row", "Lat Pulldown", "Cable Rear Delt Fly", "Bicep Curls", "Hammer Curls"],
                ["Squats", "Leg Press", "Seated Leg Extensions", "Lying Leg Curls", "Knee Raises"],
                ["Shoulder Press", "Lateral Raises", "Cable Rear Delt Fly", "EZ Bar Close Grip Curls", "EZ Bar Skull Crushers", "Wide Grip Barbell Curls", "Tricep Pushdowns"],
                ["Barbell Bench Press", "Incline Dumbbell Press", "Cable Chest Flys", "Lateral Raises", "Tricep Pushdowns", "Incline Dumbbell Skull Crushers"],
                ["Pull-ups", "Cable Row", "Lat Pulldown", "Cable Rear Delt Fly", "Bicep Curls", "Hammer Curls"],
                ["Squats", "Leg Press", "Seated Leg Extensions", "Lying Leg Curls", "Knee Raises"]
            ]
        },
        overweight: {
            "2": [
                ["Hack Squats", "Leg Press", "Low Row", "Lat Pulldown", "Dumbbell Bench Press", "Incline Dumbbell Press"],
                ["Hack Squats", "Leg Press", "Cable Row", "Lat Pulldown", "Dumbbell Bench Press", "Incline Dumbbell Press"]
            ],
            "3": [
                ["Barbell Bench Press", "Incline Dumbbell Press", "Cable Chest Flys", "Lateral Raises", "Tricep Pushdowns", "Incline Dumbbell Skull Crushers"],
                ["Low Row", "Cable Row", "Lat Pulldown", "Cable Rear Delt Fly", "Bicep Curls", "Hammer Curls"],
                ["Hack Squats", "Leg Press", "Seated Leg Extensions", "Lying Leg Curls", "Knee Raises"]
            ],
            "4": [
                ["Barbell Bench Press", "Lat Pulldown", "Cable Chest Flys", "Cable Row", "Lateral Raises", "Tricep Pushdowns", "Bicep Curls", "Incline Dumbbell Skull Crushers"],
                ["Hack Squats", "Leg Press", "Seated Leg Extensions", "Lying Leg Curls", "Knee Raises"],
                ["Lat Pulldown", "Dumbbell Bench Press", "Cable Row", "Cable Chest Flys", "Lateral Raises", "Cable Rear Delt Fly", "EZ Bar Close Grip Curls", "EZ Bar Skull Crushers", "Wide Grip Barbell Curls"],
                ["Hack Squats", "Leg Press", "Seated Leg Extensions", "Lying Leg Curls", "Knee Raises"]
            ],
            "5": [
                ["Barbell Bench Press", "Incline Dumbbell Press", "Cable Chest Flys", "Lateral Raises", "Tricep Pushdowns", "Incline Dumbbell Skull Crushers"],
                ["Low Row", "Cable Row", "Lat Pulldown", "Cable Rear Delt Fly", "Bicep Curls", "Hammer Curls"],
                ["Hack Squats", "Leg Press", "Seated Leg Extensions", "Lying Leg Curls", "Knee Raises"],
                ["Barbell Bench Press", "Lat Pulldown", "Cable Chest Flys", "Cable Row", "Lateral Raises", "Tricep Pushdowns", "Bicep Curls", "Incline Dumbbell Skull Crushers"],
                ["Hack Squats", "Leg Press", "Seated Leg Extensions", "Lying Leg Curls", "Knee Raises"],
            ],
            "6": [
                ["Barbell Bench Press", "Incline Dumbbell Press", "Cable Chest Flys", "Lateral Raises", "Tricep Pushdowns", "Incline Dumbbell Skull Crushers"],
                ["Pull-ups", "Cable Row", "Lat Pulldown", "Cable Rear Delt Fly", "Bicep Curls", "Hammer Curls"],
                ["Hack Squats", "Leg Press", "Seated Leg Extensions", "Lying Leg Curls", "Knee Raises"],
                ["Shoulder Press", "Lateral Raises", "Cable Rear Delt Fly", "EZ Bar Close Grip Curls", "EZ Bar Skull Crushers", "Wide Grip Barbell Curls"],
                ["Pull-ups", "Cable Row", "Lat Pulldown", "Cable Rear Delt Fly", "Bicep Curls", "Hammer Curls"],
                ["Hack Squats", "Leg Press", "Seated Leg Extensions", "Lying Leg Curls", "Knee Raises"]
            ],
            "7": [
                ["Barbell Bench Press", "Incline Dumbbell Press", "Cable Chest Flys", "Lateral Raises", "Tricep Pushdowns", "Incline Dumbbell Skull Crushers"],
                ["Low Row", "Cable Row", "Lat Pulldown", "Cable Rear Delt Fly", "Bicep Curls", "Hammer Curls"],
                ["Hack Squats", "Leg Press", "Seated Leg Extensions", "Lying Leg Curls", "Knee Raises"],
                ["Shoulder Press", "Lateral Raises", "Cable Rear Delt Fly", "EZ Bar Close Grip Curls", "EZ Bar Skull Crushers", "Wide Grip Barbell Curls"],
                ["Barbell Bench Press", "Incline Dumbbell Press", "Cable Chest Flys", "Lateral Raises", "Tricep Pushdowns", "Incline Dumbbell Skull Crushers"],
                ["Low Row", "Cable Row", "Lat Pulldown", "Cable Rear Delt Fly", "Bicep Curls", "Hammer Curls"],
                ["Hack Squats", "Leg Press", "Seated Leg Extensions", "Lying Leg Curls", "Knee Raises"]
            ]
        },
    },

    advanced: {
        underweight: {
            2: [
                ['Squats', 'Leg Press', 'Low Row', 'Lat Pulldown', 'Dumbbell Bench Press', 'Incline Dumbbell Press'],
                ['Squats', 'Leg Press', 'Cable Row', 'Lat Pulldown', 'Dumbbell Bench Press', 'Incline Dumbbell Press'],
            ],
            3: [
                ["Barbell Bench Press", "Incline Dumbbell Press", "Cable Chest Flys", "Lateral Raises", "Tricep Pushdowns", "Incline Dumbbell Skull Crushers"],
                ["Pull-ups", "Cable Row", "Lat Pulldown", "Cable Rear Delt Fly", "Bicep Curls", "Hammer Curls"],
                ["Squats", "Leg Press", "Seated Leg Extensions", "Lying Leg Curls", "Knee Raises"]
            ],
            4: [
                ["Barbell Bench Press", "Lat Pulldown", "Cable Chest Flys", "Cable Row", "Lateral Raises", "Tricep Pushdowns", "Bicep Curls", "Incline Dumbbell Skull Crushers"],
                ["Squats", "Leg Press", "Seated Leg Extensions", "Lying Leg Curls", "Knee Raises"],
                ["Pull-ups", "Dumbbell Bench Press", "Cable Row", "Cable Chest Flys", "Lateral Raises", "Cable Rear Delt Fly", "EZ Bar Close Grip Curls", "EZ Bar Skull Crushers", "Wide Grip Barbell Curls"],
                ["Squats", "Leg Press", "Seated Leg Extensions", "Lying Leg Curls", "Knee Raises"]
            ],
            5: [
                ["Barbell Bench Press", "Incline Dumbbell Press", "Cable Chest Flys", "Lateral Raises", "Tricep Pushdowns", "Incline Dumbbell Skull Crushers"],
                ["Pull-ups", "Cable Row", "Lat Pulldown", "Cable Rear Delt Fly", "Bicep Curls", "Hammer Curls"],
                ["Squats", "Leg Press", "Seated Leg Extensions", "Lying Leg Curls", "Knee Raises"],
                ["Barbell Bench Press", "Lat Pulldown", "Cable Chest Flys", "Cable Row", "Lateral Raises", "Tricep Pushdowns", "Bicep Curls", "Incline Dumbbell Skull Crushers"],
                ["Squats", "Leg Press", "Seated Leg Extensions", "Lying Leg Curls", "Knee Raises"],
            ],
            6: [
                ["Barbell Bench Press", "Incline Dumbbell Press", "Cable Chest Flys", "Lateral Raises", "Tricep Pushdowns", "Incline Dumbbell Skull Crushers"],
                ["Pull-ups", "Cable Row", "Lat Pulldown", "Cable Rear Delt Fly", "Bicep Curls", "Hammer Curls"],
                ["Squats", "Leg Press", "Seated Leg Extensions", "Lying Leg Curls", "Knee Raises"],
                ["Barbell Bench Press", "Lat Pulldown", "Cable Chest Flys", "Cable Row", "Lateral Raises", "Tricep Pushdowns", "Bicep Curls", "Incline Dumbbell Skull Crushers"],
                ["Pull-ups", "Cable Row", "Lat Pulldown", "Cable Rear Delt Fly", "Bicep Curls", "Hammer Curls"],
                ["Squats", "Leg Press", "Seated Leg Extensions", "Lying Leg Curls", "Knee Raises"]
            ],
            7: [
                ["Barbell Bench Press", "Incline Dumbbell Press", "Cable Chest Flys", "Lateral Raises", "Tricep Pushdowns", "Incline Dumbbell Skull Crushers"],
                ["Pull-ups", "Cable Row", "Lat Pulldown", "Cable Rear Delt Fly", "Bicep Curls", "Hammer Curls"],
                ["Squats", "Leg Press", "Seated Leg Extensions", "Lying Leg Curls", "Knee Raises"],
                ["Shoulder Press", "Lateral Raises", "Cable Rear Delt Fly", "EZ Bar Close Grip Curls", "EZ Bar Skull Crushers", "Wide Grip Barbell Curls", "Tricep Pushdowns"],
                ["Barbell Bench Press", "Incline Dumbbell Press", "Cable Chest Flys", "Lateral Raises", "Tricep Pushdowns", "Incline Dumbbell Skull Crushers"],
                ["Pull-ups", "Cable Row", "Lat Pulldown", "Cable Rear Delt Fly", "Bicep Curls", "Hammer Curls"],
                ["Squats", "Leg Press", "Seated Leg Extensions", "Lying Leg Curls", "Knee Raises"]
            ]
        },
        normal: {
            "2": [
                ["Squats", "Leg Press", "Low Row", "Lat Pulldown", "Dumbbell Bench Press", "Incline Dumbbell Press"],
                ["Squats", "Leg Press", "Cable Row", "Lat Pulldown", "Dumbbell Bench Press", "Incline Dumbbell Press"]
            ],
            "3": [
                ["Barbell Bench Press", "Incline Dumbbell Press", "Cable Chest Flys", "Lateral Raises", "Tricep Pushdowns", "Incline Dumbbell Skull Crushers"],
                ["Pull-ups", "Cable Row", "Lat Pulldown", "Cable Rear Delt Fly", "Bicep Curls", "Hammer Curls"],
                ["Squats", "Leg Press", "Seated Leg Extensions", "Lying Leg Curls", "Knee Raises"]
            ],
            "4": [
                ["Barbell Bench Press", "Lat Pulldown", "Cable Chest Flys", "Cable Row", "Lateral Raises", "Tricep Pushdowns", "Bicep Curls", "Incline Dumbbell Skull Crushers"],
                ["Squats", "Leg Press", "Seated Leg Extensions", "Lying Leg Curls", "Knee Raises"],
                ["Pull-ups", "Dumbbell Bench Press", "Cable Row", "Cable Chest Flys", "Lateral Raises", "Cable Rear Delt Fly", "EZ Bar Close Grip Curls", "EZ Bar Skull Crushers", "Wide Grip Barbell Curls"],
                ["Squats", "Leg Press", "Seated Leg Extensions", "Lying Leg Curls", "Knee Raises"]
            ],
            5: [
                ["Barbell Bench Press", "Incline Dumbbell Press", "Cable Chest Flys", "Lateral Raises", "Tricep Pushdowns", "Incline Dumbbell Skull Crushers"],
                ["Pull-ups", "Cable Row", "Lat Pulldown", "Cable Rear Delt Fly", "Bicep Curls", "Hammer Curls"],
                ["Squats", "Leg Press", "Seated Leg Extensions", "Lying Leg Curls", "Knee Raises"],
                ["Barbell Bench Press", "Lat Pulldown", "Cable Chest Flys", "Cable Row", "Lateral Raises", "Tricep Pushdowns", "Bicep Curls", "Incline Dumbbell Skull Crushers"],
                ["Squats", "Leg Press", "Seated Leg Extensions", "Lying Leg Curls", "Knee Raises"],
            ],
            "6": [
                ["Barbell Bench Press", "Incline Dumbbell Press", "Cable Chest Flys", "Lateral Raises", "Tricep Pushdowns", "Incline Dumbbell Skull Crushers"],
                ["Pull-ups", "Cable Row", "Lat Pulldown", "Cable Rear Delt Fly", "Bicep Curls", "Hammer Curls"],
                ["Squats", "Leg Press", "Seated Leg Extensions", "Lying Leg Curls", "Knee Raises"],
                ["Barbell Bench Press", "Lat Pulldown", "Cable Chest Flys", "Cable Row", "Lateral Raises", "Tricep Pushdowns", "Bicep Curls", "Incline Dumbbell Skull Crushers"],
                ["Pull-ups", "Cable Row", "Lat Pulldown", "Cable Rear Delt Fly", "Bicep Curls", "Hammer Curls"],
                ["Squats", "Leg Press", "Seated Leg Extensions", "Lying Leg Curls", "Knee Raises"]
            ],
            "7": [
                ["Barbell Bench Press", "Incline Dumbbell Press", "Cable Chest Flys", "Lateral Raises", "Tricep Pushdowns", "Incline Dumbbell Skull Crushers"],
                ["Pull-ups", "Cable Row", "Lat Pulldown", "Cable Rear Delt Fly", "Bicep Curls", "Hammer Curls"],
                ["Squats", "Leg Press", "Seated Leg Extensions", "Lying Leg Curls", "Knee Raises"],
                ["Shoulder Press", "Lateral Raises", "Cable Rear Delt Fly", "EZ Bar Close Grip Curls", "EZ Bar Skull Crushers", "Wide Grip Barbell Curls", "Tricep Pushdowns"],
                ["Barbell Bench Press", "Incline Dumbbell Press", "Cable Chest Flys", "Lateral Raises", "Tricep Pushdowns", "Incline Dumbbell Skull Crushers"],
                ["Pull-ups", "Cable Row", "Lat Pulldown", "Cable Rear Delt Fly", "Bicep Curls", "Hammer Curls"],
                ["Squats", "Leg Press", "Seated Leg Extensions", "Lying Leg Curls", "Knee Raises"]
            ]
        },
        overweight: {
            "2": [
                ["Hack Squats", "Leg Press", "Low Row", "Lat Pulldown", "Dumbbell Bench Press", "Incline Dumbbell Press"],
                ["Hack Squats", "Leg Press", "Cable Row", "Lat Pulldown", "Dumbbell Bench Press", "Incline Dumbbell Press"]
            ],
            "3": [
                ["Barbell Bench Press", "Incline Dumbbell Press", "Cable Chest Flys", "Lateral Raises", "Tricep Pushdowns", "Incline Dumbbell Skull Crushers"],
                ["Low Row", "Cable Row", "Lat Pulldown", "Cable Rear Delt Fly", "Bicep Curls", "Hammer Curls"],
                ["Hack Squats", "Leg Press", "Seated Leg Extensions", "Lying Leg Curls", "Knee Raises"]
            ],
            "4": [
                ["Barbell Bench Press", "Lat Pulldown", "Cable Chest Flys", "Cable Row", "Lateral Raises", "Tricep Pushdowns", "Bicep Curls", "Incline Dumbbell Skull Crushers"],
                ["Hack Squats", "Leg Press", "Seated Leg Extensions", "Lying Leg Curls", "Knee Raises"],
                ["Lat Pulldown", "Dumbbell Bench Press", "Cable Row", "Cable Chest Flys", "Lateral Raises", "Cable Rear Delt Fly", "EZ Bar Close Grip Curls", "EZ Bar Skull Crushers", "Wide Grip Barbell Curls"],
                ["Hack Squats", "Leg Press", "Seated Leg Extensions", "Lying Leg Curls", "Knee Raises"]
            ],
            "5": [
                ["Barbell Bench Press", "Incline Dumbbell Press", "Cable Chest Flys", "Lateral Raises", "Tricep Pushdowns", "Incline Dumbbell Skull Crushers"],
                ["Low Row", "Cable Row", "Lat Pulldown", "Cable Rear Delt Fly", "Bicep Curls", "Hammer Curls"],
                ["Hack Squats", "Leg Press", "Seated Leg Extensions", "Lying Leg Curls", "Knee Raises"],
                ["Barbell Bench Press", "Lat Pulldown", "Cable Chest Flys", "Cable Row", "Lateral Raises", "Tricep Pushdowns", "Bicep Curls", "Incline Dumbbell Skull Crushers"],
                ["Hack Squats", "Leg Press", "Seated Leg Extensions", "Lying Leg Curls", "Knee Raises"],
            ],
            "6": [
                ["Barbell Bench Press", "Incline Dumbbell Press", "Cable Chest Flys", "Lateral Raises", "Tricep Pushdowns", "Incline Dumbbell Skull Crushers"],
                ["Pull-ups", "Cable Row", "Lat Pulldown", "Cable Rear Delt Fly", "Bicep Curls", "Hammer Curls"],
                ["Hack Squats", "Leg Press", "Seated Leg Extensions", "Lying Leg Curls", "Knee Raises"],
                ["Shoulder Press", "Lateral Raises", "Cable Rear Delt Fly", "EZ Bar Close Grip Curls", "EZ Bar Skull Crushers", "Wide Grip Barbell Curls"],
                ["Pull-ups", "Cable Row", "Lat Pulldown", "Cable Rear Delt Fly", "Bicep Curls", "Hammer Curls"],
                ["Hack Squats", "Leg Press", "Seated Leg Extensions", "Lying Leg Curls", "Knee Raises"]
            ],
            "7": [
                ["Barbell Bench Press", "Incline Dumbbell Press", "Cable Chest Flys", "Lateral Raises", "Tricep Pushdowns", "Incline Dumbbell Skull Crushers"],
                ["Low Row", "Cable Row", "Lat Pulldown", "Cable Rear Delt Fly", "Bicep Curls", "Hammer Curls"],
                ["Hack Squats", "Leg Press", "Seated Leg Extensions", "Lying Leg Curls", "Knee Raises"],
                ["Shoulder Press", "Lateral Raises", "Cable Rear Delt Fly", "EZ Bar Close Grip Curls", "EZ Bar Skull Crushers", "Wide Grip Barbell Curls"],
                ["Barbell Bench Press", "Incline Dumbbell Press", "Cable Chest Flys", "Lateral Raises", "Tricep Pushdowns", "Incline Dumbbell Skull Crushers"],
                ["Low Row", "Cable Row", "Lat Pulldown", "Cable Rear Delt Fly", "Bicep Curls", "Hammer Curls"],
                ["Hack Squats", "Leg Press", "Seated Leg Extensions", "Lying Leg Curls", "Knee Raises"]
            ]
        },
    },
};
