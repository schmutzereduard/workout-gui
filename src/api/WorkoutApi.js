import instance from "../axios/workout-api-axios";

class WorkoutApi {

    static getWorkouts() {
        return instance.get("/workouts");
    }

    static addWorkout(workout) {
        return instance.post('/workouts', workout);
    }

    static updateWorkout(workout) {
        return instance.put('/workouts', workout);
    }

    static deleteWorkout(id) {
        return instance.delete(`/workouts/${id}`);
    }

    static getExercises() {
        return instance.get("/exercises");
    }

    static addExercise(exercise) {
        return instance.post('/exercises', exercise);
    }

    static updateExercise(exercise) {
        return instance.put('/exercises', exercise);
    }

    static deleteExercise(id) {
        return instance.delete(`/exercises/${id}`);
    }

    static getSessions() {
        return instance.get("/sessions");
    }

    static addSession(session) {
        return instance.post('/sessions', session);
    }

    static updateSession(session) {
        return instance.put('/sessions', session);
    }

    static deleteSession(id) {
        return instance.delete(`/sessions/${id}`);
    }
}

export default WorkoutApi;