/**
 * @desc 用户模块的actions
 * @author Jafeney
 * @dateTime 2016-11-29
 **/

import * as TYPES from '../types';
import { request } from './request.action';
import { bodyUrlencoded } from '../../mixins/helper.mix'
import { getCookie, deleteCookie } from '../../mixins/cookie.mix'

export function getUsers(opt) {
    return (dispatch) => {
        const route = '/api/users';
        const success = (data) => {
            dispatch({ type: TYPES.USERS_LIST, result: {items: data} })
            opt.success && opt.success(data)
        };
        request(route, {}, dispatch, success, opt.error)
    }
}

export function check(opt) {
    return (dispatch) => {
        if (getCookie({name: 'MATH_USER_INFO'})) {
            opt.success && opt.success(getCookie({name: 'MATH_USER_INFO'}))
        } else {
            opt.fail && opt.fail()
        }
    }
}

export function logout(opt) {
    return (dispatch) => {
        deleteCookie({name: 'MATH_USER_INFO'})
        dispatch({type: TYPES.USER_LOGOUT})
        opt.success && opt.success()
    }
}

export function login(opt) {
    return (dispatch) => {
        const route = '/api/user/token';
        const success = (data) => {
            dispatch({type: TYPES.USER_INFO, result: {user_info: data[0]} })
            opt.success && opt.success(data)
        };
        request(route, {}, dispatch, success, opt.error,
            { method: 'POST',
                headers: {"Content-Type": "application/x-www-form-urlencoded"},
            body: bodyUrlencoded(opt.body) })
    }
}

export function testPassword(opt) {
    return (dispatch) => {
        const route = '/api/user/token';
        request(route, {}, dispatch, opt.success, opt.error,
            { method: 'POST',
                headers: {"Content-Type": "application/x-www-form-urlencoded"},
            body: bodyUrlencoded(opt.body) })
    }
}

export function postUserInfo(opt) {
    return (dispatch) => {
        const route = '/api/user/info';
        const success = (data) => {
            dispatch({type: TYPES.USER_INFO, result: data[0] })
            opt.success && opt.success(data)
        };
        request(route, {}, dispatch, success, opt.error,
            { method: 'POST',
                headers: {"Content-Type": "application/x-www-form-urlencoded"},
            body: bodyUrlencoded(opt.body) })
    }
}

export function changePassword(opt) {
    return (dispatch) => {
        const route = '/api/user/password';
        request(route, {}, dispatch, opt.success, opt.error,
            { method: 'POST',
                headers: {"Content-Type": "application/x-www-form-urlencoded"},
            body: bodyUrlencoded(opt.body) })
    }
}

export function setUserInfo(opt) {
    return (dispatch) => {
        const route = '/api/user/set';
        request(route, {}, dispatch, opt.success, opt.error,
            { method: 'POST',
                headers: {"Content-Type": "application/x-www-form-urlencoded"},
            body: bodyUrlencoded(opt.body) })
    }
}
