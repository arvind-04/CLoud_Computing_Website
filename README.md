# 🌐 Terraform Cloud Setup Website

🚀 [Live Demo](https://v0-terraform-website-setup.vercel.app)

This is a sleek and informative website built to demonstrate the setup and configuration of **Terraform Cloud**, explaining how to automate cloud infrastructure deployments using Infrastructure as Code (IaC).

---

## ✨ Features

- 💡 Introduction to Terraform Cloud
- 🧱 Infrastructure as Code Concepts
- 🔐 Environment Variables and Secrets (without exposing them)
- 🌀 Real-time Explanation Flow
- 📦 Clean and Modern UI
- ⚡ Built with **Next.js**, **TypeScript**, and **Tailwind CSS**
- 🌍 Deployed on **Vercel**

---

## 🛠️ Tech Stack

| Tech             | Description                    |
|------------------|--------------------------------|
| Next.js          | React framework for SSR/SSG    |
| TypeScript       | Type-safe JavaScript           |
| Tailwind CSS     | Utility-first styling          |
| Vercel           | Hosting and CI/CD              |
| Terraform        | Infrastructure as Code tool    |

---

## 🚧 Project Structure

app/
├── page.tsx # Main landing page
├── components/ # Reusable components
├── styles/ # Tailwind and global CSS
public/ # Static assets


---

## 📦 Getting Started Locally

# Clone the repo
git clone https://github.com/arvind-04/CLoud_Computing_Website
cd terraform-website

# Install dependencies
npm install

# Run in development
npm run dev
Open http://localhost:3000 in your browser.

🌍 Deployment

This project is deployed on Vercel for fast and easy hosting.

# Vercel CLI (if needed)
npm i -g vercel
vercel
🔒 Security Note

Sensitive variables (like API keys or AWS credentials) must be stored in a .env.local file and never hard-coded or pushed to GitHub.

AWS_ACCESS_KEY_ID=your_key_here
AWS_SECRET_ACCESS_KEY=your_secret_here
Use process.env.AWS_ACCESS_KEY_ID in your app safely.

