
import { DetailsThumb } from "./DetailsThumb";
import "./productDetails.css";
import { useGetoneproductsByNameQuery } from "../../Redux/productsApi";
import React, { useRef } from "react";
import { useParams } from "react-router-dom";
import { Remove, Add } from "@mui/icons-material";
import {  styled, Badge, Button, IconButton, Box, CircularProgress } from "@mui/material";
import { decreaseQuantity, increaseQuantity, addToCart } from "Redux/cartSlice";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#1976d2",
    color: "white",
  },
}));

export default function OneProduct() {
  let userId = useParams();
  const { data, error, isLoading } = useGetoneproductsByNameQuery(
    Number(userId.productId)
  );
  const { selectedProducts } = useSelector(
    // @ts-ignore
    (state) => state.carttt
  );
  const dispatch = useDispatch();
  const [index, setIndex] = useState(0);

  const Quantity = (id) => {
    const clickedProduct = selectedProducts.find((product) => {
      return product.id === id;
    });
    if (clickedProduct) {
      return clickedProduct.Quantity
    }
    return;
  };

  const myRef = useRef(null);
  const handleTab = (index) => {
    setIndex(index);
    const images = myRef.current.children;
    for (let i = 0; i < images.length; i++) {
      images[i].className = images[i].className.replace("active", "");
    }
    images[index].className = "active";
  };


  if (error) {
    return <Box>error...............</Box>;
  }
  if (isLoading) {
    return (
      <Box sx={{ display: "flex" }}>
        <CircularProgress />
      </Box>
    );
  }
  if (data) {
    const { id, description, imageLink, price, productname } = data;

    return (
      <div className="app details-page">
        <div className="details" key={id}>
          <div className="big-img">
            <img src={imageLink[index]} alt="" />
          </div>

          <div className="box">
            <div className="row">
              <h2>{productname}</h2>
              <span>${price}</span>
            </div>
            {/* <Colors colors={item.colors} /> */}

            <p>{description}</p>

            <DetailsThumb images={imageLink} tab={handleTab} myRef={myRef} />
       

       {/* add to cart Button */}


            {selectedProducts.find((product) => product.id === id) ? (
            <div style={{ display: "flex", alignItems: "center" }}>
              <IconButton
                onClick={() => {
                  dispatch(decreaseQuantity(data));
                }}
                sx={{ color: "#1976d2" }}
              >
                <Remove />
              </IconButton>
              <StyledBadge badgeContent={Quantity(id)} color="secondary" />
              <IconButton
                onClick={() => {
                  dispatch(increaseQuantity(data));
                }}
                sx={{ color: "#1976d2" }}
              >
                <Add />
              </IconButton>
            </div>
          ) : (
            <Button
              onClick={() => {
                dispatch(addToCart(data));
              }}
              sx={{
                textTransform: "capitalize",
                lineHeight: 1,
              }}
              variant="contained"
              color="primary"
            >
              <ShoppingCartIcon/>
              Add to Cart
            </Button>
          )}









          </div>
        </div>
      </div>
    );
  }
}
