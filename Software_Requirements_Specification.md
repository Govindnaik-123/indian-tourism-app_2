# Software Requirements Specification (SRS)
## Project: Indian Tourism Application

### 1. Introduction

#### 1.1 Purpose
This Software Requirements Specification (SRS) document provides a comprehensive overview of the "Indian Tourism Application." It details the functional and non-functional requirements, technical stack, and system architecture to guide development, maintenance, and future enhancements.

#### 1.2 Scope
The Indian Tourism Application is an interactive, AI-driven web platform designed to help users discover and plan travel across 31 Indian states. The system features a highly immersive 3D user interface, emotion-based destination recommendations, a personalized travel dashboard, an interactive travel planner, and an administrative dashboard for user management.

### 2. Overall Description

#### 2.1 Technical Stack
*   **Frontend Development:** Next.js (App Router), React 19, TypeScript
*   **Styling & UI:** Tailwind CSS, Framer Motion (for animations), Radix UI
*   **3D Graphics & Interactions:** Three.js, React Three Fiber, Spline
*   **Backend / API:** Next.js API Routes (Node.js ecosystem)
*   **Database:** MongoDB, Mongoose ORM
*   **Authentication:** JWT, bcryptjs, Google Auth Library, Zustand (for client-side state management)

#### 2.2 User Classes and Characteristics
*   **Guest User:** Can view the landing page, interact with the 3D globe and Spline models, and view the emotion-based mood selector (but requires login to view specific destination details).
*   **Registered User (Traveler):** Can log in, access the dashboard, save favorite destinations, use the travel planner, and track travel statistics (places visited, reviews written).
*   **Administrator:** Can access the protected admin panel to view registered users, platform usage statistics, and monitor the system.

### 3. System Features

#### 3.1 Authentication & User Management
*   **Description:** Secure sign-up and login functionality.
*   **Requirements:**
    *   Standard email/password authentication with hashed passwords (bcryptjs).
    *   OAuth integration (Google Auth) for quick access.
    *   Client-side session management using Zustand.

#### 3.2 Emotion-Based Destination Discovery
*   **Description:** Recommends destinations based on the user's current mood and the current season.
*   **Requirements:**
    *   Interactive "Mood Selector" UI on the landing page.
    *   Mapping logic that links specific moods (e.g., peaceful, adventurous, spiritual) to predefined Indian states or destinations.

#### 3.3 Immersive 3D User Interface
*   **Description:** Engaging 3D elements to enhance the aesthetic and interactive experience.
*   **Requirements:**
    *   **3D Globe (`GlobeScene`):** Interactive spinning globe on the landing page.
    *   **Spline Integration (`SplineScene`):** Interactive 3D character/model that tracks the user's mouse movements.

#### 3.4 Personalized Travel Dashboard
*   **Description:** A central hub for authenticated users to view their profile and activity.
*   **Requirements:**
    *   Display of user's name and email.
    *   Dynamic travel statistics: Destinations Visited, Saved Places, Average Rating, and Reviews Written.
    *   A grid of "Recommended For You" states, uniquely shuffled from the 31 Indian states pool.
    *   A "Saved Escapes" section showing bookmarked states.

#### 3.5 Interactive Travel Planner
*   **Description:** A tool for users to plan their upcoming trips.
*   **Requirements:**
    *   Selection mechanism based on the comprehensive list of 31 Indian states.
    *   Persistence of planned trip data across page reloads and sessions (saved to the user's database record).

#### 3.6 Administrator Dashboard
*   **Description:** A secure monitoring panel for platform administrators.
*   **Requirements:**
    *   Protected by a "Secret Password" (bypassing standard user auth).
    *   Live fetching of registered users from MongoDB.
    *   Data table displaying User Name, Email, and Joined Date.
    *   Live Indian Standard Time (IST) clock display.
    *   Total registered users count.

### 4. Non-Functional Requirements

#### 4.1 UI/UX & Aesthetics
*   **Premium Design:** The application must utilize modern design paradigms, including glassmorphism, dynamic micro-animations (Framer Motion), and cinematic hero sections.
*   **Responsiveness:** All pages must render perfectly across mobile, tablet, and desktop devices.
*   **Visual Consistency:** Consistent use of brand colors (accents of gold, deep blues), modern typography, and high-quality imagery.

#### 4.2 Performance & Optimization
*   **Lazy Loading:** Heavy 3D components (Spline, Three.js) must be dynamically imported with SSR disabled to prevent blocking the initial page load.
*   **Intersection Observers:** Animations and heavy renders should only trigger when elements scroll into the viewport (`InView` components).

#### 4.3 Security
*   **Route Protection:** Dashboard and planner routes must strictly verify user authentication before rendering. The Admin route must have isolated password validation.
*   **Data Protection:** Sensitive user data and passwords must be securely encrypted in the database. Environment variables must be used for all database URIs and API keys.

### 5. Future Enhancements
*   Implementation of automated order/booking confirmation emails if transactional features are added.
*   Integration with live weather APIs to provide real-time climate data for the travel planner.
*   Expansion of the travel journal feature to allow photo uploads and public sharing of itineraries.
