import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IUser } from "./types";

interface UserState {
  users: IUser[];
  loading: boolean;
  error: string;
}

const initialState: UserState = {
  users: [],
  loading: false,
  error: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    usersFetching(state) {
      state.loading = true;
    },
    usersFetchingSuccess(state, action: PayloadAction<IUser[]>) {
      state.loading = false;
      state.error = "";
      state.users = action.payload.map((user) => ({ ...user, isActive: true }));
    },
    usersFetchingError(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    toggleUserStatus(state, action: PayloadAction<number>) {
      const userId = action.payload;
      const userToUpdate = state.users.find((user) => user.id === userId);
      if (userToUpdate) {
        userToUpdate.isActive = !userToUpdate.isActive;
      }
    },
    deleteUser(state, action: PayloadAction<number>) {
      state.users = state.users.filter((user) => user.id !== action.payload);
    },
    updateUser(
      state,
      action: PayloadAction<{ userId: number; updatedData: Partial<IUser> }>
    ) {
      const { userId, updatedData } = action.payload;
      const userIndex = state.users.findIndex((user) => user.id === userId);
      if (userIndex !== -1) {
        state.users[userIndex] = { ...state.users[userIndex], ...updatedData };
      }
    },
  },
});

export const {
  usersFetching,
  usersFetchingSuccess,
  usersFetchingError,
  toggleUserStatus,
  deleteUser,
  updateUser,
} = userSlice.actions;

export default userSlice.reducer;
