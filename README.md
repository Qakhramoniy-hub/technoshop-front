This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Authentication

This project uses **localStorage-based authentication** without a backend:

### Features
- User registration and login stored in browser's localStorage
- Authentication state persists across sessions
- Admin user support
- Automatic duplicate email detection
- Logout functionality

### Testing Admin Access

To test admin features, you can create an admin user manually:

1. Open browser DevTools (F12)
2. Go to Console
3. Run this JavaScript:

```javascript
const adminUser = {
  email: "admin@technoshop.com",
  password: "admin123",
  firstName: "Admin",
  lastName: "User",
  isAdmin: true
};

const users = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
adminUser.id = Date.now().toString();
users.push(adminUser);
localStorage.setItem('registeredUsers', JSON.stringify(users));
localStorage.setItem('access_token', adminUser.id);
localStorage.setItem('user_info', JSON.stringify({
  id: adminUser.id,
  email: adminUser.email,
  firstName: adminUser.firstName,
  lastName: adminUser.lastName,
  isAdmin: true
}));

console.log('Admin user created!');
```

4. Refresh the page to see the admin login state

### Creating Regular Users

Simply register through the `/register` page - the user will be stored automatically in localStorage.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
