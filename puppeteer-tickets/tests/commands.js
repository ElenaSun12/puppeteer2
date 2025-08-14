module.exports = {
  clickElement: async function (page, selector) {
    try {
      await page.waitForSelector(selector);
      await page.click(selector);
    } catch (error) {
      throw new Error(`Selector is not clickable: ${selector}`);
    }
  },

  getText: async function (page, selector) {
    try {
      await page.waitForSelector(selector);
      return await page.$eval(selector, (link) => link.textContent);
    } catch (error) {
      throw new Error(`Text is not available for selector: ${selector}`);
    }
  },

  putText: async function (page, selector, text) {
    try {
      const inputField = await page.$(selector);
      await inputField.focus();
      await inputField.type(text);
      await page.keyboard.press("Enter");
    } catch (error) {
      throw new Error(`Not possible to type text for selector: ${selector}`);
    }
  },

  selectDay: async function (page) {
    try {
      //await page.waitForSelector("a.page-nav__day.page-nav__day_today"); - два дня, пока делала дз - работал, на третий перестал
      await page.waitForSelector(".page-nav__day.page-nav__day_today.page-nav__day_chosen");
      //await page.click("a.page-nav__day.page-nav__day_today"); - два дня, пока делала дз - работал, на третий перестал
      await page.click (".page-nav__day.page-nav__day_today.page-nav__day_chosen");
    } catch (error) {
      throw new Error(`Cannot select today's date`);
    }
  },

  // Вариант 1 
  // selectMovie: async function (page) {
  //   try {
  //     await page.waitForXPath(
  //       "//h2[contains(., 'Ведьмак')]",
  //       { timeout: 10000 }
  //     );
  //     const movies = await page.$x("//h2[contains(., 'Ведьмак')]");
  //     if (movies.length === 0) {
  //       throw new Error("Фильм 'Ведьмак' не найден на странице");
  //     }
  //     await movies[0].click();
  //   } catch (error) {
  //     throw new Error(`Cannot select the movie: ${error.message}`);
  //   }
  // },

  // Вариант 2
  selectMovie: async function (page) {
    try {
      const movie = await page.waitForSelector("body main section:nth-child(1)", { timeout: 5000 });
      if (!movie) throw new Error("Фильм не найден");
      await movie.click();
    } catch (error) {
      throw new Error(`Cannot select the movie: ${error.message}`);
    }
  },

  // selectMovie: async function (page) {
  //   try {
  //     const [movie] = await page.$x("//h2[contains(text(), 'Ведьмак')]");
  //     if (!movie) {
  //       // Если "Ведьмак" не найден, попробуем любой первый фильм
  //       console.warn("Фильм 'Ведьмак' не найден, выбираем первый доступный фильм.");
  //       const firstMovie = await page.waitForSelector("main section", { timeout: 5000 });
  //       if (!firstMovie) throw new Error("Ни один фильм не найден на странице");
  //       await firstMovie.click();
  //     } else {
  //       await movie.click();
  //     }
  //   } catch (error) {
  //     throw new Error(`Cannot select the movie: ${error.message}`);
  //   }
  // },

  selectHall: async function (page) {
    try {
      await page.waitForSelector(".movie-seances__time[href='#'][data-seance-id='223']");
      const halls = await page.$$(".movie-seances__time[href='#'][data-seance-id='223']");
      await halls[0].click();
    } catch (error) {
      throw new Error(`Cannot select the first hall`);
    }
  },

  // selectHall: async function (page) {
  //   try {
  //     // Используем более общий селектор для выбора первого доступного сеанса
  //     // Ищем первый сеанс, который не заблокирован (нет атрибута disabled)
  //     const hallSelector = ".movie-seances__time:not([disabled])";
  //     await page.waitForSelector(hallSelector, { timeout: 5000 });
  //     const halls = await page.$$(hallSelector);
  //     if (halls.length === 0) throw new Error("Нет доступных сеансов");
  //     await halls[0].click();
  //   } catch (error) {
  //     throw new Error(`Cannot select the hall: ${error.message}`);
  //   }
  // },

  selectSeat: async function (page, seatNumber) {
  try {
    await page.waitForSelector(
      ".buying-scheme__chair.buying-scheme__chair_standart:not(.buying-scheme__chair_taken)",
      { timeout: 10000 }
    );
    const seats = await page.$$(".buying-scheme__chair.buying-scheme__chair_standart");
    await seats[seatNumber - 1].click();
  } catch (error) {
    throw new Error(`Cannot select the seat: ${error.message}`);
  }
},

// selectSeat: async function (page, seatNumber) {
//     try {
//       // Ждем загрузки схемы мест
//       await page.waitForSelector('.buying-scheme__wrapper', { timeout: 10000 });

//       // Используем более простой и надежный селектор
//       const seatSelector = '.buying-scheme__chair_standart:not(.buying-scheme__chair_taken)';
//       await page.waitForSelector(seatSelector, { timeout: 10000 });
//       const seats = await page.$$(seatSelector);
      
//       if (seats.length === 0) throw new Error("Нет доступных мест");
//       if (seatNumber > seats.length || seatNumber < 1) throw new Error(`Неверный номер места: ${seatNumber}. Доступно мест: ${seats.length}`);
      
//       // seatNumber начинается с 1, индекс массива с 0
//       await seats[seatNumber - 1].click();
//     } catch (error) {
//       throw new Error(`Cannot select the seat: ${error.message}`);
//     }
//   },
};
// вариант 1 
//   openAcinemaHallAndAsession : async function (page) {
//   try {
//   await selectDay(page);
//   await selectMovie(page);
//   await selectHall(page);

//   // Ждем загрузки схемы мест
//   await page.waitForSelector('.buying-scheme__wrapper', { timeout: 10000 });

//   } catch (error) {
//     throw new Error(`Cannot select the : ${error.message}`);
//   }
// },
// };
//вариант 2 openAcinemaHallAndAsession
// openAcinemaHallAndAsession: async function(page) {
//   try {
//     await this.selectDay(page);  // Добавлено this.
//     await this.selectMovie(page); // Добавлено this.
//     await this.selectHall(page); // Добавлено this.
//     await page.waitForSelector('.buying-scheme__wrapper', { timeout: 10000 });
//   } catch (error) {
//     throw new Error(`Cannot open cinema hall and session: ${error.message}`);
//   }
// },
// };
//   вариант 2 selectSeat
  //selectSeat: async function (page) {
//   try {
//     await page.waitForSelector(
//       "div[class='buying-scheme__wrapper'] div:nth-child(1) span:nth-child(1)",
//       { timeout: 5000 }
//     );
    
//     // Выбираем первый доступный стандартный места, которое не занято
//     const selector = "div[class='buying-scheme__wrapper'] div:nth-child(1) span:nth-child(1)";
//     const [seat] = await page.$x(selector);
    
//     if (seat) {
//       await seat.click();
//       return true; // Можно вернуть true или информацию о выбранном месте
//     } else {
//       throw new Error('No available seats found');
//     }
//   } catch (error) {
//     throw new Error('Cannot select the seat');
//   }
// }
// вариант 1 selectSeat
//   selectSeat: async function (page, seatNumber = 31) {
//     try {
//       await page.waitForSelector(
//         "div[class='buying-scheme__wrapper'] div:nth-child(1) span:nth-child(1)",
//         { timeout: 5000 }
//       );
      
//       const selector = `div[class='buying-scheme__wrapper'] div:nth-child(1) span:nth-child(1)`;
//       const [seat] = await page.$x(selector);
      
//       if (seat) {
//         await seat.click();
//       } else {
//         throw new Error(`Seat ${seatNumber} not found`);
//       }
//     } catch (error) {
//       throw new Error(`Cannot select seat: ${'Cannot select the seat'}`);
//     }
//   }


// module.exports = {
//   clickElement: async function (page, selector) {
//     try {
//       await page.waitForSelector(selector);
//       await page.click(selector);
//     } catch (error) {
//       throw new Error(`Selector is not clickable: ${selector}`);
//     }
//   },

//   getText: async function (page, selector) {
//     try {
//       await page.waitForSelector(selector);
//       return await page.$eval(selector, (link) => link.textContent);
//     } catch (error) {
//       throw new Error(`Text is not available for selector: ${selector}`);
//     }
//   },

//   putText: async function (page, selector, text) {
//     try {
//       const inputField = await page.$(selector);
//       await inputField.focus();
//       await inputField.type(text);
//       await page.keyboard.press("Enter");
//     } catch (error) {
//       throw new Error(`Not possible to type text for selector: ${selector}`);
//     }
//   },

//   selectDay: async function (page) {
//     try {
//       await page.waitForSelector("a.page-nav__day.page-nav__day_today");
//       await page.click("a.page-nav__day.page-nav__day_today");
//     } catch (error) {
//       throw new Error(`Cannot select today's date`);
//     }
//   },

//   selectMovie: async function (page) {
//   try {
//     const [movie] = await page.$x("(//h2[contains(text(),'Ведьмак')])[1]");
//     if (!movie) throw new Error("Фильм не найден");
//     await movie.click();
//   } catch (error) {
//     throw new Error(`Cannot select the movie: ${error.message}`);
//   }
// },
// //вариант 2 selectMovie
//   // selectMovie: async function (page) {
//   //   try {
//   //     await page.waitForSelector("(//h2[contains(text(),'Ведьмак')])[1]");
//   //     const movies = await page.$$("(//h2[contains(text(),'Ведьмак')])[1]");
//   //     await movies[0].click();
//   //   } catch (error) {
//   //     throw new Error(`Cannot select the first movie`);
//   //   }
//   // },

//   selectHall: async function (page) {
//     try {
//       await page.waitForSelector(".movie-seances__time[href='#'][data-seance-id='223']");
//       const halls = await page.$$(".movie-seances__time[href='#'][data-seance-id='223']");
//       await halls[0].click();
//     } catch (error) {
//       throw new Error(`Cannot select the first hall`);
//     }
//   },

//   // selectSeat: async function (page, seatNumber = 31) {
//   //   try {
//   //     await page.waitForSelector(".buying-scheme__chair");
//   //     const seats = await page.$$(".buying-scheme__chair");
//   //     await seats[seatNumber - 31].click();
//   //   } catch (error) {
//   //     throw new Error(`Cannot select seat number ${seatNumber}`);
//   //   }
//   // },

//   selectSeat: async function (page, seatNumber = 31) {  // Жёстко задаём 31 место
//   try {
//     await page.waitForSelector(
//       "span.buying-scheme__chair.buying-scheme__chair_standart",
//       { timeout: 5000 }
//     );
    
//     const selector = `(//span[@class='buying-scheme__chair buying-scheme__chair_standart'])[${seatNumber}]`;
//     const [seat] = await page.$x(selector);
    
//     if (seat) {
//       await seat.click();
//     } else {
//       throw new Error(`Seat ${seatNumber} not found`);
//     }
//   } catch (error) {
//     throw new Error(`Cannot select seat: ${error.message}`);
//   }
//   module.exports = {
//   selectMovie,
//   selectHall,
//   selectSeat
// };
// },
// };