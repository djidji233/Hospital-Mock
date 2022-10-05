package djordje.zivanovic.backend.repository;

import djordje.zivanovic.backend.model.db.organization.OrganizationType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface OrganizationTypeRepository extends JpaRepository<OrganizationType, Long> {
    @Query(value = "select * from organization_type where organization_type=:organization_type",nativeQuery = true)
    Optional<OrganizationType> findByOrganizationType(@Param("organization_type") String organizationType);
}
