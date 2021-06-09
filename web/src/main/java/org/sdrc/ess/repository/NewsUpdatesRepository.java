package org.sdrc.ess.repository;

import java.util.List;

import org.sdrc.ess.domain.NewsUpdates;
import org.springframework.transaction.annotation.Transactional;


public interface NewsUpdatesRepository {
	@Transactional
	NewsUpdates save(NewsUpdates newsUpdates);

	List<NewsUpdates> findByIsLive(Boolean flag);
	
	NewsUpdates findByNewsUpdatesId(Integer id);

}
