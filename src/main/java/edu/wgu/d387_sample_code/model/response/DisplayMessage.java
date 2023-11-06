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
