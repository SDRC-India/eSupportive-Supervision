package org.sdrc.ess.util;

import java.io.File;

import javax.servlet.http.HttpSession;

import org.sdrc.ess.model.web.EssUserModel;
import org.sdrc.ess.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationEvent;
import org.springframework.context.ApplicationListener;
import org.springframework.context.annotation.Scope;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.context.support.ResourceBundleMessageSource;
import org.springframework.security.web.session.HttpSessionDestroyedEvent;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

@Component
@Scope(value = "singleton")
public class SessionStateManager implements StateManager, ApplicationListener<ApplicationEvent> {

	@Autowired
	private ResourceBundleMessageSource messages;
	
	@Autowired 
	private UserService userService;
	
	public SessionStateManager() {
	}

	@Override
	public Object getValue(String key) {
		return session().getAttribute(key);
	}

	@Override
	public void setValue(String key, Object value) {
		session().setAttribute(key, value);
	}

	private HttpSession session() {
		ServletRequestAttributes attr = (ServletRequestAttributes) RequestContextHolder
				.currentRequestAttributes();
		return attr.getRequest().getSession(true);
	}

	/**
	 * 
	 * When the server will startup update the logout status and make required folder creation
	 */
	/* (non-Javadoc)
	 * @author Sarita Panigrahi(sarita@sdrc.co.in)
	 * @see org.sdrc.ess.util.StateManager#onApplicationEvent(org.springframework.context.ApplicationEvent)
	 */
	@Override
	public void onApplicationEvent(ApplicationEvent event) {
		// if session is destroying
		if (event instanceof HttpSessionDestroyedEvent) {
			EssUserModel user = (EssUserModel) (((HttpSessionDestroyedEvent) event).getSession()
					.getAttribute(Constants.Web.USER_PRINCIPAL));
			if (user != null) { //update the logout time while session destroying
				userService.updateLoggedOutStatus(user.getUserLoginMetaId());
			}
		}
		// if server is starting up
		else if (event instanceof ContextRefreshedEvent) {
			 //update all user logout time while server is starting up
			userService.updateLoggedOutStatus(-1);
			//create the required directories
			File files = new File(messages.getMessage(Constants.Mobile.EXCEL_CHECKLIST_GENERATE_PATH, null, null));
			if (!files.exists()) {
				if (files.mkdirs()) {
					System.out.println("Directory is created!");
				} else {
					System.out.println("Failed to create directory!");
				}
			}
		}

	}
}
