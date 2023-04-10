import { SET_IS_AUTHORIZED } from "./actionTypes";

const initialState = {
  isAuthorized: false,
};

// eslint-disable-next-line import/prefer-default-export
export const auth = (
  state = initialState,
  { type, payload }: { type: any; payload: any }
) => {
  switch (type) {
    case SET_IS_AUTHORIZED:
      return { ...state, isAuthorized: payload };
    default:
      return state;
  }
};
