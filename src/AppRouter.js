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
import to from './utils/to';


export default function () {
  return (
    <Router>
      <div id='container'>
        <Switch>
          <Route exact path={to('/')} component={Login} />

          <Route exact path={to('/articles')} component={Articles} />
          <Route exact path={to('/articles/:id/edit')} component={ArticleEdit} />
          <Route exact path={to('/articles/:id')} component={Article} />

          <Route exact path={to('/comments')} component={Comments} />
          <Route exact path={to('/comments/:id')} component={Comment} />

          <Route exact path={to('/users')} component={Users} />
          <Route exact path={to('/users/:id/edit')} component={UserEdit} />
          <Route exact path={to('/users/:id')} component={User} />

          <Route component={NotFound} />
        </Switch>
      </div>
    </Router>
  );
}
