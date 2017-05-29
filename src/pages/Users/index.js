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
    let {list, history, location, session} = this.props;
    let {page, per_page, data, status} = list;

    return (
      <Authorization session={session} history={history}>
        <ContentContainer location={location} title='用户列表' history={history}>
          <UserList
            history={history}
            data={data}
            page={page}
            per_page={per_page}
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
    let {page, per_page} = getQueryPagination({
      page: 1,
      per_page: 20
    });

    actionsUsers.fetch(page, per_page).catch(function (err) {
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
