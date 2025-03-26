enum LocalStorageKeys {
  SIDEBAR_PIN_STATE = 'sidebarPinState',
}

export const LocalStorage = {
  getSidebarPinState(): boolean {
    let value;
    try {
      value = JSON.parse(
        window.localStorage.getItem(LocalStorageKeys.SIDEBAR_PIN_STATE) ||
          'true',
      );
    } catch {
      return true;
    }
    return !!value;
  },
  setSidebarPinState(state: boolean) {
    return window.localStorage.setItem(
      LocalStorageKeys.SIDEBAR_PIN_STATE,
      JSON.stringify(state),
    );
  },
};
