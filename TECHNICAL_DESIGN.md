SoleGuard AI — Technical Design Document

1. Project Overview

Project Name: SoleGuard AI – Smart Foot-Pressure Monitoring for Diabetic Foot Ulcer Prevention

Domain: Healthcare & Wellbeing

Technology Stack: HTML, CSS, JavaScript

SoleGuard AI is a web-based prototype designed to demonstrate how foot-pressure monitoring could help identify prolonged high-pressure areas and encourage timely foot-care awareness among people with diabetes.

The prototype demonstrates a pressure heatmap, simulated sensor readings, threshold-based alerts, and pressure trend visualization.

Important: This is an educational prototype. It currently uses simulated readings and is not a clinically validated medical device. It does not diagnose or predict diabetic foot ulcers.

2. Problem Statement

People with diabetes may experience reduced foot sensation and other complications that increase the risk of foot injuries and ulcers. Pressure-related changes can be difficult to notice without appropriate monitoring.

SoleGuard AI demonstrates a possible digital monitoring interface that could help users understand pressure patterns and recognize when further assessment may be appropriate.

3. System Architecture

The current prototype uses a browser-based architecture.

       Simulated Pressure Data
                 |
                 v
       JavaScript Processing
                 |
        +--------+--------+
        |        |        |
        v        v        v
     Pressure  Threshold  Trend
     Heatmap    Checking   Analysis
        |        |        |
        v        v        v
       Visual Alerts and Dashboard
                 |
                 v
        User Interface
       HTML + CSS + JavaScript

The diagram describes the intended prototype workflow. It does not imply that real pressure sensors or a medical prediction model are connected.

4. Main System Components

4.1 User Interface

The web interface provides a dashboard for displaying pressure information, visual indicators, alerts, and educational messages.

Technologies: HTML and CSS.

4.2 Simulated Sensor Data

The prototype uses sample pressure values to demonstrate how a future pressure-monitoring system might work.

The sample values are generated for demonstration and are not measurements taken from a real person.

4.3 Pressure Heatmap

The heatmap concept uses different visual intensities to represent different pressure values across foot regions.

This helps demonstrate how pressure distribution might be presented to a user.

4.4 Threshold-Based Alerts

JavaScript can compare demonstration readings against a configured example threshold and display a warning when the condition is met.

The example threshold is for software demonstration only. It is not a clinical threshold and must not be used to make medical decisions.

4.5 Trend and History Display

The prototype may display example readings over time to illustrate how a monitoring dashboard could show changes in pressure.

Any trends based on simulated data are illustrative and do not represent a person's actual health status.

5. Technology Stack

Technology| Purpose
HTML5| Structures the web page
CSS3| Provides styling and responsive layout
JavaScript| Handles prototype interactions and demonstration logic
CSV| Stores example readings for testing
GitHub| Hosts project source code and documentation
GitHub Pages| Can publish the static website

6. Data Flow

1. The prototype loads or generates simulated pressure values.
2. JavaScript processes the values for display.
3. The dashboard presents pressure information using visual indicators.
4. The demonstration alert logic checks values against an example threshold.
5. The interface displays a warning when the programmed condition is met.
6. The user sees educational guidance encouraging appropriate foot care and professional consultation when needed.

7. Future Hardware Integration

A future version could explore the use of pressure sensors embedded in an insole or pressure mat.

A possible future architecture would be:

Pressure Sensors
       |
       v
Microcontroller / Data Acquisition
       |
       v
Calibration and Signal Processing
       |
       v
Mobile or Web Dashboard
       |
       v
Visual Feedback and Notifications

This is a proposed future design, not part of the currently implemented website.

Such a system would require sensor calibration, hardware testing, reliable data transmission, power management, usability evaluation, and appropriate clinical validation.

8. Security and Privacy

If the project is extended to handle real health data, the following safeguards should be considered:

- Collect only information necessary for the intended purpose.
- Obtain appropriate user consent before collecting health information.
- Protect stored and transmitted data.
- Restrict access to authorized users.
- Avoid publishing personal or identifiable health information in the public repository.
- Clearly distinguish demonstration data from real measurements.

The current prototype should use synthetic data for public demonstrations.

9. Testing Plan

The following tests can be performed on the web prototype:

Test ID| Test Scenario| Expected Result
TC-01| Open the website| Dashboard loads correctly
TC-02| Display sample readings| Demonstration values are visible
TC-03| Display pressure heatmap| Visual pressure regions appear if implemented
TC-04| Test a value above the example threshold| Warning appears if threshold logic is implemented
TC-05| View pressure history| Example trend is displayed if implemented
TC-06| Open the website on a mobile device| Content remains readable
TC-07| Check educational disclaimer| Prototype limitations are clearly stated

Tests should be marked as passed only after the team has actually performed them.

10. Limitations

- The current prototype uses simulated pressure readings.
- Real pressure sensors are not integrated unless separately implemented.
- The demonstration threshold is not medically validated.
- The prototype does not establish diagnostic accuracy or ulcer-prediction performance.
- No clinical trials or clinical validation are claimed.
- The system is not a replacement for professional medical advice or routine foot care.

11. Future Enhancements

- Integrate calibrated pressure sensors.
- Develop reliable real-time data acquisition.
- Improve visualization and accessible alert design.
- Add secure data storage with appropriate consent.
- Evaluate usability with intended users and healthcare professionals.
- Conduct technical verification and appropriate clinical validation before making health-related performance claims.

12. Social Impact

SoleGuard AI aligns with United Nations Sustainable Development Goal 3: Good Health and Well-being by demonstrating a technology concept focused on preventive awareness and timely healthcare consultation.

The long-term aim is to explore whether accessible pressure-monitoring technology could support foot-care awareness, subject to technical and clinical validation.

13. Conclusion

SoleGuard AI demonstrates a browser-based concept for visualizing foot-pressure patterns and presenting threshold-based warnings. Its current implementation is a simulated educational prototype.

Future development could explore real sensor integration, improved data processing, privacy safeguards, and clinical evaluation to determine whether the concept can provide safe and useful support in diabetic foot care.

---

Project: SoleGuard AI
Category: Healthcare & Wellbeing
Document Type: Technical Design Document
Status: Student prototype / proof of concept
