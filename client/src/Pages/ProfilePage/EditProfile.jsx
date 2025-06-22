import React, { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { Helmet } from "react-helmet-async";
const EditProfile = ({ onClose, onSave, profile }) => {
  const [previewPic, setPreviewPic] = useState(profile.profilePic);

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
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreviewPic(reader.result);
      reader.readAsDataURL(file);
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

        <form
          className="px-6 py-4 space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            const form = e.target;
            const updatedProfile = {
              name: form.name.value,
              title: form.title.value,
              twitter: form.twitter.value,
              linkedin: form.linkedin.value,
              website: form.website.value,
              bio: form.bio.value,
              profilePic: previewPic,
            };
            onSave(updatedProfile);
          }}
        >
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Profile Picture
            </label>
            <div className="flex items-center gap-4">
              <img
                src={previewPic || "https://placehold.co/80x80?text=Profile"}
                alt="Preview"
                className="w-20 h-20 rounded-full object-cover border-2 border-gray-300"
              />

              <label className="cursor-pointer border-2 border-dashed border-gray-300 px-4 py-3 rounded-md text-sm text-center hover:border-green-500 hover:bg-green-50 transition-all w-full text-gray-600">
                <input type="file" className="hidden" onChange={handleImageChange} />
                <p className="font-medium">Click to upload</p>
                <p className="text-xs text-gray-400">
                  JPG, PNG or GIF (max 5MB)
                </p>
              </label>
            </div>
          </div>

          {/* Input Fields */}
          {[
            { id: "name", label: "Full Name", value: profile.name },
            { id: "title", label: "Title", value: profile.title },
            { id: "twitter", label: "Twitter Handle", value: profile.twitter },
            { id: "linkedin", label: "LinkedIn Profile", value: profile.linkedin },
            { id: "website", label: "Website", value: profile.website },
          ].map((field) => (
            <div key={field.id}>
              <label htmlFor={field.id} className="block text-gray-700 font-medium mb-1">
                {field.label}
              </label>
              <input
                type="text"
                id={field.id}
                name={field.id}
                defaultValue={field.value}
                className="w-full input"
              />
            </div>
          ))}

          {/* Bio */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Bio</label>
            <textarea
              name="bio"
              defaultValue={profile.bio}
              rows={4}
              className="w-full input"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-300">
            <button
              type="button"
              onClick={onClose}
              className="!rounded disable-button"
            >
              Cancel
            </button>
            <button type="submit" className="green-button">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
