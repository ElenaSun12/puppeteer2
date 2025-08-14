const puppeteer = require('puppeteer');
const {clickElement, getText, putText} = require ("./commands");

const { 
  selectDay, 
  selectMovie, 
  selectHall, 
  selectSeat,
 // openAcinemaHallAndAsession 
} =  require('./commands');

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

  test.only('Buying one ticket', async () => {
  const expected = 'Получить код бронирования';
  
  await page.waitForSelector(".movie-seances__time[href='#'][data-seance-id='228']");
  await page.click(".movie-seances__time[href='#'][data-seance-id='228']");
  await page.waitForSelector('.acceptin-button', { timeout: 5000 });
  await page.click('.acceptin-button');
  const actual = await page.$eval('.acceptin-button', (button) => button.textContent);
  await page.waitForSelector('.acceptin-button', { timeout: 5000 });

  expect(actual.trim()).toBe(expected);
}, 5000);

test.skip("Buying three tickets", async () => {
  // Выбираем день, фильм и зал
  await selectDay(page);
  await selectMovie(page);
  await selectHall(page);

  // Ждем загрузки схемы мест
  await page.waitForSelector('.buying-scheme__wrapper', { timeout: 10000 });

    //await openAcinemaHallAndAsession(page);

  // Выбираем три свободных места (исправленные селекторы)
  await page.click('.buying-scheme__row:nth-child(10) .buying-scheme__chair:nth-child(6):not(.buying-scheme__chair_taken)');
  await page.click('.buying-scheme__row:nth-child(10) .buying-scheme__chair:nth-child(7):not(.buying-scheme__chair_taken)');
  await page.click('.buying-scheme__row:nth-child(10) .buying-scheme__chair:nth-child(8):not(.buying-scheme__chair_taken)');

  // Скриншот выбранных мест
  await page.screenshot({ path: 'selected-seats-before.png' });

  // Кликаем кнопку бронирования
  await page.click('.acceptin-button');

  // Ждем подтверждения бронирования
  await page.waitForSelector('.ticket__check-title', { timeout: 10000 });
  
  // Скриншот после бронирования
  await page.screenshot({ path: 'selected-seats-after.png' });

  // Проверяем сообщение о бронировании
  const actual = await page.$eval('.ticket__check-title', el => el.textContent.trim());
  expect(actual).toContain("Вы выбрали билеты:");
}, 70000);

test("Sad Path: Buying an occupied seat", async () => {
  // 1. Бронируем место
  await selectDay(page);
  await selectMovie(page);
  await selectHall(page);
  
  const seatSelector = '.buying-scheme__chair_standart:not(.buying-scheme__chair_taken)';
  await page.waitForSelector(seatSelector, {timeout: 10000});
  await page.click(seatSelector);
  await page.click('.acceptin-button');
  
  await page.waitForSelector('.ticket__check-title', {timeout: 10000});
  
  // 2. Возвращаемся и проверяем
  await page.goto('https://qamid.tmweb.ru/client/index.php');
  await selectDay(page);
  await selectMovie(page);
  await selectHall(page);
  
  // 3. Проверяем занятость места
  const occupiedSeat = await page.$(`${seatSelector}.buying-scheme__chair_taken`);
  expect(occupiedSeat).not.toBeNull();
}, 30000);
});

