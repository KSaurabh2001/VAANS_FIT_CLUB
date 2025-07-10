package com.vvansfitclub.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.vvansfitclub.model.Diet;

public interface DietRepository extends JpaRepository<Diet,Long> {

}
