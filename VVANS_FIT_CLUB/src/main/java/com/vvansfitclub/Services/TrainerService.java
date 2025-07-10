package com.vvansfitclub.Services;

import java.util.List;

import com.vvansfitclub.model.Diet;
import com.vvansfitclub.model.Exercise;
import com.vvansfitclub.model.Meal;
import com.vvansfitclub.model.Trainer;
import com.vvansfitclub.model.Workout;


public interface TrainerService {
	
	
	 
	 public List<Workout> addWorkout(Workout workout);
	 public List<Workout> deleteWorkout(Long id);
	 public List<Workout> allWorkout();
	 public List<Workout> updateWorkout(Long workoutId, Workout updatedWorkout);
	 
	 
	 public List<Diet> addDiet(Diet diet);
	 public List<Diet> deleteDiet(Long id);
	 public List<Diet> allDiet();
	 public List<Diet> updateDiet(Long dietId, Diet updatedDiet);
	
	 public void addDietToUser(Long userId,Long dietId);
	 public void addWorkoutToUser(Long userId,Long workoutID);
	
	 public Trainer editProfile(Trainer trainer);
	 public Trainer getTrainerById(Long id);
	 public Trainer getTrainerByUsername(String username);
	public void removeDietFromUser(Long userId);
	public void removeWorkoutFromUser(Long userId, Long workoutId);
	public Workout workoutById(Long id);
	
	
	

}
