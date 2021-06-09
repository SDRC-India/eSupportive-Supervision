package org.sdrc.ess.repository;

import org.sdrc.ess.domain.UserRegistrationMetaData;
import org.springframework.transaction.annotation.Transactional;

public interface UserRegistrationMetaDataRepository {
	
	@Transactional
	UserRegistrationMetaData save(UserRegistrationMetaData userRegistrationMetaData);
	
	UserRegistrationMetaData findByActivationCode(String activationCode);

}
