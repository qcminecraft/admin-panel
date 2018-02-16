import { Action } from "redux"
import { Error } from "../types"

export enum TypeKeys {
	EXECUTE_REQUEST = "EXECUTE_REQUEST",
	EXECUTE_RESPONSE = "EXECUTE_RESPONSE",
}

export interface ExecuteRequestAction extends Action {
	type: TypeKeys.EXECUTE_REQUEST
	command: string
	waitLines: number
	waitTime: number
}
export function requestExecute(cmd: string, waitLines: number, waitTime: number): ExecuteRequestAction {
	return {
		type: TypeKeys.EXECUTE_REQUEST,
		command: cmd,
		waitLines: waitLines,
		waitTime: waitTime,
	}
}

export interface ExecuteResponseAction extends Action {
	type: TypeKeys.EXECUTE_RESPONSE
	ok: boolean
	command: string
	result: string[]
	error?: Error
}
export function respondExecute(ok: boolean, command: string, result: string[], error?: Error): ExecuteResponseAction {
	return {
		type: TypeKeys.EXECUTE_RESPONSE,
		ok,
		command,
		result,
		error,
	}
}

export type CommandAction = ExecuteRequestAction | ExecuteResponseAction