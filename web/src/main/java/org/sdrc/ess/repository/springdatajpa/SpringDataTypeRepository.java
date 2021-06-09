package org.sdrc.ess.repository.springdatajpa;

import org.sdrc.ess.domain.Type;
import org.sdrc.ess.repository.TypeRepository;
import org.springframework.data.repository.RepositoryDefinition;

@RepositoryDefinition(domainClass = Type.class, idClass = Integer.class)
public interface SpringDataTypeRepository extends TypeRepository {

}
