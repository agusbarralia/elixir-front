import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Obtener Categorias
export const fetchCategories = createAsyncThunk('tags/fetchCategories', async () => { //Obtener todas las categorias
    const { data } = await axios.get(`http://localhost:8080/categories`);
    return data;
});

//Obtener SubCategorias
export const fetchSubCategories = createAsyncThunk('tags/fetchSubCategories', async () => { //Obtener todas las subcategorias
    const { data } = await axios.get(`http://localhost:8080/subcategories`);
    return data;
});

//Obtener Varieties
export const fetchVarieties = createAsyncThunk('tags/fetchVarieties', async () => { //Obtener todas las variedades
    const { data } = await axios.get(`http://localhost:8080/varieties`);
    return data;
});

const tagsSlice = createSlice({
  name: "tags",
  initialState: {
    categoriesItems: [],
    subcategoriesItems: [],
    varietiesItems: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Obtener todas las categorias
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categoriesItems = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })  
    // Obtener todas las subcategorias
      .addCase(fetchSubCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSubCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.subcategoriesItems = action.payload;
      })
      .addCase(fetchSubCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })  
    // Obtener todas las varieties
    .addCase(fetchVarieties.pending, (state) => {
    state.loading = true;
    state.error = null;
    })
    .addCase(fetchVarieties.fulfilled, (state, action) => {
    state.loading = false;
    state.varietiesItems = action.payload;
    })
    .addCase(fetchVarieties.rejected, (state, action) => {
    state.loading = false;
    state.error = action.payload;
    })  
  },
});


export default tagsSlice.reducer;
