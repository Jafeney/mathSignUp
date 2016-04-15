var fs = require('fs'),
    _ = require('../util'),
    json2xls = require('json2xls'),
    GROUP_PATH = './database/group.json',
    COPY_PATH = './database/copy/',
    TEMP_PARH = './database/temp/';

/*信息录入*/
var Group = {

    // 入口
    init: function(app) {
        app.post('/group/add', this.addGroup);
        app.get('/group/get', this.getGroup);
        app.get('/group/delete', this.deleteGroup);
        app.get('/group/copy', this.copySource);
        app.get('/group/revert/list', this.getRevertList);
        app.get('/group/revert', this.revertData);

        // 开启excel下载功能
        app.use(json2xls.middleware);
        app.get('/group/xls', this.jsonToExcel);
    },

    // 获取数据
    getGroup: function(req, res) {
        fs.readFile(GROUP_PATH, function(err, data) {
            if (!err) {
                try {
                    var obj = JSON.parse(data);
                    return res.send({
                        status: 1,
                        data: obj
                    });
                } catch(e) {
                    return res.send({
                        status: 0,
                        err: e
                    });
                }
            }
            return res.send({
                status: 0,
                err: err
            });
        });
    },

    // 添加数据
    addGroup: function(req, res) {
        var data = req.body;
        if (data) {
            try {
                var source = JSON.parse(fs.readFileSync(GROUP_PATH));
                var obj = data;
                if (source.length) {
                    // 假处理
                    obj.id = source[source.length-1].id;
                    obj.uptime = source[source.length-1].uptime;
                    if (!_.equal(obj,source[source.length-1])) {
                        // 自动备份当天最原始的数据
                        _.autoCopy(source);
                        // 添加新数据
                        obj.id = source.length;
                        var date = new Date();
                        obj.uptime = date.getFullYear() + '-' + (parseInt(date.getMonth()) + 1) + '-' + date.getDate();
                        source.push(obj);
                        // 更新文件
                        fs.writeFileSync(GROUP_PATH, JSON.stringify(source));
                        return res.send({
                            status: 1,
                            message: '信息录入成功！'
                        });
                    } else {
                        return res.send({
                            status: 2,
                            message: '请不要重复提交哦！'
                        });
                    }
                } else {
                    // 添加新数据
                    obj.id = source.length;
                    var _date = new Date();
                    obj.uptime = _date.getFullYear() + '-' + (parseInt(_date.getMonth()) + 1) + '-' + _date.getDate();
                    source.push(obj);
                    // 更新文件
                    fs.writeFileSync(GROUP_PATH, JSON.stringify(source));
                    return res.send({
                        status: 1,
                        message: '信息录入成功！'
                    });
                }
            } catch (e) {
                return res.send({
                    status: 0,
                    err: e
                });
            }
        } else {
            return res.send({
                status: 0,
                message: '参数错误！'
            });
        }
    },

    // 删除数据
    deleteGroup: function(req, res) {
        var id = req.param('id').split(',');
        if (id.length) {
            try {
                var source = JSON.parse(fs.readFileSync(GROUP_PATH));
                var newSource = [];
                var changeItem = 0;

                if (id[0] === 'all') {
                    // 清空数据
                    newSource = [];
                } else {
                    // 数据特定
                    source.forEach(function(item) {
                        if (id.indexOf(item.id.toString())+1) {
                            changeItem ++;
                        } else {
                            newSource.push(item);
                        }
                    });
                }
                // 自动备份当天最原始的数据
                _.autoCopy(source);
                // 更新文件
                fs.writeFileSync(GROUP_PATH, JSON.stringify(newSource));

                if (changeItem) {
                    return res.send({
                        status: 1,
                        message: '信息删除成功！',
                        changeItem: changeItem
                    });
                } else {
                    return res.send({
                        status: 2,
                        message: '没有可以删除的项！'
                    });
                }

            } catch (e) {
                return res.send({
                    status: 0,
                    err: e
                });
            }
        } else {
            return res.send({
                status: 0,
                message: '参数错误！'
            });
        }
    },

    // 把json转化为excel
    jsonToExcel: function(req, res) {
        try {
            var source = JSON.parse(fs.readFileSync(GROUP_PATH));
            // 处理成特殊的json格式
            var data = [];
            source.forEach(function(item) {
                item.items.forEach(function(aa) {
                    var newItem = {};
                    newItem.id = item.id;
                    newItem.school = item.school;
                    newItem.group = item.group;
                    newItem.teacher = item.teacher;
                    newItem.uptime = item.uptime;
                    newItem.name = aa.name;
                    newItem.role = aa.role;
                    newItem.IDcard = aa.IDcard;
                    newItem.code = aa.code;
                    newItem.college = aa.college;
                    newItem.major = aa.major;
                    newItem.grade = aa.grade;
                    newItem.telphone = aa.telphone;
                    newItem.email = aa.email;
                    newItem.note = aa.note;
                    data.push(newItem);
                });
            });

            // 生成excel
            // var xls = json2xls(data);
            // fs.writeFileSync('./database/data.xlsx', xls, 'binary');
            // return res.xls({
            //     status: 1,
            //     message: "导出excel成功！"
            // });

            // 直接下载
            return res.xls('data.xlsx', data);

        } catch(e) {
            return res.send({
                status: 0,
                err: e
            });
        }
    },

    // 手动备份
    copySource: function(req, res) {
        try {
            var source = JSON.parse(fs.readFileSync(GROUP_PATH));

            fs.writeFileSync(TEMP_PARH + 'temp.json', JSON.stringify(source));
            return res.send({
                status: 1,
                message: "数据手动备份成功！"
            });

        } catch(e) {
            return res.send({
                status: 0,
                err: e
            });
        }
    },

    // 获取可以还原的版本
    getRevertList: function(req, res) {
        var data = [];
        fs.readdir(COPY_PATH, function(err, list) {
    		if (err) {
    			throw '没有找到该文件夹，请检查......';
    		}
    		for(var e; list.length && (e = list.shift());) {
                if (e.split('.')[1] === 'json') {
                    data.push(e.split('.')[0]);
                }
    		}
            return res.send({
                status: 1,
                data: data
            });
    	});
    },

    // 执行回滚
    revertData: function(req, res) {
        var key = req.param('key');
        if (key === 'current') {
            try {
                var source = JSON.parse(fs.readFileSync(TEMP_PARH + 'temp.json'));
                // 更新文件
                fs.writeFileSync(GROUP_PATH, JSON.stringify(source));
                return res.send({
                    status: 1,
                    message: '已回滚到当前备份的版本！'
                });
            } catch(e) {
                return res.send({
                    status: 0,
                    err: e
                });
            }
        } else {
            try {
                var data = JSON.parse(fs.readFileSync(COPY_PATH + key + '.json'));
                // 更新文件
                fs.writeFileSync(GROUP_PATH, JSON.stringify(data));
                return res.send({
                    status: 1,
                    message: '已回滚到' + key + '的版本！'
                });
            } catch(e) {
                return res.send({
                    status: 0,
                    err: e
                });
            }
        }
    }
};

module.exports = Group;
