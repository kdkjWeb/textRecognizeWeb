export default function() {
	let isSupportVibrate = 'vibrate' in navigator
	if(!isSupportVibrate)
		return false
	// 振动1秒
	if (navigator.vibrate) {
	    navigator.vibrate(500);
	} else if (navigator.webkitVibrate) {
	    navigator.webkitVibrate(500);
	}

	return true
}