class DisplayService {
    
    getBiggestImage(images) {
        if (images && images.length > 0) {
            const image = images.sort((a, b) => b.height - a.height)[0];
            if (image !== null) {
                return image;
            }
        }
        return null;
    }

    msToTime(ms) {
		if (ms === null || ms === undefined) {
			return "--:--";
		}
		var seconds = Math.floor((ms / 1000) % 60),
			minutes = Math.floor((ms / (1000 * 60)) % 60),
			hours = Math.floor((ms / (1000 * 60 * 60)) % 24);
		if (hours > 0) {
			minutes = minutes < 10 ? "0" + minutes : minutes;
		}
		seconds = seconds < 10 ? "0" + seconds : seconds;

		return `${hours > 0 ? `${hours}:` : ""}${minutes}:${seconds}`;
	}
}

export default new DisplayService();
