package org.sdrc.ess.repository.springdatajpa;

import org.sdrc.ess.domain.UtSubgroupValsEn;
import org.sdrc.ess.repository.UtSubgroupValsEnRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.RepositoryDefinition;
import org.springframework.data.repository.query.Param;

@RepositoryDefinition(domainClass=UtSubgroupValsEn.class,idClass=Integer.class)
public interface SpringDataUtSubgroupValsEnRepository extends UtSubgroupValsEnRepository{

	@Override
	@Query("select s from UtSubgroupValsEn s where s.subgroup_Val_NId = :subgroup_Val_NId")
	UtSubgroupValsEn findBySubgroup_Val_NId(@Param("subgroup_Val_NId")int subgroup_Val_NId);
	
}
