// src/context/LocalizationContext.tsx
import React, { createContext, useContext, useState, ReactNode, useMemo } from 'react';
import * as RNLocalize from 'react-native-localize';

import en from '../language/en.json';
import ro from '../language/ro.json';

type Translations = typeof en;
type Locale = 'en' | 'ro';

interface LocalizationContextProps {
    locale: Locale;
    setLocale: (l: Locale) => void;
    t: (key: string, params?: Record<string, string | number>) => string;
    td: <R extends Record<string, any>>(record: R, baseKey: string) => string;
}

const contexts: Record<Locale, Translations> = { en, ro };

const LocalizationContext = createContext<LocalizationContextProps>({
    locale: 'en',
    setLocale: () => { },
    t: k => k,
    td: (r, k) => String(r[k]),    // default stub
});

export const LocalizationProvider = ({ children }: { children: ReactNode }) => {
    const best = (RNLocalize.getLocales()[0]?.languageCode as Locale) || 'en';
    const [locale, setLocale] = useState<Locale>(best);

    const t = useMemo(() => {
        return (key: string, params?: Record<string, string | number>) => {
            const raw = key
                .split('.')
                .reduce((o: any, k) => o?.[k], contexts[locale]) as string
                || key;
            if (!params) return raw;
            return Object.entries(params).reduce(
                (str, [k, v]) => str.replace(new RegExp(`{{${k}}}`, 'g'), String(v)),
                raw
            );
        };
    }, [locale]);

    const td = useMemo(() => {
        return <R extends Record<string, any>>(rec: R, baseKey: string) => {
            // try record[`${baseKey}_${locale}`], then fallback to English, then fallback to any `baseKey`
            const dual = `${baseKey}_${locale}`;
            const fallback = `${baseKey}_en`;
            return String(rec[dual] ?? rec[fallback] ?? rec[baseKey] ?? '');
        };
    }, [locale]);

    return (
        <LocalizationContext.Provider value={{ locale, setLocale, t, td }}>
            {children}
        </LocalizationContext.Provider>
    );
};

export const useLocalization = () => useContext(LocalizationContext);
