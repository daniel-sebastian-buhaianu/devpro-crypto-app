type TupleArray = [string, number][];

const getLabelsAndData = (array: TupleArray) => {
  const labels: string[] = array.map((item: [string, number]) => item[0]);
  const dataSet: number[] = array.map((item: [string, number]) => item[1]);
  return { labels, dataSet };
}

export default getLabelsAndData;