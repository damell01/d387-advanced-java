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

