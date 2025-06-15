🚀 Features
🔐 JWT-based authentication

👤 Job Seeker and Employer roles

📝 Job creation and application system

📄 Resume view/download

🧠 Employer dashboard with applicant tracking

🎨 Chakra UI responsive design

🐳 Dockerized for easy deployment

🔧 Prerequisites
Docker & Docker Compose installed

Java 17

Node.js (v18+) and npm or pnpm for frontend development

🐳 Running Locally with Docker
1. Build the backend JAR
   bash
   Copy
   Edit
   cd backend
   ./gradlew build       # or mvn clean package if you're using Maven
2. Start the stack (backend + PostgreSQL)
   bash
   Copy
   Edit
   docker compose up --build
   Your backend will be live at:
   👉 http://localhost:8080

🌐 Running the Frontend
In a separate terminal:

bash
Copy
Edit
cd frontend
pnpm install          # or npm install
pnpm dev              # or npm run dev
Frontend live at:
👉 http://localhost:3000

Make sure the frontend talks to:
http://localhost:8080/api

Update your .env.local:

env
Copy
Edit
NEXT_PUBLIC_API_URL=http://localhost:8080/api

Built in 1 day.