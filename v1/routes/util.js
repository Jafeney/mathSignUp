var crypto = require('crypto');
var fs = require('fs');

module.exports = {

	guid: function() {
		return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
			var r = Math.random() * 16 | 0; //取整
			var v = c == 'x' ? r : (r & 0x3 | 0x8); //y位只可能是8或9
			return v.toString(16); // 返回十六进制
		}).toUpperCase();
	},

	md5: function(password) {
		var md5 = crypto.createHash('md5');
		var salt = '(!%$88hs@gophs*)#sassb9';
		var newPwd = md5.update(password + salt).digest('hex');
		return newPwd;
	},

	getKey: function() {
		return 'HSHHSGSGGSTWSYWSYUSUWSHWBS-REACT-NATIVE';
	},

	equal: function(objA, objB) {
	    if (typeof arguments[0] != typeof arguments[1])
	        return false;

	    //数组
	    if (arguments[0] instanceof Array)
	    {
	        if (arguments[0].length != arguments[1].length)
	            return false;

	        var allElementsEqual = true;
	        for (var i = 0; i < arguments[0].length; ++i)
	        {
	            if (typeof arguments[0][i] != typeof arguments[1][i])
	                return false;

	            if (typeof arguments[0][i] == 'number' && typeof arguments[1][i] == 'number')
	                allElementsEqual = (arguments[0][i] == arguments[1][i]);
	            else
	                allElementsEqual = arguments.callee(arguments[0][i], arguments[1][i]);            //递归判断对象是否相等
	        }
	        return allElementsEqual;
	    }

	    //对象
	    if (arguments[0] instanceof Object && arguments[1] instanceof Object)
	    {
	        var result = true;
	        var attributeLengthA = 0, attributeLengthB = 0;
	        for (var o in arguments[0])
	        {
	            //判断两个对象的同名属性是否相同（数字或字符串）
	            if (typeof arguments[0][o] == 'number' || typeof arguments[0][o] == 'string')
	                result = eval("arguments[0]['" + o + "'] == arguments[1]['" + o + "']");
	            else {
	                //如果对象的属性也是对象，则递归判断两个对象的同名属性
	                //if (!arguments.callee(arguments[0][o], arguments[1][o]))
	                if (!arguments.callee(eval("arguments[0]['" + o + "']"), eval("arguments[1]['" + o + "']")))
	                {
	                    result = false;
	                    return result;
	                }
	            }
	            ++attributeLengthA;
	        }

	        for (var o in arguments[1]) {
	            ++attributeLengthB;
	        }

	        //如果两个对象的属性数目不等，则两个对象也不等
	        if (attributeLengthA != attributeLengthB)
	            result = false;
	        return result;
	    }
	    return arguments[0] == arguments[1];
	},

	// 自动备份
    autoCopy: function(source) {
		try {
			if (source.length) {
				var _date = new Date();
	            var today = _date.getFullYear() + '-' + (parseInt(_date.getMonth()) + 1) + '-' + _date.getDate();
	            // 不是当天则备份当天最初的数据
	            if (source[source.length-1].uptime != today) {
	                fs.writeFileSync('./database/copy/' + today + '.json', JSON.stringify(source));
					console.log("数据自动备份成功！");
	            }
			}
		} catch(e) {
			console.err(e);
		}
    }
};
