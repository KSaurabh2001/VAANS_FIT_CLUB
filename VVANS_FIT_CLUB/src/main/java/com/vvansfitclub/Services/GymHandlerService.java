package com.vvansfitclub.Services;

import java.util.List;

import com.vvansfitclub.model.ClassSession;
import com.vvansfitclub.model.GymHandler;
import com.vvansfitclub.model.GymUser;
import com.vvansfitclub.model.Trainer;

public interface GymHandlerService {
	
	public List<GymUser> addGymUser(GymUser user);
	public List<GymUser> deleteGymUser(Long id);
	public List<GymUser> allUser();
	 public List<GymUser> updatePaymentStatus(Long gymUserId, String newStatus, String plan);
	
	public List<Trainer> addTrainer(Trainer trainer);
	public List<Trainer> deleteTrainer(Long id);
	public List<Trainer> allTrainer();
	
	
	public List<ClassSession> addClassSession(ClassSession session);
	public List<ClassSession> allSession();
	public List<ClassSession> deleteSession(Long id);
	public List<ClassSession> updateSession(ClassSession sesssion);
	
	public void assignTrainerToUser(Long userId, Long trainerId);
	public void assignTrainerToSession(Long sessionId, Long trainerId);
	
	 public GymHandler editProfile(GymHandler handler);
	 public GymHandler getGymHandlerById(Long id);
	 public GymHandler getGymHandlerByUsername(String username);
	public void unassignTrainerFromUser(Long userId, Long trainerId);
	public void unassignTrainerFromSession(Long sessionId, Long trainerId);
	public ClassSession sessionById(Long id);
}
