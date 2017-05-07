/**
 * @desc 报名系统主页
 * @author Jafeney
 * @dateTime 2017-01-24
 **/

import React, { Component } from 'react'
import './style.less'

// redux
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { replace, push } from 'react-router-redux'
import pureRender from '../../mixins/pure-render.mix'
import { mapTypetoCategory } from '../../mixins/helper.mix'
import { getCookie } from '../../mixins/cookie.mix'

import Pagination from '../../components/pagenation/'
import Popup from '../../components/popup/'
import Loading from '../../components/loading'
import { setUserInfo, postUserInfo } from '../../redux/actions/user.action'
import { getAllMembers, deleteMember, editMember, exportExcel } from '../../redux/actions/member.action'

class Home extends Component {

    constructor(props) {
        super(props)
        this.pageSize = 5;
        this.userForm = {
            id: props.user.get('u_id'),
            name: props.user.get('u_name'),
            address: props.user.get('u_address'),
            linker: props.user.get('u_linker'),
            phone: props.user.get('u_phone'),
            email: props.user.get('u_email')
        }
        this.state = {
            dataSource: props.members.preload?props.members.items.slice(0, this.pageSize):[],
            memberForm: {},
        }
        this.memberForm = {}
        this.props.actions.postUserInfo({body: {id: getCookie({name: 'MATH_USER_INFO'})}})
    }

    componentDidMount() {
        const id = getCookie({name: 'MATH_USER_INFO'})
        this.props.actions.getAllMembers({
            success: () => {
                if (!this.props.user.get('u_linker')) this.refs.login.show()
            }
        })
    }

    componentWillReceiveProps(nextProps, nextState) {
        if (nextProps.members.preload) {
            this.setState({
                dataSource: nextProps.members.items.slice(0, this.pageSize)
            })
        }
    }

    handleFilter(id) {
        if (id !== 'all') {
            this.setState({
                dataSource: this.props.members.items.filter((item) => item[0].u_id === parseInt(id))
            })
        } else {
            this.setState({
                dataSource: this.props.members.items.slice(0, this.pageSize)
            })
        }
        this.refs.pagenation.pageInit()
    }

    handleChangePage(page) {
        this.page = page;
        let _start = (this.page-1)*this.pageSize, _end = this.page*this.pageSize;
        this.setState({
            dataSource: this.props.members.items.slice(_start, _end)
        })
    }

    handleShowEditModel(member) {
        this.refs.popup.show()
        this.memberForm = {
            id: member.m_id,
            name: member.m_name,
            IDCard: member.m_IDCard,
            code: member.m_code,
            college: member.m_college,
            major: member.m_major,
            grade: member.m_grade,
            phone: member.m_phone,
            email: member.m_email,
            isLeader: member.m_leader,
            teacher: member.t_teacher,
            t_phone: member.t_teacher_phone,
            category: member.t_type,
        }
        this.setState({
            memberForm: this.memberForm,
        })
    }

    handleEditItem() {
        this.refs.loading.show()
        this.props.actions.editMember({
            body: this.state.memberForm,
            success: () => {
                this.props.actions.getMembers({
                    body: {id:getCookie({name: 'MATH_USER_INFO'})},
                    success: () => {
                        setTimeout(()=>{
                            this.refs.loading.close()
                            this.refs.tips.show()
                            this.refs.popup.close()
                        },500)
                    },
                    error: (message) => {
                        alert(message)
                        this.refs.popup.close()
                    }
                })
            },
            error: (message) => {
                alert(message)
                this.refs.popup.close()
            }
        })
    }

    handleShowDelModel(member) {
        this.refs.delete.show()
        this.memberForm = {
            id: member.t_id,
        }
    }

    handleDeleteItem() {
        this.refs.loading.show()
        this.props.actions.deleteMember({
            body: this.memberForm,
            success: () => {
                this.refs.pagenation.pageInit()
                this.props.actions.getMembers({
                    body: {id:getCookie({name: 'MATH_USER_INFO'})},
                    success: () => {
                        setTimeout(()=>{
                            this.refs.loading.close()
                            this.refs.tips.show()
                            this.refs.delete.close()
                        },500)
                    },
                    error: (message) => {
                        alert(message)
                        this.refs.delete.close()
                    }
                })
            },
            error: (message) => {
                alert(message)
                this.refs.delete.close()
            }
        })
    }

    toSignup() {
        this.props.actions.replace('/m/signup')
    }

    handleExport() {
        let source = [];
        let _data = [];
        this.props.members.items.forEach((item) => {
          item.forEach((_item) => {
            _data.push(_item)
          })
        })
        this.refs.loading.show()
        _data.map((member)=>{
            source.push({
                "学校": member.u_name,
                "组号": member.t_id,
                "姓名": member.m_name,
                "身份证号码": member.m_IDCard,
                "学号": member.m_code,
                "学院名称": member.m_college,
                "专业": member.m_major,
                "年级": member.m_grade,
                "联系方式": member.m_phone,
                "邮箱": member.m_email,
                "队长": member.m_leader ? '队长': '',
                "指导老师": member.t_teacher,
                "指导老师电话": member.t_teacher_phone,
                "参数组别": mapTypetoCategory(member.t_type),
                "报名日期": member.t_time.substring(0,10)
            })
        })
        this.props.actions.exportExcel({
            body: {
                source: JSON.stringify(source)
            },
            success: (data) => {
                this.refs.export.close()
                this.refs.loading.close()
                this.refs.export_res.show()
                window.open('/data.xlsx')
            },
            error: (message) => {
                alert(message)
                this.refs.export.close()
                this.refs.loading.close()
            }
        })
    }

    handleChangeUserInfo() {
        this.refs.loading.show()
        console.log(this.userForm)
        this.props.actions.setUserInfo({
            body: this.userForm,
            success: () => {
                this.props.actions.postUserInfo({
                    body: {id: this.userForm.id} ,
                    success: () => {
                        setTimeout(()=>{
                            this.refs.loading.close()
                            this.refs.change.close()
                            this.refs.tips.show()
                        },500)
                    }
                })
            },
            error: (message) => {
                alert(message)
                this.refs.change.close()
            }
        })
    }

    _renderInfos(user) {
        return (
            <div className="infos">
                <h3>{user.get('u_name')}</h3>
                <span onClick={()=>this.refs.change.show()} className="btn-edit">修改</span>
                <p className="details">
                    <span>学校地址：{user.get('u_address')}</span>
                    <span style={{marginLeft: '30px'}}>联系方式：{user.get('u_linker')} </span>
                    <span style={{color: '#4990E2', textDecoration: 'underline'}}>{user.get('u_phone')}</span>
                    <span style={{color: '#F6A623', textDecoration: 'underline'}}>{user.get('u_email')}</span>
                </p>
                <Popup ref="change" title="基本信息" width="650px" height="420px" onConfirm={()=>this.handleChangeUserInfo()}>
                    <div className="change-password">
                        <div className="col">
                            <span>学校名称：</span>
                            <input onChange={(e)=>{this.userForm.name=e.target.value}} defaultValue={user.get('u_name')} type="text" style={{width:'480px'}} placeholder="请输入学校名称" className="input-password"/>
                        </div>
                        <div className="col">
                            <span>学校地址：</span>
                            <input onChange={(e)=>{this.userForm.address=e.target.value}} defaultValue={user.get('u_address')} type="text" style={{width:'480px'}} placeholder="请输入学校地址" className="input-password"/>
                        </div>
                        <div className="col">
                            <span>联系人：</span>
                            <input onChange={(e)=>{this.userForm.linker=e.target.value}} defaultValue={user.get('u_linker')} type="text" style={{width:'480px'}} placeholder="请输入联系人名称" className="input-password"/>
                        </div>
                        <div className="col">
                            <span>手机号码：</span>
                            <input onChange={(e)=>{this.userForm.phone=e.target.value}} defaultValue={user.get('u_phone')} type="phone" style={{width:'480px'}} placeholder="请输入联系人的手机号码" className="input-password"/>
                        </div>
                        <div className="col">
                            <span>电子邮箱：</span>
                            <input onChange={(e)=>{this.userForm.email=e.target.value}} defaultValue={user.get('u_email')} type="email" style={{width:'480px'}} placeholder="请输入联系人的电子邮箱" className="input-password"/>
                        </div>
                        <hr/>
                    </div>
                </Popup>
            </div>
        )
    }

    _renderDataList(members) {
        return (
            <div className="datalist">
                <table>
                    <thead>
                        <th>学校</th>
                        <th>组号</th>
                        <th>老师</th>
                        <th>参赛组别</th>
                        <th>姓名</th>
                        <th>身份证号码</th>
                        <th>学号</th>
                        <th>学院名称</th>
                        <th>专业</th>
                        <th>年级</th>
                        <th>联系方式</th>
                        <th>邮箱地址</th>
                    </thead>
                    <tbody>
                        {members.map((item)=> {
                            return item.map((_item, j) => {
                                if (j === 0) {
                                    return (
                                    <tr>
                                      <td rowSpan={item.length}>{_item.u_name}</td>
                                      <td rowSpan={item.length}>{_item.t_id}</td>
                                      <td rowSpan={item.length}>{_item.t_teacher}</td>
                                      <td rowSpan={item.length}>{mapTypetoCategory(_item.t_type)}</td>
                                      {/* <td rowSpan={item.length}>{_item.t_time.substring(0,10)}</td> */}
                                      <td>{_item.m_leader?(<svg className="icon" style={{width: '1em', height: '1em','verticalAlign': 'middle',fill: 'currentColor',overflow: 'hidden',color:'#f6a623'}} viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6485"><path d="M180.705882 59.958065C180.705882 26.84414 205.073557 11.076216 236.058133 25.160114L787.941864 276.016356C818.512071 289.911904 818.926441 312.252686 787.941864 326.336585L236.058133 577.192827C205.487929 591.088374 180.705882 574.905862 180.705882 542.394876L180.705882 59.958065ZM180.705882 60.235294l60.235294 0 0 963.764706-60.235294 0 0-963.764706Z" p-id="6486"></path></svg>):''} {item[j].m_name}</td>
                                      <td>{_item.m_IDCard}</td>
                                      <td>{_item.m_code}</td>
                                      <td>{_item.m_college}</td>
                                      <td>{_item.m_major}</td>
                                      <td>{_item.m_grade}</td>
                                      <td>{_item.m_phone}</td>
                                      <td>{_item.m_email}</td>
                                    </tr>
                                  )
                                } else {
                                    return (
                                    <tr>
                                      <td>{_item.m_leader?(<svg className="icon" style={{width: '1em', height: '1em','verticalAlign': 'middle',fill: 'currentColor',overflow: 'hidden',color:'#f6a623'}} viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6485"><path d="M180.705882 59.958065C180.705882 26.84414 205.073557 11.076216 236.058133 25.160114L787.941864 276.016356C818.512071 289.911904 818.926441 312.252686 787.941864 326.336585L236.058133 577.192827C205.487929 591.088374 180.705882 574.905862 180.705882 542.394876L180.705882 59.958065ZM180.705882 60.235294l60.235294 0 0 963.764706-60.235294 0 0-963.764706Z" p-id="6486"></path></svg>):''} {item[j].m_name}</td>
                                      <td>{_item.m_IDCard}</td>
                                      <td>{_item.m_code}</td>
                                      <td>{_item.m_college}</td>
                                      <td>{_item.m_major}</td>
                                      <td>{_item.m_grade}</td>
                                      <td>{_item.m_phone}</td>
                                      <td>{_item.m_email}</td>
                                    </tr>
                                  )
                                }
                            })
                          })
                        }
                    </tbody>
                </table>
            </div>
        )
    }

    render() {
        let error = this.props.members.preload;
        if (!error) return (<Loading />)
        let { user } = this.props;
        let { memberForm } = this.state;
        let schools = []
        if (this.props.users.get('preload')) {
            schools.push({u_id: 'all', u_name: '显示全部'})
            this.props.users.get('items').map((item) => {
                schools.push({ u_id: item.get('u_id'), u_name: item.get('u_name') })
            })
        }
        return (
            <div>
                {this._renderInfos(user)}
                <div className="data-view">
                    <div className="title">
                        <span>当前报名</span>
                        <select onChange={(e)=>this.handleFilter(e.target.value)} className="select">
                            {schools.map((item)=>(<option value={item.u_id}>{item.u_name}</option>))}
                        </select>
                    </div>
                    {this._renderDataList(this.state.dataSource)}
                    <div style={{height: '62px'}}>
                        <span onClick={()=>this.refs.export.show()} className="btn-export">导出报名数据</span>
                        <Pagination ref="pagenation" totalPage={Math.ceil(this.props.members.items.length/this.pageSize)} wrapStyle={{marginRight:'10px',marginBottom:'10px',marginTop: '-10px'}} selectPage={(page)=>this.handleChangePage(page)} pageSpace={3}/>
                    </div>
                </div>
                <Popup ref="popup" onConfirm={()=>this.handleEditItem()} title="修改队员信息" width="760px" height="380px">
                    <div className="edit-form">
                        {/* <div className="row">
                            <div className="col">
                                <span>参赛组别：</span>
                                <select value={memberForm.category} onChange={(e)=>this.setState({memberForm: {...this.state.memberForm, category: e.target.value}})}>
                                    <option value={100}>医学本科组</option>
                                    <option value={200}>医学专科组</option>
                                    <option value={300}>非医学专业组</option>
                                    <option value={400}>非医学专科组</option>
                                </select>
                            </div>
                            <div className="col">
                                <span>设为队长：</span>
                                <select value={memberForm.isLoader} onChange={(e)=>this.setState({memberForm: {...this.state.memberForm, isLoader: e.target.value}})}>
                                    <option value={1}>是</option>
                                    <option value={0}>否</option>
                                </select>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <span>指导老师：</span>
                                <input type="text" value={memberForm.teacher} onChange={(e)=>this.setState({memberForm: {...this.state.memberForm, teacher: e.target.value}})} placeholder="请输入指导老师的姓名" className="input-text"/>
                            </div>
                            <div className="col">
                                <span>联系方式：</span>
                                <input type="text" value={memberForm.t_phone} onChange={(e)=>this.setState({memberForm: {...this.state.memberForm, t_phone: e.target.value}})} placeholder="请输入指导老师的手机号码" className="input-text"/>
                            </div>
                        </div> */}
                        <div className="row">
                            <div className="col">
                                <span>真实姓名</span>
                                <input type="text" value={memberForm.name} onChange={(e)=>this.setState({memberForm: {...this.state.memberForm, name: e.target.value}})} placeholder="请输入队员的真实姓名" className="input-text"/>
                            </div>
                            <div className="col">
                                <span>专业全称</span>
                                <input type="text" value={memberForm.major} onChange={(e)=>this.setState({memberForm: {...this.state.memberForm, major: e.target.value}})} placeholder="请输入队员所在专业的全称" className="input-text"/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <span>身份证号</span>
                                <input type="text" value={memberForm.IDCard} onChange={(e)=>this.setState({memberForm: {...this.state.memberForm, IDCard: e.target.value}})} placeholder="请输入队员的身份证号" className="input-text"/>
                            </div>
                            <div className="col">
                                <span>所在年级</span>
                                <input type="text" value={memberForm.grade} onChange={(e)=>this.setState({memberForm: {...this.state.memberForm, grade: e.target.value}})} placeholder="请输入队员的所在年级" className="input-text"/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <span>在校学号</span>
                                <input type="text" value={memberForm.code} onChange={(e)=>this.setState({memberForm: {...this.state.memberForm, code: e.target.value}})} placeholder="请输入队员的在校学号" className="input-text"/>
                            </div>
                            <div className="col">
                                <span>手机号码</span>
                                <input type="text" value={memberForm.phone} onChange={(e)=>this.setState({memberForm: {...this.state.memberForm, phone: e.target.value}})} placeholder="请输入队员的手机号码" className="input-text"/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <span>学院全称</span>
                                <input type="text" value={memberForm.college} onChange={(e)=>this.setState({memberForm: {...this.state.memberForm, college: e.target.value}})} placeholder="请输入队员所在学校的全称" className="input-text"/>
                            </div>
                            <div className="col">
                                <span>邮箱地址</span>
                                <input type="text" value={memberForm.email} onChange={(e)=>this.setState({memberForm: {...this.state.memberForm, email: e.target.value}})} placeholder="请输入队员的邮箱地址" className="input-text"/>
                            </div>
                        </div>
                        <hr/>
                    </div>
                </Popup>
                <Popup onConfirm={()=>this.handleDeleteItem()} ref="delete" title="温馨提示" width="550px" height="180px">
                    <p style={{color: '#666',marginLeft: '15px',fontSize:'12px'}}>确定要删除该队伍吗？</p>
                </Popup>
                <Popup ref="delete_tip" title="温馨提示" hideFooter={true} width="550px" height="120px">
                    <p style={{color: '#666',marginLeft: '15px',fontSize:'12px'}}>注意！不能删除队长，如需删除请先将其设为普通队员</p>
                </Popup>
                <Popup ref="tips" title="温馨提示" hideFooter={true} width="550px" height="120px">
                    <p style={{color: '#666',marginLeft: '15px',fontSize:'12px'}}>恭喜！操作成功</p>
                </Popup>
                <Popup onConfirm={()=>this.handleExport()} ref="export" title="导出Excel" width="550px" height="180px">
                    <p style={{color: '#666',marginLeft: '15px',fontSize:'12px'}}>您确定要导出报名数据为Excel吗？</p>
                </Popup>
                <Popup ref="export_res" title="温馨提示" hideFooter={true} width="550px" height="120px">
                    <p style={{color: '#666',marginLeft: '15px',fontSize:'12px'}}>
                    恭喜！导出成功
                    <a style={{float: 'right', marginRight: '20px'}} href='/data.xlsx'>手动下载</a>
                    </p>
                </Popup>
                <Popup ref="login" title="完善您的账号信息" onConfirm={()=>{this.refs.login.close();this.refs.change.show()}} width="635px" height='200px'>
                    <div className="content-box">
                        <p style={{fontSize: '13px',color: '#888',padding: '10px 20px'}}>欢迎登录中国大学生医药数学建模报名系统，请点击确定完善您的账号信息！</p>
                    </div>
                </Popup>
                <Loading show={true} ref="loading" />
            </div>
        )
    }

}

function mapStateToProps(state) {
    return {
        user: state.user,
        users: state.users,
        members: state.members
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({ replace, setUserInfo, postUserInfo, getAllMembers, deleteMember, editMember, exportExcel }, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
