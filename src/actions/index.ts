import { Server, UserPermissions, CatalogType, DataObject, Error } from "../types"
import { Action } from "redux"
import { DashboardAction } from "./dashboard"
import { CommandAction } from "./command"
import { DataViewAction } from "./dataview"
import { NotificationAction } from "./notification"
import { PlayerAction } from "./player"
import { PluginAction } from "./plugin"
import { SettingsAction } from "./settings"

export enum TypeKeys {
	SERVLETS_REQUEST = "SERVLETS_REQUEST",
	SERVLETS_RESPONSE = "SERVLETS_RESPONSE",
	CHANGE_LANGUAGE = "CHANGE_LANG",
	CHANGE_SERVER = "CHANGE_SERVER",
	LOGIN_REQUEST = "LOGIN_REQUEST",
	LOGIN_RESPONSE = "LOGIN_RESPONSE",
	LOGOUT_REQUEST = "LOGOUT_REQUEST",
	LOGOUT_RESPONSE = "LOGOUT_RESPONSE",
	CHECK_USER_REQUEST = "CHECK_USER_REQUEST",
	CHECK_USER_RESPONSE = "CHECK_USER_RESPONSE",
	CATALOG_REQUEST = "CATALOG_REQUEST",
	CATALOG_RESPONSE = "CATALOG_RESPONSE",
}

export interface ServletsRequestAction extends Action {
	type: TypeKeys.SERVLETS_REQUEST
}
export function requestServlets(): ServletsRequestAction {
	return {
		type: TypeKeys.SERVLETS_REQUEST,
	}
}

export interface ServletsResponseAction extends Action {
	type: TypeKeys.SERVLETS_RESPONSE
	ok: boolean
	servlets: {
		[x: string]: string
	}
}
export function respondServlets(ok: boolean, servlets: { [x: string]: string }): ServletsResponseAction {
	return {
		type: TypeKeys.SERVLETS_RESPONSE,
		ok,
		servlets,
	}
}

export interface ChangeLanguageAction extends Action {
	type: TypeKeys.CHANGE_LANGUAGE
	lang: string
}
export function changeLanguage(lang: string): ChangeLanguageAction {
	return {
		type: TypeKeys.CHANGE_LANGUAGE,
		lang: lang,
	}
}

export interface ChangeServerAction extends Action {
	type: TypeKeys.CHANGE_SERVER
	server: Server
}
export function changeServer(server: Server): ChangeServerAction {
	return {
		type: TypeKeys.CHANGE_SERVER,
		server: server,
	}
}

export interface LoginRequestAction extends Action {
	type: TypeKeys.LOGIN_REQUEST
	username: string
	password: string
}
export function requestLogin(username: string, password: string): LoginRequestAction {
	return {
		type: TypeKeys.LOGIN_REQUEST,
		username: username,
		password: password,
	}
}

export interface LoginResponseAction extends Action {
	type: TypeKeys.LOGIN_RESPONSE
	data: UserPermissions
	error: Error | undefined
}
export function respondLogin(data: UserPermissions, error: Error | undefined): LoginResponseAction {
	return {
		type: TypeKeys.LOGIN_RESPONSE,
		data: data,
		error: error,
	}
}

export interface LogoutRequestAction extends Action {
	type: TypeKeys.LOGOUT_REQUEST
}
export function requestLogout(): LogoutRequestAction {
	return {
		type: TypeKeys.LOGOUT_REQUEST
	}
}

export interface LogoutResponseAction extends Action {
	type: TypeKeys.LOGOUT_RESPONSE
}

export interface CheckUserRequestAction extends Action {
	type: TypeKeys.CHECK_USER_REQUEST
}
export function requestCheckUser(): CheckUserRequestAction {
	return {
		type: TypeKeys.CHECK_USER_REQUEST
	}
}

export interface CheckUserResponseAction extends Action {
	type: TypeKeys.CHECK_USER_RESPONSE
	ok: boolean
	data: UserPermissions
}
export function respondCheckUser(ok: boolean, data: UserPermissions): CheckUserResponseAction {
	return {
		type: TypeKeys.CHECK_USER_RESPONSE,
		ok,
		data,
	}
}

export interface CatalogRequestAction extends Action {
	type: TypeKeys.CATALOG_REQUEST
	class: string
}
export function requestCatalog(clazz: string): CatalogRequestAction {
	return {
		type: TypeKeys.CATALOG_REQUEST,
		class: clazz,
	}
}

export interface CatalogResponseAction extends Action {
	type: TypeKeys.CATALOG_RESPONSE
	class: string
	types: CatalogType[]
}
export function respondCatalog(clazz: string, types: CatalogType[]): CatalogResponseAction {
	return {
		type: TypeKeys.CATALOG_RESPONSE,
		class: clazz,
		types,
	}
}

// Merge all actions
export type AppAction =
	// index
	ServletsRequestAction | ServletsResponseAction | ChangeLanguageAction | ChangeServerAction |
	LoginRequestAction | LoginResponseAction | LogoutRequestAction | LogoutResponseAction | CheckUserRequestAction |
	CheckUserResponseAction | CatalogRequestAction | CatalogResponseAction |

	// Others
	DashboardAction |
	CommandAction |
	DataViewAction<DataObject> |
	NotificationAction |
	PlayerAction |
	PluginAction |
	SettingsAction