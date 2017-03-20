/**
 * @desc 成员模块的actions
 * @author Jafeney
 * @dateTime 2016-11-29
 **/

import * as TYPES from '../types';
import { request } from './request.action';
import { bodyUrlencoded } from '../../mixins/helper.mix'

export function getAllMembers(opt) {
    return (dispatch) => {
        const route = '/api/members';
        const success = (data) => {
            dispatch({ type: TYPES.MEMBERS_LIST, result: {items: data} })
            opt.success && opt.success(data)
        };
        request(route, {}, dispatch, success, opt.error)
    }
}

export function getMembers(opt) {
    return (dispatch) => {
        const route = '/api/members/uid';
        const success = (data) => {
            dispatch({ type: TYPES.MEMBERS_LIST, result: {items: process(data)} })
            opt.success && opt.success(data)
        };
        request(route, {}, dispatch, success, opt.error,
            { method: 'POST',
                headers: {"Content-Type": "application/x-www-form-urlencoded"},
            body: bodyUrlencoded(opt.body) })
    }
}

export function getMember(opt) {
    return (dispatch) => {
        const route = '/api/member/info';
        const success = (data) => {
            opt.success && opt.success(data)
        };
        request(route, {}, dispatch, success, opt.error,
            { method: 'POST',
                headers: {"Content-Type": "application/x-www-form-urlencoded"},
            body: bodyUrlencoded(opt.body) })
    }
}

export function deleteMember(opt) {
    return (dispatch) => {
        const route = '/api/member/delete';
        const success = (data) => {
            opt.success && opt.success(data)
        };
        request(route, {}, dispatch, success, opt.error,
            { method: 'POST',
                headers: {"Content-Type": "application/x-www-form-urlencoded"},
            body: bodyUrlencoded(opt.body) })
    }
}

export function editMember(opt) {
    return (dispatch) => {
        const route = '/api/member/put';
        const success = (data) => {
            opt.success && opt.success(data)
        };
        request(route, {}, dispatch, success, opt.error,
            { method: 'POST',
                headers: {"Content-Type": "application/x-www-form-urlencoded"},
            body: bodyUrlencoded(opt.body) })
    }
}

export function signup(opt) {
    return (dispatch) => {
        const route = '/api/signup';
        request(route, {}, dispatch, opt.success, opt.error, { method: 'POST',
            headers: {"Content-Type": "application/x-www-form-urlencoded"},
        body: bodyUrlencoded(opt.body) })
    }
}

export function exportExcel(opt) {
    return (dispatch) => {
        const route = '/api/member/xls';
        request(route, {}, dispatch, opt.success, opt.error, { method: 'POST',
            headers: {"Content-Type": "application/x-www-form-urlencoded"},
        body: bodyUrlencoded(opt.body) })
    }
}

Array.prototype.unique3 = function() {
 var res = [];
 var json = {};
 for(var i = 0; i < this.length; i++){
  if(!json[this[i]]){
   res.push(this[i]);
   json[this[i]] = 1;
  }
 }
 return res;
}

function process(arr) {
  var cur, item=[], output=[];
  arr.forEach(function(i) {
      if (cur && cur.t_id != i.t_id) {
          output.push(item)
          item = [i]
      } else {
          item.push(i)
      };
  cur = i;
  })
  output.push(item);
  return output
}
