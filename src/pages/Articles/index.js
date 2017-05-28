/**
 * 文章列表
 *
 */
import React from 'react';
import {message, Form, Input, Select, Button} from 'antd';
import ContentContainer from '../../components/ContentContainer';
import Authorization from '../../components/Authorization';
import ArticleList from '../../components/ArticleList';
import * as actionsArticles from '../../actions/articles';
import getQueryPagination from '../../utils/getQueryPagination';
// import {Link} from 'react-router-dom';
import connect from '../../utils/connectPage';
import to from '../../utils/to';


class Articles extends React.Component {
  unlinstenRouter = null;

  handlePaginate = (page) => {
    let {list, history} = this.props;
    let {perPage} = list;
    history.push(to(`/articles?page=${page}&perPage=${perPage}`));
  };

  handleSubmit = () => {
    console.log('submit');
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
    let {list, session, history, location} = this.props;
    let {page, perPage, data, status} = list;
    // userId, title, status
    return (
      <Authorization session={session} history={history}>
        <ContentContainer title='文章列表' location={location} history={history}>
          <Form layout='inline' onSubmit={this.handleSubmit}>
            <Form.Item label='用户ID'>
              <Input
                type='text'
                placeholder='用户ID' />
            </Form.Item>

            <Form.Item label='文章标题'>
              <Input
                type='text'
                placeholder='文章标题' />
            </Form.Item>

            <Form.Item label='文章状态'>
              <Select placeholder='选择文章状态' style={{width: '100px'}}>
                <Option value="published">published</Option>
                <Option value="unpublished">unpublished</Option>
                <Option value="deleted">deleted</Option>
              </Select>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit">搜 索</Button>
            </Form.Item>
          </Form>

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
