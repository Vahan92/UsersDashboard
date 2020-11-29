import * as types from "../actions/types";

const initialState = {
  user: {},
  loading: true,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case types.FETCH_ALL_USERS:
      return {
        ...state,
        totalUsers: action.payload,
        loading: false,
      };
    case types.FETCH_REQUIRED_USERS:
      return {
        ...state,
        requiredUsers: action.payload,
        loading: false,
      };
    case types.EDIT_USER:
      return {
        ...state,
        user: action.payload,
      };
    case types.ADD_EDIT_USER:
      return {
        ...state,
        editUserInfo: action.payload[0],
        showForm: action.payload[1],
      };
    default:
      return state;
  }
}
