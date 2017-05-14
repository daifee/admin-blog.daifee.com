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




export default function () {
  return (
    <Router>
      <div id='container'>
        <Switch>
          <Route exact path='/' component={Login} />

          <Route exact path='/articles' component={Articles} />
          <Route exact path='/articles/:id/edit' component={ArticleEdit} />
          <Route exact path='/article/:id' component={Article} />

          <Route exact path='/comments' component={Comments} />
          <Route exact path='/comments/:id' component={Comment} />

          <Route exact path='/users' component={Users} />
          <Route exact path='/users/:id/edit' component={UserEdit} />
          <Route exact path='/users/:id' component={User} />

          <Route component={NotFound} />
        </Switch>
      </div>
    </Router>
  );
}
