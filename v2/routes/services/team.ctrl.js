/**
 * @desc 队伍 控制器
 * @author Jafeney
 * @dateTime 2017-01-24
 **/

var Team = require('../../database/team.db');
var Helper = require('../helper');

module.exports = {
    // 模块初始化
    init: function(app) {
        app.get('/teams', this.getAllItems)
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
                console.log(err)
                return res.send({
                    code: 500,
                    message: '出错了',
                })
            }
        })
    }
}
