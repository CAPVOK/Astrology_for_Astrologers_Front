import { RouteObject, useRoutes } from "react-router-dom";
import {
  AboutPage,
  AuthPage,
  BasketPage,
  MainPage,
  NotFoundPage,
  PlanetPage,
} from "./pages";
import { PrivatePages } from "./components";

export const AppRoutes = () => {
  const routes: RouteObject[] = [
    {
      path: "/",
      element: <PrivatePages />,
      children: [
        {
          path: "",
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
        {
          path: "about",
          element: <AboutPage />,
        },
      ],
    },
    {
      path: "/auth",
      element: <AuthPage />,
    },
    {
      path: "*",
      element: <NotFoundPage />,
    },
  ];

  const routeResult = useRoutes(routes);

  return <>{routeResult}</>;
};
