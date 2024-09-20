const { default: axios } = require("axios");

const axiosUrl = axios.create({
  baseURL: "https://animal-time-server.vercel.app/",
});

export const useAxios = () => {
  return axiosUrl;
};
