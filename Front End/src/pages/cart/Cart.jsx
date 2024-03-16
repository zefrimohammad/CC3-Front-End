import {
  Box,
  Paper,
  Button,
  styled,
  IconButton,
  Badge,
  Typography,
  Divider,
  Stack,
} from "@mui/material";
import "./Cart.css";
import React from "react";
import { Add, Delete, Remove } from "@mui/icons-material";
import { useSelector, useDispatch } from "react-redux";
import {
  decreaseQuantity,
  deleteProduct,
  increaseQuantity,
} from "Redux/cartSlice";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#1976d2",
    color: "white",
  },
}));
export default function MyCart() {
  // @ts-ignore
  const { selectedProducts } = useSelector((state) => state.carttt);
  const dispatch = useDispatch();
  let totalPrice = 0;
  return (
    <Box>
      {selectedProducts.map((item) => {
        totalPrice += item.price * item.Quantity;
        return (
          <Paper key={item.id} dir="rtl" className="item-container">
            <div className="img-title-parent">
              <img src={item.imageLink[0]} alt="" />
              <p className="product-name">{item.productName}</p>
            </div>

            <div style={{ display: "flex", alignItems: "center" }}>
              <IconButton
                onClick={() => {
                  dispatch(increaseQuantity(item));
                }}
                sx={{ color: "#1976d2" }}
              >
                <Add />
              </IconButton>
              <StyledBadge badgeContent={item.Quantity} color="secondary" />
              <IconButton
                onClick={() => {
                  dispatch(decreaseQuantity(item));
                }}
                sx={{ color: "#1976d2" }}
              >
                <Remove />
              </IconButton>
            </div>

            <div className="price">$ {item.price * item.Quantity}</div>
            {}
            <Button
              onClick={() => {
                dispatch(deleteProduct(item));
              }}
              sx={{ display: { xs: "none", md: "inline-flex" } }}
              variant="contained"
              className="btn btn-secondary"
            >
              delete
            </Button>
            <IconButton
              onClick={() => {
                dispatch(deleteProduct(item));
              }}
              sx={{ display: { xs: "inline-flex", md: "none" } }}
            >
              <Delete color="error" />
            </IconButton>
          </Paper>
        );
      })}
      <Paper sx={{ width: "200px", mx: "auto" }}>
        <Typography sx={{ py: 2, textAlign: "center" }} variant="h5">
          card summery
        </Typography>
        <Divider />
        <Stack
          direction="row"
          sx={{ justifyContent: "space-between", py: 2, px: 1 }}
        >
          <Typography variant="body1">subTotal</Typography>
          <Typography variant="body1">${totalPrice}</Typography>
        </Stack>
        <Button fullWidth variant="contained">
          checkout
        </Button>
      </Paper>
    </Box>
  );
}
