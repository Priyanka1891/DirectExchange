package edu.sjsu.cmpe275.Term_Project.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import edu.sjsu.cmpe275.Term_Project.entity.ExchangeOffer;
import edu.sjsu.cmpe275.Term_Project.requestModels.ExchangeOfferRequestModel;
import edu.sjsu.cmpe275.Term_Project.service.ExchangeOfferService;

/**
 * Controller for all the ExchangeOffer Rest Api request endpoints. This routes the requests to the respective services
 * @author sumeetdeshpande
 *
 */
@RestController
public class ExchangeOfferController {
	
	@Autowired
	private ExchangeOfferService exchangeOfferService;
	
	/**
	 * POST API end point for Exchange Offer
	 * @param exchangeOfferDetailsRequest
	 * @return
	 */
	@PostMapping("/exchangeOffer")
	public ResponseEntity createExchangeOffer(@RequestBody ExchangeOfferRequestModel exchangeOfferDetailsRequest) {
		
		ExchangeOffer exchangeOfferDetails = new ExchangeOffer(exchangeOfferDetailsRequest.getSourceCountry(),
				exchangeOfferDetailsRequest.getSourceCurrency(),
				exchangeOfferDetailsRequest.getAmountToRemitSourceCurrency(),
				exchangeOfferDetailsRequest.getDestinationCountry(),
				exchangeOfferDetailsRequest.getDestinationCurrency(),
				exchangeOfferDetailsRequest.getExchangeRate(),
				exchangeOfferDetailsRequest.getExpirationDate(),
				exchangeOfferDetailsRequest.getAllowCounterOffers(),
				exchangeOfferDetailsRequest.getAllowSplitExchanges(),
				exchangeOfferDetailsRequest.getReceivingBankName(),
				exchangeOfferDetailsRequest.getReceivingAccountNumber(),
				exchangeOfferDetailsRequest.getOfferStatus());
		
		String userName = exchangeOfferDetailsRequest.getUserName();
		
		try {
			ExchangeOffer createdExchangeOffer = null;
			
			if(userName!=null && !userName.equals("")) {
				createdExchangeOffer = exchangeOfferService.createExchangeOffer(exchangeOfferDetails, userName);
			} else {
				throw new Exception("User Name not provided");
			}
			/**
			 * Return response with status 200
			 */
			return ResponseEntity.ok(createdExchangeOffer);
			
		} catch(Exception e) {
			/**
			 * Return status 400 if input is invalid
			 */
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.toString());
		}
		
	}
	
}
