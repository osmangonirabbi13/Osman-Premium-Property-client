import React from "react";
import { FaTrash } from "react-icons/fa";
import { GrUserAdmin } from "react-icons/gr";
import Swal from "sweetalert2";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";

const UserListTable = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  // useQuery v5 syntax: object argument
  const {
    data: users = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  // useMutation v5 syntax
  const deleteUserMutation = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.delete(`/users/${id}`);
      return res.data;
    },
    onSuccess: () => {
      Swal.fire("Deleted!", "User has been deleted.", "success");
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: () => {
      Swal.fire("Error", "Failed to delete user", "error");
    },
  });

  const changeUserRoleMutation = useMutation({
    mutationFn: async ({ id, newRole }) => {
      const res = await axiosSecure.patch(`/users/${id}/role`, {
        role: newRole,
      });
      return res.data;
    },
    onSuccess: () => {
      Swal.fire("Success", "User role updated successfully", "success");
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: () => {
      Swal.fire("Error", "Failed to update user role", "error");
    },
  });

  const handleUserDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteUserMutation.mutate(id);
      }
    });
  };

  const handleRoleChange = (id, newRole) => {
    Swal.fire({
      title: `Change role to ${newRole}?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, change it!",
    }).then((result) => {
      if (result.isConfirmed) {
        changeUserRoleMutation.mutate({ id, newRole });
      }
    });
  };

  if (isLoading) return <div>Loading users...</div>;
  if (isError) return <div>Error loading users</div>;

  return (
    <div className="overflow-x-auto">
      <h2 className="text-xl font-semibold mb-4">
        Logged in as: {user?.name || "User"}
      </h2>

      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border border-gray-300">#</th>
            <th className="p-2 border border-gray-300">Name</th>
            <th className="p-2 border border-gray-300">Number</th>
            <th className="p-2 border border-gray-300">Email</th>
            <th className="p-2 border border-gray-300">Role</th>
            <th className="p-2 border border-gray-300">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.length === 0 ? (
            <tr>
              <td colSpan={6} className="text-center p-4">
                No users found.
              </td>
            </tr>
          ) : (
            users.map(({ _id, displayName, email, role, number }, index) => (
              <tr key={_id} className="hover:bg-gray-100">
                <td className="p-2 border border-gray-300 text-center">
                  {index + 1}
                </td>
                <td className="p-2 border border-gray-300 text-center">
                  {displayName || "N/A"}
                </td>
                <td className="p-2 border border-gray-300 text-center">
                  {number || "N/A"}
                </td>
                <td className="p-2 border border-gray-300 text-center">
                  {email || "N/A"}
                </td>
                <td className="p-2 border border-gray-300 text-center uppercase">
                  {role || "user"}
                </td>
                <td className="p-2 border border-gray-300 text-center flex justify-center gap-2">
                  <button
                    onClick={() => handleUserDelete(_id)}
                    className="flex items-center gap-1 text-red-600 hover:text-red-800"
                    title="Delete User"
                    disabled={deleteUserMutation.isLoading}
                  >
                    <FaTrash size={18} />
                    <span>Delete</span>
                  </button>

                  {role !== "admin" && (
                    <button
                      onClick={() => handleRoleChange(_id, "admin")}
                      className="flex items-center gap-1 text-blue-600 hover:text-blue-800"
                      title="Make Admin"
                      disabled={changeUserRoleMutation.isLoading}
                    >
                      <GrUserAdmin size={18} />
                      <span>Make Admin</span>
                    </button>
                  )}

                  {role !== "member" && (
                    <button
                      onClick={() => handleRoleChange(_id, "member")}
                      className="flex items-center gap-1 text-purple-600 hover:text-purple-800"
                      title="Make Member"
                      disabled={changeUserRoleMutation.isLoading}
                    >
                      <span>Make Member</span>
                    </button>
                  )}

                  {role !== "user" && (
                    <button
                      onClick={() => handleRoleChange(_id, "user")}
                      className="flex items-center gap-1 text-green-600 hover:text-green-800"
                      title="Make User"
                      disabled={changeUserRoleMutation.isLoading}
                    >
                      <span>Make User</span>
                    </button>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UserListTable;
