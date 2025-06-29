import { useMemo, useState } from 'react';
import useStudentMaterials from './useStudentMaterials';

const useSubjectsMaterials = () => {
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedSemester, setSelectedSemester] = useState('');
  const [showResults, setShowResults] = useState(false);

  const { subjects } = useStudentMaterials();

  const handleSearch = () => {
    if (selectedDepartment && selectedYear && selectedSemester) {
      setShowResults(true);
    }
  };

  const filtredMaterials = useMemo(() => {
    if (selectedDepartment && selectedSemester && selectedYear) {
      return (
        subjects.filter(
          (pdf) =>
            pdf.year === selectedYear.split(' ')[0] &&
            pdf.departments.includes(selectedDepartment) &&
            pdf.year === selectedYear.split(' ')[0]
        ) || []
      );
    }
  }, [selectedDepartment, selectedSemester, selectedYear, subjects]);

  const resetSelection = () => {
    setSelectedDepartment('');
    setSelectedYear('');
    setSelectedSemester('');
    setShowResults(false);
  };

  const handleDownloadFile = (content: string) => {
    const link = document.createElement('a');
    link.href = content;
    link.click();
  };
  return {
    selectedDepartment,
    setSelectedDepartment,
    showResults,
    setShowResults,
    setSelectedYear,
    selectedYear,
    selectedSemester,
    setSelectedSemester,
    handleSearch,
    filtredMaterials,
    resetSelection,
    handleDownloadFile,
  };
};

export default useSubjectsMaterials;
