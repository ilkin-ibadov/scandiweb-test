import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toggleMiniCart } from "../redux/toggleMiniCartSlice";
import {
  increaseQuantity,
  decreaseQuantity,
  removeItem,
} from "../redux/cartSlice";

export default function Cart() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cartProducts);
  const activeCurrency = useSelector((state) => state.activeCurrency.currency);
  const quantity = cart.reduce((total, { quantity }) => total + quantity, 0);
  const miniCartState = useSelector((state) => state.miniCartState.class);
  const navigate = useNavigate();
  let CartProductsMinicart = "";
  let cartTxtMinicart = "";
  let cardProductMinicart = "";
  let minicartMyBag = "";
  let minicartHide = "";
  let emptyCartMinicart = "";

  let priceNow;

  if (cart.length) {
    const totalPrice = [];
    let amount;
    let sumWPrice;

    if (miniCartState === "active") {
      cartTxtMinicart = "cartTxtMinicart";
      cardProductMinicart = "cardProductMinicart";
      CartProductsMinicart = "CartProductsMinicart";
      minicartMyBag = "minicartMyBag";
      minicartHide = "minicartHide";
      emptyCartMinicart = "emptyCartMinicart";
    } else if (miniCartState === "") {
      cartTxtMinicart = "";
      cardProductMinicart = "";
      CartProductsMinicart = "";
      minicartMyBag = "";
      minicartHide = "";
      emptyCartMinicart = "";
    }

    return (
      <>
        <div className={`CartProducts ${CartProductsMinicart}`}>
          <h1 className={`cartTxt ${cartTxtMinicart}`}>CART</h1>
          <div className="minicartMyBag">
            <h2>My Bag,</h2>
            <span>{quantity} Items</span>
          </div>
          {cart.map((product, index) => {
            return (
              <div key={index} className={`cartProduct ${cardProductMinicart}`}>
                <div className="left">
                  <h2>{product.brand}</h2>
                  <h2>{product.name}</h2>
                  <h2>
                    {activeCurrency}

                    {product.prices.filter((price) => {
                      if (price.currency.symbol === activeCurrency) {
                        amount = price.amount;
                        priceNow = price.amount * product.quantity;
                        totalPrice.push(Math.round(priceNow));
                        sumWPrice = totalPrice.reduce(function (a, b) {
                          return a + b;
                        }, 0);
                      }
                    })}

                    {amount}
                  </h2>
                  {product.attributes.map((attribute, index) => {
                    if (
                      attribute.name !== "Color"
                    ) {
                      return (
                        <div key={index}>
                          <h2 className="prodPagePrice">{attribute.name}</h2>
                          <div className="sizes">
                            {attribute.items.map((item, index) => {
                              return <div key={index} className="sizeBox">{item.value}</div>;
                            })}
                          </div>
                        </div>
                      );
                    } else {
                      return (
                        <div key={index}>
                          <h2 className="prodPagePrice">{attribute.name}</h2>
                          <div className="colors">
                            {attribute.items.map((item, index) => {
                              return (
                                <div
                                  key={index}
                                  style={{ backgroundColor: `${item.value}` }}
                                  className="colorBox"
                                ></div>
                              );
                            })}
                          </div>
                        </div>
                      );
                    }
                  })}
                </div>
                <div className="right">
                  <div className="productCount">
                    <div
                      onClick={() => {
                        dispatch(increaseQuantity(product));
                      }}
                      className="increment"
                    >
                      +
                    </div>
                    <div className="amount">{product.quantity}</div>
                    <div
                      onClick={() => {
                        product.quantity === 1
                          ? dispatch(removeItem(product))
                          : dispatch(decreaseQuantity(product));
                      }}
                      className="decrement"
                    >
                      -
                    </div>
                  </div>
                  <div className="imagePlaceholder">
                    <img src={product.gallery[0]} alt="" />
                  </div>
                </div>
              </div>
            );
          })}
          <div className={`order ${minicartHide}`}>
            <h2>
              <span>Tax 21%:</span> {activeCurrency}
              {Math.round((sumWPrice * 21) / 100)}
            </h2>
            <h2>
              <span>Quantity:</span> {quantity}
            </h2>
            <h2>
              <span>Total:</span> {activeCurrency}
              {sumWPrice}
            </h2>
            <button>Order</button>
          </div>
          <div className="minicartControls">
            <div className="total">
              <h2>Total</h2>
              <h2>
                {activeCurrency}
                {sumWPrice}
              </h2>
            </div>
            <div className="minicartBtn">
              <button
                onClick={() => {
                  dispatch(toggleMiniCart(""));
                  navigate("/cart");
                }}
              >
                VIEW BAG
              </button>
              <button>CHECK OUT</button>
            </div>
          </div>
        </div>
      </>
    );
  } else {
    if (miniCartState === "active") {
      cartTxtMinicart = "cartTxtMinicart";
      cardProductMinicart = "cardProductMinicart";
      CartProductsMinicart = "CartProductsMinicart";
      minicartMyBag = "minicartMyBag";
      minicartHide = "minicartHide";
      emptyCartMinicart = "emptyCartMinicart";
    } else if (miniCartState === "") {
      cartTxtMinicart = "";
      cardProductMinicart = "";
      CartProductsMinicart = "";
      minicartMyBag = "";
      minicartHide = "";
      emptyCartMinicart = "";
    }
    return (
      <>
        <div className={`emptyCart ${emptyCartMinicart}`}>
          <div className="minicartMyBag">
            <h2>My Bag,</h2>
            <span>{quantity} Items</span>
          </div>
          <h1 className={`cartTxt ${cartTxtMinicart}`}>CART</h1>
          <div className="status">
            <h3>Your cart is empty</h3>
          </div>
        </div>
      </>
    );
  }
}
