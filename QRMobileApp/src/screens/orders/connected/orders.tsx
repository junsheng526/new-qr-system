import { Orders, OrdersActions } from '../ui/orders';
import { SagaActions } from '../shared';
import { createAction } from '../../../application/redux-utils';
import { connect, MapStateToProps, MapDispatchToProps } from 'react-redux';

let mapStateToProps: MapStateToProps<any, any, any> = (state, ownProps) => {
    return {};
}

let mapDispatchToProps: MapDispatchToProps<OrdersActions, any> = (dispatch, ownProps) => ({
    init: () => dispatch(createAction(SagaActions.INIT)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Orders);