/**
 * Event type → color category mapping.
 * Groups ~40 event types into 10 scannable color categories.
 */

export interface EventCategory {
    name: string;
    emoji: string;
    color: string;      // primary color (for light backgrounds / chips)
    darkColor: string;  // slightly brighter variant for dark mode
}

const categories: Record<string, EventCategory> = {
    music: { name: 'Music', emoji: '🎵', color: '#3F51B5', darkColor: '#7986CB' },
    theatre: { name: 'Theatre', emoji: '🎭', color: '#7B1FA2', darkColor: '#BA68C8' },
    visualArts: { name: 'Visual Arts', emoji: '🎨', color: '#00796B', darkColor: '#4DB6AC' },
    cinema: { name: 'Cinema', emoji: '🎬', color: '#546E7A', darkColor: '#90A4AE' },
    festival: { name: 'Festival', emoji: '🎪', color: '#F57F17', darkColor: '#FFD54F' },
    sport: { name: 'Sport', emoji: '🏃', color: '#2E7D32', darkColor: '#66BB6A' },
    food: { name: 'Food & Drink', emoji: '🍷', color: '#E65100', darkColor: '#FF8A65' },
    outdoor: { name: 'Outdoor', emoji: '🌿', color: '#558B2F', darkColor: '#9CCC65' },
    community: { name: 'Community', emoji: '🤝', color: '#0097A7', darkColor: '#4DD0E1' },
    party: { name: 'Party', emoji: '🎉', color: '#C2185B', darkColor: '#F06292' },
};

const fallback: EventCategory = { name: 'Other', emoji: '📌', color: '#757575', darkColor: '#BDBDBD' };

/** Map event type strings to category keys */
const typeToCategory: Record<string, string> = {
    // Music
    concert: 'music',
    music: 'music',
    'open mic': 'music',
    'live shows': 'music',

    // Theatre
    theatre: 'theatre',
    show: 'theatre',
    comedy: 'theatre',

    // Visual Arts
    exhibition: 'visualArts',
    art: 'visualArts',

    // Cinema
    cinema: 'cinema',
    movie: 'cinema',

    // Festival
    festival: 'festival',
    festivals: 'festival',
    carnival: 'festival',

    // Sport
    sport: 'sport',
    sports: 'sport',
    race: 'sport',

    // Food & Drink
    food: 'food',
    'wine tasting & stargazing': 'food',

    // Outdoor
    outdoor: 'outdoor',
    walk: 'outdoor',
    hike: 'outdoor',
    adventure: 'outdoor',

    // Community
    workshop: 'community',
    talk: 'community',
    bazaar: 'community',
    market: 'community',
    fair: 'community',
    convention: 'community',
    gathering: 'community',
    community: 'community',
    education: 'community',
    summit: 'community',
    games: 'community',
    directory: 'community',
    family: 'community',

    // Party
    party: 'party',
    parties: 'party',
    dance: 'party',
};

/** Get the color category for an event type */
export function getEventCategory(type: string): EventCategory {
    const key = typeToCategory[type.toLowerCase()];
    return key ? categories[key] : fallback;
}

/** Get the background color for an event type */
export function getEventColor(type: string, isDark = false): string {
    const category = getEventCategory(type);
    return isDark ? category.darkColor : category.color;
}
