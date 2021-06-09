package org.sdrc.ess.util;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.sdrc.ess.domain.DesignationFeaturePermissionScheme;
import org.sdrc.ess.domain.EssUser;
import org.sdrc.ess.domain.Feature;
import org.sdrc.ess.domain.FeaturePermissionMapping;
import org.sdrc.ess.domain.Permission;
import org.sdrc.ess.domain.Role;
import org.sdrc.ess.domain.UserDesignationFeaturePermissionMapping;
import org.sdrc.ess.model.web.EssUserModel;
import org.sdrc.ess.model.web.FeatureModel;
import org.sdrc.ess.model.web.FeaturePermissionMappingModel;
import org.sdrc.ess.model.web.PermissionModel;
import org.sdrc.ess.model.web.RoleFeaturePermissionSchemeModel;
import org.sdrc.ess.model.web.RoleModel;
import org.sdrc.ess.model.web.UserDesignationFeaturePermissionMappingModel;
import org.sdrc.ess.model.web.ValueObject;
import org.springframework.stereotype.Component;

/**
 * 
 * 
 * @author Ratikanta Pradhan (ratikanta@sdrc.co.in) on 25-Sep-2017 12:38:23 am
 */
@Component
public class DomainToModelConverter {
	
	public static List<ValueObject> toUserRoleFeaturePermissionMappingValueObjs (
			List<UserDesignationFeaturePermissionMapping> userRoleFeaturePermissionMappings ){
		List<ValueObject> valueObjects = new ArrayList<>();
		for (UserDesignationFeaturePermissionMapping userRoleFeaturePermissionMapping : userRoleFeaturePermissionMappings) {
			ValueObject valueObject = new ValueObject(userRoleFeaturePermissionMapping.getUserDesignationFeaturePermissionId(),
					userRoleFeaturePermissionMapping.getDesignationFeaturePermissionScheme().getSchemeName());
			valueObjects.add(valueObject);
		}
		return valueObjects;
	}
	
	
	public static List<FeaturePermissionMappingModel> toFeaturePermissionMappings(List<FeaturePermissionMapping> featurePermissionMappings){
		List<FeaturePermissionMappingModel> featurePermissionMappingModels = new ArrayList<>();
		for (FeaturePermissionMapping featurePermissionMapping : featurePermissionMappings) {
			FeaturePermissionMappingModel featurePermissionMappingModel = new FeaturePermissionMappingModel();
			featurePermissionMappingModel.setFeaturePermissionId(featurePermissionMapping.getFeaturePermissionId());
			featurePermissionMappingModel.setUpdatedBy(featurePermissionMapping.getUpdatedBy());
			featurePermissionMappingModel.setPermission(toPermissionModel(featurePermissionMapping.getPermission()));
			featurePermissionMappingModel.setFeature(toFeatureModels(Arrays.asList(featurePermissionMapping.getFeature())).get(0));
			featurePermissionMappingModel.setRoleFeaturePermissionSchemeModels(
					toRoleFeaturePermissionSchemeModelValueObjs(featurePermissionMapping.getDesignationFeaturePermissionSchemes()));
			featurePermissionMappingModels.add(featurePermissionMappingModel);
		}
		return featurePermissionMappingModels;
	}
	
	public static List<ValueObject> toRoleFeaturePermissionSchemeModelValueObjs(List<DesignationFeaturePermissionScheme> roleFeaturePermissionSchemes){
		List<ValueObject> valueObjects = new ArrayList<>();
		for (DesignationFeaturePermissionScheme roleFeaturePermissionScheme : roleFeaturePermissionSchemes) {
			ValueObject valueObject = new ValueObject(roleFeaturePermissionScheme.getDesignationFeaturePermissionSchemeId(),
					roleFeaturePermissionScheme.getSchemeName());
			valueObjects.add(valueObject);
		}
		return valueObjects;
	}
	
	public static List<FeatureModel> toFeatureModels(List<Feature> features){
		List<FeatureModel> featureModels =new ArrayList<>();
		for (Feature feature : features) {
			FeatureModel featureModel = new FeatureModel();
			featureModel.setFeatureId(feature.getFeatureId());
			featureModel.setFeatureCode(feature.getFeatureCode());
			featureModel.setDescription(feature.getDescription());
			featureModel.setFeatureName(feature.getFeatureName());
			featureModel.setFeaturePermissionMappings(toFeaturePermissionMappingModelValueObjs(feature.getFeaturePermissionMappings()));
			featureModel.setUpdatedBy(feature.getUpdatedBy());
			featureModels.add(featureModel);
		}
		return featureModels;
	}
	
	public static List<ValueObject> toFeaturePermissionMappingModelValueObjs(List<FeaturePermissionMapping> featurePermissionMappings){
		List<ValueObject> valueObjects = new ArrayList<>();
		for (FeaturePermissionMapping featurePermissionMapping : featurePermissionMappings) {
			ValueObject valueObject = new ValueObject(featurePermissionMapping.getFeaturePermissionId(),
					featurePermissionMapping.getPermission().getPermissionName());
			valueObjects.add(valueObject);
		}
		return valueObjects;
	}
	
	public static PermissionModel toPermissionModel(Permission permission){
		PermissionModel permissionModel = new PermissionModel();
		permissionModel.setPermissionId(permission.getPermissionId());
		permissionModel.setPermissionCode(permission.getPermissionCode());
		permissionModel.setDescription(permission.getDescription());
		permissionModel.setUpdatedBy(permission.getUpdatedBy());
		permissionModel.setPermissionName(permission.getPermissionName());
		permissionModel.setFeaturePermissionMappings(toFeaturePermissionMappingModelValueObjs(permission.getFeaturePermissionMappings()));
		
		return permissionModel;
	}
	
	public static RoleModel toRoleModel(Role role){
		RoleModel roleModel = new RoleModel();
		roleModel.setDescription(role.getDescription());
		roleModel.setRoleCode(role.getRoleCode());
		roleModel.setRoleFeaturePermissionSchemes(toRoleFeaturePermissionSchemeModelValueObjs(role.getRoleFeaturePermissionSchemes()));
		roleModel.setRoleId(role.getRoleId());
		roleModel.setRoleName(role.getRoleName());
		roleModel.setUpdatedBy(role.getUpdatedBy());
		return roleModel;
	}
	
	
	public static List<RoleFeaturePermissionSchemeModel> toRoleFeaturePermissionSchemeModels(
			List<DesignationFeaturePermissionScheme> roleFeaturePermissionSchemes){
		List<RoleFeaturePermissionSchemeModel> roleFeaturePermissionSchemeModels = new ArrayList<>();
		for (DesignationFeaturePermissionScheme roleFeaturePermissionScheme : roleFeaturePermissionSchemes) {
			RoleFeaturePermissionSchemeModel roleFeaturePermissionSchemeModel = new RoleFeaturePermissionSchemeModel();
			roleFeaturePermissionSchemeModel.setFeaturePermissionMapping(
					toFeaturePermissionMappings(Arrays.asList(roleFeaturePermissionScheme.getFeaturePermissionMapping())).get(0));
			roleFeaturePermissionSchemeModel.setRoleFeaturePermissionSchemeId(roleFeaturePermissionScheme.getDesignationFeaturePermissionSchemeId());
			roleFeaturePermissionSchemeModel.setSchemeName(roleFeaturePermissionScheme.getSchemeName());
			roleFeaturePermissionSchemeModel.setUpdatedBy(roleFeaturePermissionScheme.getUpdatedBy());
			roleFeaturePermissionSchemeModel.setRole(toRoleModel(roleFeaturePermissionScheme.getDesignation()
					.getDesignationAreaOrganizationRoleMapping().get(0).getRole()));
			roleFeaturePermissionSchemeModel.setUserRoleFeaturePermissionMappings(toUserRoleFeaturePermissionMappingModelValueObjs(
					roleFeaturePermissionScheme.getUserDesignationFeaturePermissionMappings()));
			roleFeaturePermissionSchemeModels.add(roleFeaturePermissionSchemeModel);
		}
		return roleFeaturePermissionSchemeModels;
	}
	
	public static List<ValueObject> toUserRoleFeaturePermissionMappingModelValueObjs(
			List<UserDesignationFeaturePermissionMapping> userRoleFeaturePermissionMappings){
		List<ValueObject> valueObjects = new ArrayList<>();
		for (UserDesignationFeaturePermissionMapping userRoleFeaturePermissionMapping : userRoleFeaturePermissionMappings) {
			ValueObject valueObject = new ValueObject(userRoleFeaturePermissionMapping.getUserDesignationFeaturePermissionId(),
					userRoleFeaturePermissionMapping.getDesignationFeaturePermissionScheme().getDesignation()
					.getDesignationAreaOrganizationRoleMapping().get(0).getRole().getRoleName());
			valueObjects.add(valueObject);
		}
		return valueObjects;
	}
	
	public static UserDesignationFeaturePermissionMappingModel toUserRoleFeaturePermissionMappingModel(
			UserDesignationFeaturePermissionMapping userRoleFeaturePermissionMapping){
		UserDesignationFeaturePermissionMappingModel userRoleFeaturePermissionMappingModel = new UserDesignationFeaturePermissionMappingModel();
		userRoleFeaturePermissionMappingModel.setRoleFeaturePermissionSchemeModel(toRoleFeaturePermissionSchemeModels(
				Arrays.asList(userRoleFeaturePermissionMapping.getDesignationFeaturePermissionScheme())).get(0));
		userRoleFeaturePermissionMappingModel.setUpdatedBy(userRoleFeaturePermissionMapping.getUpdatedBy());
		userRoleFeaturePermissionMappingModel.setUserDetailModel(toUserDetailModelValueObjs(
				userRoleFeaturePermissionMapping.getUserAreaMapping().getEssUser()));
		userRoleFeaturePermissionMappingModel.setUserRoleFeaturePermissionId(userRoleFeaturePermissionMapping.getUserDesignationFeaturePermissionId());
		return userRoleFeaturePermissionMappingModel;
	}

	public static List<UserDesignationFeaturePermissionMappingModel> toUserRoleFeaturePermissionMappingModels(
			List<UserDesignationFeaturePermissionMapping> userRoleFeaturePermissionMappings) {
		List<UserDesignationFeaturePermissionMappingModel> userRoleFeaturePermissionMappingModels = new ArrayList<>();
		for (UserDesignationFeaturePermissionMapping userRoleFeaturePermissionMapping : userRoleFeaturePermissionMappings) {
			UserDesignationFeaturePermissionMappingModel userRoleFeaturePermissionMappingModel = toUserRoleFeaturePermissionMappingModel(
					userRoleFeaturePermissionMapping);
			userRoleFeaturePermissionMappingModels.add(userRoleFeaturePermissionMappingModel);
		}
		return userRoleFeaturePermissionMappingModels;
	}
	

	public static ValueObject toUserDetailModelValueObjs(EssUser userDetail){
		ValueObject valueObject = new ValueObject(userDetail.getId(),
				userDetail.getUsername());
	return valueObject;
}
	/**
	 * 
	 * This following method will convert EssUser domain object to model object. It is incomplete, kindly check before you use, 
	 * the information you need is there or not.
	 * @param The EssUser domain object
	 * @return The EssUser model object
	 * @author Ratikanta Pradhan (ratikanta@sdrc.co.in) on 25-Sep-2017 12:40:25 am
	 */
	public EssUserModel toEssUserModel(EssUser essUser){
		
		EssUserModel essUserModel = new EssUserModel();
		essUserModel.setAdharCardPhotoFilePath(essUser.getAdharCardPhotoFilePath());		
		essUserModel.setAdharCardPhotoNumber(essUser.getAdharCardPhotoNumber());		
		essUserModel.setFirstName(essUser.getFirstName());
		essUserModel.setMiddleName(essUser.getMiddleName());
		essUserModel.setLastName(essUser.getLastName());
		essUserModel.setUserId(essUser.getId());
		essUserModel.setUsername(essUser.getUsername());
		
		return essUserModel;
	}

			
}
