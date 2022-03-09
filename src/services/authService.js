import axios from "axios";
const BASEURL = process.env.VUE_APP_URL;

const apiClient = axios.create({
    baseURL: BASEURL,
    withCredentials: false, // This is the default
    headers: {
        "Content-Type": "application/json",
    },
});

export default {
    getCodeReq(userAuth) {
        const data = JSON.stringify(userAuth);
        return apiClient.post("userAuth/auth", data);
    },
    login(code) {
        const obj = {
            otp: code,
            password: "777"
        }
        const data = JSON.stringify(obj);
        return apiClient.post("userAuth/apartments", data);
    },
};
