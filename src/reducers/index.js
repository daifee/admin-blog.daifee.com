/**
 * 根reducer
 * 注意：
 * * 返回的store不要与react-router冲突
 * * 若数据是异步请求，其结构必须是：
 * ```js
 * {
 *   data: null,  // 数据
 *   status: 'init',  // 请求状态 'init'|'pending'|'success'|'failure'|'end'
 *   message: ''  // 附加说明
 * }
 * ```
 */
import entitiesArticles from './entities/articles';
import entitiesComments from './entities/comments';
import entitiesUsers from './entities/users';

import pagesLogin from './pages/login';
import pagesArticles from './pages/articles';
import pagesComments from './pages/comments';
import pagesUsers from './pages/users';
import pagesArticle from './pages/article';
import pagesArticleEdit from './pages/articleEdit';

import session from './session';



const DEFAULT_STATE = {
  entities: {},
  pages: {},
  session: null
};

/**
 * 返回store的根reducer
 */
export default function reducers(state = DEFAULT_STATE, action = {}) {
  state = {...DEFAULT_STATE, ...state};

  let nextState = {
    /**
     * 实体数据：
     * 对应数据库、接口返回的数据
     * 如果需要“实体数据”，只用“实体数据”对应key引用
     */
    entities: {
      articles: entitiesArticles(state.entities.articles, action),
      comments: entitiesComments(state.entities.comments, action),
      users: entitiesUsers(state.entities.users, action)
    },

    /**
     * 每个`Page`的数据
     */
    pages: {
      login: pagesLogin(state.pages.login, action),
      article: pagesArticle(state.pages.article, action),
      articleEdit: pagesArticleEdit(state.pages.articleEdit, action),
      articles: pagesArticles(state.pages.articles, action),
      comment: {},
      comments: pagesComments(state.pages.comments, action),
      user: {},
      userEdit: {},
      users: pagesUsers(state.pages.users, action),
      notFound: {}
    },

    // 当前会话用户
    session: session(state.session, action)
  };

  return nextState;
}
