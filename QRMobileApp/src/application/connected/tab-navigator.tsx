import { connect, MapDispatchToProps, MapStateToProps } from 'react-redux';
import { TabNavigator, TabNavigatorActions } from '../ui/tab-navigator';

let mapStateToProps: MapStateToProps<any, any, ApplicationStore> = (
    state,
    ownProps,
) => {
    return {

    };
};
let mapDispatchToProps: MapDispatchToProps<TabNavigatorActions, any> = (
    dispatch,
    ownProps,
) => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(TabNavigator);
