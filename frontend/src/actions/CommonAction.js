import axios from "axios";
const baseUrl = "http://localhost:4000";

export const get = async (path, query) => {};

export const post = async (path, data) => {
  try {
    const fullPath = `${baseUrl}${path}`;
    await axios.post(fullPath, data);
  } catch (error) {
    console.log("Error while calling API :", path, data);
    console.log(error);
    throw error;
  }
};
