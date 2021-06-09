package org.sdrc.ess.repository;

import java.util.List;

import org.sdrc.ess.domain.ImageGallery;
import org.sdrc.ess.domain.NewsUpdates;
import org.springframework.transaction.annotation.Transactional;

/**
 * 
 * @author Sourav Keshari Nath (souravnath@sdrc.co.in)
 *
 */

public interface ImageGalleryRepository {
	@Transactional
	ImageGallery save(ImageGallery imageGallery);

	List<ImageGallery> findByIsLive(Boolean flag);
	
	ImageGallery findByImageId(Integer id);
}
