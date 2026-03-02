'use client';

import React, { useState, useEffect, useMemo, createContext, useContext } from 'react';
import createCache from '@emotion/cache';
import { useServerInsertedHTML } from 'next/navigation';
import { CacheProvider } from '@emotion/react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

type ThemeMode = 'light' | 'dark';

interface ThemeModeContextType {
    mode: ThemeMode;
    toggleMode: () => void;
}

const ThemeModeContext = createContext<ThemeModeContextType>({
    mode: 'light',
    toggleMode: () => { },
});

export function useThemeMode() {
    return useContext(ThemeModeContext);
}

function getDesignTokens(mode: ThemeMode) {
    return createTheme({
        palette: {
            mode,
            primary: {
                main: mode === 'light' ? '#00796B' : '#4DB6AC', // Teal
            },
            secondary: {
                main: mode === 'light' ? '#F57F17' : '#FFD54F', // Amber
            },
            background: {
                default: mode === 'light' ? '#FAFAFA' : '#121212',
                paper: mode === 'light' ? '#FFFFFF' : '#1E1E1E',
            },
        },
        typography: {
            fontFamily: 'var(--font-inter), "Inter", "Roboto", "Helvetica", "Arial", sans-serif',
            h4: { fontWeight: 700 },
            h6: { fontWeight: 600 },
        },
        shape: {
            borderRadius: 10,
        },
        components: {
            MuiButton: {
                styleOverrides: {
                    root: {
                        textTransform: 'none',
                        borderRadius: 8,
                    },
                },
            },
            MuiChip: {
                styleOverrides: {
                    root: {
                        borderRadius: 6,
                    },
                },
            },
            MuiPopover: {
                styleOverrides: {
                    paper: {
                        borderRadius: 12,
                        boxShadow: mode === 'light'
                            ? '0 8px 32px rgba(0,0,0,0.12)'
                            : '0 8px 32px rgba(0,0,0,0.4)',
                    },
                },
            },
        },
    });
}

export default function ThemeRegistry({ children }: { children: React.ReactNode }) {
    const [mode, setMode] = useState<ThemeMode>('light');
    const [mounted, setMounted] = useState(false);

    // Hydrate from localStorage
    useEffect(() => {
        const stored = localStorage.getItem('theme-mode');
        if (stored === 'dark' || stored === 'light') {
            setMode(stored);
        }
        setMounted(true);
    }, []);

    const toggleMode = () => {
        setMode((prev) => {
            const next = prev === 'light' ? 'dark' : 'light';
            localStorage.setItem('theme-mode', next);
            return next;
        });
    };

    const theme = useMemo(() => getDesignTokens(mode), [mode]);

    const [{ cache, flush }] = useState(() => {
        const cache = createCache({ key: 'mui' });
        cache.compat = true;
        const prevInsert = cache.insert;
        let inserted: string[] = [];
        cache.insert = (...args) => {
            const serialized = args[1];
            if (cache.inserted[serialized.name] === undefined) {
                inserted.push(serialized.name);
            }
            return prevInsert(...args);
        };
        const flush = () => {
            const prevInserted = inserted;
            inserted = [];
            return prevInserted;
        };
        return { cache, flush };
    });

    useServerInsertedHTML(() => {
        const names = flush();
        if (names.length === 0) {
            return null;
        }
        let styles = '';
        for (const name of names) {
            styles += cache.inserted[name];
        }
        return (
            <style
                key={cache.key}
                data-emotion={`${cache.key} ${names.join(' ')}`}
                dangerouslySetInnerHTML={{
                    __html: styles,
                }}
            />
        );
    });

    // Prevent flash of wrong theme
    if (!mounted) {
        return null;
    }

    return (
        <CacheProvider value={cache}>
            <ThemeModeContext.Provider value={{ mode, toggleMode }}>
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    {children}
                </ThemeProvider>
            </ThemeModeContext.Provider>
        </CacheProvider>
    );
}
