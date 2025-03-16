import { createAxiosInstance } from "./axios-instance";

const instance = createAxiosInstance(process.env.REACT_APP_BACK_END_URL);

export default instance;