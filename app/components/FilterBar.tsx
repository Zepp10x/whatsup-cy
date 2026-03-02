'use client';

import { useMemo } from 'react';
import {
    Box,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Checkbox,
    ListItemText,
    Button,
    Chip,
    type SelectChangeEvent,
} from '@mui/material';
import type { CalendarEvent } from '../types/event';
import { getLanguageName } from '../utils/languageNames';

interface FilterBarProps {
    events: CalendarEvent[];
    selectedDistricts: string[];
    selectedLanguages: string[];
    onDistrictsChange: (districts: string[]) => void;
    onLanguagesChange: (languages: string[]) => void;
    onClear: () => void;
}

export default function FilterBar({
    events,
    selectedDistricts,
    selectedLanguages,
    onDistrictsChange,
    onLanguagesChange,
    onClear,
}: FilterBarProps) {
    // Extract unique options from event data
    const { districts, languages } = useMemo(() => {
        const districtSet = new Set<string>();
        const languageSet = new Set<string>();
        for (const event of events) {
            if (event.extendedProps?.district) districtSet.add(event.extendedProps.district);
            if (event.extendedProps?.language) languageSet.add(event.extendedProps.language);
        }
        return {
            districts: Array.from(districtSet).sort(),
            languages: Array.from(languageSet).sort(),
        };
    }, [events]);

    const hasActiveFilters = selectedDistricts.length > 0 || selectedLanguages.length > 0;

    const handleDistrictChange = (e: SelectChangeEvent<string[]>) => {
        const value = e.target.value;
        onDistrictsChange(typeof value === 'string' ? value.split(',') : value);
    };

    const handleLanguageChange = (e: SelectChangeEvent<string[]>) => {
        const value = e.target.value;
        onLanguagesChange(typeof value === 'string' ? value.split(',') : value);
    };

    return (
        <Box sx={{ display: 'flex', gap: 2, mb: 2, alignItems: 'center', flexWrap: 'wrap' }}>
            <FormControl size="small" sx={{ minWidth: 180 }}>
                <InputLabel id="district-filter-label">District</InputLabel>
                <Select
                    labelId="district-filter-label"
                    id="district-filter"
                    multiple
                    value={selectedDistricts}
                    onChange={handleDistrictChange}
                    label="District"
                    renderValue={(selected) => (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                            {selected.map((value) => (
                                <Chip key={value} label={value} size="small" />
                            ))}
                        </Box>
                    )}
                >
                    {districts.map((district) => (
                        <MenuItem key={district} value={district}>
                            <Checkbox checked={selectedDistricts.includes(district)} size="small" />
                            <ListItemText primary={district} />
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            <FormControl size="small" sx={{ minWidth: 180 }}>
                <InputLabel id="language-filter-label">Language</InputLabel>
                <Select
                    labelId="language-filter-label"
                    id="language-filter"
                    multiple
                    value={selectedLanguages}
                    onChange={handleLanguageChange}
                    label="Language"
                    renderValue={(selected) => (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                            {selected.map((value) => (
                                <Chip key={value} label={getLanguageName(value)} size="small" />
                            ))}
                        </Box>
                    )}
                >
                    {languages.map((lang) => (
                        <MenuItem key={lang} value={lang}>
                            <Checkbox checked={selectedLanguages.includes(lang)} size="small" />
                            <ListItemText primary={getLanguageName(lang)} />
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            {hasActiveFilters && (
                <Button size="small" onClick={onClear} variant="text">
                    Clear
                </Button>
            )}
        </Box>
    );
}
