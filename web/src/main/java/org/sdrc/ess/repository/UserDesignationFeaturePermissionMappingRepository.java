package org.sdrc.ess.repository;

import org.sdrc.ess.domain.UserDesignationFeaturePermissionMapping;

/**
 * 
 * @author Naseem Akhtar (naseem@sdrc.co.in) on 3rd October 0018 hrs
 * 
 * This is for adding mapping when an user is approved by admin only
 *
 */
public interface UserDesignationFeaturePermissionMappingRepository {

	void save(UserDesignationFeaturePermissionMapping userDesgFeatPerm);

}
