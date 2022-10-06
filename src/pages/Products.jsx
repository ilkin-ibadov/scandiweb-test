import React, { useState, useEffect } from "react";
import { useProducts } from "../hooks/useProducts";
import ProductPage from "./ProductPage";
import { addActiveProduct } from "../redux/activeProductSlice";
import { addToCart } from "../redux/cartSlice";
import { addActiveCurrency } from "../redux/activeCurrencySlice";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Cart from "./Cart";

export default function Products() {
  const { error, loading, data } = useProducts();
  const cart = useSelector((state) => state.cart.cartProducts);
  const activeCurrency = useSelector((state) => state.activeCurrency.currency);
  const activeCategory = useSelector((state) => state.activeCategory.category);
  const miniCartState = useSelector((state) => state.miniCartState.class);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const categorized = [];
  const getDiv = document.getElementById('root')
  console.log(miniCartState)
  let heightDiv


  // if(getDiv){

  // }
  // const height = heightDiv.offsetHeight
  let priceNow;

  

  if (!loading && activeCategory) {
    data.category.products.filter((product) => {
      if (product.category === activeCategory) {
        categorized.push(product);
      }
    });
  }

  

  if (categorized.length) {
    heightDiv = getDiv.clientHeight
    return (
      <div className="Container">
        <h1 className="activeCategoryText">{activeCategory}</h1>
        <div className="Products">
          {categorized.map((product, index) => {
            if (product.inStock) {
              return (
                <div
                  className="Product"
                  key={index}
                  onClick={() => {
                    dispatch(addActiveProduct(product));
                    navigate("/product");
                  }}
                >
                  <div className="productPhoto">
                    <img src={product.gallery[0]} />
                  </div>
                  <div className="addCart">
                    <i
                      onClick={(e) => {
                        e.stopPropagation();
                        dispatch(addToCart(product));
                      }}
                      class="fa-solid fa-cart-shopping"
                    ></i>
                  </div>
                  <div className="productInfo">
                    <h2>
                      {product.brand} {product.name}
                    </h2>
                    <h3>
                      {activeCurrency}
                      {product.prices.filter((price) => {
                        if (price.currency.symbol === activeCurrency) {
                          priceNow = price.amount;
                        }
                      })}
                      {priceNow}
                    </h3>
                  </div>
                </div>
              );
            } else {
              return (
                <div
                  style={{ opacity: 0.5, pointerEvents: "none" }}
                  className="Product"
                  key={index}
                >
                  <div className="outOfStockImg">
                    <p className="outOfStockTxt">Out of stock</p>
                    <img src={product.gallery[0]} />
                  </div>
                  <div className="addCart">
                    <i class="fa-solid fa-cart-shopping"></i>
                  </div>
                  <div className="productInfo">
                    <h2>
                      {product.brand} {product.name}
                    </h2>
                    <h3>
                      {activeCurrency}
                      {product.prices.filter((price) => {
                        if (price.currency.symbol === activeCurrency) {
                          priceNow = price.amount;
                        }
                      })}
                      {priceNow}
                    </h3>
                  </div>
                </div>
              );
            }
          })}
        </div>
        <div style={{height: heightDiv}} className={`miniCartBg ${miniCartState}`}>
        <div className="miniCart">
          <Cart />
        </div>
      </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error">
        <h1>Something went wrong, please reload the page</h1>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="loading">
        <h1>Loading...</h1>
      </div>
    );
  }

  if (!loading || (!categorized.length && activeCategory === "all")) {
    heightDiv = getDiv.offsetHeight
    return (
      <div className="Container">
        <h1 className="activeCategoryText">{activeCategory || "all"}</h1>
        <div className="Products">
          {data.category.products.map((product, index) => {
            if (product.inStock) {
              return (
                <div
                  className="Product"
                  key={index}
                  onClick={() => {
                    dispatch(addActiveProduct(product));
                    navigate("/product");
                  }}
                >
                  <div className="productPhoto">
                    <img src={product.gallery[0]} />
                  </div>
                  <div className="addCart">
                    <i
                      onClick={(e) => {
                        e.stopPropagation();
                        dispatch(addToCart(product));
                      }}
                      class="fa-solid fa-cart-shopping"
                    ></i>
                  </div>
                  <div className="productInfo">
                    <h2>
                      {product.brand} {product.name}
                    </h2>
                    <h3>
                      {activeCurrency}
                      {product.prices.filter((price) => {
                        if (price.currency.symbol === activeCurrency) {
                          priceNow = price.amount;
                        }
                      })}
                      {priceNow}
                    </h3>
                  </div>
                </div>
              );
            } else {
              return (
                <div
                  style={{ opacity: 0.5, pointerEvents: "none" }}
                  className="Product"
                  key={index}
                >
                  <div className="outOfStockImg">
                    <p className="outOfStockTxt">Out of stock</p>
                    <img src={product.gallery[0]} />
                  </div>
                  <div className="addCart">
                    <i class="fa-solid fa-cart-shopping"></i>
                  </div>
                  <div className="productInfo">
                    <h2>
                      {product.brand} {product.name}
                    </h2>
                    <h3>
                      {activeCurrency}
                      {product.prices.filter((price) => {
                        if (price.currency.symbol === activeCurrency) {
                          priceNow = price.amount;
                        }
                      })}
                      {priceNow}
                    </h3>
                  </div>
                </div>
              );
            }
          })}
        </div>
        <div style={{height: heightDiv}} className={`miniCartBg ${miniCartState}`}>
        <div className="miniCart">
          <Cart />
        </div>
      </div>
      </div>
    );
  }
}
