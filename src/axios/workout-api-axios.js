import { createAxiosInstance } from "./axios-instance";

const instance = createAxiosInstance(process.env.BACK_END_URL);

export default instance;