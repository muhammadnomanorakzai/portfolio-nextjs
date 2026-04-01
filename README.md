# Muhammad Noman | Personal Portfolio

A modern, responsive portfolio website built with Next.js 16, React 19, Tailwind CSS, and Supabase. Features a beautiful UI with dark mode support, admin dashboard, and analytics tracking.

![Next.js](https://img.shields.io/badge/Next.js-16.1.7-black?logo=next.js)
![React](https://img.shields.io/badge/React-19.2.3-blue?logo=react)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.19-38B2AC?logo=tailwind-css)
![Supabase](https://img.shields.io/badge/Supabase-Enabled-3ECF8E?logo=supabase)

## ✨ Features

### Public Portfolio
- **Hero Section** - Animated introduction with profile image and type animation
- **About Section** - Personal biography and background
- **Skills Section** - Technical skills showcase
- **Projects Section** - Dynamic project gallery from Supabase
- **Contact Section** - Contact form with rate limiting and XSS protection
- **Dark Mode** - Full dark/light theme toggle
- **Responsive Design** - Mobile-first, works on all devices
- **Performance Optimized** - Dynamic imports with skeleton loaders
- **Analytics** - Vercel Analytics and Speed Insights integration

### Admin Dashboard
- **Authentication** - Secure login with Supabase Auth
- **Project Management** - CRUD operations for projects
- **Message Inbox** - View and manage contact form submissions
- **Analytics Dashboard** - Visitor statistics and insights
- **Protected Routes** - Middleware-based authentication

### Security Features
- Input sanitization (XSS protection)
- Rate limiting on contact form (3 requests/minute)
- Privacy consent for visitor tracking (GDPR compliant)
- Environment variable configuration
- Protected admin routes

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- A Supabase account and project
- Git installed

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd personal-portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Copy the example environment file and fill in your values:
   ```bash
   cp .env.local.example .env.local
   ```
   
   Edit `.env.local` with your credentials:
   ```env
   # Supabase Configuration
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   
   # Contact Information
   NEXT_PUBLIC_CONTACT_EMAIL=your.email@example.com
   NEXT_PUBLIC_CONTACT_PHONE=+1234567890
   NEXT_PUBLIC_WHATSAPP_NUMBER=1234567890
   
   # Social Media Links
   NEXT_PUBLIC_GITHUB_URL=https://github.com/yourusername
   NEXT_PUBLIC_LINKEDIN_URL=https://linkedin.com/in/yourusername
   NEXT_PUBLIC_TWITTER_URL=https://twitter.com/yourusername
   NEXT_PUBLIC_INSTAGRAM_URL=https://instagram.com/yourusername
   
   # Site Configuration
   NEXT_PUBLIC_SITE_URL=https://your-portfolio.com
   ```

4. **Set up Supabase Database**
   
   Create the following tables in your Supabase project:
   
   **Projects Table:**
   ```sql
   CREATE TABLE projects (
     id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
     title TEXT NOT NULL,
     description TEXT NOT NULL,
     category TEXT DEFAULT 'fullstack',
     technologies TEXT[],
     features TEXT[],
     image_url TEXT,
     live_url TEXT,
     github_url TEXT,
     duration TEXT,
     role TEXT,
     featured BOOLEAN DEFAULT false,
     "order" INTEGER DEFAULT 0,
     created_at TIMESTAMPTZ DEFAULT NOW(),
     updated_at TIMESTAMPTZ DEFAULT NOW()
   );
   ```
   
   **Messages Table:**
   ```sql
   CREATE TABLE messages (
     id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
     name TEXT NOT NULL,
     email TEXT NOT NULL,
     subject TEXT NOT NULL,
     message TEXT NOT NULL,
     is_read BOOLEAN DEFAULT false,
     is_archived BOOLEAN DEFAULT false,
     created_at TIMESTAMPTZ DEFAULT NOW()
   );
   ```
   
   **Visitors Table:**
   ```sql
   CREATE TABLE visitors (
     id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
     ip_address TEXT,
     user_agent TEXT,
     page_visited TEXT,
     visited_at TIMESTAMPTZ DEFAULT NOW()
   );
   ```
   
   **Visitor Count View:**
   ```sql
   CREATE VIEW visitor_count AS
   SELECT COUNT(*) as count FROM visitors;
   ```

5. **Enable Row Level Security (RLS)**
   
   ```sql
   -- Projects: Public read, admin write
   ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
   CREATE POLICY "Public read access" ON projects FOR SELECT USING (true);
   
   -- Messages: Anyone can insert, admin read
   ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
   CREATE POLICY "Anyone can insert" ON messages FOR INSERT WITH CHECK (true);
   
   -- Visitors: Anyone can insert
   ALTER TABLE visitors ENABLE ROW LEVEL SECURITY;
   CREATE POLICY "Anyone can insert" ON visitors FOR INSERT WITH CHECK (true);
   ```

6. **Create Admin User**
   
   Create a user in Supabase Auth and set their `user_metadata.role` to `'admin'`.

## 📁 Project Structure

```
personal-portfolio/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── admin/              # Admin dashboard pages
│   │   ├── layout.jsx          # Root layout
│   │   ├── page.jsx            # Home page
│   │   └── globals.css         # Global styles
│   ├── components/
│   │   ├── sections/           # Page sections (Hero, About, etc.)
│   │   ├── layout/             # Layout components (Navbar, Footer)
│   │   ├── ui/                 # Reusable UI components
│   │   └── Admin/              # Admin-specific components
│   ├── hooks/                  # Custom React hooks
│   └── lib/                    # Utilities and API clients
│       ├── api.js              # Supabase API functions
│       ├── auth.js             # Authentication utilities
│       ├── supabase.js         # Supabase client
│       └── utils.js            # Helper functions
├── public/                     # Static assets
├── .env.local.example          # Environment variables template
└── package.json
```

## 🛠️ Development

### Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see your portfolio.

### Build for Production
```bash
npm run build
npm run start
```

### Run Linter
```bash
npm run lint
```

## 🚢 Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com)
3. Import your repository
4. Add environment variables in Vercel settings
5. Deploy

## 📝 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL | ✅ |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your Supabase anon/public key | ✅ |
| `NEXT_PUBLIC_CONTACT_EMAIL` | Contact email address | ✅ |
| `NEXT_PUBLIC_CONTACT_PHONE` | Contact phone number | ✅ |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | WhatsApp number for chat button | ✅ |
| `NEXT_PUBLIC_GITHUB_URL` | GitHub profile URL | ✅ |
| `NEXT_PUBLIC_LINKEDIN_URL` | LinkedIn profile URL | ✅ |
| `NEXT_PUBLIC_TWITTER_URL` | Twitter profile URL | ✅ |
| `NEXT_PUBLIC_INSTAGRAM_URL` | Instagram profile URL | ✅ |
| `NEXT_PUBLIC_SITE_URL` | Your portfolio domain | ✅ |

## 🧰 Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** JavaScript (ES6+)
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Database:** Supabase (PostgreSQL)
- **Authentication:** Supabase Auth
- **Analytics:** Vercel Analytics, Speed Insights
- **Icons:** Heroicons, React Icons
- **Forms:** React Hook Form

## 🔒 Security

- **XSS Protection:** Input sanitization on all form submissions
- **Rate Limiting:** Contact form limited to 3 submissions per minute
- **Privacy:** GDPR-compliant visitor tracking with consent
- **Authentication:** Secure admin routes with Supabase Auth
- **Environment Variables:** Sensitive data stored securely

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 📧 Contact

Muhammad Noman - muhammadnomanorakzai313@gmail.com

Portfolio: [https://your-portfolio.com](https://your-portfolio.com)

---

Built with ❤️ by Muhammad Noman
