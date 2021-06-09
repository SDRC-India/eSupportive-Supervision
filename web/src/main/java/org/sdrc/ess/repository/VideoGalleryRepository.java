package org.sdrc.ess.repository;

import java.util.List;

import org.sdrc.ess.domain.VideoGallery;
import org.springframework.transaction.annotation.Transactional;

/**
 * 
 * @author Sourav Keshari Nath (souravnath@sdrc.co.in)
 *
 */

public interface VideoGalleryRepository {
	@Transactional
	VideoGallery save(VideoGallery imageGallery);

	List<VideoGallery> findByIsLive(Boolean flag);
	
	VideoGallery findByVideoId(Integer id);
}
