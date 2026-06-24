import {apiFetch} from "./client.js";

export function removeWorkout(workoutId) {
    return apiFetch(`/workouts/${workoutId}`,
        {
            method: "DELETE"
        });
}

export function createWorkout({ workoutName, exercises }) {
    return apiFetch(`/workouts`, {
        method: "POST",
        body: JSON.stringify({ workoutName, exercises }),
    });
}

export function getWorkout(workoutId) {
    return apiFetch(`/workouts/${workoutId}`,
        {
            method: "GET"
        });
}

export function listWorkouts() {
    return apiFetch(`/workouts`,
        {
        method: "GET"
        });
}