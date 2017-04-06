export function getUserPictures(username) {
	return dispatch => {
		username = username.startsWith('@') ? username.substring(1) : username;
		const url = `/search?utf8=✓&q=${username}`;
		const xhr = new XMLHttpRequest();
		xhr.open('GET', url, true);
		xhr.setRequestHeader("Accept", "text/javascript");
		xhr.send();
		xhr.onreadystatechange = function() {
			if (xhr.readyState === 4 && xhr.status === 200) {
				const pictures = JSON.parse(xhr.responseText).slice(0, 18);
				if (pictures.length == 0) {
					dispatch({
						type: 'GET_USER_PICTURES',
						username: username,
						imageUrls: [],
						status: 'FAILURE'
					});
				} else {
					dispatch({
						type: 'GET_USER_PICTURES',
						username: username,
						imageUrls: pictures,
						status: 'SUCCESS'
					});
				}
			}

			else {
				dispatch({
					type: 'GET_USER_PICTURES',
					username: username,
					imageUrls: [],
					status: 'FAILURE'
				});
			}
		}
	}
};

export const extractedColor = color => {
	return {
		type: 'EXTRACTED_COLOR',
		color: color
	};
};

export const resetting = () => {
	return {
		type: 'RESET'
	}
}
