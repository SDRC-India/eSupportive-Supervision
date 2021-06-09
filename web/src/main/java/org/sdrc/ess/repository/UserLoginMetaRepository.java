package org.sdrc.ess.repository;

import java.sql.Timestamp;

import org.sdrc.ess.domain.UserLoginMeta;
import org.springframework.transaction.annotation.Transactional;

/** 
* @author Sarita Panigrahi,  created on: 20-Sep-2017
*/
public interface UserLoginMetaRepository {
	
	@Transactional
	UserLoginMeta save(UserLoginMeta userLoginMeta);

	void updateStatus(Timestamp loggedOutDateTime, long userLogInMetaId);
	
	UserLoginMeta findByEssUserIdAndIsLoggedInTrue(Integer userId);

	void updateStatusForAll(Timestamp loggedOutDateTime);

}
