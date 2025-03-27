import {Box, Button} from "@mui/material";
import {WorkoutTable} from "../tables/Tables";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {deleteWorkouts, fetchWorkouts} from "../../store/workoutSlice";
import useModals from "../../hooks/useModals";

function Workouts() {

    const dispatch = useDispatch();
    const { workouts } = useSelector((state) => state.workouts);
    const [selectedRows, setSelectedRows] = useState([]);
    const { modals, modalControls } = useModals();

    useEffect(() => {
        dispatch(fetchWorkouts());
    }, [dispatch]);

    const handleAddWorkout = () => {
    };

    const handleDeleteWorkouts = () => {
        dispatch(deleteWorkouts(selectedRows));
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
                    disabled={!selectedRows.length}
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
        </>
    );
}

export default Workouts;