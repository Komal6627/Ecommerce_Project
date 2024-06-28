import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import orderAPI from '../../mocks/order';

// Async thunk for creating an order
// export const createOrder = createAsyncThunk(
//   'order/createOrder',
//   async (order, { rejectWithValue }) => {
//     try {
//       const createdOrder = await orderAPI.createOrder(order);
//       localStorage.removeItem("cartItems");
//       return createdOrder;
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   }
// );

const initialState = {
  listorder: [],
  orderDetails: {},
  loading: false,
  error: null,
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    getOrderDetailsStart(state) {
      state.loading = true;
      state.error = null;
    },
    getOrderDetailsSuccess(state, action) {
      state.orderDetails = action.payload;
      state.loading = false;
      state.error = null;
      console.log('Order details fetched successfully:', action.payload);
    },
    getOrderDetailsFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
      console.error('Failed to fetch order details:', action.payload);
    },
    createOrderStart(state) {
      state.loading = true;
      state.error = null;
      console.log('Creating order...');
    },
    createOrderSuccess(state, action) {
      state.listorder.push(action.payload);
      state.orderDetails = action.payload;
      state.loading = false;
      state.error = null;
      console.log('Order created successfully:', action.payload);
    },
    createOrderFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
      console.error('Failed to create order:', action.payload);
    },
    payOrderStart(state) {
      state.loading = true;
      state.error = null;
      console.log('Paying for order...');
    },
    payOrderSuccess(state, action) {
      if (action.payload === 'Order was paid') {
        state.orderDetails.isPaid = true;
      }
      state.loading = false;
      state.error = null;
      console.log('Order payment successful:', action.payload);
    },
    payOrderFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
      console.error('Failed to pay for order:', action.payload);
    },
    listMyOrdersStart(state) {
      state.loading = true;
      state.error = null;
    },
    listMyOrdersSuccess(state, action) {
      state.listorder = action.payload;
      state.loading = false;
      state.error = null;
      console.log('My orders listed successfully:', action.payload);
    },
    listMyOrdersFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
      console.error('Failed to list my orders:', action.payload);
    },
    listOrdersStart(state) {
      state.loading = true;
      state.error = null;
    },
    listOrdersSuccess(state, action) {
      state.listorder = action.payload;
      state.loading = false;
      state.error = null;
      console.log('Orders listed successfully:', action.payload);
    },
    listOrdersFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
      console.error('Failed to list orders:', action.payload);
    },
    deliverOrderStart(state) {
      state.loading = true;
      state.error = null;
    },
    deliverOrderSuccess(state, action) {
      const updatedOrder = action.payload;
      const index = state.listorder.findIndex((order) => order._id === updatedOrder._id);
      if (index !== -1) {
        state.listorder[index] = updatedOrder;
      }
      state.loading = false;
      state.error = null;
      console.log('Order delivered successfully:', updatedOrder);
    },
    deliverOrderFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
      console.error('Failed to deliver order:', action.payload);
    },
  },
});

export const {
  getOrderDetailsStart,
  getOrderDetailsSuccess,
  getOrderDetailsFailure,
  createOrderStart,
  createOrderSuccess,
  createOrderFailure,
  payOrderStart,
  payOrderSuccess,
  payOrderFailure,
  listMyOrdersStart,
  listMyOrdersSuccess,
  listMyOrdersFailure,
  listOrdersStart,
  listOrdersSuccess,
  listOrdersFailure,
  deliverOrderStart,
  deliverOrderSuccess,
  deliverOrderFailure,
} = orderSlice.actions;

export const createOrder = (order) => async (dispatch) => {
  try {
    dispatch(createOrderStart());
    const createdOrder = await orderAPI.createOrder(order);
    dispatch(createOrderSuccess(createdOrder));
    localStorage.removeItem("cartItems");
    return createdOrder; 
  } catch (error) {
    dispatch(createOrderFailure(error.message));
    console.error('Create order error:', error.message);
  }
};

export const getOrderDetails = (orderId) => async (dispatch) => {
  try {
    dispatch(getOrderDetailsStart());
    const orderDetails = await orderAPI.getOrderDetails(orderId);
    dispatch(getOrderDetailsSuccess(orderDetails));
  } catch (error) {
    dispatch(getOrderDetailsFailure(error.message));
    console.error('Get order details error:', error.message);
  }
};

export const payOrder = (orderId, paymentResult) => async (dispatch) => {
  try {
    dispatch(payOrderStart());
    const updatedOrder = await orderAPI.payOrder(orderId, paymentResult);
    dispatch(payOrderSuccess(updatedOrder));
  } catch (error) {
    dispatch(payOrderFailure(error.message));
    console.error('Pay order error:', error.message);
  }
};

export const listMyOrders = () => async (dispatch) => {
  try {
    dispatch(listMyOrdersStart());
    const myOrders = await orderAPI.listMyOrders();
    dispatch(listMyOrdersSuccess(myOrders));
  } catch (error) {
    dispatch(listMyOrdersFailure(error.message));
    console.error('List my orders error:', error.message);
  }
};

export const listOrders = () => async (dispatch) => {
  try {
    dispatch(listOrdersStart());
    const allOrders = await orderAPI.listOrders();
    dispatch(listOrdersSuccess(allOrders));
  } catch (error) {
    dispatch(listOrdersFailure(error.message));
    console.error('List orders error:', error.message);
  }
};

export const deliverOrder = (orderId) => async (dispatch) => {
  try {
    dispatch(deliverOrderStart());
    const updatedOrder = await orderAPI.deliverOrder(orderId);
    dispatch(deliverOrderSuccess(updatedOrder));
  } catch (error) {
    dispatch(deliverOrderFailure(error.message));
    console.error('Deliver order error:', error.message);
  }
};

export const { reducer } = orderSlice;
export default orderSlice;
