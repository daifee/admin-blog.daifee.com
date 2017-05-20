/**
 * 内容容器
 */

import React from 'react';
import {Layout} from 'antd';
import LeftMenu from '../LeftMenu';

const {Content, Footer, Sider} = Layout;


export default function ContentContainer(props) {
  const {location, title, children} = props;

  return (
    <Layout>
      <Sider collapsible>
        <div className="logo">后台</div>
        <LeftMenu location={location} />
      </Sider>
      <Layout>
        <Content style={{ margin: '0 16px' }}>
          <h2>{title}</h2>
          {children}
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Created by daifee@daifee.com
        </Footer>
      </Layout>
    </Layout>
  );
}
