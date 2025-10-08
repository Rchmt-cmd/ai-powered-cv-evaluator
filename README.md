# 🧠 AI-Powered CV Evaluator

This project is an **AI-powered CV and Project Report Evaluator** built using **Express.js**, **Ragie.AI**, and **GroqCloud**.  
An AI-powered evaluator that analyzes candidate CVs and project reports using Large Language Models (LLMs) and Retrieval-Augmented Generation (RAG). This system generates relevance scores and human-like feedback based on the organization’s internal reference documents.

---

## 🚀 Tech Stack

- **Backend Framework:** Express.js (Node.js)
- **Database:** MySQL
- **RAG Service:** [Ragie.AI](https://ragie.ai)
- **LLM Inference:** [GroqCloud](https://groq.com)
- **File Upload:** Multer
- **Runtime:** Node.js v20.18+

---

## ⚙️ Setup Instructions

### 1️⃣ Project Setup

1. **Clone Repository**

   ```bash
   git clone https://github.com/Rchmt-cmd/ai-powered-cv-evaluator.git
   cd ai-powered-cv-evaluator
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Setup Environment Variables**

   - Copy `.env.example` to `.env`
     ```bash
     cp .env.example .env
     ```
   - Fill in the required environment variables:
     ```env
     PORT=8000
     MYSQL_HOST=localhost
     MYSQL_USER=root
     MYSQL_PASSWORD=yourpassword
     MYSQL_DATABASE=cv_evaluator
     RAGIE_API_KEY=your_ragie_api_key
     GROQ_API_KEY=your_groq_api_key
     ```

4. **Run Development Server**
   ```bash
   npm run dev
   ```

Your app should now be running on:

```
http://localhost:8000
```

---

### 2️⃣ MySQL Setup

1. **Start MySQL Service**
   Make sure MySQL is installed and running (locally or remotely).
2. **Create Schema**
   Run the `.sql` script provided in `/database` folder:
   ```bash
   mysql -u root -p cv_evaluator < ./database/schema.sql
   ```

---

### 3️⃣ Ragie.AI Setup

1. **Create an Account**  
   Go to [https://ragie.ai](https://ragie.ai) and sign up.

2. **Create API Key**  
   Generate an API key in your Ragie dashboard and add it to your `.env`:

   ```env
   RAGIE_API_KEY=your_ragie_api_key
   ```

3. **Upload Documents**  
   Upload the following documents into Ragie (as separate collections or datasets):
   - Job Description documents
   - Scoring Rubric documents
   - Case Study Brief (for Project Evaluation)

---

### 4️⃣ GroqCloud Setup

1. **Create an Account**  
   Visit [https://console.groq.com](https://console.groq.com) and register.

2. **Create API Key**  
   Generate a GroqCloud API key and add it to `.env`:

   ```env
   GROQ_API_KEY=your_groq_api_key
   ```

3. **Default Model**  
   The project uses the model `openai/gpt-oss-120b` through Groq SDK integration.  
   You can change the model inside the evaluator controller if needed.

---

## 📡 API Endpoints

| Method | Endpoint      | Description                            |
| ------ | ------------- | -------------------------------------- |
| POST   | `/upload`     | Upload candidate CV and Project Report |
| POST   | `/evaluate`   | Start evaluation pipeline              |
| GET    | `/result/:id` | Get evaluation or summarization result |

---

## 🏗️ System Architecture

The system is composed of the following components:

### a. Web Service (Express.js)

Express.js serves as the main web service that exposes API endpoints and runs the evaluation pipeline. It provides fast and modular processing for each request.

### b. RAG Service (Ragie.AI)

Ragie.AI acts as a managed RAG service that retrieves the most relevant context chunks from uploaded internal documents, allowing accurate and efficient evaluation without building a custom retriever.

### c. LLM Service (GroqCloud)

GroqCloud provides high-speed LLM inference for real-time evaluation. It powers both the **evaluator** and **summarizer** pipelines using the Groq SDK.

### d. Database (MySQL)

MySQL stores document data, evaluation results, and processing progress. This ensures asynchronous task execution and prevents blocking on the web service.

### e. Evaluation Pipeline

There are two main pipelines in this project:

1. **Evaluator Pipeline** — Evaluates the candidate’s CV and project report based on job description and rubric context.
2. **Summarizer Pipeline** — Generates an overall summary and recommendations from the evaluator results.

---

## 🧠 Pipeline Overview

1. **Document Query** → Document path is retrieved from the database.
2. **Load Document** → File is loaded from object storage.
3. **Text Parsing** → Document converted to raw text.
4. **Context Retrieval** → Ragie.AI provides relevant context chunks.
5. **Prompt Construction** → Raw text + context sent to LLM.
6. **LLM Inference (GroqCloud)** → Model processes evaluation.
7. **Result Storage** → JSON response saved to MySQL.

---

## ✨ Author

**Rachmat Hidayat Abduh**  
Full-Stack Developer
📧 [Email: rachmath.059@gmail.com]  
💼 [LinkedIn: www.linkedin.com/in/rchmt]
