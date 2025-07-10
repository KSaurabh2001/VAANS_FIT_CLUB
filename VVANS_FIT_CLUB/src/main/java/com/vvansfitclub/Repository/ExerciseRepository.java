package com.vvansfitclub.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.vvansfitclub.model.Exercise;

public interface ExerciseRepository extends JpaRepository<Exercise,Long>{

}
