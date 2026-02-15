package com.oceanview.resort.controller;

import com.oceanview.resort.ContactMessage;
import com.oceanview.resort.service.ContactMessageService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/messages")
@CrossOrigin(origins = "http://localhost:3000")
public class ContactMessageController {

    private final ContactMessageService contactMessageService;

    public ContactMessageController(ContactMessageService contactMessageService) {
        this.contactMessageService = contactMessageService;
    }

    // Save Contact Message
    @PostMapping("/send")
    public ResponseEntity<?> sendMessage(@RequestBody ContactMessage contactMessage) {

        if (contactMessage.getName() == null || contactMessage.getName().isEmpty()) {
            return ResponseEntity.badRequest().body("Name is required!");
        }

        if (contactMessage.getEmail() == null || contactMessage.getEmail().isEmpty()) {
            return ResponseEntity.badRequest().body("Email is required!");
        }

        if (contactMessage.getMessage() == null || contactMessage.getMessage().isEmpty()) {
            return ResponseEntity.badRequest().body("Message is required!");
        }

        ContactMessage saved = contactMessageService.saveMessage(contactMessage);

        return ResponseEntity.ok(saved);
    }

    // View All Messages (Admin)
    @GetMapping("/all")
    public ResponseEntity<List<ContactMessage>> getAllMessages() {
        return ResponseEntity.ok(contactMessageService.getAllMessages());
    }

    // Delete Message (Admin)
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteMessage(@PathVariable String id) {
        contactMessageService.deleteMessage(id);
        return ResponseEntity.ok("Message Deleted Successfully!");
    }
}
