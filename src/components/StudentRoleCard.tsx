import useStudentRole from '../hooks/useStudentRole';

import React, { useState } from 'react';
import {
  Users,
  Shield,
  User,
  Crown,
  Search,
  Edit,
  X,
  LucideIcon,
} from 'lucide-react';
import RolesCard from './RolesCard';
import { Student } from '@/context/StudentContext';

const StudentRoleCard = () => {
  const {
    students: data,
    totalCount,
    adminCount,
    activeStudentsCount,
    regularStudentsCount,
  } = useStudentRole();

  const [students, setStudents] = useState<Student[]>(data);

  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState<'all' | 'Admin' | 'Student'>(
    'all'
  );
  const [statusFilter, setStatusFilter] = useState<
    'all' | 'active' | 'inactive'
  >('all');
  const [editingUser, setEditingUser] = useState<string | null>(null);

  const filteredUsers = students.filter((student: Student) => {
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

  const handleRoleChange = (studentId: string, newRole: 'admin' | 'user') => {
    setStudents((prev) =>
      prev.map((student) =>
        student._id === studentId ? { ...student, role: newRole } : student
      )
    );

    setEditingUser(null);
  };

  const handleStatusToggle = (studentId: string) => {
    setStudents((prev) =>
      prev.map((student) =>
        student._id === studentId
          ? {
              ...student,
              active: student.active ? false : true,
            }
          : student
      )
    );
  };

  const getRoleIcon = (role: string) => {
    return role === 'admin' ? Crown : User;
  };

  const getRoleColor = (role: string) => {
    return role === 'admin'
      ? 'text-yellow-400 bg-yellow-500/20'
      : 'text-blue-400 bg-blue-500/20';
  };

  const getStatusColor = (status: string) => {
    return status === 'active'
      ? 'text-green-400 bg-green-500/20'
      : 'text-red-400 bg-red-500/20';
  };

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
      count: totalCount,
      className: 'from-blue-500/20 to-blue-600/20 border-blue-400/20',
      textClassName: 'text-blue-300',
      IconClassName: 'h-8 w-8 text-blue-400',
    },
    {
      text: 'Admin',
      Icon: Crown,
      count: adminCount,
      className: 'from-yellow-500/20 to-yellow-600/20 border-yellow-400/20',
      textClassName: 'text-yellow-300',
      IconClassName: 'text-yellow-400',
    },
    {
      Icon: Shield,
      count: activeStudentsCount,
      className: 'from-green-500/20 to-green-600/20 border-green-400/20',
      textClassName: 'text-green-300',
      IconClassName: 'text-green-400',
      text: 'Active users',
    },
    {
      Icon: User,
      count: regularStudentsCount,
      className: 'from-purple-500/20 to-purple-600/20 border-purple-400/20',
      textClassName: 'text-purple-300',
      IconClassName: 'text-purple-400',
      text: 'Regular Users',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-white mb-4">
          User Role Management
        </h1>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
          Manage user permissions and access levels
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {CardRoles.map(
          ({ Icon, text, className, textClassName, IconClassName, count }) => (
            <RolesCard
              textClassName={textClassName}
              Icon={Icon}
              count={count}
              text={text}
              className={className}
              IconClassName={IconClassName}
            />
          )
        )}
      </div>

      {/* Search and Filters */}
      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 mb-8 border border-white/20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-2 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <select
              value={roleFilter}
              onChange={(e) =>
                setRoleFilter(e.target.value as 'all' | 'Admin' | 'Student')
              }
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all" className="bg-gray-800">
                All Roles
              </option>
              <option value="Admin" className="bg-gray-800">
                Admin
              </option>
              <option value="Student" className="bg-gray-800">
                Student
              </option>
            </select>
          </div>

          <div>
            <select
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(e.target.value as 'all' | 'active' | 'inactive')
              }
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all" className="bg-gray-800">
                All Status
              </option>
              <option value="active" className="bg-gray-800">
                Active
              </option>
              <option value="inactive" className="bg-gray-800">
                Inactive
              </option>
            </select>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-white/10">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300 uppercase tracking-wider">
                  Department
                </th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-300 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-300 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-300 uppercase tracking-wider">
                  Last Active
                </th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {filteredUsers.map((student: Student) => {
                const RoleIcon = getRoleIcon(student.role);
                return (
                  <tr
                    key={student._id}
                    className="hover:bg-white/5 transition-colors duration-200"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
                          <User className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <p className="text-white font-medium">
                            {student.name}
                          </p>
                          <p className="text-gray-400 text-sm">
                            {student.email}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-gray-300">
                        {student.department}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      {editingUser === student._id ? (
                        <div className="flex items-center justify-center space-x-2">
                          <select
                            value={student.role}
                            onChange={(e) =>
                              handleRoleChange(
                                student._id,
                                e.target.value as 'admin' | 'user'
                              )
                            }
                            className="px-3 py-1 bg-white/10 border border-white/20 rounded text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                          >
                            <option value="user" className="bg-gray-800">
                              User
                            </option>
                            <option value="admin" className="bg-gray-800">
                              Admin
                            </option>
                          </select>
                          <button
                            onClick={() => setEditingUser(null)}
                            className="p-1 text-gray-400 hover:text-white"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center justify-center">
                          <span
                            className={`flex items-center space-x-1 px-3 py-1 rounded-full text-sm font-medium ${getRoleColor(
                              student.role
                            )}`}
                          >
                            <RoleIcon className="h-4 w-4" />
                            <span className="capitalize">{student.role}</span>
                          </span>
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button
                        onClick={() => handleStatusToggle(student._id)}
                        className={`px-3 py-1 rounded-full text-sm font-medium transition-colors duration-200 ${getStatusColor(
                          student.active ? 'active' : 'inactive'
                        )} hover:opacity-80`}
                      >
                        {student.active ? 'active' : 'inactive'}
                      </button>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="text-gray-300 text-sm">
                        {new Date(Date.now()).toLocaleDateString()}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button
                        onClick={() =>
                          setEditingUser(
                            editingUser === student._id ? null : student._id
                          )
                        }
                        className="p-2 text-blue-400 hover:text-blue-300 hover:bg-blue-500/20 rounded-lg transition-colors duration-200"
                        title="Edit Role"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {students.length === 0 && (
        <div className="text-center py-12">
          <Users className="h-16 w-16 text-gray-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">
            No users found
          </h3>
          <p className="text-gray-400">
            Try adjusting your search criteria or filters
          </p>
        </div>
      )}
    </div>
  );
};

export default StudentRoleCard;
