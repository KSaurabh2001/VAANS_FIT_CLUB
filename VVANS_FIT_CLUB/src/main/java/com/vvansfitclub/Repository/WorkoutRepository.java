package com.vvansfitclub.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.vvansfitclub.model.Workout;

public interface WorkoutRepository extends JpaRepository<Workout,Long>{

}
