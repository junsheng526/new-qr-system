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

interface HasSelectedTab {
  selectedTab: string;
}

interface NamedComponent {
  name: string;
  component: (props: any) => React.JSX.Element;
}

type ReducerFormat<T> = (state: T, action: Action) => T;

type Screen =
  'unsecure'
  | 'secure'
  | 'Login'
  | 'Home'
  | 'Table'