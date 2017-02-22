import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/app';

import HomeIndex from './components/index_home';
import UserLogin from './components/user/login';
import UserLogout from './components/user/logout';
import UserProfile from './components/user/profile';
import ResetPassword from './components/user/reset_password';
import requireAuth from './utils/authenticated';

//Return Forms and Table
import ReturnForm from './components/returns/ReturnForm/index';
import ReturnInventory from './components/returns/ReturnInventory/index';

//Inventory Search and Table
import InventorySearch from './components/inventory/InventorySearch/index';


export default (
    <Route path="/" component={App}>
        <IndexRoute component={HomeIndex} />
        <Route path="/login" component={UserLogin} />
        <Route path="/logout" component={UserLogout} />
        <Route path="/reset" component={ResetPassword} />
        <Route path="/profile" component={UserProfile} onEnter={requireAuth} />
        <Route path="/submitreturn" component={ReturnForm} onEnter={requireAuth} />
        <Route path="/viewreturns" component={ReturnInventory} onEnter={requireAuth} />
        <Route path="/inventory" component={InventorySearch} onEnter={requireAuth} />
    </Route>

);
