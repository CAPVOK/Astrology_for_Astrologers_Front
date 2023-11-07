import { RouteObject, useRoutes } from "react-router-dom";
import {
  BasketPage,
  MainPage,
  NotFoundPage,
  PlanetPage,
} from "./pages";

export const AppRoutes = () => {
  /* const routes: RouteObject[] = [
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
  ]; */

  const routes: RouteObject[] = [
    {
      path: "/",
      index: true,
      element: <MainPage />,
    },
    {
      path: "/planet/:id",
      element: <PlanetPage />,
    },
    {
      path: "/basket",
      element: <BasketPage />,
    },
    {
      path: "*",
      element: <NotFoundPage />,
    },
  ];
  
  const routeResult = useRoutes(routes);

  return <>{routeResult}</>;
};
