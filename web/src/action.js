export function setBusy(busy) {
	return {
		type: "SET_BUSY",
		data: {
			busy,
		},
	}
}

export function storeResult(result) {
	return {
		type: "STORE_RESULT",
		data: result,
	}
}

export function renderResult(result) {
	return {
		type: "RENDER_RESULT",
		data: result,
	}
}
