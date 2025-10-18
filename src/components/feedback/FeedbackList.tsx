import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFeedback, deleteFeedback } from "../../features/FeedbackSlice";
import type { RootState } from "../../../app/Store";
import type { AppDispatch } from "../../../app/Store";
import ConfirmModal from "../common/ConfirmModal";
import toast from "react-hot-toast";

const FeedbackList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data, loading, error } = useSelector(
    (state: RootState) => state.feedback
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  useEffect(() => {
    dispatch(fetchFeedback());
  }, [dispatch]);

  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  const handleDeleteClick = (id: number) => {
    setSelectedId(id);
    setIsModalOpen(true);
  };

  const confirmDelete = () => {
    if (selectedId !== null) {
      dispatch(deleteFeedback(selectedId))
        .unwrap()
        .then(() => {
          toast.success("Feedback deleted successfully!");
        })
        .catch(() => {
          toast.error("Failed to delete feedback!");
        });
    }
    setIsModalOpen(false);
  };

  const cancelDelete = () => {
    setIsModalOpen(false);
    toast("Action canceled", { icon: "⚠️" });
  };

  return (
    <div className="mt-">
      <h2 className="flex justify-center text-xl font-bold mb-4 text-white bg-black p-4">
        Client Feedback
      </h2>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Client</th>
            <th className="border p-2 w-[40%] break-words">Message</th>
            <th className="border p-2">Rating</th>
            <th className="border p-2">Date</th>
            <th className="border p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((fb) => (
            <tr key={fb.id}>
              <td className="border p-2">{fb.clientName}</td>
              <td className="border p-2 break-words">{fb.message}</td>
              <td className="border p-2">{fb.rating}</td>
              <td className="border p-2">
                {new Date(fb.date).toLocaleDateString()}
              </td>
              <td className="border p-2">
                <button className="bg-blue-100 px-2 py-1 rounded-lg mr-2 hover:bg-blue-200">
                  Edit
                </button>
                <button
                  className="bg-red-300 px-2 py-1 rounded-lg hover:bg-red-400"
                  onClick={() => handleDeleteClick(fb.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    {isModalOpen && (
  <ConfirmModal
    isOpen={isModalOpen}
    onConfirm={confirmDelete}
    onCancel={cancelDelete}
    message="Are you sure you want to delete this feedback?"
  />
)}

    </div>
  );
};

export default FeedbackList;
