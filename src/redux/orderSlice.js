import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

//fetchOrders:
export const fetchOrders = createAsyncThunk('order/fetchOrders', async (token) => {
    const { data } = await axios('http://localhost:8080/orders', {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });
    return data; 
});

//fetchorderdetail:
export const fetchOrderDetail = createAsyncThunk('order/fetchOrderDetail', async({token, id})=> {

    const { data } = await axios(`http://localhost:8080/orders/order/${id}`,{
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });
    return data; 
});

//fetchOrdersAdmin:
export const fetchOrdersAdmin = createAsyncThunk('order/fetchOrdersAdmin', async (token) => {
    const { data } = await axios('http://localhost:8080/orders/admin', {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });
    return data; 
});

export const changeOrderState = createAsyncThunk('order/changeOrderState', async ({token,orderId}) => {

    const { data } = await axios.put(`http://localhost:8080/orders/order/${orderId}/state`,
        {},
        {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });
    return data; 
});

const orderSlice = createSlice({
    name : 'orders',
    initialState:{
        items: [],
        selectOrder: null,
        loading : false,
        error: null
    },
    reducers: {
    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchOrders.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchOrders.fulfilled, (state,action) => {
            state.loading = false;
            state.items = action.payload;
        })
        .addCase(fetchOrders.rejected, (state,action) => {
            state.loading = false;
            state.error = action.error.message;
        })
        .addCase(fetchOrdersAdmin.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchOrdersAdmin.fulfilled, (state,action) => {
            state.loading = false;
            state.items = action.payload;
        })
        .addCase(fetchOrdersAdmin.rejected, (state,action) => {
            state.loading = false;
            state.error = action.error.message;
        })
        .addCase(changeOrderState.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(changeOrderState.fulfilled, (states,action) => {
            states.loading = false;
            const { orderId, state } = action.payload;
            states.items = states.items.map((item) =>
                item.orderId === orderId
                    ? { ...item, state: state }
                    : item
            );
        })
        .addCase(changeOrderState.rejected, (state,action) => {
            state.loading = false;
            state.error = action.error.message;
        })
        .addCase(fetchOrderDetail.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchOrderDetail.fulfilled, (state,action) => {
            state.loading = false;
            state.selectOrder = action.payload;
        })
        .addCase(fetchOrderDetail.rejected, (state,action) => {
            state.loading = false;
            state.error = action.error.message;
        })        
    }
})

export default orderSlice.reducer;

