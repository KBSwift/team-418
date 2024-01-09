package org.launchcode.homebase.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class GoogleAPIService {

    @Value("${google.api.key}")
    private String apiKey;

    @Value("${google.customsearch.engineId}")
    private String engineId;

    public String searchFiltersBySize(String filterSize) {
        String apiUrl = "https://www.googleapis.com/customsearch/v1";
        String query = "air filter size " + filterSize;

        // Set up the request parameters
        String url = String.format("%s?q=%s&key=%s&cx=%s", apiUrl, query, apiKey, engineId);

        // Make a GET request to the Google Custom Search API
        RestTemplate restTemplate = new RestTemplate();
        return restTemplate.getForObject(url, String.class);
    }
}