export const isDateTime = (val: string) => !isNaN(Date.parse(val)) && !/Invalid|NaN/.test(new Date(val).toISOString());

export const isValidAge = (dob: string) => {
  const today = new Date();
  const birthDate = new Date(dob);
  const age = today.getFullYear() - birthDate.getFullYear();
  const month = today.getMonth() - birthDate.getMonth();
  if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
    return age - 1;
  }
  return age;
};