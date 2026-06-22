import StringUtils from "./StringUtils";

describe("StringUtils.moneyFormat", () => {
    it("formats thousands with comma separator", () => {
        expect(StringUtils.moneyFormat(1000)).toBe("1,000");
    });

    it("returns '0' for falsy input", () => {
        expect(StringUtils.moneyFormat(0)).toBe("0");
    });

    it("formats millions", () => {
        expect(StringUtils.moneyFormat(1000000)).toBe("1,000,000");
    });
});

describe("StringUtils.moneyThaiFormat", () => {
    it("prepends ฿ symbol", () => {
        expect(StringUtils.moneyThaiFormat(1000)).toBe("฿1,000");
    });

    it("returns ฿0 for falsy input", () => {
        expect(StringUtils.moneyThaiFormat(0)).toBe("฿0");
    });

    it("handles negative numbers", () => {
        expect(StringUtils.moneyThaiFormat(-500)).toBe("-฿500");
    });
});

describe("StringUtils.isAllDigit", () => {
    it("returns true for digit-only string", () => {
        expect(StringUtils.isAllDigit("12345")).toBe(true);
    });

    it("returns false for alphanumeric string", () => {
        expect(StringUtils.isAllDigit("123abc")).toBe(false);
    });

    it("returns false for empty string", () => {
        expect(StringUtils.isAllDigit("")).toBe(false);
    });
});

describe("StringUtils.validateEmail", () => {
    it("validates a correct email address", () => {
        expect(StringUtils.validateEmail("user@example.com")).toBe(true);
    });

    it("rejects a string without @ symbol", () => {
        expect(StringUtils.validateEmail("notanemail")).toBe(false);
    });

    it("rejects a string without domain", () => {
        expect(StringUtils.validateEmail("user@")).toBe(false);
    });
});

describe("StringUtils.removeAllSpace", () => {
    it("removes all spaces from a string", () => {
        expect(StringUtils.removeAllSpace("hello world")).toBe("helloworld");
    });

    it("returns empty string for empty input", () => {
        expect(StringUtils.removeAllSpace("")).toBe("");
    });

    it("removes multiple spaces", () => {
        expect(StringUtils.removeAllSpace("a b c")).toBe("abc");
    });
});

describe("StringUtils.validURL", () => {
    it("validates https URL", () => {
        expect(StringUtils.validURL("https://example.com")).toBe(true);
    });

    it("validates http URL", () => {
        expect(StringUtils.validURL("http://example.com/path")).toBe(true);
    });

    it("rejects plain text", () => {
        expect(StringUtils.validURL("not a url")).toBe(false);
    });
});

describe("StringUtils.convertToNumber", () => {
    it("strips non-digit characters and parses to integer", () => {
        expect(StringUtils.convertToNumber("$1,234")).toBe(1234);
    });

    it("returns empty string when no digits found", () => {
        expect(StringUtils.convertToNumber("abc")).toBe("");
    });

    it("handles plain number string", () => {
        expect(StringUtils.convertToNumber("42")).toBe(42);
    });
});

describe("StringUtils.getExtensionFromFilename", () => {
    it("extracts extension from filename", () => {
        expect(StringUtils.getExtensionFromFilename("photo.jpg")).toBe("jpg");
    });

    it("returns empty string for empty input", () => {
        expect(StringUtils.getExtensionFromFilename("")).toBe("");
    });

    it("handles filename with multiple dots", () => {
        expect(StringUtils.getExtensionFromFilename("archive.tar.gz")).toBe("gz");
    });
});

describe("StringUtils.removeHTMLTags", () => {
    it("strips HTML tags from string", () => {
        expect(StringUtils.removeHTMLTags("<b>Hello</b>")).toBe("Hello");
    });

    it("returns false for null input", () => {
        expect(StringUtils.removeHTMLTags(null)).toBe(false);
    });

    it("returns false for empty string", () => {
        expect(StringUtils.removeHTMLTags("")).toBe(false);
    });

    it("handles nested tags", () => {
        expect(StringUtils.removeHTMLTags("<div><p>Text</p></div>")).toBe("Text");
    });
});

describe("StringUtils.getFullNameStore", () => {
    it("returns 'N/A' for null store", () => {
        expect(StringUtils.getFullNameStore(null)).toBe("N/A");
    });

    it("combines store name and code", () => {
        expect(StringUtils.getFullNameStore({ name: "Store A", code: "001" })).toBe("Store A - 001");
    });
});

describe("StringUtils.moneyThaiFormatFixed2", () => {
    it("formats number with 2 decimal places and baht symbol", () => {
        expect(StringUtils.moneyThaiFormatFixed2("1000")).toBe("฿1,000.00");
    });

    it("returns ฿0 for falsy input", () => {
        expect(StringUtils.moneyThaiFormatFixed2("")).toBe("฿0");
    });
});

describe("StringUtils.isEnglishAlphabet", () => {
    it("returns true for alphanumeric string", () => {
        expect(StringUtils.isEnglishAlphabet("abc123")).toBe(true);
    });

    it("returns false for Thai characters", () => {
        expect(StringUtils.isEnglishAlphabet("สวัสดี")).toBe(false);
    });
});

describe("StringUtils.removeAllEnterAndSpace", () => {
    it("removes all spaces from each line", () => {
        const result = StringUtils.removeAllEnterAndSpace("hello world\nfoo bar");
        expect(result).toBe("helloworld\nfoobar");
    });

    it("returns empty string for empty input", () => {
        expect(StringUtils.removeAllEnterAndSpace("")).toBe("");
    });
});

describe("StringUtils.stripHtml", () => {
    it("strips HTML tags and returns text content", () => {
        expect(StringUtils.stripHtml("<b>Hello</b> <i>World</i>")).toBe("Hello World");
    });

    it("returns empty string for empty input", () => {
        expect(StringUtils.stripHtml("")).toBe("");
    });
});

describe("StringUtils.getRandomNumber", () => {
    it("returns a number within the specified range", () => {
        const result = StringUtils.getRandomNumber(1, 10);
        expect(result).toBeGreaterThanOrEqual(1);
        expect(result).toBeLessThan(10);
    });
});

describe("StringUtils.generateCode", () => {
    it("returns a string of the given length", () => {
        const code = StringUtils.generateCode(8);
        expect(code).toHaveLength(8);
    });

    it("returns only alphanumeric characters", () => {
        const code = StringUtils.generateCode(20);
        expect(/^[A-Za-z0-9]+$/.test(code)).toBe(true);
    });
});

describe("StringUtils.convertToNumber", () => {
    it("handles empty string", () => {
        expect(StringUtils.convertToNumber("")).toBe("");
    });
});
