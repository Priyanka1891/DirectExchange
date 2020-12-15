package edu.sjsu.cmpe275.Term_Project.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import edu.sjsu.cmpe275.Term_Project.constants.Constants;
import edu.sjsu.cmpe275.Term_Project.entity.ExchangeOffer;
import edu.sjsu.cmpe275.Term_Project.entity.TransactionDetails;
import edu.sjsu.cmpe275.Term_Project.requestModels.TransactionDetailsModel;
import edu.sjsu.cmpe275.Term_Project.requestModels.UserReportingModel;
import edu.sjsu.cmpe275.Term_Project.service.TransactionService;

@RestController
public class TransactionController {
	
	@Autowired
	private TransactionService transactionService;
	
	@CrossOrigin(origins = Constants.FRONT_END_URL)
	@GetMapping("/transaction/{userName}")
	public ResponseEntity getTransactionByUserName(@PathVariable String userName) {
		try {	
			
			List<UserReportingModel> reportings = transactionService.getTransactionsByUserName(userName);
			return ResponseEntity.ok(reportings);
		} catch(Exception e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
		}

	}
	
	@CrossOrigin(origins = Constants.FRONT_END_URL)
	@GetMapping("/alltransactions")
	public ResponseEntity getAllTransactions() {
		try {	
			
			List<TransactionDetails> transactionList = transactionService.getAllTransactions();
			return ResponseEntity.ok(transactionList);
		} catch(Exception e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
		}

	}
	
	
	@CrossOrigin(origins = Constants.FRONT_END_URL)
	@GetMapping("/transaction/pendingTransactions/{userName}")
	public ResponseEntity getPendingTransactionsByUserName(@PathVariable String userName) {
		try {	
			List<TransactionDetails> transactionList = transactionService.getPendingTransactionsByUserName(userName);
			return ResponseEntity.ok(transactionList);
		} catch(Exception e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
		}

	}
	
	@CrossOrigin(origins = Constants.FRONT_END_URL)
	@PostMapping("/transaction/allPartiesForOffer/")
	public ResponseEntity getPendingTransactionsByUserName(@RequestBody ExchangeOffer exchangeOffer) {
		try {	
			List<TransactionDetails> transactionList = transactionService.getAllPartiesForAnOffer(exchangeOffer);
			return ResponseEntity.ok(transactionList);
		} catch(Exception e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
		}
	}
	
	@CrossOrigin(origins = Constants.FRONT_END_URL)
	@PostMapping("/transaction/updateTransactionsBasedOnPayment/")
	public ResponseEntity updateTransactionsBasedOnPayment(@RequestBody TransactionDetailsModel transactionDetailsModel){
		try {
			long exchangeOfferId = transactionDetailsModel.getExchangeOfferId();
			String userName = transactionDetailsModel.getUserName();
			double amount = transactionDetailsModel.getAmount();
			boolean allPartiesPaid = transactionService.updateTransactionsBasedOnPayment(exchangeOfferId, userName, amount);
			return ResponseEntity.ok(allPartiesPaid);
		} catch(Exception e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
		}
		
	}
	

}
