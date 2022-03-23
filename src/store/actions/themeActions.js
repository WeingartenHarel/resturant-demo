// Action Dispatcher
export function setTheme(Theme) {
  console.log('setTheme',Theme)
  return async (dispatch) => {
    dispatch({ type: "SET_Theme", Theme });
  };
}




