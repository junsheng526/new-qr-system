import { connect, MapDispatchToProps, MapStateToProps } from 'react-redux';
import { createActionData } from '../redux-utils';
import { StoreActions } from '../shared';
import { RegisterScreen, RegisterScreenActions } from '../ui/register-screen';

let mapStateToProps: MapStateToProps<any, any, ApplicationStore> = (
    state,
    ownProps,
) => {
    return {

    };
};
let mapDispatchToProps: MapDispatchToProps<RegisterScreenActions, any> = (
    dispatch,
    ownProps,
) => ({
    setUserId: (userId) => {
        dispatch(createActionData(StoreActions.SET, {
            userId: userId
        }))
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(RegisterScreen);
