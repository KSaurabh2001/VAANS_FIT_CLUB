package com.vvansfitclub.model;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
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
@Table(name="classsession")
public class ClassSession {
	
	@Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
	
	@Column
	String name;
	
	@Column
	String timing;
	
	@Column
	String Description;
	
	@Column
	String image;
	
	@Column
	Long gymID;
	
	
	@ManyToOne
	@JoinColumn(name="trainer_id")
	@JsonBackReference("trainer-classSession")
	Trainer trainer;
	
	
	@ManyToOne
	@JoinColumn(name="gym_id")
	@JsonBackReference("gym-classSession")
	Gym gym;
	
   @ManyToMany
   @JoinTable( name="gymUser_classSession" , joinColumns =@JoinColumn(name="classSession_id"),
          inverseJoinColumns=@JoinColumn(name="gymUser_id") )
	List<GymUser> gymUSer;
}
