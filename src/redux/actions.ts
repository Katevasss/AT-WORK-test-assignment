import axios from "axios";
import { AppDispatch } from "./store";
import { IUser } from "./types";
import { deleteUser, updateUser, userSlice } from "./userSlice";

export const fetchUsers = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(userSlice.actions.usersFetching());
    const response = await axios.get<IUser[]>(
      "https://jsonplaceholder.typicode.com/users"
    );
    const modifiedUsers = response.data.map((user) => ({
      ...user,
      isActive: true,
    }));
    dispatch(userSlice.actions.usersFetchingSuccess(response.data));
    return modifiedUsers;
  } catch (e: any) {
    dispatch(userSlice.actions.usersFetchingError(e.message));
  }
};

export const removeUser = (userId: number) => async (dispatch: AppDispatch) => {
  try {
    await axios.delete(`https://jsonplaceholder.typicode.com/users/${userId}`);
    dispatch(deleteUser(userId));
  } catch (error) {
    console.error("Error removing user:", error);
  }
};

export const updateUserById =
  (userId: number, updatedData: Partial<IUser>) =>
  async (dispatch: AppDispatch) => {
    try {
      await axios.put(
        `https://jsonplaceholder.typicode.com/users/${userId}`,
        updatedData
      );
      dispatch(updateUser({ userId, updatedData }));
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };
