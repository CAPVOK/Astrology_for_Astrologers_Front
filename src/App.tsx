import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./Routes";
import { useGlobalProps } from "./hooks/useGlobalProps";

function App() {

  const globalProps = useGlobalProps();

  return (
    <BrowserRouter>
      <AppRoutes {...globalProps} />
    </BrowserRouter>
  );
}

export default App;
