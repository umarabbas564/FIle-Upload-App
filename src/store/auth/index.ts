import axios from "lib/axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { authenticationResponse } from "api/types";
// import {authenticate} from "api/index";
import { setToken } from "lib/axios";

export const authenticateUser = createAsyncThunk<authenticationResponse>(
  "auth/authenticate-user",
  async () => {
    const res = await axios.post("/authenticate", {
      username: "test",
      password: "passmein",
    });
    const data = { jwttoken: res?.data.jwttoken };

    setToken(res?.data.jwttoken);
    return data as authenticationResponse;
  }
);

export type authState = {
  status: string;
  jwttoken: string;
};

const initialState: authState = {
  status: "idle",
  jwttoken: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(authenticateUser.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(authenticateUser.rejected, (state, action) => {
      state.status = "failed";
    });
    builder.addCase(authenticateUser.fulfilled, (state, action) => {
      state.status = "fullfilled";
      state.jwttoken = action.payload.jwttoken;
    });
  },
});

export default authSlice.reducer;
