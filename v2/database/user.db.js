/**
 * @desc 用户 数据模型
 * @author Jafeney <692270687@qq.com>
 * @dateTime 2017-01-11
 **/

var mysql = require('mysql'),
    helper = require('../routes/helper'),
    config = require('./config.db');

var con = mysql.createConnection(config);

/*用户模块 构造方法*/
var User = function(user) {
    this.props = user.props
};

/*获取全部用户的名称和ID*/
User.prototype.getAllItems = function(callback) {
    var _sql = "select u_id,u_name from user where u_del=0 and u_role=100";
    helper.db_query({
        connect: con,
        sql: _sql,
        name: 'getAllItems',
        callback: callback
    })
}

/*登录验证*/
User.prototype.getItemByIdPassword = function(callback) {
    var _sql = `select u_id,u_name,u_role,u_linker,u_phone,u_email,u_address from user where u_del=0 and u_id='${this.props.id}' and u_password='${this.props.password}'`;
    helper.db_query({
        connect: con,
        sql: _sql,
        name: 'getItemByIdPassword',
        callback: callback
    })
}

/*获取用户信息*/
User.prototype.getItemById = function(callback) {
    var _sql = `select u_id,u_name,u_role,u_linker,u_phone,u_email,u_address from user where u_del=0 and u_id='${this.props.id}'`;
    helper.db_query({
        connect: con,
        sql: _sql,
        name: 'getItemById',
        callback: callback
    })
}

/*修改用户登录密码*/
User.prototype.putPassword = function(callback) {
    var _sql = `update user set u_password = '${this.props.new_password}' where u_id = ${this.props.id}`;
    helper.db_query({
        connect: con,
        sql: _sql,
        name: 'putPassword',
        callback: callback
    })
}

/*修改用户信息*/
User.prototype.putUserInfo = function(callback) {
    var _sql = `update user set u_name = '${this.props.name}', u_address = '${this.props.address}', u_linker = '${this.props.linker}', u_phone = '${this.props.phone}', u_email = '${this.props.email}' where u_id = ${this.props.id}`;
    helper.db_query({
        connect: con,
        sql: _sql,
        name: 'putUserInfo',
        callback: callback
    })
}

module.exports = User
