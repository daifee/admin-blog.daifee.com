import {
  REQUEST_GET_ARTICLE,
  REQUEST_GET_ARTICLE_SUCCESS,
  REQUEST_GET_ARTICLE_FAILURE,

  REQUEST_DELETE_ARTICLE,
  REQUEST_DELETE_ARTICLE_SUCCESS,
  REQUEST_DELETE_ARTICLE_FAILURE
} from '../../actionTypes';


const DEFAULT_STATE = {
  data: '',
  status: 'init',
  message: 'init'
};

export default function article(state = DEFAULT_STATE, action) {
  let nextState;

  switch (action.type) {
    case REQUEST_GET_ARTICLE:
    case REQUEST_DELETE_ARTICLE:
      nextState = {...state, ...{
        status: 'pending',
        message: action.message
      }};
      break;
    case REQUEST_GET_ARTICLE_FAILURE:
    case REQUEST_DELETE_ARTICLE_FAILURE:
      nextState = {...state, ...{
        status: 'failure',
        message: action.message
      }};
      break;
    case REQUEST_GET_ARTICLE_SUCCESS:
      nextState = {...state, ...{
        status: 'success',
        data: action.data.id,
        message: action.message
      }};
      break;
    case REQUEST_DELETE_ARTICLE_SUCCESS:
      nextState = {...state, ...{
        status: 'success',
        message: action.message
      }};
      delete nextState.data;
      break;
    default:
      nextState = state;
  }

  return nextState;
}
