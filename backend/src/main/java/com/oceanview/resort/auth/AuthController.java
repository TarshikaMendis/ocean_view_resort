package com.oceanview.resort.auth;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    @Autowired
    private AuthService authService;

    // Register Customer
    @PostMapping("/register")
    public Map<String, String> register(@RequestBody User user) {

        String message = authService.register(user);

        Map<String, String> response = new HashMap<>();
        response.put("message", message);

        return response;
    }

    // Login (Admin or Customer)
    @PostMapping("/login")
    public Map<String, String> login(@RequestBody User user) {

        User loggedUser = authService.login(user.getUsername(), user.getPassword());

        Map<String, String> response = new HashMap<>();

        if (loggedUser == null) {
            response.put("message", "Invalid Username or Password!");
            return response;
        }

        response.put("message", "Login Successful!");
        response.put("username", loggedUser.getUsername());
        response.put("role", loggedUser.getRole());

        return response;
    }
}
