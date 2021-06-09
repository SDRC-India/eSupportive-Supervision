package org.sdrc.ess.repository.springdatajpa;

import org.sdrc.ess.domain.UserCredentialsMetaData;
import org.sdrc.ess.repository.UserCredentialsMetaDataRepository;
import org.springframework.data.repository.RepositoryDefinition;

/**
 * This is the spring data repository for Area domain class 
 * @author Naseem Akhtar (naseem@sdrc.co.in) on 21st August 2017 13:13
 * 
 */
@RepositoryDefinition(domainClass = UserCredentialsMetaData.class, idClass = Long.class)
public interface SpringDataUserCredentialsMetaDataRepository extends UserCredentialsMetaDataRepository {

}
