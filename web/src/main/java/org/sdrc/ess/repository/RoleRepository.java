package org.sdrc.ess.repository;

import java.sql.Timestamp;
import java.util.List;

import org.sdrc.ess.domain.Role;

public interface RoleRepository {

	List<Role> findByRoleCodeIn(List<String> roleCodeList);

	List<Role> findAll();

	List<Role> findByUpdatedDateGreaterThanAndRoleCodeIn(Timestamp lastSyncDate, List<String> roleCodeList);
	
	Role findByRoleId(Integer roleId);

}
