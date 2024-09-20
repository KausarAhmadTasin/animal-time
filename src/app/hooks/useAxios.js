const { default: axios } = require("axios");

const axiosUrl = axios.create({
  baseURL: "http://localhost:5000",
});

export const useAxios = () => {
  return axiosUrl;
};
