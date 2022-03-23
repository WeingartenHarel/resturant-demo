const INITIAL_STATE = {
  Items: JSON.parse(localStorage.getItem("Items")) || null,
  currItem: JSON.parse(localStorage.getItem("currItem")) || null,
  chooseItem:null,
  ItemsCount:null,
};

export function itemReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "GET_Item":
      // console.log('GET_Item action',action.ItemId, typeof action.ItemId)
      return {
        ...state,
        currItem:  state.Items.filter((Item) => Item.Table === +action.ItemId)[0],
      };
    case "SET_Items":
      // console.log("SET_Items",action.Items)
      return {
        ...state,
        Items: action.Items,
        ItemsCount:action.Items.length
      };
    case "SET_ITEM_BY_ID":
      return {
        ...state,
        currItem: state.Items.filter((Item) => Item.Table === action.ItemId),  
      };
    case "Choose_Item":
      // console.log('Choose_Item reducer',action.Item, typeof action.Item)
      return {
        ...state,
        chooseItem: state.Items.filter((Item) => Item.Table === action.Item),  
      };
    case "SET_Item":
      return {
        ...state,
        currItem: action.Item,
      };
    case "REMOVE_Item":
      return {
        ...state,
        Items: state.Items.filter((Item) => Item.Table !== action.ItemId),
      };
    case "ADD_Item":
      return {
        ...state,
        Items: [...state.Items, action.Item],
      };
    case "EDIT_ITEM":
      // console.log('EDIT_ITEM',action.Item)
      return {
        ...state,
        Items: state.Items.map((Item) =>
          Item.Table === action.Item.Table ? action.Item : Item
        ),
      };
    default:
      return state;
  }
}
