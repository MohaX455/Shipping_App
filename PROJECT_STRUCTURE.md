# Social Shipping - Nouvelle Architecture (Phase 2)

## 📁 Structure des Répertoires

```
social-shipping/
├── app/
│   ├── layout.tsx              # Layout global (Header + Main + Footer)
│   ├── page.tsx                # Homepage assemblant toutes les sections
│   ├── globals.css             # Styles globaux Tailwind
│   └── [autres pages futures]
│
├── components/
│   ├── layout/
│   │   ├── Header.tsx          # Navigation responsive avec hamburger
│   │   ├── Footer.tsx          # Footer professionnel
│   │   └── index.ts            # Exports
│   │
│   ├── home/
│   │   ├── HeroSection.tsx      # Section Hero avec CTA
│   │   ├── ValuePropositionSection.tsx  # 3 features principales
│   │   ├── HowItWorksSection.tsx        # 3 étapes expliquées
│   │   ├── UpcomingTravelersSection.tsx # Cartes travelers avec load more
│   │   ├── FAQSection.tsx               # FAQs avec onglets et accordéon
│   │   └── index.ts                     # Exports
│   │
│   ├── ui/
│   │   └── Button.tsx          # Composants UI réutilisables (futur)
│   │
│   └── [autres composants page future]
│
├── lib/
│   ├── config.ts               # Configuration app (URLs, etc)
│   ├── constants.ts            # Constants (NAV_LINKS, etc)
│   └── utils.ts                # Utility functions
│
├── public/
│   └── images/                 # Dossier images
│
├── styles/                     # Styles additionnels (si nécessaire)
├── types/                      # Types TypeScript globaux (futur)
├── hooks/                      # React hooks réutilisables (futur)
│
├── package.json
├── tsconfig.json
├── tailwind.config.cjs
├── next.config.ts
└── README.md
```

## 🎯 Architecture Componentielle

### Layout Hiérarchie

```
RootLayout (Server Component)
├── Header (Client Component)
├── main (Server)
│   └── HomePage (Server Component)
│       ├── HeroSection (Server)
│       ├── UpcomingTravelersSection (Client - useState)
│       ├── ValuePropositionSection (Server)
│       ├── HowItWorksSection (Server)
│       └── FAQSection (Client - useState)
└── Footer (Server Component)
```

### Conventions de Nommage

- **Composants**: PascalCase, suffixe `Section` pour sections
- **Fichiers**: Même nom que le composant
- **Fonctions**: camelCase
- **Constants**: UPPER_SNAKE_CASE

## 📦 Composants Détail

### Header.tsx
- **Type**: Client Component (`'use client'`)
- **Responsabilités**: 
  - Navigation menu
  - Logo responsive
  - Mobile hamburger menu
  - User profile button
- **Props**: None
- **Exports**: `export function Header()`

### Footer.tsx
- **Type**: Server Component
- **Responsabilités**:
  - Links footer
  - Social media
  - Copyright
  - Brand info
- **Props**: None
- **Exports**: `export function Footer()`

### HeroSection.tsx
- **Type**: Server Component
- **Responsabilités**:
  - Main hero visual
  - Key messaging
  - CTA button
- **Props**: None
- **Exports**: `export function HeroSection()`

### ValuePropositionSection.tsx
- **Type**: Server Component
- **Responsabilités**:
  - 3 feature cards
  - Icons & descriptions
- **Props**: None
- **Exports**: `export function ValuePropositionSection()`

### UpcomingTravelersSection.tsx
- **Type**: Client Component (`'use client'`)
- **Responsabilités**:
  - Display travelers cards
  - Load more functionality
  - Card interactions
- **State**: `displayCount`
- **Exports**: `export function UpcomingTravelersSection()`

### HowItWorksSection.tsx
- **Type**: Server Component
- **Responsabilités**:
  - 3 step display
  - Step numbering
  - Arrow connectors
- **Props**: None
- **Exports**: `export function HowItWorksSection()`

### FAQSection.tsx
- **Type**: Client Component (`'use client'`)
- **Responsabilités**:
  - Tab switching (Sender/Traveler)
  - Accordion expand/collapse
  - FAQ display
- **State**: `activeTab`, `openId`
- **Exports**: `export function FAQSection()`
- **Types**: `interface FAQItem`

## 🎨 Design System

### Tailwind Utilities

#### Spacing
- Container: `max-w-7xl mx-auto`
- Padding: `px-4 sm:px-6 lg:px-8`
- Section spacing: `py-20`

#### Colors
- Primary: `blue-600`, `cyan-500`
- Neutrals: `slate-*` (50-900)
- Success: `green-600`
- Accents: Gradients `from-*` `to-*`

#### Typography
- Headings: `font-bold`, sizes `xl` → `7xl`
- Body: `text-base` → `lg`, weights 400-600
- Monospace: `font-mono` (si texte code)

#### Responsive
```
sm: 640px
md: 768px
lg: 1024px
xl: 1280px
```

Patterns:
- `hidden md:block` - Desktop only
- `md:grid-cols-2 lg:grid-cols-3` - Responsive grid
- `text-2xl sm:text-3xl md:text-4xl` - Responsive text

#### Components
- Buttons: `px-8 py-4 rounded-lg bg-gradient-to-r`
- Cards: `rounded-xl border border-slate-200`
- Inputs: `form-control` (Tailwind forms plugin future)

## 🔄 Data Flow

### Current (Placeholder)
```
HomePage
├── HeroSection [static]
├── UpcomingTravelersSection [local state + placeholder data]
├── ValuePropositionSection [static]
├── HowItWorksSection [static]
└── FAQSection [local state + static data]
```

### Future (API Integration)
```
HomePage [fetch data]
├── pass props to sections
├── UpcomingTravelersSection [dynamic data]
├── FAQSection [dynamic FAQs]
└── Footer [dynamic contactData]
```

## ✅ Checklist Mobile-First

- [x] Header responsive (hamburger on mobile)
- [x] Navigation stacks on mobile
- [x] Hero text scales with breakpoints
- [x] Travelers grid: 1 col → 2 col → 3 col
- [x] How It Works: vertical → horizontal arrows
- [x] FAQ: full width optimized
- [x] Footer: grid responsive
- [x] Buttons: touch-friendly sizes
- [x] Spacing: consistent across breakpoints

## 🚀 Déploiement

### Build Process
```bash
npm run build
# Crée .next/ avec optimisations
# Vérifie TypeScript
# Bundle splitting automatique
```

### Running in Production
```bash
npm run start
# Lance server sur port 3000
# Optimisé pour performance
```

### Environment
```
NEXT_PUBLIC_API_URL=https://api.jetcamer.com/social-shipping/api
NEXT_PUBLIC_IMAGE_URL=https://api.jetcamer.com/social-shipping/upload/images/
```

## 🔧 Configuration Files

### next.config.ts
- Image optimization
- Tailwind setup
- Build options

### tailwind.config.cjs
- Colors
- Fonts
- Spacing scale
- Plugins

### tsconfig.json
- Compiler options
- Path aliases (`@/*`)
- React version

## 📚 Notes Importantes

1. **Server Components par défaut**
   - Plus rapides
   - Accès direct BD (future)
   - Zéro JS client

2. **Client Components au besoin**
   - useState, useEffect
   - Event handlers
   - Browser APIs

3. **No Bootstrap**
   - Utiliser Tailwind utilities
   - Plus flexible et léger
   - Meilleur bundle size

4. **TypeScript**
   - Utiliser interfaces/types
   - Props typing
   - Component typing

---

**Last Updated**: Février 2026
**Status**: Phase 2 - Étape 1 ✅ Complétée
