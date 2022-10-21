import React from "react";
import { useProducts } from "../hooks/useProducts";
import { addActiveProduct } from "../redux/activeProductSlice";
import { addToCart } from "../redux/cartSlice";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Cart from "./Cart";
import { useState, useEffect } from "react";
import Filter from "./components/Filter";

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { error, loading, data } = useProducts();
  const getFilterValue = searchParams.get('value');
  const getFilterName = searchParams.get('filter');
  const [isActive, setIsActive] = useState(false);
  const activeCurrency = useSelector((state) => state.activeCurrency.currency);
  const activeCategory = useSelector((state) => state.activeCategory.category);
  const miniCartState = useSelector((state) => state.miniCartState.class);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const categorized = [];
  let filteredProducts = [];
  let uniqueFilter;

  let filteredByValue = [];
  const getDiv = document.getElementById("root");
  let heightDiv;
  let priceNow;


  if (!loading && activeCategory) {
    data.category.products.filter((product) => {
      if (product.category === activeCategory) {
        categorized.push(product);
      }
    });
  }

  if (categorized.length && getFilterValue && getFilterName) {
    categorized.map((product) => {
      product.attributes.map((attribute) => {
        if (attribute.name === getFilterName) {
          filteredProducts.push(product);
        }
        filteredProducts.map((product) => {
          product.attributes.map((attribute) => {
            attribute.items.map((item) => {
              if (item.value === getFilterValue) {
                filteredByValue.push(product);
              }
            });
          });
        });
      });
    });
  } else if (data && !categorized.length && getFilterValue && getFilterName) {
    data.category.products.map((product) => {
      product.attributes.map((attribute) => {
        if (attribute.name === getFilterName) {
          filteredProducts.push(product);
        }
        filteredProducts.map((product) => {
          product.attributes.map((attribute) => {
            attribute.items.map((item) => {
              if (item.value === getFilterValue) {
                filteredByValue.push(product);
              }
            });
          });
        });
      });
    });
  }

  if (filteredByValue.length > 0) {
    uniqueFilter = [...new Set(filteredByValue)];
  }

  if (getFilterName && getFilterValue) {
    heightDiv = getDiv.clientHeight;
    return (
      <div style={{ display: "flex" }}>
        {isActive && (
          <Filter
            products={categorized.length ? categorized : data.category.products}
          />
        )}
        <div className="Container">
          <div onClick={() => setIsActive(!isActive)} className="filterToggle">
            {isActive ? <i className="fa-solid fa-xmark"></i> : <i className="fa-solid fa-sliders"></i>}
          </div>
          <h1 className="activeCategoryText">{activeCategory}</h1>
          <div className="Products">
            {uniqueFilter?.map((product, index) => {
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
                        className="fa-solid fa-cart-shopping"
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
                      <i className="fa-solid fa-cart-shopping"></i>
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
          <div
            style={{ height: heightDiv }}
            className={`miniCartBg ${miniCartState}`}
          >
            <div className="miniCart">
              <Cart />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!getFilterName && !getFilterValue && categorized.length) {
    heightDiv = getDiv.clientHeight;
    return (
      <div style={{ display: "flex" }}>
        {isActive && <Filter products={categorized} />}
        <div className="Container">
          <div onClick={() => setIsActive(!isActive)} className="filterToggle">
          {isActive ? <i className="fa-solid fa-xmark"></i> : <i className="fa-solid fa-sliders"></i>}
          </div>
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
                        className="fa-solid fa-cart-shopping"
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
                      <i className="fa-solid fa-cart-shopping"></i>
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
          <div
            style={{ height: heightDiv }}
            className={`miniCartBg ${miniCartState}`}
          >
            <div className="miniCart">
              <Cart />
            </div>
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

  if (
    !loading ||
    (categorized.length === 0 &&
      !getFilterValue &&
      !getFilterName &&
      activeCategory === "all")
  ) {
    heightDiv = getDiv.offsetHeight;
    return (
      <div style={{ display: "flex" }}>
        {isActive && <Filter products={data.category.products} />}
        <div className="Container">
          <div onClick={() => setIsActive(!isActive)} className="filterToggle">
          {isActive ? <i className="fa-solid fa-xmark"></i> : <i className="fa-solid fa-sliders"></i>}
          </div>
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
                        className="fa-solid fa-cart-shopping"
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
                      <i className="fa-solid fa-cart-shopping"></i>
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
          <div
            style={{ height: heightDiv }}
            className={`miniCartBg ${miniCartState}`}
          >
            <div className="miniCart">
              <Cart />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
