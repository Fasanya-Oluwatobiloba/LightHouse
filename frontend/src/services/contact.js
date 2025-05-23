import pb from '../lib/pocketbase';

export const ContactService = {
    async submitContactForm(formData) {
        try {
            return await pb.collection('contacts').create({
                name: formData.name,
                email: formData.email,
                subject: formData.subject,
                message: formData.message,
                status: 'unread'
            });
        } catch (error) {
            console.error('Error submitting contact form:', error);
            throw error;
        }
    }
};