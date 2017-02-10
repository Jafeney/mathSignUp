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

import Popup from '../../components/popup/'

class Home extends Component {

    constructor(props) {
        super(props)
        this.state = {
            tabs: [['队长','lead'], ['队员1','part1']],
            actived: 'lead',
        }
    }

    handleAddItem() {
        let length = this.state.tabs.length, tabs = this.state.tabs;
        if (length === 3) {
            this.refs.add.show()
        } else {
            tabs.push([`队员${length}`,`part${length}`])
            this.setState({
                tabs: tabs
            })
        }
    }

    handleRemoveItem(part) {
        if (part === 'lead') {
            this.refs.delete.show()
        } else {
            let tabs = this.state.tabs.filter((item)=>item[1]!==part);
            this.setState({
                tabs: tabs,
                actived: tabs[tabs.length-1][1]
            })
        }
    }

    handleConfirm() {
        this.refs.submit.show()
    }

    _renderRules() {
        return (
            <div className="cbox">
                <div className="title"><h3>报名规则</h3></div>
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
        return this.state.tabs.map((item) => {
            return (
                <li className={this.state.actived === item[1]?'active':''}>
                    <span onClick={()=>this.handleRemoveItem(item[1])} className="btn-delete"><svg className="icon" style={{width: '1.4em', height: '1.4em',verticalAlign: 'middle',fill: 'currentColor',overflow: 'hidden'}} viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4883"><path d="M511.655146 64.266699c-247.197008 0-447.589015 200.392006-447.589015 447.589015s200.392006 447.589015 447.589015 447.589015 447.589015-200.392006 447.589015-447.589015S758.851131 64.266699 511.655146 64.266699zM702.666504 707.833177c0 0.788969-0.074701 1.559519-0.180102 2.320858l0 16.049534c0 11.542894-9.356089 20.901029-20.900006 20.901029L341.722872 747.104599c-10.582009 0-19.304671-7.873318-20.687158-18.077727-0.25071-1.103124-0.39295-2.245134-0.39295-3.420913L320.642764 390.217353c0-8.788154 7.404644-15.912411 16.538675-15.912411l25.621541 0c9.134031 0 16.539698 7.124258 16.539698 15.912411l0 298.187333 264.624936 0 0-296.809963c0-9.549493 8.046257-17.289782 17.972327-17.289782l22.75526 0c9.925047 0 17.972327 7.740288 17.972327 17.289782L702.667527 707.833177zM441.127859 645.499503 441.127859 412.227646c0-11.014868 5.821589-19.943215 13.004175-19.943215l12.301164 0c7.181563 0 13.004175 8.928347 13.004175 19.943215l0 233.271858c0 11.013845-5.822612 19.942191-13.004175 19.942191l-12.301164 0C446.949448 665.441695 441.127859 656.513348 441.127859 645.499503zM543.870872 645.499503 543.870872 412.227646c0-11.014868 5.821589-19.943215 13.004175-19.943215l12.301164 0c7.182586 0 13.004175 8.928347 13.004175 19.943215l0 233.271858c0 11.013845-5.822612 19.942191-13.004175 19.942191l-12.301164 0C549.692461 665.441695 543.870872 656.513348 543.870872 645.499503zM732.002646 343.055217c0 11.68104-9.468652 21.149693-21.149693 21.149693L312.457338 364.204909c-11.68104 0-21.149693-9.468652-21.149693-21.149693l0-16.399505c0-11.682064 9.468652-21.149693 21.149693-21.149693l155.176199 0 0-11.639085c0-9.532097 7.725962-17.259082 17.259082-17.259082l53.526077 0c9.531074 0 17.259082 7.726985 17.259082 17.259082l0 11.639085 155.176199 0c11.68104 0 21.149693 9.467629 21.149693 21.149693L732.00367 343.055217z" p-id="4884"></path></svg> 删除</span>
                    <div className="row">
                        <div className="col">
                            <span>真实姓名：</span>
                            <input type="text" className="input-text" placeholder="请输入队员的真实姓名" />
                            <i className="icon-required"></i>
                        </div>
                        <div className="col">
                            <span>专业全称：</span>
                            <input type="text" className="input-text" placeholder="请输入队员所在专业的全称" />
                            <i className="icon-required"></i>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <span>身份证号：</span>
                            <input type="text" className="input-text" placeholder="请输入队员的身份证号" />
                            <i className="icon-required"></i>
                        </div>
                        <div className="col">
                            <span>所在年级：</span>
                            <input type="text" className="input-text" placeholder="请输入队员所在的年级" />
                            <i className="icon-required"></i>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <span>在校学号：</span>
                            <input type="text" className="input-text" placeholder="请输入队员的在校学号" />
                            <i className="icon-required"></i>
                        </div>
                        <div className="col">
                            <span>手机号码：</span>
                            <input type="text" className="input-text" placeholder="请输入队员的手机号码" />
                            <i className="icon-required"></i>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <span>学院全称：</span>
                            <input type="text" className="input-text" placeholder="请输入队员所在学院的全称" />
                            <i className="icon-required"></i>
                        </div>
                        <div className="col">
                            <span>邮箱地址：</span>
                            <input type="text" className="input-text" placeholder="请输入队员的邮箱地址" />
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
                        <select>
                            <option>非医学专业组</option>
                            <option>医学本科组</option>
                            <option>医学专科组</option>
                        </select>
                        <i className="icon-required"></i>
                    </div>
                    <div className="row" style={{paddingLeft: '10px'}}>
                        <div className="col">
                            <span>指导老师：</span>
                            <input type="text" placeholder="请输入指导老师的姓名" className="input-text"/>
                            <i className="icon-required"></i>
                        </div>
                        <div className="col">
                            <span>联系方式：</span>
                            <input type="text" placeholder="请输入指导老师的手机号码" className="input-text"/>
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
                <Popup ref="submit" title="提交确认" width="750px" height="650px">
                    <div className="confirm">
                        <div className="basic">
                            <span>学校名称：温州医科大学</span>
                            <span>参赛组别：非医学专业组</span>
                            <span>指导老师：刘婷 <a href="javascript:;" >15968810223</a></span>
                        </div>
                        <div className="field">
                            <div className="row">
                                <span>真实姓名：楼佳枫 <label>队长</label></span>
                                <span>学院全称：信息与工程学院</span>
                            </div>
                            <div className="row">
                                <span>在校学号：1223020057</span>
                                <span>所在年级：2012级</span>
                            </div>
                            <div className="row">
                                <span>身份证号：330683199311137014</span>
                                <span>手机号码：15968810223</span>
                            </div>
                            <div className="row">
                                <span>专业全称：计算机科学与技术</span>
                                <span>邮箱地址：692270687@qq.com</span>
                            </div>
                        </div>
                        <div className="field">
                            <div className="row">
                                <span>真实姓名：楼佳枫</span>
                                <span>学院全称：信息与工程学院</span>
                            </div>
                            <div className="row">
                                <span>在校学号：1223020057</span>
                                <span>所在年级：2012级</span>
                            </div>
                            <div className="row">
                                <span>身份证号：330683199311137014</span>
                                <span>手机号码：15968810223</span>
                            </div>
                            <div className="row">
                                <span>专业全称：计算机科学与技术</span>
                                <span>邮箱地址：692270687@qq.com</span>
                            </div>
                        </div>
                        <div className="field">
                            <div className="row">
                                <span>真实姓名：楼佳枫</span>
                                <span>学院全称：信息与工程学院</span>
                            </div>
                            <div className="row">
                                <span>在校学号：1223020057</span>
                                <span>所在年级：2012级</span>
                            </div>
                            <div className="row">
                                <span>身份证号：330683199311137014</span>
                                <span>手机号码：15968810223</span>
                            </div>
                            <div className="row">
                                <span>专业全称：计算机科学与技术</span>
                                <span>邮箱地址：692270687@qq.com</span>
                            </div>
                        </div>
                        <hr/>
                    </div>
                </Popup>
            </div>
        )
    }

}

function mapStateToProps(state) {
    return {}
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({ replace }, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
