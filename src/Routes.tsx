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
          element: <MainPage {...props}/>,
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

  /* const routes: RouteObject[] = [
    {
      path: "/",
      index: true,
      element: (
        <PrivatePage {...props}>
          <MainPage {...props}/>
        </PrivatePage>
      ),
    },
    {
      path: "/planet/:id",
      element: (
        <PrivatePage {...props}>
          <PlanetPage />
        </PrivatePage>
      ),
    },
    {
      path: "/basket",
      element: (
        <PrivatePage {...props}>
          <BasketPage />
        </PrivatePage>
      ),
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

  const routeResult = useRoutes(routes);

  return <>{routeResult}</>;
};
