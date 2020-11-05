import userReducer from "../reducers/user.reducer";
import contextFactory from "./factory.context";

const setToken = (dispatch) => (payload) => {
  dispatch({ type: "SET_TOKEN", payload })
}

const setUser = (dispatch) => (payload) => {
  dispatch({ type: "SET_USER", payload })
}

const setUserId = (dispatch) => (payload) => {
  dispatch({ type: "SET_USER_ID", payload })
}

const defaultValue = {
  token: null,
  user: null,
  userId: null
}

export const { Context: UserContext, Provider: UserProvider } = contextFactory(userReducer, { setToken, setUser, setUserId }, defaultValue)
