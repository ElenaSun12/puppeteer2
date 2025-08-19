const puppeteer = require('puppeteer');
const {clickElement, getText, putText} = require ("./commands");

// const { 
//   selectDay, 
//   selectMovie, 
//   selectHall, 
//   selectSeat,
//  // openAcinemaHallAndAsession 
// } =  require('./commands');

describe('Ticket Booking', () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await puppeteer.launch({ headless: false });
    page = await browser.newPage();
    await page.goto('https://qamid.tmweb.ru/client/index.php');
  });

  afterAll(async () => {
    await browser.close();
  });

// test('Buying one ticket', async () => {
//     await selectDay(page);
//     await selectMovie(page);
//     await selectHall(page);
//     await selectSeat(page, 4);
//     await page.click('.acceptin-button');
    
//     await page.waitForSelector('.buying-scheme__chair.buying-scheme__chair_standart.buying-scheme__chair_selected');
//   });

test.skip('Buying one ticket', async () => {
  const expected = 'Вы выбрали билеты:';
  
  await clickElement(page,".movie-seances__time:not(.acceptin-button-disabled)");
  await clickElement(page,'.buying-scheme__row:nth-child(1) .buying-scheme__chair:nth-child(6):not(.buying-scheme__chair_taken)');

  await clickElement(page,'.acceptin-button');
  const actual = await getText(page,'.ticket__check-title');

  expect(actual.trim()).toBe(expected);
}, 30000);

test('Buying three tickets', async () => {
  const expected = 'Вы выбрали билеты:';
  
  await clickElement(page,".movie-seances__time:not(.acceptin-button-disabled)");
  await clickElement(page,'.buying-scheme__row:nth-child(1) .buying-scheme__chair:nth-child(6):not(.buying-scheme__chair_taken)');
  await clickElement(page,'.buying-scheme__row:nth-child(1) .buying-scheme__chair:nth-child(7):not(.buying-scheme__chair_taken)');
  await clickElement(page,'.buying-scheme__row:nth-child(1) .buying-scheme__chair:nth-child(8):not(.buying-scheme__chair_taken)');

  await clickElement(page,'.acceptin-button');
  const actual = await getText(page,'.ticket__check-title');

  expect(actual.trim()).toBe(expected);
}, 30000);

test('Sad Path: Buying an occupied seat', async () => {
  
  await clickElement(page,".movie-seances__time:not(.acceptin-button-disabled)");
  await clickElement(page,'.buying-scheme__row:nth-child(2) .buying-scheme__chair:nth-child(6):not(.buying-scheme__chair_taken)');
  await clickElement(page,'.buying-scheme__row:nth-child(2) .buying-scheme__chair:nth-child(7):not(.buying-scheme__chair_taken)');
  await clickElement(page,'.buying-scheme__row:nth-child(2) .buying-scheme__chair:nth-child(8):not(.buying-scheme__chair_taken)');
  await clickElement(page,".acceptin-button");
  await clickElement(page,".acceptin-button");

  await page.goto('https://qamid.tmweb.ru/client/index.php');
  await clickElement(page,".movie-seances__time:not(.acceptin-button-disabled)");
  
  await clickElement(page,'.buying-scheme__row:nth-child(2) .buying-scheme__chair:nth-child(6):not(.buying-scheme__chair_taken)');
  await clickElement(page,'.buying-scheme__row:nth-child(2) .buying-scheme__chair:nth-child(7):not(.buying-scheme__chair_taken)');
  await clickElement(page,'.buying-scheme__row:nth-child(2) .buying-scheme__chair:nth-child(8):not(.buying-scheme__chair_taken)');

  await clickElement(page,'.acceptin-button-disabled');
  const expected = '.acceptin-button-disabled';
  const isButtonDisabled = await page.$eval('.acceptin-button', btn => btn.disabled);

  // const actual = await getText(page,'.ticket__check-title');

  // expect(actual.trim()).toBe(expected);

  expect(isButtonDisabled).toBe(true);
  }, 30000);
});