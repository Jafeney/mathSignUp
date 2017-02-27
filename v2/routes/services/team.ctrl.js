/**
 * @desc 队伍 控制器
 * @author Jafeney
 * @dateTime 2017-01-24
 **/

var Team = require('../../database/team.db');
var Member = require('../../database/member.db');
var Helper = require('../helper');

module.exports = {
    // 模块初始化
    init: function(app) {
        app.get('/teams', this.getAllItems)
        app.post('/signup', this.postSignup)
    },

    // 获取用户的所有信息
    getAllItems: function(req, res) {
        var props = {};
        var team = new Team({props: props});
        team.getAllItems(function(err, data) {
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

    // 报名接口
    postSignup: function(req, res) {
        var props = req.body;
        props.items = JSON.parse(req.body.items)
        var team = new Team({props: props});
        team.addItem(function(err, data) {
            if (data.insertId > 0) {
                var _props = {
                    tid: data.insertId,
                    items: props.items.filter(function(item){return item.name})
                };
                _props.items[0].isLeader = 1;
                var member = new Member({props: _props});
                member.addItemByTeam(function(data) {
                    return res.send({
                        code: 200,
                    })
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
