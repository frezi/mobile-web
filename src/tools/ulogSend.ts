/**
 * 罗盘埋点参数
 */
export interface IUlogParams {
  evtId: string;
  uicode: string;
  userInfo?: any;
  evtType?: string;
  roleType?: number;
  activityId?: number;
  activityName?: string;
}

/**
 * 手动发送罗盘埋点数据
 * @param {IUlogParams} ulogParams 埋点参数
 * @param {number} type 埋点类型：1-页面埋点（PV/UV） 2-页面曝光
 * @param extParams
 */
export const ulogSend = function(
  ulogParams: IUlogParams,
  type: number,
  extParams: any = {}
) {
  const win: any = window as any;

  const send: Function = win.$ULOG.send;

  let sendParams: any = {
    uicode: ulogParams.uicode
  };

  if (type === 2) {
    sendParams.event = ulogParams.evtType;
    sendParams.action = Object.assign(
      {
        from_way:
          ulogParams.userInfo &&
          (ulogParams.userInfo.userType === 1
            ? "经纪人"
            : ulogParams.userInfo.userType === 2
            ? "C端用户"
            : "未知"),
        roletype:
          ulogParams.roleType === 0
            ? "已登录未报名"
            : ulogParams.roleType === 1
            ? "活动工作人员"
            : ulogParams.roleType === 2
            ? "活动参与者"
            : ulogParams.roleType === 3
            ? "活动创建人"
            : "未登录",
        activityid: ulogParams.activityId,
        marketing: ulogParams.activityName,
        data_source:
          win.appType === "beike"
            ? "link/a+"
            : win.appType === "wechat"
            ? "小程序"
            : "其他"
      },
      extParams
    );
    send(ulogParams.evtId, sendParams, () => {
      console.log("dig success:");
      // console.log(ulogParams);
      console.log(sendParams);
    });
  } else if (type === 1) {
    send("1,3", sendParams, () => {
      console.log("dig success:");
      // console.log(ulogParams);
      console.log(sendParams);
    });
  }
};
