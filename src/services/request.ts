import { createBrowserHistory as createHistory } from "history";
import { Toast } from "antd-mobile";
import createRequest from "request";

const history = createHistory();
const { get, post, $delete, put, patch, request } = createRequest(history);
export { get, post, put, $delete, patch };

request.interceptors.response.use(
  response => {
    const { data, config } = response;
    const { code, message, errno, errmsg } = data;
    // 如果返回的格式
    if (errno) {
      if (errno == "0") {
        return data.data;
      } else {
        return Toast.fail(errmsg);
      }
    }

    switch (code) {
      case 1: //成功
        return data.data;
      case 401:
      case 403:
      case -2100:
        Toast.fail(message);
        // window.location.href = data.data.loginUrl
        return;
    }

    // 如果返回的是文件
    if (data.type) {
      return response;
    }

    if (!(config as any).noCheck) {
      Toast.fail(message);
    }
    return Promise.reject(data);
  },

  error => {
    const { status, data, config } = error.response || {};

    switch (status) {
      case 401:
      case 403:
      case -2100:
        Toast.fail(data.message);
        window.location.replace(`/`);
        return;
    }

    if (!(config as any).noCheck) {
      Toast.fail(data.message);
    }
    return Promise.reject(data);
  }
);
