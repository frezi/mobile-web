import React from "react";
import style from "./index.module.scss";
import { Icon } from "antd-mobile";
import cln from "classnames";
// const antIcon = <Icon type="loading" style={{ fontSize: 50 }} spin />;
const Loading = (props: any) => {
  return (
    <div className={cln(style.showbox, props.isShow ? "" : style.hide)}>
      <div className="loader">
        <Icon type="loading" />
      </div>
    </div>
  );
};

export default Loading;
