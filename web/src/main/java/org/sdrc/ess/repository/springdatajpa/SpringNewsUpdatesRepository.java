package org.sdrc.ess.repository.springdatajpa;


import org.sdrc.ess.domain.NewsUpdates;
import org.sdrc.ess.repository.NewsUpdatesRepository;
import org.springframework.data.repository.RepositoryDefinition;

@RepositoryDefinition(domainClass=NewsUpdates.class,idClass=Integer.class)
public interface SpringNewsUpdatesRepository extends NewsUpdatesRepository {

}
