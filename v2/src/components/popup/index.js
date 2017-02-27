/**
 * @desc 弹出层组件
 * @author Jafeney <692270687@qq.com>
 * @dateTime 2017-01-30
 **/

import React, { Component, PropTypes } from 'react'
import './style.less'

class Popup extends Component {

    constructor(props) {
        super(props)
        this.state = {
            show: false,
            hideFooter: props.hideFooter || false,
            height: props.height
        }
    }

    show() {
        this.setState({
            show: true,
        })
    }

    close() {
        this.setState({
            show: false,
        })
    }

    handleConfirm() {
        if (this.props.onConfirm) {
            this.props.onConfirm()
        } else {
            this.close()
        }
    }

    setHeight(height) {
        this.setState({
            height: height
        })
    }

    _renderTitle() {
        return (
            <div className="title">
                <div className="title-content">
                    <span>{this.props.title}</span>
                    <a href="javascript:;" onClick={()=>this.close()} className="closed"></a>
                </div>
            </div>
        )
    }

    _renderContent() {
        return (
            <div style={{marginTop: '35px'}}>{this.props.children}</div>
        )
    }

    _renderFooter() {
        if (this.state.hideFooter) {
            return (<div></div>)
        } else {
            return (
                <div className="footer">
                    <div onClick={()=>this.handleConfirm()} className="btn-confirm">
                        <span>确定</span>
                    </div>
                    <div onClick={()=>this.close()} className="btn-cancel">
                        <span>取消</span>
                    </div>
                </div>
            )
        }
    }

    render() {
        return (
            <div className={this.state.show?"ry-mask show":"ry-mask"}>
                <div className="ry-popup" style={{width: this.props.width, height: this.state.height}}>
                    { this._renderTitle() }
                    { this._renderContent() }
                    { this._renderFooter() }
                </div>
            </div>
        )
    }
}

export default Popup
