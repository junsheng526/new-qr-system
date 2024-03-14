import { connect, MapDispatchToProps, MapStateToProps } from 'react-redux';
import { Splash, SplashAction } from '../ui/splash-screen';

let mapStateToProps: MapStateToProps<any, any, ApplicationStore> = (
  state,
  ownProps,
) => {
  return {

  };
};

let mapDispatchToProps: MapDispatchToProps<SplashAction, any> = (
  dispatch,
  ownProps
) => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(Splash);