package org.launchcode.homebase.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.net.URI;
import java.net.URLEncoder;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.charset.StandardCharsets;

@Service
public class SerpApiService {

    @Value("${serpapi.api.key}")
    private String serpApiKey;

    private static final String SEARCH_ENGINE = "google";

    private final HttpClient client = HttpClient.newHttpClient();  // Create HttpClient instance

    public String getGoogleShoppingResults(String searchQuery) {
        try {
            String apiUrl = buildSerpApiUrl(searchQuery);
            System.out.println("API Key: " + serpApiKey);
            System.out.println("API URL: " + apiUrl);

            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create(apiUrl + "&api_key=" + serpApiKey))
                    .build();

            System.out.println("API Key: " + serpApiKey);
            System.out.println("API URL: " + apiUrl);
            HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());

            return response.body();
        } catch (IOException | InterruptedException e) {
            // Handle the exception appropriately, log it, and maybe return a meaningful message
            e.printStackTrace();
            return "Error fetching Google Shopping results";
        }

    }

    private String buildSerpApiUrl(String searchQuery) {
        try {
            String encodedQuery = URLEncoder.encode(searchQuery, StandardCharsets.UTF_8.toString());
            return "https://serpapi.com/search?q=" + encodedQuery + "&engine=" + SEARCH_ENGINE;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
}