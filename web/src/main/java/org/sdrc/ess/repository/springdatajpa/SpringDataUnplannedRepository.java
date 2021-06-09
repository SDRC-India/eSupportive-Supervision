package org.sdrc.ess.repository.springdatajpa;

import org.sdrc.ess.domain.Unplanned;
import org.sdrc.ess.repository.UnplannedRepository;
import org.springframework.data.repository.RepositoryDefinition;

/**
 * @author Debiprasad Parida(debiprasad@sdrc.co.in) Created on 09-10-2017 
 */

@RepositoryDefinition(domainClass = Unplanned.class, idClass = Integer.class)
public interface SpringDataUnplannedRepository extends UnplannedRepository {

}
