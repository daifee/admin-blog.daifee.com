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
import getQuery from '../../utils/getQuery';
// import {Link} from 'react-router-dom';
import connect from '../../utils/connectPage';
import to from '../../utils/to';
import qs from 'qs';


class Articles extends React.Component {
  unlinstenRouter = null;

  handleSubmit = (e) => {
    e.preventDefault();
    let {history} = this.props;
    let query = this.props.form.getFieldsValue();
    query = qs.stringify(query);
    history.replace(to(`/articles?${query}`));
  };

  requestPageData = () => {
    let query = getQuery();

    actionsArticles.fetch(query).catch(function (err) {
      message.error(err.message, 2);
      console.error(err);
    });
  };

  render() {
    let {list, session, history, location, form} = this.props;
    let {getFieldDecorator} = form;
    let query = list.query;
    // userId, title, status
    return (
      <Authorization session={session} history={history}>
        <ContentContainer title='文章列表' location={location} history={history}>
          <Form layout='inline' onSubmit={this.handleSubmit}>
            <Form.Item label='文章ID'>
              {getFieldDecorator('_id', {initialValue: query._id})(
                <Input
                  name='_id'
                  type='text'
                  placeholder='文章ID' />
              )}
            </Form.Item>

            <Form.Item label='文章标题'>
              {getFieldDecorator('title', {initialValue: query.title})(
                <Input
                  name='title'
                  type='text'
                  placeholder='文章标题' />
              )}
            </Form.Item>

            <Form.Item label='用户ID'>
              {getFieldDecorator('userId', {initialValue: query.userId})(
                <Input
                  type='text'
                  placeholder='用户ID' />
              )}
            </Form.Item>

            <Form.Item label='状态'>
              {getFieldDecorator('status', {initialValue: query.status})(
                <Select
                  placeholder='选择状态'
                  style={{width: '100px'}}>
                  <Select.Option key='empty' value=''>不选</Select.Option>
                  <Select.Option key='published'>published</Select.Option>
                  <Select.Option key='unpublished' >unpublished</Select.Option>
                  <Select.Option key='deleted'>deleted</Select.Option>
                </Select>
              )}
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit">搜 索</Button>
            </Form.Item>
          </Form>

          <ArticleList
            {...list}
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
}, Form.create()(Articles));
