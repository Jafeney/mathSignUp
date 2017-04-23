/**
 * @desc 项目路由设置
 * @author Jafeney <692270687@qq.com>
 * @dateTime 2016-12-23
 **/

import React from 'react'
import { Route } from 'react-router'

import Login from '../containers/admin/login'
import Main from '../containers/admin/main'
import Home from '../containers/admin/home'

const routes = (
    <Route>
        <Route path="/" component={Login} />
        <Route path="m" component={Main}>
            <Route path="home" component={Home} />
        </Route>
    </Route>
)
export default routes
