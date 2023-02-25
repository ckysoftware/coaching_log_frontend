export const padIntegerLeadingZeros = (int, length=8) => {
  var s = int.toString();
  while (s.length < length) s = "0" + s;
  return s;
}
