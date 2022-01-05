import React from "react";
import styles from "./index.module.scss";
import { useSelector } from "react-redux";
import TabBar from "@/components/TabBar";
import Loading from "@/components/Loading";

const Index: React.FC = () => {
  // const mobile = useSelector<any, string>(
  //   (state) => state.client.userInfo.mobile
  // );

  return (
    <div className={styles.home}>
      <div className={styles.content}>我的</div>
      <TabBar mineTab />
      <Loading isShow={false} />
    </div>
  );
};

export default Index;
