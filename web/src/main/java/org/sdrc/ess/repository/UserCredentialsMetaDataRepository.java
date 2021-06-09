package org.sdrc.ess.repository;

import java.util.List;

import org.sdrc.ess.domain.UserCredentialsMetaData;
import org.springframework.transaction.annotation.Transactional;

public interface UserCredentialsMetaDataRepository {

	@Transactional
	void save(UserCredentialsMetaData userCredentialsMetaData);

	List<UserCredentialsMetaData> findByEssUserIdAndIsActiveTrue(Integer userId);

	UserCredentialsMetaData findByActivationCode(String byteToString);

	UserCredentialsMetaData findByActivationCodeAndIsActiveTrue(String getuKey);

}
