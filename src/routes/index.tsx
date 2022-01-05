import React, { Suspense } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import routesConfig from "./routes.config";
import ErrorBoundatry from "@/lib/ErrorBoundary";
import Layout from "@/layouts";
import "moment/locale/zh-cn";
import moment from "moment";
import Loading from "@/components/Loading";
import { setTitle } from "@/tools/ljBridge";

moment.locale("zh-cn");

const SetInfo = function(item: any, props: any) {
  document.title = item.title || "";
  window.scrollTo(0, 0);
  setTitle(item.title);
  return <item.component {...props} />;
};

export default (): any => (
  <ErrorBoundatry>
    <Layout>
      <Suspense fallback={<Loading />}>
        <Switch>
          {routesConfig.map((item: any) => {
            return (
              <Route
                key={item.path}
                exact={true}
                path={item.path}
                component={(props: any) => SetInfo(item, props)}
              />
            );
          })}
          <Redirect from="/" to="/" />
        </Switch>
      </Suspense>
    </Layout>
  </ErrorBoundatry>
);
