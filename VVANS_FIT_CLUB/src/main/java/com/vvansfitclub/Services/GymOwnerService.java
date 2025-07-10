package com.vvansfitclub.Services;

import java.util.List;

import com.vvansfitclub.model.Gym;
import com.vvansfitclub.model.GymHandler;
import com.vvansfitclub.model.GymOwner;
import com.vvansfitclub.model.Membership;



public interface GymOwnerService {
	
	 public List<Gym> createGym(Gym gym) ;
	 public Gym getGymById(Long id);
	 public List<Gym> getAllGyms() ;
	 public List<Gym> updateGym(Gym gym);
	 public List<Gym> deleteGym(Long id);
	 public List<Membership> addMembership(Membership membership);
	 public List<Membership> deleteMembership(Long id);
	 public List<Membership> allMembership();
	 public Membership getMembershipById(Long id);
	 public List<GymHandler> addGymHandler(GymHandler gymHandler);
	 public List<GymHandler> deleteGymHandler(Long id);
	 public List<GymHandler> allGymHandler();
	
	 public GymOwner addOwner(GymOwner owner);
	 public GymOwner getOwnerById(Long id);
	 public GymOwner editOwner(GymOwner owner);
	 public GymOwner getOwnerByUsername(String username);
	public void assignGymToHandler(Long gymId, Long handlerId);
	public void unassignGymFromHandler(Long handlerId);
	 
	 
	 

}
