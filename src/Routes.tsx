import { RouteObject, useRoutes } from "react-router-dom";
import {
  AboutPage,
  BasketPage,
  MainPage,
  NotFoundPage,
  PlanetPage,
} from "./pages";
import { IGlobalProps } from "./App.typing";

export const AppRoutes = (props: IGlobalProps) => {
  const routes: RouteObject[] = [
    {
      path: "/",
      index: true,
      element: <MainPage {...props} />,
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
      path: "/about",
      element: <AboutPage />,
    },
    {
      path: "*",
      element: <NotFoundPage />,
    },
  ];

  const routeResult = useRoutes(routes);

  return <>{routeResult}</>;
};
