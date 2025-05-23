import pb from '../lib/pocketbase';

export const SermonService = {
  getAll: async () => {
    try {
      const sermons = await pb.collection('sermons').getFullList({
        expand: 'preacher',
        sort: '-date',
        $autoCancel: false, // Disables auto-cancellation
        requestKey: null // Disables request deduplication
      });
      return sermons;
    } catch (error) {
      throw error;
    }
  },

  upload: async (formData) => {
    try {
      console.log('Uploading sermon with data:');
      for (let [key, value] of formData.entries()) {
        console.log(key, value instanceof File ? 
          `File: ${value.name} (${value.size} bytes)` : 
          value
        );
      }

      const record = await pb.collection('sermons').create(formData, {
        $autoCancel: false // Disable for uploads too
      });
      console.log('Upload successful, ID:', record.id);
      return record;
    } catch (error) {
      console.error('Upload error:', {
        status: error.status,
        message: error.message,
        data: error.data
      });
      throw error;
    }
  },

  getFileUrl: (record, filename) => {
    if (!filename) return null;
    return pb.files.getURL(record, filename);
  }
};