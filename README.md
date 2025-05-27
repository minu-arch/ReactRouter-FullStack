# React Router 7 with Supabase - Full Stack App

A modern, full-stack application built with React Router 7 and Supabase, featuring server-side rendering, data fetching, and clean architecture.

## Features

- 🚀 React Router 7 for full-stack development
- ⚡ Server-side rendering for fast page loads
- 🔌 Supabase integration for backend functionality
- 🎨 Tailwind CSS v4 for styling
- 📱 Responsive design
- 🔄 Data loading with loaders and mutations with actions
- 🧩 Component-based architecture
- 📊 CRUD operations for items
- 🔒 TypeScript support

## Project Structure

```
frontend/
├── app/                   # Router configuration
├── source/
│   ├── components/        # Reusable UI components
│   ├── lib/               # Utilities and integrations
│   ├── theme/             # Styling configuration
│   └── view/              # Page components and route handlers
│       ├── item/          # Item-related views and hooks
│       │   ├── hook/      # Separated data-fetching logic
│       │   └── type.ts    # TypeScript definitions
│       └── welcome/       # Welcome page
└── public/                # Static assets
```

## Getting Started

### Installation

1. Clone this repository
2. Install dependencies:

```bash
cd frontend
pnpm install
```

### Environment Setup

1. Create a `.env.local` file in the frontend directory
2. Add your Supabase credentials:

```
VITE_SUPABASE_URL=your_supabase_url_here
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

> **Important**: Never commit your actual Supabase credentials to version control. The `.env.local` file is included in `.gitignore` for security reasons.

### Development

Start the development server:

```bash
pnpm dev
```

Your application will be available at `http://localhost:5173`.

## Key Concepts

### React Router 7 Data Flow

The application follows React Router 7's data flow patterns:

- **Loaders**: Fetch data before rendering components
- **Actions**: Handle form submissions and data mutations
- **useLoaderData/useActionData**: Access data from loaders and actions

Example:

```tsx
// Loader for fetching data
export async function loader({ params }) {
  const { data, error } = await supabase.from("items").select("*").eq("id", params.id);
  // ...
  return { item: data[0] };
}

// Component using the loader data
export default function Item() {
  const { item } = useLoaderData<typeof loader>();
  // ...
}
```

### Supabase Integration

Supabase is used as the backend for this application:

- Authentication (planned)
- Database operations
- Real-time updates (planned)

## Building for Production

Create a production build:

```bash
npm run build
```

## Deployment

The application can be deployed to any platform that supports Node.js applications:

- Vercel
- Netlify
- AWS (ECS, EC2, Amplify)
- Digital Ocean
- Fly.io
- Railway

## Future Enhancements

- [ ] User authentication with Supabase Auth
- [ ] Real-time updates with Supabase Realtime
- [ ] Integration with shadcn UI components
- [ ] More advanced filtering and search functionality
- [ ] User profile management
- [ ] Image upload functionality

## License

MIT

---

Built with ❤️ using React Router 7 and Supabase. 