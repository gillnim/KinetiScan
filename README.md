# KinetiScan

## Overview

KinetiScan is an application designed to help users analyze their joint movements and track their range of motion for recovery purposes. It is primarily focused on athletes and individuals undergoing rehabilitation. By using computer vision trainable models, the app provides real-time feedback, generates scores, and allows users to track their progress over time.

### Problem Space

People recovering from injuries or improving athletic performance often need to monitor their joint movements and range of motion closely. However, it is challenging to track this progress accurately without medical assistance. KinetiScan solves this by allowing users to record their movements, analyze their joint angles, and receive feedback on how well their motion aligns with optimal ranges. This can speed up recovery and ensure exercises are done correctly.

### User Profile

- Athletes and fitness enthusiasts tracking movement performance
- People recovering from injury needing to monitor their joint movements
- Physical therapists or healthcare professionals who want to monitor patients remotely

### Features

- **Real-time Joint Movement Tracking**: Capture and track joint movements using the device’s camera.
- **Range of Motion Analysis**: Analyze the user’s joint angles and provide feedback on the range of motion.
- **Scoring System**: Calculate scores based on movement accuracy and compare them to optimal ranges.
- **Progress Tracking**: Users can view historical data and track their recovery progress over time.

## Implementation

### Tech Stack

- **Frontend**: React.js for a responsive UI, HTML5 Media API for camera access
- **Backend**: Node.js (Express) for handling API requests and data
- **Database**: MongoDB (NoSQL) to store user data, recorded videos, and movement history
- **Computer Vision**: TensorFlow.js and MediaPipe for real-time pose estimation and movement analysis
- **AI/ML**: TensorFlow.js for client-side analysis and OpenAI API for feedback generation
- **Security**: JWT-based authentication? HTTPS for secure communication


### APIs

- **Media API**: HTML5 Media API for camera access and recording
- **Machine Learning API**: TensorFlow.js for movement analysis
- **Text Generation API**: OpenAI API for feedback reports

### Sitemap

- **HomePage**
- **LoginPage**
- **RecordingPage**
- **ResultsPage**
- **ExportPage**

### Mockups

Provide visuals of your app's screens. You can use pictures of hand-drawn sketches, or wireframing tools like Figma.

### Data

Describe your data and the relationships between the data points. You can show this visually using diagrams, or write it out. 

### Endpoints

List endpoints that your server will implement, including HTTP methods, parameters, and example responses.

## Roadmap

1. **Create Frontend**  
    - React project setup with routes and boilerplate pages
    - Integrate camera access using HTML5 Media API
2. **Create Backend**  
    - Set up Node.js (Express) server with API routing
    - Integrate MongoDB/PostgreSQL for storing user and movement data
3. **Real-Time Movement Tracking**  
    - Implement computer vision for detecting joint movements
    - Integrate TensorFlow.js or MediaPipe for pose estimation
4. **Range of Motion Analysis**  
    - Build functionality to calculate and track joint angles from recorded videos
5. **Scoring System**  
    - Create algorithm for scoring user movements based on optimal range of motion
6. **Progress Reports and Visualizations**  
    - Use D3.js or Chart.js to visualize progress over time

---

## Future Implementations
- **Exportable Reports**: Generate and send detailed progress reports to professionals or for personal records.
- **User Authentication**: Secure login and user data protection.
- **Mobile Compatibility**: A mobile-friendly design to allow users to easily record movements from their phones.
- **Other Niice-to-Haves**:
- Integration with health tracking devices
- Gamification: adding achievements for users
- Support for multiple joint movements (shoulder, knee, etc.)
- Live feedback during exercises