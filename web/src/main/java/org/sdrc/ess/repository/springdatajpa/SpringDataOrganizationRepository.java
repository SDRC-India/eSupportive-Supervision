package org.sdrc.ess.repository.springdatajpa;

import org.sdrc.ess.domain.Organization;
import org.sdrc.ess.repository.OrganizationRepository;
import org.springframework.data.repository.RepositoryDefinition;

@RepositoryDefinition(domainClass = Organization.class, idClass = Integer.class)
public interface SpringDataOrganizationRepository extends OrganizationRepository {

}
