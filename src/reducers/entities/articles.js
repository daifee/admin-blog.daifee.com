import {
  REQUEST_GET_ARTICLE_SUCCESS,
  REQUEST_GET_ARTICLES_SUCCESS
} from '../../actionTypes';


export default function articles(state = {}, action) {
  let nextState = state;

  switch (action.type) {
    case REQUEST_GET_ARTICLE_SUCCESS:
      let article = action.data;
      let oldArticle = nextState[article.id] || {};
      nextState[article.id] = {...oldArticle, ...article};
      break;
    case REQUEST_GET_ARTICLES_SUCCESS:
      action.data.map(function (article) {
        let oldArticle = nextState[article.id] || {};
        return nextState[article.id] = {...oldArticle, ...article};
      });
      break;
    default:
      // eslint-disable-line
  }

  return nextState;
}
