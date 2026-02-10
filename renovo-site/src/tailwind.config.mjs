/** @type {import('tailwindcss').Config} */
export default {
    darkMode: "class",
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}', './public/**/*.html'],
    theme: {
        extend: {
            /* ── Typography Scale ─────────────────────────── */
            fontSize: {
                xs:   ['0.75rem',  { lineHeight: '1.2',  letterSpacing: '0.02em',  fontWeight: '400' }],
                sm:   ['0.875rem', { lineHeight: '1.3',  letterSpacing: '0.02em',  fontWeight: '400' }],
                base: ['1rem',     { lineHeight: '1.5',  letterSpacing: '0.025em', fontWeight: '400' }],
                lg:   ['1.125rem', { lineHeight: '1.5',  letterSpacing: '0.025em', fontWeight: '500' }],
                xl:   ['1.25rem',  { lineHeight: '1.5',  letterSpacing: '0.03em',  fontWeight: '600' }],
                '2xl': ['1.5rem',  { lineHeight: '1.4',  letterSpacing: '0.03em',  fontWeight: '700' }],
                '3xl': ['1.875rem',{ lineHeight: '1.3',  letterSpacing: '0.035em', fontWeight: '700' }],
                '4xl': ['2.25rem', { lineHeight: '1.2',  letterSpacing: '0.04em',  fontWeight: '800' }],
                '5xl': ['3rem',    { lineHeight: '1.1',  letterSpacing: '0.04em',  fontWeight: '800' }],
                '6xl': ['3.75rem', { lineHeight: '1.1',  letterSpacing: '0.05em',  fontWeight: '900' }],
                '7xl': ['4.5rem',  { lineHeight: '1.1',  letterSpacing: '0.05em',  fontWeight: '900' }],
                '8xl': ['6rem',    { lineHeight: '1',    letterSpacing: '0.06em',  fontWeight: '900' }],
                '9xl': ['8rem',    { lineHeight: '1',    letterSpacing: '0.07em',  fontWeight: '900' }],
            },

            /* ── Font Families ────────────────────────────── */
            fontFamily: {
                display:   ['"Outfit"', 'sans-serif'],          // Hero headlines, page titles
                heading:   ['"Montserrat"', 'system-ui', 'sans-serif'], // Section headings
                accent:    ['"Syncopate"', 'sans-serif'],       // Labels, badges, logo
                body:      ['"Inter"', 'system-ui', 'sans-serif'],      // Body copy
                paragraph: ['"Inter"', 'system-ui', 'sans-serif'],
            },

            /* ── Color System ─────────────────────────────── */
            colors: {
                /* Surface Scale — neutral dark-to-light */
                surface: {
                    950: '#0A0A0A',  // deepest black
                    900: '#111111',  // industrial bg base
                    850: '#161616',  // elevated dark
                    800: '#1A1A1A',  // card bg
                    700: '#222222',  // input bg
                    600: '#333333',  // borders on dark
                    500: '#555555',  // muted / disabled
                    400: '#888888',  // secondary text
                    300: '#AAAAAA',  // body text on dark
                    200: '#EBEAED',  // Lace Cap — muted light
                    100: '#F2F3F4',  // Anti-Flash White — light bg
                    50:  '#FFFFFF',  // white
                },

                /* Brand Orange — primary accent */
                accent: {
                    DEFAULT: '#FF7F00',
                    50:  '#FFF7ED',
                    100: '#FFEDD5',
                    200: '#FFCC80',
                    300: '#FFB74D',
                    400: '#FF9933',
                    500: '#FF7F00',  // Safety Orange ← primary
                    600: '#ED4B00',  // Kimchi — hover / pressed
                    700: '#CC4000',  // deep — active / focus
                    800: '#993000',
                    900: '#662000',
                },

                /* Navy — from Renovo logo blue */
                navy: {
                    DEFAULT: '#1B3A5C',
                    950: '#081828',  // near-black navy
                    900: '#0C2340',  // deepest usable
                    800: '#122E4F',
                    700: '#1B3A5C',  // logo text blue ← brand anchor
                    600: '#1E5080',
                    500: '#2571A7',  // logo icon mid-blue
                    400: '#3498DB',
                    300: '#6BB5E8',
                },

                /* Semantic aliases (keep backward compat) */
                primary:              '#FF7F00',
                'primary-dark':       '#ED4B00',
                'primary-foreground': '#FFFFFF',
                foreground:           '#1C1C1C',
                background:           '#F2F3F4',
                'background-light':   '#F2F3F4',
                'background-dark':    '#111111',
                secondary:            '#DCD9D0',
                'secondary-foreground': '#1C1C1C',
                destructive:          '#DF3131',
                destructiveforeground:'#FFFFFF',
                gridborder:           '#FFFFFF',

                /* Legacy — retained for existing components */
                renovo: {
                    green:        '#2D6A4F',
                    'green-light':'#40916C',
                    'green-dark': '#1B4332',
                    earth:        '#B7B7A4',
                    sand:         '#D4C7B0',
                    charcoal:     '#2B2D42',
                    slate:        '#8D99AE',
                    white:        '#F8F9FA',
                },
            },

            /* ── Spacing Extras ───────────────────────────── */
            spacing: {
                '18': '4.5rem',
                '22': '5.5rem',
                '30': '7.5rem',
            },

            /* ── Border Radius ────────────────────────────── */
            borderRadius: {
                DEFAULT: '0.25rem',
            },
        },
    },
    future: {
        hoverOnlyWhenSupported: true,
    },
    plugins: [require('@tailwindcss/container-queries'), require('@tailwindcss/typography')],
}
