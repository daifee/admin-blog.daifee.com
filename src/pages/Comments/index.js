/**
 * 评论列表
 */
import React from 'react';
import {message, Form, Input, Select, Button} from 'antd';
import ContentContainer from '../../components/ContentContainer';
import CommentList from '../../components/CommentList';
import Authorization from '../../components/Authorization';
import * as actionsComments from '../../actions/comments';
import getQuery from '../../utils/getQuery';
import connect from '../../utils/connectPage';
import to from '../../utils/to';
import qs from 'qs';


class Comments extends React.Component {
  unlinstenRouter = null;

  handleSubmit = (e) => {
    e.preventDefault();
    let {history} = this.props;
    let query = this.props.form.getFieldsValue();
    query = qs.stringify(query);
    history.replace(to(`/comments?${query}`));
  };

  render() {
    let {list, form, history, location, session} = this.props;
    let {getFieldDecorator} = form;
    let query = list.query;
    // userId, articleId, status
    return (
      <Authorization session={session} history={history}>
        <ContentContainer location={location} title='评论列表' history={history}>
          <Form layout='inline' onSubmit={this.handleSubmit}>
            <Form.Item label='评论ID'>
              {getFieldDecorator('_id', {initialValue: query._id})(
                <Input
                  name='title'
                  type='text'
                  placeholder='评论ID' />
              )}
            </Form.Item>

            <Form.Item label='用户ID'>
              {getFieldDecorator('userId', {initialValue: query.userId})(
                <Input
                  name='title'
                  type='text'
                  placeholder='用户ID' />
              )}
            </Form.Item>

            <Form.Item label='文章ID'>
              {getFieldDecorator('articleId', {initialValue: query.articleId})(
                <Input
                  type='text'
                  placeholder='文章ID' />
              )}
            </Form.Item>

            <Form.Item label='状态'>
              {getFieldDecorator('status', {initialValue: query.status})(
                <Select
                  placeholder='选择状态'
                  style={{width: '100px'}}>
                  <Select.Option key='empty' value=''>不选</Select.Option>
                  <Select.Option key='published'>published</Select.Option>
                  <Select.Option key='deleted'>deleted</Select.Option>
                </Select>
              )}
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit">搜 索</Button>
            </Form.Item>
          </Form>

          <CommentList
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

  requestPageData() {
    let query = getQuery();

    actionsComments.fetch(query).catch(function (err) {
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
}, Form.create()(Comments));
