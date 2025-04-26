export const formatDate = (isoDate: Date | undefined) => {
  try {
    if (!isoDate) {
      return;
    }
    const date = new Date(isoDate);

    const day = String(date.getUTCDate()).padStart(2, '0');
    const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const year = date.getUTCFullYear();

    return `${year}-${month}-${day}`;
  } catch(e) {
    console.log(e)
  }
}

export const capitalizeFirstLetter = (word: string | undefined) => !word ? '' : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();

export const isEmpty = (obj: {}) => {
  return Object.keys(obj).length === 0;
}