// "use client";
const { createContext, useContext, useState } = require("react");

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  // const token = "";

  const [token, setToken] = useState("");

  const setAuthToken = (newToken) => {
    setToken(newToken);
  };

  return (
    <AuthContext.Provider value={{ token, setAuthToken }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuthContext = () => {
  // consumer nu work useContext kare
  // return useContext(AuthContext);
  // this will return the context object

  const context = useContext(AuthContext);
  if (!context) {
    return new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
};

export { AuthContext, AuthProvider, useAuthContext };
