import type { SearchType } from '../types';

const Search = ({ searchByPlaceholder, student }: SearchType) => {
  return (
    <div className="container mx-auto text-center w-full mt-5">
      <input
        type="text"
        className="w-full mb-10 p-1 px-5 hover: rounded-sm border border-gray-400 outline-none bg-gray-300"
        placeholder={searchByPlaceholder}
        onChange={student}
      />
    </div>
  );
};

export default Search;
