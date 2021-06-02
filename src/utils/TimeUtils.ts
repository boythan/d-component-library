// eslint-disable-next-line import/no-extraneous-dependencies
import moment from "moment";

const DATE_TIME_FORMAT = "DD/MM/YYYY HH:mm";
const TIME_FORMAT = "HH:mm";
const DATE_FORMAT = "DD/MM/YYYY";
// react-datepicker format
const DATE_TIME_INPUT_FORMAT = "dd/MM/yyyy HH:mm";
const DATE_INPUT_FORMAT = "dd/MM/yyyy";
const MONTH_INPUT_FORMAT = "mm/yyyy";
const YEAR_INPUT_FORMAT = "yyyy";
// ant design date picker format
const ANT_DATE_TIME_INPUT_FORMAT = "DD/MM/YYYY HH:mm";
const ANT_DATE_INPUT_FORMAT = "DD/MM/YYYY";
const ANT_MONTH_INPUT_FORMAT = "MM/YYYY";
const ANT_YEAR_INPUT_FORMAT = "YYYY";

const MONTH_MILISECOND = 30 * 24 * 60 * 60 * 1000;
const WEEK_MILISECOND = 7 * 24 * 60 * 60 * 1000;
const DAY_MILISECOND = 24 * 60 * 60 * 1000;

const convertMilitoMinutes = (miliSeconds: number) => {
    if (!miliSeconds) return 0;
    return miliSeconds / (1000 * 60);
};

const convertMinutesToMili = (minutes: number) => {
    if (!minutes) return;

    // eslint-disable-next-line consistent-return
    return minutes * 60 * 1000;
};
const convertMiliToDateTime = (timeInMillis: number, lang: string = "en") => {
    const date = new Date(timeInMillis);
    if (lang === "th") {
        return date ? moment(date).add("years", 543).format(DATE_TIME_FORMAT) : "";
    }
    return date ? moment(date).format(DATE_TIME_FORMAT) : "";
};

const convertDateTimeToMili = (dateTime: string) => {
    const date = new Date(dateTime);
    return date.getTime();
};

const convertMiliToDate = (timeInMillis: number, lang: string = "en") => {
    const date = new Date(timeInMillis);
    if (lang === "th") {
        return date ? moment(date).add("years", 543).format(DATE_FORMAT) : "";
    }
    return date ? moment(date).format(DATE_FORMAT) : "";
};

const convertMiliToTime = (timeInMillis: number) => {
    const date = new Date(timeInMillis);

    return date ? moment(date).format(TIME_FORMAT) : "";
};

const convertMiliToDateWithFormat = (timeInMillis: number, FORMAT: string) => {
    const date = new Date(timeInMillis);
    return date ? moment(date).format(FORMAT) : "";
};

const convertToDefaultInputFormat = (timeMili: number) => {
    return convertMiliToDateWithFormat(timeMili, "YYYY-MM-DDTHH:mm");
};

function calculateMonthDifferent(d1: number, d2: number) {
    const date1 = new Date(d1);
    const date2 = new Date(d2);
    let months;
    months = (date1.getFullYear() - date2.getFullYear()) * 12;
    months += date1.getMonth();
    months -= date2.getMonth();
    return months <= 0 ? 0 : months;
}

function calculateWeekDifferent(d1: number, d2: number) {
    let diff = (d1 - d2) / 1000;
    diff /= 60 * 60 * 24 * 7;
    return Math.abs(Math.round(diff));
}

function calculateDayDifferent(d1: number, d2: number) {
    let diff = (d1 - d2) / 1000;
    diff /= 60 * 60 * 24;
    return Math.abs(Math.round(diff));
}

export default {
    convertToDefaultInputFormat,
    convertMiliToDateWithFormat,
    convertMiliToTime,
    convertMiliToDate,
    convertMilitoMinutes,
    convertMinutesToMili,
    convertMiliToDateTime,
    convertDateTimeToMili,
    calculateMonthDifferent,
    calculateWeekDifferent,
    calculateDayDifferent,
    MONTH_MILISECOND,
    WEEK_MILISECOND,
    DAY_MILISECOND,

    DATE_FORMAT,
    DATE_TIME_FORMAT,
    DATE_INPUT_FORMAT,
    DATE_TIME_INPUT_FORMAT,
    MONTH_INPUT_FORMAT,
    YEAR_INPUT_FORMAT,
    ANT_DATE_TIME_INPUT_FORMAT,
    ANT_DATE_INPUT_FORMAT,
    ANT_MONTH_INPUT_FORMAT,
    ANT_YEAR_INPUT_FORMAT,
};
