import { useEffect, useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";

const MakeAnnouncement = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [showForm, setShowForm] = useState(false);
  const [editData, setEditData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { data: announcements = [], isLoading: isFetching } = useQuery({
    queryKey: ["announcement"],
    queryFn: async () => {
      const res = await axiosSecure.get("/announcement/all");
      return res.data;
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const form = e.target;
    const title = form.title.value;
    const status = form.status.value;
    const description = form.description.value;

    const data = {
      title,
      status,
      description,
      datePosted: new Date().toISOString().split("T")[0],
      postedBy: "Admin",
    };

    try {
      if (editData) {
        await axiosSecure.patch(`/announcement/${editData._id}`, data);
        toast.success("Announcement updated successfully!");
      } else {
        await axiosSecure.post("/announcement", data);
        toast.success("Announcement added successfully!");
      }

      form.reset();
      setEditData(null);
      setShowForm(false);
      queryClient.invalidateQueries({ queryKey: ["announcement"] });
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to save announcement.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (announcement) => {
    setEditData(announcement);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "You won’t be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      try {
        await axiosSecure.delete(`/announcement/${id}`);
        toast.success("Announcement deleted!");
        queryClient.invalidateQueries({ queryKey: ["announcement"] });
      } catch (err) {
        toast.error("Failed to delete.");
      }
    }
  };

  return (
    <div className="p-6">
      {!showForm && (
        <div className="mb-4">
          <button
            onClick={() => {
              setShowForm(true);
              setEditData(null);
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Add Announcement
          </button>
        </div>
      )}

      {showForm && (
        <div className="rounded-sm border border-stroke bg-white shadow-default p-4 mb-6 dark:border-strokedark dark:bg-boxdark">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block mb-1 text-black dark:text-white">
                Title
              </label>
              <input
                type="text"
                name="title"
                defaultValue={editData?.title || ""}
                required
                className="w-full rounded border border-gray-300 p-2"
              />
            </div>

            <div className="mb-4">
              <label className="block mb-1 text-black dark:text-white">
                Status
              </label>
              <select
                name="status"
                defaultValue={editData?.status || "Active"}
                required
                className="w-full rounded border border-gray-300 p-2"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block mb-1 text-black dark:text-white">
                Description
              </label>
              <textarea
                name="description"
                rows={4}
                defaultValue={editData?.description || ""}
                required
                className="w-full rounded border border-gray-300 p-2"
              ></textarea>
            </div>

            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setEditData(null);
                }}
                className="bg-gray-400 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded"
                disabled={isLoading}
              >
                {isLoading ? "Saving..." : editData ? "Update" : "Add"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Show all announcements regardless of status */}
      <div className="space-y-4">
        {isFetching && <p>Loading...</p>}
        {!isFetching && announcements.length === 0 && (
          <p>No announcements found.</p>
        )}
        {!isFetching &&
          announcements.map((announcement) => (
            <div
              key={announcement._id}
              className="border rounded p-4 bg-white shadow dark:bg-boxdark"
            >
              <div className="flex justify-between">
                <div>
                  <h3 className="font-bold text-lg">{announcement.title}</h3>
                  <p>{announcement.description}</p>
                  <small className="text-gray-500">
                    Date: {announcement.datePosted} | Status:{" "}
                    <span
                      className={`${
                        announcement.status === "Active"
                          ? "text-green-600"
                          : "text-red-500"
                      }`}
                    >
                      {announcement.status}
                    </span>
                  </small>
                </div>
                <div className="flex gap-2 items-start">
                  <button
                    onClick={() => handleEdit(announcement)}
                    className="bg-yellow-400 px-2 py-1 rounded text-white"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(announcement._id)}
                    className="bg-red-500 px-2 py-1 rounded text-white"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default MakeAnnouncement;
