
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				heineken: {
					DEFAULT: '#00843D', // Heineken green
					light: '#27AE60',
					dark: '#006837',
					neon: '#3EFF7F'
				},
				tactical: {
					black: '#121212',
					darkgray: '#1A1F2C',
					gray: '#333333',
					silver: '#9F9EA1',
					bronze: '#CD7F32',
					gold: '#FFD700'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' },
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' },
				},
				'radar-scan': {
					'0%': { transform: 'rotate(0deg)' },
					'100%': { transform: 'rotate(360deg)' }
				},
				'pulse-green': {
					'0%, 100%': { opacity: '1' },
					'50%': { opacity: '0.6' }
				},
				'tactical-fade': {
					'0%': { opacity: '0', transform: 'translateY(10px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},
				'bottle-cap-spin': {
					'0%': { transform: 'rotate(0deg)' },
					'100%': { transform: 'rotate(360deg)' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'radar-scan': 'radar-scan 4s linear infinite',
				'pulse-green': 'pulse-green 2s ease-in-out infinite',
				'tactical-fade': 'tactical-fade 0.3s ease-out forwards',
				'bottle-cap-spin': 'bottle-cap-spin 10s linear infinite'
			},
			backgroundImage: {
				'grid-pattern': 'linear-gradient(rgba(62, 255, 127, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(62, 255, 127, 0.05) 1px, transparent 1px)',
				'gradient-tactical': 'linear-gradient(180deg, rgba(0, 132, 61, 0.2) 0%, rgba(18, 18, 18, 0.9) 100%)',
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
