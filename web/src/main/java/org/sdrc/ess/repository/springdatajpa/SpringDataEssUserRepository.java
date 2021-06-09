package org.sdrc.ess.repository.springdatajpa;

import java.util.List;

import javax.persistence.LockModeType;

import org.sdrc.ess.domain.EssUser;
import org.sdrc.ess.repository.EssUserRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.RepositoryDefinition;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

/**
 * The spring data repository for EssUser table
 * 
 * @author Ratikanta Pradhan (ratikanta@sdrc.co.in) on 16-May-2017 11:17:12 am
 * @author Sarita Panigrahi, updated on: 28-Jul-2017
 *
 */
@RepositoryDefinition(domainClass = EssUser.class, idClass = Integer.class)
public interface SpringDataEssUserRepository extends EssUserRepository {

	@Override
	@Query("SELECT essu FROM EssUser essu WHERE essu.id in(:userId) AND essu.isLive=FALSE AND essu.isApproved IS NULL")
	List<EssUser> findByIdAndIsLiveFalseAndIsApprovedIsNull(@Param("userId") List<Integer> userId);

	@Override
	@Query("SELECT essu.username FROM EssUser essu WHERE essu.username = :username OR "
			+ "essu.username LIKE '%'||:firstUName||'%' OR "
			+ "essu.username LIKE '%'||:secUName||'%'")
	List<String> findByUsernameLike(@Param("username") String username, @Param("firstUName") String firstUName, @Param("secUName") String secUName);
	
	@Override
	@Query("SELECT essu FROM EssUser essu WHERE " + "essu.userAreaMappings.areaJson LIKE '%'||:area||'%' "
			+ "AND essu.isLive=FALSE " + "AND essu.isApproved IS NULL ORDER BY essu.createdDate ASC")
	List<EssUser> findByAreaJsonLikeAndIsLiveFalseAndIsApprovedIsNull(@Param("area") String area);
	
	@Override
	@Query("SELECT essu FROM EssUser essu WHERE " + "essu.userAreaMappings.areaJson LIKE '%'||:area||'%' "
			+ "AND essu.isLive=FALSE " + "AND essu.isApproved IS FALSE ORDER BY essu.approveOrRejectDate DESC")
	List<EssUser> findByAreaJsonLikeAndIsLiveFalseAndIsApprovedIsFalse(@Param("area") String area);
	

	@Override
	@Query("SELECT essu FROM EssUser essu WHERE " + "essu.userAreaMappings.areaJson LIKE '%'||:area||'%' "
			+ "AND essu.isLive = TRUE " + "AND essu.isApproved IS TRUE ORDER BY essu.approveOrRejectDate DESC")
	List<EssUser> findByAreaJsonLikeAndIsLiveTrueAndIsApprovedIsTrue(@Param("area") String area);
	
	@Override
	@Query("SELECT essu from EssUser essu WHERE essu.primaryEmailId=:email AND (essu.isApproved IS NULL OR essu.isApproved=TRUE)")
	List<EssUser> findByPrimaryEmailIdAndIsApprovedTrueOrIsApprovedIsNull(@Param("email")String email);
	
	//@author Azaruddin. Locked concurrent reading of this record
	@Lock(LockModeType.PESSIMISTIC_WRITE)
	@Transactional
	@Query("select u from EssUser u where u.username=:username")
	EssUser findByUsernameWithLock(@Param("username")String username);
}
