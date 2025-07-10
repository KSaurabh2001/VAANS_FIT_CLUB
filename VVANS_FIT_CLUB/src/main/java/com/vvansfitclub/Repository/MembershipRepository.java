package com.vvansfitclub.Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.vvansfitclub.model.Membership;



public interface MembershipRepository extends JpaRepository<Membership,Long> {
	
	Optional<Membership> findByName(String name);

}
