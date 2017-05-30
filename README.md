# admin-blog.daifee.com

访问地址[https://daifee.github.io/admin-blog.daifee.com/articles](https://daifee.github.io/admin-blog.daifee.com/articles)

[blog.daifee.com](https://blog.daifee.com)的后台


依赖：


* [create-react-app](https://github.com/facebookincubator/create-react-app)
* [react](https://github.com/facebook/react)
* [react-router](https://github.com/ReactTraining/react-router)
* [redux](https://github.com/reactjs/redux)
* [react-redux](https://github.com/reactjs/react-redux)
* [ant-design](https://github.com/ant-design/ant-design/)
* [editor.md](https://github.com/pandao/editor.md)
* ...


## 问题

* redux 部分有点啰嗦，store, actions, reducers 应该放在一个独立目录，方便修改。
* 异步数据的reducer和action结构基本一个样，可以考虑重用。
* 应该定义`query`表示查询，代替“分页”，这样扩展性更强
