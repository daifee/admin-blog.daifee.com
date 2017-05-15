/**
 * 用户列表
 */
import React from 'react';
import {Table, message} from 'antd';
import ContentContainer from '../../components/ContentContainer';
import * as actionsUsers from '../../actions/users';
import getQueryPagination from '../../utils/getQueryPagination';
import {Link} from 'react-router-dom';
import connect from '../../utils/connectPage';


const columns = [{
  title: '用户名',
  dataIndex: 'name',
  render(name) {
    return (<Link to={`/users/${name}`}>{name}</Link>);
  }
}, {
  title: '发布时间',
  dataIndex: 'createdAt'
}, {
  title: '内容',
  dataIndex: 'content'
}, {
  key: 'action',
  title: '操作',
  dataIndex: 'id',
  render(id) {
    return (
      <span>
        <a
          href="#"
          onClick={function (event) {
            console.log('delete');
            event.preventDefault();
          }}>删除</a>
        <span className="ant-divider" />
        <Link to={`/users/${id}`}>预览</Link>
      </span>
    );
  }
}];


class Users extends React.Component {
  unlinstenRouter = null;

  render() {
    let {list, history} = this.props;
    let {page, perPage, data, status} = list;

    // 只显示下一页，没有了就不显示
    let total = page * perPage;
    if (data.length >= perPage) {
      total++;
    }

    return (
      <ContentContainer {...this.props}>
        <Table
          loading={status === 'pending' || status === 'init'}
          columns={columns}
          dataSource={data}
          rowKey='id'
          pagination={{
            current: page,
            pageSize: perPage,
            total: total,
            onChange: function (page) {
              // 将分页操作插入历史记录
              // router.push是同步操作
              history.push(`/users?page=${page}&perPage=${perPage}`);
              // requestPageData();
            }
          }} />
      </ContentContainer>
    );
  }

  componentDidMount() {
    let {history} = this.props;
    // 初始化页面
    this.requestPageData();
    this.unlinstenRouter = history.listen(this.requestPageData);
  }

  componentWillUnmount() {
    this.unlinstenRouter();
  }

  requestPageData() {
    let {page, perPage} = getQueryPagination({
      page: 1,
      perPage: 20
    });

    actionsUsers.fetch(page, perPage).catch(function (err) {
      message.error(err.message, 2);
      console.error(err);
    });
  }
}



export default connect(function (state) {
  let props = {
    list: {...state.pages.users.list}
  };
  let entities = state.entities;

  props.list.data = props.list.data.map(function (id) {
    return entities.users[id];
  });

  return props;
}, Users);
