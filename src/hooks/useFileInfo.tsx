import { getAllSubjects, uploadFile } from '../api/FileApi';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import useSWR from 'swr';
import { UploadFormData } from '@/types';

interface SubjectData {
  name: string;
  code: string;
  departments: string[]; // Changed to array for multiple departments
  year: string;
  semester: string;
  description?: string;
}

const useFileInfo = () => {
  const { data: subjects } = useSWR<SubjectData[]>(
    'subject-options',
    getAllSubjects
  );
  const [formData, setFormData] = useState<UploadFormData>({
    fileName: '',
    title: '',
    subject: '',
    year: '',
    semester: '',
    department: '',
    departments: [],
    file: null,
  });

  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadComplete, setUploadComplete] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState<SubjectData[]>(
    []
  );
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(-1);
  const [selectedSubject, setSelectedSubject] = useState<SubjectData | null>(
    null
  );

  const fileInputRef = useRef<HTMLInputElement>(null);
  const subjectInputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  // Filter suggestions based on input
  useEffect(() => {
    if (formData.subject.length > 0) {
      const filtered = subjects?.filter(
        (subject) =>
          subject.name.toLowerCase().includes(formData.subject.toLowerCase()) ||
          subject.code.toLowerCase().includes(formData.subject.toLowerCase()) ||
          subject.departments.some((dept) =>
            dept.toLowerCase().includes(formData.subject.toLowerCase())
          )
      );
      setFilteredSuggestions(filtered || []);
      setShowSuggestions(
        (filtered?.length || 0) > 0 && formData.subject.length > 0
      );
    } else {
      setShowSuggestions(false);
      setFilteredSuggestions([]);
    }
    setSelectedSuggestionIndex(-1);
  }, [formData.subject]);

  // Handle keyboard navigation in suggestions
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showSuggestions) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedSuggestionIndex((prev) =>
          prev < filteredSuggestions.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedSuggestionIndex((prev) => (prev > 0 ? prev - 1 : -1));
        break;
      case 'Tab':
      case 'Enter':
        e.preventDefault();
        if (selectedSuggestionIndex >= 0) {
          selectSuggestion(filteredSuggestions[selectedSuggestionIndex]);
        } else if (filteredSuggestions.length > 0) {
          selectSuggestion(filteredSuggestions[0]);
        }
        break;
      case 'Escape':
        setShowSuggestions(false);
        setSelectedSuggestionIndex(-1);
        break;
    }
  };

  // Select a suggestion and auto-fill related fields
  const selectSuggestion = (subject: SubjectData) => {
    setSelectedSubject(subject);
    formData.departments = [];
    formData.departments = subject.departments;
    setFormData((prev) => ({
      ...prev,
      subject: subject.name,
      // For multi-department subjects, default to first department but allow user to choose
      department:
        subject.departments.length === 1
          ? subject.departments[0]
          : prev.department || subject.departments[0],
      year: subject.year,
      semester: subject.semester,
      title: prev.title || `${subject.name} - ${subject.code}`,
    }));
    setShowSuggestions(false);
    setSelectedSuggestionIndex(-1);
  };

  // Handle input changes
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle subject input with special autocomplete logic
  const handleSubjectChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFormData((prev) => ({
      ...prev,
      subject: value,
    }));

    // Clear selected subject if user is typing something different
    if (selectedSubject && !value.includes(selectedSubject.name)) {
      setSelectedSubject(null);
    }
  };

  // Handle file selection
  const handleFileSelect = (file: File) => {
    setFormData((prev) => ({
      ...prev,
      file,
      fileName: prev.fileName || file.name.replace(/\.[^/.]+$/, ''),
    }));
  };

  // Drag and drop handlers
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0 && files[0].type === 'application/pdf') {
      handleFileSelect(files[0]);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const removeFile = () => {
    setFormData((prev) => ({
      ...prev,
      file: null,
    }));
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleUploadFile = async () => {
    setIsUploading(true);
    setUploadProgress(0);

    try {
      const res = await uploadFile(formData, (progress) => {
        setUploadProgress(progress);
      });
      if (res.status === 201) {
        setUploadComplete(true);
      }
      toast.success('Upload file completed');
    } catch (err) {
      if (axios.isAxiosError(err)) toast.error(err?.response?.data?.message);
      toast.error('Upload failed');
      console.log(err);
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !formData.file ||
      !formData.fileName ||
      !formData.title ||
      !formData.subject ||
      !formData.year ||
      !formData.semester ||
      !formData.department
    ) {
      return;
    }
    handleUploadFile();
  };

  const resetForm = () => {
    setFormData({
      fileName: '',
      title: '',
      subject: '',
      year: '',
      semester: '',
      department: '',
      departments: [],
      file: null,
    });
    setSelectedSubject(null);
    setUploadProgress(0);
    setUploadComplete(false);
    setShowSuggestions(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const isFormValid =
    formData.file &&
    formData.fileName &&
    formData.title &&
    formData.subject &&
    formData.year &&
    formData.semester &&
    formData.department;

  return {
    handleSubmit,
    isFormValid,
    formData,
    uploadProgress,
    isUploading,
    uploadComplete,
    handleKeyDown,
    dragActive,
    fileInputRef,
    handleDrop,
    handleDrag,
    handleFileInputChange,
    resetForm,
    handleInputChange,
    showSuggestions,
    setShowSuggestions,
    filteredSuggestions,
    selectedSuggestionIndex,
    selectSuggestion,
    removeFile,
    handleSubjectChange,
    subjectInputRef,
    suggestionsRef,
    selectedSubject,
  };
};

export default useFileInfo;
