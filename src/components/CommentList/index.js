/**
 * 评论列表：
 * * 评论人
 * * 被评论文章
 * * 内容
 * * 创建时间
 * * 更新时间
 * * 状态
 * * 删除 or 恢复
 */

import React from 'react';
import {Link} from 'react-router-dom';
import {
  message,
  Table,
  Button,
  Modal
} from 'antd';
import * as actionsComment from '../../actions/comment'
import to from '../../utils/to';
import qs from 'qs';

const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id'
  },
  {
    title: '文章ID',
    dataIndex: 'articleId',
    key: 'articleId',
    render(articleId) {
      return (<Link to={to(`/articles/${articleId}`)}>{articleId}</Link>);
    }
  },
  {
    title: '评论者',
    dataIndex: 'user',
    key: 'user',
    render(user) {
      return (<Link to={to(`/users/${user.name}`)}>{user.name}</Link>);
    }
  },
  {
    title: '评论内容',
    dataIndex: 'content',
    key: 'content'
  },
  {
    title: '创建时间',
    dataIndex: 'createdAt',
    key: 'createdAt'
  },
  {
    title: '更新时间',
    dataIndex: 'updatedAt',
    key: 'updatedAt'
  },
  {
    title: '状态',
    dataIndex: 'status',
    key: 'status'
  },
  {
    title: '操作',
    key: 'action',
    render(comment) {
      if (comment.status === 'deleted') {
        return (
          <Button onClick={() => handleRestore(comment)}>
            恢复
          </Button>
        );
      } else {
        return (
          <Button onClick={() => handleDelete(comment)}>
            删除
          </Button>
        );
      }
    }
  }
];

function handleDelete(comment) {
  Modal.confirm({
    title: '删除操作',
    content: `确定删除评论：${comment.content}？`,
    onOk() {
      actionsComment.del(comment.id, comment.user.id).catch(function (err) {
        message.error(err.message);
        console.error(err);
      });
    }
  });
}

function handleRestore(comment) {
  Modal.confirm({
    title: '恢复操作',
    content: `还不支持`,
    onOk() {
      console.log('ok')
    }
  });
}


function handlePaginate(page, query, history) {
  query = {...query, page};
  query = qs.stringify(query);
  history.push(to(`/comments?${query}`));
}

export default function CommentList(props) {
  let {data, query, status, history} = props;
  let {page, per_page} = query;

  // 只显示下一页，没有了就不显示
  let total = page * per_page;
  if (data.length >= per_page) {
    total++;
  }

  return (
    <Table
      loading={status === 'pending' || status === 'init'}
      columns={columns}
      dataSource={data}
      rowKey='id'
      pagination={{
        current: page,
        pageSize: per_page,
        total: total,
        onChange: (page) => handlePaginate(page, query, history)
      }} />
  );
}
