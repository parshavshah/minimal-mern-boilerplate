import { post } from "./CommonAction";

export async function registerUser(data) {
  const preparedRequestData = {
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    password: data.password,
  };
  await post("/api/v1/user/register", preparedRequestData);
}
