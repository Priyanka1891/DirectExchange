package edu.sjsu.cmpe275.Term_Project.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import edu.sjsu.cmpe275.Term_Project.entity.ExchangeOffer;
import edu.sjsu.cmpe275.Term_Project.entity.User;
import edu.sjsu.cmpe275.Term_Project.repository.ExchangeOfferRepository;
import edu.sjsu.cmpe275.Term_Project.repository.UserRepository;

/**
 * ExchangeOfferService which makes the call to the Repository for performing CRUD operations
 * @author sumeetdeshpande
 *
 */
@Service
public class ExchangeOfferService {

	@Autowired
	private ExchangeOfferRepository exchangeOfferRepository;
	
	@Autowired
	private UserRepository userRepository;
	
	public ExchangeOffer createExchangeOffer(ExchangeOffer exchangeOffer, String userName) throws Exception{
		
		User user = userRepository.findById(userName).orElse(null);
		
		if(user==null) {
			throw new Exception("User does not exist");
		}
		
		exchangeOffer.setUser(user);
		
		return exchangeOfferRepository.save(exchangeOffer);
		
	}
	
	public List<ExchangeOffer> getMatchingExchangeOffersBasedOnCountry(String destinationCountry, String destinationCurrency, 
			String sourceCountry, String sourceCurrency, String userName) throws Exception{
		
		User user = userRepository.findById(userName).orElse(null);
		
		if(user==null) {
			throw new Exception("User does not exist");
		}
		
		List<ExchangeOffer> matchingOffers = exchangeOfferRepository.getMatchingExchangeOffersBasedOnCountry(destinationCountry, destinationCurrency, sourceCountry, sourceCurrency, user);
		
		return matchingOffers;
	}
	
}
