package com.vvansfitclub.Controller;

import com.vvansfitclub.Services.GymUserService;
import com.vvansfitclub.model.ClassSession;
import com.vvansfitclub.model.GymUser;
import com.vvansfitclub.model.Membership;
import com.vvansfitclub.model.Trainer;

import lombok.RequiredArgsConstructor;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class GymUserController {

    
    private final GymUserService gymUserService;

    // ✅ Enroll GymUser in a session
    @GetMapping("/enroll")
    public ResponseEntity<List<ClassSession>> enrollForSession(
            @RequestParam Long userId,
            @RequestParam Long sessionId) {
        
        return ResponseEntity.ok(gymUserService.enrollForSession(userId, sessionId));
    }

    // ✅ Unenroll GymUser from a session
    @GetMapping("/unenroll")
    public ResponseEntity<List<ClassSession>> unenrollFromSession(
            @RequestParam Long userId,
            @RequestParam Long sessionId) {
      
        return   ResponseEntity.ok(gymUserService.unenrollForSession(userId, sessionId));
    }

    @GetMapping("/allUserSession/{id}")
    public ResponseEntity<List<ClassSession>> userSession(@PathVariable Long id) {
      
        return   ResponseEntity.ok(gymUserService.userSession(id));
    }
    
    @GetMapping("/userPlan/{id}")
    public ResponseEntity<Membership> userPlan(@PathVariable Long id) {
      
        return   ResponseEntity.ok(gymUserService.userPlan(id));
    }
    
    @GetMapping("/allUserTrainer/{id}")
    public ResponseEntity<Trainer> userTrainer(@PathVariable Long id) {
      
        return   ResponseEntity.ok(gymUserService.userTrainer(id));
    }


    // ✅ Get GymUser by ID
    @GetMapping("/userById/{id}")
    public ResponseEntity<GymUser> getUserById(@PathVariable Long id) {
        return ResponseEntity.ok(gymUserService.getGymUserById(id));
    }

    // ✅ Get GymUser by Username
    @GetMapping("/Userusername/{username}")
    public ResponseEntity<GymUser> getUserByUsername(@PathVariable String username) {
        return ResponseEntity.ok(gymUserService.getGymUserByUsername(username));
    }

    // ✅ Edit GymUser Profile
    @PutMapping("/editUser")
    public ResponseEntity<GymUser> editGymUser(@RequestBody GymUser user) {
        return ResponseEntity.ok(gymUserService.editGymUser(user));
    }
}
