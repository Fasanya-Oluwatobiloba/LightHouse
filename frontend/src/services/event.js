import pb from '../lib/pocketbase';

export const EventService = {
    async getAll() {
        try {
            return await pb.collection('events').getFullList({
                sort: 'date'
            });
        } catch (error) {
            console.error('Error fetching events:', error);
            throw error;
        }
    },

    async getById(id) {
        try {
            return await pb.collection('events').getOne(id);
        } catch (error) {
            console.error('Error fetching event:', error);
            throw error;
        }
    },

    async create(eventData, imageFile = null) {
        try {
            const formData = new FormData();
            formData.append('title', eventData.title);
            formData.append('date', eventData.date);
            formData.append('time', eventData.time);
            formData.append('location', eventData.location);
            formData.append('description', eventData.description);
            if (imageFile) formData.append('image', imageFile);

            return await pb.collection('events').create(formData);
        } catch (error) {
            console.error('Error creating event:', error);
            throw error;
        }
    },

    getFileUrl(record, filename) {
        return pb.files.getUrl(record, filename);
    }
};