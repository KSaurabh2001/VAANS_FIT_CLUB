package com.vvansfitclub.Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.vvansfitclub.model.GymHandler;

public interface GymHandlerRepository extends JpaRepository<GymHandler,Long>{
	Optional<GymHandler> findByUsername(String username);

}
