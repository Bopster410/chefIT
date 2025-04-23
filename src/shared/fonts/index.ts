import { Inter, Manrope } from 'next/font/google';

export const inter = Inter({
    display: 'fallback',
    subsets: ['cyrillic', 'latin'],
    weight: ['300', '400', '600', '700'],
    fallback: ['sans-serif'],
    variable: '--font-base',
});

export const manrope = Manrope({
    display: 'swap',
    subsets: ['cyrillic', 'latin'],
    weight: ['400', '500', '600', '700', '800'],
    fallback: ['sans-serif'],
    variable: '--font-header',
});
