package org.sdrc.ess.repository.springdatajpa;

import org.sdrc.ess.domain.UtIcIus;
import org.sdrc.ess.repository.UtIcIusRepository;
import org.springframework.data.repository.RepositoryDefinition;

/**
 * 
 * @author Azaruddin(azaruddin@sdrc.co.in)
 *
 */

@RepositoryDefinition(domainClass = UtIcIus.class, idClass = Integer.class)
public interface SpringDataUtIcIusRepository extends UtIcIusRepository {

}
