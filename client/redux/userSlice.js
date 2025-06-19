import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  authenticate: false,
  user: null,
  allUsers: [],
  otherUsers: [],
  userPhoto: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setAuthenticate: (state, action) => {
      state.authenticate = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setAllUsers: (state, action) => {
      state.allUsers = action.payload;
    },
    setOtherUsers: (state, action) => {
      state.otherUsers = action.payload;
    },
    setUserPhoto: (state, action) => {
      state.userPhoto = action.payload;
    },
  },
});

export const {
  setAuthenticate,
  setUser,
  setAllUsers,
  setOtherUsers,
  setUserPhoto,
} = userSlice.actions;
export default userSlice.reducer;
