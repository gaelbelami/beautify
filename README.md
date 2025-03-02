# Next.js Starter Kit 🚀

A feature-rich boilerplate for modern web apps. Built with **Next.js**, **Tailwind CSS**, **next-intl**, and more. Jumpstart your projects with internationalization, theming, state management, and responsive design.

---

## ✨ Features

- ⚡ **Next.js 14** (App Router)
- 🎨 **Tailwind CSS** + Dark/Light mode
- 🌐 **Internationalization** (i18n) via `next-intl`
- 🧩 **State Management**: Zustand + React Query
- 📱 Responsive & accessible UI components
- 🔧 Pre-configured ESLint + Prettier
- 🛠 Optimized build setup

---

## 🛠 Tech Stack

| Tool             | Purpose                         |
| ---------------- | ------------------------------- |
| **Next.js**      | React framework for SSR/SSG     |
| **Tailwind CSS** | Styling utility-first framework |
| **next-intl**    | Internationalization            |
| **Zustand**      | Global state management         |
| **React Query**  | Data fetching and caching       |
| **TypeScript**   | Static type checking            |
| **Jest**         | Unit testing                    |

---

## 🚀 Quick Start

```bash
# 1. Clone repository
git clone https://github.com/your-username/your-repo.git
cd your-repo

# 2. Install dependencies
npm install

# 3. Configure environment
cp .env.example .env.local

# 4. Start development server
npm run dev
```

Visit `http://localhost:3000` to explore the starter kit.

---

## 📂 Project Structure

```bash
src/
├── app/
│   └── [locale]/          # i18n routing
│       ├── layout.tsx
│       └── page.tsx
├── components/            # Reusable UI components
├── hooks/                 # Custom hooks
├── lib/                   # Utilities/configs
├── locales/               # Translation files
├── providers/             # Context providers
├── stores/                # Zustand stores
├── styles/                # Global CSS
└── types/                 # TypeScript types
```

---

## 🌐 Add a Language

1. Create new locale files:

   ```bash
   src/locales/
   ├── en.json
   └── fr.json  # Example: French translations
   ```

2. Configure supported locales in `next.config.js`:
   ```js
   const locales = ["en", "fr"]; // Add new locale here
   ```

---

## 🌓 Theme Switching

**1. Using the theme provider:**

```tsx
// components/ThemeToggle.tsx
import { useTheme } from "@/providers/ThemeProvider";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800"
    >
      {theme === "light" ? "🌙" : "☀️"}
    </button>
  );
}
```

**2. Dark mode in Tailwind:**

```html
<div className="text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-900">
  <!-- Content -->
</div>
```

---

## 🧠 State Management (Zustand)

**Create a store:**

```ts
// stores/useCounterStore.ts
import { create } from "zustand";

interface CounterState {
  count: number;
  increment: () => void;
  decrement: () => void;
}

export const useCounterStore = create<CounterState>((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
}));
```

**Use in components:**

```tsx
import { useCounterStore } from "@/stores/useCounterStore";

export default function Counter() {
  const { count, increment } = useCounterStore();
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>+</button>
    </div>
  );
}
```

---

## 📡 Data Fetching (React Query)

**Configure provider:**

```tsx
// app/providers.tsx
"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export function ReactQueryProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
```

**Fetch data:**

```tsx
// components/UserList.tsx
import { useQuery } from "@tanstack/react-query";

async function fetchUsers() {
  const res = await fetch("/api/users");
  return res.json();
}

export default function UserList() {
  const { data, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });

  if (isLoading) return <div>Loading...</div>;

  return <ul>{data?.map((user) => <li key={user.id}>{user.name}</li>)}</ul>;
}
```

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feat/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feat/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for details.

---

> **Happy coding!** 🎉  
> Let me know if you need any adjustments or additional sections!
