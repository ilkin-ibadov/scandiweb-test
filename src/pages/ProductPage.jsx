import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";

function ProductPage() {
  const activeProduct = useSelector((state) => state.activeProduct.product);
  const activeCurrency = useSelector((state) => state.activeCurrency.currency);
  const [activePhoto, setActivePhoto] = useState();
  const [activeIndex, setActiveIndex] = useState(0);
  const dispatch = useDispatch();
  let priceNow;

  const nextPhoto = () => {
    if (activeIndex < activeProduct.gallery.length) {
      const num = activeIndex + 1;
      setActiveIndex(num);
      setActivePhoto(activeProduct.gallery[num]);
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
                <i className="fa-solid fa-chevron-left"></i>
              </a>
              <a onClick={nextPhoto} className="arrow">
                <i className="fa-solid fa-chevron-right"></i>
              </a>
            </div>
          </div>

          <div className="productInfo">
            <h1 className="prodPageBrand">{activeProduct.brand}</h1>
            <h1 className="prodPageName">{activeProduct.name}</h1>
            {activeProduct.attributes.map((attribute, index) => {
              if (
                attribute.name !== "Color"
              ) {
                return (
                  <div key={index}>
                    <h1 className="prodPagePrice">{attribute.name}</h1>
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
                    <h1 className="prodPagePrice">{attribute.name}</h1>
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
            <div
              dangerouslySetInnerHTML={{ __html: activeProduct.description }}
              id="textBox"
            ></div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProductPage;
