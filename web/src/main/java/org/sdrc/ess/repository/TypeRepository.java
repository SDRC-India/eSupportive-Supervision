package org.sdrc.ess.repository;

import java.sql.Timestamp;
import java.util.List;

import org.sdrc.ess.domain.Type;
import org.springframework.transaction.annotation.Transactional;

public interface TypeRepository {

	@Transactional
	List<Type> findAll();

	List<Type> findByCreatedDateGreaterThanOrUpdatedDateGreaterThan(
			Timestamp lastSyncDate, Timestamp lastSyncDate2);

}
