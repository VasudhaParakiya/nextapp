import { createContext, useContext, useEffect, useReducer } from "react";


const AuthContext = createContext();

const initialState = {
  product: [],
};

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const getProducts = () => {};

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <AuthContext.Provider value={{ ...state }}>{children}</AuthContext.Provider>
  );
};

const useAuthContext = () => {
  // consumer nu work useContext kare
  return useContext(AppContext);
  // this will return the context object
};

export { AuthProvider, AuthContext, useAuthContext };
