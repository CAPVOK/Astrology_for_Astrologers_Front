import "./App.css";
import { AppRoutes } from "./Routes";
import { useDispatch } from "./core/store";
import { saveUser } from "./core/store/slices/userSlice";
import { USER_NAME, USER_ROLE } from "./env";

function App() {
  const dispatch = useDispatch();
  const userName = localStorage.getItem(USER_NAME);
  const userRole = localStorage.getItem(USER_ROLE);
  const isAuth = !!userName && !!userRole;
  dispatch(
    saveUser({
      userName: userName || "",
      isAuth: isAuth,
      role: userRole || "",
      constellationId: 0,
    })
  );
  console.log("app rendered");

  return <AppRoutes />;
}

export default App;
