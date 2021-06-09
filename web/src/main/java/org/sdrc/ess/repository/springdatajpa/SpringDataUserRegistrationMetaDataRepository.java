package org.sdrc.ess.repository.springdatajpa;

import org.sdrc.ess.domain.UserRegistrationMetaData;
import org.sdrc.ess.repository.UserRegistrationMetaDataRepository;
import org.springframework.data.repository.RepositoryDefinition;

@RepositoryDefinition(domainClass = UserRegistrationMetaData.class, idClass = Long.class)
public interface SpringDataUserRegistrationMetaDataRepository extends UserRegistrationMetaDataRepository {

}
