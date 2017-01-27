import * as types from './types';

export function setBadges(badges) {
    return {
        type: types.SET_BADGES,
        badges
    };
}

export function setFilter(filter) {
    return {
        type: types.SET_FILTER,
        filter
    };
}

export function setSortOrder(isDescending) {
    return {
        type: types.SET_SORT_ORDER,
        isDescending
    };
}

export function setLoading(loading) {
    return {
        type: types.SET_LOADING,
        loading
    }
}