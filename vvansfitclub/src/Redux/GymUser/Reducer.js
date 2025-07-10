import { ENROLL, MEMBERSHIP, UNENROLL, USER_BY_ID, USER_SESSION, USER_TRAINER } from "./ActionType";


const initialValue = {
    UserById: null,
    bookedClass: null,
    trainer: null,
    membership: null
};

export const UserReducer = (store = initialValue, { type, payload }) => {
    switch (type) {
        case ENROLL:
            return { ...store, bookedClass: payload };
        case UNENROLL:
            return { ...store, bookedClass: payload };
        case USER_SESSION:
            return { ...store, bookedClass: payload };
        case USER_TRAINER:
            return { ...store, trainer: payload };
        case USER_BY_ID:
            return { ...store, UserById: payload }
             case MEMBERSHIP:
            return { ...store, membership: payload }
        default:
            return store;
    }
};
