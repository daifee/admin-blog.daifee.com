import {
  REQUEST_GET_ARTICLES,
  REQUEST_GET_ARTICLES_FAILURE,
  REQUEST_GET_ARTICLES_SUCCESS,
  REQUEST_DELETE_ARTICLE,
  REQUEST_DELETE_ARTICLE_SUCCESS,
  REQUEST_DELETE_ARTICLE_FAILURE
} from '../../actionTypes';



export default function articles(state = {}, action) {
  return {
    list: list(state.list, action)
  };
}


const DEFAULT_LIST_STATE = {
  data: [],
  status: 'init',
  message: 'init',
  query: {
    page: 1,
    per_page: 20
  }
};


function list(state = DEFAULT_LIST_STATE, action) {
  let nextState;

  switch (action.type) {
    case REQUEST_GET_ARTICLES:
    case REQUEST_DELETE_ARTICLE:
      nextState = {...state, ...{
        status: 'pending',
        message: action.message
      }};
      break;
    case REQUEST_GET_ARTICLES_FAILURE:
    case REQUEST_DELETE_ARTICLE_FAILURE:
      nextState = {...state, ...{
        status: 'failure',
        message: action.message
      }};
      break;
    case REQUEST_GET_ARTICLES_SUCCESS:
      nextState = getArticlesSuccess(state, action);
      break;
    case REQUEST_DELETE_ARTICLE_SUCCESS:
      nextState = deleteArticleSuccess(state, action);
      break;
    default:
      nextState = state;
  }

  return nextState;
}


function getArticlesSuccess(state, action) {
  let data = action.data.map(function (article) {
    return article.id;
  });

  let nextState = {...state, ...{
    data: [...data],
    status: 'success',
    query: {...state.query, ...action.query},
    message: action.message
  }};

  return nextState;
}


function deleteArticleSuccess(state, action) {
  let nextState = {...state, ...{
    status: 'success',
    message: action.message
  }};

  nextState.data = nextState.data.filter(function (item) {
    return item !== action.id;
  });

  return nextState;
}
