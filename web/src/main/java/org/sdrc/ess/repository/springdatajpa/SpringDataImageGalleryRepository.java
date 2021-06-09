package org.sdrc.ess.repository.springdatajpa;

import org.sdrc.ess.domain.ImageGallery;
import org.sdrc.ess.repository.ImageGalleryRepository;
import org.springframework.data.repository.RepositoryDefinition;

/**
 * 
 * @author Sourav Keshari Nath (souravnath@sdrc.co.in)
 *
 */

@RepositoryDefinition(domainClass=ImageGallery.class,idClass=Integer.class)
public interface SpringDataImageGalleryRepository extends ImageGalleryRepository  {

}
