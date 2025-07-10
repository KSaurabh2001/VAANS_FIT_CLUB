package com.vvansfitclub.model;

import jakarta.persistence.Column;
import jakarta.persistence.MappedSuperclass;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@MappedSuperclass
public abstract class UserInterface {
	
	public String name;
	public String gender;
	public String occupation;
	 @Column(unique = true, nullable = false)
	public String username;
	 @Column(nullable = false)
	public String password;
	public String image;
	public String age;
	public String role;
	public String adharNumber;
	public String location;
	
	

}
