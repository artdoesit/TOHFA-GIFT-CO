# TOHFA GIFTING CO - Premium Gift E-commerce Platform

Welcome to the **TOHFA GIFTING CO** official repository. This is a high-end, production-ready e-commerce platform built with Next.js 14, Tailwind CSS, and Firebase.

## 🚀 Live Demo & Deployment
This project is optimized for a seamless deployment on **Vercel**. 

### Deployment Steps:
1. **Environment Variables**: Copy `.env.example` to `.env.local` and fill in your Firebase credentials.
2. **GitHub**: Push this repository to your GitHub account.
3. **Vercel**: Import the project and add your environment variables in the Vercel dashboard.

## ✨ Features
- **Premium Glassmorphic UI**: Mesh gradients, backdrop-blur effects, and a stunning 3D aesthetic.
- **Dynamic Shop Page**: Real-time filtering by category, price, and search terms.
- **3D Product Interaction**: A custom 3D Flip Card modal for viewing product details.
- **Secure Admin Panel**: Manage your products through a protected dashboard (locked to `admin@tohfagifting.co`).
- **One-Click Ordering**: Integrated WhatsApp checkout and UPI payment deep-linking.
- **Mobile Optimized**: Zero lag, iOS-friendly inputs, and fully responsive layouts.

## 🛠️ Tech Stack
- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS 4.0
- **Animations**: Framer Motion
- **Backend**: Firebase (Firestore & Authentication)
- **Icons**: Lucide React

## 🔐 Firebase Security Setup
To protect your admin panel, use the following Firestore rules:

```javascript
service cloud.firestore {
  match /databases/{database}/documents {
    match /products/{product} {
      allow read: if true;
      allow write: if request.auth != null && request.auth.token.email == "admin@tohfagifting.co";
    }
  }
}
```

---
Built with ❤️ for **TOHFA GIFTING CO**.
