package org.sdrc.ess.repository.springdatajpa;

import java.sql.Timestamp;

import org.sdrc.ess.domain.UserLoginMeta;
import org.sdrc.ess.repository.UserLoginMetaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.RepositoryDefinition;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

/** 
* @author Sarita Panigrahi
*/

@RepositoryDefinition(domainClass = UserLoginMeta.class, idClass = Long.class)
public interface SpringDataUserLoginMetaRepository extends UserLoginMetaRepository{

	@Override
	@Modifying 
	@Transactional
	@Query("UPDATE UserLoginMeta logInMeta SET logInMeta.loggedOutDateTime = :loggedOutDateTime , "
			+ "logInMeta.isLoggedIn =FALSE WHERE logInMeta.userLogInMetaId = :userLogInMetaId ")
	void updateStatus(@Param("loggedOutDateTime")Timestamp loggedOutDateTime, @Param("userLogInMetaId")long userLogInMetaId);
	
	@Override
	@Modifying 
	@Transactional
	@Query("UPDATE"
			+ " UserLoginMeta logInMeta SET "
			+ "logInMeta.loggedOutDateTime = :loggedOutDateTime , "
			+ "logInMeta.isLoggedIn =FALSE ")
	void updateStatusForAll(@Param("loggedOutDateTime")Timestamp loggedOutDateTime);
}
