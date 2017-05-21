/**
 * 路由
 */
// pages
import Articles from './pages/Articles';
import Article from './pages/Article';
import ArticleEdit from './pages/ArticleEdit';
import Comment from './pages/Comment';
import Comments from './pages/Comments';
import Login from './pages/Login';
import User from './pages/User';
import UserEdit from './pages/UserEdit';
import Users from './pages/Users';
import NotFound from './pages/NotFound';

import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

const PUBLIC_URL = process.env.PUBLIC_URL;



export default function () {
  return (
    <Router>
      <div id='container'>
        <Switch>
          <Route exact path={`${PUBLIC_URL}/`} component={Login} />

          <Route exact path={`${PUBLIC_URL}/articles`} component={Articles} />
          <Route exact path={`${PUBLIC_URL}/articles/:id/edit`} component={ArticleEdit} />
          <Route exact path={`${PUBLIC_URL}/articles/:id`} component={Article} />

          <Route exact path={`${PUBLIC_URL}/comments`} component={Comments} />
          <Route exact path={`${PUBLIC_URL}/comments/:id`} component={Comment} />

          <Route exact path={`${PUBLIC_URL}/users`} component={Users} />
          <Route exact path={`${PUBLIC_URL}/users/:id/edit`} component={UserEdit} />
          <Route exact path={`${PUBLIC_URL}/users/:id`} component={User} />

          <Route component={NotFound} />
        </Switch>
      </div>
    </Router>
  );
}
