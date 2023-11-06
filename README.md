

## Features Added

1. **Feature 1:** Inventory Validation Enhancement
   - Implemented validation logic to prevent saving a Part when the Inventory value is not between the Min and Max values.
   - Displayed an error message to guide the user on correcting the invalid Inventory value.

2. **Feature 2:** Multithreading Language Translation
   - Implemented language translation functionality using Resource Bundles.
   - Defined welcome messages in English and French in the Resource Bundle files.
   - Created API endpoints to provide welcome messages based on the user's locale.
   - Utilized multithreading to display welcome messages concurrently in different languages.

3. **Feature 3:** Faux Currency Conversions
   - Added currency conversion functionality in the Angular front end.
   - Calculated and displayed converted prices in CAD and EUR based on the provided Room interface data.
   - Enhanced user experience by showing converted prices alongside the original prices.

4. **Feature 4:** Time Zone Conversions
   - Implemented time zone conversion functionality for ET, MT, and UTC using ZonedDateTime and .withZoneSameInstant.
   - Created a REST controller to provide API endpoints for displaying converted times.
   - Displayed converted times in the Angular front end for different time zones.

## How to Run the Project

1. **Backend Setup:**
   - Open the project in IntelliJ IDEA.
   - Make sure you have Maven installed. Run `mvn clean install` in the IntelliJ terminal to build the backend.
   - Start the Spring Boot application by running `mvn spring-boot:run`.

2. **Frontend Setup:**
   - Navigate to the `UI` folder in the project directory using the terminal.
   - Run `npm install` to install frontend dependencies.
   - After the installation, run `ng build` to build the Angular application.
   - Start the Angular development server by running `ng serve`.

3. **Access the Application:**
   - Backend: `http://localhost:8080`
   - Frontend: `http://localhost:4200`

