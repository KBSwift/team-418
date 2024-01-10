package org.launchcode.homebase.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.beans.factory.annotation.Autowired;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.List;

//@Service
//public class GoogleAPIService {
//
//    @Value("${google.api.key}")
//    private String apiKey;
//
//    @Value("${google.customsearch.engineId}")
//    private String engineId;
//
//    public String searchFiltersBySize(String filterSize) {
//        String apiUrl = "https://www.googleapis.com/customsearch/v1";
//        String query = "air filter size " + filterSize;
//
//        // Set up the request parameters
//        String url = String.format("%s?q=%s&key=%s&cx=%s", apiUrl, query, apiKey, engineId);
//
//        // Make a GET request to the Google Custom Search API
//        RestTemplate restTemplate = new RestTemplate();
////        return restTemplate.getForObject(url, String.class);
//        String searchresult = restTemplate.getForObject(url, String.class);
//
//        System.out.println(searchresult);
//        return searchresult;
//
//    }
//        public String getGoogleSearchLink(String query) {
//            String googleSearchLink = "https://www.google.com/search?q=" + URLEncoder.encode(query, StandardCharsets.UTF_8);
//            return googleSearchLink;
//        }
//}

@Service
public class GoogleAPIService {

    @Autowired
    private EquipmentService equipmentService;

    public String getGoogleSearchLinkForEquipment(int equipmentId) {
        List<String> searchStrings = equipmentService.buildSearchStringsForEquipment(equipmentId);
        return performCustomGoogleSearch(searchStrings);
    }

    private String generateGoogleSearchUrl(String searchString) {
        try {
            String encodedSearchString = URLEncoder.encode(searchString, StandardCharsets.UTF_8.toString());
            return "https://www.google.com/search?q=" + encodedSearchString;
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
            return null;
        }
    }

    private String performCustomGoogleSearch(List<String> searchStrings) {
        for (String searchString : searchStrings) {
            String googleSearchUrl = generateGoogleSearchUrl(searchString);
            if (googleSearchUrl != null) {
                return googleSearchUrl;
            }
        }
        return null;
    }
}

