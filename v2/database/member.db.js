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
    var _sql = `select * from member, team, user where member.t_id=team.t_id and team.u_id=user.u_id and member.m_del=0 and user.u_role=100`;
    helper.db_query({
        connect: con,
        sql: _sql,
        name: 'getAllItems',
        callback: callback
    })
}

/*获取全部数据,正式上线时请关闭*/
Member.prototype.getAllItemsById = function(callback) {
    var _sql = `select * from member, team where member.t_id=team.t_id and member.m_del=0 and team.t_del=0 and team.u_id = ${this.props.id}`;
    helper.db_query({
        connect: con,
        sql: _sql,
        name: 'getAllItemsById',
        callback: callback
    })
}

/*删除成员*/
Member.prototype.deleteItemById = function(callback) {
    var _sql = `update member set m_del = 1 where t_id = ${this.props.id}`;
    helper.db_query({
        connect: con,
        sql: _sql,
        name: 'deleteItemById',
        callback: callback
    })
}

/*编辑成员信息*/
Member.prototype.putItemById = function(callback) {
    var _sql = `update member set m_name='${this.props.name}',m_IDCard='${this.props.IDCard}',m_code='${this.props.code}',m_college='${this.props.college}',m_major='${this.props.major}',m_grade='${this.props.grade}',m_phone='${this.props.phone}',m_email='${this.props.email}',m_leader=${this.props.isLeader} where m_id=${this.props.id}`;
    helper.db_query({
        connect: con,
        sql: _sql,
        name: 'putItemById',
        callback: callback
    })
}

/*添加成员*/
Member.prototype.addItemByTeam = function(callback) {
    var tid = this.props.tid;
    var promises = this.props.items.map(function(item) {
        insertItem(item, tid)
    });
    Promise.all(promises)
        .then(function(data) {
            callback && callback(data)
        })
        .catch(function(err) {
            console.log(err)
        })
}

var insertItem = function(data,tid) {
    return new Promise(function(resolve, reject) {
        var _sql = `insert into member (m_name, m_IDCard, m_code, m_college, m_major, m_grade, m_phone, m_email, t_id, m_leader) values ('${data.name}','${data.IDCard}', '${data.code}', '${data.college}','${data.major}','${data.grade}','${data.phone}','${data.email}',${tid},${data.isLeader || 0})`;
        con.query(_sql, function(err, res) {
            if (err) {
                reject(err)
            } else {
                resolve(res)
            }
        });
    })
}


module.exports = Member
