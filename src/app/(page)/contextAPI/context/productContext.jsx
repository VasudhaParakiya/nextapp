import { createContext, useContext, useEffect, useReducer } from "react";
re;
import reducer from "../reducer/productReducer";

const AppContext = createContext();

const initialState = {
  product: [],
};

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const getProducts = () => {};

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <AppContext.Provider value={{ ...state }}>{children}</AppContext.Provider>
  );
};

const useProductContext = () => {
  // consumer nu work useContext kare
  return useContext(AppContext);
  // this will return the context object
};

export { AppProvider, AppContext, useProductContext };
