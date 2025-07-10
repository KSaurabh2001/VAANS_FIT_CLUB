package com.vvansfitclub.Services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.vvansfitclub.Repository.ClassSessionRepository;
import com.vvansfitclub.Repository.GymHandlerRepository;
import com.vvansfitclub.Repository.GymOwnerRepository;
import com.vvansfitclub.Repository.GymRepository;
import com.vvansfitclub.Repository.GymUserRepository;
import com.vvansfitclub.Repository.MembershipRepository;
import com.vvansfitclub.model.ClassSession;
import com.vvansfitclub.model.GymUser;
import com.vvansfitclub.model.Membership;
import com.vvansfitclub.model.Trainer;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class GymUserServiceImpl implements GymUserService {

    private final GymUserRepository gymUserRepository;

    
    private final ClassSessionRepository classSessionRepository;
	private final  PasswordEncoder passwordEncoder;

    // ✅ Enroll a user for a session
    @Override
    public List<ClassSession> enrollForSession(Long userId, Long sessionId) {
        GymUser user = gymUserRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with ID: " + userId));
        ClassSession session = classSessionRepository.findById(sessionId)
                .orElseThrow(() -> new RuntimeException("Session not found with ID: " + sessionId));

        if (user.getClassSession() == null)
            user.setClassSession(new ArrayList<>());

        if (!user.getClassSession().contains(session)) {
            user.getClassSession().add(session);
        }

        if (session.getGymUSer() == null)
            session.setGymUSer(new ArrayList<>());

        if (!session.getGymUSer().contains(user)) {
            session.getGymUSer().add(user);
        }

        gymUserRepository.save(user);
        classSessionRepository.save(session);
        
        return user.getClassSession();
    }

    // ✅ Unenroll a user from a session
    @Override
    public List<ClassSession> unenrollForSession(Long userId, Long sessionId) {
        GymUser user = gymUserRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with ID: " + userId));
        ClassSession session = classSessionRepository.findById(sessionId)
                .orElseThrow(() -> new RuntimeException("Session not found with ID: " + sessionId));

        if (user.getClassSession() != null)
            user.getClassSession().remove(session);

        if (session.getGymUSer() != null)
            session.getGymUSer().remove(user);

        gymUserRepository.save(user);
        classSessionRepository.save(session);
        
        return user.getClassSession();
    }

    // ✅ Get user by ID
    @Override
    public GymUser getGymUserById(Long id) {
        return gymUserRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found with ID: " + id));
    }

    // ✅ Edit user profile
    @Override
    public GymUser editGymUser(GymUser user) {
        GymUser existing = gymUserRepository.findById(user.getId())
                .orElseThrow(() -> new RuntimeException("User not found with ID: " + user.getId()));
        existing.setName(user.getName());
        existing.setGender(user.getGender());
        existing.setAge(user.getAge());
        existing.setOccupation(user.getOccupation());
        existing.setLocation(user.getLocation());
        existing.setImage(user.getImage());
        existing.setAdharNumber(user.getAdharNumber());
        existing.setUsername(user.getUsername()); // ✅ was missing
        existing.setRole(user.getRole());         // ✅ was missing
        existing.setGymID(user.getGymID());
        // ⚠️ Update password only if provided (and maybe hash it)
        if (user.getPassword() != null && !user.getPassword().trim().isEmpty()) {
        	String encodedPassword = passwordEncoder.encode(user.getPassword());
    		existing.setPassword(encodedPassword);
            // or encode: passwordEncoder.encode(user.getPassword())
        }

        return gymUserRepository.save(existing);
    }

    // ✅ Get user by username
    @Override
    public GymUser getGymUserByUsername(String username) {
        return gymUserRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("GymUser not found with username: " + username));
    }

	@Override
	public List<ClassSession> userSession(Long id) {
		
		GymUser user=gymUserRepository.findById(id)
        .orElseThrow(() -> new RuntimeException("User not found with ID: " + id));
		
		
		return user.getClassSession();
	}

	@Override
	public Trainer userTrainer(Long id) {
		GymUser user=gymUserRepository.findById(id)
		        .orElseThrow(() -> new RuntimeException("User not found with ID: " + id));
				
		return user.getTrainer();
	}

	@Override
	public Membership userPlan(Long id) {
		GymUser user=gymUserRepository.findById(id)
		        .orElseThrow(() -> new RuntimeException("User not found with ID: " + id));
		return user.getMembership();
	}
}
