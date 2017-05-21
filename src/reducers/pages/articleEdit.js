import {
  REQUEST_GET_ARTICLE,
  REQUEST_GET_ARTICLE_SUCCESS,
  REQUEST_GET_ARTICLE_FAILURE,
  EDIT_ARTICLE
} from '../../actionTypes';


const DEFAULT_STATE = {
  data: '',
  status: 'init',
  message: 'init'
};


export default function articleEdit(state = DEFAULT_STATE, action) {
  let nextState;

  switch (action.type) {
    case REQUEST_GET_ARTICLE:
      nextState = {...state, ...{
        status: 'pending',
        message: action.message
      }};
      break;
    case REQUEST_GET_ARTICLE_FAILURE:
      nextState = {...state, ...{
        status: 'failure',
        message: action.message
      }};
      break;
    case REQUEST_GET_ARTICLE_SUCCESS:
      nextState = {...state, ...{
        status: 'success',
        data: action.data,
        message: action.message
      }};
      break;
    case EDIT_ARTICLE:
      nextState = {
        ...state,
        data: {...state.data, ...action.data}
      };
      break;
    default:
      nextState = state;
  }

  return nextState;
}
