import { post, get } from "./CommonAction";

export async function registerUser(data) {
  const preparedRequestData = {
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    password: data.password,
  };
  await post("/api/v1/user/register", preparedRequestData);
}

export async function loginUser(data) {
  const preparedRequestData = {
    username: data.username,
    password: data.password,
  };
  const responseData = await post("/api/v1/user/login", preparedRequestData);
  return responseData.data;
}

export async function getProfileData(userId) {
  const responseData = await get(`/api/v1/user/profile/${userId}`);
  return responseData.data;
}
