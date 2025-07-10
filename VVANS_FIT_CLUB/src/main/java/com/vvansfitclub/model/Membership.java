package com.vvansfitclub.model;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
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
@Table(name="membership")
public class Membership {

	@Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
	
	@Column
	String name;
	
	@Column
	String price;
	
	@Column
	String duration;
	
	@ElementCollection
	@Column(name = "feature")
	private List<String> features;
	
	@OneToMany(mappedBy="membership", cascade = CascadeType.ALL,fetch = FetchType.EAGER)
	@JsonManagedReference("memebrship-user")
	List<GymUser> gymUser;
	
	
}
