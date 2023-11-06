package edu.wgu.d387_sample_code.rest;

import java.time.ZonedDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;

public class TimeConversion {

    public String convertTime() {
        ZonedDateTime etTime = ZonedDateTime.now(ZoneId.of("America/New_York")); // Eastern Time
        ZonedDateTime mtTime = etTime.withZoneSameInstant(ZoneId.of("America/Denver")); // Mountain Time
        ZonedDateTime utcTime = etTime.withZoneSameInstant(ZoneId.of("UTC")); // Coordinated Universal Time

        // Format times to display only hours and minutes
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("HH:mm");

        String etFormattedTime = etTime.format(formatter);
        String mtFormattedTime = mtTime.format(formatter);
        String utcFormattedTime = utcTime.format(formatter);

        // Return formatted times
        return "ET: " + etFormattedTime + ", MT: " + mtFormattedTime + ", UTC: " + utcFormattedTime;
    }
}
