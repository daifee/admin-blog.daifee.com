import {
  REQUEST_GET_ARTICLES,
  REQUEST_GET_ARTICLES_FAILURE,
  REQUEST_GET_ARTICLES_SUCCESS
} from '../../actionTypes';



export default function articles(state = {}, action) {
  return {
    list: list(state.list, action)
  };
}


const DEFAULT_LIST_STATE = {
  data: [],
  status: 'init',
  message: '',
  page: 1,
  perPage: 20
};


function list(state = DEFAULT_LIST_STATE, action) {
  let nextState = state;

  switch (action.type) {
    case REQUEST_GET_ARTICLES:
      nextState = {...nextState, ...{
        status: 'pending',
        message: action.message
      }};
      break;
    case REQUEST_GET_ARTICLES_FAILURE:
      nextState = {...nextState, ...{
        status: 'failure',
        message: action.message
      }};
      break;
    case REQUEST_GET_ARTICLES_SUCCESS:
      let data = action.data.map(function (article) {
        return article.id;
      });

      nextState = {...nextState, ...{
        data: [...data],
        status: 'success',
        page: action.page,
        perPage: action.perPage,
        message: action.message
      }};
      break;
    default:
      // eslint-disable-line
  }

  return nextState;
}
