/**
 * @desc 成员模块的reducer
 * @author Jafeney
 * @dateTime 2016-11-29
 **/

import Immutable from 'immutable';
import * as TYPES from '../types'
import { createReducer } from 'redux-immutablejs'

export const members = createReducer(Immutable.fromJS({preload: false}), {
    [TYPES.MEMBERS_LIST]: (state, action) => {
        return state.set('preload', true).merge(Immutable.fromJS(action.result))
    },
    [TYPES.USER_LOGOUT]: (state, action) => {
        return state.clear().set('preload', false)
    }
})
