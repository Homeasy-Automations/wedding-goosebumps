# Wedding Goosebumps - Complete CMS & Backend Platform

This is a production-grade Next.js application with a full-stack CMS panel for managing cinematic wedding content, dynamic pages, SEO, prospective client leads, automated emails, and activity audit trails.

---

## 🌟 Key Architecture & Features

### 1. 📧 Integrated Mail Engine & Automation (`frontend/src/lib/mail.ts`)
- **Automated Dual-Delivery on Lead Submission**:
  - **Admin Lead Notification Email**: Instant luxury branded notification to the Wedding Goosebumps team containing lead contact info, date/time, source page, message, and a direct button to the CMS Leads Inbox.
  - **Client Confirmation Auto-Reply**: Elegant acknowledgment sent directly to the couple explaining expected consultation steps within 24–48 hours.
- **Direct Email Replies from Admin Dashboard**:
  - Staff can compose and send custom, branded emails directly to leads from `/admin/leads`. Automatically updates status from `New` to `Contacted`.
- **Diagnostic Testing & Verification (`/admin/mail`)**:
  - Interactive test tool to verify live SMTP connectivity with a single click.
  - Live preview of automated email templates.
- **Graceful Simulation & Fallback Mode**:
  - In development or before credentials are provided, emails are safely logged to console output and audit logs, ensuring zero runtime crashes.

### 2. 📋 Complete CRM Leads Management (`/api/leads`, `/admin/leads`)
- **Public Submission**: Full validation, spam honeypot filtering (`/api/leads`), and database persistence.
- **Interactive CMS Inbox**: Filter by status (`New`, `Contacted`, `Qualified`, `Closed`, `Spam`), real-time search across names, emails, and phone numbers.
- **Detailed Inquiry Drawer**: View client messages, update pipeline status, record internal staff notes, and reply via email.

### 3. 🛡️ Activity Audit Trail & Logging (`/api/logs`, `/admin/logs`)
- Automatic logging across all mutations (lead arrivals, email dispatches, status changes, page/blog edits, and SEO updates).
- Filter by module, search actions, expand structured JSON details, and prune old records.

### 4. 📊 Live Executive Dashboard (`/api/dashboard/stats`, `/admin`)
- Real-time inquiry counts, active pipeline metrics, recent inquiries table, live activity log stream, and mail delivery status.

### 5. 📝 Content Management (Pages, Blog & SEO)
- Full CRUD for dynamic pages and section configurations (`/api/pages`).
- Blog stories management with categories, tags, and rich content (`/api/blog`).
- Global SEO meta tags, OpenGraph, analytics tags (`/api/seo`).

---

## 🚀 Setup & Installation Instructions

### 1. Install Dependencies
```bash
cd frontend
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env` in the `frontend/` directory:
```bash
cp .env.example frontend/.env
```
Fill in the database and mail settings:
```env
# Database (MySQL via local XAMPP/Docker or hosted MySQL like PlanetScale/Aiven)
DATABASE_URL="mysql://root:root@localhost:3306/wedding_goosebumps"

# NextAuth
NEXTAUTH_SECRET="your-super-secret-random-key"
NEXTAUTH_URL="http://localhost:3000"

# SMTP Mail Server (Gmail, Resend, Brevo, SendGrid, Amazon SES)
SMTP_HOST="smtp.gmail.com"
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER="weddinggoosebumps@gmail.com"
SMTP_PASS="your-16-character-app-password"
SMTP_FROM="Wedding Goosebumps <weddinggoosebumps@gmail.com>"
ADMIN_NOTIFICATION_EMAIL="weddinggoosebumps@gmail.com"
```

> **Note on Gmail SMTP**: Enable 2-Step Verification on your Google Account, then generate a 16-character password at [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords) and paste it into `SMTP_PASS`.

### 3. Initialize & Seed Database
```bash
cd frontend

# Push Prisma schema to MySQL
npx prisma db push

# Seed default Super Admin user and initial homepage sections
npx tsx prisma/seed.ts
```

### 4. Run Development Server
```bash
cd frontend
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) for the public site, or [http://localhost:3000/admin](http://localhost:3000/admin) to log in with:
- **Email**: `adminZr@gmail.com` (from seed) or `admin@example.com`
- **Password**: `Zr@2026#` (from seed) or `admin123`

---

## 📡 Complete Backend API Reference

All protected endpoints require an active NextAuth administrative session.

### 💌 Leads & Inquiry APIs
| Method | Endpoint | Access | Description |
|---|---|---|---|
| `POST` | `/api/leads` | Public | Submit new lead inquiry. Dispatches admin email + client confirmation. |
| `GET` | `/api/leads` | Protected | Fetch leads with search, status filter (`?status=New`), pagination, and counts. |
| `GET` | `/api/leads/[id]` | Protected | Get single lead details. |
| `PATCH` | `/api/leads/[id]` | Protected | Update status, internal notes, or assigned staff. |
| `DELETE` | `/api/leads/[id]` | Protected | Delete lead and log activity. |
| `POST` | `/api/leads/[id]/reply` | Protected | Send custom branded email reply to client and mark as Contacted. |

### ✉️ Mail Engine APIs
| Method | Endpoint | Access | Description |
|---|---|---|---|
| `GET` | `/api/mail` | Protected | Get mail configuration status (`?verify=true` to test SMTP connection). |
| `POST` | `/api/mail/test` | Protected | Dispatch a diagnostic test email to verify credentials. |

### 🔍 Activity & Audit Logs APIs
| Method | Endpoint | Access | Description |
|---|---|---|---|
| `GET` | `/api/logs` | Protected | List activity logs with search, module filtering, and pagination. |
| `DELETE` | `/api/logs` | Protected | Prune logs (`?olderThanDays=30` or clear all). |

### 📊 Dashboard & Analytics APIs
| Method | Endpoint | Access | Description |
|---|---|---|---|
| `GET` | `/api/dashboard/stats` | Protected | Aggregate real-time metrics, recent leads, logs, and service health. |

### 📄 Pages & Content APIs
| Method | Endpoint | Access | Description |
|---|---|---|---|
| `GET` | `/api/pages` | Protected | List all static/dynamic pages with section counts. |
| `POST` | `/api/pages` | Protected | Create new page with slug. |
| `GET` | `/api/pages/[id]` | Protected | Fetch page metadata and ordered sections. |
| `PUT` | `/api/pages/[id]` | Protected | Update page metadata, SEO properties, and section layout. |
| `DELETE` | `/api/pages/[id]` | Protected | Delete page and cascading sections. |

### ✍️ Blog Stories APIs
| Method | Endpoint | Access | Description |
|---|---|---|---|
| `GET` | `/api/blog` | Public/Protected | List blog stories with search and status filtering. |
| `POST` | `/api/blog` | Protected | Create new blog post draft. |
| `GET` | `/api/blog/[id]` | Public/Protected | Fetch single blog post by ID with categories and tags. |
| `PUT` | `/api/blog/[id]` | Protected | Update blog post contents, cover image, and SEO. |
| `DELETE` | `/api/blog/[id]` | Protected | Remove blog post. |

### 🌐 Global SEO & Media APIs
| Method | Endpoint | Access | Description |
|---|---|---|---|
| `GET` | `/api/seo` | Protected | Retrieve global Meta and tracking tag settings. |
| `PUT` | `/api/seo` | Protected | Update global Meta, Analytics, GTM, Meta Pixel, and robots.txt. |
| `POST` | `/api/upload` | Protected | Upload media files to `/public/uploads/[folder]`. |
| `GET/DELETE` | `/api/media` | Protected | Browse and manage media assets. |
