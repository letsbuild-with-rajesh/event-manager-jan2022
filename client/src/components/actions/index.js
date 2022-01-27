export const UPDATE_AUTH_DETAILS = 'UPDATE_AUTH_DETAILS'
export const UPDATE_USER_DETAILS = 'UPDATE_USER_DETAILS'

export function updateAuthDetails(details) {
	return {
		 type: UPDATE_AUTH_DETAILS,
		 payload: details
	}
}

export function updateUserDetails(details) {
	return {
		 type: UPDATE_USER_DETAILS,
		 payload: details
	}
}