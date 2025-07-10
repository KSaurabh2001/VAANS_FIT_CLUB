import { EDIT_HANDLER_PROFILE, EDIT_OWNER_PROFILE, EDIT_TRAINER_PROFILE, EDIT_USER_PROFILE, LOGIN, LOGOUT, USER_BY_TOKEN } from "./ActionType";



const initialValue = {
  token: null,
  user: null,
};

export const AuthReducer = (store = initialValue, { type, payload }) => {
  switch (type) {
    case LOGIN:
      return { ...store, token: payload };

    case USER_BY_TOKEN:
      console.log("✅ Saving user to Redux:", payload); // ✅ Add this!
      return { ...store, user: payload };

    case LOGOUT:
      return { token: null, user: null };

    case EDIT_HANDLER_PROFILE:
      return { ...store, user: payload };

    case EDIT_OWNER_PROFILE:
      return { ...store, user: payload };

      case EDIT_TRAINER_PROFILE:
      return { ...store, user: payload };

      case EDIT_USER_PROFILE:
      return { ...store, user: payload };

    default:
      return store;
  }
};
