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

    static deleteWorkouts(ids) {
        return instance.delete(`/workouts`, { data: ids });
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

    static deleteExercises(ids) {
        return instance.delete(`/exercises`, { data: ids });
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

    static deleteSessions(ids) {
        console.log(ids);
        return instance.delete(`/sessions`, { data: ids });
    }
}

export default WorkoutApi;