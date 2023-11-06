import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const AssignmentCard = ({assignment}) => {
  const {_id, thumbnail, title, marks, difficultyLevel} = assignment;

  return (
    <div className='bg-gray-200 rounded-lg flex flex-col sm:flex-row justify-center sm:items-center'>
      <div className='w-full sm:w-2/5 max-h-[200px] h-full sm:max-h-none'>
        <img className='rounded-t-lg sm:rounded-t-none sm:rounded-s-lg w-full h-full object-cover object-center' src={thumbnail} alt={`${title}'s thumbnail`} />
      </div>
      <div className='sm:w-3/5 p-6'>
        <h3 className='text-2xl font-medium mb-2 text-primary'>{title}</h3>
        <span className='block mb-1'><span className="font-bold">Marks:</span> {marks}</span>
        <span className='block mb-4'><span className="font-bold">Difficulty Level:</span> {difficultyLevel}</span>
        <div className='flex items-center gap-2'>
          <Link to={`/assignments/${_id}`} className='btn btn-primary'>View</Link>
          <Link to={`/assignments/update/${_id}`} className='btn btn-primary btn-outline'>Update</Link>
        </div>
      </div>
    </div>
  );
};

export default AssignmentCard;

AssignmentCard.propTypes = {
  assignment: PropTypes.object
}