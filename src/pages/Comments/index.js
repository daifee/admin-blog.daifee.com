/**
 * 评论列表
 */
import React from 'react';
import {message} from 'antd';
import ContentContainer from '../../components/ContentContainer';
import CommentList from '../../components/CommentList';
import Authorization from '../../components/Authorization';
import * as actionsComments from '../../actions/comments';
import getQueryPagination from '../../utils/getQueryPagination';
import connect from '../../utils/connectPage';


class Comments extends React.Component {
  unlinstenRouter = null;

  render() {
    let {list, history, session} = this.props;
    let {page, perPage, data, status} = list;

    return (
      <Authorization session={session} history={history}>
        <ContentContainer {...this.props}>
          <CommentList
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

    actionsComments.fetch(page, perPage).catch(function (err) {
      message.error(err.message, 2);
      console.error(err);
    });
  }
}



export default connect(function (state) {
  let props = {
    list: {...state.pages.comments.list},
    session: state.session
  };
  let entities = state.entities;

  props.list.data = props.list.data.map(function (id) {
    return entities.comments[id];
  });

  return props;
}, Comments);
