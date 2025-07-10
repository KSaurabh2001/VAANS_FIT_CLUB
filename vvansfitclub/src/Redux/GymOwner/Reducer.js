
import { VERIFY_PAYMENT } from "../GymHandler/ActionType";
import { ADD_GYM, ADD_HANDLER, ADD_MEMBERSHIP, ADD_TRAINER, ADD_USER,
    ALL_GYM, ALL_HANDLER, ALL_MEMBERSHIP, ALL_TRAINER, ALL_USER, ASSIGN_GYM_HANDLER, 
    DELETE_GYM, DELETE_HANDLER, DELETE_MEMBERSHIP, DELETE_TRAINER, DELETE_USER, 
    EDIT_GYM, GET_GYM_BY_ID, GET_MEMBERSHIP_BY_ID, UNASSIGN_GYM_HANDLER } from "./ActionTypes";



const initialValue = {
    AllGym: null,
    GymById: null,
    AllMembership: null,
    MembershipById: null,
    AllHandler: null,
    AllGymUser: null,
    AllGymTrainer: null, 
};

export const OwnerReducer = (store = initialValue, { type, payload }) => {
    switch (type) {

        case ADD_GYM:
            return { ...store, AllGym: payload };
        case ALL_GYM:
            return { ...store, AllGym: payload };
        case GET_GYM_BY_ID:
            return { ...store, GymById: payload };
        case DELETE_GYM:
            return { ...store, AllGym: payload };
        case EDIT_GYM:
            return { ...store, AllGym: payload };


        case ADD_MEMBERSHIP:
            return { ...store, AllMembership: payload };
        case DELETE_MEMBERSHIP:
            return { ...store, AllMembership: payload };
        case ALL_MEMBERSHIP:
            return { ...store, AllMembership: payload }
        case GET_MEMBERSHIP_BY_ID:
            return { ...store, MembershipById: payload }

        case ADD_HANDLER:
            return { ...store, AllHandler: payload };
        case DELETE_HANDLER:
            return { ...store, AllHandler: payload };
        case ALL_HANDLER:
            return { ...store, AllHandler: payload };

        case ASSIGN_GYM_HANDLER:
            return { ...store };
        case UNASSIGN_GYM_HANDLER:
            return { ...store };

        case ADD_USER:
            return { ...store, AllGymUser: payload };
        case DELETE_USER:
            return { ...store, AllGymUser: payload };
        case ALL_USER:    
             return { ...store, AllGymUser: payload };

        case ADD_TRAINER:
            return { ...store, AllGymTrainer: payload };
        case DELETE_TRAINER:
            return { ...store, AllGymTrainer: payload };
        case ALL_TRAINER:
              return { ...store, AllGymTrainer: payload };
              
           
        case VERIFY_PAYMENT:
      return { ...store, AllGymUser :payload }    



        default:
            return store;
    }
};
