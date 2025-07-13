# 🏢 Osman Premium Property

A full-featured apartment rental and building management web application with secure role-based access, agreement management, Stripe payments, and announcements. Built with the MERN stack.

## 🔗 Live Links

- 🌐 Live Site: [View Website](https://osman-premium-property.web.app/)

---
## 👨‍💼 Admin Email And Pass 

. Email : superadmin@gmail.com
. Password : Admin123

---

## 🚀 Features

### 👤 User
- Browse available apartments with filters and pagination
- Send rental agreement requests
- Track agreement status
- Pay monthly rent using Stripe
- Apply coupon codes for rent discounts
- View announcements and personal dashboard

### 👨‍💼 Admin
- Add/manage apartments with images and rent details
- Approve or reject rental agreements
- Add and manage coupons
- Create and manage announcements
- View platform statistics (users, rooms, rent data, etc.)

### 🧑‍💼 Member
- Access member-only dashboard
- View personal profile and agreement info
- Pay rent monthly (one payment per month)
- View payment history with receipts
- Access announcements

---

## 🛠️ Tech Stack

- **Frontend**: React, Tailwind CSS, React Router, Axios, SweetAlert2
- **Backend**: Node.js, Express.js, MongoDB, Mongoose
- **Authentication**: Firebase Auth, JWT
- **Payment Gateway**: Stripe
- **Other**: React Query, SwiperJS, Toastify


## 🔐 Environment Variables

### 🔸 Client `.env`

VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_payment_Key=your_stripe_publishable_key
VITE_image_upload_key= your imgbb api key


---

## 🧪 Setup Instructions

### 🔧 Client
```bash
cd client
npm install
npm run dev

