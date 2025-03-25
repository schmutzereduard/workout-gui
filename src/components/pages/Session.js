import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {fetchSessions} from "../../store/sessionSlice";

function Session() {

    const dispatch = useDispatch();
    const { id } = useParams();
    const { sessions } = useSelector(state => state.sessions);

    useEffect(() => {
        dispatch(fetchSessions());
    }, [dispatch]);

    const session = sessions.find(session => session.id === parseInt(id));

    return (
        <>
        </>
    );
}

export default Session;