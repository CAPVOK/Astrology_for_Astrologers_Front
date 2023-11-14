import "./App.css";
import {  HashRouter } from "react-router-dom";
import { AppRoutes } from "./Routes";
import { useGlobalProps } from "./hooks/useGlobalProps";

function App() {

  const globalProps = useGlobalProps();

  return (
    <HashRouter>
      <AppRoutes {...globalProps} />
    </HashRouter>
  );
}

export default App;
