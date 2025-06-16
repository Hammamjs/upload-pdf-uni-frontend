import type { StudentStatusType } from '../types';

const StudentStatus = ({ name, gpa, index, sup }: StudentStatusType) => {
  const supCount =
    sup?.filter((subject) => subject.toLowerCase() === 'f').length || 0;

  return (
    <div className="w-96 max-w-full bg-gray-400 p-2 mx-auto rounded my-2 text-gray-600">
      <p>
        <span className="font-bold">Studnet</span>: {name}
      </p>
      <p className="my-2">
        <span className="font-bold">Remark: </span>
        {Number(gpa) >= 2 && supCount === 0 ? (
          <span className="text-green-300">pass</span>
        ) : (
          <span className="text-red-300">{supCount} sup</span>
        )}
      </p>
      <p>
        <span className="font-bold">GPA: </span> {gpa}
      </p>
      <p className=" mt-2">
        <span className="font-bold">Studnet index: </span>
        {index}
      </p>
    </div>
  );
};

export default StudentStatus;
