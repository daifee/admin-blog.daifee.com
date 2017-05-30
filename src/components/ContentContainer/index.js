/**
 * 内容容器
 */

import React from 'react';
import {Layout} from 'antd';
import LeftMenu from '../LeftMenu';
import './index.css';

const {Content, Footer, Sider} = Layout;


export default function ContentContainer(props) {
  const {location, history, title, children} = props;

  return (
    <Layout>
      <Sider collapsible>
        <div className="logo">后台</div>
        <LeftMenu location={location} history={history} />
      </Sider>
      <Layout className='content-container'>
        <Content>
          <h2>{title}</h2>
          {children}
        </Content>
        <Footer>
          Created by daifee@daifee.com
        </Footer>
      </Layout>
    </Layout>
  );
}
