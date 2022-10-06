import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addActiveProduct } from "../redux/activeProductSlice";
import { addToCart } from "../redux/cartSlice";

function ProductPage() {
  const cart = useSelector((state) => state.cart.cartProducts);
  const activeProduct = useSelector((state) => state.activeProduct.product);
  const activeCurrency = useSelector((state) => state.activeCurrency.currency);
  const [desc, setDesc] = useState();
  const [activePhoto, setActivePhoto] = useState();
  const [activeIndex, setActiveIndex] = useState(0);
  const dispatch = useDispatch();
  let priceNow;

  const nextPhoto = () => {
    if (activeIndex < activeProduct.gallery.length) {
      const num = activeIndex + 1;
      setActiveIndex(num);
      setActivePhoto(activeProduct.gallery[num]);
      console.log(activeIndex);
    } else {
      setActiveIndex(0);
      setActivePhoto(activeProduct.gallery[0]);
    }
  };

  const prevPhoto = () => {
    if (activeIndex > 0) {
      const num = activeIndex - 1;
      setActiveIndex(num);
      setActivePhoto(activeProduct.gallery[num]);
    } else {
      const num = activeProduct.gallery.length - 1;
      setActiveIndex(num);
      setActivePhoto(activeProduct.gallery[num]);
    }
  };

  if (activeProduct != null) {
    return (
      <div className="Container">
        <div className="ProductPage">
          <div className="photoGallery">
            {activeProduct.gallery.map((image, index) => {
              return (
                <img
                  key={index}
                  src={image}
                  onClick={() => {
                    setActivePhoto(image);
                    setActiveIndex(index);
                  }}
                ></img>
              );
            })}
          </div>

          <div className="photoDisplay">
            <img
              src={activePhoto ? activePhoto : activeProduct.gallery[0]}
            ></img>
            <div className="navigation">
              <a onClick={prevPhoto} className="arrow">
                <i class="fa-solid fa-chevron-left"></i>
              </a>
              <a onClick={nextPhoto} className="arrow">
                <i class="fa-solid fa-chevron-right"></i>
              </a>
            </div>
          </div>

          <div className="productInfo">
            <h1 className="prodPageBrand">{activeProduct.brand}</h1>
            <h1 className="prodPageName">{activeProduct.name}</h1>
            <h1 className="prodPagePrice">SIZE:</h1>
            <div className="sizes">
              <div className="sizeBox">XS</div>
              <div className="sizeBox">S</div>
              <div className="sizeBox">M</div>
              <div className="sizeBox">L</div>
            </div>
            <h1 className="prodPagePrice">COLOR:</h1>
            <div className="colors">
              <div className="colorBox"></div>
              <div className="colorBox"></div>
              <div className="colorBox"></div>
            </div>
            <h1 className="prodPagePrice">PRICE:</h1>
            <h1 className="prodPageAmount">
              {activeCurrency}
              {activeProduct.prices.filter((price) => {
                if (price.currency.symbol === activeCurrency) {
                  priceNow = price.amount;
                }
              })}
              {priceNow}
            </h1>
            <button
              className="prodPageBtn"
              onClick={() => {
                dispatch(addToCart(activeProduct));
              }}
            >
              ADD TO CART
            </button>
            <div dangerouslySetInnerHTML={{__html: activeProduct.description}} id="textBox"></div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProductPage;
