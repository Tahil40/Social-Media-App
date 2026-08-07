import axios from "axios";

const BaseURL = "http://localhost:3000";

export const clientServer = axios.create({
    baseURL: BaseURL, 
});