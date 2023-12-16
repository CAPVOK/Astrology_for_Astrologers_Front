import "./App.css";
import { HashRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { AppRoutes } from "./Routes";
import { store } from "./core/store";

function App() {
  return (
    <HashRouter>
      <Provider store={store}>
        <AppRoutes />
      </Provider>
    </HashRouter>
  );
}

export default App;
