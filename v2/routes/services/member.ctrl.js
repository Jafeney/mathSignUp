/**
 * @desc 队员 控制器
 * @author Jafeney
 * @dateTime 2017-01-24
 **/
var json2xls = require('json2xls');
var fs = require('fs');
var Member = require('../../database/member.db');
var Team = require('../../database/team.db');
var Helper = require('../helper');

module.exports = {
    // 模块初始化
    init: function(app) {
        app.get('/members', this.getAllItems)
        app.post('/members/uid', this.postAllItemsById)
        app.post('/member/delete', this.deleteItemById)
        app.post('/member/put', this.putItemById)
        app.post('/member/xls', this.exportExcel)
    },

    // 获取所有成员的所有信息
    getAllItems: function(req, res) {
        var props = {};
        var member = new Member({props: props});
        member.getAllItems(function(err, data) {
            if (data.length) {
                return res.send({
                    code: 200,
                    data: data,
                })
            } else {
                err && console.log(err)
                return res.send({
                    code: 500,
                    message: '出错了',
                })
            }
        })
    },

    // 获取用户对应成员的的所有信息
    postAllItemsById: function(req, res) {
        var props = req.body;
        var member = new Member({props: props});
        member.getAllItemsById(function(err, data) {
            if (!err) {
                return res.send({
                    code: 200,
                    data: data,
                })
            } else {
                err && console.log(err)
                return res.send({
                    code: 500,
                    message: '出错了',
                })
            }
        })
    },

    // 根据ID删除成员
    deleteItemById: function(req, res) {
        var props = req.body;
        var member = new Member({props: props});
        var team = new Team({props: props});
        member.deleteItemById(function(err, data) {
            if (!err) {
                team.removeItemById(function(_err, _data) {
                    if (!_err) {
                        return res.send({
                            code: 200,
                        })
                    }
                })
            } else {
                err && console.log(err)
                return res.send({
                    code: 500,
                    message: '出错了',
                })
            }
        })
    },

    // 根据ID编辑成员信息
    putItemById: function(req, res) {
        var props = req.body;
        var member = new Member({props: props});
        member.putItemById(function(err, data) {
            if (!err) {
                return res.send({
                    code: 200,
                    data: data,
                })
            } else {
                err && console.log(err)
                return res.send({
                    code: 500,
                    message: '出错了',
                })
            }
        })
    },

    // 导出json数据到excel
    exportExcel: function(req, res) {
        var source = JSON.parse(req.body.source);
        try {
            // 生成excel
            var xls = json2xls(source);
            fs.writeFileSync('./public/data.xlsx', xls, 'binary');
            return res.send({
                code: 200,
                data: []
            });
        } catch(e) {
            return res.send({
                code: 500,
                message: '导出失败！'
            });
        }
    }
}
