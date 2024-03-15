import { SagaActions } from '../shared';
import { createAction } from '../../../application/redux-utils';
import { connect, MapStateToProps, MapDispatchToProps } from 'react-redux';
import { ProfileMenuEdit, ProfileMenuEditActions, ProfileMenuEditData } from '../ui/profile-menu-edit-screen';

let mapStateToProps: MapStateToProps<ProfileMenuEditData, any, ApplicationStore> = (state, ownProps) => {
    return {
        username: state.applicationReducer.userId.displayName
    };
}

let mapDispatchToProps: MapDispatchToProps<ProfileMenuEditActions, any> = (dispatch, ownProps) => ({
    init: () => dispatch(createAction(SagaActions.INIT)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileMenuEdit);