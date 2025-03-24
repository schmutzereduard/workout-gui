import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {fetchSessions} from "../../store/sessionSlice";
import {SessionTable} from "../tables/Tables";
import {Box, Button} from "@mui/material";
import {useNavigate} from "react-router-dom";

function Sessions() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { sessions } = useSelector((state) => state.sessions);
    const [selectedRows, setSelectedRows] = useState([]);

    useEffect(() => {
        dispatch(fetchSessions());
    }, [dispatch])


    return (
        <>
            <Box display="flex" justifyContent={"flex-start"} gap={2}>
                <Button
                        variant="contained"
                        onClick={() => navigate("/session/0")}
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
            <br />
            <SessionTable
                sessions={sessions}
                selectedRows={selectedRows}
                setSelectedRows={setSelectedRows}
            />
        </>
    );
}

export default Sessions;