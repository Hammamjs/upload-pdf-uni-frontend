import { useEffect, useState } from 'react';
import { SubjectType } from '@/types';
import useSWR from 'swr';
import { deleteFile, getAllPdfs, updateFile } from '@/api/FileApi';
import toast from 'react-hot-toast';
import axios from 'axios';
import { ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';

const usePDFManagement = () => {
  const { data: files, isLoading } = useSWR<{ PDFS: SubjectType[] }>(
    'materials',
    getAllPdfs
  );

  const [pdfFiles, setPdfFiles] = useState<SubjectType[]>(files?.PDFS || []);

  useEffect(() => {
    // re-render when file fetched
    setPdfFiles(files?.PDFS || []);
  }, [isLoading]);

  // Search and filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [selectedSemester, setSelectedSemester] = useState('all');
  const [selectedYear, setSelectedYear] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [sortBy, setSortBy] = useState<
    'title' | 'uploadDate' | 'downloads' | 'size'
  >('uploadDate');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  // Modal states
  const [viewingPDF, setViewingPDF] = useState<SubjectType | null>(null);
  const [editingPDF, setEditingPDF] = useState<SubjectType | null>(null);
  const [deletingPDF, setDeletingPDF] = useState<SubjectType | null>(null);

  // Edit form data
  const [editFormData, setEditFormData] = useState<Partial<SubjectType>>({});

  // Filter and sort PDFs
  const filteredAndSortedPDFs = pdfFiles
    .filter((pdf) => {
      const matchesSearch =
        searchTerm === '' ||
        pdf.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pdf.subject.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesDepartment =
        selectedDepartment === 'all' ||
        pdf.departments.includes(selectedDepartment);
      const matchesSemester =
        selectedSemester === 'all' || pdf.semester === selectedSemester;
      const matchesYear = selectedYear === 'all' || pdf.year === selectedYear;

      return (
        matchesSearch && matchesDepartment && matchesSemester && matchesYear
      );
    })
    .sort((a, b) => {
      let aValue: any, bValue: any;

      switch (sortBy) {
        case 'title':
          aValue = a.title.toLowerCase();
          bValue = b.title.toLowerCase();
          break;
        case 'uploadDate':
          aValue = new Date(a.uploadedAt);
          bValue = new Date(b.uploadedAt);
          break;
        case 'size':
          aValue = parseFloat(a.size.toString());
          bValue = parseFloat(b.size.toString());
          break;
        default:
          return 0;
      }

      if (sortOrder === 'asc') {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });

  // Clear all filters
  const clearFilters = () => {
    setSearchTerm('');
    setSelectedDepartment('all');
    setSelectedSemester('all');
    setSelectedYear('all');
    setSelectedStatus('all');
  };

  // Check if any filters are active
  const hasActiveFilters =
    searchTerm !== '' ||
    selectedDepartment !== 'all' ||
    selectedSemester !== 'all' ||
    selectedYear !== 'all' ||
    selectedStatus !== 'all';

  // Handle sort
  const handleSort = (field: 'title' | 'uploadDate' | 'downloads' | 'size') => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
  };

  // Handle edit
  const handleEdit = (pdf: SubjectType) => {
    setEditingPDF(pdf);
    setEditFormData(pdf);
  };

  // Handle edit form change
  const handleEditFormChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle tags change
  const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const tags = e.target.value
      .split(',')
      .map((tag) => tag.trim())
      .filter((tag) => tag);
    setEditFormData((prev) => ({
      ...prev,
      tags,
    }));
  };

  // Save edit
  const handleSaveEdit = async () => {
    if (!editingPDF) return;

    setPdfFiles((prev) =>
      prev.map((pdf) =>
        pdf._id === editingPDF._id
          ? ({
              ...pdf,
              ...editFormData,
              uploadDate: new Date().toISOString().split('T')[0],
            } as SubjectType)
          : pdf
      )
    );

    try {
      await updateFile(editingPDF);
      toast.success('File edited 🥳');
    } catch (err) {
      console.log(err);
      if (axios.isAxiosError(err)) toast.error(err?.response?.data?.message);
    }

    console.log('Hammam');

    setEditingPDF(null);
    setEditFormData({});
  };

  // Handle delete
  const handleDelete = (pdf: SubjectType) => {
    setDeletingPDF(pdf);
  };

  // Confirm delete
  const confirmDelete = async (id: string) => {
    if (!deletingPDF) return;

    setPdfFiles((prev) => prev.filter((pdf) => pdf._id !== deletingPDF._id));
    setDeletingPDF(null);
    try {
      const res = await deleteFile(id);
      toast.success(`${res.message} ❌`);
    } catch (err) {
      console.log(err);
      if (axios.isAxiosError(err)) toast.error(err?.response?.data?.message);
    }
  };

  // Get sort icon
  const getSortIcon = (field: string) => {
    if (sortBy !== field) return ArrowUpDown;
    return sortOrder === 'asc' ? ArrowUp : ArrowDown;
  };
  return {
    pdfFiles,
    setPdfFiles,
    getSortIcon,
    getSelection,
    filteredAndSortedPDFs,
    viewingPDF,
    setViewingPDF,
    clearFilters,
    handleDelete,
    handleEdit,
    handleEditFormChange,
    handleSaveEdit,
    handleSort,
    hasActiveFilters,
    handleTagsChange,
    confirmDelete,
    searchTerm,
    setSearchTerm,
    selectedDepartment,
    setSelectedDepartment,
    sortBy,
    selectedSemester,
    setSelectedSemester,
    selectedYear,
    setSelectedYear,
    editFormData,
    setEditFormData,
    editingPDF,
    setEditingPDF,
    deletingPDF,
    setDeletingPDF,
  };
};

export default usePDFManagement;
