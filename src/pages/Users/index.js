/**
 * 用户列表
 */
import React from 'react';
import {message, Form, Input, Select, Button} from 'antd';
import ContentContainer from '../../components/ContentContainer';
import UserList from '../../components/UserList';
import Authorization from '../../components/Authorization';
import * as actionsUsers from '../../actions/users';
import getQuery from '../../utils/getQuery';
import connect from '../../utils/connectPage';
import to from '../../utils/to';
import qs from 'qs';

class Users extends React.Component {
  unlinstenRouter = null;

  handleSubmit = (e) => {
    e.preventDefault();
    let {history} = this.props;
    let query = this.props.form.getFieldsValue();
    query = qs.stringify(query);
    history.replace(to(`/users?${query}`));
  };

  render() {
    let {list, form, history, location, session} = this.props;
    let {getFieldDecorator} = form;
    let query = list.query;
    // name, email, role, status
    return (
      <Authorization session={session} history={history}>
        <ContentContainer location={location} title='用户列表' history={history}>
          <Form layout='inline' onSubmit={this.handleSubmit}>
            <Form.Item label='ID'>
              {getFieldDecorator('_id', {initialValue: query._id})(
                <Input
                  name='_id'
                  type='text'
                  placeholder='ID' />
              )}
            </Form.Item>

            <Form.Item label='用户名'>
              {getFieldDecorator('name', {initialValue: query.name})(
                <Input
                  name='name'
                  type='text'
                  placeholder='用户名' />
              )}
            </Form.Item>

            <Form.Item label='邮箱'>
              {getFieldDecorator('email', {initialValue: query.email})(
                <Input
                  type='text'
                  placeholder='邮箱' />
              )}
            </Form.Item>

            <Form.Item label='角色'>
              {getFieldDecorator('role', {initialValue: query.role})(
                <Select
                  placeholder='选择角色'
                  style={{width: '100px'}}>
                  <Select.Option key='empty' value=''>不选</Select.Option>
                  <Select.Option key='user'>user</Select.Option>
                  <Select.Option key='administrator' >administrator</Select.Option>
                </Select>
              )}
            </Form.Item>

            <Form.Item label='状态'>
              {getFieldDecorator('status', {initialValue: query.status})(
                <Select
                  placeholder='选择状态'
                  style={{width: '100px'}}>
                  <Select.Option key='empty' value=''>不选</Select.Option>
                  <Select.Option key='normal'>normal</Select.Option>
                  <Select.Option key='blocked' >blocked</Select.Option>
                  <Select.Option key='deleted'>deleted</Select.Option>
                </Select>
              )}
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit">搜 索</Button>
            </Form.Item>
          </Form>

          <UserList
            history={history}
            {...list} />
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

    actionsUsers.fetch(query).catch(function (err) {
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
}, Form.create()(Users));
