package com.vvansfitclub.Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.vvansfitclub.model.GymUser;



public interface GymUserRepository extends JpaRepository<GymUser,Long>{
	
	Optional<GymUser> findByUsername(String username);

}
