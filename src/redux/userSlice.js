import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Iniciar sesión
export const loginUser = createAsyncThunk("auth/loginUser", async ({ email, password }) => {
    const { data } = await axios.post('http://localhost:8080/api/v1/auth/authenticate', { email, password });
    return data // La respuesta debe incluir {token, role }
});

// Registrar usuario
export const registerUser = createAsyncThunk("auth/registerUser", async (userData) => {
      const { data } = await axios.post('http://localhost:8080/api/v1/auth/register', userData);
      return data; // La respuesta debe incluir {token, role }
  });


const authSlice = createSlice({
  name: "users",
  initialState: {
    user: null,
    token: null,
    role: null,
    isAuthenticated: false,
    loading: false,
    error: null,
  },
  reducers: {
    logoutUser: (state) => {
        state.token = null
        state.role = null
        state.isAuthenticated = false
    } 
  },
  extraReducers: (builder) => {
    builder
      // Iniciar sesión
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        const {access_token, role } = action.payload;
        state.loading = false;
        state.token = access_token;
        state.role = role;
        state.isAuthenticated = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Registrar usuario
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        const { access_token, role } = action.payload;
        state.loading = false;
        state.token = access_token;
        state.role = role;
        state.isAuthenticated = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
  },
});

export const { logoutUser } = authSlice.actions;

export default authSlice.reducer;
