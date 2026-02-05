# CHROME-EXTENSION-FOR-TIME-TRACKING-AND-PRODUCTIVITY-ANALYTICS



COMPANY: CODTECH IT SOLUTIONS

NAME: Thakur Aditya Vithalrao

INTERN ID: CTIS1924

DOMAIN: Full Stack Web Development

DURATION: 6 Weeks

MENTOR: NEELA SANTOSH


DESCRIPTION OF TASK PERFORMED:
As a final project for my CODTECH internship, I developed "Time Tracking & Productivity Analysis," a sophisticated full-stack Chrome extension designed to monitor user web activity and provide actionable productivity insights. The project architecture is divided into three core components: the browser extension, a Node.js backend, and a dynamic analytics dashboard.

Technical Architecture & Implementation:
Browser Extension (Frontend): Built using Manifest V3, the extension utilizes background.js to monitor tab changes and calculate time spent on specific hostnames in real-time. It leverages Chrome Storage APIs for local caching and the Fetch API to synchronize data with the backend server.

Backend (Server-Side): Developed with Node.js and Express.js, the backend features a robust RESTful API. I implemented logRoutes.js to handle POST requests for data synchronization and GET requests for retrieving analytics. CORS was configured to ensure secure communication between the browser extension and the local server.

Database (Storage): I integrated MongoDB using the Mongoose ODM to store user activity logs persistently. This allows for scalable data management and complex querying, ensuring that user history is preserved across browser sessions.

Analytics Dashboard: The dashboard serves as the visual centerpiece, featuring a modern Glassmorphism UI designed with HTML5 and CSS3. Using Chart.js, I implemented an interactive pie chart that dynamically visualizes the distribution of time spent across different websites.

Challenges Overcome:
Real-Time Synchronization: One of the primary challenges was ensuring that data captured in the background script was accurately transmitted to the database without performance lag. I solved this by implementing an efficient syncLogs function in the background service worker.

Security & Policy: Navigating Chrome’s strict Content Security Policy (CSP) was crucial. I moved away from inline event handlers in popup.html to modular JavaScript listeners in popup.js to ensure the extension remained functional and secure.

Data Visualization: Designing the logic to aggregate raw timestamps into meaningful "minutes spent" per domain required careful data manipulation in the frontend script.

Conclusion:
This project demonstrates the seamless integration of Full Stack technologies to solve a real-world productivity problem. By combining the Chrome Extension API, Node.js, and MongoDB, I created a tool that not only tracks data but translates it into a visually compelling user experience. The final product is a lightweight, secure, and highly responsive system that empowers users to understand and optimize their digital habits.

OUTPUT OF THE TASK

<img width="731" height="365" alt="Image" src="https://github.com/user-attachments/assets/3499b6ff-f30c-4eb9-ba05-211320ae1d0a" />

<img width="1919" height="1079" alt="Image" src="https://github.com/user-attachments/assets/f18534d0-3085-4a60-82b1-ef05b6930c85" />

