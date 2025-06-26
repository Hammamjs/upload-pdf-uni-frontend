import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { BookOpen, GraduationCap, FileText, Download } from 'lucide-react';
import { departments, FILE_BELONG_TO, SEMESTER } from '@/data/departmentArray';
import useStudentMaterials from '@/hooks/useStudentMaterials';
import { SubjectType } from '@/types';
import { formatDateFns } from '@/utils/dateFormat';

const StudyMaterials = () => {
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedSemester, setSelectedSemester] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [filtredMaterials, setFilteredMaterials] = useState<SubjectType[]>([]);

  const { subjects } = useStudentMaterials();

  const handleSearch = () => {
    if (selectedDepartment && selectedYear && selectedSemester) {
      setShowResults(true);
    }
  };

  useEffect(() => {
    console.log('From Materials ', subjects);
    if (selectedDepartment && selectedSemester && selectedYear) {
      const filteredMaterials = subjects.filter(
        (pdf) =>
          pdf.year === selectedYear.split(' ')[0] &&
          pdf.departments.includes(selectedDepartment) &&
          pdf.year === selectedYear.split(' ')[0]
      );
      setFilteredMaterials(filteredMaterials);
      console.log(filteredMaterials);
      // console.log(filteredMaterials);
    }
  }, [selectedDepartment, selectedSemester, selectedYear]);

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-600 rounded-lg">
              <GraduationCap className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Academic Resources
              </h1>
              <p className="text-gray-600">
                Find study materials by department and semester
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {!showResults ? (
          <div className="max-w-6xl mx-auto space-y-8">
            {/* Department Selection */}
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Choose Your Department
              </h2>
              <p className="text-gray-600">
                Select your department to get started
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {departments.map((dept) => (
                <Card
                  key={dept.name}
                  className={`cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg ${
                    selectedDepartment === dept.name
                      ? 'ring-2 ring-blue-500 shadow-lg'
                      : 'hover:shadow-md'
                  }`}
                  onClick={() => setSelectedDepartment(dept.name)}
                >
                  <CardContent className="p-6 text-center">
                    <div
                      className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${dept.color} text-white text-2xl mb-4`}
                    >
                      {dept.icon}
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">
                      {dept.name}
                    </h3>
                    <div className="w-full h-1 bg-gray-200 rounded">
                      <div
                        className={`h-1 ${
                          dept.color
                        } rounded transition-all duration-300 ${
                          selectedDepartment === dept.name ? 'w-full' : 'w-0'
                        }`}
                      ></div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Year and Semester Selection */}
            {selectedDepartment && (
              <div className="animate-fade-in space-y-6">
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">
                    Select Year & Semester
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                      <BookOpen className="h-4 w-4" />
                      Academic Year
                    </label>
                    <Select
                      value={selectedYear}
                      onValueChange={(val) => setSelectedYear(val)}
                    >
                      <SelectTrigger className="h-12">
                        <SelectValue placeholder="Select year" />
                      </SelectTrigger>
                      <SelectContent>
                        {FILE_BELONG_TO.map((year) => (
                          <SelectItem key={year} value={year}>
                            {year} year
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      Semester
                    </label>
                    <Select
                      value={selectedSemester}
                      onValueChange={(val) => setSelectedSemester(val)}
                    >
                      <SelectTrigger className="h-12">
                        <SelectValue placeholder="Select semester" />
                      </SelectTrigger>
                      <SelectContent>
                        {SEMESTER.map((semester) => (
                          <SelectItem key={semester} value={semester}>
                            {semester} semester
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {selectedYear && selectedSemester && (
                  <div className="text-center animate-fade-in">
                    <Button
                      onClick={handleSearch}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg font-medium rounded-lg transition-all duration-200 hover:scale-105"
                    >
                      Find Resources
                    </Button>
                  </div>
                )}
              </div>
            )}
          </div>
        ) : (
          /* Results Page */
          <div className="max-w-4xl mx-auto space-y-6">
            {/* Results Header */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    Study Materials
                  </h2>
                  <p className="text-gray-600">
                    {selectedDepartment} • {selectedYear} • {selectedSemester}
                  </p>
                </div>
                <Button
                  onClick={resetSelection}
                  variant="outline"
                  className="hover:bg-gray-50"
                >
                  New Search
                </Button>
              </div>
            </div>

            {/* PDF Results */}
            <div className="grid gap-4">
              {filtredMaterials.map((pdf) => (
                <Card
                  key={pdf._id}
                  className="hover:shadow-md transition-shadow duration-200"
                >
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-red-100 rounded-lg">
                          <FileText className="h-6 w-6 text-red-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">
                            {pdf.title}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {(pdf.size / (1024 * 1204)).toFixed(2)} MB • Added{' '}
                            {formatDateFns(pdf.uploadedAt)}
                          </p>
                        </div>
                      </div>
                      <Button
                        size="sm"
                        className="bg-blue-600 hover:bg-blue-700 text-white"
                        onClick={() => handleDownloadFile(pdf.content)}
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filtredMaterials.length === 0 && (
              <div className="text-center py-12">
                <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No resources found
                </h3>
                <p className="text-gray-600">
                  Try selecting a different combination.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default StudyMaterials;
