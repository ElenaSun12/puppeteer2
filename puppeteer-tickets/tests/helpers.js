async function login(page, email, password) {
  await page.type('#email', email);
  await page.type('#password', password);
  await page.click('.login-button');
}

async function selectSeat(page, row, seat) {
  const seatSelector = `.buying-scheme__row:nth-child(${row}) .buying-scheme__chair:nth-child(${seat})`;
  await page.click(seatSelector);
}

module.exports = { login, selectSeat };