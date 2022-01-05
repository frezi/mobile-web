import { getCookie } from "./common";

export const initDt = (env: string) => {
  (window as any).dt &&
    (window as any).dt.set({
      //接入灯塔
      // 项目id, 由灯塔项目组统一分配
      pid: "bk_active_mobile",
      // 用户ucid, 用于发生异常时追踪用户信息/计算系统用户数. 一般在cookie中可以取到(lianjia_uuid), 没有可传空字符串
      ucid: getCookie("lianjia_uuid"),
      // 是否为测试数据, 默认为false(测试模式下打点数据仅供浏览, 不会展示在系统中)
      is_test: ["prod", "preview"].includes(env) ? false : true,
      // [必填]设备唯一id, 不填则由sdk统一在cookie中生成一份设备id
      // 用于计算设备/浏览器/系统版本分布数据, 不填则无法区分不同设备的打点信息.
      // 一般在cookie中可以取到(lianjia_uuid), 没有uuid可用设备mac/idfa/imei替代
      uuid: getCookie("lianjia_uuid")
    });
};
