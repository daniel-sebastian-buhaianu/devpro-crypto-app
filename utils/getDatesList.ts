const getDatesList = (times: string[]): string[] => {
  let currentDate: Date = new Date();
  let prev: string = times[times.length-1].slice(0,1)
  let result: string[] = [];

  for (let i= times.length; i >= 0; i--) {
    const current: string = times[i];
    if (current > prev) {
      result[i] = currentDate.toLocaleDateString('en-US', { day: 'numeric', month: 'short' });
      currentDate.setDate(currentDate.getDate() - 1);
    } else {
      result[i] = "";
    }
    prev = current;
  }
  return result;
}

export default getDatesList;