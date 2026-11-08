// Makes a demo order number like "FL-261108-0427": FL + date (YYMMDD) + 4 random digits.
// WHY the two parameters: tests can pass a fixed date and a fixed "random" function,
// so the result is always the same and easy to check.
export function createOrderNumber(date = new Date(), random = Math.random) {
  const year = String(date.getFullYear()).slice(-2)
  const month = String(date.getMonth() + 1).padStart(2, '0') // getMonth() counts from 0
  const day = String(date.getDate()).padStart(2, '0')
  const digits = String(Math.floor(random() * 10000)).padStart(4, '0')
  return `FL-${year}${month}${day}-${digits}`
}
