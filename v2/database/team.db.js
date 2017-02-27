/**
 * @desc 队伍 数据模型
 * @author Jafeney <692270687@qq.com>
 * @dateTime 2017-01-25
 **/

var mysql = require('mysql'),
    helper = require('../routes/helper'),
    config = require('./config.db');

var con = mysql.createConnection(config);

/*用户模块 构造方法*/
var Team = function(team) {
    this.props = team.props
};

/*获取全部数据,正式上线时请关闭*/
Team.prototype.getAllItems = function(callback) {
    var _sql = "select * from team where t_del=0";
    helper.db_query({
        connect: con,
        sql: _sql,
        name: 'getAllItems',
        callback: callback
    })
}

/*根据ID获取队伍信息*/
Team.prototype.getItemById = function(callback) {
    var _sql = `select * from team where t_del=0 and t_id=${this.props.id}`;
    helper.db_query({
        connect: con,
        sql: _sql,
        name: 'getItemById',
        callback: callback
    })
}

/*添加队伍*/
Team.prototype.addItem = function(callback) {
    var _sql = `insert into team (t_type,t_teacher,t_teacher_phone,u_id) values (${this.props.category},'${this.props.teacher}','${this.props.t_phone}',${this.props.u_id})`;
    helper.db_query({
        connect: con,
        sql: _sql,
        name: 'addItem',
        callback: callback
    })
}

module.exports = Team
