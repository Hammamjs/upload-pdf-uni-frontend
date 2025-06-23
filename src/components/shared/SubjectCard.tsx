import { Link } from 'react-router-dom';
import img from '../../assets/img.jpg';
const SubjectCard = ({
  subject,
  image,
}: {
  subject: string;
  image: string;
}) => {
  console.log(subject);
  return (
    <div className="cursor-pointer bg-gray-300 p-3 overflow-hidden max-w-[250px] md:max-w-[250px] rounded max-h-[150px] min-h-[120px] w-full h-full ">
      {/* <Link to={`/subjects/${subject}`}> */}
      <div className="img mt-5 w-fit bg-red-400 p-1">
        <img
          src={img}
          alt=""
          className="w-20 h-20 object-cover hover:rotate-10 transition hover:scale-200"
        />
      </div>
      {/* </Link> */}
      <p className="text-center">
        {subject.length >= 15
          ? subject.slice(0, 2).toUpperCase() +
            subject[subject.indexOf(' ') + 1].slice(0, 1).toUpperCase()
          : subject}
      </p>
    </div>
  );
};

export default SubjectCard;
