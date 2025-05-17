import axios from "axios";

export interface BackendUser {
  uid: string;
  name: string | null;
  email: string | null;
}

export const registerUserInBackend = async (user: BackendUser, idToken: string) => {
  try {
    const response = await axios.post(
      "http://localhost:8083/api/user/register",
      user,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${idToken}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    throw new Error("Failed to register user in backend");
  }
};