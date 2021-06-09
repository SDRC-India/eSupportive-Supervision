package org.sdrc.ess.repository.springdatajpa;

import org.sdrc.ess.domain.TypeDetail;
import org.sdrc.ess.repository.TypeDetailRepository;
import org.springframework.data.repository.RepositoryDefinition;

@RepositoryDefinition(domainClass = TypeDetail.class, idClass = Integer.class)
public interface SpringDataTypeDetailRepository extends TypeDetailRepository {

}
