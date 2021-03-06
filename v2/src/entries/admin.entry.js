/**
 * @desc 管理后台入口
 * @author Jafeney <692270687@qq.com>
 * @dateTime 2017-01-11
 **/

import React from 'react'
import { render } from 'react-dom'
// redux
import { Provider } from 'react-redux'
// router
import { Router, hashHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import routes from '../routes/admin.route'
import configureStore from '../redux/configureStore'

const store = configureStore(hashHistory)

const history = syncHistoryWithStore(hashHistory, store)

render(
    (
        <Provider store={store}>
            <Router history={history} routes={routes} />
        </Provider>
    ), document.getElementById('root')
)
