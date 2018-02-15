import { push } from "react-router-redux"
import {
	LOGIN_RESPONSE,
	LOGOUT_REQUEST,
	CHECK_USER_RESPONSE,
	CHANGE_LANGUAGE,
	CHANGE_SERVER,
} from "../actions"
import { Middleware, MiddlewareAPI } from "redux"
import { AppState, ApiState } from "../types"

const formatApi = (api: ApiState) => JSON.stringify(api)

const persist: Middleware = ({ dispatch, getState }: MiddlewareAPI<AppState>) => next => action => {
	next(action)

	switch (action.type) {
		case LOGIN_RESPONSE:
		case CHANGE_LANGUAGE:
		case CHANGE_SERVER:
			if (window.localStorage) {
				window.localStorage.setItem("api", formatApi(getState().api))
			}
			break

		case LOGOUT_REQUEST:
			if (window.localStorage) {
				window.localStorage.removeItem("api")
			}
			dispatch(push("/login"))
			break

		case CHECK_USER_RESPONSE:
			if (!action.ok) {
				dispatch(push("/login"))
			}
			break

		default:
			break
	}
}

export default persist
