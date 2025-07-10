import { legacy_createStore, applyMiddleware, combineReducers } from 'redux'
import {thunk} from 'redux-thunk';
import { AuthReducer } from './Redux/Auth/Reducer';
import { OwnerReducer } from './Redux/GymOwner/Reducer';
import HandlerReducer from './Redux/GymHandler/Reducer';
import { TrainerReducer } from './Redux/GymTrainer/Reducer';
import { UserReducer } from './Redux/GymUser/Reducer';

const rootReducers=combineReducers({

    auth:AuthReducer,
    owner:OwnerReducer,
    handler:HandlerReducer,
    trainer:TrainerReducer,
    gymUser:UserReducer,
    

});

export const store = legacy_createStore(rootReducers,applyMiddleware(thunk))    