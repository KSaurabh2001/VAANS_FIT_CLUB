package com.vvansfitclub.Services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.vvansfitclub.Repository.DietRepository;
import com.vvansfitclub.Repository.ExerciseRepository;
import com.vvansfitclub.Repository.GymUserRepository;
import com.vvansfitclub.Repository.MealRepository;
import com.vvansfitclub.Repository.TrainerRepository;
import com.vvansfitclub.Repository.WorkoutRepository;
import com.vvansfitclub.model.Diet;
import com.vvansfitclub.model.Exercise;
import com.vvansfitclub.model.GymUser;
import com.vvansfitclub.model.Meal;
import com.vvansfitclub.model.Trainer;
import com.vvansfitclub.model.Workout;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class TrainerServiceImpl implements TrainerService {

     private final TrainerRepository trainerRepository;
    private final GymUserRepository gymUserRepository;
     private final WorkoutRepository workoutRepository;
     private final ExerciseRepository exerciseRepository;
     private final DietRepository dietRepository;
    private final MealRepository mealRepository;
	private final  PasswordEncoder passwordEncoder;

//  

    // ========== WORKOUT ==========
    @Override
    public List<Workout> addWorkout(Workout workout) {
        workoutRepository.save(workout);
        return workoutRepository.findAll();
    }

    @Override
    public List<Workout> deleteWorkout(Long id) {
        workoutRepository.deleteById(id);
        return workoutRepository.findAll();
    }

    @Override
    public List<Workout> allWorkout() {
        return workoutRepository.findAll();
    }
    public List<Workout> updateWorkout(Long workoutId, Workout updatedWorkout) {
        Workout existingWorkout = workoutRepository.findById(workoutId)
                .orElseThrow(() -> new RuntimeException("Workout not found with id: " + workoutId));

        existingWorkout.setMuscleGroup(updatedWorkout.getMuscleGroup());

        // Clear old exercises to avoid detached merge issues
        existingWorkout.getExercise().clear();

        // Add new ones
        for (Exercise e : updatedWorkout.getExercise()) {
            e.setId(null); // force insert as new
        }
        existingWorkout.getExercise().addAll(updatedWorkout.getExercise());

        workoutRepository.save(existingWorkout);
        return workoutRepository.findAll();
    }
  

    // ========== DIET ==========
    @Override
    public List<Diet> addDiet(Diet diet) {
        dietRepository.save(diet);
        return dietRepository.findAll();
    }

    @Override
    public List<Diet> deleteDiet(Long id) {
        dietRepository.deleteById(id);
        return dietRepository.findAll();
    }

    @Override
    public List<Diet> allDiet() {
        return dietRepository.findAll();
    }
    public List<Diet> updateDiet(Long dietId, Diet updatedDiet) {
        Diet existingDiet = dietRepository.findById(dietId)
                .orElseThrow(() -> new RuntimeException("Diet not found with id: " + dietId));

        // Replace fields
        existingDiet.setName(updatedDiet.getName());
        existingDiet.setGoal(updatedDiet.getGoal());

        // Clear old meals to avoid detached entity issues
        existingDiet.getMeal().clear();

        // Add new meals with id = null to force re-persist
        for (Meal meal : updatedDiet.getMeal()) {
            meal.setId(null);
        }
        existingDiet.getMeal().addAll(updatedDiet.getMeal());

        dietRepository.save(existingDiet);  // Cascade saves meals

        return dietRepository.findAll();
    }



    // ========== USER ASSIGNMENTS ==========
    @Override
    public void addDietToUser(Long userId, Long dietId) {
        GymUser user = gymUserRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        Diet diet = dietRepository.findById(dietId)
                .orElseThrow(() -> new RuntimeException("Diet not found"));

        user.setDiet(diet);
        gymUserRepository.save(user);
    }

    @Override
    public void addWorkoutToUser(Long userId, Long workoutId) {
        GymUser user = gymUserRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        Workout workout = workoutRepository.findById(workoutId)
                .orElseThrow(() -> new RuntimeException("Workout not found"));

        if (user.getWorkout() == null) {
            user.setWorkout(new ArrayList<>());
        }

        if (!user.getWorkout().contains(workout)) {
            user.getWorkout().add(workout);
        }

        gymUserRepository.save(user);
    }
    
    @Override
    public void removeDietFromUser(Long userId) {
        GymUser user = gymUserRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        user.setDiet(null); // Remove the diet reference
        gymUserRepository.save(user);
    }
    @Override
    public void removeWorkoutFromUser(Long userId, Long workoutId) {
        GymUser user = gymUserRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Workout workout = workoutRepository.findById(workoutId)
                .orElseThrow(() -> new RuntimeException("Workout not found"));

        if (user.getWorkout() != null) {
            user.getWorkout().removeIf(w -> w.getId().equals(workoutId));
        }

        gymUserRepository.save(user);
    }


    // ========== TRAINER PROFILE ==========
    @Override
    public Trainer editProfile(Trainer trainer) {
        Trainer existing = trainerRepository.findById(trainer.getId())
                .orElseThrow(() -> new RuntimeException("Trainer not found"));

        // ✅ 10 fields from UserInterface
        existing.setName(trainer.getName());
        existing.setGender(trainer.getGender());
        existing.setAge(trainer.getAge());
        existing.setLocation(trainer.getLocation());
        existing.setOccupation(trainer.getOccupation());
        existing.setImage(trainer.getImage());
        existing.setAdharNumber(trainer.getAdharNumber());
        existing.setUsername(trainer.getUsername());
        existing.setRole(trainer.getRole());
        existing.setGymID(trainer.getGymID());

        if (trainer.getPassword() != null && !trainer.getPassword().trim().isEmpty()) {
        	String encodedPassword = passwordEncoder.encode(trainer.getPassword());
    		existing.setPassword(encodedPassword);
           // consider encoding it
        }

        // ✅ Trainer-specific field
        existing.setSpeciality(trainer.getSpeciality());

        return trainerRepository.save(existing);
    }

    @Override
    public Trainer getTrainerById(Long id) {
        return trainerRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Trainer not found"));
    }

    @Override
    public Trainer getTrainerByUsername(String username) {
        return trainerRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Trainer not found with username: " + username));
    }

	@Override
	public Workout workoutById(Long id) {
		
		Workout workout=workoutRepository.findById(id).orElseThrow();
		
		return workout;
	}
}
// ========== MEAL ==========
//@Override
//public List<Meal> addMeal(Meal meal) {
//  mealRepository.save(meal);
//  return mealRepository.findAll();
//}
//
//@Override
//public List<Meal> deleteMeal(Long id) {
//  mealRepository.deleteById(id);
//  return mealRepository.findAll();
//}
//
//@Override
//public List<Meal> allMeal() {
//  return mealRepository.findAll();
//}
//
//@Override
//public void addMealToDiet(Long dietId, Long mealId) {
//  Diet diet = dietRepository.findById(dietId)
//          .orElseThrow(() -> new RuntimeException("Diet not found"));
//  Meal meal = mealRepository.findById(mealId)
//          .orElseThrow(() -> new RuntimeException("Meal not found"));
//
//  if (diet.getMeal() == null) {
//      diet.setMeal(new ArrayList<>());
//  }
//
//  if (!diet.getMeal().contains(meal)) {
//      diet.getMeal().add(meal);
//  }
//
//  dietRepository.save(diet);
//}
// ========== EXERCISE ==========
//@Override
//public List<Exercise> addExercise(Exercise exercise) {
//  exerciseRepository.save(exercise);
//  return exerciseRepository.findAll();
//}
//
//@Override
//public List<Exercise> deleteExercise(Long id) {
//  exerciseRepository.deleteById(id);
//  return exerciseRepository.findAll();
//}
//
//@Override
//public List<Exercise> allExercise() {
//  return exerciseRepository.findAll();
//}
//@Override
//public void addExerciseToWorkout(Long workoutId, Long exerciseId) {
//    Workout workout = workoutRepository.findById(workoutId)
//            .orElseThrow(() -> new RuntimeException("Workout not found"));
//    Exercise exercise = exerciseRepository.findById(exerciseId)
//            .orElseThrow(() -> new RuntimeException("Exercise not found"));
//
//    if (workout.getExercise() == null) {
//        workout.setExercise(new ArrayList<>());
//    }
//
//    if (!workout.getExercise().contains(exercise)) {
//        workout.getExercise().add(exercise);
//    }
//
//    workoutRepository.save(workout);
//}