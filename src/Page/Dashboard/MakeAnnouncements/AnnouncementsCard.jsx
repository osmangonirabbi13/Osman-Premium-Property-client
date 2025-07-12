import React from "react";

const AnnouncementsCard = ({ title, description, datePosted, status }) => {
  return (
    <div className="rounded-sm border mb-4 border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
      <div>
        <h2 className="font-bold text-lg">{title}</h2>
        <p>{description}</p>
      </div>

      <div className="flex justify-between mt-2">
        <span className="text-xs">
          Posted on:{" "}
          {datePosted ? new Date(datePosted).toLocaleDateString() : "N/A"}
        </span>
        <span className="text-xs">
          Status:{" "}
          <span
            className={`font-semibold ${
              status === "Active" ? "text-green-500" : "text-red-500"
            }`}
          >
            {status}
          </span>
        </span>
      </div>
    </div>
  );
};

export default AnnouncementsCard;
