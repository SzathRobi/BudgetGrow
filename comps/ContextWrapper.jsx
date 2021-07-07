import BudgetContext from "../context/budgetContext";
import { useState } from "react";

function ContextWrapper({ children }) {
  const [navTabs, setNavTabs] = useState(1);

  return (
    <BudgetContext.Provider value={{ navTabs, setNavTabs }}>
      {children}
    </BudgetContext.Provider>
  );
}

export default ContextWrapper;
