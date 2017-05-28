/**
 * 用户列表：
 * * 用户名
 * * 邮箱
 * * 角色
 * * 简介
 * * 创建时间
 * * 更新时间
 * * 文章数量
 * * 所有评论
 * * 状态
 */

import React from 'react';
import {Link} from 'react-router-dom';

import {
  message,
  Table,
  Button,
  Menu,
  Dropdown,
  Icon,
  Modal
} from 'antd';
import * as actionsUser from '../../actions/user';
import to from '../../utils/to';

const Column = Table.Column;

export default class UserList extends React.Component {
  handlePaginate = (page) => {
    let {perPage, history} = this.props;
    history.push(to(`/users?page=${page}&perPage=${perPage}`));
  };

  renderAction = (user) => {
    let {history} = this.props;
    let menu = (
        <Menu onClick={(e) => handleMenuClick(e, user, history)}>
          <Menu.Item key="1">发表的评论</Menu.Item>
          <Menu.Item key="2">编辑</Menu.Item>
          {
            user.status === 'deleted'
            ? (<Menu.Item key="3">恢复</Menu.Item>)
            : (<Menu.Item key="4">删除</Menu.Item>)
          }
        </Menu>
    );

    return (
      <Dropdown overlay={menu}>
        <Button>
          更多操作 <Icon type="down" />
        </Button>
      </Dropdown>
    );
  };


  render() {
    let {data, page, perPage, status} = this.props;

    // 只显示下一页，没有了就不显示
    let total = page * perPage;
    if (data.length >= perPage) {
      total++;
    }

    return (
        <Table
          rowKey='id'
          loading={status === 'pending' || status === 'init'}
          dataSource={data}
          pagination={{
            current: page,
            pageSize: perPage,
            total: total,
            onChange: this.handlePaginate
          }}>

          <Column key='id' title='ID' dataIndex='id' />
          <Column key='name' title='用户名' dataIndex='name' />
          <Column key='email' title='邮箱' dataIndex='email' />
          <Column key='role' title='角色' dataIndex='role' />
          <Column key='introduction' title='简介' dataIndex='introduction' />
          <Column key='createdAt' title='创建时间' dataIndex='createdAt' />
          <Column key='updatedAt' title='更新时间' dataIndex='updatedAt' />
          <Column
            key='articleNum'
            title='发表的文章'
            dataIndex='articleNum'
            render={this.renderArticlesLink}
             />
          <Column key='status' title='状态' dataIndex='status' />
          <Column
            key='action'
            title='操作'
            render={this.renderAction} />
        </Table>
      );
  }

  renderArticlesLink(num, user) {
    return (<Link to={to(`/users/${user.id}/articles`)}>{num}</Link>);
  }
}




function handleMenuClick(e, user, history) {
  switch (e.key) {
    case '1':
      history.push(to(`/users/${user.id}/comments`));
      break;
    case '2':
      history.push(to(`/users/${user.id}/edit`));
      break;
    case '3':
      Modal.confirm({
        title: '恢复操作',
        content: '还不支持',
        // content: `确定恢复用户：${user.name}?`,
        onOk() {
          console.log('确定');
        }
      });
      break;
    case '4':
      Modal.confirm({
        title: '删除操作',
        content: `确定删除用户：${user.name}?`,
        onOk() {
          actionsUser.del(user.id).catch(function (err) {
            message.error(err.message, 2);
            console.error(err);
          });
        }
      });
      break;
    default:
  }
}
