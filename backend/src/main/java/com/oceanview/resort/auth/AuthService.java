package com.oceanview.resort.auth;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    // Register customer
    public String register(User user) {

        User existingUser = userRepository.findByUsername(user.getUsername());

        if (existingUser != null) {
            return "Username already exists!";
        }

        if (user.getPassword() == null || user.getPassword().length() < 4) {
            return "Password must be at least 4 characters!";
        }

        user.setRole("CUSTOMER");
        userRepository.save(user);

        return "Registration Successful!";
    }

    // Login user
    public User login(String username, String password) {

        User user = userRepository.findByUsername(username);

        if (user == null) {
            return null;
        }

        if (!user.getPassword().equals(password)) {
            return null;
        }

        return user;
    }
}
