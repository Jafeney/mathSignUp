/**
 * @desc 用户 控制器
 * @author Jafeney
 * @dateTime 2017-01-24
 **/

var User = require('../../database/user.db');
var Helper = require('../helper');

module.exports = {
    // 模块初始化
    init: function(app) {
        app.get('/users', this.getAllItems)
        app.post('/user/token', this.getItemByIdPassword)
        app.post('/user/info', this.getItemById)
        app.post('/user/password', this.putPassword)
        app.post('/user/set', this.putUserInfo)
    },

    // 获取用户的所有信息
    getAllItems: function(req, res) {
        var props = {};
        var user = new User({props: props});
        user.getAllItems(function(err, data) {
            if (data.length) {
                return res.send({
                    code: 200,
                    data: data,
                })
            } else {
                return res.send({
                    code: 500,
                    message: '出错了',
                })
            }
        })
    },

    // 用户登录
    getItemByIdPassword: function(req, res) {
        var props = req.body;
        props.password = Helper.getMD5(req.body.password);
        var user = new User({props: props});
        user.getItemByIdPassword(function(err, data) {
            if (data.length) {
                return res.send({
                    code: 200,
                    data: data,
                })
            } else {
                return res.send({
                    code: 400,
                    message: '用户名或密码不正确'
                })
            }
        })
    },

    // 用户登录
    getItemById: function(req, res) {
        var props = req.body;
        var user = new User({props: props});
        user.getItemById(function(err, data) {
            if (data.length) {
                return res.send({
                    code: 200,
                    data: data,
                })
            } else {
                return res.send({
                    code: 400,
                    message: '用户名或密码不正确'
                })
            }
        })
    },

    // 修改密码
    putPassword: function(req, res) {
        var props = {
            id: req.body.id,
            new_password: Helper.getMD5(req.body.new_password)
        };
        var user = new User({props: props});
        user.putPassword(function(err, data) {
            if (data.changedRows >= 0) {
                return res.send({
                    code: 200
                })
            } else {
                return res.send({
                    code: 500,
                    message: '出错了'
                })
            }
        })
    },

    // 修改用户信息
    putUserInfo: function(req, res) {
        var props = req.body;
        var user = new User({props: props});
        user.putUserInfo(function(err, data) {
            if (data.changedRows >= 0) {
                return res.send({
                    code: 200
                })
            } else {
                return res.send({
                    code: 500,
                    message: '出错了'
                })
            }
        })
    }
}
