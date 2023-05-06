"use strict";

// Variables
let validSubmit = true;

let countingDays;
let countingMonths;
let countingYears;

let currentMonth = 0;
let currentDay = 0;
let currentYear = 0;

let inputedMonth = 0;
let inputedDay = 0;
let inputedYear = 0;

let yearCalc = 0;
let monthCalc = 0;
let dayCalc = 0;

let yearCounter = 0;
let dayCounter = 0;
let monthCounter = 0;

// Elements
const dayControlEl = document.querySelector(".day-control");
const monthControlEl = document.querySelector(".month-control");
const yearControlEl = document.querySelector(".year-control");

const dayRequiredMsg = document.querySelector(".day-required");
const dayInvalidMsg = document.querySelector(".day-invalid");
const dateInvalidMsg = document.querySelector(".date-invalid");
const monthRequiredMsg = document.querySelector(".month-required");
const monthInvalidMsg = document.querySelector(".month-invalid");
const yearRequiredMsg = document.querySelector(".year-required");
const yearInvalidMsg = document.querySelector(".year-invalid");
const futureDateMsg = document.querySelector(".future-date");
const pastDateMsg = document.querySelector(".past-date");

const dayIn = document.getElementById("day");
const monthIn = document.getElementById("month");
const yearIn = document.getElementById("year");

const submitBtn = document.querySelector(".submit-button");

const dayOut = document.getElementById("day-number-display");
const monthOut = document.getElementById("month-number-display");
const yearOut = document.getElementById("year-number-display");

const dayWord = document.getElementById("day-word-display");
const monthWord = document.getElementById("month-word-display");
const yearWord = document.getElementById("year-word-display");

// Event-listeners
submitBtn.addEventListener("click", submitDate);

// Functions
// submit date
function submitDate() {
  // reset variables
  resetVariables();

  // reset display
  stopCounters();
  yearOut.innerText = "--";
  monthOut.innerText = "--";
  dayOut.innerText = "--";
  yearWord.innerText = " years";
  monthWord.innerText = " months";
  dayWord.innerText = " days";

  // get current date
  const dateObj = new Date();
  currentMonth = dateObj.getMonth() + 1; //months from 1-12
  currentDay = dateObj.getDate();
  currentYear = dateObj.getFullYear();

  // get inputed date
  inputedDay = Number(dayIn.value);
  inputedMonth = Number(monthIn.value);
  inputedYear = Number(yearIn.value);

  // clear errors
  clearErrors();

  // check input values
  checkInput();

  // stop if there is an error
  if (!validSubmit) {
    return;
  }

  // Calculate age
  calculateAge();

  // Display numbers
  displayNumbers();

  // Display words
  displayWords();
}

// reset variables
function resetVariables() {
  validSubmit = true;

  currentMonth = 0;
  currentDay = 0;
  currentYear = 0;

  inputedMonth = 0;
  inputedDay = 0;
  inputedYear = 0;

  yearCalc = 0;
  monthCalc = 0;
  dayCalc = 0;

  yearCounter = 0;
  dayCounter = 0;
  monthCounter = 0;
}

// calculate age
function calculateAge() {
  yearCalc = currentYear - inputedYear;
  monthCalc = currentMonth - inputedMonth;
  dayCalc = currentDay - inputedDay;

  // if inputed month is greater than current month
  if (currentMonth < inputedMonth) {
    // take from year and add to month
    yearCalc--;
    monthCalc += 12;
  }

  // if inputed day is greater than current day
  if (currentDay < inputedDay) {
    // if there is nothing to take from month
    if (monthCalc === 0) {
      // take from year and add to month
      yearCalc--;
      monthCalc += 12;
    }
    // take from month and add to days
    monthCalc--;
    switch (currentMonth) {
      case 1:
      case 2:
      case 4:
      case 6:
      case 8:
      case 9:
      case 11:
        // previous month has 31 days
        dayCalc += 31;
        break;
      case 3:
        // previous month has 28 days
        dayCalc += 28;
        break;
      case 5:
      case 7:
      case 10:
      case 12:
        // previous month has 30 days
        dayCalc += 30;
        break;
    }
  }
}

// check input validity
function checkInput() {
  // empty inputs
  if (dayIn.value === "") {
    // empty day
    validSubmit = false;
    dayControlEl.classList.add("error");
    dayRequiredMsg.classList.remove("hidden");
  }
  if (monthIn.value === "") {
    // empty month
    validSubmit = false;
    monthControlEl.classList.add("error");
    monthRequiredMsg.classList.remove("hidden");
  }
  if (yearIn.value === "") {
    // empty year
    validSubmit = false;
    yearControlEl.classList.add("error");
    yearRequiredMsg.classList.remove("hidden");
  }

  if (!validSubmit) {
    return;
  }
  // continue if none are empty

  // invalid inputs
  if (isNaN(inputedYear) || inputedYear % 1 !== 0) {
    // invalid year
    validSubmit = false;
    yearControlEl.classList.add("error");
    yearInvalidMsg.classList.remove("hidden");
  } else if (inputedYear > currentYear) {
    // year not in the past
    validSubmit = false;
    yearControlEl.classList.add("error");
    futureDateMsg.classList.remove("hidden");
  } else if (inputedYear < 0) {
    // year less than 0
    validSubmit = false;
    yearControlEl.classList.add("error");
    pastDateMsg.classList.remove("hidden");
  }
  if (
    isNaN(inputedMonth) ||
    inputedMonth > 12 ||
    inputedMonth < 1 ||
    inputedMonth % 1 !== 0
  ) {
    // invalid month
    validSubmit = false;
    monthControlEl.classList.add("error");
    monthInvalidMsg.classList.remove("hidden");
  }
  if (
    isNaN(inputedDay) ||
    inputedDay > 31 ||
    inputedDay < 1 ||
    inputedDay % 1 !== 0
  ) {
    // invalid day
    validSubmit = false;
    dayControlEl.classList.add("error");
    dayInvalidMsg.classList.remove("hidden");
  }

  if (!validSubmit) {
    return;
  }
  // continue if year, month and day is valid and within general limits

  // check if date is valid
  if (inputedDay < 1) {
    // invaild date
    validSubmit = false;
    invalidDate();
  }
  switch (inputedMonth) {
    case 1:
    case 3:
    case 5:
    case 7:
    case 8:
    case 10:
    case 12:
      if (inputedDay > 31) {
        // invalid date
        validSubmit = false;
        invalidDate();
      }
      break;
    case 2:
      if (inputedDay > 28) {
        // invalid date
        validSubmit = false;
        invalidDate();
      }
    case 4:
    case 6:
    case 9:
    case 11:
      if (inputedDay > 31) {
        // invalid date
        validSubmit = false;
        invalidDate();
      }
      break;
  }
  // same year but past date
  if (inputedYear === currentYear) {
    if (inputedMonth > currentMonth) {
      // past date
      validSubmit = false;
      dayControlEl.classList.add("error");
      monthControlEl.classList.add("error");
      yearControlEl.classList.add("error");
      futureDateMsg.classList.remove("hidden");
    } else {
      if (inputedMonth === currentMonth) {
        if (inputedDay > currentDay) {
          // past date
          validSubmit = false;
          dayControlEl.classList.add("error");
          monthControlEl.classList.add("error");
          yearControlEl.classList.add("error");
          futureDateMsg.classList.remove("hidden");
        }
      }
    }
  }
}

// clear all errors
function clearErrors() {
  document
    .querySelectorAll(".error-message")
    .forEach((item) => item.classList.add("hidden"));
  dayControlEl.classList.remove("error");
  monthControlEl.classList.remove("error");
  yearControlEl.classList.remove("error");
}

// invalid date error
function invalidDate() {
  dayControlEl.classList.add("error");
  monthControlEl.classList.add("error");
  yearControlEl.classList.add("error");
  dateInvalidMsg.classList.remove("hidden");
}

// display numbers
function displayNumbers() {
  // display years
  countingYears = setInterval(updateYears, 20);

  // display months
  countingMonths = setInterval(updateMonths, 20);

  // display days
  countingDays = setInterval(updateDays, 20);
}

// display words
function displayWords() {
  yearWord.innerText = yearCalc === 1 ? " year" : " years";
  monthWord.innerText = monthCalc === 1 ? " month" : " months";
  dayWord.innerText = dayCalc === 1 ? " day" : " days";
}

// stop counters
function stopCounters() {
  clearInterval(countingDays);
  clearInterval(countingMonths);
  clearInterval(countingYears);
  countingDays = null;
  countingMonths = null;
  countingYears = null;
}

// month counter
function updateMonths() {
  if (monthCounter === monthCalc) {
    clearInterval(countingMonths);
  }
  monthOut.innerText = monthCounter++;
}

// year counter
function updateYears() {
  if (yearCounter === yearCalc) {
    clearInterval(countingYears);
  }
  yearOut.innerText = yearCounter++;
}

// day counter
function updateDays() {
  if (dayCounter === dayCalc) {
    clearInterval(countingDays);
  }
  dayOut.innerText = dayCounter++;
}

// toggler
function toggleState(item) {
  item.classList.toggle("on");
  document.body.classList.toggle("dark");
}
