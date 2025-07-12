import { useQuery } from "@tanstack/react-query";
import AnnouncementsCard from "./AnnouncementsCard";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

function Announcements() {
  const axiosSecure = useAxiosSecure();

  const {
    data: announcementsData = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["announcement"],
    queryFn: () => axiosSecure.get("/announcement").then((res) => res.data),
  });

  if (isLoading)
    return <span className="loading loading-spinner loading-xl"></span>;
  if (error)
    return <span className="loading loading-spinner loading-xl"></span>;

  return (
    <div className="container mx-auto p-4">
      <div className="space-y-4">
        {announcementsData.length === 0 && <p>No announcements found.</p>}
        {announcementsData

          .filter((a) => a.status === "Active")
          .map((announcement) => (
            <AnnouncementsCard key={announcement._id} {...announcement} />
          ))}
      </div>
    </div>
  );
}

export default Announcements;
