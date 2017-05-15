import React, {
  Component
} from 'react';
import {
  Form,
  Icon,
  Input,
  Button
} from 'antd';
import './style.css';
import * as actionsLogin from '../../actions/login';
import {message} from 'antd';
import connect from '../../utils/connectPage';


class Login extends Component {
  handleSubmit = (event) => {
    let {data, history} = this.props;
    let {name, password} = data;

    let hideLoading = message.loading('正在登录', 0);

    actionsLogin.login(name, password).then(function (user) {
      message.success('成功登录', 1.5, function () {
        // 重定向
        history.replace('/articles');
      });
    }).catch(function (err) {
      message.error(err.message, 2);
    }).then(hideLoading);

    // 阻止提交表单
    event.preventDefault();
  };

  handleInputName = (event) => {
    let name = event.target.value;
    actionsLogin.inputName(name);
  };

  handleInputPassword = (event) => {
    let password = event.target.value;
    actionsLogin.inputPassword(password);
  };

  render() {
    let {data} = this.props;
    let {name, password} = data;

    return (
      <div id="login">
        <h1>后台</h1>
        <Form className="login-form" onSubmit={this.handleSubmit}>
          <Form.Item>
            <Input
              autoFocus
              onChange={this.handleInputName}
              addonBefore={<Icon type="user" />}
              placeholder="Username"
              value={name} />
          </Form.Item>
          <Form.Item>
            <Input
              onChange={this.handleInputPassword}
              addonBefore={<Icon type="lock" />}
              type="password"
              placeholder="Password"
              value={password} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-button">
              登 录
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}



export default connect(function (state) {
  let props = {...state.pages.login};

  return props;
}, Login);
