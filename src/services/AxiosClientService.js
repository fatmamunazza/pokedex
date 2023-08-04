import axios from "axios";

const axiosClient=axios.create({
    baseURL: "https://pokeapi.co/api/v2/",
    headers: {
        "Content-Type":"application/json",
    }
})

axiosClient.interceptors.response.use(res=>res.data);

export default axiosClient;