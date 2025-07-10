package com.vvansfitclub.model;

import java.util.Collection;
import java.util.Collections;
import java.util.List;

import org.hibernate.annotations.ManyToAny;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name="gymuser")
public class GymUser extends UserInterface implements UserDetails {
	
	@Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
	
	@Column
	String paymentStatus;
	@Column
	Long gymID;
	
	@ManyToOne
	@JoinColumn(name="gym_id")
	@JsonBackReference("gym-gymUser")
	Gym gym;
	
	@ManyToOne
	@JoinColumn(name="membership_id")
	@JsonBackReference("memebrship-user")
	Membership membership;
	
	@ManyToMany(mappedBy="gymUSer")
	@JsonIgnore
	List<ClassSession> classSession;
	
	@ManyToOne
	@JoinColumn(name="trainer_id")
	@JsonBackReference("trainer-user")
	Trainer trainer;
	
	@ManyToOne
	@JoinColumn(name="diet_id")
	Diet diet;
	
	@ManyToMany(cascade = CascadeType.ALL)
	@JoinTable(
	    name = "user_workout",
	    joinColumns = @JoinColumn(name = "user_id"),
	    inverseJoinColumns = @JoinColumn(name = "workout_id")
	)
	private List<Workout> workout;
	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		// TODO Auto-generated method stub
		return Collections.emptyList();
	}
	

}
