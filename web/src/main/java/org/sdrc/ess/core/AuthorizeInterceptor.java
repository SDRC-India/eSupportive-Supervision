package org.sdrc.ess.core;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.sdrc.ess.model.web.EssUserModel;
import org.sdrc.ess.model.web.FeaturePermissionMappingModel;
import org.sdrc.ess.util.Constants;
import org.sdrc.ess.util.StateManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.support.ResourceBundleMessageSource;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Component;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

/** 
 * @author Sarita Panigrahi (sarita@sdrc.co.in), created on: 31-Jul-2017
 *
 */
@Component
public class AuthorizeInterceptor extends HandlerInterceptorAdapter {
	private final StateManager stateManager;
	private final ResourceBundleMessageSource errorMessageSource;

	@Autowired
	public AuthorizeInterceptor(StateManager stateManager,
			ResourceBundleMessageSource errorMessageSource) {
		this.stateManager = stateManager;
		this.errorMessageSource = errorMessageSource;
	}

	@Override
	public boolean preHandle(HttpServletRequest request,
			HttpServletResponse response, Object handler) {
		
		if (!(handler instanceof HandlerMethod))
			return true;

		Authorize authorize = ((HandlerMethod) handler)
				.getMethodAnnotation(Authorize.class);

		if (authorize == null)
			return true;

		EssUserModel user = (EssUserModel) stateManager.getValue(Constants.Web.USER_PRINCIPAL);
		if (user == null)
			throw new AccessDeniedException(errorMessageSource.getMessage(
					Constants.Web.ACCESS_DENIED, null, null));
		
		List<String> feature = new ArrayList<String>();
		feature =	Arrays.asList(authorize.feature().split(","));
		String permission = authorize.permission();
		
		
		if (user != null && user.getUserDesignationFeaturePermissionMappingModels() != null) {
			for (int i = 0; i < user.getUserDesignationFeaturePermissionMappingModels().size(); i++) {
				FeaturePermissionMappingModel fpMapping = user.getUserDesignationFeaturePermissionMappingModels().get(i).getRoleFeaturePermissionSchemeModel().getFeaturePermissionMapping();
				if (feature.contains(fpMapping.getFeature().getFeatureName())
						&& permission.equals(fpMapping.getPermission()
								.getPermissionName())) {
					return true;
				}
			}
		}
		
		throw new AccessDeniedException(errorMessageSource.getMessage(
				Constants.Web.ACCESS_DENIED, null, null));
	}

	
}
