package org.sdrc.ess.repository;

import java.util.List;

import org.sdrc.ess.domain.EssUser;
import org.springframework.transaction.annotation.Transactional;

/**
 * This repository has queries which will help us extract data form EssUser
 * table
 * 
 * @author Ratikanta Pradhan (ratikanta@sdrc.co.in) on 16-May-2017 11:15:53 am
 */
public interface EssUserRepository {

	EssUser findByUsername(String username);

//	EssUser findByPrimaryEmailId(String email);
	
	List<EssUser> findByPrimaryEmailId(String email);

	List<EssUser> findByIsLiveFalseAndIsApprovedIsNullOrderByCreatedDateAsc();

	List<EssUser> findByIdAndIsLiveFalseAndIsApprovedIsNull(List<Integer> userId);

	@Transactional
	EssUser save(EssUser essUser);
	
	List<EssUser> findByIsLiveTrueAndIsApprovedTrueOrderByApproveOrRejectDateDesc();
	
	List<EssUser> findByIsLiveFalseAndIsApprovedFalseOrderByApproveOrRejectDateDesc();
	
	EssUser findByUsernameAndPasswordAndIsActiveTrue(String username, String password);
	
	EssUser findByUsernameAndPassword(String username, String password);

	List<String> findByUsernameLike(String username, String firstUName, String secUName);
	
	EssUser findByPhoneNo(String phoneNumber);

	List<EssUser> findByAreaJsonLikeAndIsLiveFalseAndIsApprovedIsNull(String area);

	List<EssUser> findByAreaJsonLikeAndIsLiveFalseAndIsApprovedIsFalse(String area);

	List<EssUser> findByAreaJsonLikeAndIsLiveTrueAndIsApprovedIsTrue(String area);
	
	List<EssUser> findByPrimaryEmailIdAndIsApprovedTrueOrIsApprovedIsNull(String email);

	EssUser findByUsernameAndIsActiveTrue(String username);
	
	EssUser findByInChargeFacilityIdAreaNIdAndIsApprovedIsTrueAndIsLiveIsTrue(int inChargeFacilityId);
	
	EssUser findByInChargeFacilityIdAreaNIdAndIsApprovedIsTrueAndIsActiveIsTrueAndIsLiveIsTrue(int inChargeFacilityId);
	
	EssUser findByUsernameWithLock(String username);

	List<EssUser> findAll();

	List<EssUser> findByInChargeFacilityIdNotNull();
	

}
