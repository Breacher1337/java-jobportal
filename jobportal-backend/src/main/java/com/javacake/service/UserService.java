package com.javacake.service;

import com.javacake.dto.UserDTO;
import com.javacake.dto.UserResponseDTO;
import com.javacake.entity.User;
import jakarta.validation.Valid;

import java.util.List;
import java.util.Optional;

public interface UserService {
    UserResponseDTO createUser(UserDTO dto);    Optional<User> getUserById(Long id);
    Optional<User> getUserByEmail(String email);
    List<User> getAllUsers();
    void deleteUser(Long id);
}
