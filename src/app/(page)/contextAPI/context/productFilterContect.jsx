import { createContext, useContext, useEffect, useReducer } from "react";
import reducer from "../reducer/productFilterReducer";

const FilterContext = createContext();

const initialState = {
  filters: {
    searchText: "",
  },
};

const FilterProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    dispatch({ type: "FILTER_PRODUCT" });
  }, [state.filters]);

  const updateFilterValue=()=>{
    
  }

  return (
    <FilterContext.Provider value={{ ...state,updateFilterValue }}>
      {children}
    </FilterContext.Provider>
  );
};

const useFilterContext = () => {
  return useContext(AppContext);
};

export { FilterContext, FilterProvider, useFilterContext };
