import { Badge } from '../models/badge';
import * as types from './types';

export function setBadges(badges: Badge[]) {
    return {
        type: types.SET_BADGES,
        badges
    };
}

export function setFilter(filter: string) {
    return {
        type: types.SET_FILTER,
        filter
    };
}

export function setSortOrder(isDescending: boolean) {
    return {
        type: types.SET_SORT_ORDER,
        isDescending
    };
}

export function setLoading(loading: boolean) {
    return {
        type: types.SET_LOADING,
        loading
    }
}