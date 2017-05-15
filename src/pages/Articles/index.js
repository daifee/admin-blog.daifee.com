/**
 * 文章列表
 *
 */
import React from 'react';
import {message} from 'antd';
import ContentContainer from '../../components/ContentContainer';
import Authorization from '../../components/Authorization';
import ArticleList from '../../components/ArticleList';
import * as actionsArticles from '../../actions/articles';
import getQueryPagination from '../../utils/getQueryPagination';
// import {Link} from 'react-router-dom';
import connect from '../../utils/connectPage';



class Articles extends React.Component {
  unlinstenRouter = null;

  handlePaginate = (page) => {
    let {list, history} = this.props;
    let {perPage} = list;
    history.push(`/articles?page=${page}&perPage=${perPage}`);
  };

  requestPageData() {
    let {page, perPage} = getQueryPagination({
      page: 1,
      perPage: 20
    });

    actionsArticles.fetch(page, perPage).catch(function (err) {
      message.error(err.message, 2);
    });
  }

  render() {
    let {list, session, history} = this.props;
    let {page, perPage, data, status} = list;

    return (
      <Authorization session={session} history={history}>
        <ContentContainer {...this.props}>
          <ArticleList
            data={data}
            page={page}
            perPage={perPage}
            status={status}
            history={history} />
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
}



export default connect(function (state) {
  let props = {
    list: {...state.pages.articles.list},
    session: state.session
  };
  let entities = state.entities;

  props.list.data = props.list.data.map(function (id) {
    return entities.articles[id];
  });

  return props;
}, Articles);
