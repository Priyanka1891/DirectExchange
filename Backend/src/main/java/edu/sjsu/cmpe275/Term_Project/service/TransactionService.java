package edu.sjsu.cmpe275.Term_Project.service;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import edu.sjsu.cmpe275.Term_Project.entity.ExchangeOffer;
import edu.sjsu.cmpe275.Term_Project.entity.TransactionDetails;
import edu.sjsu.cmpe275.Term_Project.entity.User;
import edu.sjsu.cmpe275.Term_Project.repository.ExchangeOfferRepository;
import edu.sjsu.cmpe275.Term_Project.repository.TransactionRepository;
import edu.sjsu.cmpe275.Term_Project.repository.UserRepository;

/**
 * TransactionService which makes the call to the Repository for performing CRUD operations
 * @author sumeetdeshpande
 *
 */
@Service
public class TransactionService {

	@Autowired
	private TransactionRepository transactionRepository;
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private ExchangeOfferRepository exchangeOfferRepository;
	
	public List<TransactionDetails> getTransactionsByUserName(String userName) throws Exception {
		
		User user = userRepository.findById(userName).orElse(null);
		if(user==null) {
			throw new Exception("User does not exist");
		}
		List<TransactionDetails> transactionList = transactionRepository.getAllTransactionsOfUser(userName);
		return transactionList;
		
	}
	
	public List<TransactionDetails> getPendingTransactionsByUserName(String userName) throws Exception {
		
		User user = userRepository.findById(userName).orElse(null);
		if(user==null) {
			throw new Exception("User does not exist");
		}
		List<TransactionDetails> pendingTransactionList = transactionRepository.getPendingTransactionsOfUser(userName);
		return pendingTransactionList;
		
	}
	
	public boolean updateTransactionsBasedOnPayment(long exchangeOfferId, String userName, double amount) throws Exception {
		
		User user = userRepository.findById(userName).orElse(null);
		ExchangeOffer exchangeOffer = exchangeOfferRepository.findById(exchangeOfferId).orElse(null);
		
		if(user==null) {
			throw new Exception("User does not exist");
		}
		
		List<TransactionDetails> allPartiesBasedOnOffer = transactionRepository.getAllPartiesForAnOffer(exchangeOffer);
		boolean allPartiesPaid = true;
		/**
		 * Update status of the user who has paid
		 */
		for(TransactionDetails t: allPartiesBasedOnOffer) {
			if(t.getUsername().equalsIgnoreCase(userName)) {
				t.setStatus("Paid");
				t.setAmount(amount*0.9995);
				t.setServiceFee(amount*0.0005);
			}
		}
		/**
		 * Check if all parties have paid
		 */
		for(TransactionDetails t: allPartiesBasedOnOffer) {
			if(!(t.getStatus().equalsIgnoreCase("Paid"))) {
				allPartiesPaid = false;
			}
		}
		/**
		 * If all parties have paid, mark status as fulfilled
		 */
		if(allPartiesPaid) {
			for(TransactionDetails t: allPartiesBasedOnOffer) {
				t.setStatus("Fulfilled");
			}
		}
		/**
		 * Save the status in the repository eventually
		 */
		for(TransactionDetails t: allPartiesBasedOnOffer) {
			transactionRepository.save(t);
		}
		
		return allPartiesPaid;
		
	}
	
	public List<TransactionDetails> getAllPartiesForAnOffer(ExchangeOffer exchangeOffer) throws Exception {
		
		List<TransactionDetails> allPartiesBasedOnOffer = transactionRepository.getAllPartiesForAnOffer(exchangeOffer);
		return allPartiesBasedOnOffer;
		
	}
	
	
	
}
