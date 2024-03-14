import { connect, MapDispatchToProps, MapStateToProps } from 'react-redux';
import { LoginScreenActions, LoginScreen } from '../ui/login-screen';
import { createActionData } from '../redux-utils';
import { StoreActions } from '../shared';

let mapStateToProps: MapStateToProps<any, any, ApplicationStore> = (
    state,
    ownProps,
) => {
    return {

    };
};
let mapDispatchToProps: MapDispatchToProps<LoginScreenActions, any> = (
    dispatch,
    ownProps,
) => ({
    setUserId: (userId) => {
        dispatch(createActionData(StoreActions.SET, {
            userId: userId
        }))
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
