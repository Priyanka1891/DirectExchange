package edu.sjsu.cmpe275.Term_Project.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import edu.sjsu.cmpe275.Term_Project.entity.User;
import edu.sjsu.cmpe275.Term_Project.service.UserService;

/**
 * Controller for all the Rest Api request endpoints. This routes the requests
 * to the respective services
 * 
 * @author harshitmalwiya
 *
 */
@RestController
public class UserController {

	@Autowired
	private UserService service;

	/**
	 * POST API end point for User
	 * 
	 * @param username
	 * @param name
	 * @param nickname
	 * @param isVerified
	 * @param authMode
	 * @param password
	 * @return
	 */

	/*
	 * public ResponseEntity createUser(@Param("username") String
	 * username, @Param("name") String name,
	 * 
	 * @Param("nickname") String nickname, @Param("isVerified") Boolean isVerified,
	 * 
	 * @Param("authMode") String authMode, @Param("password") String password) {
	 */

	@PostMapping("/user/signup")
	public ResponseEntity createUser(@RequestBody User userRequest) {

		// User user = new User(userRequest.username, userRequest.name,
		// userRequest.nickname, userRequest.isVerified,userRequest.authMode,
		// userRequest.password);

		try {
			// User createdUser = null;
			/**
			 * Check whether required files are entered or not
			 */
			// if ((username == null || username.equals("") || (name == null ||
			// name.equals(""))
			// || (nickname == null || nickname.equals("")))) {
			// throw new Exception("Required fields(Either username, name or nickname) are
			// null or empty");
			// }
			/**
			 * 
			 * /** Return status 200 after persisting
			 */
			User createdUser = service.createUser(userRequest);
			return ResponseEntity.ok(createdUser);

		} catch (Exception e) {
			/**
			 * Return status 400 if input is invalid
			 */
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
		}

	}

	/**
	 * GET API end point for User
	 * 
	 * @param username
	 * @return
	 */
	@GetMapping("/user/login/{username}")
	public ResponseEntity getUser(@PathVariable String username) {

		User user = service.findUserByUsername(username);
		if (user != null) {
			/**
			 * Return response with status 200
			 */
			return ResponseEntity.ok(user);
		} else {
			/**
			 * Return status 404 if user not found
			 */
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
		}

	}

}
