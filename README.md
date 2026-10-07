# 🌐 Manoj L Shetty — Fullstack Developer Portfolio & Engineering Blog

[![Live Portfolio Website](https://img.shields.io/badge/Live%20Website-Click%20Here%20to%20View-2ea44f?style=for-the-badge&logo=github)](https://manojlshetty7-bit.github.io/)
[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Active-success?style=for-the-badge&logo=githubpages)](https://manojlshetty7-bit.github.io/)

> 🚀 **Live Portfolio Website URL:** **[https://manojlshetty7-bit.github.io/](https://manojlshetty7-bit.github.io/)**  
> *(Published live via GitHub Pages — click the link above to view the live website)*

**Course:** Portfolio Building (`B25CS0311`) | 3rd Semester B.Tech CSE | **REVA University**  
**Student:** Manoj L Shetty  
**Email:** [manojlshetty7@gmail.com](mailto:manojlshetty7@gmail.com)  
**Live Website:** [https://manojlshetty7-bit.github.io/](https://manojlshetty7-bit.github.io/)  

---

## 🌟 Overview
This project contains a complete, production-grade **Frontend and Backend** personal developer portfolio website designed for **Activity 12: Building Your Portfolio Blog by Prompting an AI Assistant**.

All deliverables from the academic briefs and laboratory activities (Activities 1 through 12) are preserved, with verified links to all repositories and competitive coding profiles.

---

## 🔗 Attached Profiles & Repositories

* **Live Portfolio Website:** [https://manojlshetty7-bit.github.io/](https://manojlshetty7-bit.github.io/)
* **GitHub Profile:** [https://github.com/manojlshetty7-bit](https://github.com/manojlshetty7-bit)
* **LinkedIn Profile:** [https://www.linkedin.com/in/manoj-l-shetty-00b6bb43a](https://www.linkedin.com/in/manoj-l-shetty-00b6bb43a?utm_source=share_via&utm_content=profile&utm_medium=member_android)
* **LeetCode Profile:** [https://leetcode.com/u/_manoj_l_/](https://leetcode.com/u/_manoj_l_/)
* **HackerRank Profile:** [https://www.hackerrank.com/profile/manojlshetty7](https://www.hackerrank.com/profile/manojlshetty7)
* **LeetCode Solutions Repo:** [https://github.com/manojlshetty7-bit/leetcode-solutions](https://github.com/manojlshetty7-bit/leetcode-solutions)
* **HackerRank Solutions Repo:** [https://github.com/manojlshetty7-bit/HackerRank-3rdSem-Portfolio](https://github.com/manojlshetty7-bit/HackerRank-3rdSem-Portfolio)
* **Hello World C Repo (Activity 1 & 2):** [https://github.com/manojlshetty7-bit/hello-world-c](https://github.com/manojlshetty7-bit/hello-world-c)
* **Graphics Programming Repo:** [https://github.com/manojlshetty7-bit/graphics_edit](https://github.com/manojlshetty7-bit/graphics_edit)

---

## 🚀 How to Run the Website (Frontend & Backend)

### Method 1: One-Click Launcher (macOS / Linux)
```bash
chmod +x start.sh
./start.sh
```
This automatically detects Python 3 (or Node.js), initializes SQLite, and launches the server.

### Method 2: Python Backend (macOS & Windows)
Uses the standard library (`http.server` + `sqlite3`) — zero external dependencies needed:
```bash
python3 server.py
```
Open [http://localhost:5000](http://localhost:5000)

### Method 3: Node.js Backend
Uses native `node:http` and `node:sqlite` — zero npm packages needed:
```bash
node server.js
```
Open [http://localhost:3000](http://localhost:3000)

### Method 4: One-Click Launcher (Windows)
Double-click `start.bat`:
```text
start.bat
```

---

## 🔌 Backend REST API Reference

The backend serves both the static frontend and dynamic JSON APIs:

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/profile` | Student identification, university, bio, and social links |
| `GET` | `/api/activities` | Studio lab activities (1 to 12) with repo links & badges |
| `GET` | `/api/projects` | Curated repositories with technologies and links |
| `GET` | `/api/skills` | Categorized technical skills inventory |
| `GET` | `/api/stats` | LeetCode, HackerRank, and GitHub summary metrics |
| `GET` | `/api/all` | Complete portfolio payload in one call |
| `POST` | `/api/contact` | Submits message to SQLite database (`messages.db`) |
| `GET` | `/api/messages` | Retrieves visitor contact messages from SQLite database |

---

## 💾 Database Architecture (`messages.db`)

The backend automatically creates and maintains a persistent SQLite database:
```sql
CREATE TABLE IF NOT EXISTS messages (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT,
  message TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```
Visitors or recruiters submitting the contact form on your portfolio website have their inquiries stored directly in `messages.db`. You can view them anytime via the **📬 Inbox** button on the website navigation bar or via `/api/messages`.

---

## 🌐 Hosted Live on GitHub Pages

This portfolio is hosted live via **GitHub Pages**:
- **Live URL:** [https://manojlshetty7-bit.github.io/](https://manojlshetty7-bit.github.io/)
- **Repository:** [https://github.com/manojlshetty7-bit/manojlshetty7-bit.github.io](https://github.com/manojlshetty7-bit/manojlshetty7-bit.github.io)
- Hosted directly from the repository's `main` branch.
