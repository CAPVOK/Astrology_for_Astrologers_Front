import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { AppRoutes } from "./Routes";
import { store } from "./core/store";

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <AppRoutes />
      </Provider>
    </BrowserRouter>
  );
}

export default App;
