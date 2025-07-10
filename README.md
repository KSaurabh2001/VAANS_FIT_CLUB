# 🏋️ VVANS FIT CLUB

An advanced, full-featured **Gym Management System** built using **React, Redux Toolkit, Spring Boot**, and **MySQL**. This project was crafted with attention to scalability, modularity, and real-world use cases including user roles, class bookings, diet/workout plans, authentication, and media uploads.

---

## 🚀 Features

### 👥 User Roles:
- **Gym Owner**: Manage trainers, classes, plans, and gym members.
- **Trainer**: View assigned clients, upload workouts and diet plans.
- **Gym Members**: Book sessions, view diet/workout plans, profile management.

### 📅 Class & Session Management:
- Add/edit/delete classes
- Upload class images (via Cloudinary)
- Book sessions & see history

### 🧾 Membership & Payment:
- Add/update membership plans
- Assign plans to users
- Session-based usage tracking

### 🍽️ Diet & 🏋️ Workout Plans:
- Trainer uploads individual plans for each user
- Users view assigned plans in profile

### 🔐 Authentication:
- JWT-based login with role validation
- Secure routes with auto-refresh via token

### 🖼️ Media Upload:
- Profile image/class image uploads using Cloudinary

### 🌐 Tech Stack

| Frontend     | Backend       | Database | Auth | Media |
|--------------|---------------|----------|------|-------|
| React + Vite | Spring Boot   | MySQL    | JWT  | Cloudinary |
| Redux Toolkit| Spring Security|          |      |       |

---


## 🛠️ Installation & Setup

### Backend (Spring Boot)

```bash
cd backend
./mvnw spring-boot:run

Ensure:

MySQL is running

application.properties has correct DB config
```
### Frontend (React )
```
cd frontend
npm install
npm run dev
```

## 📂 Project Structure

```
VVANS_FIT_CLUB/
├── backend/            # Spring Boot App
│   ├── controller/
│   ├── model/
│   ├── repository/
│   └── security/
├── frontend/           # React App
│   ├── components/
│   ├── redux/
│   ├── pages/
│   └── App.jsx

```
🤝 Acknowledgements
React & Redux Toolkit Docs

Spring Boot & Spring Security Docs

Cloudinary for media handling

Inspiration from real-world fitness apps

🙌 Author
Saurabh Kumar
LinkedIn • GitHub
