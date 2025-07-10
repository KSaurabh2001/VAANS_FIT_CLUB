	package com.vvansfitclub.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.vvansfitclub.Repository.GymHandlerRepository;
import com.vvansfitclub.Repository.GymOwnerRepository;
import com.vvansfitclub.Repository.GymUserRepository;
import com.vvansfitclub.Repository.TrainerRepository;
import com.vvansfitclub.Services.AuthService;
import com.vvansfitclub.dto.JwtResponse;
import com.vvansfitclub.dto.LoginRequest;
import com.vvansfitclub.jwt.JwtAuthenticationHelper;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;



@RestController
@RequestMapping("/api/auth")
public class AuthController {


	@Autowired
	AuthService authService;
	@Autowired
	JwtAuthenticationHelper jwtHelper;
	
	@Autowired 
	UserDetailsService userDetailsService;
	   @Autowired GymOwnerRepository ownerRepo;
	    @Autowired  GymHandlerRepository handlerRepo;
	    @Autowired  TrainerRepository trainerRepo;
	    @Autowired  GymUserRepository gymUserRepo;

	
	@PostMapping("/login")
	public ResponseEntity<JwtResponse> login(@RequestBody LoginRequest jwtRequest)
	{
		return new ResponseEntity<>(authService.login(jwtRequest),HttpStatus.OK);
	}
	
	@GetMapping("/me")
	public ResponseEntity<Object> getUserByToken(@RequestHeader("Authorization") String token) {
	    String actualToken = token.replace("Bearer ", "");
	    String username = jwtHelper.getUsernameFromToken(actualToken);

	    Object user = ownerRepo.findByUsername(username)
	            .map(u -> (Object) u)
	            .or(() -> handlerRepo.findByUsername(username).map(u -> (Object) u))
	            .or(() -> trainerRepo.findByUsername(username).map(u -> (Object) u))
	            .or(() -> gymUserRepo.findByUsername(username).map(u -> (Object) u))
	            .orElseThrow();

	    return ResponseEntity.ok(user);
	}

}
