import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedProducts:JSON.parse(localStorage.getItem("selectedProducts")) || [],
  selectedProductsID: [],
};

export const counterSlice = createSlice({
  name: "cart",
  initialState,
  
  reducers: {
    addToCart: (state, action) => {
      
      const productsWithQuantity = { ...action.payload, Quantity: 1 };
      state.selectedProducts.push(productsWithQuantity);
      
      localStorage.setItem("selectedProducts",JSON.stringify(state.selectedProducts))
    },
    increaseQuantity: (state, action) => {
      
      const increaseProduct = state.selectedProducts.find(
        (product) => product.id === action.payload.id
      );
      increaseProduct.Quantity += 1;
      localStorage.setItem("selectedProducts",JSON.stringify(state.selectedProducts))
    },
    decreaseQuantity: (state, action) => {
      
      const decreaseProduct = state.selectedProducts.find(
        (product) => product.id === action.payload.id
      );
      decreaseProduct.Quantity -= 1;
      
      if (decreaseProduct.Quantity === 0) {
        const newArr = state.selectedProducts.filter(
          (product) => product.id !== action.payload.id
        );
        
        state.selectedProducts =newArr
        

      }
      localStorage.setItem("selectedProducts",JSON.stringify(state.selectedProducts))
    },

    deleteProduct: (state, action) => {
      
      const newArr = state.selectedProducts.filter(
        (product) => product.id !== action.payload.id
      );
      
      state.selectedProducts =newArr
      
      localStorage.setItem("selectedProducts",JSON.stringify(state.selectedProducts))
    },
  },
});

export const { addToCart, increaseQuantity, decreaseQuantity, deleteProduct } =
  counterSlice.actions;

export default counterSlice.reducer;
