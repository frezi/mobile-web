import { lazy } from "react";
interface IrouteConfig {
  url: string;
  path: string;
  title: string;
  component?: any;
}
export const routeConfig: IrouteConfig[] = [
  {
    url: "Home",
    path: "/",
    title: "้ฆ้กต"
  },
  {
    url: "Mine",
    path: "/Mine",
    title: "ๆ็"
  }
];
let routes: any = routeConfig.map((item: IrouteConfig) => {
  let route = { ...item };
  route.component = lazy(() => import(`../pages/${item.url}`));

  return route;
});

export default routes;
