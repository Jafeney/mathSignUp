/**
 * @desc 报名系统主页容器
 * @author Jafeney
 * @dateTime 2017-01-24
 **/

import React, { Component } from 'react'
import './style.less'

// redux
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { replace, push } from 'react-router-redux'
import { logout, check, postUserInfo, changePassword, testPassword } from '../../redux/actions/user.action'

import pureRender from '../../mixins/pure-render.mix'
import Loading from '../../components/loading'
import Popup from '../../components/popup/'

class Main extends Component {

    constructor(props) {
        super(props)
        this.navList = [['我的主页','home','My HomePage']]
        let href = location.href.split('?')[0];
        let route = href.split('/')[href.split('/').length-1];
        this.state = {
            nav: this.navList.find((item)=>item[1]===route),
            dropdown: false,
        }
        this.close = this.close.bind(this)
    }

    componentDidMount() {
        this.props.actions.check({
            success: (id) => {
                this.props.actions.postUserInfo({body: {id: id}})
            },
            fail: () => {
                this.props.actions.replace('/')
            }
        })
    }

    componentWillReceiveProps(nextProps, nextState) {
        if (nextProps !== this.props) {
            let href = location.href.split('?')[0];
            let route = href.split('/')[href.split('/').length-1];
            this.state = {
                nav: this.navList.find((item)=>item[1]===route),
            }
        }
    }

    handleLogout() {
        this.props.actions.logout({
            success: () => {
                this.props.actions.replace('/')
            }
        })
    }

    handleTestPwd() {
        this.props.actions.testPassword({
            body: { id: this.props.user.get('u_id'), password: this.state.oldPwd },
            success: () => {
                this.setState({oldFail: false})
            },
            error: () => {
                this.setState({oldFail: true})
            }
        })
    }

    handleChangePwd() {
        this.refs.loading.show()
        if ((this.state.newPwd === this.state.rePwd)
            && (/^[0-9A-Za-z]{6,20}$/.test(this.state.newPwd))
            && this.state.oldPwd && !this.state.oldFail) {
            let body = { id: this.props.user.get('u_id'), new_password: this.state.newPwd };
            this.props.actions.changePassword({
                body: body,
                success: () => {
                    setTimeout(()=>{
                        this.refs.loading.close()
                        this.refs.change.close()
                        this.refs.tips.show()
                    }, 500)
                },
                fail: () => {
                    this.refs.change.close()
                }
            })
        }
    }

    handleSwitch(nav) {
        this.setState({
            nav: nav
        }, ()=> {
            this.props.actions.replace(`/m/${nav[1]}`)
        })
    }

    toggleDropdown() {
        this.setState({dropdown: !this.state.dropdown})
    }

    _renderNavbar() {
        return this.navList.map((item) =>
            <li onClick={()=>this.handleSwitch(item)}
                className={`nav-${item[1]} ${this.state.nav===item?'active':''}`}>
                {item[0]}
                <span className="caret"></span>
            </li>
        )
    }

    render() {
        let error = pureRender(this.props.user);
        if (!error) return (<Loading />)
        return (
            <div className="wrapper">
                <div className="navbar">
                    <h2 className="logo">管理系统</h2>
                    <ul className="nav-list">
                        {this._renderNavbar()}
                    </ul>
                </div>
                <div className="container">
                    <div className="topbar">
                        <div className="user-info">
                            <span onClick={()=>this.toggleDropdown()}>欢迎您！{this.props.user.get('u_name')}<span className={this.state.dropdown?"icon-down active":"icon-down"}></span></span>
                            <ul className={this.state.dropdown?"down-list active":"down-list"}>
                                <li onClick={()=>this.refs.change.show()} className="edit">修改密码</li>
                                <li onClick={()=>this.handleLogout()} className="logout">注销登录</li>
                            </ul>
                        </div>
                    </div>
                    <div className="lead">
                        <h2>{this.state.nav[0]} <span style={{position:'relative',top:'2px'}}>/&nbsp;{this.state.nav[2]}</span></h2>
                    </div>
                    <div className="mainer">{this.props.children}</div>
                </div>
                <Popup ref="change" title="修改密码" width="650px" height="320px" onConfirm={()=>this.handleChangePwd()}>
                    <div className="change-password">
                        <div className="col">
                            <span>旧的密码：</span>
                            <input onBlur={()=>this.handleTestPwd()} onChange={(e)=>{this.setState({oldPwd: e.target.value})}} type="password" placeholder="请输入旧的密码" className="input-password"/>
                            {this.state.oldFail?(<label>原始密码不正确</label>):null}
                        </div>
                        <div className="col">
                            <span>新的密码：</span>
                            <input onChange={(e)=>{this.setState({newPwd: e.target.value})}} type="password" placeholder="请输入新的密码" className="input-password"/>
                            {/^[0-9A-Za-z]{6,20}$/.test(this.state.newPwd)?null:(<label>密码不符合要求</label>)}
                        </div>
                        <div className="col">
                            <span>再次输入：</span>
                            <input onChange={(e)=>{this.setState({rePwd: e.target.value})}} type="password" placeholder="再次输入新的密码" className="input-password"/>
                            {this.state.newPwd !== this.state.rePwd?(<label>两次输入不一致</label>):null}
                        </div>
                        <hr/>
                    </div>
                </Popup>
                <Popup ref="tips" title="温馨提示" hideFooter={true} width="550px" height="120px">
                    <p style={{color: '#666',marginLeft: '15px',fontSize:'12px'}}>恭喜！您的密码已成功修改</p>
                </Popup>
                <Loading show={true} ref="loading" />
            </div>
        )
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.dropdown !== this.state.dropdown) {
            if (this.state.dropdown) {
                document.addEventListener('click', this.close);
            } else {
                document.removeEventListener('click', this.close);
            }
        }
    }

    componentWillUnmount() {
        if (this.state.dropdown) {
            document.removeEventListener('click', this.close);
        }
    }

    close() {
        this.setState({dropdown: false})
    }
}

function mapStateToProps(state) {
    return {
        user: state.user
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            replace, logout, check, postUserInfo, changePassword, testPassword
        }, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main)
