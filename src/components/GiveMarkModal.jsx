import PropTypes from 'prop-types';
import { axiosInstance } from '../hooks/useAxios';
import { useContext } from 'react';
import { GlobalContext } from '../context/ContextProvider';
import toast from 'react-hot-toast';

const GiveMarkModal = ({showModal, setShowModal, assignment, refetch}) => {
  const {user} = useContext(GlobalContext);
  const handleSubmit = e => {
    e.preventDefault();

    const updatedAssignment = {...assignment}
    updatedAssignment.status = "completed";
    updatedAssignment.givenMark = e.target.mark.value;
    updatedAssignment.feedback = e.target.feedback.value;
    delete updatedAssignment._id;

    axiosInstance.put(`/submitted-assignments?id=${assignment?._id}`, updatedAssignment, {headers: {Authorization: user?.email}})
      .then(res => {
        if (res?.data?.modifiedCount === 1) {
          toast.success("Mark Given !!!");
          refetch();
          setShowModal(false);
        }
      })
      .catch(err => {
        toast.error(err.message);
      })
  }

  return (
    <section className="fixed w-screen h-screen left-0 right-0 bg-black bg-opacity-40 flex justify-center items-center transition-[top] duration-300 z-40" style={showModal ? {top: "0px"} : {top: "-100%"}}>
      <form className="bg-white w-full max-w-[600px] m-6 p-6 rounded-lg" onSubmit={handleSubmit}>
        <h2 className="text-3xl font-medium mb-6 text-center">Give Mark</h2>
        <p className='text-left mb-2'><span className="font-bold">PDF Link:</span> <a className='text-blue-700 underline' href={assignment?.pdfLink} target="_blank" rel="noopener noreferrer">{assignment?.pdfLink}</a></p>
        {
          assignment?.note ? <p className='text-left'><span className='font-bold'>Note from user:</span> {assignment?.note}</p> : null
        }
        <label className="text-left font-semibold block mb-2 mt-6" htmlFor="mark">Give Mark (Out of {assignment?.assignmentMarks})</label>
        <input className="input w-full border-gray-300 mb-4" type="number" max={assignment?.assignmentMarks} name="mark" id="mark" placeholder="Give mark on the submission" required />

        <label className="text-left font-semibold block mb-2" htmlFor="feedback">Feedback</label>
        <textarea className="input resize-none pt-2 h-[100px] w-full border-gray-300 mb-4" name="feedback" id="feedback" placeholder="Add Feedback" required></textarea>

        <div className="flex justify-center items-center gap-2">
          <button className="btn btn-primary" type="submit">Submit</button>
          <button className="btn btn-primary btn-outline" onClick={() => setShowModal(false)} type='button'>Close</button>
        </div>
      </form>
    </section>
  );
};

export default GiveMarkModal;

GiveMarkModal.propTypes = {
  showModal: PropTypes.bool,
  setShowModal: PropTypes.func,
  assignment: PropTypes.object,
  refetch: PropTypes.func
}