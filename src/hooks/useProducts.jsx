import React from "react";
import { useQuery, gql, from } from "@apollo/client";

const GET_PRODUCTS = gql`
  query {
    category {
      products {
        gallery
        name
        brand
        description
        category
        prices {
          currency {
            label
            symbol
          }
          amount
        }
        id
        inStock
        attributes {
          id
          name
          type
          items {
            displayValue
            value
            id
          }
        }
      }
    }
  }
`;

export const useProducts = () => {
  const { error, loading, data } = useQuery(GET_PRODUCTS);
  return { error, loading, data };
};
