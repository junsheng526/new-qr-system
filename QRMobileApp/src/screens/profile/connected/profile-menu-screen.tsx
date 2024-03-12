import { ProfileMenu, ProfileMenuActions, ProfileMenuData } from '../ui/profile-menu-screen';
import { SagaActions } from '../shared';
import { createAction } from '../../../application/redux-utils';
import { connect, MapStateToProps, MapDispatchToProps } from 'react-redux';

let mapStateToProps: MapStateToProps<ProfileMenuData, any, ApplicationStore> = (state, ownProps) => {
    return {};
}

let mapDispatchToProps: MapDispatchToProps<ProfileMenuActions, any> = (dispatch, ownProps) => ({
    init: () => dispatch(createAction(SagaActions.INIT)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileMenu);