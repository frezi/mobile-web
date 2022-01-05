import { AnyAction } from "redux";
import { GETUSERINFO, CHANGEUSERINFO } from "./reducer";

type ACTION_CREATOR<T = any> = (payload?: T) => AnyAction;

export const getUserInfoAction: ACTION_CREATOR = payload => ({
  type: GETUSERINFO,
  payload
});

export const changeUserInfoAction = (subName: string, payload: any) => ({
  type: CHANGEUSERINFO,
  subName,
  payload
});
