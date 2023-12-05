let navi_impl: any = null;

export type Navigate = (screen: string, params?: any) => void;

export const navigate: Navigate = (screen, param) => {
  if (navi_impl) {
    navi_impl(screen, param);
  } else {
    throw new Error('Navigation is not configured, please call setup');
  }
};

export const setupNav = (navi: Navigate) => {
  navi_impl = navi;
};
