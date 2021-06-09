package org.sdrc.ess.repository.springdatajpa;

import org.sdrc.ess.domain.RegistrationOTP;
import org.sdrc.ess.repository.RegistrationOTPRepository;
import org.springframework.data.repository.RepositoryDefinition;

/**
*
* @author Debiprasad Parida (debiprasad@sdrc.co.in) on 04-08-2017 01:23 am
*
*/
@RepositoryDefinition(domainClass = RegistrationOTP.class, idClass = Integer.class)
public interface SpringDataRegistrationOTPRepository extends RegistrationOTPRepository {

}
