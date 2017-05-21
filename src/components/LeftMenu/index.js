/**
 * 左菜单
 */
import React from 'react';
import {Menu} from 'antd';
import {Link} from 'react-router-dom';
import * as actionsLogin from '../../actions/login';
import to from '../../utils/to';


const data = [{
  name: '文章',
  key: to('/articles')
}, {
  name: '评论',
  key: to('/comments')
}, {
  name: '用户',
  key: to('/users')
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
        history.replace(to('/'));
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
