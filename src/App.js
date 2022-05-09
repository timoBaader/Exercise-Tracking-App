import "./App.css";
import TabApp from "./components/TabApp";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

function App() {
  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <TabApp></TabApp>
      </LocalizationProvider>
    </>
  );
}

export default App;
