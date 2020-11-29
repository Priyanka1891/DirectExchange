package edu.sjsu.cmpe275.Term_Project.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import edu.sjsu.cmpe275.Term_Project.entity.BankAccount;

/**
 * Interface BankAccountRepository which extends the JPA Repository for performing all the CRUD operations
 * @author sumeetdeshpande
 *
 */
public interface BankAccountRepository extends JpaRepository<BankAccount, Long>{

}
