import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {
    fetchExercises,
    addExercise,
    updateExercise,
    deleteExercises
} from "../../store/exerciseSlice";
import {ExerciseTable} from "../tables/Tables";
import {
    Box,
    Button,
    Modal,
    TextField,
    Grid,
    Typography, ThemeProvider,
} from "@mui/material";
import useModals from "../../hooks/useModals";
import {darkTheme} from "../../utils/Themes";

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

function Exercises() {
    const dispatch = useDispatch();
    const {exercises} = useSelector((state) => state.exercises);
    const [selectedRows, setSelectedRows] = useState([]);
    const {modals, modalControls} = useModals();

    const [exerciseName, setExerciseName] = useState("");
    const [exerciseCues, setExerciseCues] = useState("");
    const [isEdit, setIsEdit] = useState(false);
    const [selectedExercise, setSelectedExercise] = useState(null);

    useEffect(() => {
        dispatch(fetchExercises());
    }, [dispatch]);

    const handleAddExercise = () => {
        if (isEdit && selectedExercise) {
            dispatch(updateExercise({
                id: selectedExercise.id,
                name: exerciseName,
                cues: exerciseCues
            }));
        } else {
            dispatch(addExercise({
                name: exerciseName,
                cues: exerciseCues
            }));
        }
        handleCloseExerciseModal();
    };

    const handleDeleteExercises = () => {
        dispatch(deleteExercises(selectedRows));
    };

    const handleOpenEditExercise = () => {
        if (selectedRows.length) {
            const exerciseToEdit = exercises.find(exercise => exercise.id === selectedRows[0]);
            if (exerciseToEdit) {
                setIsEdit(true);
                setSelectedExercise(exerciseToEdit);
                setExerciseName(exerciseToEdit.name);
                setExerciseCues(exerciseToEdit.cues);
                modalControls.openModal("addExercise");
            }
        }
    };

    const handleCloseExerciseModal = () => {
        setIsEdit(false);
        setSelectedExercise(null);
        setExerciseName("");
        setExerciseCues("");
        modalControls.closeModal("addExercise");
    };

    return (
        <>
            <Box display="flex" justifyContent={"flex-start"} gap={2}>
                <Button
                    variant="contained"
                    onClick={() => modalControls.openModal("addExercise")}
                >
                    {"Add"}
                </Button>

                <Button
                    variant="contained"
                    onClick={handleOpenEditExercise}
                    disabled={selectedRows.length !== 1}
                >
                    {"Edit"}
                </Button>

                <Button
                    variant="contained"
                    onClick={() => handleDeleteExercises()}
                    color="error"
                    disabled={!selectedRows.length}
                >
                    {"Delete"}
                </Button>
            </Box>
            <br/>
            <ExerciseTable
                exercises={exercises}
                selectedRows={selectedRows}
                setSelectedRows={setSelectedRows}
            />

            <Modal
                open={modals.addExercise?.isOpen}
                onClose={handleCloseExerciseModal}
            >
                <ThemeProvider theme={darkTheme}>
                    <Box sx={modalStyle}>
                        <Typography variant="h6" component="h2" gutterBottom sx={{color: "white"}}>
                            {isEdit ? "Edit Exercise" : "Add Exercise"}
                        </Typography>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    label="Exercise Name"
                                    fullWidth
                                    value={exerciseName}
                                    onChange={(e) => setExerciseName(e.target.value)}
                                    margin="normal"
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    label="Cues"
                                    fullWidth
                                    value={exerciseCues}
                                    onChange={(e) => setExerciseCues(e.target.value)}
                                    margin="normal"
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <Box display="flex" justifyContent="flex-end" gap={2}>
                                    <Button onClick={handleCloseExerciseModal}>Cancel</Button>
                                    <Button variant="contained" color="primary" onClick={handleAddExercise}>
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

export default Exercises;