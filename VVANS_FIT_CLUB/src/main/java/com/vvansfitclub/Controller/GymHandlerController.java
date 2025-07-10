package com.vvansfitclub.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.vvansfitclub.Services.GymHandlerService;
import com.vvansfitclub.model.ClassSession;
import com.vvansfitclub.model.GymHandler;
import com.vvansfitclub.model.GymUser;
import com.vvansfitclub.model.Trainer;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/handler")
@RequiredArgsConstructor
public class GymHandlerController {

   
    private final GymHandlerService gymHandlerService;

    // ✅ Add Gym User
    @PostMapping("/adduser")
    public ResponseEntity<List<GymUser>> addGymUser(@RequestBody GymUser user) {
        return ResponseEntity.ok(gymHandlerService.addGymUser(user));
    }

    // ✅ Delete Gym User
    @DeleteMapping("/deleteuser/{id}")
    public ResponseEntity<List<GymUser>> deleteGymUser(@PathVariable Long id) {
        return ResponseEntity.ok(gymHandlerService.deleteGymUser(id));
    }

    // ✅ Get All Gym Users
    @GetMapping("/allusers")
    public ResponseEntity<List<GymUser>> allUsers() {
        return ResponseEntity.ok(gymHandlerService.allUser());
    }

    // ✅ Add Trainer
    @PostMapping("/addtrainer")
    public ResponseEntity<List<Trainer>> addTrainer(@RequestBody Trainer trainer) {
        return ResponseEntity.ok(gymHandlerService.addTrainer(trainer));
    }

    // ✅ Delete Trainer
    @DeleteMapping("/deletetrainer/{id}")
    public ResponseEntity<List<Trainer>> deleteTrainer(@PathVariable Long id) {
        return ResponseEntity.ok(gymHandlerService.deleteTrainer(id));
    }

    // ✅ Get All Trainers
    @GetMapping("/alltrainers")
    public ResponseEntity<List<Trainer>> allTrainers() {
        return ResponseEntity.ok(gymHandlerService.allTrainer());
    }

    // ✅ Add Class Session
    @PostMapping("/addsession")
    public ResponseEntity<List<ClassSession>> addClassSession(@RequestBody ClassSession session) {
        return ResponseEntity.ok(gymHandlerService.addClassSession(session));
    }

    // ✅ Get All Sessions
    @GetMapping("/allsessions")
    public ResponseEntity<List<ClassSession>> allSessions() {
        return ResponseEntity.ok(gymHandlerService.allSession());
    }
    
    @GetMapping("/sessionById/{id}")
    public ResponseEntity<ClassSession> sessionById(@PathVariable Long id) {
        return ResponseEntity.ok(gymHandlerService.sessionById(id));
    }


    // ✅ Delete Class Session
    @DeleteMapping("/deletesession/{id}")
    public ResponseEntity<List<ClassSession>> deleteSession(@PathVariable Long id) {
        return ResponseEntity.ok(gymHandlerService.deleteSession(id));
    }

    // ✅ Update Class Session
    @PutMapping("/updatesession")
    public ResponseEntity<List<ClassSession>> updateSession(@RequestBody ClassSession session) {
        return ResponseEntity.ok(gymHandlerService.updateSession(session));
    }

    // ✅ Assign Trainer to User
    @PutMapping("/assign/trainer-to-user")
    public ResponseEntity<String> assignTrainerToUser(
            @RequestParam Long userId,
            @RequestParam Long trainerId) {
        gymHandlerService.assignTrainerToUser(userId, trainerId);
        return ResponseEntity.ok("Trainer assigned to user successfully.");
    }
    
    @PutMapping("/unassign/trainer-from-user")
    public ResponseEntity<String> unassignTrainerFromUser(
            @RequestParam Long userId,
            @RequestParam Long trainerId) {
        gymHandlerService.unassignTrainerFromUser(userId, trainerId);
        return ResponseEntity.ok("Trainer unassigned from user successfully.");
    }

    // ✅ Assign Trainer to Session
    @PutMapping("/assign/trainer-to-session")
    public ResponseEntity<String> assignTrainerToSession(
            @RequestParam Long sessionId,
            @RequestParam Long trainerId) {
        gymHandlerService.assignTrainerToSession(sessionId, trainerId);
        return ResponseEntity.ok("Trainer assigned to session successfully.");
    }
    @PutMapping("/unassign/trainer-from-session")
    public ResponseEntity<String> unassignTrainerFromSession(
            @RequestParam Long sessionId,
            @RequestParam Long trainerId) {
        gymHandlerService.unassignTrainerFromSession(sessionId, trainerId);
        return ResponseEntity.ok("Trainer unassigned from session successfully.");
    }

    // ✅ Edit Gym Handler Profile
    @PutMapping("/editHandlerProfile")
    public ResponseEntity<GymHandler> editProfile(@RequestBody GymHandler handler) {
        return ResponseEntity.ok(gymHandlerService.editProfile(handler));
    }

    // ✅ Get Handler by ID
    @GetMapping("/gethandlerById/{id}")
    public ResponseEntity<GymHandler> getHandlerById(@PathVariable Long id) {
        return ResponseEntity.ok(gymHandlerService.getGymHandlerById(id));
    }

    // ✅ Get Handler by Username
    @GetMapping("/Handlerusername/{username}")
    public ResponseEntity<GymHandler> getHandlerByUsername(@PathVariable String username) {
        return ResponseEntity.ok(gymHandlerService.getGymHandlerByUsername(username));
    }

    // ✅ Update Payment Status for Gym User
    @PutMapping("/updateUser/payment-status")
    public ResponseEntity<List<GymUser>> updatePaymentStatus(
            @RequestParam Long gymUserId,
            @RequestParam String newStatus,
            @RequestParam String plan) {
        return ResponseEntity.ok(gymHandlerService.updatePaymentStatus(gymUserId, newStatus , plan));
    }
}
