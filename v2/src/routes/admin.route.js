/**
 * @desc 项目路由设置
 * @author Jafeney <692270687@qq.com>
 * @dateTime 2016-12-23
 **/

import React from 'react'
import { Route } from 'react-router'

import Login from '../containers/admin/login'

const routes = (
    <Route>
        <Route path="/" component={Login} />
        
    </Route>
)

export default routes
