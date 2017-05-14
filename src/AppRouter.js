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
  Switch,
  withRouter
} from 'react-router-dom';
import {connect} from 'react-redux';


function connectPage(Page) {
  return withRouter(connect(mapStateToProps)(Page));
}

function mapStateToProps(state) {
  return state;
}



export default function () {
  return (
    <Router>
      <div id='container'>
        <Switch>
          <Route exact path='/' component={connectPage(Login)} />

          <Route exact path='/articles' component={connectPage(Articles)} />
          <Route exact path='/articles/:id/edit' component={connectPage(ArticleEdit)} />
          <Route exact path='/article/:id' component={connectPage(Article)} />

          <Route exact path='/comments' component={connectPage(Comments)} />
          <Route exact path='/comments/:id' component={connectPage(Comment)} />

          <Route exact path='/users' component={connectPage(Users)} />
          <Route exact path='/users/:id/edit' component={connectPage(UserEdit)} />
          <Route exact path='/users/:id' component={connectPage(User)} />

          <Route component={connectPage(NotFound)} />
        </Switch>
      </div>
    </Router>
  );
}
