let navi_impl: any = null;
let reset_impl: any = null;
let goBack_impl: any = null;

export type Navigate = (screen: Screen, param?: any) => void;

export const navigate: Navigate = (screen, param) => {
  if (navi_impl) {
    navi_impl(screen, param);
  } else {
    throw new Error('Navigation is not configured, please call setup');
  }
};

export const reset = (screen: string, params: any) => {
  if (reset_impl) {
    reset_impl(screen, params);
  } else {
    throw new Error('Reset is not configured, please call setup');
  }
};

export const goBack = () => {
  if (goBack_impl) {
    goBack_impl();
  } else {
    throw new Error("Go back is not configured, please call setup");
  }
}

export const setupNav = (navi: Navigate, reset: Navigate, goBack: () => void) => {
  navi_impl = navi;
  reset_impl = reset;
  goBack_impl = goBack;
};
