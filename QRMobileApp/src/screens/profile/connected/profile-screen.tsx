import { Profile, ProfileActions, ProfileData } from '../ui/profile-screen';
import { SagaActions } from '../shared';
import { createAction } from '../../../application/redux-utils';
import { connect, MapStateToProps, MapDispatchToProps } from 'react-redux';

let mapStateToProps: MapStateToProps<ProfileData, any, ApplicationStore> = (state, ownProps) => {
    return {};
}

let mapDispatchToProps: MapDispatchToProps<ProfileActions, any> = (dispatch, ownProps) => ({
    init: () => dispatch(createAction(SagaActions.INIT)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);