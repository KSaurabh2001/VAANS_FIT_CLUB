package com.vvansfitclub.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.vvansfitclub.Repository.GymHandlerRepository;
import com.vvansfitclub.Repository.GymOwnerRepository;
import com.vvansfitclub.Repository.GymUserRepository;
import com.vvansfitclub.Repository.TrainerRepository;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired private GymOwnerRepository ownerRepo;
    @Autowired private GymHandlerRepository handlerRepo;
    @Autowired private TrainerRepository trainerRepo;
    @Autowired private GymUserRepository gymUserRepo;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        // Try to find user in each repository sequentially
        return ownerRepo.findByUsername(username).map(user -> (UserDetails) user)
            .or(() -> handlerRepo.findByUsername(username).map(user -> (UserDetails) user))
            .or(() -> trainerRepo.findByUsername(username).map(user -> (UserDetails) user))
            .or(() -> gymUserRepo.findByUsername(username).map(user -> (UserDetails) user))
            .orElseThrow(() -> new UsernameNotFoundException("User not found in any repository"));
    }
}