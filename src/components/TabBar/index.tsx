import React from "react";
import { TabBar } from "antd-mobile";
import { withRouter } from "react-router";
import "./index.scss";

const staticImg = {
  home0: require("@/assets/home0.png"),
  home1: require("@/assets/home1.png"),
  wode0: require("@/assets/wode0.png"),
  wode1: require("@/assets/wode1.png")
};

// @ts-ignore
@withRouter //引入history属性
class index extends React.Component<any> {
  render() {
    const { home0, home1, wode1, wode0 } = staticImg;
    return (
      <div
        className="home_tab"
        style={{
          position: "fixed",
          bottom: 0,
          width: "100%",
          left: 0,
          zIndex: 999
        }}
      >
        <TabBar
          unselectedTintColor="#999"
          tintColor="#1087eb"
          barTintColor="white"
        >
          <TabBar.Item
            title="首页"
            key="首页"
            icon={
              <div
                style={{
                  width: "24px",
                  height: "24px",
                  background:
                    "url(" + home0 + ") center center /  24px 24px no-repeat"
                }}
              />
            }
            selectedIcon={
              <div
                style={{
                  width: "24px",
                  height: "24px",
                  background:
                    "url(" + home1 + ") center center /  24px 24px no-repeat"
                }}
              />
            }
            selected={!!this.props.homeTab}
            onPress={() => {
              if (window.location.pathname !== "/cend/ActivityList") {
                this.props.history.push("/ActivityList");
              }
            }}
            data-seed="logId"
          ></TabBar.Item>
          <TabBar.Item
            title="我的"
            key="我的"
            icon={
              <div
                style={{
                  width: "24px",
                  height: "24px",
                  background:
                    "url(" + wode0 + ") center center /  24px 24px no-repeat"
                }}
              />
            }
            selectedIcon={
              <div
                style={{
                  width: "24px",
                  height: "24px",
                  background:
                    "url(" + wode1 + ") center center /  24px 24px no-repeat"
                }}
              />
            }
            selected={!!this.props.mineTab}
            onPress={() => {
              if (window.location.pathname !== "/cend/mine") {
                this.props.history.push("/mine");
              }
            }}
            data-seed="logId"
          ></TabBar.Item>
        </TabBar>
      </div>
    );
  }
}
export default index;
