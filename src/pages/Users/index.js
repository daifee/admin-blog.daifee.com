/**
 * 用户列表
 */
import React from 'react';
import {message} from 'antd';
import ContentContainer from '../../components/ContentContainer';
import UserList from '../../components/UserList';
import Authorization from '../../components/Authorization';
import * as actionsUsers from '../../actions/users';
import getQueryPagination from '../../utils/getQueryPagination';
import connect from '../../utils/connectPage';


class Users extends React.Component {
  unlinstenRouter = null;

  render() {
    let {list, history, session} = this.props;
    let {page, perPage, data, status} = list;

    return (
      <Authorization session={session} history={history}>
        <ContentContainer {...this.props}>
          <UserList
            history={history}
            data={data}
            page={page}
            perPage={perPage}
            status={status} />
        </ContentContainer>
      </Authorization>
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
    list: {...state.pages.users.list},
    session: state.session
  };
  let entities = state.entities;

  props.list.data = props.list.data.map(function (id) {
    return entities.users[id];
  });

  return props;
}, Users);
