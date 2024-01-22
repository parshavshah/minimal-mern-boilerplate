import axios from "axios";
const baseUrl = "http://localhost:4000";

export const getAuthHeaders = () => {
  return {
    Authorization: localStorage.getItem("userToken"),
  };
};

export const get = async (path, query) => {
  try {
    const fullPath = `${baseUrl}${path}`;
    const options = {
      headers: getAuthHeaders(),
    };
    return await axios.get(fullPath, options);
  } catch (error) {
    console.log("Error while calling API :", path);
    console.log(error);
    throw error;
  }
};

export const post = async (path, data) => {
  try {
    const fullPath = `${baseUrl}${path}`;
    return await axios.post(fullPath, data);
  } catch (error) {
    console.log("Error while calling API :", path, data);
    console.log(error);
    throw error;
  }
};
