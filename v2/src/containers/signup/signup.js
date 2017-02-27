/**
 * @desc 报名系统-马上报名
 * @author Jafeney
 * @dateTime 2017-01-24
 **/

import React, { Component } from 'react'
import './style.less'

// redux
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { replace, push } from 'react-router-redux'
import { signup } from '../../redux/actions/member.action'
import { mapTypetoCategory } from '../../mixins/helper.mix'

import Loading from '../../components/loading'
import Popup from '../../components/popup/'

class Signup extends Component {

    constructor(props) {
        super(props)
        this.state = {
            tabs: [['队长','lead'], ['队员1','part1']],
            actived: 'lead',
            form: {
                u_id: this.props.user.get('u_id'),
                school: props.user.get('u_name'),
                category: 100,
                teacher: '',
                t_phone: '',
                items: [],
            }
        }
        this.formHead = {
            u_id: this.props.user.get('u_id'),
            school: props.user.get('u_name'),
            category: 100,
            teacher: '',
            t_phone: ''
        }
        this.formItems = [{},{},{}]
    }

    handleAddItem() {
        let length = this.state.tabs.length, tabs = this.state.tabs;
        if (length === 3) {
            this.refs.add.show()
        } else {
            tabs.push([`队员${length}`,`part${length}`])
            this.setState({
                tabs: tabs,
                actived: tabs[tabs.length-1][1]
            })
        }
    }

    handleInit() {
        this.setState({
            tabs: [['队长','lead'], ['队员1','part1']],
            actived: 'lead',
            form: {
                u_id: this.props.user.get('u_id'),
                school: this.props.user.get('u_name'),
                category: 100,
                teacher: '',
                t_phone: '',
                items: [],
            }
        })
        this.formHead = {
            u_id: this.props.user.get('u_id'),
            school: this.props.user.get('u_name'),
            category: 100,
            teacher: '',
            t_phone: ''
        }
        this.formItems = [{},{},{}]
    }

    handleRemoveItem(part, i) {
        if (part === 'lead') {
            this.refs.delete.show()
        } else {
            let tabs = this.state.tabs.filter((item)=>item[1]!==part);
            if (tabs.length === 2) { tabs[1] = ['队员1','part1'] }
            this.formItems[i] = {}
            this.setState({
                tabs: tabs,
                actived: tabs[tabs.length-1][1]
            })
        }
    }

    handleConfirm() {
        this.setState({
            form: {...this.formHead, items: this.formItems}
        }, ()=>{
            this.refs.submit.setHeight(this.state.tabs.length*150 + 200)
            this.refs.submit.show()
        })
    }

    handleSubmit() {
        this.refs.loading.show()
        this.props.actions.signup({
            body: { ...this.state.form, items: JSON.stringify(this.state.form.items)},
            success: (data) => {
                setTimeout(()=>{
                    this.refs.submit.close()
                    this.refs.tips.show()
                    this.handleInit()
                    this.refs.loading.close()
                }, 500)
            },
            error: (message) => {
                this.refs.submit.close()
                this.refs.loading.close()
            }
        })
    }

    _renderRules() {
        return (
            <div className="cbox">
                <div className="title"><h3>报名规则<span style={{fontSize:12,marginLeft: 10}}>(2017春)</span></h3></div>
                <div className="content">
                    <p>本系统由中国大学生医药数学建模协会监制，请按照要求填写队伍和队员信息，并遵循以下要求：</p>
                    <ul className="rules">
                        <li>1. 每次只能录入一个队伍的信息，请认真填写每个队伍的所有成员的具体内容。</li>
                        <li>2. 每个队伍可以由1～3人组成，有且只有一名队长，其余均为队员，您可以添加或者删除队员。</li>
                        <li>3. 带<i className="icon-required"></i>的为必须填写的内容。</li>
                    </ul>
                </div>
            </div>
        )
    }

    __renderTabMenu() {
        return this.state.tabs.map((item) => {
            return (
                <li onClick={()=>this.setState({actived:item[1]})} className={item[1]===this.state.actived?"active":""}>编辑{item[0]}</li>
            )
        })
    }

    __renderTabList() {
        let { memberItems } = this.state;
        return this.state.tabs.map((item, i) => {
            return (
                <li className={this.state.actived === item[1]?'active':''}>
                    <span onClick={()=>this.handleRemoveItem(item[1],i)} className="btn-delete"><svg className="icon" style={{width: '1.4em', height: '1.4em',verticalAlign: 'middle',fill: 'currentColor',overflow: 'hidden'}} viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4883"><path d="M511.655146 64.266699c-247.197008 0-447.589015 200.392006-447.589015 447.589015s200.392006 447.589015 447.589015 447.589015 447.589015-200.392006 447.589015-447.589015S758.851131 64.266699 511.655146 64.266699zM702.666504 707.833177c0 0.788969-0.074701 1.559519-0.180102 2.320858l0 16.049534c0 11.542894-9.356089 20.901029-20.900006 20.901029L341.722872 747.104599c-10.582009 0-19.304671-7.873318-20.687158-18.077727-0.25071-1.103124-0.39295-2.245134-0.39295-3.420913L320.642764 390.217353c0-8.788154 7.404644-15.912411 16.538675-15.912411l25.621541 0c9.134031 0 16.539698 7.124258 16.539698 15.912411l0 298.187333 264.624936 0 0-296.809963c0-9.549493 8.046257-17.289782 17.972327-17.289782l22.75526 0c9.925047 0 17.972327 7.740288 17.972327 17.289782L702.667527 707.833177zM441.127859 645.499503 441.127859 412.227646c0-11.014868 5.821589-19.943215 13.004175-19.943215l12.301164 0c7.181563 0 13.004175 8.928347 13.004175 19.943215l0 233.271858c0 11.013845-5.822612 19.942191-13.004175 19.942191l-12.301164 0C446.949448 665.441695 441.127859 656.513348 441.127859 645.499503zM543.870872 645.499503 543.870872 412.227646c0-11.014868 5.821589-19.943215 13.004175-19.943215l12.301164 0c7.182586 0 13.004175 8.928347 13.004175 19.943215l0 233.271858c0 11.013845-5.822612 19.942191-13.004175 19.942191l-12.301164 0C549.692461 665.441695 543.870872 656.513348 543.870872 645.499503zM732.002646 343.055217c0 11.68104-9.468652 21.149693-21.149693 21.149693L312.457338 364.204909c-11.68104 0-21.149693-9.468652-21.149693-21.149693l0-16.399505c0-11.682064 9.468652-21.149693 21.149693-21.149693l155.176199 0 0-11.639085c0-9.532097 7.725962-17.259082 17.259082-17.259082l53.526077 0c9.531074 0 17.259082 7.726985 17.259082 17.259082l0 11.639085 155.176199 0c11.68104 0 21.149693 9.467629 21.149693 21.149693L732.00367 343.055217z" p-id="4884"></path></svg> 删除</span>
                    <div className="row">
                        <div className="col">
                            <span>真实姓名：</span>
                            <input type="text" onChange={(e)=>this.formItems[i].name=e.target.value} placeholder="请输入队员的真实姓名" className="input-text"/>
                            <i className="icon-required"></i>
                        </div>
                        <div className="col">
                            <span>专业全称：</span>
                            <input type="text" onChange={(e)=>this.formItems[i].major=e.target.value} placeholder="请输入队员所在专业的全称" className="input-text"/>
                            <i className="icon-required"></i>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <span>身份证号：</span>
                            <input type="text" onChange={(e)=>this.formItems[i].IDCard=e.target.value} placeholder="请输入队员的身份证号" className="input-text"/>
                            <i className="icon-required"></i>
                        </div>
                        <div className="col">
                            <span>所在年级：</span>
                            <input type="text" onChange={(e)=>this.formItems[i].grade=e.target.value} placeholder="请输入队员的所在年级" className="input-text"/>
                            <i className="icon-required"></i>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <span>在校学号：</span>
                            <input type="text" onChange={(e)=>this.formItems[i].code=e.target.value} placeholder="请输入队员的在校学号" className="input-text"/>
                            <i className="icon-required"></i>
                        </div>
                        <div className="col">
                            <span>手机号码：</span>
                            <input type="text" onChange={(e)=>this.formItems[i].phone=e.target.value} placeholder="请输入队员的手机号码" className="input-text"/>
                            <i className="icon-required"></i>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <span>学院全称：</span>
                            <input type="text" onChange={(e)=>this.formItems[i].college=e.target.value} placeholder="请输入队员所在学校的全称" className="input-text"/>
                            <i className="icon-required"></i>
                        </div>
                        <div className="col">
                            <span>邮箱地址：</span>
                            <input type="text" onChange={(e)=>this.formItems[i].email=e.target.value} placeholder="请输入队员的邮箱地址" className="input-text"/>
                            <i className="icon-required"></i>
                        </div>
                    </div>
                </li>
            )
        })
    }

    _renderSignup() {
        return (
            <div className="cbox">
                <div className="title"><h3>信息录入</h3></div>
                <div className="content">
                    <div className="row" style={{paddingLeft: '10px', marginTop: '10px'}}>
                        <span>参赛组别：</span>
                        <select onChange={(e)=>this.formHead.category = e.target.value}>
                            <option value={100}>医学本科组</option>
                            <option value={200}>医学专科组</option>
                            <option value={300}>非医学专业组</option>
                            <option value={400}>非医学专科组</option>
                        </select>
                        <i className="icon-required"></i>
                    </div>
                    <div className="row" style={{paddingLeft: '10px'}}>
                        <div className="col">
                            <span>指导老师：</span>
                            <input type="text" onChange={(e)=>this.formHead.teacher=e.target.value} placeholder="请输入指导老师的姓名" className="input-text"/>
                            <i className="icon-required"></i>
                        </div>
                        <div className="col">
                            <span>联系方式：</span>
                            <input type="text" onChange={(e)=>this.formHead.t_phone=e.target.value} placeholder="请输入指导老师的手机号码" className="input-text"/>
                            <i className="icon-required"></i>
                        </div>
                    </div>
                    <div className="tabs">
                        <ul className="tab-menu">
                            {this.__renderTabMenu()}
                            <li className="btn-add" onClick={()=>this.handleAddItem()}><strong>+</strong>添加队员</li>
                        </ul>
                        <ul className="tab-list">
                            {this.__renderTabList()}
                        </ul>
                        <span onClick={()=>this.handleConfirm()} className="btn-submit">提交信息</span>
                    </div>
                </div>
            </div>
        )
    }

    render() {
        let { form } = this.state;
        return (
            <div>
                {this._renderRules()}
                {this._renderSignup()}
                <Popup ref="delete" title="温馨提示" hideFooter={true} width="550px" height="120px">
                    <p style={{color: '#666',marginLeft: '15px',fontSize:'12px'}}>不能删除队长！每个队伍必须有一名队长</p>
                </Popup>
                <Popup ref="add" title="温馨提示" hideFooter={true} width="550px" height="120px">
                    <p style={{color: '#666',marginLeft: '15px',fontSize:'12px'}}>注意！一个队伍人数不能超过3人</p>
                </Popup>
                <Popup ref="submit" title="提交确认" onConfirm={()=>this.handleSubmit()} width="750px" height="650px">
                    <div className="confirm">
                        <div className="basic">
                            <span>学校名称：{form.school}</span>
                            <span>参赛组别：{mapTypetoCategory(form.category)}</span>
                            <span>指导老师：{form.teacher} <a href="javascript:;" >{form.t_phone}</a></span>
                        </div>
                        {form.items.map((item, i) => {
                            if (item.name) {
                                return (
                                    <div className="field">
                                        <div className="row">
                                            <span>真实姓名：{item.name} {i===0?<label>队长</label>:null}</span>
                                            <span>学院全称：{item.college}</span>
                                        </div>
                                        <div className="row">
                                            <span>在校学号：{item.code}</span>
                                            <span>所在年级：{item.grade}</span>
                                        </div>
                                        <div className="row">
                                            <span>身份证号：{item.IDCard}</span>
                                            <span>手机号码：{item.phone}</span>
                                        </div>
                                        <div className="row">
                                            <span>专业全称：{item.major}</span>
                                            <span>邮箱地址：{item.email}</span>
                                        </div>
                                    </div>
                                )
                            }
                        })}
                        <hr/>
                    </div>
                </Popup>
                <Popup ref="tips" title="温馨提示" hideFooter={true} width="550px" height="120px">
                    <p style={{color: '#666',marginLeft: '15px',fontSize:'12px'}}>恭喜！报名成功</p>
                </Popup>
                <Loading show={true} ref="loading" />
            </div>
        )
    }

}

function mapStateToProps(state) {
    return {
        user: state.user,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({ replace, signup }, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup)
