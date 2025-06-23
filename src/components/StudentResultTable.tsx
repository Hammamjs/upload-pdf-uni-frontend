const StudentResultTable = () => {
  return (
    <>
      <thead className="bg-white/10">
        <tr>
          <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300 uppercase tracking-wider">
            Semester
          </th>
          <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300 uppercase tracking-wider">
            Subject
          </th>
          <th className="px-6 py-4 text-center text-sm font-semibold text-gray-300 uppercase tracking-wider">
            CH
          </th>
          <th className="px-6 py-4 text-center text-sm font-semibold text-gray-300 uppercase tracking-wider">
            Grade
          </th>
        </tr>
      </thead>
    </>
  );
};

export default StudentResultTable;
