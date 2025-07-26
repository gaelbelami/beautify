# 🎨 Beautify - Advanced Next.js Starter Kit

A feature-rich, production-ready boilerplate for modern web applications. Built with **Next.js 15**, **Advanced Theme System**, **Design Tokens**, **Internationalization**, and comprehensive **State Management**. Perfect for building scalable, accessible, and beautiful web applications.

---

## ✨ Key Features

### 🎨 **Advanced Theme System**
- **22 Color Palettes** with 11 shades each (50-950)
- **Design Token Architecture** for consistent styling
- **Real-time Theme Switching** with instant preview
- **Custom Theme Creation** and export/import
- **Persistent Theme Settings** across sessions
- **Dark/Light Mode** with system preference detection
- **90% Bundle Size Reduction** through optimized color loading

### 🌐 **Internationalization (i18n)**
- **Multi-language Support** (EN, FR, DE, NL, ZH)
- **Dynamic Locale Switching** with next-intl
- **SEO-optimized** locale routing
- **RTL Support** ready

### 🧠 **Hybrid State Management**
- **Zustand** for global client state
- **React Query** for server state and caching
- **React Context** for theme and UI state
- **React Hook Form** with Zod validation

### 🚀 **Performance & Developer Experience**
- **Next.js 15** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** with custom design system
- **Radix UI** components for accessibility
- **ESLint + Prettier** with custom configurations
- **Motion Primitives** for smooth animations

---

## 🛠 Tech Stack

| Category | Technologies |
|----------|-------------|
| **Framework** | Next.js 15, React 19 RC, TypeScript |
| **Styling** | Tailwind CSS, Design Tokens, CSS Variables |
| **UI Components** | Radix UI, Lucide Icons, Tabler Icons |
| **State Management** | Zustand, React Query, React Context |
| **Forms** | React Hook Form, Zod Validation |
| **Internationalization** | next-intl, Dynamic Routing |
| **Animation** | Motion Primitives, Tailwind Animate |
| **Development** | ESLint, Prettier, TypeScript |

---

## 🚀 Quick Start

```bash
# 1. Clone the repository
git clone https://github.com/your-username/beautify.git
cd beautify

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev
```

Visit `http://localhost:3000` to see your application running.

---

## 📂 Project Architecture

```
src/
├── app/                    # Next.js App Router
│   ├── (auth)/            # Authentication routes
│   ├── (landingPage)/     # Landing page routes
│   ├── dashboard/         # Dashboard routes
│   └── layout.tsx         # Root layout
├── components/            # Reusable UI components
│   ├── forms/            # Form components
│   ├── global/           # Global components
│   ├── ui/               # Base UI components (Radix)
│   ├── improved-theme-toggle.tsx  # Advanced theme system
│   └── locale-switcher.tsx        # Language switcher
├── context/              # React Context providers
│   ├── improved-theme-provider.tsx
│   └── theme-data-provider.tsx
├── hooks/                # Custom React hooks
│   ├── authentication/  # Auth-related hooks
│   ├── settings/        # Settings hooks
│   └── useUser.ts       # User data hooks
├── lib/                  # Utilities and configurations
│   ├── design-tokens.ts # Color system and design tokens
│   ├── theme-colors.ts  # Theme color utilities
│   ├── theme-utils.ts   # Theme helper functions
│   └── utils.ts         # General utilities
├── stores/              # Zustand state stores
│   ├── authStore.ts     # Authentication state
│   ├── counterStore.ts  # Counter example
│   └── userStore.ts     # User state
├── types/               # TypeScript type definitions
│   └── theme-types.ts   # Theme system types
└── react-query/         # React Query configuration
    └── provider.tsx     # Query client setup
```

---

## 🎨 Advanced Theme System

### Color Palette
Choose from **22 carefully crafted color palettes**:

**Neutrals**: Slate, Neutral, Stone  
**Warm**: Red, Orange, Amber, Yellow  
**Nature**: Lime, Green, Emerald, Teal  
**Cool**: Cyan, Sky, Blue, Indigo  
**Vibrant**: Violet, Purple, Fuchsia, Pink, Rose

### Using the Theme System

```tsx
// 1. Basic theme toggle
import { ImprovedThemeToggle } from '@/components/improved-theme-toggle';

export default function Header() {
  return (
    <header>
      <ImprovedThemeToggle />
    </header>
  );
}

// 2. Access theme context
import { useImprovedTheme } from '@/context/improved-theme-provider';

export default function MyComponent() {
  const { 
    themeColor, 
    setThemeColor, 
    customThemes, 
    createCustomTheme 
  } = useImprovedTheme();
  
  return (
    <div className="bg-primary text-primary-foreground">
      Current theme: {themeColor}
    </div>
  );
}

// 3. Create custom themes
const customTheme = {
  name: "My Brand Theme",
  colors: {
    primary: "#your-brand-color",
    secondary: "#your-secondary-color"
  }
};

createCustomTheme(customTheme);
```

### Design Tokens

Access the complete design system:

```tsx
import { primitiveColors, semanticTokens } from '@/lib/design-tokens';

// Use primitive colors
const blueShades = primitiveColors.blue;
console.log(blueShades[500]); // #3b82f6

// Use semantic tokens
const lightTheme = semanticTokens.light;
const darkTheme = semanticTokens.dark;
```

---

## 🌐 Internationalization

### Adding a New Language

1. **Create translation file**:
   ```bash
   # Add your language file
   messages/es.json  # Spanish example
   ```

2. **Add translations**:
   ```json
   {
     "navigation": {
       "home": "Inicio",
       "about": "Acerca de"
     }
   }
   ```

3. **Update configuration**:
   ```tsx
   // src/i18n/request.ts
   export const locales = ['en', 'fr', 'de', 'nl', 'zh', 'es'] as const;
   ```

### Using Translations

```tsx
import { useTranslations } from 'next-intl';

export default function HomePage() {
  const t = useTranslations('navigation');
  
  return (
    <nav>
      <a href="/">{t('home')}</a>
      <a href="/about">{t('about')}</a>
    </nav>
  );
}
```

---

## 🧠 State Management

### Zustand Stores

```tsx
// stores/userStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UserState {
  user: User | null;
  setUser: (user: User) => void;
  logout: () => void;
}

export const useUserStore = create<UserState>()()
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      logout: () => set({ user: null }),
    }),
    { name: 'user-storage' }
  )
);

// Usage in components
import { useUserStore } from '@/stores/userStore';

export default function Profile() {
  const { user, setUser } = useUserStore();
  
  return (
    <div>
      {user ? `Welcome, ${user.name}!` : 'Please log in'}
    </div>
  );
}
```

### React Query for Server State

```tsx
// hooks/useUser.ts
import { useQuery } from '@tanstack/react-query';
import { userService } from '@/services/userService';

export const useUser = (userId: string) => {
  return useQuery({
    queryKey: ['user', userId],
    queryFn: () => userService.getUser(userId),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Usage
export default function UserProfile({ userId }: { userId: string }) {
  const { data: user, isLoading, error } = useUser(userId);
  
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading user</div>;
  
  return <div>Hello, {user?.name}!</div>;
}
```

### Form Management with React Hook Form

```tsx
// hooks/authentication/index.ts
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const signInSchema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

export const useAuthSignIn = () => {
  return useForm({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });
};
```

---

## 🎯 Performance Features

### Bundle Optimization
- **90% reduction** in theme-related bundle size
- **Tree-shaking** for unused color palettes
- **Dynamic imports** for theme components
- **Optimized re-renders** with React.memo and useMemo

### Caching Strategy
- **React Query** for server state caching
- **localStorage** persistence for user preferences
- **Next.js** automatic static optimization
- **Service Worker** ready for PWA features

---

## 🧪 Development

### Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

### Code Quality

- **TypeScript** for type safety
- **ESLint** with Next.js configuration
- **Prettier** with Tailwind CSS plugin
- **Husky** for git hooks (optional)

---

## 🚀 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Other Platforms

The project works with any platform supporting Next.js:
- **Netlify**
- **Railway**
- **DigitalOcean App Platform**
- **AWS Amplify**

---

## 🤝 Contributing

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feat/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feat/amazing-feature`)
5. **Open** a Pull Request

### Development Guidelines

- Follow the existing code style
- Add TypeScript types for new features
- Update documentation for API changes
- Test theme compatibility across color palettes
- Ensure accessibility compliance

---

## 📄 License

Distributed under the **MIT License**. See `LICENSE` for more information.

---

## 🙏 Acknowledgments

- **Radix UI** for accessible components
- **Tailwind CSS** for the utility-first approach
- **Next.js** team for the amazing framework
- **Vercel** for hosting and deployment
- **Open source community** for inspiration

---

> **Ready to build something beautiful?** 🎨✨  
> Star the repo if you find it helpful and happy coding!

**[Live Demo](https://your-demo-url.vercel.app)** • **[Documentation](https://your-docs-url.com)** • **[Report Bug](https://github.com/your-username/beautify/issues)**
