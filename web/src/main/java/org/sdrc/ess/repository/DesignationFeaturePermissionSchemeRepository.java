package org.sdrc.ess.repository;

import org.sdrc.ess.domain.Designation;
import org.sdrc.ess.domain.DesignationFeaturePermissionScheme;
import org.sdrc.ess.domain.FeaturePermissionMapping;

/**
 * 
 * @author Naseem Akhtar (naseem@sdrc.co.in) on 3rd October 0201 hrs
 * This is for adding designation feature permission for open items.
 *
 */
public interface DesignationFeaturePermissionSchemeRepository {

	void save(DesignationFeaturePermissionScheme desgScheme);

	DesignationFeaturePermissionScheme findByDesignationAndFeaturePermissionMapping(Designation designation,
			FeaturePermissionMapping featurePermissionMapping);

}
