package org.sdrc.ess.repository.springdatajpa;

import org.sdrc.ess.domain.Role;
import org.sdrc.ess.repository.RoleRepository;
import org.springframework.data.repository.RepositoryDefinition;

@RepositoryDefinition(domainClass=Role.class, idClass=Integer.class)
public interface SpringDataRoleRepository extends RoleRepository {

}
