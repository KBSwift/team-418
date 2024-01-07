package org.launchcode.homebase.controllers;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import org.launchcode.homebase.data.UserRepository;
import org.launchcode.homebase.models.User;
import org.launchcode.homebase.models.dto.LoginFormDTO;
import org.launchcode.homebase.models.dto.RegisterFormDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:5173/")
@RequestMapping("/api")
public class AuthenticationController {

    @Autowired
    UserRepository userRepository;

    private static final String userSessionKey = "user";

    public User getUserFromSession(HttpSession session) {
        Integer userId = (Integer) session.getAttribute(userSessionKey);
        if (userId == null) {
            return null;
        }
        Optional<User> user = userRepository.findById(userId);
        if (user.isEmpty()) {
            return null;
        }
        return user.get();
    }

    private static void setUserInSession(HttpSession session, User user) {
        session.setAttribute(userSessionKey, user.getId());
    }

    @GetMapping("/user")
    public ResponseEntity<User> getCurrentUser(HttpSession session) {
        User user = getUserFromSession(session);

        if (user == null) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }

        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @PostMapping("/register")
    public ResponseEntity<User> registerUser(@RequestBody @Valid RegisterFormDTO registerFormDTO, Errors errors, HttpServletRequest request) {
        if (errors.hasErrors()) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        User existingUser = userRepository.findByUsername(registerFormDTO.getUsername());

        if (existingUser != null) {
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }

        String password = registerFormDTO.getPassword();
        String verifyPassword = registerFormDTO.getVerifyPassword();

        if (!password.equals(verifyPassword)) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        User newUser = new User(registerFormDTO.getUsername(), registerFormDTO.getEmail(), registerFormDTO.getPassword());
        newUser.setUsername(registerFormDTO.getUsername());
        userRepository.save(newUser);

        setUserInSession(request.getSession(), newUser);

        return new ResponseEntity<>(newUser, HttpStatus.CREATED);
    }

    @GetMapping("/login")
    public ResponseEntity<String> displayLoginForm() {
        // You can modify this as needed, maybe return a URL or a message
        return new ResponseEntity<>("Please log in", HttpStatus.OK);
    }

    @PostMapping("/login")
    public ResponseEntity<String> processLoginForm(@RequestBody @Valid LoginFormDTO loginFormDTO, Errors errors, HttpServletRequest request) {
        if (errors.hasErrors()) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        User theUser = userRepository.findByEmail(loginFormDTO.getEmail());

        if (theUser == null || !theUser.isMatchingPassword(loginFormDTO.getPassword())) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }

        setUserInSession(request.getSession(), theUser);

        return new ResponseEntity<>("Login successful", HttpStatus.OK);
    }

    @GetMapping("/logout")
    public ResponseEntity<String> logout(HttpServletRequest request) {
        request.getSession().invalidate();
        return new ResponseEntity<>("Logout successful", HttpStatus.OK);
    }

}