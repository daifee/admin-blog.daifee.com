/**
 * 预览文章
 */

import React from 'react';
import ContentContainer from '../../components/ContentContainer';
import ArticleList from '../../components/ArticleList';
import Authorization from '../../components/Authorization';
import connect from '../../utils/connectPage';
import * as actionArticle from '../../actions/article';
import marked from 'marked';
import {message} from 'antd';


class Article extends React.Component {
  constructor(props) {
    super(props);
    //
    this.markdown = null;
  }

  render() {
    let {session, history, location, article} = this.props;
    let {status, data} = article;

    data = data ? [data] : [];

    return (
      <Authorization session={session} history={history}>
        <ContentContainer title='文章详情' location={location} history={history}>
          <div>
            <ArticleList
            pagination={false}
            history={history}
            data={data}
            query={{
              page: 1,
              per_page: 20
            }}
            status={status} />
          </div>
          <br />
          {
            article.data ?
            (
              <div
                className='markdown-body editormd-preview-container'
                dangerouslySetInnerHTML={{__html: marked(article.data.content)}}
                 />
            ) : null
          }
        </ContentContainer>
      </Authorization>
    );
  }

  componentDidMount() {
    let {params} = this.props.match;
    console.log(this.props);
    let hide = message.loading('正在加载...');
    actionArticle.getOneById(params.id).then(function () {
      hide();
    }).catch(function (err) {
      hide();
      message.error(err.message);
      console.error(err);
    });
  }
}



export default connect(function (state) {
  let props = {
    article: {...state.pages.article},
    session: state.session
  };
  let entities = state.entities;

  props.article.data = entities.articles[props.article.data];

  return props;
}, Article);
