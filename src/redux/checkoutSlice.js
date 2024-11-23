import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const processCheckout = createAsyncThunk('checkout/processCheckout', async (token) => {
    const { data } = await axios.post(
        'http://localhost:8080/checkout/process', 
        {}, // Si no tienes un cuerpo, asegúrate de enviar un objeto vacío
        {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        }
    );
    return data; 
});


const checkoutSlice = createSlice({
  name: "checkout",
  initialState: {
    order: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearOrder: (state) => {
        state.order = null; // Limpia el producto seleccionado al salir de la página
    }
  },
  extraReducers: (builder) => {
    builder
      // processCheckout
      .addCase(processCheckout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(processCheckout.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload;
      })
      .addCase(processCheckout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { clearOrder } = checkoutSlice.actions;
export default checkoutSlice.reducer;
