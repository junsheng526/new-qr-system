import { connect, MapDispatchToProps, MapStateToProps } from 'react-redux';
import { HomeScreenActions, HomeScreen } from '../ui/home';

let mapStateToProps: MapStateToProps<any, any, ApplicationStore> = (
    state,
    ownProps,
) => {
    return {

    };
};
let mapDispatchToProps: MapDispatchToProps<HomeScreenActions, any> = (
    dispatch,
    ownProps,
) => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
