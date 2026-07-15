import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";

const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
  user: user || null,
  registeredEmail: null,
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

// ----------------------
// Helper
// ----------------------

const getErrorMessage = (error) =>
  error?.response?.data?.message ||
  error?.message ||
  "Something went wrong";

const createAuthThunk = (type, serviceFn) =>
  createAsyncThunk(type, async (payload, thunkAPI) => {
    try {
      return await serviceFn(payload);
    } catch (error) {
      return thunkAPI.rejectWithValue(getErrorMessage(error));
    }
  });

// ----------------------
// Thunks
// ----------------------

export const register = createAuthThunk(
  "auth/register",
  authService.register
);

export const login = createAuthThunk(
  "auth/login",
  authService.login
);

export const googleLogin = createAuthThunk(
  "auth/googleLogin",
  authService.googleLogin
);

export const verifyEmail = createAuthThunk(
  "auth/verifyEmail",
  authService.verifyEmail
);

export const logout = createAsyncThunk("auth/logout", async () => {
  await authService.logout();
});

// ----------------------
// Slice
// ----------------------

const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },

    setRegisteredEmail: (state, action) => {
      state.registeredEmail = action.payload;
    },
  },

  extraReducers: (builder) => {
    // Pending handler
    const pending = (state) => {
      state.isLoading = true;
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
    };

    // Rejected handler
    const rejected = (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
      state.message = action.payload;
    };

    builder

      // Register
      .addCase(register.pending, pending)
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload.message;
      })
      .addCase(register.rejected, (state, action) => {
        rejected(state, action);
        state.user = null;
      })

      // Verify Email
      .addCase(verifyEmail.pending, pending)
      .addCase(verifyEmail.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(verifyEmail.rejected, rejected)

      // Login
      .addCase(login.pending, pending)
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        rejected(state, action);
        state.user = null;
      })

      // Google Login
      .addCase(googleLogin.pending, pending)
      .addCase(googleLogin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(googleLogin.rejected, (state, action) => {
        rejected(state, action);
        state.user = null;
      })

      // Logout
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.isSuccess = false;
        state.isError = false;
        state.message = "";
      });
  },
});

export const { reset, setRegisteredEmail } = authSlice.actions;

export default authSlice.reducer;