import pb from "../lib/pocketbase";

export const SermonService = {
 getByYear: async (year) => {
    try {
      const startDate = `${year}-01-01 00:00:00`;
      const endDate = `${year}-12-31 23:59:59`;
      
      return await pb.collection('sermons').getFullList({
        filter: `date >= "${startDate}" && date <= "${endDate}"`,
        sort: '-date',
        $autoCancel: false
      });
    } catch (error) {
      console.error('Error fetching sermons by year:', error);
      throw error;
    }
  },

  getByYearAndMonth: async (year, month) => {
    try {
      const startDate = new Date(year, month - 1, 1).toISOString();
      const endDate = new Date(year, month, 0).toISOString(); // Last day of month

      const sermons = await pb.collection("sermons").getFullList({
        filter: `date >= "${startDate}" && date <= "${endDate}"`,
        sort: "-date",
      });
      return sermons;
    } catch (error) {
      throw error;
    }
  },

  getYearsWithSermons: async () => {
    try {
      // This query gets all unique years that have sermons
      const result = await pb.collection("sermons").getList(1, 1, {
        fields: "date",
        sort: "-date",
      });

      if (result.items.length === 0) return [];

      // Get the oldest and newest years
      const newestYear = new Date(result.items[0].date).getFullYear();
      const oldestYear = new Date(
        result.items[result.items.length - 1].date
      ).getFullYear();

      // Generate array from oldest to newest
      const years = [];
      for (let year = newestYear; year >= oldestYear; year--) {
        years.push(year);
      }

      return years;
    } catch (error) {
      throw error;
    }
  },
  getById: async (id) => {
    try {
      const sermon = await pb.collection("sermons").getOne(id, {
        expand: "preacher",
      });
      return sermon;
    } catch (error) {
      console.error("Error fetching sermon:", error);
      throw error;
    }
  },

  incrementDownload: async (id) => {
    try {
      const sermon = await pb.collection("sermons").getOne(id);
      const currentCount = sermon.download_count || 0;
      await pb.collection("sermons").update(id, {
        download_count: currentCount + 1,
      });
    } catch (error) {
      console.error("Error incrementing download count:", error);
      throw error;
    }
  },

  upload: async (formData) => {
    try {
      // Clear cache to ensure immediate visibility
      pb.collection('sermons').cancelAllRequests();
      
      const record = await pb.collection('sermons').create(formData);
      
      // Force refresh of the collection
      await pb.collection('sermons').getFullList({
        sort: '-date',
        $autoCancel: false
      });
      
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

  getAll: async () => {
    try {
      const sermons = await pb.collection("sermons").getFullList({
        expand: "preacher",
        sort: "-date",
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
      console.log("Uploading sermon with data:");
      for (let [key, value] of formData.entries()) {
        console.log(
          key,
          value instanceof File
            ? `File: ${value.name} (${value.size} bytes)`
            : value
        );
      }

      const record = await pb.collection("sermons").create(formData, {
        $autoCancel: false,
      });
      console.log("Upload successful, ID:", record.id);
      return record;
    } catch (error) {
      console.error("Upload error:", {
        status: error.status,
        message: error.message,
        data: error.data,
      });
      throw error;
    }
  },

  delete: async (id) => {
    try {
      await pb.collection("sermons").delete(id);
      console.log("Deleted sermon with ID:", id);
      return true; // Indicate success
    } catch (error) {
      console.error("Delete error:", {
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
