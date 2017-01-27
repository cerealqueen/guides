import { Badge } from '../models/badge';
import * as types from './types';

export interface StoreState {
    badges: Badge[],
    filter: string,
    isDescending: boolean,
    loading: boolean
}

const initialState = {
    badges: [],
    filter: '',
    isDescending: true,
    loading: false
};

export default function (state = initialState, action = {}) {
    switch (action.type) {
        case types.SET_BADGES:
            return {
                ...state,
                badges: state.badges || initialState.badges
            };
        case types.SET_FILTER:
            return {
                ...state,
                filter: state.filter || initialState.filter
            };
        case types.SET_SORT_ORDER:
            return {
                ...state,
                isDescending: state.isDescending
            }
        case types.SET_LOADING:
            return {
                ...state,
                loading: state.loading
            }
        default:
            return state;
    }
}