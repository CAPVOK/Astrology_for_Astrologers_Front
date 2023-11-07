import { RouteObject, useRoutes } from "react-router-dom";
import {
  AuthPage,
  BasketPage,
  MainPage,
  NotFoundPage,
  PlanetPage,
} from "./pages";
import { PrivatePages } from "./components";
import { IGlobalProps } from "./App.typing";

export const AppRoutes = (props: IGlobalProps) => {
  const routes: RouteObject[] = [
    {
      path: "/",
      element: <PrivatePages {...props} />,
      children: [
        {
          path: "",
          index: true,
          element: <MainPage />,
        },
        {
          path: "planet/:id",
          element: <PlanetPage />,
        },
        {
          path: "basket",
          element: <BasketPage />,
        },
      ],
    },
    {
      path: "/auth",
      element: <AuthPage {...props} />,
    },
    {
      path: "*",
      element: <NotFoundPage />,
    },
  ];
  const routeResult = useRoutes(routes);

  return <>{routeResult}</>;
};
