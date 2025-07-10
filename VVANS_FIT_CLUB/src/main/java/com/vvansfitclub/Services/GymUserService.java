package com.vvansfitclub.Services;

import java.util.List;

import com.vvansfitclub.model.ClassSession;
import com.vvansfitclub.model.GymOwner;
import com.vvansfitclub.model.GymUser;
import com.vvansfitclub.model.Membership;
import com.vvansfitclub.model.Trainer;

public interface GymUserService {
	
	
	 public List<ClassSession> enrollForSession(Long UserId, Long SessionId);
	 public List<ClassSession> unenrollForSession(Long UserId, Long SessionId);
	 public GymUser getGymUserById(Long id);
	 public GymUser editGymUser(GymUser owner);
	 public GymUser getGymUserByUsername(String username);
	 public List<ClassSession> userSession(Long id);
	 public Trainer userTrainer(Long id);
	 public Membership userPlan(Long id);

}
