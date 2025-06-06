// components/UploadSermonForm.jsx
import { forwardRef, useImperativeHandle, useState } from 'react';
import { FiUpload, FiFileText, FiUser, FiClock } from 'react-icons/fi';

const UploadSermonForm = forwardRef(({ onSubmit, loading }, ref) => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  
  // Generate years from current year to 2023
  const years = Array.from(
    { length: currentYear - 2022 }, 
    (_, i) => currentYear - i
  );

  const [formData, setFormData] = useState({
    title: '',
    preacher: '',
    year: currentYear,
    month: currentDate.getMonth() + 1,
    day: currentDate.getDate(),
    description: '',
    duration: '00:00',
    audioFile: null,
    imageFile: null
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e, field) => {
    setFormData(prev => ({ ...prev, [field]: e.target.files[0] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Construct date in YYYY-MM-DD format
    const formattedDate = `${formData.year}-${String(formData.month).padStart(2, '0')}-${String(formData.day).padStart(2, '0')}`;
    
    onSubmit({
      ...formData,
      date: formattedDate
    });
  };

  const resetForm = () => {
    setFormData({
      title: '',
      preacher: '',
      year: currentYear,
      month: currentDate.getMonth() + 1,
      day: currentDate.getDate(),
      description: '',
      duration: '00:00',
      audioFile: null,
      imageFile: null
    });
    
    // Reset file inputs
    if (document.getElementById('audioFile')) {
      document.getElementById('audioFile').value = '';
    }
    if (document.getElementById('imageFile')) {
      document.getElementById('imageFile').value = '';
    }
  };

  useImperativeHandle(ref, () => ({
    resetForm
  }));

  // Get days in selected month
  const getDaysInMonth = () => {
    return new Date(formData.year, formData.month, 0).getDate();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Title Field */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <FiFileText className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Sermon Title"
          className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          required
        />
      </div>

      {/* Preacher Field */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <FiUser className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          name="preacher"
          value={formData.preacher}
          onChange={handleChange}
          placeholder="Preacher's Name"
          className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          required
        />
      </div>

      {/* Date Selection */}
      <div className="grid grid-cols-3 gap-4">
        {/* Year Select */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
          <select
            name="year"
            value={formData.year}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          >
            {years.map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </div>

        {/* Month Select */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Month</label>
          <select
            name="month"
            value={formData.month}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          >
            {Array.from({ length: 12 }, (_, i) => i + 1).map(month => (
              <option key={month} value={month}>
                {new Date(2000, month - 1, 1).toLocaleString('default', { month: 'long' })}
              </option>
            ))}
          </select>
        </div>

        {/* Day Select */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Day</label>
          <select
            name="day"
            value={formData.day}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          >
            {Array.from({ length: getDaysInMonth() }, (_, i) => i + 1).map(day => (
              <option key={day} value={day}>{day}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Duration Field */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <FiClock className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          name="duration"
          value={formData.duration}
          onChange={handleChange}
          pattern="[0-9]{2}:[0-9]{2}"
          placeholder="00:00"
          className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          required
        />
      </div>

      {/* Description Field */}
      <div>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Sermon description"
          rows="4"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Audio File Upload */}
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
        <div className="flex justify-center mb-4">
          <FiUpload className="h-10 w-10 text-gray-400" />
        </div>
        <label className="cursor-pointer">
          <span className="text-blue-600 font-medium">Choose an audio file</span> or drag it here
          <input
            id="audioFile"
            type="file"
            onChange={(e) => handleFileChange(e, 'audioFile')}
            className="hidden"
            accept="audio/*"
            required
          />
        </label>
        {formData.audioFile && (
          <p className="mt-2 text-sm text-gray-600">{formData.audioFile.name}</p>
        )}
      </div>

      {/* Cover Image Upload */}
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
        <div className="flex justify-center mb-4">
          <FiUpload className="h-10 w-10 text-gray-400" />
        </div>
        <label className="cursor-pointer">
          <span className="text-blue-600 font-medium">Choose a cover image</span> (optional)
          <input
            id="imageFile"
            type="file"
            onChange={(e) => handleFileChange(e, 'imageFile')}
            className="hidden"
            accept="image/*"
          />
        </label>
        {formData.imageFile && (
          <p className="mt-2 text-sm text-gray-600">{formData.imageFile.name}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center"
      >
        <FiUpload className="mr-2" />
        {loading ? "Uploading..." : "Upload Sermon"}
      </button>
    </form>
  );
});

export default UploadSermonForm;