import "./Home.css";
import React from "react";
import {
  Typography,
  useTheme,
  Stack,
  Button,
  IconButton,
  Badge,
  styled,
} from "@mui/material";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import {
  useGetproductsByNameQuery,
} from "../../Redux/productsApi";
import { useSelector, useDispatch } from "react-redux";
import { addToCart, decreaseQuantity, increaseQuantity } from "Redux/cartSlice";
import { Add, Remove } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#1976d2",
    color: "white",
  },
}));
const Home = () => {
  const theme = useTheme();
  const { data, error, isLoading } = useGetproductsByNameQuery();
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { selectedProducts } = useSelector(
    // @ts-ignore
    (state) => state.carttt
  );
  //quantity
  const productQuantity = (id) => {
    const myProduct = selectedProducts.find((product) => {
      return product.id === id;
    });
    return myProduct.Quantity;
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
    return (
      <Stack
        direction="row"
        sx={{ flexWrap: "wrap", justifyContent: "center" }}
      >
        {data.map((item, index) => {
          const { id, description, imageLink, price } = item;

          return (
            <Card
            
              key={id}
              sx={{ maxWidth: 277, mx: 2, mb: 6 }}
              className="productCard"
            >
              <CardMedia
              onClick={()=>{
                navigate(`oneproduct/${id}`)
              }}
                component="img"
                height="194"
                image={imageLink[0]}
                alt="Paella dish"
              />
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  {description}
                </Typography>
              </CardContent>
              <CardActions
                sx={{ justifyContent: "space-between" }}
                disableSpacing
              >
                {/* {selectedProductsID.includes(id) ? */}
                
                {selectedProducts.find(product=>product.id === id)?
                 (
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <IconButton
                      onClick={() => {
                        dispatch(decreaseQuantity(item));
                      }}
                      sx={{ color: "#1976d2" }}
                    >
                      <Remove />
                    </IconButton>
                    <StyledBadge
                      badgeContent={productQuantity(id)}
                      color="secondary"
                    />
                    <IconButton
                      onClick={() => {
                        dispatch(increaseQuantity(item));
                      }}
                      sx={{ color: "#1976d2" }}
                    >
                      <Add />
                    </IconButton>
                  </div>
                ) : (
                  <Button
                    onClick={() => {
                      dispatch(addToCart(item));
                    }}
                    sx={{
                      textTransform: "capitalize",
                      lineHeight: 1,
                    }}
                    variant="contained"
                    color="primary"
                  >
                    Add to Cart
                  </Button>
                )}

                <Typography
                  sx={{ mr: 1 }}
                  variant="body1"
                  color={theme.palette.error.main}
                >
                  $ {Number(price)}
                </Typography>
              </CardActions>
            </Card>
          );
        })}
      </Stack>
    );
  }
};

export default Home;
