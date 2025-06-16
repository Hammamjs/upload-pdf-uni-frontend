import Search from './Search';
import StudentRoleCard from './StudentRoleCard';
import StudentSkeleton from '../animation/StudentSkeleton';
import useStudentRole from '../hooks/useStudentRole';
import { Toaster } from 'react-hot-toast';

const StudentRoles = () => {
  const { changeRole, filteredSt, handleSearchForStudent, isLoading } =
    useStudentRole();

  return (
    <div className="p-3 container mx-auto min-h-[calc(100vh-80px)] relative">
      <Search
        searchByPlaceholder="Search by student name"
        student={(e) => handleSearchForStudent(e.target.value)}
      />

      {isLoading
        ? [...Array(10).keys()].map((i) => <StudentSkeleton key={i} />)
        : filteredSt?.map(({ role, name, email }) => (
            <StudentRoleCard
              name={name}
              role={role}
              key={email}
              changeRole={() => changeRole(email, role)}
            />
          ))}
      <Toaster position="top-right" />
    </div>
  );
};

export default StudentRoles;
