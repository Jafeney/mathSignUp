/**
 * @desc 用户模块的reducer
 * @author Jafeney
 * @dateTime 2016-11-29
 **/

import Immutable from 'immutable';
import * as TYPES from '../types'
import { createReducer } from 'redux-immutablejs'

export const users = createReducer(Immutable.fromJS({preload: false}), {
    [TYPES.USERS_LIST]: (state, action) => {
        return state.set('preload', true).merge(Immutable.fromJS(action.result))
    },
    [TYPES.USER_LOGOUT]: (state, action) => {
        return state.clear().set('preload', false)
    }
})

export const user = createReducer(Immutable.fromJS({preload: false}), {
    [TYPES.USER_INFO]: (state, action) => {
        return state.set('preload', true).merge(Immutable.fromJS(action.result))
    },
    [TYPES.USER_LOGOUT]: (state, action) => {
        return state.clear().set('preload', false)
    }
})
