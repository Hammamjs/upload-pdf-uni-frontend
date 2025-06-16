import type { ResultProps } from '../types';

const ResultData = ({ semester, subject, ch, grade }: ResultProps) => {
  if (!subject) return;
  return (
    <div className="w-full border select-none text-xs md:text-sm grid grid-cols-12 border-t border-gray-600 text-gray-300 bg-gray-500 text-center">
      <p className="border-r p-1 col-span-2">{semester}</p>
      <p className="col-span-7 border-r p-1">{subject}</p>
      <p className="border-r p-1">{ch}</p>
      <p
        className={`p-1 col-span-2 ${
          grade && grade.replace('+', '').toLowerCase() == 'f'
            ? 'bg-red-400'
            : grade && grade.startsWith('+A')
            ? 'bg-green-500'
            : !grade
            ? 'bg-orange-400'
            : ''
        }`}
      >
        {grade}
      </p>
    </div>
  );
};

export default ResultData;
