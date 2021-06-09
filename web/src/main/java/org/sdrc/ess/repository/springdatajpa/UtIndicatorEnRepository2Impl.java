package org.sdrc.ess.repository.springdatajpa;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import org.hibernate.Session;
import org.hibernate.engine.jdbc.connections.spi.ConnectionProvider;
import org.hibernate.engine.spi.SessionFactoryImplementor;
import org.sdrc.ess.domain.UtIndicatorEn;
import org.sdrc.ess.domain.UtTimeperiod;
import org.sdrc.ess.job.MonthlyAggregationJob;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

/**
 * 
 * @author Azaruddin(azaruddin@sdrc.co.in) This repository is added because of some limited feature of Spring JPA
 */

@Repository
@Transactional(readOnly = true)
public class UtIndicatorEnRepository2Impl implements UtIndicatorEnRepositoryCustom {

	@PersistenceContext
	EntityManager entityManager;

	private final Logger _log = LoggerFactory.getLogger(UtIndicatorEnRepository2Impl.class);
	
	@Override
	public String fetchAllValuesOfIndicatorsForFacilityData(String columnNames, Integer blockId, Timestamp startDateInTimePeriod, Timestamp endDateInTimePeriod, Integer facilityTypeId) {
		String queryString = "select cast (array_to_json(array_agg(row_to_json(d))) as varchar) from (select " + columnNames + " from facility_data f inner join area facility on f.facility_id=facility.area_nid_pk   where f.block = :blockId and f.c7 between :startDateInTimePeriod and :endDateInTimePeriod and  facility.facility_type_id_fk = :facilityTypeId   ) as d";

		Query query = entityManager.createNativeQuery(queryString);
		query.setParameter("blockId", blockId);
		query.setParameter("startDateInTimePeriod", startDateInTimePeriod);
		query.setParameter("endDateInTimePeriod", endDateInTimePeriod);
		query.setParameter("facilityTypeId", facilityTypeId);
		return (String) query.getSingleResult();

	}

	@Override
	public String fetchAllValuesOfIndicatorsForCommunityData(String columnNames, Integer blockId, Timestamp startDateInTimePeriod, Timestamp endDateInTimePeriod, Integer facilityTypeId) {
		String queryString = "select cast (array_to_json(array_agg(row_to_json(d))) as varchar) from (select " + columnNames + " from community_data c inner join area facility on c.facility_id_fk=facility.area_nid_pk where c.area_id_fk = :blockId and c.date between :startDateInTimePeriod and :endDateInTimePeriod and  facility.facility_type_id_fk = :facilityTypeId  ) as d";
		Query query = entityManager.createNativeQuery(queryString);
		query.setParameter("blockId", blockId);
		query.setParameter("startDateInTimePeriod", startDateInTimePeriod);
		query.setParameter("endDateInTimePeriod", endDateInTimePeriod);
		query.setParameter("facilityTypeId", facilityTypeId);
		return (String) query.getSingleResult();
	}

	@Override
	public String fetchAllValuesOfIndicatorsForFacilityDataForDistrict(String columnNames, Integer districtId, Timestamp startDateInTimePeriod, Timestamp endDateInTimePeriod, Integer facilityTypeId) {
		String queryString = "select cast (array_to_json(array_agg(row_to_json(d))) as varchar) from (select " + columnNames + " from facility_data f inner join area facility on f.facility_id=facility.area_nid_pk   where f.district = :districtId and f.c7 between :startDateInTimePeriod and :endDateInTimePeriod and  facility.facility_type_id_fk = :facilityTypeId   ) as d";

		Query query = entityManager.createNativeQuery(queryString);
		query.setParameter("districtId", districtId);
		query.setParameter("startDateInTimePeriod", startDateInTimePeriod);
		query.setParameter("endDateInTimePeriod", endDateInTimePeriod);
		query.setParameter("facilityTypeId", facilityTypeId);
		return (String) query.getSingleResult();
	}

	@Override
	public String fetchAllValuesOfIndicatorsForCommunityDataForDistrict(String columnNames, Integer districtId, Timestamp startDateInTimePeriod, Timestamp endDateInTimePeriod, Integer facilityTypeId) {
		String queryString = "select cast (array_to_json(array_agg(row_to_json(d))) as varchar) from (select " + columnNames + " from community_data c inner join area facility on c.facility_id_fk=facility.area_nid_pk where c.q2 = :districtId and c.date between :startDateInTimePeriod and :endDateInTimePeriod and  facility.facility_type_id_fk = :facilityTypeId  ) as d";
		Query query = entityManager.createNativeQuery(queryString);
		query.setParameter("districtId", districtId);
		query.setParameter("startDateInTimePeriod", startDateInTimePeriod);
		query.setParameter("endDateInTimePeriod", endDateInTimePeriod);
		query.setParameter("facilityTypeId", facilityTypeId);
		return (String) query.getSingleResult();
	}

	@Override
	public String fetchAllValuesForIndicatorsAndSubmissionId(String scoreColomnName, String maxScoreColumn, Long submissionId) {
		String queryString = "select cast (array_to_json(array_agg(row_to_json(d))) as varchar)  from (select " + scoreColomnName + "," + maxScoreColumn + " from facility_data where id_pk =" + submissionId + ") as d";
		Query query = entityManager.createNativeQuery(queryString);

		return (String) query.getSingleResult();
	}

	@Override
	public String fetchAllValuesForIndicatorsAndSubmissionId2(String scoreColomnName, String maxScoreColumn, Long submissionId) {
		String queryString = "select cast (array_to_json(array_agg(row_to_json(d))) as varchar)  from (select " + scoreColomnName + "," + maxScoreColumn + " from community_data where id_pk =" + submissionId + ") as d";
		Query query = entityManager.createNativeQuery(queryString);

		return (String) query.getSingleResult();
	}

	@Override
	public String fetchAllValuesOfIndicatorsForFacilityDataRawData(String columnNames) {
		String queryString = "select cast (array_to_json(array_agg(row_to_json(d))) as varchar) from (select " + columnNames + " from facility_data f inner join area facility on f.facility_id=facility.area_nid_pk and f.is_aggregated =true ) as d";

		Query query = entityManager.createNativeQuery(queryString);
		return (String) query.getSingleResult();

	}

	@Override
	public String fetchAllValuesOfIndicatorsForCommunityDataRawData(String columnNames) {
		String queryString = "select cast (array_to_json(array_agg(row_to_json(d))) as varchar) from (select " + columnNames + " from community_data c inner join area facility on c.facility_id_fk=facility.area_nid_pk and c.is_aggregated =true) as d";

		Query query = entityManager.createNativeQuery(queryString);
		return (String) query.getSingleResult();

	}

//	@Override
//	public String findAllInJsonStructure() {
//		String queryString = "select cast (array_to_json(array_agg(row_to_json(j))) as varchar) from ( select   row_to_json(t) from ( select area_nid_pk, name,level,parent_area_id,map_name,area_id, ( select array_to_json(array_agg(row_to_json(d))) from "
//				+ "( select area_nid_pk,name,level,parent_area_id,map_name,area_id from  area level_3  where  level_3.parent_area_id=root.area_nid_pk ) as d )  as children from area as root where level=2 and area_nid_pk IN (2,32,33,35) ) as t ) as j";
//		Query query = entityManager.createNativeQuery(queryString);
//		return (String) query.getSingleResult();
//	}
//
//	@Override
//	public String findByStateInJsonStructure(int stateId) {
//		String queryString = "select cast (array_to_json(array_agg(row_to_json(j))) as varchar) from ( select   row_to_json(t) from ( select area_nid_pk, name,level,parent_area_id,map_name,area_id, ( select array_to_json(array_agg(row_to_json(d))) from "
//				+ "( select area_nid_pk,name,level,parent_area_id,map_name,area_id from  area level_3  where  level_3.parent_area_id=root.area_nid_pk ) as d )  as children from area as root where area_nid_pk = "+ stateId +" ) as t ) as j";
//		Query query = entityManager.createNativeQuery(queryString);
//		return (String) query.getSingleResult();
//	}
	
	@Override
	public String findAllInJsonStructure() {
		String queryString = "select   cast (array_to_json(array_agg(row_to_json(j))) as varchar) from "
				+ "(select area_nid_pk, name,level,parent_area_id,map_name,area_id, (select array_to_json(array_agg(row_to_json(d))) from  "
				+ "( select area_nid_pk, name,level,parent_area_id,map_name,area_id, (select array_to_json(array_agg(row_to_json(d)))  from  "
				+ "(select area_nid_pk,name,level,parent_area_id,map_name,area_id from  area level_2  where level_2.level!=5 and  "
				+ "level_1.area_nid_pk=level_2.parent_area_id) as d )  as children from  area as level_1 where "
				+ "root.area_nid_pk=level_1.parent_area_id) as d )  as children from area as root where level=2 and "
				+ "area_nid_pk IN (2,32,33,35) ) as j";
		Query query = entityManager.createNativeQuery(queryString);
		return (String) query.getSingleResult();
	}

	@Override
	public String findByStateInJsonStructure(int stateId) {
		String queryString = "select   cast (array_to_json(array_agg(row_to_json(j))) as varchar) from "
				+ "(select area_nid_pk, name,level,parent_area_id,map_name,area_id, (select array_to_json(array_agg(row_to_json(d))) from  "
				+ "( select area_nid_pk, name,level,parent_area_id,map_name,area_id, (select array_to_json(array_agg(row_to_json(d)))  from  "
				+ "(select area_nid_pk,name,level,parent_area_id,map_name,area_id from  area level_2  where level_2.level!=5 and  "
				+ "level_1.area_nid_pk=level_2.parent_area_id) as d )  as children from  area as level_1 where "
				+ "root.area_nid_pk=level_1.parent_area_id) as d )  as children from area as root where level=2 and "
				+ "area_nid_pk = "+stateId+" ) as j";
		Query query = entityManager.createNativeQuery(queryString);
		return (String) query.getSingleResult();
	}

	@Override
	public List<String> findAllTheSubmissionForAllTheIndictorsForAFacility(
			List<UtIndicatorEn> indicators, int facilityId,
			Date startDate, Date endDate) {
		
			List<String> villageData=new ArrayList<String>();
		for(UtIndicatorEn indicator:indicators)
		{
			String queryString="select cast (array_to_json(array_agg(row_to_json(d))) as varchar) from (select " + indicator.getColumnName() +" , "+indicator.getDenominatorOrMaxScore()+ ",facility.name from community_data c  inner join area facility on c.facility_id_fk=facility.area_nid_pk where  c.facility_id_fk="+facilityId+" and c.date between :startDate and :endDate ) as d";
			Query query = entityManager.createNativeQuery(queryString);
			query.setParameter("startDate", startDate);
			query.setParameter("endDate", endDate);
			villageData.add((String) query.getSingleResult());
		}
		return null;
	}

	@Override
	public String findAllSubmissionWiseDesignationReportFacilityWise(Integer levelId, String stateId, String districtId,
			String blockId, String organizationId, String developmentPartnerId, String designationId,
			String patern, String startDate, String endDate) {
		String queryString=" select cast (array_to_json(array_agg(row_to_json(d))) as varchar) from "
				+ "(SELECT org.organization_name,desig.name,COUNT(r.total),ar.name as area from "
				+ "(select COUNT(*) total,user_id,ess.desig_area_org_role_map_id_fk from facility_data fd "
				+ "left join public.ess_user ess on ess.id_pk = fd.user_id "
				+ "where c7 between '"+startDate+"' and '"+endDate+"' and statename"+stateId+" and district"+districtId+" and"
				+ " block"+blockId+" "+developmentPartnerId+" group by user_id ,ess.desig_area_org_role_map_id_fk ) r "
				+ "inner join designation_area_organization_role_mapping daorm on "
				+ "daorm.designation_area_mapping_id_pk=r.desig_area_org_role_map_id_fk "
				+ "inner join designation desig on desig.id_pk = daorm.designation_id_fk "
				+ "inner join organization org on org.organization_id_pk=daorm.organization_id_fk "
				+ "inner join area ar on ar.area_nid_pk = daorm.area_id_fk "
				+ "where r.total"+patern+" and daorm.role_id_fk="+levelId+" and daorm.organization_id_fk"+organizationId+" "
				+ "and daorm.designation_id_fk"+designationId+" group by org.organization_id_pk,desig.id_pk,"
				+ "org.organization_name,desig.name,ar.area_nid_pk,ar.name order by org.organization_name,desig.name) as d";
		Query query = entityManager.createNativeQuery(queryString);
		return (String) query.getSingleResult();
	}

	@Override
	public String findAllSubmissionWiseDesignationReportCommunityWise(Integer levelId, String stateId,
			String districtId, String blockId, String organizationId, String developmentPartnerId, String designationId,
			String patern, String startDate, String endDate) {
		String queryString="select cast (array_to_json(array_agg(row_to_json(d))) as varchar) from "
				+ "(SELECT org.organization_name,desig.name,COUNT(r.total),ar.name as area  from "
				+ "(select COUNT(*) total,user_id,ess.desig_area_org_role_map_id_fk from community_data cd "
				+ "left join public.ess_user ess on ess.id_pk =  cd.user_id "
				+ "where date between '"+startDate+"' and '"+endDate+"' and q1"+stateId+" and q2"+districtId+" and area_id_fk"+blockId+"  "
				+ ""+developmentPartnerId+" group by user_id ,ess.desig_area_org_role_map_id_fk ) "
				+ "r inner join designation_area_organization_role_mapping daorm on "
				+ "daorm.designation_area_mapping_id_pk=r.desig_area_org_role_map_id_fk inner join designation desig on "
				+ "desig.id_pk = daorm.designation_id_fk inner join organization org on org.organization_id_pk=daorm.organization_id_fk "
				+ "inner join area ar on ar.area_nid_pk = daorm.area_id_fk "
				+ "where r.total"+patern+" and daorm.role_id_fk="+levelId+" and daorm.organization_id_fk"+organizationId+" "
				+ "and daorm.designation_id_fk"+designationId+" group by org.organization_id_pk,"
				+ "desig.id_pk,org.organization_name,desig.name,ar.area_nid_pk,ar.name "
				+ "order by org.organization_name,desig.name) as d";
		Query query = entityManager.createNativeQuery(queryString);
		return (String) query.getSingleResult();
	}

	@Override
	public void callAggregationForIndicators(UtTimeperiod timeperiod) throws Exception {
		try {
			Session session = (Session) entityManager.getDelegate();
			SessionFactoryImplementor sfi = (SessionFactoryImplementor) session.getSessionFactory();
			ConnectionProvider cp = sfi.getConnectionProvider();
			Connection connection = cp.getConnection();
			try (CallableStatement function = connection.prepareCall(
		            "{ call aggregatedata(?) }")) {
		      
		        function.setInt(1,timeperiod.getTimePeriod_NId());
		        function.execute();
		    }
		}catch(Exception e) {
			_log.error("Critical: Aggregation for indicators cron job failed.{}",e);
			throw new Exception(e);
		}
		
	}
	
	@SuppressWarnings("unchecked")
	@Override
	public List<Object[]> findRegisteredUsersStateWise(String endDate){
		
		String queryString = "select area_nid_pk,name,count(*) from "
				+ "("
				+ "select *  from (select json_array_elements_text(area_json\\:\\:json-> 'state') as area_id,umap.area_json,euser.* "
				+ "from user_area_mapping umap join ess_user euser on euser.id_pk=umap.user_id_fk "
				+ "where  umap.area_json like '%\"country\":1%' and json_array_length(area_json\\:\\:json-> 'state') = 1 "
				+ "AND euser.created_date <= '"+endDate+"') as alu "
				+ "join area aaaa on aaaa.area_nid_pk = alu.area_id\\:\\:integer "
				+ "join designation_area_organization_role_mapping designation on designation.designation_area_mapping_id_pk=alu.desig_area_org_role_map_id_fk "
				+ "where  designation.role_id_fk =4 or designation.role_id_fk =5  or designation.role_id_fk =2 AND designation.designation_id_fk != 94  ) "
				+ "as x group by x.area_nid_pk,x.name "
				+ "UNION "
				+ "select alu.area_id\\:\\:integer,aaaa.name,count(alu.area_id)  from (select '1'\\:\\:text as "
				+ "area_id,umap.area_json,euser.desig_area_org_role_map_id_fk "
				+ "from user_area_mapping umap join ess_user euser on euser.id_pk=umap.user_id_fk "
				+ "where  umap.area_json like '%\"country\":1%' and json_array_length(area_json\\:\\:json-> 'state') = 0 "
				+ "AND euser.created_date <= '"+endDate+"') as alu "
				+ "join area aaaa on aaaa.area_nid_pk = alu.area_id\\:\\:integer "
				+ "join designation_area_organization_role_mapping designation on designation.designation_area_mapping_id_pk=alu.desig_area_org_role_map_id_fk "
				+ "where  designation.role_id_fk =1 AND designation.designation_id_fk != 93  group by alu.area_id,aaaa.name";
		
		Query query = entityManager.createNativeQuery(queryString);
		
		return (List<Object[]>) query.getResultList();
	}
	
	@SuppressWarnings("unchecked")
	@Override
	public List<Object[]> findRegisteredUsersDistrictWise(Integer areaNId, String endDate){
		
		String queryString = "select area_nid_pk,name,count(*) from"
				+ "("
				+ "select *  from (select json_array_elements_text(area_json\\:\\:json-> 'district') as area_id,umap.area_json,euser.* "
				+ "from user_area_mapping umap join ess_user euser on euser.id_pk=umap.user_id_fk "
				+ "where  umap.area_json\\:\\:jsonb @> '{\"state\":["+ areaNId +"]}' and json_array_length(area_json\\:\\:json-> 'district') = 1 "
				+ "AND euser.created_date <= '"+endDate+"') as alu "
				+ "join area aaaa on aaaa.area_nid_pk = alu.area_id\\:\\:integer "
				+ "join designation_area_organization_role_mapping designation on designation.designation_area_mapping_id_pk=alu.desig_area_org_role_map_id_fk "
				+ "where  designation.role_id_fk =4 or designation.role_id_fk =5  ) as x group by x.area_nid_pk,x.name "
				+ "UNION "
				+ "select alu.area_id\\:\\:integer,aaaa.name,count(alu.area_id)  from (select json_array_elements_text(area_json\\:\\:json-> 'state') as "
				+ "area_id,umap.area_json,euser.desig_area_org_role_map_id_fk "
				+ "from user_area_mapping umap join ess_user euser on euser.id_pk=umap.user_id_fk "
				+ "where  umap.area_json\\:\\:jsonb @> '{\"state\":["+ areaNId +"]}' and json_array_length(area_json\\:\\:json-> 'state') = 1 "
				+ "AND euser.created_date <= '"+endDate+"') as alu "
				+ "join area aaaa on aaaa.area_nid_pk = alu.area_id\\:\\:integer "
				+ "join designation_area_organization_role_mapping designation on designation.designation_area_mapping_id_pk=alu.desig_area_org_role_map_id_fk "
				+ "where  designation.role_id_fk =2 AND designation.designation_id_fk != 94 group by alu.area_id\\:\\:integer,aaaa.name";
		
		Query query = entityManager.createNativeQuery(queryString);
		
		return (List<Object[]>) query.getResultList();
	}
	
	@SuppressWarnings("unchecked")
	@Override
	public List<Object[]> findRegisteredUsersBlockWise(Integer areaNId, String endDate){
		
		String queryString = "select area_nid_pk,name, count(*) from ( "
				+ "select alu.*,aaaa.area_nid_pk,aaaa.name  from (select json_array_elements_text(area_json\\:\\:json-> 'block') as area_id,euser.desig_area_org_role_map_id_fk,umap.area_json "
				+ "from user_area_mapping umap join ess_user euser on euser.id_pk=umap.user_id_fk "
				+ "where  umap.area_json\\:\\:jsonb @> '{\"district\":["+ areaNId +"]}' and json_array_length(area_json\\:\\:json-> 'block') = 1 and json_array_length(area_json\\:\\:json-> 'district') = 1 "
				+ "AND euser.created_date <= '"+endDate+"') as alu "
				+ "join area aaaa on aaaa.area_nid_pk = alu.area_id\\:\\:integer "
				+ "join designation_area_organization_role_mapping designation on designation.designation_area_mapping_id_pk=alu.desig_area_org_role_map_id_fk "
				+ "where aaaa.parent_area_id = "+ areaNId +" and designation.role_id_fk =5 ) as x group by x.area_nid_pk,x.name "
				+ "UNION "
				+ "select alu.area_id\\:\\:integer,aaaa.name,count(alu.area_id)  from (select json_array_elements_text(area_json\\:\\:json-> 'district') as area_id,umap.area_json,euser.desig_area_org_role_map_id_fk "
				+ "from user_area_mapping umap join ess_user euser on euser.id_pk=umap.user_id_fk "
				+ "where  umap.area_json\\:\\:jsonb @> '{\"district\":["+ areaNId +"]}' and json_array_length(area_json\\:\\:json-> 'district') = 1 "
				+ "AND euser.created_date <= '"+endDate+"') as alu "
				+ "join area aaaa on aaaa.area_nid_pk = alu.area_id\\:\\:integer "
				+ "join designation_area_organization_role_mapping designation on designation.designation_area_mapping_id_pk=alu.desig_area_org_role_map_id_fk "
				+ "where alu.area_id\\:\\:integer="+ areaNId +" and designation.role_id_fk =4 group by alu.area_id\\:\\:integer,aaaa.name";
		
		Query query = entityManager.createNativeQuery(queryString);
		
		return (List<Object[]>) query.getResultList();
	}
	
	@SuppressWarnings("unchecked")
	@Override
	public List<Object[]> findRegisteredUsersForBlock(Integer areaNId, Integer parentId, String endDate){
		
		String queryString = "select area_nid_pk,name,count(*) from ( "
				+ "select alu.area_id\\:\\:integer,aaaa.area_nid_pk,aaaa.name  from (select json_array_elements_text(area_json\\:\\:json-> 'block') as area_id,euser.desig_area_org_role_map_id_fk,umap.area_json "
				+ "from user_area_mapping umap join ess_user euser on euser.id_pk=umap.user_id_fk "
				+ "where  umap.area_json\\:\\:jsonb @> '{\"block\":["+ areaNId +"]}' and json_array_length(area_json\\:\\:json-> 'block') = 1 "
				+ "AND euser.created_date <= '"+endDate+"') as alu "
				+ "join area aaaa on aaaa.area_nid_pk = alu.area_id\\:\\:integer "
				+ "join designation_area_organization_role_mapping designation on designation.designation_area_mapping_id_pk=alu.desig_area_org_role_map_id_fk "
				+ "where  designation.role_id_fk =5 ) as x group by x.area_nid_pk,x.name "
				+ "UNION "
				+ "select alu.area_id\\:\\:integer,aaaa.name,count(alu.area_id)  from (select json_array_elements_text(area_json\\:\\:json-> 'district') as "
				+ "area_id,umap.area_json,euser.desig_area_org_role_map_id_fk "
				+ "from user_area_mapping umap join ess_user euser on euser.id_pk=umap.user_id_fk "
				+ "where  umap.area_json\\:\\:jsonb @> '{\"district\":["+ parentId +"]}' and json_array_length(area_json\\:\\:json-> 'district') = 1 "
				+ "AND euser.created_date <= '"+endDate+"') as alu "
				+ "join area aaaa on aaaa.area_nid_pk = alu.area_id\\:\\:integer "
				+ "join designation_area_organization_role_mapping designation on designation.designation_area_mapping_id_pk=alu.desig_area_org_role_map_id_fk "
				+ "where  designation.role_id_fk =4 group by alu.area_id\\:\\:integer,aaaa.name";
		
		Query query = entityManager.createNativeQuery(queryString);
		
		return (List<Object[]>) query.getResultList();
	}
	
	@SuppressWarnings("unchecked")
	@Override
	public List<Object[]> findLoggedInUsersStateWise(String startDate, String endDate){
		
		String queryString = "SELECT area_nid_pk,name,count(*) "
				+ "FROM "
				+ "(SELECT distinct(alu.loginmetauser),aaaa.area_nid_pk,aaaa.name "
				+ "FROM "
				+ "(SELECT json_array_elements_text(area_json\\:\\:json-> 'state') AS area_id,"
				+ "umap.area_json,euser.*,lmeta.ess_user AS loginmetauser "
				+ "FROM user_area_mapping umap "
				+ "JOIN ess_user euser ON euser.id_pk=umap.user_id_fk "
				+ "JOIN user_login_meta lmeta ON lmeta.ess_user=umap.user_id_fk "
				+ "WHERE umap.area_json LIKE '%\"country\":1%' AND lmeta.logged_in_datetime BETWEEN '"+startDate+"' AND '"+endDate+"' "
				+ "AND json_array_length(area_json\\:\\:json-> 'state') = 1 ) AS alu "
				+ "JOIN area aaaa ON aaaa.area_nid_pk = alu.area_id\\:\\:integer "
				+ "JOIN designation_area_organization_role_mapping designation ON designation.designation_area_mapping_id_pk=alu.desig_area_org_role_map_id_fk  "
				+ "WHERE designation.role_id_fk =4 OR designation.role_id_fk =5 OR designation.role_id_fk =2  AND designation.designation_id_fk != 94) AS x "
				+ "GROUP BY x.area_nid_pk,x.name "
				+ "UNION "
				+ "SELECT area_id,name,count(area_id) "
				+ "FROM "
				+ "(SELECT distinct(alu.loginmetauser),alu.area_id\\:\\:integer,aaaa.name "
				+ "FROM "
				+ "(SELECT '1'\\:\\:text AS area_id,umap.area_json,euser.desig_area_org_role_map_id_fk,lmeta.ess_user AS loginmetauser "
				+ "FROM user_area_mapping umap "
				+ "JOIN ess_user euser ON euser.id_pk=umap.user_id_fk "
				+ "JOIN user_login_meta lmeta ON lmeta.ess_user=umap.user_id_fk "
				+ "WHERE umap.area_json LIKE '%\"country\":1%' AND lmeta.logged_in_datetime BETWEEN '"+startDate+"' AND '"+endDate+"' "
				+ "AND json_array_length(area_json\\:\\:json-> 'state') = 0 ) AS alu "
				+ "JOIN area aaaa ON aaaa.area_nid_pk = alu.area_id\\:\\:integer "
				+ "JOIN designation_area_organization_role_mapping designation ON designation.designation_area_mapping_id_pk=alu.desig_area_org_role_map_id_fk "
				+ "WHERE designation.role_id_fk =1 AND designation.designation_id_fk != 93 ) AS y "
				+ "GROUP BY y.area_id,y.name";
		
		Query query = entityManager.createNativeQuery(queryString);
		
		return (List<Object[]>) query.getResultList();
	}
	
	@SuppressWarnings("unchecked")
	@Override
	public List<Object[]> findLoggedInUsersDistrictWise(Integer areaNId, String startDate, String endDate){
		
		String queryString = "SELECT area_nid_pk,name,count(*) "
				+ "FROM "
				+ "(SELECT distinct(alu.loginmetauser),aaaa.area_nid_pk,aaaa.name "
				+ "FROM "
				+ "(SELECT json_array_elements_text(area_json\\:\\:json-> 'district') AS area_id,"
				+ "umap.area_json,euser.*,lmeta.ess_user AS loginmetauser "
				+ "FROM user_area_mapping umap "
				+ "JOIN ess_user euser ON euser.id_pk=umap.user_id_fk "
				+ "JOIN user_login_meta lmeta ON lmeta.ess_user=umap.user_id_fk "
				+ "WHERE umap.area_json\\:\\:jsonb @> '{\"state\":["+areaNId+"]}' AND lmeta.logged_in_datetime BETWEEN '"+startDate+"' AND '"+endDate+"' "
				+ "AND json_array_length(area_json\\:\\:json-> 'district') = 1 ) AS alu "
				+ "JOIN area aaaa ON aaaa.area_nid_pk = alu.area_id\\:\\:integer "
				+ "JOIN designation_area_organization_role_mapping designation ON designation.designation_area_mapping_id_pk=alu.desig_area_org_role_map_id_fk "
				+ "WHERE designation.role_id_fk =4 OR designation.role_id_fk =5 ) AS x "
				+ "GROUP BY x.area_nid_pk,x.name "
				+ "UNION "
				+ "SELECT area_id,name,count(area_id) "
				+ "FROM "
				+ "(SELECT distinct(alu.loginmetauser),alu.area_id\\:\\:integer,aaaa.name "
				+ "FROM "
				+ "(SELECT json_array_elements_text(area_json\\:\\:json-> 'state') AS area_id,"
				+ "umap.area_json,euser.desig_area_org_role_map_id_fk,lmeta.ess_user AS loginmetauser "
				+ "FROM user_area_mapping umap "
				+ "JOIN ess_user euser ON euser.id_pk=umap.user_id_fk "
				+ "JOIN user_login_meta lmeta ON lmeta.ess_user=umap.user_id_fk "
				+ "WHERE umap.area_json\\:\\:jsonb @> '{\"state\":["+areaNId+"]}' AND lmeta.logged_in_datetime BETWEEN '"+startDate+"' AND '"+endDate+"' "
				+ "AND json_array_length(area_json\\:\\:json-> 'state') = 1 ) AS alu "
				+ "JOIN area aaaa ON aaaa.area_nid_pk = alu.area_id\\:\\:integer "
				+ "JOIN designation_area_organization_role_mapping designation ON "
				+ "designation.designation_area_mapping_id_pk=alu.desig_area_org_role_map_id_fk "
				+ "WHERE designation.role_id_fk =2  AND designation.designation_id_fk != 94 ) AS y "
				+ "GROUP BY y.area_id,y.name";
		
		Query query = entityManager.createNativeQuery(queryString);
		
		return (List<Object[]>) query.getResultList();
	}
	
	@SuppressWarnings("unchecked")
	@Override
	public List<Object[]> findLoggedInUsersBlockWise(Integer areaNId, String startDate, String endDate){
		
		String queryString = "SELECT area_nid_pk,name,count(*) "
				+ "FROM"
				+ " (SELECT distinct(alu.loginmetauser),aaaa.area_nid_pk,aaaa.name "
				+ "FROM "
				+ "(SELECT json_array_elements_text(area_json\\:\\:json-> 'block') AS area_id,"
				+ "umap.area_json,euser.*,lmeta.ess_user AS loginmetauser "
				+ "FROM user_area_mapping umap "
				+ "JOIN ess_user euser ON euser.id_pk=umap.user_id_fk "
				+ "JOIN user_login_meta lmeta ON lmeta.ess_user=umap.user_id_fk "
				+ "WHERE umap.area_json\\:\\:jsonb @> '{\"district\":["+areaNId+"]}' AND lmeta.logged_in_datetime BETWEEN '"+startDate+"' AND '"+endDate+"' "
				+ "AND json_array_length(area_json\\:\\:json-> 'block') = 1 "
				+ "AND json_array_length(area_json\\:\\:json-> 'district') = 1) AS alu "
				+ "JOIN area aaaa ON aaaa.area_nid_pk = alu.area_id\\:\\:integer "
				+ "JOIN designation_area_organization_role_mapping designation ON designation.designation_area_mapping_id_pk=alu.desig_area_org_role_map_id_fk "
				+ "WHERE aaaa.parent_area_id = "+areaNId+" "
				+ "AND designation.role_id_fk =5 ) AS x "
				+ "GROUP BY x.area_nid_pk,x.name "
				+ "UNION "
				+ "SELECT area_id, name, count(area_id) "
				+ "FROM "
				+ "(SELECT distinct(alu.loginmetauser), alu.area_id\\:\\:integer, aaaa.name "
				+ "FROM "
				+ "(SELECT json_array_elements_text(area_json\\:\\:json-> 'district') AS area_id,"
				+ "umap.area_json,euser.desig_area_org_role_map_id_fk,lmeta.ess_user AS loginmetauser "
				+ "FROM user_area_mapping umap "
				+ "JOIN ess_user euser ON euser.id_pk=umap.user_id_fk "
				+ "JOIN user_login_meta lmeta ON lmeta.ess_user=umap.user_id_fk "
				+ "WHERE umap.area_json\\:\\:jsonb @> '{\"district\":["+areaNId+"]}' AND lmeta.logged_in_datetime BETWEEN '"+startDate+"' AND '"+endDate+"' "
				+ "AND json_array_length(area_json\\:\\:json-> 'district') = 1) AS alu "
				+ "JOIN area aaaa ON aaaa.area_nid_pk = alu.area_id\\:\\:integer "
				+ "JOIN designation_area_organization_role_mapping designation ON designation.designation_area_mapping_id_pk=alu.desig_area_org_role_map_id_fk "
				+ "WHERE alu.area_id\\:\\:integer="+areaNId+" "
				+ "AND designation.role_id_fk =4 ) AS y "
				+ "GROUP BY y.area_id,y.name";
		
		Query query = entityManager.createNativeQuery(queryString);
		
		return (List<Object[]>) query.getResultList();
	}
	
	@SuppressWarnings("unchecked")
	@Override
	public List<Object[]> findLoggedInUsersForBlock(Integer areaNId, Integer parentId, String startDate, String endDate){
		
		String queryString = "SELECT area_nid_pk, name, count(*) "
				+ "FROM "
				+ "(SELECT distinct(alu.loginmetauser), aaaa.area_nid_pk, aaaa.name "
				+ "FROM "
				+ "(SELECT json_array_elements_text(area_json\\:\\:json-> 'block') AS area_id,"
				+ "umap.area_json,euser.*,lmeta.ess_user AS loginmetauser FROM user_area_mapping umap "
				+ "JOIN ess_user euser ON euser.id_pk=umap.user_id_fk "
				+ "JOIN user_login_meta lmeta ON lmeta.ess_user=umap.user_id_fk "
				+ "WHERE umap.area_json\\:\\:jsonb @> '{\"block\":["+areaNId+"]}' AND lmeta.logged_in_datetime BETWEEN '"+startDate+"' AND '"+endDate+"' "
				+ "AND json_array_length(area_json\\:\\:json-> 'block') = 1) AS alu "
				+ "JOIN area aaaa ON aaaa.area_nid_pk = alu.area_id\\:\\:integer "
				+ "JOIN designation_area_organization_role_mapping designation ON designation.designation_area_mapping_id_pk=alu.desig_area_org_role_map_id_fk "
				+ "WHERE designation.role_id_fk =5 ) AS x GROUP BY x.area_nid_pk,x.name "
				+ "UNION "
				+ "SELECT area_id, name, count(area_id) "
				+ "FROM "
				+ "(SELECT distinct(alu.loginmetauser), alu.area_id\\:\\:integer, aaaa.name "
				+ "FROM "
				+ "(SELECT json_array_elements_text(area_json\\:\\:json-> 'district') AS area_id,"
				+ "umap.area_json,euser.desig_area_org_role_map_id_fk,lmeta.ess_user AS loginmetauser "
				+ "FROM user_area_mapping umap "
				+ "JOIN ess_user euser ON euser.id_pk=umap.user_id_fk "
				+ "JOIN user_login_meta lmeta ON lmeta.ess_user=umap.user_id_fk "
				+ "WHERE umap.area_json\\:\\:jsonb @> '{\"district\":["+parentId+"]}' AND lmeta.logged_in_datetime BETWEEN '"+startDate+"' AND '"+endDate+"' "
				+ "AND json_array_length(area_json\\:\\:json-> 'district') = 1) AS alu "
				+ "JOIN area aaaa ON aaaa.area_nid_pk = alu.area_id\\:\\:integer "
				+ "JOIN designation_area_organization_role_mapping designation ON designation.designation_area_mapping_id_pk=alu.desig_area_org_role_map_id_fk "
				+ "WHERE designation.role_id_fk =4 ) AS y "
				+ "GROUP BY y.area_id,y.name";
		
		Query query = entityManager.createNativeQuery(queryString);
		
		return (List<Object[]>) query.getResultList();
	}
	
//	@SuppressWarnings("unchecked")
//	@Override
//	public List<Object []> findUniqueAndTotalCommunityVisitsStateWise(Integer areaNId, String startDate, String endDate){
//		String queryString = "select  q1, count(facility_id_fk) as total_submission, count(distinct facility_id_fk) "
//				+ "from community_data WHERE created_date BETWEEN '"+ startDate +"' AND '"+ endDate +"' group by q1 order by q1";
//		
//		Query query = entityManager.createNativeQuery(queryString);
//		
//		return (List<Object[]>) query.getResultList();
//	}
//	
//	@SuppressWarnings("unchecked")
//	@Override
//	public List<Object []> findUniqueAndTotalCommunityVisitsDistrictWise(Integer areaNId, String startDate, String endDate){
//		String queryString = "select  q2, count(facility_id_fk) as total_submission, count(distinct facility_id_fk) "
//				+ "from community_data WHERE q1 = "+ areaNId +" AND created_date "
//				+ "BETWEEN '"+ startDate +"' AND '"+ endDate +"' group by q2 order by q2";
//		
//		Query query = entityManager.createNativeQuery(queryString);
//		
//		return (List<Object[]>) query.getResultList();
//	}
//	
//	@SuppressWarnings("unchecked")
//	@Override
//	public List<Object []> findUniqueAndTotalCommunityVisitsBlockWise(Integer areaNId, String startDate, String endDate){
//		String queryString = "select  area_id_fk, count(facility_id_fk) as total_submission, count(distinct facility_id_fk) "
//				+ "from community_data WHERE q2 = "+ areaNId +" AND created_date "
//				+ "BETWEEN '"+ startDate +"' AND '"+ endDate +"' group by area_id_fk order by area_id_fk";
//		
//		Query query = entityManager.createNativeQuery(queryString);
//		
//		return (List<Object[]>) query.getResultList();
//	}
//	
//	@SuppressWarnings("unchecked")
//	@Override
//	public List<Object []> findUniqueAndTotalCommunityVisitsForBlock(Integer areaNId, String startDate, String endDate){
//		String queryString = "select  area_id_fk, count(facility_id_fk) as total_submission, count(distinct facility_id_fk) "
//				+ "from community_data WHERE area_id_fk = "+ areaNId +" AND created_date "
//				+ "BETWEEN '"+ startDate +"' AND '"+ endDate +"' group by area_id_fk order by area_id_fk";
//		
//		Query query = entityManager.createNativeQuery(queryString);
//		
//		return (List<Object[]>) query.getResultList();
//	}
	
}
