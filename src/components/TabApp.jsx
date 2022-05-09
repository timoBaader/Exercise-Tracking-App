import React, { useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import CustomerList from "./CustomerList";
import TrainingList from "./TrainingList";

function TabApp() {
  const [value, setValue] = useState("one");
  const handleChange = (event, value) => {
    setValue(value);
  };

  return (
    <div>
      <Tabs value={value} onChange={handleChange}>
        <Tab value="one" label="Customers" />
        <Tab value="two" label="Trainings" />
      </Tabs>
      {value === "one" && (
        <div>
          <CustomerList></CustomerList>
        </div>
      )}
      {value === "two" && (
        <div>
          <TrainingList></TrainingList>
        </div>
      )}
    </div>
  );
}

export default TabApp;
