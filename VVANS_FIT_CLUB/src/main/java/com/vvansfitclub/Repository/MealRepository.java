package com.vvansfitclub.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.vvansfitclub.model.Meal;



public interface MealRepository extends JpaRepository<Meal,Long> {

}
