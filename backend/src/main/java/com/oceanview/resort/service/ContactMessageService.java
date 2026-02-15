package com.oceanview.resort.service;

import com.oceanview.resort.ContactMessage;
import com.oceanview.resort.repository.ContactMessageRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ContactMessageService {

    private final ContactMessageRepository contactMessageRepository;

    public ContactMessageService(ContactMessageRepository contactMessageRepository) {
        this.contactMessageRepository = contactMessageRepository;
    }

    // Save Message
    public ContactMessage saveMessage(ContactMessage contactMessage) {
        return contactMessageRepository.save(contactMessage);
    }

    // Get All Messages
    public List<ContactMessage> getAllMessages() {
        return contactMessageRepository.findAll();
    }

    // Delete Message
    public void deleteMessage(String id) {
        contactMessageRepository.deleteById(id);
    }
}
