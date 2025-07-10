package com.vvansfitclub.Services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.vvansfitclub.Repository.ClassSessionRepository;
import com.vvansfitclub.Repository.GymHandlerRepository;
import com.vvansfitclub.Repository.GymRepository;
import com.vvansfitclub.Repository.GymUserRepository;
import com.vvansfitclub.Repository.MembershipRepository;
import com.vvansfitclub.Repository.TrainerRepository;
import com.vvansfitclub.model.ClassSession;
import com.vvansfitclub.model.Gym;
import com.vvansfitclub.model.GymHandler;
import com.vvansfitclub.model.GymUser;
import com.vvansfitclub.model.Membership;
import com.vvansfitclub.model.Trainer;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class GymHandlerServiceImpl implements GymHandlerService {

	
	private final TrainerRepository trainerRepository;
	private final GymUserRepository gymUserRepository;
	private final ClassSessionRepository sessionRepository;
	private final GymHandlerRepository gymHandlerRepository;
	private final GymRepository gymRepo;
	private final MembershipRepository planRepo;
	private final PasswordEncoder passwordEncoder;
	
	public List<GymUser> addGymUser(GymUser user) {
		
		Gym gym=gymRepo.findById(user.getGymID()).orElseThrow(() -> new RuntimeException("gym not found"));
		user.setGym(gym);
		String encodedPassword = passwordEncoder.encode(user.getPassword());
		user.setPassword(encodedPassword);
		gymUserRepository.save(user);
		
		return allUser();
	}

	@Override
	public List<GymUser> deleteGymUser(Long id) {
		
		gymUserRepository.deleteById(id);
		
		return allUser();
	}

	@Override
	public List<GymUser> allUser() {
		
		return gymUserRepository.findAll();
	}

	@Override
	public List<Trainer> addTrainer(Trainer trainer) {
		Gym gym=gymRepo.findById(trainer.getGymID()).orElseThrow(() -> new RuntimeException("gym not found"));
		trainer.setGym(gym);
		
		String encodedPassword = passwordEncoder.encode(trainer.getPassword());
		trainer.setPassword(encodedPassword);
		trainerRepository.save(trainer);
		return allTrainer();
	}

	@Override
	public List<Trainer> deleteTrainer(Long id) {
		 Trainer trainer = trainerRepository.findById(id)
			        .orElseThrow(() -> new RuntimeException("Trainer not found"));

			    return allTrainer();
	}

	@Override
	public List<Trainer> allTrainer() {
		// TODO Auto-generated method stub
		return trainerRepository.findAll();
	}

	@Override
	public List<ClassSession> addClassSession(ClassSession session) {
		Gym gym=gymRepo.findById(session.getGymID()).orElseThrow(() -> new RuntimeException("gym not found"));
		session.setGym(gym);
		sessionRepository.save(session);
		return allSession();
	}

	@Override
	public List<ClassSession> allSession() {
		// TODO Auto-generated method stub
		return sessionRepository.findAll();
	}

	@Override
	public List<ClassSession> deleteSession(Long id) {
		
		sessionRepository.deleteById(id);
		return allSession();
	}

	@Override
	public List<ClassSession> updateSession(ClassSession session){
	ClassSession existing = sessionRepository.findById(session.getId())
    .orElseThrow(() -> new RuntimeException("Class session not found with id: " + session.getId()));

        // ✅ Only update basic fields (DO NOT overwrite relationships!)
       existing.setName(session.getName());
       existing.setTiming(session.getTiming());
       existing.setDescription(session.getDescription());
       existing.setImage(session.getImage());
       existing.setGymID(session.getGymID());

      
        sessionRepository.save(existing);

       return sessionRepository.findAll(); // or your custom getAllSessions()
      }
	

	public void assignTrainerToUser(Long userId, Long trainerId) {
	   
	    GymUser user = gymUserRepository.findById(userId)
	        .orElseThrow(() -> new RuntimeException("GymUser not found with id: " + userId));

	    Trainer trainer = trainerRepository.findById(trainerId)
	        .orElseThrow(() -> new RuntimeException("Trainer not found with id: " + trainerId));

	   
	    user.setTrainer(trainer);

	    if (trainer.getUser() == null) {
	        trainer.setUser(new ArrayList<>());
	    }
	    if (!trainer.getUser().contains(user)) {
	        trainer.getUser().add(user);
	    }
	   
	  
	    
	    gymUserRepository.save(user); // ✅ sufficient for JPA

	}
	public void unassignTrainerFromUser(Long userId, Long trainerId) {
	    GymUser user = gymUserRepository.findById(userId)
	        .orElseThrow(() -> new RuntimeException("GymUser not found with id: " + userId));

	    Trainer trainer = trainerRepository.findById(trainerId)
	        .orElseThrow(() -> new RuntimeException("Trainer not found with id: " + trainerId));

	    // Remove trainer from user
	    if (user.getTrainer() != null && user.getTrainer().getId().equals(trainerId)) {
	        user.setTrainer(null);
	    }

	    // Remove user from trainer's list
	    if (trainer.getUser() != null) {
	        trainer.getUser().removeIf(u -> u.getId().equals(userId));
	    }

	    // Save changes
	    gymUserRepository.save(user);
	}

	@Override
	public void assignTrainerToSession(Long sessionId, Long trainerId) {
		

	    Trainer trainer = trainerRepository.findById(trainerId)
	        .orElseThrow(() -> new RuntimeException("Trainer not found with id: " + trainerId));
	    
	    ClassSession session=sessionRepository.findById(sessionId).
	    		orElseThrow(() -> new RuntimeException("Session not found with id: " + sessionId));
	    
	    session.setTrainer(trainer);
	    
	    if (trainer.getClassSession() == null) {
	        trainer.setClassSession(new ArrayList<>());
	    }
	    if (!trainer.getClassSession().contains(session)) {
	        trainer.getClassSession().add(session);
	    }

	    sessionRepository.save(session);
	}
	public void unassignTrainerFromSession(Long sessionId, Long trainerId) {
	    Trainer trainer = trainerRepository.findById(trainerId)
	        .orElseThrow(() -> new RuntimeException("Trainer not found with id: " + trainerId));

	    ClassSession session = sessionRepository.findById(sessionId)
	        .orElseThrow(() -> new RuntimeException("Session not found with id: " + sessionId));

	    // Only unassign if trainer is currently assigned to the session
	    if (session.getTrainer() != null && session.getTrainer().getId().equals(trainerId)) {
	        session.setTrainer(null);  // Remove trainer from session
	    }

	    if (trainer.getClassSession() != null) {
	        trainer.getClassSession().removeIf(s -> s.getId().equals(sessionId)); // Remove session from trainer
	    }

	    sessionRepository.save(session); // save owning side
	}


	
	public GymHandler editProfile(GymHandler handler) {
	    GymHandler existing = gymHandlerRepository.findById(handler.getId())
	        .orElseThrow(() -> new RuntimeException("Handler not found with id: " + handler.getId()));
	    existing.setName(handler.getName());
	    existing.setGender(handler.getGender());
	    existing.setAge(handler.getAge());
	    existing.setOccupation(handler.getOccupation());
	    existing.setLocation(handler.getLocation());
	    existing.setImage(handler.getImage());
	    existing.setAdharNumber(handler.getAdharNumber());
	    existing.setUsername(handler.getUsername());      // ✅ missing
	    existing.setRole(handler.getRole());              // ✅ missing

		
	    // ⚠️ Update password only if explicitly changed (optional: encode)
	    if (handler.getPassword() != null && !handler.getPassword().trim().isEmpty()) {
	    	String encodedPassword = passwordEncoder.encode(handler.getPassword());
			existing.setPassword(encodedPassword);
	    }

	    return gymHandlerRepository.save(existing);
	}
     public GymHandler getGymHandlerById(Long id) {
		
		return gymHandlerRepository.findById(id).orElseThrow(() -> new RuntimeException("GymHandler not found"));
	}
     
     public GymHandler getGymHandlerByUsername(String username) {
    	    return gymHandlerRepository.findByUsername(username)
    	        .orElseThrow(() -> new RuntimeException("GymHandler not found with username: " + username));
    	}
     
     public List<GymUser> updatePaymentStatus(Long gymUserId, String newStatus, String plan) {
    	    GymUser user = gymUserRepository.findById(gymUserId)
    	        .orElseThrow(() -> new RuntimeException("GymUser not found with id: " + gymUserId));
    	    
    	  Membership memebership=  planRepo.findByName(plan).orElseThrow(() -> new RuntimeException("not found"));

    	    user.setPaymentStatus(newStatus);
    	    user.setMembership(memebership);
    	    gymUserRepository.save(user);
    	    return gymUserRepository.findAll();
    	}

	 @Override
	 public ClassSession sessionById(Long id) {
		ClassSession session= sessionRepository.findById(id).orElseThrow(() -> new RuntimeException("not found"));
		return session;
	 }


}
