package edu.sjsu.cmpe275.Term_Project.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import edu.sjsu.cmpe275.Term_Project.entity.BankAccount;
import edu.sjsu.cmpe275.Term_Project.requestModels.BankAccountRequestModel;
import edu.sjsu.cmpe275.Term_Project.service.BankAccountService;

/**
 * Controller for all the Bank Account Rest Api request endpoints. This routes the requests to the respective services
 * @author sumeetdeshpande
 *
 */
@RestController
public class BankAccountController {
	
	@Autowired
	private BankAccountService bankAccountService;
	
	/**
	 * POST API end point for Bank Account
	 * @param bankAccountDetails
	 * @return
	 */
	@PostMapping("/bankAccount")
	public ResponseEntity createBankAccount(@RequestBody BankAccountRequestModel bankAccountDetailsRequest) {
		
		BankAccount bankAccountDetails = new BankAccount(bankAccountDetailsRequest.getBankName(),
				bankAccountDetailsRequest.getCountry(),
				bankAccountDetailsRequest.getAccountNumber(),
				bankAccountDetailsRequest.getOwnerName(),
				bankAccountDetailsRequest.getOwnerAddress(),
				bankAccountDetailsRequest.getPrimaryCurrency(),
				bankAccountDetailsRequest.getModeSupported());
		
		String userName = bankAccountDetailsRequest.getUserName();
		
		try {
			
			BankAccount createdBankAccount = null;
			
			if(userName!=null && !userName.equals("")) {
				createdBankAccount = bankAccountService.createBankAccount(bankAccountDetails, userName);
			} else {
				throw new Exception("User Name not provided");
			}
			/**
			 * Return response with status 200
			 */
			return ResponseEntity.ok(createdBankAccount);
			
		} catch(Exception e) {
			/**
			 * Return status 400 if input is invalid
			 */
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.toString());
		}
		
		
	}
	
}
