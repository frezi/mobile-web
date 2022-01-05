import React from "react";
import styles from "./index.module.scss";

const Index = ({ text = "暂无活动" }) => {
  return (
    <section className={styles.empty}>
      <div>
        <img src={require("@/assets/noContent.png")} alt="" />
      </div>
      <p>{text}</p>
    </section>
  );
};

export default Index;
