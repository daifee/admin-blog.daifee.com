import {
  REQUEST_GET_ARTICLE_SUCCESS,
  REQUEST_GET_ARTICLES_SUCCESS,
  REQUEST_DELETE_ARTICLE_SUCCESS,
  REQUEST_PATCH_ARTICLE_SUCCESS
} from '../../actionTypes';


export default function articles(state = {}, action) {
  let nextState;

  switch (action.type) {
    case REQUEST_GET_ARTICLE_SUCCESS:
    case REQUEST_PATCH_ARTICLE_SUCCESS:
      let article = action.data;
      let oldArticle = state[article.id] || {};
      nextState = {...state};
      nextState[article.id] = {...oldArticle, ...article};
      break;
    case REQUEST_GET_ARTICLES_SUCCESS:
      nextState = {...state};
      action.data.map(function (article) {
        let oldArticle = nextState[article.id] || {};
        return nextState[article.id] = {...oldArticle, ...article};
      });
      break;
    case REQUEST_DELETE_ARTICLE_SUCCESS:
      nextState = {...state};
      delete nextState[action.id];
      break;
    default:
      nextState = state;
  }

  return nextState;
}
