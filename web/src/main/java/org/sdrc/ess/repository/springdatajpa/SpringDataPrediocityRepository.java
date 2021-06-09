package org.sdrc.ess.repository.springdatajpa;

import org.sdrc.ess.domain.Preodicity;
import org.sdrc.ess.repository.PrediocityRepository;
import org.springframework.data.repository.RepositoryDefinition;


@RepositoryDefinition(domainClass=Preodicity.class,idClass=Integer.class)
public interface SpringDataPrediocityRepository extends PrediocityRepository{

}
