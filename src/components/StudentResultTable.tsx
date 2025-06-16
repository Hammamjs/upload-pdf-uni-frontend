const StudentResultTable = () => {
  return (
    <div className="w-full border-2 text-xs md:text-sm grid grid-cols-12 mt-2 text-gray-300 border-gray-500 bg-gray-500 text-center">
      <p className="border-r p-1 col-span-2">Semester</p>
      <p className="col-span-7 border-r p-1">Subject</p>
      <p className="border-r p-1">CH</p>
      <p className="p-1 col-span-2">Grade</p>
    </div>
  );
};

export default StudentResultTable;
