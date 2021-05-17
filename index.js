//Курс Node.js - Урок 2 ДЗ - задача 2.1
const argv = require("yargs")
  .help(false)
  .argv;

let myDate = new Date();
consoleArgsHandler();

function consoleArgsHandler(){
  // Маршрутизация по типу главного аргумента
  if (argv["_"] == "current") {
    currentDate(); //Вызов функции вывода параметров текущей даты
  } else if (argv["_"] == "add") {
    getNewDate("forward"); //Вызов функции вывода новой даты со сдвигом вперед
  } else if (argv["_"] == "sub") {
    getNewDate("back"); //Вызов функции вывода новой даты со сдвигом назад
  } else if (argv["h"] || argv["help"] || argv["info"]) {
    showUserManual(); //Вызов справки для пользователя по опциям командной строки
  } else {
  console.log("No working arguments detected - please type 'node index.js --help' to get started");
  }
}


//Функция вывода параметров текущей даты
function currentDate() {
  let flagCurrentAlone = true; //признак, что у аругмента current нет дочерних аргументов: -year, -month, -date
  //вывод текущего года
  if (argv["year"] || argv["y"]) {
    console.log("Current Year -", myDate.getFullYear());
    flagCurrentAlone = false;
  }
  //вывод текущего месяца
  if (argv["month"] || argv["m"]) {
    console.log("Current Month -", myDate.getMonth());
    flagCurrentAlone = false;
  }
  //вывод текущей даты (дня) внутри календарного месяца
  if (argv["date"] || argv["d"]) {
    console.log("Current Day -", myDate.getDate());
    flagCurrentAlone = false;
  }
  //при отсутствии дочерних аргментов (только current) выводим дату-время в формате ISO
  if (flagCurrentAlone) console.log("Current DateTime (ISO format) -", myDate.toISOString());
}


//Функция вывода новой даты со сдвигом
function getNewDate(direction) {
  console.log("Current date is - " + myDate.toLocaleString());
  
  //вывод новой даты со сдвигом по дням
  if (argv["d"]) console.log("New data is - " + moveDate(myDate, "day", argv["d"], direction).toLocaleString());
  if (argv["day"]) console.log("New data is - " +moveDate(myDate, "day", argv["day"], direction).toLocaleString());
  
  //вывод новой даты со сдвигом по месяцам
  if (argv["m"]) console.log("New data is - " + moveDate(myDate, "month", argv["m"], direction).toLocaleString());
  if (argv["month"]) console.log("New data is - " + moveDate(myDate, "month", argv["month"], direction).toLocaleString()); 
}


//Функция сдвига даты вперед или назад
function moveDate(myDate, periodType, periodValue, direction) {
  let dateCopy = new Date(myDate);

  if (direction == "back") periodValue = -periodValue;
  if (periodType == "day") dateCopy.setDate(dateCopy.getDate() + periodValue);
  if (periodType == "month") dateCopy.setMonth(dateCopy.getMonth() + periodValue);

  return dateCopy;  
}


//Функция вывода справки по аргументам командной строки
function showUserManual(){
  console.log("Usage: node index.js [arguments -options]");
  console.log("Arguments:");
  console.log("current                             show current DateTime in ISO format");
  console.log("current -y|--year                   show current year");
  console.log("current -m|--month                  show current month");
  console.log("current -d|--date                   show current date (number) inside the current month");
  console.log("");
  console.log("add -d|--day [number]               show new date [number] days forward");
  console.log("add -m|--month [number]             show new date [number] days forward");
  console.log("");
  console.log("sub -d|--day [number]               show new date [number] days back");
  console.log("sub -m|--month [number]             show new date [number] days back");
 
}