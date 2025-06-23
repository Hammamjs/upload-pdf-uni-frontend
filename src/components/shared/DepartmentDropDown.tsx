import {
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@radix-ui/react-select';
import { Button } from '../ui/button';
import { Dispatch, SetStateAction, useState } from 'react';
import { X } from 'lucide-react';
import { SelectGroup } from '../ui/select';

const departments = [
  { id: 'cs', name: 'Computer Science', icon: '💻', color: 'bg-blue-500' },

  {
    id: 'ma',
    name: 'Math',
    icon: '⚙️',
    color: 'bg-green-500',
  },
  {
    id: 'it',
    name: 'Information Technology',
    icon: 'ℹ️',
    color: 'bg-purple-500',
  },
  {
    id: 'nw',
    name: 'Networks',
    icon: '🌐',
    color: 'bg-orange-500',
  },
  {
    id: 'sc',
    name: 'Statistic',
    icon: '🔢',
    color: 'bg-red-500',
  },
];

const DepartmentDropDown = ({
  selectedDepartments,
  setSelectedDepartments,
}: {
  selectedDepartments: string[];
  setSelectedDepartments: Dispatch<SetStateAction<string[]>>;
}) => {
  const [availableDepartments, setAvailableDepartments] = useState(departments);

  const handleDepartmentAdd = (departmentId: string) => {
    const newDepartment = departments.find(
      (dep) => dep.id === departmentId
    )?.name;
    if (!newDepartment) return;
    if (!selectedDepartments.includes(newDepartment)) {
      setSelectedDepartments((prev) => [...prev, newDepartment]);
      setAvailableDepartments((prev) =>
        prev.filter((dept) => dept.id !== departmentId)
      );
    }
  };

  const handleDepartmentRemove = (department: string) => {
    setSelectedDepartments((prev) => prev.filter((dep) => dep !== department));
    const departmentToAdd = departments.find(
      (dept) => dept.name === department
    );
    if (departmentToAdd) {
      setAvailableDepartments((prev) =>
        [...prev, departmentToAdd].sort((a, b) => a.name.localeCompare(b.name))
      );
    }
  };

  return (
    <SelectGroup className="space-y-6 relative">
      {/* Department Selection */}
      <div className="space-y-4">
        <Label className="text-sm font-medium text-gray-300">Departments</Label>

        {/* Add Department Dropdown */}
        <div className="w-full border rounded-md">
          <Select onValueChange={handleDepartmentAdd}>
            <SelectTrigger className="w-full h-12">
              <SelectValue placeholder="Select department to add" />
            </SelectTrigger>
            <SelectContent className="p-2 bg-white rounded-md max-w-full w-96 ">
              {availableDepartments.map((dept) => (
                <SelectItem
                  key={dept.id}
                  value={dept.id}
                  className="cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <span>{dept.icon}</span>
                    {dept.name}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Selected Departments */}
        {selectedDepartments.length > 0 && (
          <div className="space-y-2">
            <p className="text-sm text-gray-300">Selected Departments:</p>
            <div className="space-y-2">
              {selectedDepartments.map((department) => {
                const dept = departments.find((d) => d.name === department);
                if (!dept) return null;

                return (
                  <div
                    key={dept.id}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-8 h-8 rounded-full ${dept.color} flex items-center justify-center text-white text-sm`}
                      >
                        {dept.icon}
                      </div>
                      <span className="font-medium text-gray-900">
                        {dept.name}
                      </span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDepartmentRemove(department)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </SelectGroup>
  );
};

export default DepartmentDropDown;
