import { GraduationCap } from 'lucide-react';

const NoResultFound = () => {
  return (
    <div className="text-center py-12">
      <GraduationCap className="h-16 w-16 text-gray-500 mx-auto mb-4" />
      <h3 className="text-xl font-semibold text-white mb-2">
        No results found
      </h3>
      <p className="text-gray-400">
        No results available for the selected semester
      </p>
    </div>
  );
};

export default NoResultFound;
