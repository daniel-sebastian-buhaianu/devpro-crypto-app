const formatDate = (inputDate: string): string => {
  const date = new Date(inputDate);
  return date.toLocaleDateString('en-US', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' });
}

export default formatDate;