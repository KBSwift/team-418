package org.launchcode.homebase.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
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


            System.out.println("API URL: " + apiUrl);

            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create(apiUrl + "&api_key=" + serpApiKey))
                    .build();

            HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
//            return response.body();

            ObjectMapper objectMapper = new ObjectMapper();
            JsonNode rootNode = objectMapper.readTree(response.body());


            JsonNode searchMetadataNode = rootNode.path("search_metadata");
            String googleUrl = searchMetadataNode.path("google_url").asText();

            System.out.println(googleUrl);

            return googleUrl;
        } catch (IOException | InterruptedException e) {
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