import { AnyAction } from "redux";

export const GETUSERINFO = Symbol();
export const CHANGEUSERINFO = Symbol();

export interface IStoreState {
  userInfo: {
    mobile: number | undefined;
    name: string;
  };
}

export const initState = {
  userInfo: {
    mobile: undefined,
    name: "hello"
  }
};

const reducer = (state: IStoreState = initState, action: AnyAction) => {
  switch (action.type) {
    case GETUSERINFO:
      return {
        ...state,
        userInfo: action.payload
      };
    case CHANGEUSERINFO:
      return {
        ...state,
        userInfo: {
          ...state.userInfo,
          [action.subName]: action.payload
        }
      };
    default:
      return state;
  }
};

export default reducer;
