package org.sdrc.ess.repository;

import java.sql.Timestamp;
import java.util.List;

import org.sdrc.ess.domain.TypeDetail;
import org.springframework.transaction.annotation.Transactional;

public interface TypeDetailRepository {

	@Transactional
	List<TypeDetail> findAll();

	List<TypeDetail> findByCreatedDateGreaterThanOrUpdatedDateGreaterThan(
			Timestamp lastSyncDate, Timestamp lastSyncDate2);
	
	List<TypeDetail> findByTypeIdIdIn(List<Integer> typeIds);

	List<TypeDetail> findByTypeIdId(int i);

}
