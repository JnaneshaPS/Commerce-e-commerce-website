import React from "react";
import { Container, Typography, Grid, Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import useStyles from "./style";
import Cartitem from "./Cartitem/Cartitem";
const Cart = ({
  cart,
  handleUpdateCartQty,
  handleRemoveCart,
  handleEmptyCart
}) => {
  const classes = useStyles();
  const isEmpty = !cart || !cart.line_items || cart.line_items.length === 0;

  const EmptyCart = () => (
    <Typography variant="subtitle2">
      please add prodect to the cart
      <Link to="/" className={classes.link}>
        Start adding some items
      </Link>
    </Typography>
  );

  const FilledCart = () => (
    <>
      <Grid container spacing={3}>
        {cart.line_items.map((item) => (
          <Grid item xs={12} sm={4} key={item.id}>
            <Cartitem
              item={item}
              handleUpdateCartQty={handleUpdateCartQty}
              handleRemoveCart={handleRemoveCart}
            />
          </Grid>
        ))}
      </Grid>
      <div className={classes.cardDetails}>
        <Typography variant="h5">
          Subtotal:{cart.subtotal.formatted_with_symbol}
        </Typography>
        <div>
          <Button
            className={classes.emptyButton}
            variant="contained"
            type="button"
            size="large"
            color="secondary"
            onClick={handleEmptyCart}
          >
            Empty Cart
          </Button>
          <Button
            component={Link}
            to="/checkout"
            className={classes.checkoutButton}
            variant="contained"
            type="button"
            size="large"
            color="primary"
          >
            CheckOut
          </Button>
        </div>
      </div>
    </>
  );

  if (!cart || !cart.line_items) return "Loading";

  return (
    <Container>
      <div className={classes.toolbar} />

      <Typography className={classes.title} variant="h4" gutterBottom>
        Your Shopping Cart
      </Typography>
      {isEmpty ? <EmptyCart /> : <FilledCart />}
    </Container>
  );
};
export default Cart;
