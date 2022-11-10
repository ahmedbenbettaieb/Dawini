import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

type UserInfoTypes = {
  name: string;
  email: string;
  isAdmin: boolean;
};

type InitialStateTypes = {
  user:  null|UserInfoTypes;
  error: any;
  loading: boolean;
};

const initialState: InitialStateTypes = {
  user: null,
  
  error: null,
  loading: false,
};

export const getUserData = createAsyncThunk("get-userData", async () => {
  try {
    const res = await axios.post(
      "/api/users/user",
      { token: localStorage.getItem("token") },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    if (res.data) {
      console.log(res.data)
      return res.data;
    }
  } catch (error) {
    console.log(error);
    // return error;
  }
});

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUserData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getUserData.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;

    });
    builder.addCase(getUserData.rejected, (state, action) => {
      state.loading = false;
      //state.error = action.payload;
    });
  },
});

export const { setUser } = userSlice.actions;