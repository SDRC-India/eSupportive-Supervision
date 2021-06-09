package org.sdrc.ess.repository.springdatajpa;

import org.sdrc.ess.domain.UtUnitEn;
import org.sdrc.ess.repository.UtUnitEnRepository;
import org.springframework.data.repository.RepositoryDefinition;

/**
 * 
 * @author Azaruddin(azaruddin@sdrc.co.in)
 *
 */
@RepositoryDefinition(domainClass = UtUnitEn.class, idClass = Integer.class)
public interface SpringDataUtUnitEnRepository extends UtUnitEnRepository{

}
