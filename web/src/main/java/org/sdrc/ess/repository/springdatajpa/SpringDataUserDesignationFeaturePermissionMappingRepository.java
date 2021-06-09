package org.sdrc.ess.repository.springdatajpa;

import org.sdrc.ess.domain.UserDesignationFeaturePermissionMapping;
import org.sdrc.ess.repository.UserDesignationFeaturePermissionMappingRepository;
import org.springframework.data.repository.RepositoryDefinition;

/**
 * 
 * @author Naseem Akhtar (naseem@sdrc.co.in) on 3rd October 2017 0016 hrs
 * 
 * This repository is going to add mapping when an user is approved only.
 *
 */

@RepositoryDefinition(domainClass = UserDesignationFeaturePermissionMapping.class, idClass = Integer.class)
public interface SpringDataUserDesignationFeaturePermissionMappingRepository
		extends UserDesignationFeaturePermissionMappingRepository {

}
