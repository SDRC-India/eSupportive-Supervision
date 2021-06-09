package org.sdrc.ess.repository.springdatajpa;

import java.util.List;

import org.sdrc.ess.domain.UserAreaMapping;
import org.sdrc.ess.repository.UserAreaMappingRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.RepositoryDefinition;
import org.springframework.data.repository.query.Param;

@RepositoryDefinition(domainClass = UserAreaMapping.class, idClass = Integer.class)
public interface SpringDataUserAreaMappingRepository extends UserAreaMappingRepository {
	
	@Override
	@Query(value = "SELECT * FROM user_area_mapping where area_json like %:patern% ", nativeQuery = true)
	List<UserAreaMapping> findByAreaJson(@Param("patern")String patern); 

}
