/**
 * 文章列表：
 * * 文章标题 title
 * * 作者  user.name
 * * 创建时间  createdAt
 * * 更新时间  updatedAt
 * * 状态  status
 * * 评论数量  commentNum
 * * 阅读数量  views
 * * 操作
 *   * 编辑
 *   * 预览
 *   * 删除 or 恢复
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
import * as actionsArticle from '../../actions/article';
import to from '../../utils/to';

const Column = Table.Column;



export default class ArticleList extends React.Component {
  handlePaginate = (page) => {
    let {perPage, history} = this.props;
    history.push(to(`/articles?page=${page}&perPage=${perPage}`));
  };

  renderAction = (article) => {
    let {history, pagination} = this.props;
    // 详情页不分页，不可再预览，所以可以根据 pagination 判断是否属于详情页
    let menu = (
        <Menu onClick={(e) => handleMenuClick(e, article, history)}>
          {pagination !== false ? (<Menu.Item key="1">预览</Menu.Item>) : null}
          <Menu.Item key="2">编辑</Menu.Item>
          {
            article.status === 'deleted'
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
    let {data, page, perPage, status, pagination} = this.props;

    // 只显示下一页，没有了就不显示
    let total = page * perPage;
    if (data.length >= perPage) {
      total++;
    }

    if (pagination !== false) {
      pagination = {
        current: page,
        pageSize: perPage,
        total: total,
        onChange: this.handlePaginate
      };
    }


    return (
      <Table
        rowKey='id'
        loading={status === 'pending' || status === 'init'}
        dataSource={data}
        pagination={pagination}>

        <Column key='id' title='ID' dataIndex='id' />
        <Column key='title' title='标题' dataIndex='title' />
        <Column
          key='user'
          title='作者'
          dataIndex='user'
          render={this.renderUserLink} />
        <Column key='createdAt' title='创建时间' dataIndex='createdAt' />
        <Column key='updatedAt' title='更新时间' dataIndex='updatedAt' />
        <Column
          key='commentNum'
          title='评论数量'
          dataIndex='commentNum'
          render={this.renderCommentsLink} />
        <Column key='views' title='阅读数量' dataIndex='views' />
        <Column key='status' title='状态' dataIndex='status' />
        <Column
          key='action'
          title='操作'
          render={this.renderAction} />
      </Table>
    );
  }

  renderUserLink(user) {
    return (<Link to={to(`/users/${user.name}`)}>{user.name}</Link>);
  }

  renderCommentsLink(commentNum, article) {
    return (<Link to={to(`/articles/${article.id}/comments`)}>{commentNum}</Link>);
  }
}


function handleMenuClick(e, article, history) {
  switch (e.key) {
    case '1':
      history.push(to(`/articles/${article.id}`));
      break;
    case '2':
      history.push(to(`/articles/${article.id}/edit`));
      break;
    case '3':
      Modal.confirm({
        title: '恢复操作',
        content: '还不支持',
        // content: `确定恢复文章：${article.title}?`,
        onOk() {
          console.log('确定');
        }
      });
      break;
    case '4':
      Modal.confirm({
        title: '删除操作',
        content: `确定删除文章：${article.title}?`,
        onOk() {
          actionsArticle.del(article.id, article.user.id).catch(function (err) {
            message.error(err.message, 2);
            console.error(err);
          });
        }
      });
      break;
    default:
  }
}
