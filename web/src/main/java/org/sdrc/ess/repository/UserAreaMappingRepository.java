package org.sdrc.ess.repository;

import java.util.List;

import javax.transaction.Transactional;

import org.sdrc.ess.domain.UserAreaMapping;

public interface UserAreaMappingRepository {
	
	@Transactional
	UserAreaMapping save(UserAreaMapping childDetails);
	
	List<UserAreaMapping> findByEssUserId(Integer userId);
	
	List<UserAreaMapping> findByAreaJson(String patern);
	
	List<UserAreaMapping> findAll();

	//List<UserAreaMapping> findByAreaJsonIgnoreCaseContaining(String string);

}
