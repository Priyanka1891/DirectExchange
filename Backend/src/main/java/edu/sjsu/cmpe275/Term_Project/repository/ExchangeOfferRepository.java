package edu.sjsu.cmpe275.Term_Project.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import edu.sjsu.cmpe275.Term_Project.entity.ExchangeOffer;

/**
 * Interface ExchangeOfferRepository which extends the JPA Repository for performing all the CRUD operations
 * @author sumeetdeshpande
 *
 */
public interface ExchangeOfferRepository extends JpaRepository<ExchangeOffer, Long>{

}
