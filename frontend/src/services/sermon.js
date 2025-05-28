import pb from '../lib/pocketbase';

export const SermonService = {
  getAll: async () => {
    try {
      const sermons = await pb.collection('sermons').getFullList({
        expand: 'preacher',
        sort: '-date',
        $autoCancel: false,
        requestKey: null,
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
        console.log(
          key,
          value instanceof File
            ? `File: ${value.name} (${value.size} bytes)`
            : value
        );
      }

      const record = await pb.collection('sermons').create(formData, {
        $autoCancel: false,
      });
      console.log('Upload successful, ID:', record.id);
      return record;
    } catch (error) {
      console.error('Upload error:', {
        status: error.status,
        message: error.message,
        data: error.data,
      });
      throw error;
    }
  },

  delete: async (id) => {
  try {
    await pb.collection('sermons').delete(id);
    console.log('Deleted sermon with ID:', id);
    return true; // Indicate success
  } catch (error) {
    console.error('Delete error:', {
      id,
      message: error.message,
      status: error.status,
      response: error.response,
    });
    
    if (error.status === 403) {
      throw new Error("You don't have permission to delete sermons");
    }
    throw error;
  }
},

  getFileUrl: (record, filename) => {
    if (!filename) return null;
    return pb.files.getURL(record, filename);
  },
};
