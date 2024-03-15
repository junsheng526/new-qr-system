/**
 * This is a type file for this application
 *
 * use to store typescript checkings
 */

type NaviFunction = (str: Screen, param: any) => void;

interface Action {
  type: string;
  data?: any;
  navigate?: NaviFunction;
}

interface HasNavigate {
  navigate: NaviFunction;
}

type ReducerFormat<T> = (state: T, action: Action) => T;

type Screen =
  'Login'
  | 'Home'
  | 'Table'
  | 'Signup'
  | 'Main'
  | 'TableLanding'
  | 'ProfileScreen'
  | 'ProfileMenuScreen'
  | 'OrdersLanding'
  | 'ProfileMenuEditScreen'