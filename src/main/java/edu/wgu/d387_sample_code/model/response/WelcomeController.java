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
