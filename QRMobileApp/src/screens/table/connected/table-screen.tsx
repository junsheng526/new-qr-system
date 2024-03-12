import { Table, TableActions, TableData } from '../ui/table-screen';
import { SagaActions } from '../shared';
import { createAction } from '../../../application/redux-utils';
import { connect, MapStateToProps, MapDispatchToProps } from 'react-redux';

let mapStateToProps: MapStateToProps<TableData, any, ApplicationStore> = (state, ownProps) => {
    return {
        userId: state.applicationReducer.userId
    };
}

let mapDispatchToProps: MapDispatchToProps<TableActions, any> = (dispatch, ownProps) => ({
    init: () => dispatch(createAction(SagaActions.INIT)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Table);