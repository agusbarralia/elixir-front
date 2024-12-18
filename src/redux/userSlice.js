import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Iniciar sesión
export const loginUser = createAsyncThunk("auth/loginUser", async ({ email, password }) => {
  const { data } = await axios.post("http://localhost:8080/api/v1/auth/authenticate", { email, password });
  return data; 
});

// Registrar usuario
export const registerUser = createAsyncThunk("auth/registerUser", async (userData) => {
  const { data } = await axios.post("http://localhost:8080/api/v1/auth/register", userData);
  return data; 
});

// Obtener usuario actual
export const fetchUser = createAsyncThunk("auth/fetchUser", async (token) => {
  const { data } = await axios.get("http://localhost:8080/users/user", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data; 
});

// Obtener todos los usuarios (ADMIN)
export const fetchUsersAdmin = createAsyncThunk("auth/fetchUsersAdmin", async (token) => {
  const { data } = await axios.get("http://localhost:8080/users/admin/users", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data; 
});

// Actualizar usuario
export const updateUser = createAsyncThunk("auth/updateUser", async ({ token, formData }) => {
  const infoForm = new FormData();
  infoForm.append('username',formData.username)
  infoForm.append('email',formData.email)
  infoForm.append('last_name',formData.last_name)
  infoForm.append('name',formData.name)

  const { data } = await axios.put("http://localhost:8080/users/user", infoForm, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data; // Devuelve la respuesta del servidor
});

export const changeStateUser = createAsyncThunk('auth/changeStateUser', async ({userId, token}) => {
  const formData = new FormData();
  formData.append('userId', parseInt(userId));

  const response = await axios.put('http://localhost:8080/users/admin/changeState', formData, {
      headers: {
          'Authorization': `Bearer ${token}`,
      },
  }
);
  // Devolver los datos necesarios para actualizar el estado
  return response.data;
}
);


const authSlice = createSlice({
  name: "users",
  initialState: {
    items : [],
    user: null,
    token: null,
    role: null,
    isAuthenticated: false,
    loading: false,
    error: null,
  },
  reducers: {
    logoutUser: (state) => {
      state.token = null;
      state.role = null;
      state.isAuthenticated = false;
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Iniciar sesión
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        const { access_token, role } = action.payload;
        state.loading = false;
        state.token = access_token;
        state.role = role;
        state.isAuthenticated = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
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
        state.error = action.error.message;
      })
      // Obtener usuario actual
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Actualizar usuario
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.user = action.payload; // Actualiza los datos del usuario en el estado
        state.loading = false;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Obtener todos los usuarios (ADMIN)
      .addCase(fetchUsersAdmin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsersAdmin.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(fetchUsersAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      //ChangeStateUser
      .addCase(changeStateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(changeStateUser.fulfilled, (states, action) => {
        states.loading = false;
        const { id,state } = action.payload;
        states.items = states.items.map((item) =>
            item.id === id
                ? { ...item, state: state }
                : item
        );
      })
      .addCase(changeStateUser.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message;
      });
  },
});

export const { logoutUser } = authSlice.actions;
export default authSlice.reducer;
