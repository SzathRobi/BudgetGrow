import { useReducer, useContext, createContext, useState } from "react";

const BudgetContext = createContext();
const initialState = {
  hobo: "loco",
};

export const BudgetProvider = ({ children }) => {
  //const [state, setState] = useState(initialState)
  return <BudgetContext.Provider>{children}</BudgetContext.Provider>;
};

export const useBudget = () => useContext(BudgetContext);
