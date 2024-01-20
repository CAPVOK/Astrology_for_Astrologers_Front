import { RouteObject, useRoutes } from "react-router-dom";
import {
  AboutPage,
  AuthPage,
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
          element: <MainPage {...props} />,
        },
        {
          path: "planet/:id",
          element: <PlanetPage />,
        },
        /* {
          path: "basket",
          element: <BasketPage />,
        }, */
        {
          path: "about",
          element: <AboutPage />,
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
