# Get Me A Chai

A modern crowdfunding platform for creators, built with Next.js, MongoDB, and Razorpay. Support your favorite creators by sending them a "chai" (donation) and leave a message of encouragement!

---

## 📸 Project Screenshots  

<p align="center">
  <img src="https://github.com/Rishi-Rana01/get-me-a-chai/main/public/Front.Page.png?raw=true" alt="Homepage Screenshot" width="45%" />
  &nbsp; &nbsp;
  <img src="https://github.com/Rishi-Rana01/get-me-a-chai/blob/main/public/Login.png?raw=true" alt="Login Page Screenshot" width="45%" />
  <img src="https://github.com/Rishi-Rana01/get-me-a-chai/blob/main/public/Dashboard.png?raw=true" alt="Dashboard Page Screenshot" width="45%" />
  <img src="https://github.com/Rishi-Rana01/get-me-a-chai/blob/main/public/UserPage.png?raw=true" alt="User Page Screenshot" width="45%" />
  <img src="https://github.com/Rishi-Rana01/get-me-a-chai/blob/main/public/Payment.png?raw=true" alt="Payment Page Screenshot" width="45%" />
</p>

<p align="center">
  🏠 Homepage &nbsp;&nbsp;|&nbsp;&nbsp; 🔑 Login Page
</p>

---

## Features

- **User Authentication:** GitHub OAuth and email/password login via NextAuth.js
- **Profile Management:** Update your profile, set up payment details
- **Payment Integration:** Secure payments using Razorpay
- **Donation Feed:** View recent payments and messages
- **Responsive UI:** Mobile-friendly design with Tailwind CSS
- **Notifications:** Toast notifications for payment success/failure
- **API Routes:** RESTful endpoints for authentication, payments, and user data

---

## Tech Stack

| Layer         | Framework / Library         | Purpose                                  |
|---------------|----------------------------|-------------------------------------------|
| Frontend      | Next.js (App Router)       | React-based SSR/SSG web app               |
| Styling       | Tailwind CSS               | Utility-first CSS framework               |
| Auth          | NextAuth.js                | OAuth (GitHub) & Credentials login        |
| Database      | MongoDB + Mongoose         | NoSQL database & ODM                      |
| Payments      | Razorpay                   | Payment gateway integration               |
| Notifications | react-toastify             | Toast messages for user feedback          |
| State         | React Hooks                | Local state management                    |
| API           | Next.js API Routes         | Serverless backend endpoints              |

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Rishi-Rana01/get-me-a-chai.git
cd get-me-a-chai
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env.local` file in the root directory and add:

```
MONGODB_URI=mongodb://localhost:27017/chai
GITHUB_ID=your_github_client_id
GITHUB_SECRET=your_github_client_secret
NEXTAUTH_SECRET=your_nextauth_secret
NEXT_PUBLIC_KEY_ID=your_razorpay_key_id
KEY_ID=your_razorpay_key_id
KEY_SECRET=your_razorpay_key_secret
NEXT_PUBLIC_URL=http://localhost:3000
```

### 4. Run the development server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to view the app.

---

## Folder Structure

```
├── app/                 # Next.js app router pages & layouts
├── component/           # React components (Navbar, PaymentPage, etc.)
├── models/              # Mongoose models (User, Payment)
├── actions/             # Server actions (useractions.js)
├── db/                  # Database connection logic
├── public/              # Static assets
├── styles/              # Global CSS (Tailwind)
├── .env.local           # Environment variables
```

---

## Libraries Used

- [Next.js](https://nextjs.org/)
- [React](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [NextAuth.js](https://next-auth.js.org/)
- [Mongoose](https://mongoosejs.com/)
- [Razorpay](https://razorpay.com/docs/)
- [react-toastify](https://fkhadra.github.io/react-toastify/)
- [bcryptjs](https://github.com/dcodeIO/bcrypt.js)

---

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

---

## License
