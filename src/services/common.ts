import { get, post } from "@/services/request";

export const headerUrl = "https://file.ljcdn.com/";
export const fileUrl = "https://file.ljcdn.com";
export const uploadImgsUrl = `/upload/s3/batchUpload`;

export const getSignIn = (param: any) => {
  return post(`/bapis/mobile/signatureUrl`, param);
};

export const Login = (params?: any) => {
  return get("/cuser/cas/ajax-login", params);
};

export const gerUserInfo = () => {
  return get("/cuser/user/info", {
    redirect: window.location.pathname + window.location.search
  });
};
