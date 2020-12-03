package edu.sjsu.cmpe275.Term_Project.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
//import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

/**
 * Entity Object for Exchange Offer
 * @author priyankasharma
 *
 */

//Transaction Details ID
//Transaction ID (Child)
//Username
//Amount
//% of total amount
//IsTransferred? Boolean

@Entity
@Table(name= "Transaction_Details")
public class TransactionDetails {
	
	@Id
	@GeneratedValue
	private long id;
	
	@OneToOne
	@JsonIgnore
	private ExchangeOffer exchange_offer;
	


	private String Username;
	
	private double amount;
	
	private String createDate;
	
	private String expiryDate;
	
	private double percentOfTotalAmount;
	
	private Boolean isTransferred=false;
	
	
	public TransactionDetails() {
		
	}

	public TransactionDetails(String Username, double amount, String createDate, String expiryDate, double percentOfTotalAmount) {
		this.Username = Username;
		this.amount = amount;
		this.createDate = createDate;
		this.expiryDate = expiryDate;
		this.percentOfTotalAmount = percentOfTotalAmount;	
	}
	
	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public ExchangeOffer getExchange_offer() {
		return exchange_offer;
	}

	public void setExchange_offer(ExchangeOffer exchange_offer) {
		this.exchange_offer = exchange_offer;
	}
	
	public String getUsername() {
		return Username;
	}

	public void setUsername(String username) {
		Username = username;
	}

	public double getAmount() {
		return amount;
	}

	public void setAmount(double amount) {
		this.amount = amount;
	}

	public Boolean getIsTransferred() {
		return isTransferred;
	}

	public void setIsTransferred(Boolean isTransferred) {
		this.isTransferred = isTransferred;
	}

	public double getPercentOfTotalAmount() {
		return percentOfTotalAmount;
	}

	public void setPercentOfTotalAmount(double percentOfTotalAmount) {
		this.percentOfTotalAmount = percentOfTotalAmount;
	}
	
	public String getCreateDate() {
		return createDate;
	}

	public void setCreateDate(String createDate) {
		this.createDate = createDate;
	}

	public String getExpiryDate() {
		return expiryDate;
	}

	public void setExpiryDate(String expiryDate) {
		this.expiryDate = expiryDate;
	}
}
