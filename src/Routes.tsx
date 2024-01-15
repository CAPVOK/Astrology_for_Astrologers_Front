import { RouteObject, useRoutes } from "react-router-dom";
import {
  AuthPage,
  ConstellationPage,
  HistoryPage,
  MainPage,
  NotFoundPage,
  PlanetPage,
} from "./pages";
import { PrivatePages } from "./components";
import { MainLayout } from "./components/MainLayout";

export const AppRoutes = () => {
  const routes: RouteObject[] = [
    {
      element: <MainLayout />,
      children: [
        {
          element: <PrivatePages />,
          children: [
            {
              path: "/constellations",
              element: <HistoryPage />,
            },
            {
              path: "/constellations/:id",
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
        /* {
          path: "/about",
          element: <AboutPage />,
        }, */
        {
          path: "/auth",
          element: <AuthPage />,
        },
        {
          path: "*",
          element: <NotFoundPage />,
        },
      ],
    },
  ];

  const routeResult = useRoutes(routes);

  return <>{routeResult}</>;
};
