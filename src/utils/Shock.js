export default function() {
	let isSupportVibrate = 'vibrate' in navigator
	if(!isSupportVibrate)
		return false
	// 振动1秒
	if (navigator.vibrate) {
	    navigator.vibrate(1000);
	} else if (navigator.webkitVibrate) {
	    navigator.webkitVibrate(1000);
	}

	return true
}