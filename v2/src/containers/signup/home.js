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
import { getMembers, deleteMember, editMember } from '../../redux/actions/member.action'

class Home extends Component {

    constructor(props) {
        super(props)
        this.pageSize = 10;
        this.userForm = {
            id: props.user.get('u_id'),
            name: props.user.get('u_name'),
            address: props.user.get('u_address'),
            linker: props.user.get('u_linker'),
            phone: props.user.get('u_phone'),
            email: props.user.get('u_email')
        }
        this.state = {
            dataSource: props.members.get('preload')?props.members.get('items').slice(0, this.pageSize):[],
            memberForm: {},
        }
        this.memberForm = {}
    }

    componentDidMount() {
        this.props.actions.getMembers({body:{id:getCookie({name: 'MATH_USER_INFO'})}})
    }

    componentWillReceiveProps(nextProps, nextState) {
        if (nextProps.members.get('preload')) {
            this.setState({
                dataSource: nextProps.members.get('items').slice(0, this.pageSize)
            })
        }
    }

    handleChangePage(page) {
        this.page = page;
        let _start = (this.page-1)*this.pageSize, _end = this.page*this.pageSize;
        this.setState({
            dataSource: this.props.members.get('items').slice(_start, _end)
        })
    }

    handleShowEditModel(member) {
        this.refs.popup.show()
        this.memberForm = {
            id: member.get('m_id'),
            name: member.get('m_name'),
            IDCard: member.get('m_IDCard'),
            code: member.get('m_code'),
            college: member.get('m_college'),
            major: member.get('m_major'),
            grade: member.get('m_grade'),
            phone: member.get('m_phone'),
            email: member.get('m_email'),
            isLoader: member.get('m_leader'),
            teacher: member.get('t_teacher'),
            t_phone: member.get('t_teacher_phone'),
            category: member.get('t_type'),
        }
        this.setState({
            memberForm: this.memberForm,
        })
    }

    handleEditItem() {
        console.log(this.memberForm)
    }

    handleShowDelModel(member) {
        this.refs.delete.show()
        this.memberForm = {
            id: member.get('m_id'),
            isLoader: member.get('m_leader'),
        }
    }

    handleDeleteItem() {
        if (this.memberForm.isLoader) {
            this.refs.delete.close()
            this.refs.delete_tip.show()
        } else {
            this.props.actions.deleteMember({
                body: this.memberForm,
                success: () => {
                    this.props.actions.getMembers({
                        body: {id:getCookie({name: 'MATH_USER_INFO'})},
                        success: () => {
                            this.refs.tips.show()
                            this.refs.delete.close()
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
    }

    toSignup() {
        this.props.actions.replace('/m/signup')
    }

    handleChangeUserInfo() {
        this.props.actions.setUserInfo({
            body: this.userForm,
            success: () => {
                this.props.actions.postUserInfo({
                    body: {id: this.userForm.id} ,
                    success: () => {
                        this.refs.change.close()
                        this.refs.tips.show()
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
                <Popup ref="change" title="修改信息" width="650px" height="420px" onConfirm={()=>this.handleChangeUserInfo()}>
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
                        <th>组号</th>
                        <th>姓名</th>
                        <th>身份证号码</th>
                        <th>学号</th>
                        <th>学院名称</th>
                        <th>专业</th>
                        <th>年级</th>
                        <th>联系方式</th>
                        <th>邮箱地址</th>
                        <th>老师</th>
                        <th>参赛组别</th>
                        <th>操作</th>
                    </thead>
                    <tbody>
                        {members.map((item)=>(
                            <tr>
                                <td>00{item.get('t_id')}</td>
                                <td>{item.get('m_leader')?(<svg className="icon" style={{width: '1em', height: '1em','verticalAlign': 'middle',fill: 'currentColor',overflow: 'hidden',color:'#f6a623'}} viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6485"><path d="M180.705882 59.958065C180.705882 26.84414 205.073557 11.076216 236.058133 25.160114L787.941864 276.016356C818.512071 289.911904 818.926441 312.252686 787.941864 326.336585L236.058133 577.192827C205.487929 591.088374 180.705882 574.905862 180.705882 542.394876L180.705882 59.958065ZM180.705882 60.235294l60.235294 0 0 963.764706-60.235294 0 0-963.764706Z" p-id="6486"></path></svg>):''} {item.get('m_name')}</td>
                                <td>{item.get('m_IDCard')}</td>
                                <td>{item.get('m_code')}</td>
                                <td>{item.get('m_college')}</td>
                                <td>{item.get('m_major')}</td>
                                <td>{item.get('m_grade')}</td>
                                <td>{item.get('m_phone')}</td>
                                <td>{item.get('m_email')}</td>
                                <td>{item.get('t_teacher')}</td>
                                <td>{mapTypetoCategory(item.get('t_type'))}</td>
                                <td>
                                    <a href="javascript:;" title="编辑" onClick={()=>this.handleShowEditModel(item)} className="btn-edit">
                                        <svg className="icon" style={{width: '1em', height: '1em', verticalAlign: 'middle',fill: 'currentColor',overflow: 'hidden'}} viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3691"><path d="M1024 300.748891l-602.406389 602.406389-300.748891-300.748891 602.406389-602.406389zM0 723.251109l300.748891 300.748891-300.748891 0 0-300.748891z" p-id="3692"></path></svg>
                                    </a>
                                    <a href="javascript:;" title="删除" onClick={()=>this.handleShowDelModel(item)} className="btn-del">
                                        <svg class="icon" style={{width: '1em', height: '1em',verticalAlign: 'middle',fill: 'currentColor',overflow: 'hidden'}} viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4853"><path d="M640.512 256 640.512 128 382.464 128 382.464 256 192 256 192 320 832 320 832 256ZM256 896l512 0L768 384 256 384 256 896zM576 512l64 0 0 256-64 0L576 512zM384 512l64 0 0 256-64 0L384 512z" p-id="4854"></path></svg>
                                    </a></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        )
    }

    render() {
        let error = pureRender(this.props.members);
        if (!error) return (<Loading />)
        let { user } = this.props;
        let { memberForm } = this.state;
        return (
            <div>
                {this._renderInfos(user)}
                <div className="data-view">
                    <div className="title">
                        <span>我的报名</span>
                        <span onClick={()=>this.toSignup()} className="btn-signup">+ 报名</span>
                    </div>
                    {this._renderDataList(this.state.dataSource)}
                    <div style={{height: '62px'}}>
                        <span className="btn-export">导出报名数据</span>
                        <Pagination totalPage={Math.ceil(this.props.members.get('items').size/this.pageSize)} wrapStyle={{marginRight:'10px',marginBottom:'10px',marginTop: '-10px'}} selectPage={(page)=>this.handleChangePage(page)} pageSpace={3}/>
                    </div>
                </div>
                <Popup ref="popup" onConfirm={()=>this.handleEditItem()} title="编辑信息" width="760px" height="490px">
                    <div className="edit-form">
                        <div className="row">
                            <div className="col">
                                <span>参赛组别：</span>
                                <select defaultValue={memberForm.category} onChange={(e)=>this.memberForm.category=e.target.value}>
                                    <option value={100}>非医学专业组</option>
                                    <option value={200}>医学本科组</option>
                                    <option value={300}>医学专科组</option>
                                </select>
                            </div>
                            <div className="col">
                                <span>设为队长：</span>
                                <select defaultValue={memberForm.isLoader} onChange={(e)=>this.memberForm.isLoader=e.target.value}>
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
                        </div>
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
                <Popup onConfirm={()=>this.handleDeleteItem()} ref="delete" title="编辑信息" width="550px" height="180px">
                    <p style={{color: '#666',marginLeft: '15px',fontSize:'12px'}}>确定要删除该成员吗？</p>
                </Popup>
                <Popup ref="delete_tip" title="温馨提示" hideFooter={true} width="550px" height="120px">
                    <p style={{color: '#666',marginLeft: '15px',fontSize:'12px'}}>注意！不能删除队长，如需删除请先将其设为普通队员</p>
                </Popup>
                <Popup ref="tips" title="温馨提示" hideFooter={true} width="550px" height="120px">
                    <p style={{color: '#666',marginLeft: '15px',fontSize:'12px'}}>恭喜！操作成功</p>
                </Popup>
            </div>
        )
    }

}

function mapStateToProps(state) {
    return {
        user: state.user,
        members: state.members
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({ replace, setUserInfo, postUserInfo, getMembers, deleteMember, deleteMember }, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
