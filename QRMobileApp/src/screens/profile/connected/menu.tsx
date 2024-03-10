import { ProfileMenu, ProfileMenuActions } from '../ui/menu';
import { SagaActions } from '../shared';
import { createAction } from '../../../application/redux-utils';
import { connect, MapStateToProps, MapDispatchToProps } from 'react-redux';

let mapStateToProps: MapStateToProps<any, any, any> = (state, ownProps) => {
    return {};
}

let mapDispatchToProps: MapDispatchToProps<ProfileMenuActions, any> = (dispatch, ownProps) => ({
    init: () => dispatch(createAction(SagaActions.INIT)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileMenu);