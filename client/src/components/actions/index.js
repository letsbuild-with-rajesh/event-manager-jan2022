export const UPDATE_LOGGED_IN = 'UPDATE_LOGGED_IN'
export const UPDATE_IS_ADMIN = 'UPDATE_IS_ADMIN'

export function updateLogIn(loginState) {
	return {
		 type: UPDATE_LOGGED_IN,
		 payload: loginState
	}
}

export function updateIsAdmin(isAdmin) {
	return {
		 type: UPDATE_IS_ADMIN,
		 payload: isAdmin
	}
}