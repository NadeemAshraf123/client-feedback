import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchFeedback, deleteFeedback } from '../../features/FeedbackSlice';
import type { RootState } from '../../../app/Store';
import type { AppDispatch } from '../../../app/Store';
import toast from 'react-hot-toast';

const FeedbackList = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { data, loading, error } = useSelector((state: RootState) => state.feedback)

  useEffect(() => {
    dispatch(fetchFeedback())
  }, [dispatch])

  if (loading) return <p className="text-center">Loading...</p>
  if (error) return <p className="text-center text-red-500">{error}</p>

  const handleEdit = (id: number) => {
    toast('Edit feature coming soon', { icon: '🛠️' });
  };

  const handleDelete = (id: number) => {
    const confirmDelete = window.confirm("⚠ Are you sure you want to delete this feedback?");

    if (confirmDelete) {
      dispatch(deleteFeedback(id))
        .unwrap()
        .then(() => {
          toast.success("✅ Feedback deleted successfully!");
        })
        .catch(() => {
          toast.error("❌ Failed to delete feedback!");
        });
    } else {
      toast('❎ Delete cancelled');
    }
  };

  return (
    <div className="mt-">
      <h2 className="flex justify-center text-xl font-bold mb-4 text-white bg-black p-4">Client Feedback</h2>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Client</th>
            <th className="border p-2">Message</th>
            <th className="border p-2">Rating</th>
            <th className="border p-2">Date</th>
            <th className='border p-2'>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((fb) => (
            <tr key={fb.id}>
              <td className="border p-2">{fb.clientName}</td>
              <td className="border p-2">{fb.message}</td>
              <td className="border p-2">{fb.rating}</td>
              <td className="border p-2">{new Date(fb.date).toLocaleDateString()}</td>
              <td className='border p-2 flex gap-2'>
                <button
                  className='bg-blue-100 px-2 py-1 rounded-lg cursor-pointer'
                  onClick={() => handleEdit(fb.id)}
                >
                  Edit
                </button>

                <button
                  className='bg-red-300 px-2 py-1 rounded-lg cursor-pointer'
                  onClick={() => handleDelete(fb.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default FeedbackList
