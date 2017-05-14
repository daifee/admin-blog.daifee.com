import {
  REQUEST_GET_ARTICLE_SUCCESS,
  REQUEST_GET_ARTICLES_SUCCESS
} from '../../actionTypes';


export default function articles(state = {}, action) {
  let nextState = state;

  switch (action.type) {
    case REQUEST_GET_ARTICLE_SUCCESS:
      let oldArticle = nextState[article.id] || {};
      let article = action.data;
      nextState[article.id] = {...oldArticle, ...article};
      break;
    case REQUEST_GET_ARTICLES_SUCCESS:
      action.data.map(function (article) {
        let oldArticle = nextState[article.id] || {};
        nextState[article.id] = {...oldArticle, ...article};
      });
      break;
  }

  return nextState;
}
