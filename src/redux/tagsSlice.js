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

//Obtener todas las tags
export const fetchAllTags = createAsyncThunk('tags/fetchAll', async () => {
    const [categories, subcategories, varieties] = await Promise.all([
      axios.get(`http://localhost:8080/categories`),
      axios.get(`http://localhost:8080/subcategories`),
      axios.get(`http://localhost:8080/varieties`),
    ]);
  
    return {
      categories: categories.data,
      subcategories: subcategories.data,
      varieties: varieties.data,
    };
  });


export const createCategory = createAsyncThunk('tags/createCategory', async ({newItem,token}) => {
    const {data} = await axios.post(`http://localhost:8080/categories/admin/${newItem}`,
    {},
    {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    })
    return data 
})

export const createSubCategory = createAsyncThunk('tags/createSubCategory', async ({newItem,token}) => {
    const {data} = await axios.post(`http://localhost:8080/subcategories/admin/${newItem}`,
    {},
    {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    })
    return data 
})

export const createVarieties = createAsyncThunk('tags/createVarieties', async ({newItem,token}) => {
    const {data} = await axios.post(`http://localhost:8080/varieties/admin/${newItem}`,
    {},
    {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    })
    return data 
})


export const deleteCategory = createAsyncThunk('tags/deleteCategories', async ({itemName,token}) => {
    const {data} = await axios.delete(`http://localhost:8080/categories/admin/${itemName}`,
    {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    })
    return data
})

export const deleteSubCategory = createAsyncThunk('tags/deleteSubCategories', async ({itemName,token}) => {
    const {data} = await axios.delete(`http://localhost:8080/subcategories/admin/${itemName}`,
    {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    })
    return data
})

export const deleteVarieties = createAsyncThunk('tags/deleteVarieties', async ({itemName,token}) => {
    const {data} = await axios.delete(`http://localhost:8080/varieties/admin/${itemName}`,
    {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    })
    return data
})

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
          // Manejar fetchAllTags
          .addCase(fetchAllTags.pending, (state) => {
            state.loading = true;
            state.error = null;
          })
          .addCase(fetchAllTags.fulfilled, (state, action) => {
            state.loading = false;
            state.categoriesItems = action.payload.categories;
            state.subcategoriesItems = action.payload.subcategories;
            state.varietiesItems = action.payload.varieties;
          })
          .addCase(fetchAllTags.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
          })
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
            state.error = action.error.message;
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
            state.error = action.error.message;
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
        state.error = action.error.message;
        })  
    // Crear una Categoria
    .addCase(createCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
        })
    .addCase(createCategory.fulfilled, (state, action) => {
    state.loading = false;
    state.categoriesItems = [...state.categoriesItems,action.payload];
    })
    .addCase(createCategory.rejected, (state, action) => {
    state.loading = false;
    state.error = action.error.message;
    })  

    // Crear una SubCategoria
    .addCase(createSubCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
        })
    .addCase(createSubCategory.fulfilled, (state, action) => {
    state.loading = false;
    state.subcategoriesItems = [...state.subcategoriesItems,action.payload];
    })
    .addCase(createSubCategory.rejected, (state, action) => {
    state.loading = false;
    state.error = action.error.message;
    })  

    // Crear una Varieties
    .addCase(createVarieties.pending, (state) => {
        state.loading = true;
        state.error = null;
        })
    .addCase(createVarieties.fulfilled, (state, action) => {
    state.loading = false;
    state.varietiesItems = [...state.varietiesItems,action.payload];
    })
    .addCase(createVarieties.rejected, (state, action) => {
    state.loading = false;
    state.error = action.error.message;
    })  

    // Borrar una Categoria
    .addCase(deleteCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
        })
    .addCase(deleteCategory.fulfilled, (state, action) => {
        state.loading = false;
        const removedCategory = action.payload.category_id;
        state.categoriesItems = state.categoriesItems.filter(item => item.category_id !== removedCategory);
    })
    .addCase(deleteCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
    })
    // Borrar una SubCategoria
    .addCase(deleteSubCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
        })
    .addCase(deleteSubCategory.fulfilled, (state, action) => {
        state.loading = false;
        const removedSubCategory = action.payload.subCategory_id;
        state.subcategoriesItems = state.subcategoriesItems.filter(item => item.subCategory_id !== removedSubCategory);
    })
    .addCase(deleteSubCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
    })
    // Borrar una Variety
    .addCase(deleteVarieties.pending, (state) => {
        state.loading = true;
        state.error = null;
        })
    .addCase(deleteVarieties.fulfilled, (state, action) => {
        state.loading = false;
        const removedVariety = action.payload.variety_id;
        state.varietiesItems = state.varietiesItems.filter(item => item.variety_id !== removedVariety);
    })
    .addCase(deleteVarieties.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
    })    
  },
});


export default tagsSlice.reducer;
