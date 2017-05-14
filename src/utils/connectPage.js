import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';


export default function connectPage(mapStateToProps, Page) {
  return withRouter(connect(mapStateToProps)(Page));
}
