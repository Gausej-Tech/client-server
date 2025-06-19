import React, { useState } from "react";
import Layout from "../../Components/Layout";
import { FaCloudUploadAlt } from "react-icons/fa";
import { FaArrowUpFromBracket, FaImage } from "react-icons/fa6";
import { TbWorld } from "react-icons/tb";
import { FiLink } from "react-icons/fi";
import { IoLockClosedSharp } from "react-icons/io5";

const Upload = () => {
  const [thumbnailPreview, setThumbnailPreview] = useState(null);

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setThumbnailPreview(URL.createObjectURL(file));
    }
  };

  const triggerThumbnailUpload = () => {
    document.getElementById("thumbnail-upload").click();
  };

  const [title, setTitle] = useState("");
  const maxLength_title = 100;
  const [description, setDescription] = useState("");
  const maxLength_description = 500;
  const [visibility, setVisibility] = useState("public");

  return (
    <Layout>
      <div className="px-4 md:px-48 py-7">
        <div className="shadow rounded-2xl p-6">
          <p className="font-bold text-2xl">Upload Video</p>
          <p className="text-gray-500 mb-5">
            Share your pitch, demo, or idea with the Gausej community
          </p>
          <hr className="text-gray-300 mb-5" />

          {/* Video File Upload */}
          <p className="text-gray-500 mb-1">Video File</p>
          <FileUpload />

          {/* Thumbnail Upload */}
          <div className="flex md:flex-row flex-col gap-10">
            <div>
              <p className="text-gray-500 mb-1">Custom Thumbnail (Optional)</p>
              <div className="w-[200px] h-30 mb-4 border border-dashed border-gray-300 rounded-xl bg-gray-50 flex items-center justify-center overflow-hidden">
                {thumbnailPreview ? (
                  <img
                    src={thumbnailPreview}
                    alt="Thumbnail Preview"
                    className="object-contain h-full"
                  />
                ) : (
                  <FaImage className="!text-2xl text-gray-400" />
                )}
              </div>
            </div>

            <div className="md:mt-6 -mt-5 mb-10">
              <input
                type="file"
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

          {/* Title */}
          <p className="text-gray-500 mb-1">Title</p>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter descriptive Title for your video"
            maxLength={maxLength_title}
            className="w-full input "
          />
          <p className="text-gray-500 text-sm text-end">{title.length}/100</p>

          {/* Description */}
          <p className="text-gray-500 mb-1">Description</p>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe your video to help viewers find it"
            maxLength={maxLength_description}
            rows={5}
            className="w-full input"
          />
          <p className="text-gray-500 text-sm text-end">
            {description.length}/{maxLength_description}
          </p>

          {/* Category */}
          <p className="text-gray-500 mb-1">Category</p>
          <select className="w-full input mb-7 ">
            <option value="" disabled>
              Select a category
            </option>
            <option value="startup">Startup Pitch</option>
            <option value="demo">Product Demo</option>
            <option value="business">Business Idea</option>
            <option value="promo">Promotional</option>
            <option value="podcast">Podcast</option>
            <option value="podcast">Tutorial</option>
            <option value="other">Other</option>
          </select>
          {/* tags */}
          <p className="text-gray-500 mb-1">Description</p>
          <input
            type="text"
            placeholder="Add tags seperated by comma"
            className="w-full input mb-1"
          />
          <p className="text-gray-500 mb-7 text-sm">
            Add up to 10 tags to help viewers find your video
          </p>

          {/* Visibility */}
          <p className="text-gray-500 mb-1">Visibility</p>
          <div className="space-y-2 mb-8">
            <label className="flex items-center gap-2 text-gray-500 ">
              <input
                type="radio"
                name="visibility"
                value="public"
                checked={visibility === "public"}
                onChange={() => setVisibility("public")}
              />
              <TbWorld />
              <p className="flex flex-col">
                Public
                <p className="text-sm">Anyone can view your video</p>
              </p>
            </label>

            <label className="flex items-center gap-2 text-gray-500 ">
              <input
                type="radio"
                name="visibility"
                value="unlisted"
                checked={visibility === "unlisted"}
                onChange={() => setVisibility("unlisted")}
              />
              <FiLink />
              <p className="flex flex-col">
                Unlisted
                <p className="text-sm">
                  Anyone with the link can view your video
                </p>
              </p>
            </label>

            <label className="flex items-center gap-2 text-gray-500">
              <input
                type="radio"
                name="visibility"
                value="private"
                checked={visibility === "private"}
                onChange={() => setVisibility("private")}
              />
              <IoLockClosedSharp />
              <p className="flex flex-col">
                Public
                <p className="text-sm">Only you can view your video</p>
              </p>
            </label>
          </div>

          <hr className="text-gray-300 mb-5" />

          {/* buttons */}
         <div className="flex justify-end gap-3">
            <button
              type="submit"
              className="border border-gray-300 hover:bg-gray-100 cursor-pointer transition-all duration-300 px-4 py-2 rounded"
            >
              Save as Draft
            </button>
            <button type="submit" className="green-button">
              Publish Video
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

const FileUpload = () => {
  return (
    <div className="w-full mx-auto mb-8">
      <label
        htmlFor="file-upload"
        className="flex flex-col items-center justify-center w-full h-40 px-4 transition bg-gray-100 border-2 border-dashed border-gray-400 rounded-xl cursor-pointer hover:border-green-500"
      >
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          <FaCloudUploadAlt className="text-4xl text-green-600 mb-2" />
          <p className="mb-2 text-sm text-gray-500">
            <span className="font-semibold">Click to upload</span> or drag and
            drop
          </p>
          <p className="text-xs text-gray-400">MP4, MOV, AVI (max 2GB)</p>
        </div>
        <input id="file-upload" type="file" className="hidden" />
      </label>
    </div>
  );
};

const UploadButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center gap-2 px-6 py-2 border border-gray-300 cursor-pointer hover:bg-gray-100 text-gray-500 text-sm font-medium rounded transition-all duration-300"
    >
      <FaArrowUpFromBracket className="text-base" />
      Upload Thumbnail
    </button>
  );
};

export default Upload;
