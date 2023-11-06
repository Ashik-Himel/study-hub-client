import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const AssignmentCard = ({assignment}) => {
  const {_id, thumbnail, title, marks, difficultyLevel} = assignment;

  return (
    <div className='bg-gray-200 rounded-lg flex justify-center items-center gap-6 [&>*]:flex-1'>
      <div>
        <img className='rounded-b-lg md:rounded-b-none md:rounded-s-lg aspect-[4/3] object-cover object-center' src={thumbnail} alt={`${title}'s thumbnail`} />
      </div>
      <div>
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