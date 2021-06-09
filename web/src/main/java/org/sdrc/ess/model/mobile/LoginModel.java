package org.sdrc.ess.model.mobile;

/**
 * This class will bring data from mobile to server
 * 
 * @author Ratikanta Pradhan (ratikanta@sdrc.co.in) on 14-May-2017 11:35:53 am
 * @author Naseem Akhtar (naseem@sdrc.co.in) on 30th November 2017 14:43:44
 * @since 2.0.0
 */
public class LoginModel {

	private String username;
	//Why do we need this uKey?
	//We need this uKey during forgot password.
	private String uKey;
	private String password;
	private boolean isNewUser;
	private boolean isInitialLogin;

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getuKey() {
		return uKey;
	}

	public void setuKey(String uKey) {
		this.uKey = uKey;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public boolean isNewUser() {
		return isNewUser;
	}

	public void setNewUser(boolean isNewUser) {
		this.isNewUser = isNewUser;
	}

	public boolean isInitialLogin() {
		return isInitialLogin;
	}

	public void setInitialLogin(boolean isInitialLogin) {
		this.isInitialLogin = isInitialLogin;
	}
	
}
