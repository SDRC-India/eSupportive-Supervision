package org.sdrc.ess.service;

import java.sql.Timestamp;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import org.sdrc.ess.domain.Preodicity;
import org.sdrc.ess.domain.Timeperiod;
import org.sdrc.ess.domain.UtTimeperiod;
import org.sdrc.ess.repository.CommunityDataRepository;
import org.sdrc.ess.repository.FacilityDataRepository;
import org.sdrc.ess.repository.PlanningRepository;
import org.sdrc.ess.repository.TimeperiodRepository;
import org.sdrc.ess.repository.UtTimeperiodRepository;
import org.sdrc.ess.repository.springdatajpa.UtIndicatorEnRepository2;
import org.sdrc.ess.repository.springdatajpa.UtIndicatorEnRepositoryCustom;
import org.sdrc.ess.util.Constants;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.support.ResourceBundleMessageSource;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.fasterxml.jackson.core.io.UTF32Reader;

/**
 * @author Debiprasad parida (debiprasad@sdrc.co.in) 02-Oct-2017 4:00:00 pm
 */

@Service
public class AggregationServiceImpl implements AggregationService {

	private static final Logger logger = LoggerFactory.getLogger(PlanningServiceImpl.class);

	@Autowired
	TimeperiodRepository timeperiodRepository;

	@Autowired
	private FacilityDataRepository facilityDataRepository;

	@Autowired
	private CommunityDataRepository communityDataRepository;

	@Autowired
	private PlanningRepository planningRepository;

	@Autowired
	private ResourceBundleMessageSource messages;

	@Autowired
	private UtTimeperiodRepository utTimeperiodRepository;

	@Autowired
	UtIndicatorEnRepository2 utIndicatorEnRepository2;

	private SimpleDateFormat simpleDateformat = new SimpleDateFormat("MMM yyyy");
	private SimpleDateFormat simpleDateformater = new SimpleDateFormat("yyyy-MM-dd");
	private DateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");

	@Override
	public Timeperiod createCurrentMonth() throws Exception {
		Calendar startDateCalendar = Calendar.getInstance();
		startDateCalendar.add(Calendar.MONTH, 0);
		startDateCalendar.set(Calendar.DATE, 1);
		Date sDate = startDateCalendar.getTime();
		String startDateStr = simpleDateformater.format(sDate);
		Date startDate = (Date) formatter.parse(startDateStr + " 00:00:00.000");
		startDateCalendar.set(Calendar.DATE, startDateCalendar.getActualMaximum(Calendar.DAY_OF_MONTH));
		Date eDate = startDateCalendar.getTime();
		String endDateStr = simpleDateformater.format(eDate);
		Date endDate = (Date) formatter.parse(endDateStr + " 00:00:00.000");
		Timeperiod utTime = timeperiodRepository.findByStartDateAndEndDate(new java.sql.Date(startDate.getTime()), new java.sql.Date(endDate.getTime()));
		UtTimeperiod utTimePeriod = utTimeperiodRepository.findByStartDateAndEndDate(new java.sql.Date(startDate.getTime()), new java.sql.Date(endDate.getTime()));

		if (utTime == null) {
			Timeperiod timePeriod = new Timeperiod();
			timePeriod.setStartDate(new java.sql.Date(startDate.getTime()));
			timePeriod.setEndDate(new java.sql.Date(endDate.getTime()));
			timePeriod.setPeriodicity(messages.getMessage(Constants.Web.MONTHLY_PERIODICITY, null, null)); // for
																											// monthly
																											// aggregation
			// periodicity is 1
			timePeriod.setCreatedDate(new Timestamp(System.currentTimeMillis()));
			timePeriod.setTimeperiod(simpleDateformat.format(startDate));
			timePeriod = timeperiodRepository.save(timePeriod);
			return timePeriod;
		}

		return utTime;
	}

	@Override
	public Timeperiod createPreviousThreeMonth() throws Exception {
		Calendar startDateCalendar = Calendar.getInstance();
		startDateCalendar.add(Calendar.MONTH, -3);
		startDateCalendar.set(Calendar.DATE, 1);
		Date strDate = startDateCalendar.getTime();
		String startDateStr = simpleDateformater.format(strDate);
		Date startDate = (Date) formatter.parse(startDateStr + " 00:00:00.000");
		Calendar endDateCalendar = Calendar.getInstance();
		endDateCalendar.add(Calendar.MONTH, -1);
		endDateCalendar.set(Calendar.DATE, endDateCalendar.getActualMaximum(Calendar.DAY_OF_MONTH));
		Date eDate = endDateCalendar.getTime();
		String endDateStr = simpleDateformater.format(eDate);
		Date endDate = (Date) formatter.parse(endDateStr + " 00:00:00.000");
		Timeperiod utTime = timeperiodRepository.findByStartDateAndEndDate(new java.sql.Date(startDate.getTime()), new java.sql.Date(endDate.getTime()));
		UtTimeperiod utTimePeriod = utTimeperiodRepository.findByStartDateAndEndDate(new java.sql.Date(startDate.getTime()), new java.sql.Date(endDate.getTime()));

		if (utTime == null) {
			Timeperiod timePeriod = new Timeperiod();
			timePeriod.setStartDate(new java.sql.Date(startDate.getTime()));
			timePeriod.setEndDate(new java.sql.Date(endDate.getTime()));
			timePeriod.setPeriodicity(messages.getMessage(Constants.Web.QUARTERLY_PERIODICITY, null, null));// for
																											// quarterly
																											// aggregation
			// periodicity is 3
			timePeriod.setCreatedDate(new Timestamp(System.currentTimeMillis()));
			timePeriod.setTimeperiod(simpleDateformat.format(startDate) + " - " + simpleDateformat.format(endDate));
			timePeriod = timeperiodRepository.save(timePeriod);
			return timePeriod;
		}

		return utTime;
	}

	@Override
	public boolean updateToLatestsSubmission() throws Exception {

		Timeperiod timeperiod = timeperiodRepository.findTop1ByPeriodicityOrderByTimeperiodIdDesc(messages.getMessage(Constants.Web.MONTHLY_PERIODICITY, null, null));
		// List<Timeperiod>
		// timeperiods=timeperiodRepository.findByPeriodicityOrderByTimeperiodIdDesc(messages.getMessage(Constants.Web.MONTHLY_PERIODICITY,
		// null, null));

		if (timeperiod != null) {
			List<Object[]> facilityDatas = facilityDataRepository.findTheLatestSubmission(timeperiod.getStartDate(), timeperiod.getEndDate());
			// List<Object[]> communityDatas =
			// communityDataRepository.findTheLatestSubmission(timeperiod.getStartDate(), timeperiod.getEndDate());
			facilityDatas.addAll(facilityDataRepository.findTheUnplannedLatestSubmission(timeperiod.getStartDate(), timeperiod.getEndDate()));
			// communityDatas.addAll(communityDataRepository.findTheUnplannedLatestSubmission(timeperiod.getStartDate(),
			// timeperiod.getEndDate()));
			int areaId = 0;
			for (Object[] data : facilityDatas) {
				/*
				 * int roleId=Integer.parseInt(data[0].toString());
				 * 
				 * Date visitDate=formatter.parse(data[2].toString());
				 */
				int facility = Integer.parseInt(data[3].toString());
				if (facility != areaId) {
					areaId = facility;
					long id = Long.parseLong(data[0].toString());
					facilityDataRepository.updateAggregationStatus(id);
				}
			}

			/*
			 * areaId = 0; for (Object[] data : communityDatas) {
			 * 
			 * int roleId=Integer.parseInt(data[0].toString()); int areaId=Integer.parseInt(data[1].toString()); Date
			 * visitDate=formatter.parse(data[2].toString());
			 * 
			 * int facility = Integer.parseInt(data[3].toString()); if (facility != areaId) { areaId = facility; long id
			 * = Long.parseLong(data[0].toString()); communityDataRepository.updateAggregationStatus(id); } }
			 */
			communityDataRepository.updateAggregationStatusForAll();

		}

		return false;
	}

	/**
	 * @author azaruddin This method creates a new monthly record in UtTimeperiod table when the monthly aggregation of
	 *         indicators starts on the specified date. i.e 7th of each month or 8th of each month.
	 * 
	 */

	@Override
	@Transactional
	public UtTimeperiod createCurrentMonthUtTimePeriod() throws Exception {
		Calendar startDateCalendar = Calendar.getInstance();
		startDateCalendar.add(Calendar.MONTH, -1);
		startDateCalendar.set(Calendar.DATE, 1);
		Date sDate = startDateCalendar.getTime();
		String startDateStr = simpleDateformater.format(sDate);
		Date startDate = (Date) formatter.parse(startDateStr + " 00:00:00.000");
		startDateCalendar.set(Calendar.DATE, startDateCalendar.getActualMaximum(Calendar.DAY_OF_MONTH));

		Date eDate = startDateCalendar.getTime();
		String endDateStr = simpleDateformater.format(eDate);
		Date endDate = (Date) formatter.parse(endDateStr + " 00:00:00.000");
		
		
		
		UtTimeperiod utTimePeriod = utTimeperiodRepository.findByStartDateAndEndDate(new java.sql.Date(startDate.getTime()), new java.sql.Date(endDate.getTime()));

		if (utTimePeriod == null) {
			utTimePeriod = new UtTimeperiod();
			utTimePeriod.setStartDate(new java.sql.Date(startDate.getTime()));
			utTimePeriod.setEndDate(new java.sql.Date(endDate.getTime()));

			Preodicity p = new Preodicity();
			p.setPreodicityId(1);
			utTimePeriod.setPeriodicity(p); // for monthly aggregation
											// periodicity is 1

			utTimePeriod.setTimePeriod(simpleDateformat.format(startDate));
			utTimePeriod = utTimeperiodRepository.save(utTimePeriod);

		}
		return utTimePeriod;
	}

	

	@Transactional
	public boolean callAggregationForIndicators(UtTimeperiod timeperiod) throws Exception{
		utIndicatorEnRepository2.callAggregationForIndicators(timeperiod);
		return true;
	}

	@Override
	public UtTimeperiod createQuaterlyFinancialUtTimePeriod() throws Exception {
		Calendar startDateCalendar = Calendar.getInstance();
		startDateCalendar.add(Calendar.MONTH, -3);
		startDateCalendar.set(Calendar.DATE, 1);
		Date strDate = startDateCalendar.getTime();
		String startDateStr = simpleDateformater.format(strDate);
		Date startDate = (Date) formatter.parse(startDateStr + " 00:00:00.000");
		Calendar endDateCalendar = Calendar.getInstance();
		endDateCalendar.add(Calendar.MONTH, -1);
		endDateCalendar.set(Calendar.DATE, endDateCalendar.getActualMaximum(Calendar.DAY_OF_MONTH));
		Date eDate = endDateCalendar.getTime();
		String endDateStr = simpleDateformater.format(eDate);
		Date endDate = (Date) formatter.parse(endDateStr + " 00:00:00.000");

		UtTimeperiod utTimePeriod = utTimeperiodRepository.findByStartDateAndEndDate(new java.sql.Date(startDate.getTime()), new java.sql.Date(endDate.getTime()));

		if (utTimePeriod == null) {
			utTimePeriod = new UtTimeperiod();
			utTimePeriod.setStartDate(new java.sql.Date(startDate.getTime()));
			utTimePeriod.setEndDate(new java.sql.Date(endDate.getTime()));

			Preodicity p = new Preodicity();
			p.setPreodicityId(2);
			utTimePeriod.setPeriodicity(p); // for quaterly aggregation
			// periodicity is 2

			utTimePeriod.setTimePeriod(simpleDateformat.format(startDate) +" - "+simpleDateformat.format(endDate));
			utTimePeriod = utTimeperiodRepository.save(utTimePeriod);

		}
		return utTimePeriod;
	}

}
