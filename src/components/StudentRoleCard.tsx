import cn from '../utils/cn';
import CustomButton from './shared/CustomButton';
import type { StudentRoleType } from '../types';

const StudentRoleCard = ({
  name,
  role,
  className,
  changeRole,
}: StudentRoleType) => {
  return (
    <div
      className={cn(
        'bg-gray-300 flex justify-between p-2 items-center my-1',
        className
      )}
    >
      <p className="md:text-sm text-xs">{name}</p>

      {role === 'SuperAdmin' ? (
        <p className="mr-2 text-sm text-red-400">Super Admin</p>
      ) : role === 'Admin' ? (
        <CustomButton
          onClick={changeRole}
          className="bg-red-500 text-white font-bold text-xs"
        >
          <p>Admin</p>
        </CustomButton>
      ) : (
        <CustomButton
          onClick={changeRole}
          className="bg-gray-400 font-bold text-xs"
        >
          <p>Student</p>
        </CustomButton>
      )}
    </div>
  );
};

export default StudentRoleCard;
