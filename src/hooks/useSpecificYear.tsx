import { useParams } from 'react-router-dom';
import useFetchSubjects from './useFetchSubjects';

const useSpecificYear = () => {
  const { selected } = useParams();
  const selectedOpt = selected?.split(',');

  // change first letter to start with CapitalCase and seond letter after " "
  // const index: number = selectedOpt![0].indexOf(' ') + 1;
  // selectedOpt![0] = selectedOpt![0].replace(
  //   selectedOpt![0][0],
  //   selectedOpt![0][0].toLocaleUpperCase()
  // );
  // selectedOpt![0] = selectedOpt![0].replace(
  //   selectedOpt![0][index],
  //   selectedOpt![0][index].toLocaleUpperCase()
  // );

  // an easy way

  const toUpperCases = selectedOpt![0]
    .split(' ')
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(' ');

  selectedOpt![0] = toUpperCases;

  const { isLoading, subjectName } = useFetchSubjects();

  return {
    isLoading,
    subjectName,
  };
};

export default useSpecificYear;
