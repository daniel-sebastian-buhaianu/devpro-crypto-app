type SimpleArray = number[];
type TupleArray = [string, number][];

const getReducedArray = (array: SimpleArray | TupleArray, num: number): SimpleArray | TupleArray => {
  const lastIndex: number = array.length - 1;

  return array.filter((_, index: number) => {
    return index === 0 || index === lastIndex || (index + 1) % num === 0;
  }) as SimpleArray | TupleArray;
};

export default getReducedArray;