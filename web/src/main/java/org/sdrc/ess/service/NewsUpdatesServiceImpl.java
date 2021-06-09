package org.sdrc.ess.service;

import java.sql.Timestamp;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;

import org.sdrc.ess.domain.NewsUpdates;
import org.sdrc.ess.model.web.ErrorClass;
import org.sdrc.ess.model.web.NewsUpdatesModel;
import org.sdrc.ess.repository.NewsUpdatesRepository;
import org.sdrc.ess.util.Constants;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * 
 * @author Sourav Keshari Nath (souravnath@sdrc.co.in)
 *
 */

@Service
public class NewsUpdatesServiceImpl implements NewsUpdatesService  {

	private static final Logger logger = LoggerFactory
			.getLogger(MobileServiceImpl.class);
	
	@Autowired
	NewsUpdatesRepository newsUpdatesRepository;
	
	DateFormat df = new SimpleDateFormat("dd-MM-yyyy");
	
	@Override
	public ErrorClass saveNewsUpdates(NewsUpdatesModel obj) {
		ErrorClass errorClass = new ErrorClass();
		
		NewsUpdates newsUpdates = new NewsUpdates();
		
		newsUpdates.setTitle(obj.getNewsTitle());
		newsUpdates.setNewsLinks(obj.getNewsLinks());
		newsUpdates.setCreatedDate(new Timestamp(System
						.currentTimeMillis()));
		newsUpdates.setIsLive(true);
		newsUpdatesRepository.save(newsUpdates);
		logger.info("News and updates added : " + obj.getNewsTitle());
		errorClass.setValid(Constants.Web.TRUE_VALUE);
		errorClass.setErrorMessage(Constants.Web.NEWS_UPDATES_SUCCESS);
		// TODO Auto-generated method stub
		return errorClass;
	}
	
	@Override
	public List<NewsUpdatesModel> getAllNewsUpdates() {
		List<NewsUpdates> newsUpdates = newsUpdatesRepository.findByIsLive(true);
		List<NewsUpdatesModel> newsLetterModels=new ArrayList<NewsUpdatesModel>();
		for(NewsUpdates newsUpdatesObj:newsUpdates)
		{
			NewsUpdatesModel newsUpdatesModel=new NewsUpdatesModel();
			newsUpdatesModel.setNewsUpdatesId(newsUpdatesObj.getNewsUpdatesId());
			newsUpdatesModel.setNewsTitle(newsUpdatesObj.getTitle());
			newsUpdatesModel.setNewsLinks(newsUpdatesObj.getNewsLinks());
			newsUpdatesModel.setCreatedDate(newsUpdatesObj.getCreatedDate()==null? null : df.format(newsUpdatesObj.getCreatedDate().getTime()));
			newsLetterModels.add(newsUpdatesModel);
		}
		// TODO Auto-generated method stub
		return newsLetterModels;
	}

	@Override
	public ErrorClass updatesNewsUpdatesIsLive(Integer id) {
		ErrorClass errorClass = new ErrorClass();
		
		NewsUpdates newsUpdates = newsUpdatesRepository.findByNewsUpdatesId(id);
		if(newsUpdates!=null){
			newsUpdates.setIsLive(false);
			newsUpdatesRepository.save(newsUpdates);
			logger.info("News and updates deleted : " + id);
		errorClass.setValid(Constants.Web.TRUE_VALUE);
		errorClass.setErrorMessage(Constants.Web.NEWS_UPDATES_DELETE);
		}
		return errorClass;
	}

	@Override
	public ErrorClass editNewsUpdates(NewsUpdatesModel obj , Integer id) {
	ErrorClass errorClass = new ErrorClass();

		NewsUpdates newsUpdates = newsUpdatesRepository.findByNewsUpdatesId(id);
	    NewsUpdates duplicateNewsUpdates=new NewsUpdates();
		/*
		 * Use for new row add corresponding update rows
		 */
	    duplicateNewsUpdates.setTitle(newsUpdates.getTitle());
	    duplicateNewsUpdates.setNewsLinks(newsUpdates.getNewsLinks());
	    duplicateNewsUpdates.setCreatedDate(newsUpdates.getCreatedDate());
	    duplicateNewsUpdates.setIsLive(false);
		newsUpdatesRepository.save(duplicateNewsUpdates);
		
		/*
		 * Use for update
		 */
		newsUpdates.setTitle(obj.getNewsTitle());
		newsUpdates.setNewsLinks(obj.getNewsLinks());
		newsUpdates.setUpdatedDate(new Timestamp(System
						.currentTimeMillis()));
		newsUpdates.setIsLive(true);
		newsUpdatesRepository.save(newsUpdates);
		
		
		
		logger.info("News and updates edited : " + obj.getNewsTitle());
		errorClass.setValid(Constants.Web.TRUE_VALUE);
		errorClass.setErrorMessage(Constants.Web.NEWS_UPDATES_SUCCESS_EDIT);
		// TODO Auto-generated method stub
		return errorClass;
	}

}