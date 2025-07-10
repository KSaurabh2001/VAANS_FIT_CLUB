package com.vvansfitclub.Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.vvansfitclub.model.Trainer;



public interface TrainerRepository extends JpaRepository<Trainer,Long>{
	Optional<Trainer> findByUsername(String username);

}
