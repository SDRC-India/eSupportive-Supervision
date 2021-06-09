package org.sdrc.ess.repository;

import java.util.List;

import org.sdrc.ess.domain.Designation;
/**
 * @author Sarita Panigrahi
 * created on: 20-07-2017
 * repository for DesignationAreaMapping
 *
 *
 */
public interface DesignationRepository {

	List<Designation> findAll();

	Designation save(Designation ds);
	
	Designation findByName(String name);
	
	Designation findById(Integer id);

//	List<Designation> findByRoleRoleIdIn(List<Integer> roleIds);
}
