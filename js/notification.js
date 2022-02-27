function notification(text, messageType) {
	const notification = document.getElementById("notification");
	const notificationText = document.getElementById("notification-text");
	let messageColor = getColor(messageType);
	console.log(notificationText);
	notification.style.display = "inherit";
	notificationText.style.fontSize = "3vh";
	notificationText.textContent = text;
	notificationText.color = messageColor;

	setTimeout(() => {
		notificationText.style.fontSize = "0vh";
	}, 3000);
}

function getColor(messageType) {
	if (messageType) return "lime";
	else return "crimson";
}
