import { ADD_DIET, ADD_WORKOUT, ALL_DIET, ALL_WORKOUT, ASSIGN_DIET, ASSIGN_WORKOUT, DELETE_DIET, DELETE_WORKOUT, EDIT_WORKOUT, GET_WORKOUT_BY_ID, TRAINER_BY_ID, UNASSIGN_DIET, UNASSIGN_WORKOUT } from "./ActionType";



const initialValue = {
    AllWorkout: [],
    workoutById: null,
    AllDiet: null,
    TrainerById: null
};

export const TrainerReducer = (store = initialValue, { type, payload }) => {
    switch (type) {
        case ADD_WORKOUT:
            return { ...store, AllWorkout: payload };
        case ALL_WORKOUT:
            return { ...store, AllWorkout: payload };
        case DELETE_WORKOUT:
            return { ...store, AllWorkout: payload };
        case EDIT_WORKOUT:
            return { ...store, AllWorkout: payload };
        case GET_WORKOUT_BY_ID:
            return { ...store, workoutById: payload };

        case ADD_DIET:
            return { ...store, AllDiet: payload };
        case ALL_DIET:
            return { ...store, AllDiet: payload };

        case DELETE_DIET:
            return { ...store, AllDiet: payload };

        case ASSIGN_DIET:
            return { ...store };
        case UNASSIGN_DIET:
            return { ...store };
        case ASSIGN_WORKOUT:
            return { ...store };
        case UNASSIGN_WORKOUT:
            return { ...store };

        case TRAINER_BY_ID:
            return { ...store , TrainerById: payload};




        default:
            return store;
    }
};
