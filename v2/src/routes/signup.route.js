/**
 * @desc 项目路由设置
 * @author Jafeney <692270687@qq.com>
 * @dateTime 2016-12-23
 **/

import React from 'react'
import { Route } from 'react-router'

import Login from '../containers/signup/login'
import Main from '../containers/signup/main'
import Home from '../containers/signup/home'
import Signup from '../containers/signup/signup'

const routes = (
    <Route>
        <Route path="/" component={Login} />
        <Route path="m" component={Main}>
            <Route path="home" component={Home} />
            <Route path="signup" component={Signup} />
        </Route>
    </Route>
)

export default routes
