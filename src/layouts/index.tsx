/* eslint-disable @typescript-eslint/explicit-member-accessibility */
import React, { useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { IStoreState } from "@/reduxs/reducer";
import { getUserInfoAction } from "@/reduxs/actions";
import { Login, gerUserInfo } from "@/services/common";
import { setCookie } from "@/tools/common";
import { checkIsLink } from "@/tools/ljBridge";
import { Toast } from "antd-mobile";
import { initDt } from "@/tools/dt";
import "@/tools/common.scss";

const Layout: React.FC = ({ children }) => {
  const name = useSelector<IStoreState, string>(state => {
    return state.userInfo.name;
  });
  const dispatch = useDispatch();

  const userInfo = useSelector<IStoreState, any>(state => {
    return state.userInfo;
  });
  console.log(userInfo, "userInfo");

  useEffect(() => {
    // toLogin();
    //初始化灯塔====
    // const ENV = process.env.REACT_APP_BRANCH || "test";
    // initDt(ENV);
  }, []);

  const toLogin = useCallback(() => {
    const env = process.env.REACT_APP_BRANCH as string;
    if (["prod", "test", "dev"].includes(env)) {
      checkIsLink()
        .then(token => {
          //app sdk获取token
          Login({ ticket: token }).then(() => {
            toGetUserInfo(token);
          });
        })
        .catch(() => {
          Toast.fail("获取token失败，请刷新页面～");
        });
    } else {
      // localhost本地 or ip link本地验证
      fakeLogin();
    }
  }, []);

  const toGetUserInfo = useCallback((token?: any) => {
    gerUserInfo().then((res: any) => {
      if (!res || JSON.stringify(res) == "{}") return;
      dispatch(getUserInfoAction({ ...res, token }));
    });
  }, []);

  //假登录
  const fakeLogin = useCallback(() => {
    const token = "ST-63926-LdSeBgLmnpf-1JC8ubM7jILVv4o-ke.com";
    setCookie("sap_activity_token", token);
    Login({ ticket: token }).then(() => {
      toGetUserInfo(token);
    });
  }, []);

  return <React.Fragment>{name && children}</React.Fragment>;
};

export default Layout;
