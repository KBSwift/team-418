package org.launchcode.homebase.controllers;

import org.launchcode.homebase.service.SerpApiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:5173/")
public class SerpApiController {

    @Autowired
    private final SerpApiService serpApiService;

    public SerpApiController(SerpApiService serpApiService) {
        this.serpApiService = serpApiService;
    }

    @GetMapping("/search")
    public String searchForFilter(@RequestParam String filterSize) {
        return serpApiService.getGoogleShoppingResults(filterSize);
    }
}
