/* eslint-disable @typescript-eslint/no-explicit-any */
import "./App.css";
import { HashRouter } from "react-router-dom";
import { AppRoutes } from "./Routes";
import { useGlobalProps } from "./hooks/useGlobalProps";
import { useEffect } from "react";
import { invoke } from "@tauri-apps/api";

function App() {
  const globalProps = useGlobalProps();

  useEffect(() => {
    // Create a new Tauri window
    invoke("tauri", { cmd: "create" })
      .then((response: any) => console.log(response))
      .catch((error: any) => console.error(error));

    return () => {
      // Optionally, close the Tauri window when the component unmounts
      invoke("tauri", { cmd: "close" })
        .then((response: any) => console.log(response))
        .catch((error: any) => console.error(error));
    };
  }, []);

  return (
    <HashRouter>
      <AppRoutes {...globalProps} />
    </HashRouter>
  );
}

export default App;
