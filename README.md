C. Modify the Landon Hotel scheduling application for localization and internationalization by doing the
following:
1. Install the Landon Hotel scheduling application in your integrated development environment (IDE).
   Modify the Java classes of application to display a welcome message by doing the following:
   a. Build resource bundles for both English and French (languages required by Canadian law). Include
   a welcome message in the language resource bundles.

Created Resource Bundle Language_Resource, and Locales en_US, fr_Ca.
En_US - welcome.message=Welcome to the Landon Hotel.
fr_CA- welcome.message=Bienvenue à l'hôtel Landon.
   

b. Display the welcome message in both English and French by applying the resource bundles using a
   different thread for each language.

inserted into app.component.ts -

Line 38-46  // Make an HTTP GET request to fetch welcome messages
this.httpClient.get<string[]>('http://localhost:8080/welcome').subscribe(
(data: string[]) => {
this.welcomeMessages = data;
},
error => {
console.error('Error fetching welcome messages:', error);
}
);

Line 20- welcomeMessages: string[] = [];

Insert into app.component.html 
lines 25-27 
 <div *ngFor="let message of welcomeMessages">
        {{ message }}
      </div>

Created WelcomeController.Java
package edu.wgu.d387_sample_code.model.response;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;
import java.util.List;
import java.util.Locale;
@RestController
public class WelcomeController {
private final DisplayMessage displayMessage;

    public WelcomeController() {
        // Create an instance of DisplayMessage for a default locale (e.g., English)
        this.displayMessage = new DisplayMessage(Locale.US);
    }
    @CrossOrigin(origins = "http://localhost:4200") // Allow requests from http://localhost:4200
    @GetMapping("/welcome")
    public List<String> getWelcomeMessages() {
        // Get welcome messages for English and French
        String welcomeMessageEnglish = displayMessage.getWelcomeMessage();

        // Assuming you have another DisplayMessage instance for French
        DisplayMessage displayMessageFrench = new DisplayMessage(Locale.CANADA_FRENCH);
        String welcomeMessageFrench = displayMessageFrench.getWelcomeMessage();

        // Return welcome messages as a list
        return Arrays.asList(welcomeMessageEnglish, welcomeMessageFrench);
    }
}
 Created DisplayMessage.Java
package edu.wgu.d387_sample_code.model.response;

import java.util.Locale;
import java.util.ResourceBundle;

public class DisplayMessage {
private final ResourceBundle resourceBundle;

    public DisplayMessage(Locale locale) {
        // Load the appropriate resource bundle based on the given locale
        this.resourceBundle = ResourceBundle.getBundle("Language_Resource", locale);
    }

    public String getWelcomeMessage() {
        // Retrieve the welcome message from the resource bundle
        return resourceBundle.getString("welcome.message");
    }
}

C2: Modify the front end to display the price for a reservation in currency rates for U.S. dollars($),
Canadian dollars (C$), and euros (€) on different lines.
Note: It is not necessary to convert the values of the prices.

Inserted changes in  app.component.ts 
Lines 117-118     priceCAD?: string; // Add priceCAD variable to the Room interface
priceEUR?: string; // Add priceEUR variable to the Room interface

Line 63-73    
onSubmit({ value, valid }: { value: Roomsearch, valid: boolean }) {
this.getAll().subscribe(
rooms => {
console.log(Object.values(rooms)[0]);
this.rooms = <Room[]>Object.values(rooms)[0];
// Calculate crude conversion for priceCAD and priceEUR
this.rooms.forEach(room => {
room.priceCAD = (parseFloat(room.price) * 1.3).toFixed(2); // Conversion rate for CAD
room.priceEUR = (parseFloat(room.price) * 0.9).toFixed(2); // Conversion rate for EUR
});
},

Insert in app.component.html 
Line 81-82
<strong> Price (CAD): C${{ room.priceCAD }}</strong><br>
<strong> Price (EUR): €{{ room.priceEUR }}</strong>


C3 - Display the time for an online live presentation held at the Landon Hotel by doing the following:
a. Write a Java method to convert times between eastern time (ET), mountain time (MT), and
coordinated universal time (UTC) zones.

Created TimeConversion.Java

import java.time.ZonedDateTime;
import java.time.ZoneId;

public class TimeConversion {

    public String convertTime() {
        ZonedDateTime etTime = ZonedDateTime.now(ZoneId.of("America/New_York")); // Eastern Time
        ZonedDateTime mtTime = etTime.withZoneSameInstant(ZoneId.of("America/Denver")); // Mountain Time
        ZonedDateTime utcTime = etTime.withZoneSameInstant(ZoneId.of("UTC")); // Coordinated Universal Time

        // Format the times into a string
        String convertedTimes = "ET: " + etTime + ", MT: " + mtTime + ", UTC: " + utcTime;
        return convertedTimes;
    }
}

Created TimeZoneConversionController.Java

package edu.wgu.d387_sample_code.rest;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TimeZoneConversionController {

    @GetMapping("/converted-times")
    public String getConvertedTimes() {
        TimeConversion timeConversion = new TimeConversion();
        return timeConversion.convertTime();
    }
}

b. Use the time zone conversion method from part C3a to display a message stating the time in all
three times zones in hours and minutes for an online, live presentation held at the Landon Hotel.
The times should be displayed as ET, MT, and UTC.

Inserted Into app.component.html 
Lines 41-42
<h2>Join us for an online presentation held at the London Hotel on</h2>
<h3>{{ convertedTimes }}</h3>

Inserted into app.component.ts 
Line 64- 74
fetchConvertedTimes() {
this.httpClient.get('http://localhost:8080/converted-times', { responseType: 'text' })
.subscribe(
(data: string) => {
this.convertedTimes = data;
},
(error: HttpErrorResponse) => {
console.error('Error fetching converted times:', error);
}
);
}

Created CorsConfig.java to make sure backend was allowed to communicate with frontend
package edu.wgu.d387_sample_code.rest;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

@Configuration
public class CorsConfig {

    @Bean
    public CorsFilter corsFilter() {
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        CorsConfiguration config = new CorsConfiguration();
        config.addAllowedOrigin("http://localhost:4200"); // Allow requests from this origin
        config.addAllowedMethod("*"); // Allow all HTTP methods
        config.addAllowedHeader("*"); // Allow all headers
        source.registerCorsConfiguration("/**", config);
        return new CorsFilter(source);
    }
}


D. Explain how you would deploy the Spring application with a Java back end and an Angular front end to
cloud services and create a Dockerfile using the attached supporting document "How to Create a Docker
Account" by doing the following:
1. Build the Dockerfile to create a single image that includes all code, including modifications made in
   parts C1 to C3. Commit and push the final Dockerfile to GitLab.
Created DockerFile 

2. Test the Dockerfile by doing the following:
   • Create a Docker image of the current multithreaded Spring application.
   • Run the Docker image in a container and give the container a name that includes D387 _[student
   ID].
   • Submit a screenshot capture of the running application with evidence it is running in the container.
3. ![](C:\Users\DamellBell\IdeaProjects\d387-advanced-java\src\main\UI\src\assets\images\Dockerscreenshot.png)
3. Describe how you would deploy the current multithreaded Spring application to the cloud. Include the
   name of the cloud service provider you would use.

   Deploying Multithreaded Spring Application to AWS:

Prerequisites:

AWS Account: Create an AWS account on the AWS website.
Packaged Application: Build a JAR or WAR file of your multithreaded Spring application using Maven or Gradle.
Deployment Steps:

Launch EC2 Instance:

Launch an Amazon EC2 instance on AWS.
Choose an appropriate instance type and configure security groups to allow inbound traffic on port 8080.
Install Docker:

SSH into your EC2 instance.
Install Docker by running: sudo yum install docker -y.
Start and enable Docker: sudo service docker start and sudo chkconfig docker on.
Copy Application Files:

Copy your packaged JAR/WAR file to the EC2 instance using SCP or any file transfer method.
Create Dockerfile:

Create a Dockerfile in the same directory as your JAR/WAR file.
Use a base image, copy the application file, and specify the entry point.
Dockerfile
Copy code
FROM openjdk:11-jre-slim
COPY your-application.jar /app/application.jar
ENTRYPOINT ["java", "-jar", "/app/application.jar"]
Build Docker Image:

Build a Docker image from the Dockerfile.
Run: sudo docker build -t my-spring-app .
Run Docker Container:

Run a Docker container from the built image.
Use: sudo docker run --name my-spring-app-container -p 8080:8080 -d my-spring-app
Configure Load Balancer (Optional):

Set up an AWS Elastic Load Balancer (ELB) if you expect high traffic.
Configure the ELB to distribute traffic across instances.
Domain Configuration (Optional):

Configure a DNS record (A or CNAME) to point to your EC2 instance's public IP.
Update security groups to allow inbound traffic on port 80 (HTTP) and 443 (HTTPS).
SSL/TLS Setup (Optional but recommended):

Obtain an SSL/TLS certificate (e.g., from AWS ACM or Let's Encrypt).
Configure your web server (like Nginx or Apache) to use the SSL/TLS certificate for secure communication.
Monitoring and Scaling:

Set up Amazon CloudWatch alarms to monitor server metrics.
Implement auto-scaling based on metrics like CPU utilization to handle variable loads.
Database Configuration (If Applicable):

Set up a managed database service like Amazon RDS.
Update application configuration to connect to the database endpoint.
Regular Updates and Maintenance:

Schedule regular updates for the application, OS, and other software components.
Monitor security bulletins and apply patches promptly.






