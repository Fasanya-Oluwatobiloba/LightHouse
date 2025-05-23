import pb from '../lib/pocketbase';

export const GalleryService = {
    async getAll() {
        try {
            return await pb.collection('gallery').getFullList({
                sort: '-created'
            });
        } catch (error) {
            console.error('Error fetching gallery images:', error);
            throw error;
        }
    },

    async getByCategory(category) {
        try {
            return await pb.collection('gallery').getFullList({
                filter: `category = "${category}"`,
                sort: '-created'
            });
        } catch (error) {
            console.error('Error fetching gallery images by category:', error);
            throw error;
        }
    },

    async create(imageData) {
        try {
            const formData = new FormData();
            formData.append('image', imageData.image);
            formData.append('category', imageData.category);
            formData.append('caption', imageData.caption);

            return await pb.collection('gallery').create(formData);
        } catch (error) {
            console.error('Error creating gallery image:', error);
            throw error;
        }
    },

    getFileUrl(record, filename) {
        return pb.files.getUrl(record, filename);
    }
};