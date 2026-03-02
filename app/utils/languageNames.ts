/** Map ISO 639-1 language codes to human-readable names */
const languageNames: Record<string, string> = {
    el: 'Greek',
    en: 'English',
    es: 'Spanish',
    fr: 'French',
    it: 'Italian',
    pt: 'Portuguese',
    ru: 'Russian',
};

/** Get human-readable name for a language code, with fallback to the code itself */
export function getLanguageName(code: string): string {
    return languageNames[code.toLowerCase()] ?? code.toUpperCase();
}
