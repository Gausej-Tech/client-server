import React, { useState } from "react";
import Layout from "../../Components/Layout";
import { FaCloudUploadAlt } from "react-icons/fa";
import { FaArrowUpFromBracket, FaImage } from "react-icons/fa6";
import { Helmet } from "react-helmet-async";
import LoadingButton from "../../Components/LoadingButton";
import axios from "../../utils/axios";
import toast, { Toaster } from "react-hot-toast";

const Upload = () => {
  const [formData, setFormData] = useState({
    videoFile: null,
    videoPreview: null,
    thumbnailFile: null,
    thumbnailPreview: null,
    category: "",
    title: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);

  const maxLength_title = 100;
  const maxLength_description = 500;

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    if (file?.type.startsWith("video/")) {
      handleInputChange("videoFile", file);
      handleInputChange("videoPreview", URL.createObjectURL(file));
    }
  };

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (file?.type.startsWith("image/")) {
      handleInputChange("thumbnailFile", file);
      handleInputChange("thumbnailPreview", URL.createObjectURL(file));
    }
  };

  const triggerThumbnailUpload = () => {
    document.getElementById("thumbnail-upload").click();
  };

  const resetForm = () => {
    setFormData({
      videoFile: null,
      videoPreview: null,
      thumbnailFile: null,
      thumbnailPreview: null,
      category: "",
      title: "",
      description: "",
    });
  };

  const handleSubmit = async () => {
    const { videoFile, title, description, category, thumbnailFile } = formData;

    if (!videoFile || !title || !description || !category) {
      toast.error("All fields are required!");
      return;
    }

    setLoading(true);
    const uploadData = new FormData();
    uploadData.append("title", title);
    uploadData.append("description", description);
    uploadData.append("category", category);
    uploadData.append("coverImage", thumbnailFile);
    uploadData.append("video", videoFile);

    try {
      const res = await axios.post("/user/upload", uploadData);
      if (res.data.success) {
        toast.success("Video uploaded successfully!");
        resetForm();
      }
    } catch (err) {
      console.error(err);
      toast.error("Video upload failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <Helmet>
        <title>Gausej - Upload</title>
      </Helmet>
      <Toaster />
      <div className="px-4 md:px-48 py-7">
        <div className="shadow rounded-2xl p-6">
          <p className="font-bold text-2xl mb-1">Upload Video</p>
          <p className="text-gray-500 mb-5">
            Share your pitch, demo, or idea with the Gausej community
          </p>
          <hr className="text-gray-300 mb-5" />

          <p className="text-gray-500 mb-1">
            Video File<span className="text-red-500">*</span>
          </p>
          <FileUpload onChange={handleVideoChange} />
          {formData.videoPreview && (
            <video
              src={formData.videoPreview}
              controls
              className="w-full max-h-80 rounded-lg mb-6 border border-gray-300"
            />
          )}

          <div className="flex md:flex-row flex-col gap-10">
            <div>
              <p className="text-gray-500 mb-1">Custom Thumbnail (Optional)</p>
              <div className="w-[200px] h-30 mb-4 border border-dashed border-gray-300 rounded-xl bg-gray-50 flex items-center justify-center overflow-hidden">
                {formData.thumbnailPreview ? (
                  <img
                    src={formData.thumbnailPreview}
                    alt="Thumbnail Preview"
                    className="object-contain h-full"
                  />
                ) : (
                  <FaImage className="text-2xl text-gray-400" />
                )}
              </div>
            </div>
            <div className="md:mt-6 -mt-5 mb-10">
              <input
                type="file"
                disabled  
                accept="image/*"
                id="thumbnail-upload"
                className="hidden"
                onChange={handleThumbnailChange}
              />
              <UploadButton onClick={triggerThumbnailUpload} />
              <p className="text-gray-500 mt-2 text-sm">
                Recommended size: 1280x720 pixels (16:9 aspect ratio)
              </p>
            </div>
          </div>

          <p className="text-gray-500 mb-1">
            Title<span className="text-red-500">*</span>
          </p>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => handleInputChange("title", e.target.value)}
            maxLength={maxLength_title}
            placeholder="Enter descriptive Title for your video"
            className="w-full input"
          />
          <p className="text-gray-500 text-sm text-end">
            {formData.title.length}/100
          </p>

          <p className="text-gray-500 mb-1">
            Description<span className="text-red-500">*</span>
          </p>
          <textarea
            value={formData.description}
            onChange={(e) => handleInputChange("description", e.target.value)}
            maxLength={maxLength_description}
            placeholder="Describe your video to help viewers find it"
            rows={5}
            className="w-full input"
          />
          <p className="text-gray-500 text-sm text-end">
            {formData.description.length}/{maxLength_description}
          </p>

          <p className="text-gray-500 mb-1">
            Category<span className="text-red-500">*</span>
          </p>
          <select
            value={formData.category}
            onChange={(e) => handleInputChange("category", e.target.value)}
            className="w-full input mb-7"
          >
            <option value="" disabled>
              Select a category
            </option>
            <option value="Startup Pitch">Startup Pitch</option>
            <option value="Product Demo">Product Demo</option>
            <option value="Business Idea">Business Idea</option>
            <option value="Promotional">Promotional</option>
            <option value="Podcast">Podcast</option>
            <option value="Tutorial">Tutorial</option>
            <option value="Other">Other</option>
          </select>

          <hr className="text-gray-300 mb-5" />

          <div className="flex justify-end">
            <LoadingButton
              onClick={handleSubmit}
              isLoading={loading}
              label="Publish Video"
              className="green-button"
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

const FileUpload = ({ onChange }) => (
  <div className="w-full mx-auto mb-8">
    <label htmlFor="file-upload" className="w-full">
      <div className="flex flex-col items-center justify-center w-full h-40 px-4 transition bg-gray-100 border-2 border-dashed border-gray-400 rounded-xl cursor-pointer hover:border-green-500">
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          <FaCloudUploadAlt className="text-4xl text-green-600 mb-2" />
          <p className="mb-2 text-sm text-gray-500">
            <span className="font-semibold">Click to upload</span> or drag and
            drop
          </p>
          <p className="text-xs text-gray-400">MP4, MOV, AVI (max 80MB)</p>
        </div>
      </div>
      <input
        id="file-upload"
        type="file"
        className="hidden"
        onChange={onChange}
      />
    </label>
  </div>
);

const UploadButton = ({ onClick }) => (
  <button
    onClick={onClick}
    className="inline-flex items-center gap-2 px-6 py-2 border border-gray-300 cursor-pointer hover:bg-gray-100 text-gray-500 text-sm font-medium rounded transition-all duration-300"
  >
    <FaArrowUpFromBracket className="text-base" />
    Upload Thumbnail
  </button>
);

export default Upload;
