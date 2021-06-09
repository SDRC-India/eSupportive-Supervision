package org.sdrc.ess.repository.springdatajpa;

import org.sdrc.ess.domain.VideoGallery;
import org.sdrc.ess.repository.VideoGalleryRepository;
import org.springframework.data.repository.RepositoryDefinition;

/**
 * 
 * @author Sourav Keshari Nath (souravnath@sdrc.co.in)
 *
 */

@RepositoryDefinition(domainClass=VideoGallery.class,idClass=Integer.class)
public interface SpringDataVideoGalleryRepository extends VideoGalleryRepository  {

}
