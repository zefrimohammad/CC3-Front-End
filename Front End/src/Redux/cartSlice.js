import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedProducts:JSON.parse(localStorage.getItem("selectedProducts")) || [],
  selectedProductsID: [],
};

export const counterSlice = createSlice({
  name: "cart",
  initialState,
  //action.payload => product From Api => العنصر اللي بداخل الاقواس
  reducers: {
    addToCart: (state, action) => {
      //action.payload => product From Api => انا بضيف المنتج القادم من الايه بي اي
      const productsWithQuantity = { ...action.payload, Quantity: 1 };
      state.selectedProducts.push(productsWithQuantity);
      // state.selectedProductsID.push(action.payload.id);
      localStorage.setItem("selectedProducts",JSON.stringify(state.selectedProducts))
    },
    increaseQuantity: (state, action) => {
      //action.payload => product From user => انا بزود المنتج اللي المستخدم اختاره
      const increaseProduct = state.selectedProducts.find(
        (product) => product.id === action.payload.id
      );
      increaseProduct.Quantity += 1;
      localStorage.setItem("selectedProducts",JSON.stringify(state.selectedProducts))
    },
    decreaseQuantity: (state, action) => {
      //action.payload => product From user
      const decreaseProduct = state.selectedProducts.find(
        (product) => product.id === action.payload.id
      );
      decreaseProduct.Quantity -= 1;
      //delete product if quantity = 0
      if (decreaseProduct.Quantity === 0) {
        const newArr = state.selectedProducts.filter(
          (product) => product.id !== action.payload.id
        );
        // const newArr2= state.selectedProductsID.filter(
        //   (productId) => productId !== action.payload.id
        // );
        state.selectedProducts =newArr
        // state.selectedProductsID = newArr2

      }
      localStorage.setItem("selectedProducts",JSON.stringify(state.selectedProducts))
    },

    deleteProduct: (state, action) => {
      //action.payload => product From user
      const newArr = state.selectedProducts.filter(
        (product) => product.id !== action.payload.id
      );
      // const newArr2= state.selectedProductsID.filter(
      //   (productId) => productId !== action.payload.id
      // );
      state.selectedProducts =newArr
      // state.selectedProductsID = newArr2
      // deletedProduct
      localStorage.setItem("selectedProducts",JSON.stringify(state.selectedProducts))
    },
  },
});

export const { addToCart, increaseQuantity, decreaseQuantity, deleteProduct } =
  counterSlice.actions;

export default counterSlice.reducer;
