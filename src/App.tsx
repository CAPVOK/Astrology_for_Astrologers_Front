import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { AppRoutes } from "./Routes";
import { store } from "./core/store";
import { useEffect } from "react";
import { getConstellations } from "./core/api/constellations";
import { saveAuth } from "./core/store/slices/userSlice";

function App() {
  useEffect(() => {
    getConstellations().then(() => {
      store.dispatch(saveAuth(true));
    });
  }, []);
  return (
    <BrowserRouter>
      <Provider store={store}>
        <AppRoutes />
      </Provider>
    </BrowserRouter>
  );
}

export default App;
