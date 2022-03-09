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
    async signInContract(cid) {
        return await apiClient.post(`userAuth/signin?contractId=${cid}`);
    },
    fetchApartmentPayments(token) {
        return axios.get(`${BASEURL}payments`, {
            headers: {
                "token": token
            },
        });
    },
    fetchPaidPayments(token) {
        return axios.get(`${BASEURL}payments/paymentsList`, {
            headers: {
                "token": token
            },
        });
    },
    fetchFuturePaidPayments(token) {
        return axios.get(`${BASEURL}payments/futurePayments`, {
            headers: {
                "token": token
            },
        });
    },
    fetchGuarantees(token) {
        return axios.get(`${BASEURL}payments/guarantees`, {
            headers: {
                "token": token
            },
        });
    },
    fetchContractDetails(token) {
        return axios.get(`${BASEURL}myApartment/contractDetails`, {
            headers: {
                "token": token
            },
        });
    },
    fetchTenantChanges(token) {
        return axios.get(`${BASEURL}myApartment/tenantChanges`, {
            headers: {
                "token": token
            },
        });
    },
}
