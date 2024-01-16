import { RouteObject, useRoutes } from "react-router-dom";
import {
  AuthPage,
  ConstellationPage,
  CreatePlanetPage,
  HistoryPage,
  MainPage,
  NotFoundPage,
  PlanetPage,
} from "./pages";
import { PrivatePages, MainLayout } from "./components";

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
            {
              path: "/create/planet",
              element: <CreatePlanetPage />,
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
