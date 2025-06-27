import { getAllSubjects, updateSubject } from '@/api/FileApi';
import { useEffect, useState } from 'react';
import type { Subject } from '@/types';
import toast from 'react-hot-toast';
import useSWR from 'swr';
import axios from 'axios';
import {
  addNewSubject,
  addNewSubjectOption,
  deleteSubjectOptions,
  deleteSubjectMutation,
} from '@/helpers/SubjectMutations';

const useSubjectOption = () => {
  const { data, mutate } = useSWR('subject', getAllSubjects, {
    suspense: true,
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [selectedSemester, setSelectedSemester] = useState('all');
  const [selectedYear, setSelectedYear] = useState('all');
  const [subjects, setSubjects] = useState<Subject[]>(data || []);

  const [isAddingSubject, setIsAddingSubject] = useState(false);
  const [editingSubject, setEditingSubject] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Subject>>({
    name: '',
    code: '',
    departments: [],
    semester: '',
    year: '',
    coverImage: '',
    description: '',
  });

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDepartmentToggle = (department: string) => {
    setFormData((prev) => {
      const currentDepartments = prev.departments || [];
      const isSelected = currentDepartments.includes(department);

      if (isSelected) {
        return {
          ...prev,
          departments: currentDepartments.filter((d) => d !== department),
        };
      } else {
        return {
          ...prev,
          departments: [...currentDepartments, department],
        };
      }
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.departments || formData.departments.length === 0) {
      alert('Please select at least one department');
      return;
    }

    if (editingSubject) {
      const getSubject = subjects.find(
        (sub) => sub._id === editingSubject
      )?._id;

      if (!getSubject) return;

      // setSubjects((prev) =>
      //   prev.map((subject) =>
      //     subject._id === editingSubject
      //       ? ({ ...subject, ...formData } as Subject)
      //       : subject
      //   )
      // );

      try {
        await updateSubject(formData, getSubject);
        toast.success('Subject updated');
      } catch (err) {
        if (axios.isAxiosError(err)) {
          toast.error(err?.response?.data.message);
        }
      }
      setEditingSubject(null);
    } else {
      const newSubject: Subject = {
        ...(formData as Subject),
      };

      // upload new subject to DB
      try {
        await mutate(
          addNewSubject(newSubject, data),
          addNewSubjectOption(data)
        );
        toast.success('New Subject added');
      } catch (err) {
        if (axios.isAxiosError(err)) {
          toast.error(err?.response?.data.message);
        }
      }

      // setSubjects((prev) => [...prev, newSubject]);
      setIsAddingSubject(false);
    }

    resetForm();
  };

  const handleEdit = async (subject: Subject) => {
    setFormData(subject);
    setEditingSubject(subject._id);
    setIsAddingSubject(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this subject?')) {
      console.log(id);
      try {
        await mutate(
          deleteSubjectMutation(id, data),
          deleteSubjectOptions(data)
        );
        toast.success('Subject removed');
      } catch (err) {
        if (axios.isAxiosError(err)) toast.error(err?.response?.data?.message);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      code: '',
      departments: [],
      semester: '',
      year: '',
      coverImage: '',
      description: '',
    });
    setIsAddingSubject(false);
    setEditingSubject(null);
  };

  const getDepartmentColor = (index: number) => {
    const colors = [
      'bg-blue-500/20 text-blue-300',
      'bg-purple-500/20 text-purple-300',
      'bg-green-500/20 text-green-300',
      'bg-yellow-500/20 text-yellow-300',
      'bg-pink-500/20 text-pink-300',
      'bg-indigo-500/20 text-indigo-300',
      'bg-red-500/20 text-red-300',
      'bg-teal-500/20 text-teal-300',
    ];
    return colors[index % colors.length];
  };

  // Filter subjects based on search and filter criteria
  const filteredSubjects = subjects?.filter((subject) => {
    const matchesSearch =
      searchTerm === '' ||
      subject.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      subject.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      subject.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      subject.departments.some((dept) =>
        dept.toLowerCase().includes(searchTerm.toLowerCase())
      );

    const matchesDepartment =
      selectedDepartment === 'all' ||
      subject.departments.includes(selectedDepartment);

    const matchesSemester =
      selectedSemester === 'all' || subject.semester === selectedSemester;

    const matchesYear = selectedYear === 'all' || subject.year === selectedYear;

    return matchesSearch && matchesDepartment && matchesSemester && matchesYear;
  });

  // Clear all filters

  useEffect(() => {
    setSubjects(data);
  }, [data]);

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedDepartment('all');
    setSelectedSemester('all');
    setSelectedYear('all');
  };

  // Check if any filters are active
  const hasActiveFilters =
    searchTerm !== '' ||
    selectedDepartment !== 'all' ||
    selectedSemester !== 'all' ||
    selectedYear !== 'all';

  return {
    subjects,
    isAddingSubject,
    setIsAddingSubject,
    editingSubject,
    setEditingSubject,
    getDepartmentColor,
    handleInputChange,
    handleEdit,
    handleDelete,
    handleDepartmentToggle,
    handleSubmit,
    resetForm,
    formData,
    searchTerm,
    setSearchTerm,
    selectedDepartment,
    setSelectedDepartment,
    hasActiveFilters,
    selectedSemester,
    setSelectedSemester,
    setSelectedYear,
    filteredSubjects,
    clearFilters,
    selectedYear,
  };
};

export default useSubjectOption;
