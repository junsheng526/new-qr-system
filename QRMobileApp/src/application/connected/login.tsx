import { connect, MapDispatchToProps, MapStateToProps } from 'react-redux';
import { LoginScreenActions, LoginScreen } from '../ui/login';

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

});

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
