const INITIAL_STATE = {
  viewTheme: true,
};

export function themeReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "GET_Theme":
      return {
        ...state,
        viewTheme: state.viewTheme,
      };
    case "SET_Theme":
      console.log("SET_Theme",action.Themes)
      return {
        ...state,
        viewTheme:action.Theme
      };
    default:
      return state;
  }
}
