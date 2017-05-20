/**
 * 预览文章
 */

import React from 'react';
import ContentContainer from '../../components/ContentContainer';
import Authorization from '../../components/Authorization';


export default class Article extends React.Component {

  render() {
    let {session, history, location} = this.props;

    return (
      <Authorization session={session} history={history}>
        <ContentContainer location={location}>
          <div>文章</div>
        </ContentContainer>
      </Authorization>
    );
  }
}
