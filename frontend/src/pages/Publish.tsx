
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../config";
import { useState } from "react";
import { Appbar } from "../components/AppBar";

export const Publish = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  return (
    <div>
      <Appbar />
      <div className="flex flex-col items-center p-8">
        <div>
          <h1 className="text-5xl font-extrabold m-4">New Blog</h1>
        </div>
        <div className="w-full m-8">
          <input
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            type="text"
            id="first_name"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            placeholder="Enter your title..."
            required
          />
        </div>
        <div className="w-full">
          <textarea
            onChange={(e) => {
              setContent(e.target.value);
            }}
            id="message"
            rows={8}
            className="block p-8 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
            placeholder="Write your thoughts..."
          ></textarea>
        </div>
        <button
          onClick={async () => {
            const response = await axios.post(
              `${BACKEND_URL}/api/v1/blog`,
              {
                title,
                content,
              },
              {
                headers: {
                  Authorization: localStorage.getItem("token"),
                },
              }
            );

            navigate(`/blog/${response.data.id}`);
          }}
          type="button"
          className="text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium rounded-full text-sm px-5 py-1.5 text-center my-4 mx-8"
        >
          Publish Post !
        </button>
      </div>
    </div>
  );
};
