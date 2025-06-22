import React, { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { Helmet } from "react-helmet-async";

const EditProfile = ({ onClose, onSave, profile }) => {
  const [isSaving, setIsSaving] = useState(false);
  const [formValues, setFormValues] = useState({
    fullName: profile.fullName || "",
    title: profile.title || "",
    twitterLink: profile.twitterLink || "",
    linkedinLink: profile.linkedinLink || "",
    websiteUrl: profile.websiteUrl || "",
    bio: profile.bio || "",
  });
  const [previewPic, setPreviewPic] = useState(profile.profilePhoto);
  const [file, setFile] = useState(null);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEsc);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "auto";
    };
  }, [onClose]);

  const handleOverlayClick = (e) => {
    if (e.target.id === "overlay") onClose();
  };

  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onloadend = () => setPreviewPic(reader.result);
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleChange = (e) => {
    setFormValues((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    const formData = new FormData();
    formData.append("fullName", formValues.fullName);
    formData.append("title", formValues.title);
    formData.append("twitterLink", formValues.twitterLink);
    formData.append("linkedinLink", formValues.linkedinLink);
    formData.append("websiteUrl", formValues.websiteUrl);
    formData.append("bio", formValues.bio);
    if (file) formData.append("profilePhoto", file);

    try {
      await onSave(formData); // Call parent handler
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div
      id="overlay"
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50"
      onClick={handleOverlayClick}
    >
      <Helmet>
        <title>Gausej - Edit Profile</title>
      </Helmet>
      <div className="bg-white rounded-xl shadow-lg w-[90%] max-w-2xl max-h-[90vh] overflow-y-auto animate-fade-in">
        <div className="flex items-center border-gray-300 justify-between border-b px-6 py-4">
          <h2 className="text-xl font-semibold text-gray-800">Edit Profile</h2>
          <button
            className="text-gray-600 hover:bg-gray-100 p-2 rounded-full"
            onClick={onClose}
          >
            <IoClose size={24} />
          </button>
        </div>

        <form className="px-6 py-4 space-y-4" onSubmit={handleSubmit}>
          {/* Profile Picture Upload */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Profile Picture
            </label>
            <div className="flex items-center gap-4">
              <img
                src={
                  previewPic || "https://placehold.co/80x80?text=Profile"
                }
                alt="Preview"
                className="w-20 h-20 rounded-full object-cover border-2 border-gray-300"
              />
              <label className="cursor-pointer border-2 border-dashed border-gray-300 px-4 py-3 rounded-md text-sm text-center hover:border-green-500 hover:bg-green-50 transition-all w-full text-gray-600">
                <input
                  type="file"
                  name="profilePic"
                  className="hidden"
                  onChange={handleImageChange}
                />
                <p className="font-medium">Click to upload</p>
                <p className="text-xs text-gray-400">
                  JPG, PNG or GIF (max 5MB)
                </p>
              </label>
            </div>
          </div>

          {/* Text Fields */}
          {[
            { id: "fullName", label: "Full Name" },
            { id: "title", label: "Title" },
            { id: "twitterLink", label: "Twitter Handle" },
            { id: "linkedinLink", label: "LinkedIn Profile" },
            { id: "websiteUrl", label: "Website" },
          ].map((field) => (
            <div key={field.id}>
              <label
                htmlFor={field.id}
                className="block text-gray-700 font-medium mb-1"
              >
                {field.label}
              </label>
              <input
                type="text"
                id={field.id}
                name={field.id}
                value={formValues[field.id]}
                onChange={handleChange}
                className="w-full input"
              />
            </div>
          ))}

          {/* Bio */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Bio</label>
            <textarea
              name="bio"
              value={formValues.bio}
              onChange={handleChange}
              rows={4}
              className="w-full input"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-300">
            <button
              type="button"
              onClick={onClose}
              className="!rounded disable-button"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="green-button flex items-center justify-center gap-2"
              disabled={isSaving}
            >
              {isSaving ? (
                <>
                  <svg
                  className="animate-spin h-[20px] w-[20px] bg-white text-[#458c58]"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4l3.5-3.5L12 0v4a8 8 0 11-8 8z"
                  />
                </svg>
                </>
              ) : (
                "Save Changes"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
