import { useEffect, useState } from 'react';
import { Users, Shield, User, Crown, LucideIcon } from 'lucide-react';
import { getStudents } from '../api/StudentApi';
import useSWR from 'swr';
import { Student } from '@/context/StudentContext';
import toast from 'react-hot-toast';
import axios from 'axios';
import {
  changeAccountRole,
  changeAccountRoleOptions,
  updateStudentStatus,
  updateStudentStatusOption,
} from '@/helpers/StudentMutations';

const useStudentRole = () => {
  const { data: studentsData, mutate } = useSWR('students', getStudents, {
    suspense: true,
  });

  const [students, setStudents] = useState<Student[]>(
    studentsData?.results?.students || []
  );

  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState<'all' | 'Admin' | 'Student'>(
    'all'
  );
  const [statusFilter, setStatusFilter] = useState<
    'all' | 'active' | 'inactive'
  >('all');
  const [editingUser, setEditingUser] = useState<string | null>(null);

  useEffect(() => {
    setStudents(studentsData?.results?.students || []);
    console.log(studentsData);
  }, [studentsData]);

  const filteredUsers = students.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'all' || student.role === roleFilter;
    const matchesStatus =
      statusFilter === 'all' ||
      (student.active ? 'active' : 'inactive') === statusFilter;

    return matchesSearch && matchesRole && matchesStatus;
  });
  const handleRoleChange = async (
    studentId: string,
    newRole: 'Admin' | 'Student'
  ) => {
    try {
      await mutate(
        changeAccountRole(studentId, students, newRole),
        changeAccountRoleOptions(studentId, students, newRole)
      );
      console.log('Action trigger');
      toast.success('Role change successfully');
    } catch (err) {
      if (axios.isAxiosError(err)) {
        toast.error(err?.response?.data.message);
      }
    }

    setEditingUser(null);
  };

  const handleStatusToggle = async (studentId: string) => {
    try {
      await mutate(
        updateStudentStatus(studentId, students),
        updateStudentStatusOption(studentId, students)
      );
      toast.success('Role changed');
    } catch (_err) {
      if (axios.isAxiosError(_err)) toast.error(_err?.response?.data?.message);
    }
  };

  const getRoleIcon = (role: string) => {
    return role === 'Admin' ? Crown : User;
  };

  const getRoleColor = (role: string) => {
    return role === 'Admin' || role === 'SuperAdmin'
      ? 'text-yellow-400 bg-yellow-500/20'
      : 'text-blue-400 bg-blue-500/20';
  };

  const getStatusColor = (status: string) => {
    return status === 'active'
      ? 'text-green-400 bg-green-500/20'
      : 'text-red-400 bg-red-500/20';
  };

  const filterData = (
    data: Student[],
    role: 'Admin' | 'Student' | 'SuperAdmin'
  ) => {
    return data.filter((s) => s.role === role).length;
  };
  const activeUsers = students.filter((s) => s.active).length;

  const CardRoles: {
    count: number;
    Icon: LucideIcon;
    className?: string;
    IconClassName?: string;
    textClassName?: string;
    text: string;
  }[] = [
    {
      text: 'Total users',
      Icon: Users,
      count: studentsData?.results?.count || 0,
      className: 'from-blue-500/20 to-blue-600/20 border-blue-400/20',
      textClassName: 'text-blue-300',
      IconClassName: 'h-8 w-8 text-blue-400',
    },
    {
      text: 'Admin',
      Icon: Crown,
      count: filterData(students, 'Admin') + filterData(students, 'SuperAdmin'),
      className: 'from-yellow-500/20 to-yellow-600/20 border-yellow-400/20',
      textClassName: 'text-yellow-300',
      IconClassName: 'text-yellow-400',
    },
    {
      Icon: Shield,
      count: activeUsers || 0,
      className: 'from-green-500/20 to-green-600/20 border-green-400/20',
      textClassName: 'text-green-300',
      IconClassName: 'text-green-400',
      text: 'Active users',
    },
    {
      Icon: User,
      count: filterData(students, 'Student'),
      className: 'from-purple-500/20 to-purple-600/20 border-purple-400/20',
      textClassName: 'text-purple-300',
      IconClassName: 'text-purple-400',
      text: 'Regular Users',
    },
  ];

  return {
    CardRoles,
    getRoleColor,
    getRoleIcon,
    getStatusColor,
    editingUser,
    setEditingUser,
    students,
    setSearchTerm,
    setStatusFilter,
    setRoleFilter,
    handleRoleChange,
    handleStatusToggle,
    filteredUsers,
    roleFilter,
    searchTerm,
    statusFilter,
  };
};

export default useStudentRole;
