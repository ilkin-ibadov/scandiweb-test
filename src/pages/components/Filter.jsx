import React from "react";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

function Filter({ products }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filterProperties, setFilterProperties] = useState({
    filter: "",
    value: "",
  });
  const attributes = [];
  const [isActive, setIsActive] = useState({ state: false, id: "" });
  let unique;
  products.map((product) => {
    product.attributes.map((attribute) => {
      attributes.push(attribute);
    });
  });
  if (attributes.length > 0) {
    unique = [...new Set(attributes)];
  }
  

  return (
    <div className="filterContainer">
      {unique?.map((attribute, index) => {
        return (
          <div
            className="filterName"
            key={index}
            onClick={() => {
              setIsActive({ state: !isActive.state, id: attribute.id });
              setFilterProperties((filterProperties) => ({
                ...filterProperties,
                filter: attribute.name,
              }));
            }}
          >
            <h3>{attribute.name}</h3>

            <div className="valueBox">
              {attribute.items.map((item, index) => {
                if (isActive.id === attribute.id && isActive.state === true) {
                  if (attribute.type === "text") {
                    return (
                      <div
                        onMouseDown={() => {
                          setFilterProperties((filterProperties) => ({
                            ...filterProperties,
                            value: item.value,
                          }));
                        }}
                        onMouseUp={() => {
                          setSearchParams(filterProperties)
                        }}
                        className={"filterValue"}
                        key={index}
                      >
                        {item.value}
                      </div>
                    );
                  } else if (attribute.type === "swatch") {
                    return (
                      <div
                        key={index}
                        style={{ backgroundColor: `${item.value}` }}
                        onMouseDown={() => {
                          setFilterProperties((filterProperties) => ({
                            ...filterProperties,
                            value: item.value,
                          }));
                        }}
                        onMouseUp={() => {
                          setSearchParams(filterProperties)
                        }}
                        className="filterValueColor"
                      ></div>
                    );
                  }
                }
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Filter;
