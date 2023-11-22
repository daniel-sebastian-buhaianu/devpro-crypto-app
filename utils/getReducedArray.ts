const getReducedArray = (array: number[], num: number): number[] => {
  return array.reduce((accumulator: number[], currentValue: number, index: number) => {
    if ((index + 1) % num === 0) {
      accumulator.push(currentValue);
    }
    return accumulator;
  }, []);
};

export default getReducedArray;