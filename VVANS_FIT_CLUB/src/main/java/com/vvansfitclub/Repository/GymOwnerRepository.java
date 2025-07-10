package com.vvansfitclub.Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.vvansfitclub.model.GymOwner;



public interface GymOwnerRepository extends JpaRepository<GymOwner,Long>{

	 Optional<GymOwner> findByUsername(String username);
}
