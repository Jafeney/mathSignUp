/**
 * @desc 加载中组件
 * @author Jafeney <692270687@qq.com>
 * @dateTime 2017-02-05
 * */

import React, { Component } from 'react'

const mask = {
    position:'fixed',
    width: '100%',
    height: '100%',
    left: '0',
    top: '0',
    zIndex: '9999',
    background: 'rgba(255,255,255,.5)',
}

class Loading extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div style={mask}>
                <div className="cssload-loader">
                    <div className="cssload-inner cssload-one"></div>
                    <div className="cssload-inner cssload-two"></div>
                    <div className="cssload-inner cssload-three"></div>
                </div>
            </div>
        )
    }
}

export default Loading
