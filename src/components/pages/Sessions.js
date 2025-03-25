import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchSessions, addSession} from "../../store/sessionSlice"; // Import addSession
import {SessionTable} from "../tables/Tables";
import {
    Box,
    Button,
    FormControl,
    MenuItem,
    Modal,
    Select,
    TextField,
    Grid,
    Typography, ThemeProvider,
} from "@mui/material";
import {useNavigate} from "react-router-dom";
import useModals from "../../hooks/useModals";
import {fetchWorkouts} from "../../store/workoutSlice";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
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

function Sessions() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {sessions} = useSelector((state) => state.sessions);
    const {workouts} = useSelector((state) => state.workouts);
    const [selectedRows, setSelectedRows] = useState([]);
    const {modals, modalControls} = useModals();

    const [user, setUser] = useState("");
    const [date, setDate] = useState(dayjs());
    const [workoutId, setWorkoutId] = useState("");

    useEffect(() => {
        dispatch(fetchSessions());
        dispatch(fetchWorkouts());
    }, [dispatch]);

    const handleAddSession = () => {
        dispatch(addSession(
            {
                user,
                date: date.format('YYYY-MM-DD'),
                workout: workouts.find(workout => workout.id === parseInt(workoutId))
            }
            ));
        modalControls.closeModal("addSession"); // Close the modal
        setUser("");
        setDate(dayjs());
        setWorkoutId("");
    };

    return (
        <>
            <Box display="flex" justifyContent={"flex-start"} gap={2}>
                <Button
                    variant="contained"
                    onClick={() => modalControls.openModal("addSession")}
                >
                    {"Add"}
                </Button>

                <Button
                    variant="contained"
                    onClick={() => navigate(`/sessions/${selectedRows[0]}`)}
                    disabled={!selectedRows.length}
                >
                    {"Edit"}
                </Button>

                <Button
                    variant="contained"
                    color="error"
                    disabled={!selectedRows.length}
                >
                    {"Delete"}
                </Button>
            </Box>
            <br/>
            <SessionTable
                sessions={sessions}
                selectedRows={selectedRows}
                setSelectedRows={setSelectedRows}
            />
            <Modal
                open={modals.addSession?.isOpen}
                onClose={() => modalControls.closeModal("addSession")}
            >
                <ThemeProvider theme={darkTheme}>  {/* Apply dark theme here */}
                    <Box sx={modalStyle}>
                        <Typography variant="h6" component="h2" gutterBottom sx={{ color: "white" }}>
                            Add New Session
                        </Typography>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    label="User"
                                    fullWidth
                                    value={user}
                                    onChange={(e) => setUser(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker
                                        label="Date"
                                        value={date}
                                        onChange={(newDate) => setDate(newDate)}
                                        renderInput={(params) => (
                                            <TextField {...params} fullWidth margin="normal"/>
                                        )}
                                    />
                                </LocalizationProvider>
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl fullWidth>
                                    <Select
                                        variant="outlined"
                                        value={workoutId}
                                        onChange={(e) => setWorkoutId(e.target.value)}
                                    >
                                        <MenuItem value="">
                                            <em>None</em>
                                        </MenuItem>
                                        {workouts.map((workout) => (
                                            <MenuItem key={workout.id} value={workout.id}>
                                                {workout.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <Box display="flex" justifyContent="flex-end" gap={2}>
                                    <Button onClick={() => modalControls.closeModal("addSession")}>
                                        Cancel
                                    </Button>
                                    <Button variant="contained" color="primary" onClick={handleAddSession}>
                                        Add
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

export default Sessions;