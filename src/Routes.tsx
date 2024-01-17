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
import { ROUTES } from "./App.constants";

export const AppRoutes = () => {
  const routes: RouteObject[] = [
    {
      element: <MainLayout />,
      children: [
        {
          element: <PrivatePages />,
          children: [
            {
              path: ROUTES.CONSTELLATIONS,
              element: <HistoryPage />,
            },
            {
              path: `${ROUTES.CONSTELLATIONS}/:id`,
              element: <ConstellationPage />,
            },
            {
              path: ROUTES.CREATE_PLANET,
              element: <CreatePlanetPage />,
            },
          ],
        },
        {
          path: ROUTES.HOME,
          index: true,
          element: <MainPage />,
        },
        {
          path: `${ROUTES.PLANET}/:id`,
          element: <PlanetPage />,
        },
        /* {
          path: "/about",
          element: <AboutPage />,
        }, */
        {
          path: ROUTES.AUTH,
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
