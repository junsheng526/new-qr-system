import { Container, ApplicationActions, ApplicationData } from '../ui/container';
import { SagaActions } from '../shared';
import { MapDispatchToProps, MapStateToProps, connect } from 'react-redux';
import { createAction } from '../redux-utils';

let mapStateToProps: MapStateToProps<ApplicationData, any, ApplicationStore> = (
  state,
  ownProps,
) => {
  return {};
};
let mapDispatchToProps: MapDispatchToProps<ApplicationActions, any> = (
  dispatch,
  ownProps,
) => ({
  initialization: () => dispatch(createAction(SagaActions.INIT)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Container);
