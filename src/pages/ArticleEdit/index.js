/**
 * 修改文章
 */

import React from 'react';
import {
  Form,
  Input,
  Button,
  Col
} from 'antd';
import Authorization from '../../components/Authorization';
import connect from '../../utils/connectPage';
import * as actionArticle from '../../actions/article';
import './style.css';


class ArticleEdit extends React.Component {
  constructor(props) {
    super(props);

    this.editor = null;
  }

  handleChangeTitle = (e) => {
    let title = e.target.value;
    actionArticle.edit({title});
  };

  handleChangeContent = (content) => {
    actionArticle.edit({content});
  };

  handleSubmit = (e) => {
    let {article} = this.props;

    console.log(article);

    e.preventDefault();
  };

  render() {
    let {session, article, history} = this.props;
    let data = article.data;

    if (!data) {
      data = {};
    }

    return (
      <Authorization session={session} history={history}>
        <Form id='article-edit' onSubmit={this.handleSubmit}>
          <Form.Item className='title-section'>
            <Col span={17}>
              <Input
                size='large'
                autoFocus
                onChange={this.handleChangeTitle}
                value={data.title} />
            </Col>
            <Col span={1}></Col>
            <Col span={6}>
              <Button size='large' type='primary' htmlType='submit'>提 交</Button>
            </Col>
          </Form.Item>

          <Form.Item>
            <Col>
              <div id="editormd" ref={(node) => this.editor = node}>
                <textarea
                  style={{display: 'none'}}
                  value={data.content} />
              </div>
            </Col>
          </Form.Item>
        </Form>
      </Authorization>
    );
  }

  componentDidMount() {
    this.initMarkdown();

    this.fetchArticle();
  }

  fetchArticle() {
    let {params} = this.props.match;

    actionArticle.getOneById(params.id).catch(function (err) {
      console.error(err);
    });
  }

  initMarkdown() {
    let $ = window.$;
    let editormd = window.editormd;
    let height = $(window).height();
    let editorTop = this.editor.getBoundingClientRect().top;
    let editorHeight = height - editorTop;
    let _this = this;

    $(this.editor).parent().css('height', editorHeight);

    editormd("editormd", {
      path : "/editor/lib/", // Autoload modules mode, codemirror, marked... dependents libs path
      height: '100%',
      width: 'auto',
      toolbarIcons: 'mini',
      onchange: function () {
        _this.handleChangeContent(this.getValue());
      }
    });
  }
}


export default connect(function (state) {
  let props = {
    article: {...state.pages.articleEdit},
    session: state.session
  };

  return props;
}, ArticleEdit);
