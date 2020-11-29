package edu.sjsu.cmpe275.Term_Project.entity;

import javax.persistence.Embedded;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import org.springframework.lang.NonNull;

/**
 * Entity object for User. This is mapped to the User Table in the database
 * 
 * @author sumeetdeshpande, AmbikaNa
 *
 */
@Entity
@Table(name = "User")
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "username")
public class User {

	// @Id
	// @GeneratedValue
	// private long id;
	@Id
	@Column(unique = true)
	@NonNull
	private String username; // Email

	@NonNull
	private String name;

	@Column(unique = true)
	private String nickname;


	private Boolean isVerified = false;

	private String authMode;

	private String password;

	// public long getId() {
	// return id;
	// }

	// public void setId(long id) {
	// this.id = id;
	// }

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getNickname() {
		return nickname;
	}

	public void setNickname(String nickname) {
		this.nickname = nickname;
	}

	public Boolean getIsVerified() {
		return isVerified;
	}

	public void setIsVerified(Boolean isVerified) {
		this.isVerified = isVerified;
	}

	public String getAuthMode() {
		return authMode;
	}

	public void setAuthMode(String authMode) {
		this.authMode = authMode;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public User(String username, String name, String nickname, Boolean isVerified, String authMode, String password) {

		this.username = username;
		this.name = name;
		this.nickname = nickname;
		this.isVerified = isVerified;
		this.authMode = authMode;
		this.password = password;
	}

	public User() {
	}

}
