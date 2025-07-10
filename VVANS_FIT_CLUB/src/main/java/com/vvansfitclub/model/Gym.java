package com.vvansfitclub.model;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
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
@Table(name="gym")
public class Gym {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	Long id;
	
	@Column
	String name;
	
	@Column
	String location;
	
	@Column
	String phone;
	
	
	@OneToOne(mappedBy = "gym") // inverse side
	@JsonBackReference("gym-handler") // ✅ back side (excluded from JSON)
	private GymHandler gymHandler;
	
	@OneToMany(mappedBy = "gym", cascade = CascadeType.ALL,fetch = FetchType.EAGER)
	@JsonManagedReference("gym-trainers")
	List<Trainer> trainer;
	 
	@OneToMany(mappedBy = "gym", cascade = CascadeType.ALL,fetch = FetchType.EAGER)
    @JsonManagedReference("gym-gymUser")
	List<GymUser> gymUSer;
	
	@OneToMany(mappedBy = "gym", cascade = CascadeType.ALL,fetch = FetchType.EAGER)
	@JsonManagedReference("gym-classSession")
	List<ClassSession> classSession;
	
	
	

}
