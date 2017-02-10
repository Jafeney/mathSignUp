/**
 * @desc 队员 控制器
 * @author Jafeney
 * @dateTime 2017-01-24
 **/

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
        member.deleteItemById(function(err, data) {
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
    }
}
