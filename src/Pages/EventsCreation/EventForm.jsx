import React, { useContext, useState } from "react";
import AddSpeaker from "../PodcastCreation/AddSpeaker";
import { useNavigate } from "react-router-dom";
import { myContext } from "../../Context/CreateContext";
import { FaAngleLeft } from "react-icons/fa";
import { LuImagePlus } from "react-icons/lu";

const EventForm = () => {
  const navigate = useNavigate();
  const { EventStates } = useContext(myContext);
  const [coverImage, setCoverImage] = useState(null);
  const [coverImageFile, setCoverImageFile] = useState(null);
  const [state, setState] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    const formData = new FormData();
    if (coverImageFile) {
      formData.append('coverImage', coverImageFile);
    }
    Object.keys(state).forEach((key) => {
      formData.append(key, state[key]);
    });

    try {
      const response = await fetch('http://localhost:5000/events/', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      console.log(data);

      EventStates.setEventSubmitted(!EventStates.eventSubmitted);
      navigate("/events"); // Navigate to the events page or wherever you need
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setState((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCoverImageFile(file);
      setCoverImage(URL.createObjectURL(file));
    }
  };

  return (
    <>
      <h4 className="flex items-center bg-white gap-3 ps-4 h-[10%]">
        <FaAngleLeft
          className="cursor-pointer"
          onClick={() => navigate("/events")}
        />{" "}
        Create Event
      </h4>
      <div className="w-full h-[90%] bg-white overflow-y-scroll Podcast_Top_Videos">
        <form onSubmit={handleSubmit} className="flex sm:w-[80%] w-[95%] justify-between mx-auto h-full">
          <div className="sm:w-[40%] w-[45%]">
            <div className="mt-2 mb-2">
              <h1>Customize Cover</h1>
              <div className="bg-[#f0f0fe] w-full h-[25vh] rounded-lg flex items-center justify-center relative overflow-hidden">
                <input
                  type="file"
                  accept="image/*"
                  className="absolute w-full h-full opacity-0 cursor-pointer"
                  onChange={handleImageUpload}
                />
                {coverImage ? (
                  <img
                    src={coverImage}
                    alt="Cover"
                    className="w-full h-full object-cover rounded-lg"
                  />
                ) : (
                  <LuImagePlus className="text-blue-800 ms-8 text-3xl" />
                )}
              </div>
            </div>
            {/* Form fields */}
            <div className="my-4">
              <label className="block text-gray-600 text-sm font-bold">Event Title</label>
              <input
                className="w-full border py-2 ps-3 rounded-lg text-gray-600 leading-tight focus:outline-none placeholder:text-xs focus:shadow-outline"
                onChange={onChange}
                name="eventTitle"
                type="text"
                placeholder="Enter Title"
              />
            </div>
            <div className="my-4">
              <label className="block text-gray-600 text-sm font-bold">Event Description</label>
              <input
                className="w-full border py-2 ps-3 rounded-lg text-gray-600 leading-tight focus:outline-none placeholder:text-xs focus:shadow-outline"
                onChange={onChange}
                name="eventDescription"
                type="text"
                placeholder="Enter description"
              />
            </div>
            <div className="my-4">
              <label className="block text-gray-600 text-sm font-bold">Event Category</label>
              <input
                className="w-full border py-2 ps-3 rounded-lg text-gray-600 leading-tight focus:outline-none placeholder:text-xs focus:shadow-outline"
                onChange={onChange}
                name="eventCategory"
                type="text"
                placeholder="Enter category"
              />
            </div>
            <div className="my-4">
              <label className="block text-gray-600 text-sm font-bold">Select Date</label>
              <input
                className="w-full border py-2 ps-3 rounded-lg text-gray-600 leading-tight focus:outline-none text-xs focus:shadow-outline"
                type="date"
                onChange={onChange}
                name="eventDate"
              />
            </div>
            <div className="my-4">
              <label className="block text-gray-600 text-sm font-bold">Select Location</label>
              <input
                className="w-full border py-2 ps-3 rounded-lg text-gray-600 leading-tight focus:outline-none placeholder:text-xs focus:shadow-outline"
                onChange={onChange}
                name="eventLocation"
                type="text"
                placeholder="Enter location"
              />
            </div>
            <div className="my-4">
              <label className="block text-gray-600 text-sm font-bold">Add Tickets Type</label>
              <select
                className="w-full border py-2 ps-3 rounded-lg text-gray-600 leading-tight focus:outline-none text-xs focus:shadow-outline"
                onChange={onChange}
                name="eventTicketType"
                required
              >
                <option value="">Select Tickets Type</option>
                <option value="Premium">Premium</option>
                <option value="VIP">VIP</option>
                <option value="General">General</option>
              </select>
            </div>
            <div className="my-4">
              <label className="block text-gray-600 text-sm font-bold">Basic Price</label>
              <input
                className="w-full border py-2 ps-3 rounded-lg text-gray-600 leading-tight focus:outline-none placeholder:text-xs focus:shadow-outline"
                type="number"
                onChange={onChange}
                name="eventPrice"
                placeholder="Enter price $35.00"
              />
            </div>
          </div>

          <div className="sm:w-[40%] w-[45%]">
            <div className="my-4">
              <label className="block text-gray-600 text-sm font-bold">Event Type</label>
              <input
                className="w-full border py-2 ps-3 rounded-lg text-gray-600 leading-tight focus:outline-none placeholder:text-xs focus:shadow-outline"
                type="text"
                onChange={onChange}
                name="eventType"
                placeholder="Enter event type"
              />
            </div>
            <div className="my-4">
              <label className="block text-gray-600 text-sm font-bold">Duration</label>
              <input
                className="w-full border py-2 ps-3 rounded-lg text-gray-600 leading-tight focus:outline-none placeholder:text-xs focus:shadow-outline"
                type="text"
                onChange={onChange}
                name="eventDuration"
                placeholder="Enter duration"
              />
            </div>
            <div className="my-4">
              <label className="block text-gray-600 text-sm font-bold">Event Format</label>
              <input
                className="w-full border py-2 ps-3 rounded-lg text-gray-600 leading-tight focus:outline-none placeholder:text-xs focus:shadow-outline"
                type="text"
                onChange={onChange}
                name="eventFormat"
                placeholder="Enter format"
              />
            </div>
            <div className="my-4">
              <label className="block text-gray-600 text-sm font-bold">Network Opportunities</label>
              <input
                className="w-full border py-2 ps-3 rounded-lg text-gray-600 leading-tight focus:outline-none placeholder:text-xs focus:shadow-outline"
                type="text"
                onChange={onChange}
                name="eventNetworkOps"
                placeholder="Enter network opportunities"
              />
            </div>
            <div className="my-4">
              <AddSpeaker />
            </div>
            <div className="my-4">
              <label className="block text-gray-600 text-sm font-bold">Manage Privacy Settings</label>
              <input
                className="w-full border py-2 ps-3 rounded-lg text-gray-600 leading-tight focus:outline-none placeholder:text-xs focus:shadow-outline"
                type="text"
                onChange={onChange}
                name="eventPrivacySettings"
                placeholder="Enter privacy settings"
              />
            </div>
            <div className="my-4">
              <label className="block text-gray-600 text-sm font-bold">Number of People</label>
              <input
                className="w-full border py-2 ps-3 rounded-lg text-gray-600 leading-tight focus:outline-none placeholder:text-xs focus:shadow-outline"
                type="number"
                onChange={onChange}
                name="eventNO_of_People"
                placeholder="Enter number of people"
              />
            </div>
            <button
              className="w-full h-12 mt-14 border rounded-3xl bg-blue-800 text-white py-2 px-3 leading-tight focus:outline-none text-sm focus:shadow-outline"
              type="submit"
            >
              Publish Now
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default EventForm;
