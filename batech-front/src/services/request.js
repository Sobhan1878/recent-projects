import axios from "axios";

export default class Request {
    baseURL = "http://localhost:8000/api/v1/";

    get(url, config) {
        return axios
            .get(this.baseURL + url, config)
            .then((response) => response.data);
    }

    post(url, data, config) {
        return axios
            .post(this.baseURL + url, data, config)
            .then((response) => response.data)
            .catch((error) => error.response);
    }
}
