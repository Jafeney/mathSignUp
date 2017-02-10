/**
 * @desc 队员 数据模型
 * @author Jafeney <692270687@qq.com>
 * @dateTime 2017-01-25
 **/

var mysql = require('mysql'),
    helper = require('../routes/helper'),
    config = require('./config.db');

var con = mysql.createConnection(config);

/*用户模块 构造方法*/
var Member = function(member) {
    this.props = member.props
};

/*获取全部数据,正式上线时请关闭*/
Member.prototype.getAllItems = function(callback) {
    var _sql = `select * from member,team where member.t_id=team.t_id and m_del=0`;
    helper.db_query({
        connect: con,
        sql: _sql,
        name: 'getAllItems',
        callback: callback
    })
}

/*获取全部数据,正式上线时请关闭*/
Member.prototype.getAllItemsById = function(callback) {
    var _sql = `select * from member,team where member.t_id=team.t_id and m_del=0 and team.u_id = ${this.props.id}`;
    helper.db_query({
        connect: con,
        sql: _sql,
        name: 'getAllItemsById',
        callback: callback
    })
}

/*删除成员*/
Member.prototype.deleteItemById = function(callback) {
    var _sql = `update member set m_del = 1 where m_id = ${this.props.id}`;
    helper.db_query({
        connect: con,
        sql: _sql,
        name: 'deleteItemById',
        callback: callback
    })
}

/*编辑成员信息*/
Member.prototype.putItemById = function(callback) {
    var _sql = `update member set m_name='${this.props.name}',m_IDCard='${this.props.IDCard}',m_code='${this.props.code}',m_college='${this.props.college}',m_major='${this.props.major}',m_grade='${this.props.grade}',m_phone='${this.props.phone}',m_email='${this.props.email}',m_leader=${this.props.isLeader}`;
    helper.db_query({
        connect: con,
        sql: _sql,
        name: 'putItemById',
        callback: callback
    })
}

module.exports = Member
