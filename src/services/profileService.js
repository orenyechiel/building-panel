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
    sendDeleteProfile(userAuth) {
        const data = JSON.stringify(userAuth);
        return apiClient.post("generals/sendQuestion", data);
    },
    fetchProfileDetails(token) {
        return axios.get(`${BASEURL}profile`, {
            headers: {
                "token": token
            },
        });
    },
}
