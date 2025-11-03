

<p align="center">
  <img src="https://fra.cloud.appwrite.io/v1/storage/buckets/690905c400367db1d89a/files/690906000034465b9dde/view?project=68321d04002597a140d0&token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbklkIjoiNjkwOTA2MGY3OWJjZGY2NTlmYWEiLCJyZXNvdXJjZUlkIjoiNjkwOTA1YzQwMDM2N2RiMWQ4OWE6NjkwOTA2MDAwMDM0NDY1YjlkZGUiLCJyZXNvdXJjZVR5cGUiOiJmaWxlcyIsInJlc291cmNlSW50ZXJuYWxJZCI6IjQ3MzAzOjEiLCJleHAiOjE3OTM3MzUwNDh9.fkUQkuq78_d-4j3y1cjIiVjOXyYXc2Pvl95pHzZGEhY" alt="Doone Mascot Logo - Simple Done" width="380"/>
</p>

# Doone: Simply Done.

**The elegant, simple, and intelligent to-do manager for Android.**

Doone is built on the philosophy that productivity tools should be beautiful, fast, and effortless. We leverage the power of modern mobile development and emerging AI techniques to take the friction out of task management.

## Features at a Glance

* **Local-First Architecture:** Add, edit, and check off tasks even when you're offline. Changes seamlessly sync with the cloud once connectivity is restored.
* **Intuitive & Well-Designed UI:** A focus on clean design, smooth animations, and a clutter-free experience.
* **Dual Theming:** Supports both **Light Mode** and **Dark Mode** out of the box with a consistent design system.
* **Smart Task Capture (Future):** Built with Natural Language Processing (NLP) in mind to parse dates and times directly from your typed text.
* **Predictive Prioritization (Future):** AI-driven suggestions for your next most important task, based on your habits and due dates.

## Tech Stack & Architecture

This repository contains the source code for the **Doone** Android application.

| 🧩 Area | ⚙️ Technology / Library | 📝 Notes |
|:--|:--|:--|
| **Frontend** | ![React Native](https://img.shields.io/badge/React%20Native-20232A?logo=react&logoColor=61DAFB) | Cross-platform app development. |
| **Styling** | ![Nativewind](https://img.shields.io/badge/Nativewind%20(Tailwind%20CSS)-06B6D4?logo=tailwindcss&logoColor=white) | Rapid, consistent, themable styling. |
| **Backend** | ![Appwrite](https://img.shields.io/badge/Appwrite-F02E65?logo=appwrite&logoColor=white) | BaaS for Auth, DB, and Realtime APIs. |
| **Offline DB** | ![WatermelonDB](https://img.shields.io/badge/WatermelonDB%20/%20RxDB-181717?logo=sqlite&logoColor=white) | Reactive local database for offline support. |
| **Language** | ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white) | Strongly typed modern language. |

---

## Getting Started

### Prerequisites

* Node.js (v18+)
* Yarn or npm
* React Native CLI / Expo CLI (if applicable)
* A running **Appwrite** instance (Cloud or Self-Hosted)

### Installation

1.  **Clone the Repository:**
    ```bash
    git clone git@github.com:andamagodwin/doone-app.git
    cd doone-app
    ```

2.  **Install Dependencies:**
    ```bash
    yarn install
    # or
    npm install
    ```

3.  **Appwrite Configuration:**
    Create a file named `.env` in the root directory and add your Appwrite credentials:
    ```
    # .env
    APPWRITE_ENDPOINT=https://[Appwrite Endpoint]/v1
    APPWRITE_PROJECT_ID=[Your Project ID]
    ```
    *(Note: You will also need to configure your Appwrite database collections and attributes.)*

4.  **Run the App:**
    ```bash
    npm start
    ```

## Branch Strategy

We follow a Gitflow-lite approach: `main` is production, `develop` is for integration. New work is done on feature branches.

* `main`: Production releases only.
* `develop`: Integration branch for tested features.
* `feature/*`: New features and components.

## License

Distributed under the MIT License. See `LICENSE` for more information.




---

### Doone: Simply Done.