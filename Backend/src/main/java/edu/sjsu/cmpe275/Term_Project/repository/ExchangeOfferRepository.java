package edu.sjsu.cmpe275.Term_Project.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import edu.sjsu.cmpe275.Term_Project.entity.ExchangeOffer;
import edu.sjsu.cmpe275.Term_Project.entity.User;

/**
 * Interface ExchangeOfferRepository which extends the JPA Repository for performing all the CRUD operations
 * @author sumeetdeshpande
 *
 */
public interface ExchangeOfferRepository extends JpaRepository<ExchangeOffer, Long>{
	
	/**
	 * Query to get the probable matching offers of user based on destination and source country	
	 * @param destinationCountry
	 * @param destinationCurrency
	 * @param sourceCountry
	 * @param sourceCurrency
	 * @return
	 */
	@Query("SELECT e FROM ExchangeOffer e WHERE e.destinationCountry=?1 AND e.destinationCurrency=?2 AND e.sourceCountry=?3 AND e.sourceCurrency=?4 AND e.user!=?5")
	public List<ExchangeOffer> getMatchingExchangeOffersBasedOnCountry(String destinationCountry, String destinationCurrency, 
																		String sourceCountry, String sourceCurrency, User user);
	
	@Query(value = "SELECT * FROM exchange_offer WHERE user_name = :user_name", nativeQuery = true)
	public List<ExchangeOffer> findOffersByUserName(@Param("user_name") String user_name);
}
