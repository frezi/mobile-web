export const checkIsLink = () => {
  return new Promise((resove, reject) => {
    const a: any = window;
    if (!a.$ljBridge) {
      reject();
    }
    a.$ljBridge &&
      a.$ljBridge.ready((bridge: any, webStatus: any) => {
        if (webStatus.isApp) {
          let token = bridge.getAccessToken();
          console.log(token, "token");
          resove(token);
        } else {
          reject();
        }
      });
  });
};

// 自定义分享
interface shareConfig {
  articleTitle?: string; //标题
  articleDiscription?: string; //描述
  requestUrl?: string; //分享地址
  headImageUrl?: string; //分享图片
  shareChannels?: string; //分享渠道 0微信1朋友圈2QQ3QQ空间4微博5IM6短信7复制链接8浏览器9保存图片
  shareType?: number; // Number 分享类型，0：分享网页，1：分享图片（配合imageData字段）
  imageData?: string; //分享图片数据，url或base64字符串
  remark?: string;
  agentUcid?: string;
  agentCityId?: string;
  [propsName: string]: any;
}
const createShareUrl = (config: any) => {
  let str = "";
  for (let key in config) {
    str += `${key}=${encodeURIComponent(config[key])}&`;
  }
  return str;
};

// ====link分享？ 接入
export const shareMake = (shareConfig: shareConfig) => {
  const a: any = window;
  let url = a.location.href;
  let { shareChannels } = shareConfig;
  if (shareChannels === "0" || shareChannels === "1") {
    url = url.replace(/cend/, "cust");
  }

  if (a.location.pathname === "/cend/ActivityDetails") {
    url =
      url +
      `&agentUcid=${shareConfig.agentUcid}&agentCityId=${shareConfig.agentCityId}`;
  }

  console.log(url, "shareurl");
  shareConfig.requestUrl = url;
  shareConfig.miniProgramId = "gh_2dbd87cb164c";
  shareConfig.miniProgramPath =
    "/pages/webView/webView?must_login=1&url=" + encodeURIComponent(url);
  shareConfig.smsContent = "短信的内容（包括链接地址）";
  shareConfig.channel = "当前页所在的频道信息";
  (window as any).$ljBridge.ready((bridge: any) => {
    shareConfig.headImageUrl =
      shareConfig.headImageUrl ||
      "https://s1.ljcdn.com/kelanhai-static/kelanhai-web-b/static/shareSmall.png";

    if (shareChannels) {
      let paramsString = createShareUrl(shareConfig);
      const shareString =
        shareChannels.length > 1
          ? paramsString + "isShowDialog=true"
          : paramsString + "isShowDialog=false";
      console.log(shareString);
      bridge.actionWithUrl(
        bridge.getSchemeLink(`web_share_path?${shareString}`)
      );
    } else {
      bridge.actionShareWithString(JSON.stringify(shareConfig));
    }
  });
};

export const setTitle = (title = "") => {
  document.title = title;
  (window as any).$ljBridge &&
    (window as any).$ljBridge.ready((bridge: any, webStatus: any) => {
      bridge.setPageTitle(title);
    });
};

interface RightButtonParams {
  name: string;
  clickUrl: string;
  imageUrl?: string;
  textHexColor?: string;
}

//设置右上角按钮
export const setRightButton = (param: RightButtonParams) => {
  (window as any).$ljBridge.ready((bridge: any) => {
    bridge.setRightButton2(JSON.stringify(param));
  });
};
