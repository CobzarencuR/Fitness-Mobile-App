import React, { createContext, useContext, useState, ReactNode, useMemo } from 'react';
import * as RNLocalize from 'react-native-localize';

import en from '../language/en.json';
import ro from '../language/ro.json';

type Translations = typeof en;
type Locale = 'en' | 'ro';

interface LocalizationContextProps {
    locale: Locale;
    setLocale: (l: Locale) => void;
    /** key supports dot-notation, params is an object of replacement values */
    t: (key: string, params?: Record<string, string | number>) => string;
}

const contexts: Record<Locale, Translations> = { en, ro };

const LocalizationContext = createContext<LocalizationContextProps>({
    locale: 'en',
    setLocale: () => { },
    t: (k) => k,
});

export const LocalizationProvider = ({ children }: { children: ReactNode }) => {
    // auto-detect device locale, fallback to 'en'
    const best = (RNLocalize.getLocales()[0]?.languageCode as Locale) || 'en';
    const [locale, setLocale] = useState<Locale>(best);

    const t = useMemo(() => {
        return (key: string, params?: Record<string, string | number>) => {
            // pull nested value out of contexts[locale]
            const raw = key
                .split('.')
                .reduce((obj: any, k) => obj?.[k], contexts[locale]) as string | undefined
                || key;

            if (!params) {
                return raw;
            }

            // simple {{var}} interpolation
            let str = raw;
            for (const [k, v] of Object.entries(params)) {
                str = str.replace(new RegExp(`{{${k}}}`, 'g'), String(v));
            }
            return str;
        };
    }, [locale]);

    return (
        <LocalizationContext.Provider value={{ locale, setLocale, t }}>
            {children}
        </LocalizationContext.Provider>
    );
};

export const useLocalization = () => useContext(LocalizationContext);
