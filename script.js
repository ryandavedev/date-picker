import {
    format,
    addMonths,
    subMonths,
    startOfMonth,
    startOfWeek,
    endOfMonth,
    endOfWeek,
    eachDayOfInterval,
    isSameMonth,
    isSameDay,
} from "date-fns";

const datePickerButton = document.querySelector(".date-picker-button");
const dateContainer = document.querySelector(".date-picker");
const dateMonthHeader = document.querySelector(".current-month");
const prevMonthButton = document.querySelector(".prev-month-button ");
const nextMonthButton = document.querySelector(".next-month-button");
const dateDaysGrid = document.querySelector(".date-picker-grid-dates");

let currentDate = new Date();

datePickerButton.addEventListener("click", () => {
    dateContainer.classList.toggle("show");

    dateMonthHeader.innerText = format(currentDate, "MMMM - yyyy");
    setupDates(currentDate);
});

function setupDates(selectedDate) {
    dateDaysGrid.innerHTML = "";

    const firstWeekStart = startOfWeek(startOfMonth(currentDate));
    const lastWeekEnd = endOfWeek(endOfMonth(currentDate));

    const dates = eachDayOfInterval({
        start: firstWeekStart,
        end: lastWeekEnd,
    });

    dates.forEach(day => {
        const dayContainer = document.createElement("button");

        dayContainer.classList.add("date");
        dateDaysGrid.append(dayContainer);
        dayContainer.innerText = day.getDate();

        if (!isSameMonth(day, currentDate)) {
            dayContainer.classList.add("date-picker-other-month-date");
        }

        if (isSameDay(day, selectedDate)) {
            dayContainer.classList.add("selected");
        }

        dayContainer.addEventListener("click", () => {
            dateContainer.classList.remove("show");
            datePickerButton.innerText = format(day, "MMMM do, yyyy");
            currentDate = day;
        });
    });
}

prevMonthButton.addEventListener("click", () => {
    currentDate = subMonths(currentDate, 1);
    dateMonthHeader.innerText = format(currentDate, "MMMM - yyyy");
    setupDates();
});

nextMonthButton.addEventListener("click", () => {
    currentDate = addMonths(currentDate, 1);
    dateMonthHeader.innerText = format(currentDate, "MMMM - yyyy");
    setupDates();
});

function setDate() {
    datePickerButton.innerText = format(currentDate, "MMMM do, yyyy");
}

setDate();
