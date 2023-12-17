import { RouteObject, useRoutes } from "react-router-dom";
import {
  AboutPage,
  AuthPage,
  ConstellationPage,
  MainPage,
  NotFoundPage,
  PlanetPage,
} from "./pages";
import { PrivatePages } from "./components";

export const AppRoutes = () => {
  const routes: RouteObject[] = [
    {
      element: <PrivatePages />,
      children: [
        {
          path: "/constellation",
          element: <ConstellationPage />,
        },
      ],
    },
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
      path: "/about",
      element: <AboutPage />,
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
