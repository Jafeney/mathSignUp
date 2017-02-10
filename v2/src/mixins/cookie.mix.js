/**
 * [读取cookie]
 * @param  {[type]} options [参数对象]
 * @return {[type]}         [对应cookie的值]
 */
export function getCookie(options) {
    var arr,reg=new RegExp("(^| )"+options.name+"=([^;]*)(;|$)");
    if(arr=document.cookie.match(reg)){
        return unescape(arr[2]);
    }
    else{
        return null;
    }
};

/**
 * [添加一个cookie]
 * @param {[type]} options [参数对象]
 */
export function addCookie(options) {
    var _name = options.name,
        _value = options.value,
        _expiresHours = options.expiresHours;
    var _cookieString = _name + "=" + escape(_value);
    //判断是否设置过期时间
    if (_expiresHours > 0) {
        var _date = new Date();
        _date.setTime(_date.getTime() + _expiresHours * 3600 * 1000);
        _cookieString = _cookieString + "; expires=" + _date.toGMTString();
    }
    document.cookie = _cookieString;
}

/**
 * [删除一个cookie]
 * @param {[type]} options [参数对象]
 */
export function deleteCookie(options) {
    var _date = new Date(),
        _name = options.name;
    _date.setTime(_date.getTime() - 10000);
    document.cookie = _name + "=v; expires=" + _date.toGMTString();
}
