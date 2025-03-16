import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {fetchSessions} from "../../store/sessionSlice";
import {SessionTable} from "../tables/Tables";
import {Box, Button} from "@mui/material";

function Sessions() {

    const dispatch = useDispatch();
    const { sessions } = useSelector((state) => state.sessions);
    const [selectedRows, setSelectedRows] = useState([]);

    useEffect(() => {
        dispatch(fetchSessions());
    }, [dispatch])

    useEffect(() => {
        console.log(selectedRows);
    },[selectedRows])

    return (
        <>
            <Box display="flex" justifyContent={"flex-start"} gap={2}>
                <Button
                        variant="contained">
                    {"Add"}
                </Button>

                <Button
                        variant="contained">
                    {"Edit"}
                </Button>

                <Button
                    variant="contained"
                    color="error"
                >
                    {"Delete"}
                </Button>
            </Box>
            <SessionTable
                sessions={sessions}
                selectedRows={selectedRows}
                setSelectedRows={setSelectedRows}
            />
        </>
    );
}

export default Sessions;