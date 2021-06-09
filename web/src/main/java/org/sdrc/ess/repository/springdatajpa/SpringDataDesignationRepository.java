package org.sdrc.ess.repository.springdatajpa;

import org.sdrc.ess.domain.Designation;
import org.sdrc.ess.repository.DesignationRepository;
import org.springframework.data.repository.RepositoryDefinition;

@RepositoryDefinition(domainClass=Designation.class, idClass=Long.class)
public interface SpringDataDesignationRepository extends DesignationRepository{

}
