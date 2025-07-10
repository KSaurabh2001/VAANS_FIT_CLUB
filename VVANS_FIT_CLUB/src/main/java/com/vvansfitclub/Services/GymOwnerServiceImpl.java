package com.vvansfitclub.Services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.vvansfitclub.Repository.GymHandlerRepository;
import com.vvansfitclub.Repository.GymOwnerRepository;
import com.vvansfitclub.Repository.GymRepository;
import com.vvansfitclub.Repository.MembershipRepository;
import com.vvansfitclub.model.Gym;
import com.vvansfitclub.model.GymHandler;
import com.vvansfitclub.model.GymOwner;
import com.vvansfitclub.model.Membership;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class GymOwnerServiceImpl implements GymOwnerService{
	
	
	private final GymRepository gymRepository;
	

	private final GymHandlerRepository gymHandlerRepository;
	
	
	private final MembershipRepository membershipRepository;
	
	
	private final GymOwnerRepository ownerRepository;
	
	
	private final  PasswordEncoder passwordEncoder;
	
	

	@Override
	public List<Gym> createGym(Gym gym) {
		gymRepository.save(gym);
		return getAllGyms();
	}

	@Override
	public Gym getGymById(Long id) {
		
		
		return gymRepository.findById(id)
		        .orElseThrow(() -> new RuntimeException("Gym not found with id: " + id));
	}

	@Override
	public List<Gym> getAllGyms() {
		
		return gymRepository.findAll();
	}

	@Override
	public List<Gym> updateGym(Gym gym) {
		
	
		 Gym existingGym = gymRepository.findById(gym.getId())
		            .orElseThrow(() -> new RuntimeException("Gym not found with id: " + gym.getId()));
		 
		    existingGym.setName(gym.getName());
		    existingGym.setLocation(gym.getLocation());
		    existingGym.setPhone(gym.getPhone());
		    gymRepository.save(existingGym);
		return getAllGyms();
	}

	@Override
	public List<Gym> deleteGym(Long id) {
		
		gymRepository.deleteById(id);
		
		return getAllGyms();
	}

	@Override
	public List<Membership> addMembership(Membership membership) {
		
		membershipRepository.save(membership);
		return allMembership();
	}

	@Override
	public List<Membership> deleteMembership(Long id) {
		
		membershipRepository.deleteById(id);
		
		return membershipRepository.findAll();
	}

	@Override
	public List<Membership> allMembership() {
		
		return membershipRepository.findAll();
	}

	@Override
	public Membership getMembershipById(Long id) {
		
		return membershipRepository.findById(id).orElseThrow(() -> new RuntimeException("Membership not found"));
	}

	@Override
	public List<GymHandler> addGymHandler(GymHandler gymHandler) {
		
		//encrpty password

		String encodedPassword = passwordEncoder.encode(gymHandler.getPassword());
		gymHandler.setPassword(encodedPassword);
		
		gymHandlerRepository.save(gymHandler);
		return allGymHandler();
	}

	@Override
	public List<GymHandler> deleteGymHandler(Long id) {
		
		
		gymHandlerRepository.deleteById(id);
		
		return allGymHandler();
	}

	@Override
	public List<GymHandler> allGymHandler() {
		// TODO Auto-generated method stub
		return gymHandlerRepository.findAll();
	}

	
	
	@Override
	public GymOwner addOwner(GymOwner owner) {
		
		
		String encodedPassword = passwordEncoder.encode(owner.getPassword());
		owner.setPassword(encodedPassword);
		
		return ownerRepository.save(owner);
	}

	@Override
	public GymOwner getOwnerById(Long id) {
		
		return ownerRepository.findById(id).orElseThrow(()-> new RuntimeException("not found"));
		
	}

	@Override
	public GymOwner editOwner(GymOwner owner) {
		
		GymOwner existingOwner = ownerRepository.findById(owner.getId())
	            .orElseThrow(() -> new RuntimeException("Owner not found with id: " + owner.getId()));
		
		  existingOwner.setName(owner.getName());
		    existingOwner.setGender(owner.getGender());
		    existingOwner.setAge(owner.getAge());
		    existingOwner.setLocation(owner.getLocation());
		    existingOwner.setImage(owner.getImage());
		    existingOwner.setOccupation(owner.getOccupation());
		    existingOwner.setAdharNumber(owner.getAdharNumber());
		    existingOwner.setUsername(owner.getUsername()); // if editable
		    existingOwner.setRole(owner.getRole());         // ✅ was missing

		    // ⚠️ Update password only if not null/blank
		    if (owner.getPassword() != null && !owner.getPassword().trim().isEmpty()) {
		    	String encodedPassword = passwordEncoder.encode(owner.getPassword());
		    	 existingOwner.setPassword(encodedPassword); // use encoder if needed
		    }

		    return ownerRepository.save(existingOwner);
	}
	
	@Override
	public GymOwner getOwnerByUsername(String username) {
	    return ownerRepository.findByUsername(username)
	            .orElseThrow(() -> new RuntimeException("Gym Owner not found with username: " + username));
	}

	@Override
	public void assignGymToHandler(Long gymId, Long handlerId) {
		 Gym gym = gymRepository.findById(gymId)
	                .orElseThrow(() -> new RuntimeException("Gym not found"));

	        GymHandler handler = gymHandlerRepository.findById(handlerId)
	                .orElseThrow(() -> new RuntimeException("Gym handler not found"));

//	        gym.setGymHandler(handler);
	        handler.setGym(gym);      
//	        gymRepository.save(gym);
	        gymHandlerRepository.save(handler);
		
	}

	public void unassignGymFromHandler(Long handlerId) {
	    GymHandler handler = gymHandlerRepository.findById(handlerId)
	            .orElseThrow(() -> new RuntimeException("Gym handler not found"));

	    handler.setGym(null); // 🔑 unassign gym
	    gymHandlerRepository.save(handler);
	}
	

}
