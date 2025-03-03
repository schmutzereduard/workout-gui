import instance from "../axios/workout-api-axios";

class WorkoutApi {

    static getCategories() {
        return instance.get("/categories");
    }

    static addCategory(category) {
        return instance.post('/categories', category);
    }

    static updateCategory(category) {
        return instance.put('/categories', category);
    }

    static deleteCategory(id) {
        return instance.delete(`/categories/${id}`);
    }

    static getMuscles() {
        return instance.get("/muscles");
    }

    static addMuscle(muscle) {
        return instance.post('/muscles', muscle);
    }

    static updateMuscle(muscle) {
        return instance.put('/muscles', muscle);
    }

    static deleteMuscle(id) {
        return instance.delete(`/muscles/${id}`);
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