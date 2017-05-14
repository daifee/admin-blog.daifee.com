/**
 * 左菜单
 */
import React from 'react';
import {Menu} from 'antd';
import {Link} from 'react-router-dom';

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
  const { location } = props;
  const currentKey = location.pathname;

  return (
    <Menu
      theme="dark"
      mode="inline"
      selectedKeys={[currentKey]}>
      {data.map(function (item) {
        return (
          <Menu.Item key={item.key}>
            <Link to={item.key}>{item.name}</Link>
          </Menu.Item>
        );
      })}
    </Menu>
  );
}
