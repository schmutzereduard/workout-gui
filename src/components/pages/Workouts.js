import {
    Box,
    Button,
    FormControl, Grid,
    InputLabel,
    ListItemText,
    MenuItem, Modal,
    OutlinedInput, Select,
    TextField, ThemeProvider, Typography
} from "@mui/material";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {deleteWorkouts, fetchWorkouts, addWorkout, updateWorkout} from "../../store/workoutSlice";
import useModals from "../../hooks/useModals";
import {WorkoutTable} from "../tables/Tables";
import {fetchExercises} from "../../store/exerciseSlice";
import {darkTheme} from "../../utils/Themes";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
};

function Workouts() {

    const dispatch = useDispatch();
    const {workouts} = useSelector((state) => state.workouts);
    const {exercises} = useSelector((state) => state.exercises);
    const [selectedRows, setSelectedRows] = useState([]);
    const {modals, modalControls} = useModals();

    const [workoutName, setWorkoutName] = useState("");
    const [workoutExercises, setWorkoutExercises] = useState([]);
    const [isEdit, setIsEdit] = useState(false);
    const [selectedWorkout, setSelectedWorkout] = useState(null);

    useEffect(() => {
        dispatch(fetchWorkouts());
        dispatch(fetchExercises());
    }, [dispatch]);

    const handleAddWorkout = () => {

        const mappedExercises = workoutExercises.map(exerciseId => exercises.find(exercise => exercise.id === exerciseId));

        if (isEdit && selectedWorkout) {
            dispatch(updateWorkout({
                id: selectedWorkout.id,
                name: workoutName,
                exercises: mappedExercises
            }));
        } else {
            dispatch(addWorkout({
                name: workoutName,
                exercises: mappedExercises
            }));
        }
        handleCloseWorkoutModal();
    };

    const handleDeleteWorkouts = () => {
        dispatch(deleteWorkouts(selectedRows));
    };

    const handleOpenEditWorkout = () => {
        if (selectedRows.length) {
            const workoutToEdit = workouts.find(workout => workout.id === selectedRows[0]);
            if (workoutToEdit) {
                setIsEdit(true);
                setSelectedWorkout(workoutToEdit);
                setWorkoutName(workoutToEdit.name);
                setWorkoutExercises(workoutToEdit.exercises.map(exercise => exercise.id));
                modalControls.openModal("addWorkout");
            }
        }
    };

    const handleCloseWorkoutModal = () => {
        setIsEdit(false);
        setSelectedWorkout(null);
        setWorkoutName("");
        setWorkoutExercises([]);
        modalControls.closeModal("addWorkout");
    };


    return (
        <>
            <Box display="flex" justifyContent={"flex-start"} gap={2}>
                <Button
                    variant="contained"
                    onClick={() => modalControls.openModal("addWorkout")}
                >
                    {"Add"}
                </Button>

                <Button
                    variant="contained"
                    onClick={handleOpenEditWorkout}
                    disabled={selectedRows.length !== 1}
                >
                    {"Edit"}
                </Button>

                <Button
                    variant="contained"
                    onClick={() => handleDeleteWorkouts()}
                    color="error"
                    disabled={!selectedRows.length}
                >
                    {"Delete"}
                </Button>
            </Box>
            <br/>
            <WorkoutTable
                workouts={workouts}
                selectedRows={selectedRows}
                setSelectedRows={setSelectedRows}
            />

            <Modal
                open={modals.addWorkout?.isOpen}
                onClose={handleCloseWorkoutModal}
            >
                <ThemeProvider theme={darkTheme}>
                    <Box sx={modalStyle}>
                        <Typography variant="h6" component="h2" gutterBottom sx={{color: "white"}}>
                            {isEdit ? "Edit Workout" : "Add Workout"}
                        </Typography>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    label="Workout Name"
                                    fullWidth
                                    value={workoutName}
                                    onChange={(e) => setWorkoutName(e.target.value)}
                                    margin="normal"
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <FormControl fullWidth>
                                    <InputLabel id="exercises-multiple-chip-label">Exercises</InputLabel>
                                    <Select
                                        labelId="exercises-multiple-chip-label"
                                        multiple
                                        value={workoutExercises}
                                        onChange={(e) => setWorkoutExercises(e.target.value)}
                                        input={<OutlinedInput id="select-multiple-chip"/>}
                                        renderValue={(selected) => {
                                            const selectedExercises = exercises.filter(ex => selected.includes(ex.id));
                                            return selectedExercises.map(ex => ex.name).join(', ');
                                        }}
                                        MenuProps={MenuProps}
                                        variant={"outlined"}>
                                        {exercises.map((exercise) => (
                                            <MenuItem key={exercise.id} value={exercise.id}>
                                                <ListItemText primary={exercise.name}/>
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>

                            <Grid item xs={12}>
                                <Box display="flex" justifyContent="flex-end" gap={2}>
                                    <Button onClick={handleCloseWorkoutModal}>Cancel</Button>
                                    <Button variant="contained" color="primary" onClick={handleAddWorkout}>
                                        {isEdit ? "Update" : "Add"}
                                    </Button>
                                </Box>
                            </Grid>
                        </Grid>
                    </Box>
                </ThemeProvider>
            </Modal>
        </>
    );
}

export default Workouts;