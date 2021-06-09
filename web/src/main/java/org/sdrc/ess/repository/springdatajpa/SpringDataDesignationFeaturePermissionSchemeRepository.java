package org.sdrc.ess.repository.springdatajpa;


import org.sdrc.ess.domain.DesignationFeaturePermissionScheme;
import org.sdrc.ess.repository.DesignationFeaturePermissionSchemeRepository;
import org.springframework.data.repository.RepositoryDefinition;

/**
 * 
 * @author Naseem Akhtar (naseem@sdrc.co.in) on 3rd October 0202 hrs
 * 
 * This repository will be used for adding designation feture permission scheme for 
 * open action items while creating a designation.
 *
 */

@RepositoryDefinition(domainClass = DesignationFeaturePermissionScheme.class, idClass = Integer.class)
public interface SpringDataDesignationFeaturePermissionSchemeRepository
		extends DesignationFeaturePermissionSchemeRepository {
	
}
