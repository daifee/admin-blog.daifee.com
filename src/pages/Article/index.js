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
        <ContentContainer title='文章详情' location={location}>
          <div>
            <ArticleList
            pagination={false}
            history={history}
            data={data}
            page={1}
            perPage={20}
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

    actionArticle.getOneById(params.id).catch(function (err) {
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
