package com.vvansfitclub.model;

import java.util.Collection;
import java.util.Collections;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
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
@Table(name="gymtrainer")
public class Trainer extends UserInterface implements UserDetails {
	
	@Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
	
	@Column
	Long gymID;
	
	
	@Column
	String speciality;
	
	@ManyToOne
	@JoinColumn(name = "gym_id")
	@JsonBackReference("gym-trainers")
	Gym gym;
	
	@OneToMany(mappedBy="trainer" , cascade = CascadeType.ALL,fetch = FetchType.EAGER)	
	@JsonManagedReference("trainer-classSession")
	List<ClassSession> classSession;
	
	@OneToMany(mappedBy="trainer" , cascade = CascadeType.ALL,fetch = FetchType.EAGER)	
	@JsonManagedReference("trainer-user")
	List<GymUser> user;

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		// TODO Auto-generated method stub
		return Collections.emptyList();
	}
	

}
