import en from "./en";
import th from "./th";

interface ILanguage {
    language: "en" | "th";
}
const Languages = {
    en,
    th,
};

const currentLang: ILanguage["language"] = (document.documentElement.lang as ILanguage["language"]) ?? "en";
const Messages = Languages[currentLang];
console.log({ Messages });
console.log({ currentLang });

export default Messages;
