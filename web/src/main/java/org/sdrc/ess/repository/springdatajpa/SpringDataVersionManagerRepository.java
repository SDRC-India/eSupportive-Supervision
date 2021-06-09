package org.sdrc.ess.repository.springdatajpa;

import org.sdrc.ess.domain.VersionManager;
import org.sdrc.ess.repository.VersionManagerRepository;
import org.springframework.data.repository.RepositoryDefinition;

/**
 * This is the spring data repository for Version Manager domain class
 * 
 * @author Naseem Akhtar (naseem@sdrc.co.in) on 18th December 2017 15:13
 */
@RepositoryDefinition(domainClass = VersionManager.class, idClass = Integer.class)
public interface SpringDataVersionManagerRepository extends VersionManagerRepository {

}
