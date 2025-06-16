import { Link } from 'react-router-dom';
import img from '../../assets/img.jpg';
const SubjectCard = ({ subject }: { subject: string }) => {
  return (
    <div className="cursor-pointer bg-gray-300 p-1 overflow-hidden max-w-[150px] md:max-w-[170px] rounded max-h-[150px] min-h-[100px] w-full h-full">
      <Link to={`/subjects/${subject}`}>
        <img
          src={img}
          alt=""
          className="h-full object-cover hover:rotate-10 transition hover:scale-200"
        />
      </Link>
      <p className="text-center">{subject}</p>
    </div>
  );
};

export default SubjectCard;
