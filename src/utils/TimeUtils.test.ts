import dayjs from "dayjs";
import TimeUtils from "./TimeUtils";

// Use locally-constructed dates so tests are timezone-independent
const LOCAL_DATE = new Date(2024, 2, 15, 14, 30, 0); // March 15 2024 14:30 local
const MILI = LOCAL_DATE.getTime();

describe("TimeUtils.convertMiliToDateTime", () => {
    it("formats milliseconds as DD/MM/YYYY HH:mm", () => {
        expect(TimeUtils.convertMiliToDateTime(MILI)).toBe("15/03/2024 14:30");
    });

    it("includes hours and minutes in output", () => {
        const ts = new Date(2024, 0, 5, 9, 5, 0).getTime();
        expect(TimeUtils.convertMiliToDateTime(ts)).toBe("05/01/2024 09:05");
    });
});

describe("TimeUtils.convertMiliToDate", () => {
    it("formats milliseconds as DD/MM/YYYY", () => {
        expect(TimeUtils.convertMiliToDate(MILI)).toBe("15/03/2024");
    });

    it("pads single-digit day and month", () => {
        const ts = new Date(2024, 0, 5).getTime();
        expect(TimeUtils.convertMiliToDate(ts)).toBe("05/01/2024");
    });
});

describe("TimeUtils.convertMiliToTime", () => {
    it("formats milliseconds as HH:mm", () => {
        expect(TimeUtils.convertMiliToTime(MILI)).toBe("14:30");
    });
});

describe("TimeUtils.convertMiliToDateWithFormat", () => {
    it("formats with custom format string", () => {
        expect(TimeUtils.convertMiliToDateWithFormat(MILI, "YYYY-MM-DD")).toBe("2024-03-15");
    });
});

describe("TimeUtils.convertDateTimeToMili", () => {
    it("parses a date string back to milliseconds", () => {
        const date = new Date(2024, 2, 15, 14, 30, 0);
        const mili = TimeUtils.convertDateTimeToMili(date);
        expect(mili).toBe(date.getTime());
    });
});

describe("TimeUtils.convertMiliToMinutes", () => {
    it("converts milliseconds to minutes", () => {
        expect(TimeUtils.convertMiliToMinutes(60000)).toBe(1);
        expect(TimeUtils.convertMiliToMinutes(0)).toBe(0);
    });
});

describe("TimeUtils.convertMinutesToMili", () => {
    it("converts minutes to milliseconds", () => {
        expect(TimeUtils.convertMinutesToMili(1)).toBe(60000);
    });

    it("returns undefined for falsy input", () => {
        expect(TimeUtils.convertMinutesToMili(0)).toBeUndefined();
    });
});

describe("TimeUtils.calculateDayDifferent", () => {
    it("calculates absolute day difference between two dates", () => {
        const d1 = new Date(2024, 0, 10).getTime();
        const d2 = new Date(2024, 0, 15).getTime();
        expect(TimeUtils.calculateDayDifferent(d1, d2)).toBe(5);
    });

    it("returns 0 for same date", () => {
        const d = new Date(2024, 0, 10).getTime();
        expect(TimeUtils.calculateDayDifferent(d, d)).toBe(0);
    });
});

describe("TimeUtils.calculateWeekDifferent", () => {
    it("calculates week difference", () => {
        const d1 = new Date(2024, 0, 1).getTime();
        const d2 = new Date(2024, 0, 15).getTime();
        expect(TimeUtils.calculateWeekDifferent(d1, d2)).toBe(2);
    });
});

describe("TimeUtils.calculateMonthDifferent", () => {
    it("calculates month difference", () => {
        const d1 = new Date(2024, 3, 1).getTime();
        const d2 = new Date(2024, 0, 1).getTime();
        expect(TimeUtils.calculateMonthDifferent(d1, d2)).toBe(3);
    });

    it("returns 0 when dates are in the same month", () => {
        const d1 = new Date(2024, 0, 10).getTime();
        const d2 = new Date(2024, 0, 20).getTime();
        expect(TimeUtils.calculateMonthDifferent(d1, d2)).toBe(0);
    });
});

describe("TimeUtils.calculateTimeDifferent", () => {
    it("calculates difference in days using dayjs", () => {
        const d1 = dayjs("2024-01-01");
        const d2 = dayjs("2024-01-11");
        expect(TimeUtils.calculateTimeDifferent(d1, d2, "day")).toBe(10);
    });

    it("calculates difference in hours", () => {
        const d1 = dayjs("2024-01-01T00:00");
        const d2 = dayjs("2024-01-01T03:00");
        expect(TimeUtils.calculateTimeDifferent(d1, d2, "hour")).toBe(3);
    });
});

describe("TimeUtils.getFirstDayOf", () => {
    it("returns first day of month formatted", () => {
        const result = TimeUtils.getFirstDayOf(new Date(2024, 2, 15), "month", TimeUtils.DATE_FORMAT as any);
        expect(result).toBe("01/03/2024");
    });
});

describe("TimeUtils.getLastDayOf", () => {
    it("returns last day of month formatted", () => {
        const result = TimeUtils.getLastDayOf(new Date(2024, 2, 15), "month", TimeUtils.DATE_FORMAT as any);
        expect(result).toBe("31/03/2024");
    });
});

describe("TimeUtils.checkTimeIsBetweenRangeDate", () => {
    it("returns true when date is between range", () => {
        const start = dayjs("2024-01-01");
        const end = dayjs("2024-01-31");
        expect(TimeUtils.checkTimeIsBetweenRangeDate("2024-01-15", start, end)).toBe(true);
    });

    it("returns true when date equals start", () => {
        const start = dayjs("2024-01-01");
        const end = dayjs("2024-01-31");
        expect(TimeUtils.checkTimeIsBetweenRangeDate("2024-01-01", start, end)).toBe(true);
    });

    it("returns false when date is outside range", () => {
        const start = dayjs("2024-01-01");
        const end = dayjs("2024-01-31");
        expect(TimeUtils.checkTimeIsBetweenRangeDate("2024-02-01", start, end)).toBe(false);
    });
});

describe("TimeUtils.convertRangeDateToArray", () => {
    it("returns array of dates between two dates inclusive", () => {
        const result = TimeUtils.convertRangeDateToArray("2024-01-01", "2024-01-03");
        expect(result).toHaveLength(3);
    });
});

describe("TimeUtils.format", () => {
    it("formats timestamp with custom format", () => {
        expect(TimeUtils.format(MILI, "YYYY")).toBe("2024");
    });
});

describe("TimeUtils.toDate / toDateTime / toTime", () => {
    it("toDate formats as DD/MM/YYYY", () => {
        expect(TimeUtils.toDate(MILI)).toBe("15/03/2024");
    });

    it("toDateTime formats as DD/MM/YYYY HH:mm", () => {
        expect(TimeUtils.toDateTime(MILI)).toBe("15/03/2024 14:30");
    });

    it("toTime formats as HH:mm", () => {
        expect(TimeUtils.toTime(MILI)).toBe("14:30");
    });
});

describe("TimeUtils.getDateFarFrom", () => {
    it("returns a date n days from today when no dateParam given", () => {
        const result = TimeUtils.getDateFarFrom(0);
        const today = new Date();
        expect(result.getDate()).toBe(today.getDate());
    });

    it("returns a date n days from given date", () => {
        const base = new Date(2024, 0, 10);
        const result = TimeUtils.getDateFarFrom(5, base);
        expect(result.getDate()).toBe(15);
    });
});

describe("TimeUtils.tomorrow / yesterday", () => {
    it("tomorrow returns a date 1 day ahead", () => {
        const base = new Date(2024, 0, 10);
        expect(TimeUtils.tomorrow(base).getDate()).toBe(11);
    });

    it("yesterday returns a date 1 day behind", () => {
        const base = new Date(2024, 0, 10);
        expect(TimeUtils.yesterday(base).getDate()).toBe(9);
    });
});
