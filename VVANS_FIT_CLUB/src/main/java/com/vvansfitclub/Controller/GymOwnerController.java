package com.vvansfitclub.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.vvansfitclub.Services.GymOwnerService;
import com.vvansfitclub.model.Gym;
import com.vvansfitclub.model.GymHandler;
import com.vvansfitclub.model.GymOwner;
import com.vvansfitclub.model.Membership;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/owner")
@RequiredArgsConstructor
public class GymOwnerController {

    
    private final GymOwnerService gymOwnerService;

    @PostMapping("/addgyms")
    public ResponseEntity<List<Gym>> createGym(@RequestBody Gym gym) {
        return ResponseEntity.ok(gymOwnerService.createGym(gym));
    }

    @GetMapping("/gym/{id}")
    public ResponseEntity<Gym> getGymById(@PathVariable Long id) {
        return ResponseEntity.ok(gymOwnerService.getGymById(id));
    }

    @GetMapping("/allgyms")
    public ResponseEntity<List<Gym>> getAllGyms() {
        return ResponseEntity.ok(gymOwnerService.getAllGyms());
    }

    @PutMapping("/editgyms")
    public ResponseEntity<List<Gym>> updateGym(@RequestBody Gym gym) {
        return ResponseEntity.ok(gymOwnerService.updateGym(gym));
    }

    @DeleteMapping("/deletegyms/{id}")
    public ResponseEntity<List<Gym>> deleteGym(@PathVariable Long id) {
        return ResponseEntity.ok(gymOwnerService.deleteGym(id));
    }

    @PostMapping("/addmembership")
    public ResponseEntity<List<Membership>> addMembership(@RequestBody Membership membership) {
        return ResponseEntity.ok(gymOwnerService.addMembership(membership));
    }

    @DeleteMapping("/deletemembership/{id}")
    public ResponseEntity<List<Membership>> deleteMembership(@PathVariable Long id) {
        return ResponseEntity.ok(gymOwnerService.deleteMembership(id));
    }

    @GetMapping("/allmemberships")
    public ResponseEntity<List<Membership>> allMembership() {
        return ResponseEntity.ok(gymOwnerService.allMembership());
    }

    @GetMapping("/getmembership/{id}")
    public ResponseEntity<Membership> getMembershipById(@PathVariable Long id) {
        return ResponseEntity.ok(gymOwnerService.getMembershipById(id));
    }

    @PostMapping("/addhandler")
    public ResponseEntity<List<GymHandler>> addGymHandler(@RequestBody GymHandler gymHandler) {
        return ResponseEntity.ok(gymOwnerService.addGymHandler(gymHandler));
    }

    @DeleteMapping("/deletehandler/{id}")
    public ResponseEntity<List<GymHandler>> deleteGymHandler(@PathVariable Long id) {
        return ResponseEntity.ok(gymOwnerService.deleteGymHandler(id));
    }

    @GetMapping("/allhandlers")
    public ResponseEntity<List<GymHandler>> allGymHandler() {
        return ResponseEntity.ok(gymOwnerService.allGymHandler());
    }
    
    @PostMapping("/assign-gym/{gymId}/{handlerId}")
    public ResponseEntity<String> assignGymToHandler(	
            @PathVariable Long gymId,
            @PathVariable Long handlerId) {

    	gymOwnerService.assignGymToHandler(gymId, handlerId);
        return ResponseEntity.ok("Gym assigned to handler successfully");
    }
    @DeleteMapping("/unassign-gym/{handlerId}")
    public ResponseEntity<String> unassignGymFromHandler(@PathVariable Long handlerId) {
        gymOwnerService.unassignGymFromHandler(handlerId);
        return ResponseEntity.ok("Gym unassigned from handler successfully");
    }

    @PostMapping("/addOwner")
    public ResponseEntity<GymOwner> addOwner(@RequestBody GymOwner owner) {
        return ResponseEntity.ok(gymOwnerService.addOwner(owner));
    }

    @GetMapping("/getOwner/{id}")
    public ResponseEntity<GymOwner> getOwnerById(@PathVariable Long id) {
        return ResponseEntity.ok(gymOwnerService.getOwnerById(id));
    }

    @PutMapping("/editOwner")
    public ResponseEntity<GymOwner> editOwner(@RequestBody GymOwner owner) {
        return ResponseEntity.ok(gymOwnerService.editOwner(owner));
    }

    @GetMapping("/Ownerusername/{username}")
    public ResponseEntity<GymOwner> getOwnerByUsername(@PathVariable String username) {
        return ResponseEntity.ok(gymOwnerService.getOwnerByUsername(username));
    }
    
}
