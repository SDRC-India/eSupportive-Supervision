package org.sdrc.ess.repository;

import java.sql.Timestamp;
import java.util.List;

import org.sdrc.ess.domain.Organization;

public interface OrganizationRepository {

	List<Organization> findAll();

	List<Organization> findByIsGovernmentOrgTrue();

	List<Organization> findByCreatedDateGreaterThanOrUpdatedDateGreaterThan(Timestamp lastSyncDate,
			Timestamp lastSyncDate2);
	
	Organization findById(Integer id);

}
