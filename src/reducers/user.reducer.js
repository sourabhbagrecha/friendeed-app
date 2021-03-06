const userReducer = (state, action) => {
  switch (action.type) {
    case "SET_TOKEN":
      return { ...state, token: action.payload }
    case "SET_USER":
      return { ...state, user: action.payload }
    case "SET_USER_ID":
      return { ...state, userId: action.payload }
    default:
      return state
  }
}

export default userReducer