import { Orders, OrdersActions, OrdersData } from '../ui/orders-screen';
import { SagaActions } from '../shared';
import { createAction } from '../../../application/redux-utils';
import { connect, MapStateToProps, MapDispatchToProps } from 'react-redux';

let mapStateToProps: MapStateToProps<OrdersData, any, ApplicationStore> = (state, ownProps) => {
    return {
    };
}

let mapDispatchToProps: MapDispatchToProps<OrdersActions, any> = (dispatch, ownProps) => ({
    init: () => dispatch(createAction(SagaActions.INIT)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Orders);