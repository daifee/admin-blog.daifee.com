/**
 * 左菜单
 */
import React from 'react';
import {Menu} from 'antd';
import {Link} from 'react-router-dom';
import * as actionsLogin from '../../actions/login';



const data = [{
  name: '文章',
  key: '/articles'
}, {
  name: '评论',
  key: '/comments'
}, {
  name: '用户',
  key: '/users'
}];


export default function LeftMenu(props) {
  const { location, history } = props;
  const currentKey = location.pathname;

  let menu = data.map(function (item) {
    return (
      <Menu.Item key={item.key}>
        <Link to={item.key}>{item.name}</Link>
      </Menu.Item>
    );
  });

  menu.push((
    <Menu.Item key='logout'>
      <a onClick={function () {
        actionsLogin.logout();
        history.replace('/');
      }}>退出帐号</a>
    </Menu.Item>
  ));

  return (
    <Menu
      theme="dark"
      mode="inline"
      selectedKeys={[currentKey]}>
      {menu}
    </Menu>
  );
}
