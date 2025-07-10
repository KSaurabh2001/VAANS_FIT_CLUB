package com.vvansfitclub.Controller;

import com.vvansfitclub.Services.TrainerService;
import com.vvansfitclub.model.*;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/trainer")
@RequiredArgsConstructor
public class TrainerController {

    private final TrainerService trainerService;



    // =================== Workout ===================
    @PostMapping("/addworkout")
    public ResponseEntity<List<Workout>> addWorkout(@RequestBody Workout workout) {
        return ResponseEntity.ok(trainerService.addWorkout(workout));
    }

    @DeleteMapping("/deleteworkout/{id}")
    public ResponseEntity<List<Workout>> deleteWorkout(@PathVariable Long id) {
        return ResponseEntity.ok(trainerService.deleteWorkout(id));
    }

    @GetMapping("/allworkouts")
    public ResponseEntity<List<Workout>> allWorkouts() {
        return ResponseEntity.ok(trainerService.allWorkout());
    }
    @PutMapping("/updateworkout/{workoutId}")
    public ResponseEntity<List<Workout>> updateWorkout(
            @PathVariable Long workoutId,
            @RequestBody Workout updatedWorkout) {
        
        return ResponseEntity.ok(trainerService.updateWorkout(workoutId, updatedWorkout));
    }

    @GetMapping("/getWorkoutById/{id}")
    public ResponseEntity<Workout> workoutById(@PathVariable Long id) {
        return ResponseEntity.ok(trainerService.workoutById(id));
    }
    // =================== Diet ===================
    @PostMapping("/adddiet")
    public ResponseEntity<List<Diet>> addDiet(@RequestBody Diet diet) {
        return ResponseEntity.ok(trainerService.addDiet(diet));
    }

    @DeleteMapping("/deletediet/{id}")
    public ResponseEntity<List<Diet>> deleteDiet(@PathVariable Long id) {
        return ResponseEntity.ok(trainerService.deleteDiet(id));
    }

    @GetMapping("/alldiets")
    public ResponseEntity<List<Diet>> allDiets() {
        return ResponseEntity.ok(trainerService.allDiet());
        
    }
    
    @PutMapping("/updatediet/{dietId}")
    public ResponseEntity<List<Diet>> updateDiet(
            @PathVariable Long dietId,
            @RequestBody Diet updatedDiet) {
       
        return ResponseEntity.ok( trainerService.updateDiet(dietId, updatedDiet));
    }


    // =================== Assignments ===================
    @PutMapping("/assign/diet")
    public ResponseEntity<String> assignDietToUser(@RequestParam Long userId, @RequestParam Long dietId) {
        trainerService.addDietToUser(userId, dietId);
        return ResponseEntity.ok("Diet assigned to user.");
    }

    @PutMapping("/assign/workout")
    public ResponseEntity<String> assignWorkoutToUser(@RequestParam Long userId, @RequestParam Long workoutId) {
        trainerService.addWorkoutToUser(userId, workoutId);
        return ResponseEntity.ok("Workout assigned to user.");
    }
    @PutMapping("/unassign/diet")
    public ResponseEntity<String> unassignDietFromUser(@RequestParam Long userId) {
        trainerService.removeDietFromUser(userId);
        return ResponseEntity.ok("Diet unassigned from user.");
    }

    @PutMapping("/unassign/workout")
    public ResponseEntity<String> unassignWorkoutFromUser(@RequestParam Long userId, @RequestParam Long workoutId) {
        trainerService.removeWorkoutFromUser(userId, workoutId);
        return ResponseEntity.ok("Workout unassigned from user.");
    }


    // =================== Profile ===================
    @PutMapping("/editTrainer")
    public ResponseEntity<Trainer> editProfile(@RequestBody Trainer trainer) {
        return ResponseEntity.ok(trainerService.editProfile(trainer));
    }

    @GetMapping("/trainerById/{id}")
    public ResponseEntity<Trainer> getTrainerById(@PathVariable Long id) {
        return ResponseEntity.ok(trainerService.getTrainerById(id));
    }

    @GetMapping("/Trainerusername/{username}")
    public ResponseEntity<Trainer> getTrainerByUsername(@PathVariable String username) {
        return ResponseEntity.ok(trainerService.getTrainerByUsername(username));
    }
}

//// =================== Exercise ===================
//@PostMapping("/exercise")
//public ResponseEntity<List<Exercise>> addExercise(@RequestBody Exercise exercise) {
//  return ResponseEntity.ok(trainerService.addExercise(exercise));
//}
//
//@DeleteMapping("/exercise/{id}")
//public ResponseEntity<List<Exercise>> deleteExercise(@PathVariable Long id) {
//  return ResponseEntity.ok(trainerService.deleteExercise(id));
//}
//
//@GetMapping("/exercises")
//public ResponseEntity<List<Exercise>> allExercises() {
//  return ResponseEntity.ok(trainerService.allExercise());
//}
//@PutMapping("/workout/{workoutId}/exercise/{exerciseId}")
//public ResponseEntity<String> addExerciseToWorkout(@PathVariable Long workoutId, @PathVariable Long exerciseId) {
//trainerService.addExerciseToWorkout(workoutId, exerciseId);
//return ResponseEntity.ok("Exercise added to workout successfully.");
//}
//
//// =================== Meal ===================
//@PostMapping("/meal")
//public ResponseEntity<List<Meal>> addMeal(@RequestBody Meal meal) {
//  return ResponseEntity.ok(trainerService.addMeal(meal));
//}
//
//@DeleteMapping("/meal/{id}")
//public ResponseEntity<List<Meal>> deleteMeal(@PathVariable Long id) {
//  return ResponseEntity.ok(trainerService.deleteMeal(id));
//}
//
//@GetMapping("/meals")
//public ResponseEntity<List<Meal>> allMeals() {
//  return ResponseEntity.ok(trainerService.allMeal());
//}
//
//@PutMapping("/diet/{dietId}/meal/{mealId}")
//public ResponseEntity<String> addMealToDiet(@PathVariable Long dietId, @PathVariable Long mealId) {
//  trainerService.addMealToDiet(dietId, mealId);
//  return ResponseEntity.ok("Meal added to diet successfully.");
//}