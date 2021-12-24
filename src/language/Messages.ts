import en from "./en";
import th from "./th";

interface ILanguage {
    language: "en" | "th";
}
const Languages = {
    en,
    th,
};

const currentLang: ILanguage["language"] =
    (typeof document !== "undefined" ? (document.documentElement.lang as ILanguage["language"]) : "en") ?? "en";
const Messages = Languages[currentLang];

export default Messages;
