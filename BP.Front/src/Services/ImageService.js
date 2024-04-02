class ImageService {
    
    getBiggestImage(images) {
        if (images && images.length > 0) {
            const image = images.sort((a, b) => b.height - a.height)[0];
            if (image !== null) {
                return image;
            }
        }
        return null;
    }
}

export default new ImageService();
