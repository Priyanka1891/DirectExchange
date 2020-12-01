package edu.sjsu.cmpe275.Term_Project.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
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
import edu.sjsu.cmpe275.Term_Project.entity.SplitOffer;
import edu.sjsu.cmpe275.Term_Project.entity.User;
import edu.sjsu.cmpe275.Term_Project.requestModels.AutoSplitMatchRequestModel;
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
	@CrossOrigin(origins = Constants.FRONT_END_URL)
	@PostMapping("/createExchangeOffer")
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
		
	/**
	 * GET API end point for getOffers
	 * 
	 * @param username
	 * @return list of exchange offers
	 */
	@CrossOrigin(origins = Constants.FRONT_END_URL)
	@GetMapping("/exchangeOffer/getOffers/{username}")
	public ResponseEntity getOffers(@PathVariable String username) {
		try {
			List<ExchangeOffer> offers = exchangeOfferService.getOffersByUserName(username);
			return ResponseEntity.ok(offers);
		} catch(Exception e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
		}

	}
	
	/**
	 * GET API End point for exact auto matching offers
	 * @param autoSplitMatchRequestDetails
	 * @return
	 */
	@CrossOrigin(origins = Constants.FRONT_END_URL)
	@GetMapping("/getExactMatchingOffers")
	public ResponseEntity getExactMatchingOffers(@RequestBody AutoSplitMatchRequestModel autoSplitMatchRequestDetails) {
		
		try {
			List<ExchangeOffer> exactMatchingOffers = 
					exchangeOfferService.getExactMatchingOffers(autoSplitMatchRequestDetails.getDestinationCountry(), 
																autoSplitMatchRequestDetails.getDestinationCurrency(),
																autoSplitMatchRequestDetails.getSourceCountry(),
																autoSplitMatchRequestDetails.getSourceCurrency(),
																autoSplitMatchRequestDetails.getUserName(),
																autoSplitMatchRequestDetails.getAmountToRemitInSourceCurrency(),
																autoSplitMatchRequestDetails.getExchangeRate());
			/**
			 * Return response with status 200
			 */
			return ResponseEntity.ok(exactMatchingOffers);
		} catch(Exception e) {
			/**
			 * Return status 400 if input is invalid
			 */
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.toString());
		}
	}
	
	/**
	 * GET API End point for split matching offers
	 * @param autoSplitMatchRequestDetails
	 * @return
	 */
	@CrossOrigin(origins = Constants.FRONT_END_URL)
	@GetMapping("/getSplitMatchingOffers")
	public ResponseEntity getSplitMatchingOffers(@RequestBody AutoSplitMatchRequestModel autoSplitMatchRequestDetails) {
		
		try {
			List<List<ExchangeOffer>> splitMatchingOffers = 
					exchangeOfferService.getSplitMatchingOffers(autoSplitMatchRequestDetails.getDestinationCountry(), 
																autoSplitMatchRequestDetails.getDestinationCurrency(),
																autoSplitMatchRequestDetails.getSourceCountry(),
																autoSplitMatchRequestDetails.getSourceCurrency(),
																autoSplitMatchRequestDetails.getUserName(),
																autoSplitMatchRequestDetails.getAmountToRemitInSourceCurrency(),
																autoSplitMatchRequestDetails.getExchangeRate());
			/**
			 * Return response with status 200
			 */
			return ResponseEntity.ok(splitMatchingOffers);
		} catch(Exception e) {
			/**
			 * Return status 400 if input is invalid
			 */
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.toString());
		}
	}
	
}
