package djordje.zivanovic.backend.repository;

import djordje.zivanovic.backend.model.db.examination.ServiceType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ServiceTypeRepository extends JpaRepository<ServiceType, Long> {

    @Query(value = "select * from service_type where service_type=:service_type", nativeQuery = true)
    Optional<ServiceType> findByServiceType(@Param("service_type") String serviceType);

}
