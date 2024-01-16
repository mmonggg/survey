package com.s1.survey.web;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
public class ReactRestController {
    @PostMapping(value="/testData")
    public Map<Integer, String> testData(@RequestBody List<String> params) {
        Map<Integer, String> data = new HashMap<>();
        data.put(1, "apple");
        data.put(2, "banana");
        data.put(3, "melon");

        int i = 4;
        for (String param : params) {
            data.put(i, param);
            i++;
        }

        return data;
    }
}
