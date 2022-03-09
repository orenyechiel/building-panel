import axios from "axios";
const BASEURL = process.env.VUE_APP_WPT;

export default {
    fetchWPLabels() {
        return axios.get(`${BASEURL}wp-json/app/GetTable?table_id=181`);
    },
}