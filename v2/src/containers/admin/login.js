/**
 * @desc 报名系统登录页面
 * @author Jafeney
 * @dateTime 2017-01-24
 **/

import React, { Component } from 'react'
import './style.less'

import Popup from '../../components/popup/'
import Loading from '../../components/loading'

// redux
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { replace } from 'react-router-redux'
import { getUsers, login, check } from '../../redux/actions/user.action'
import pureRender from '../../mixins/pure-render.mix'
import { addCookie } from '../../mixins/cookie.mix'

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            autoLogin: false,
            password: '',
            id: 1,
        }
    }

    toggleAutoLogin() {
        this.setState({
            autoLogin: !this.state.autoLogin
        })
    }

    handleShowModel() {
        this.refs.popup.show()
    }

    handleLogin() {
        let form = {id: this.state.id, password: this.state.password};
        this.props.actions.login({
            body: form,
            success: (data) => {
                if (data.length) {
                    if (this.state.autoLogin) {
                        addCookie({
                            name: 'MATH_USER_INFO',
                            value: data[0].u_id,
                            expiresHours: 24*7,  // 自动登录有效时间为7天
                        })
                    } else {
                        addCookie({
                            name: 'MATH_USER_INFO',
                            value: data[0].u_id,
                            expiresHours: 3,  // 默认有限时间为3个小时
                        })
                    }
                    this.props.actions.replace('/m/home')
                }
            },
            error: (message) => {
                this.refs.tips.show()
            }
        })

    }

    render() {
        let error = pureRender(this.props.users);
        if (!error) return (<Loading />)
        let users = this.props.users.get('items');
        return (
            <div className="login-wrapper">
                <div className="login-body">
                    <h2>医药数学建模报名管理系统</h2>
                    <div className="login-form">
                        <h3>您好，请先登录！</h3>
                        <div className="input">
                            <input onChange={(e)=>{this.setState({password: e.target.value})}} type="text" placeholder="请输入用户名" />
                        </div>
                        <div className="input" style={{marginTop: '15px'}}>
                            <input onChange={(e)=>{this.setState({password: e.target.value})}} type="password" placeholder="请输入登录密码" />
                        </div>
                        <div className="row">
                            <div className="checkbox" onClick={()=>this.toggleAutoLogin()}>
                                <span className={this.state.autoLogin?"check-control checked":"check-control"}></span>
                                <span>下次自动登录</span>
                            </div>
                            <div onClick={()=>this.handleLogin()} className="form-submit">
                                <span>登录账号</span>
                            </div>
                        </div>
                        {/* <p onClick={()=>this.handleShowModel()} className="forget">忘记密码？</p> */}
                        <p style={{color: '#ccc', padding: '5px 20px', fontSize: '12px'}}>初始登录密码：121212</p>
                    </div>
                </div>
                {/* <Popup ref="popup" title="忘记密码" width="635px" height='300px'>
                    <div className="content-box">
                        <p>我们提供以下2种方式帮您找回密码：</p>
                        <p>1. 请直接电话联系管理员 15968810223</p>
                        <p>2. 发送邮件 “您的学校名称+忘记密码” 至 692270687@qq.com</p>
                    </div>
                </Popup> */}
                <Popup ref="tips" title="温馨提示" hideFooter={true} width="550px" height="120px">
                    <p style={{color: '#666',marginLeft: '15px',fontSize:'12px'}}>用户名或者密码不正确！</p>
                </Popup>
            </div>
        )
    }

    componentDidMount() {
        this.props.actions.check({
            success: () => {
                this.props.actions.replace('/m/home')
            },
            fail: () => {
                this.props.actions.getUsers({})
            }
        })
    }
}

function mapStateToProps(state) {
    return {
        users: state.users
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({ replace, getUsers, login, check }, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
