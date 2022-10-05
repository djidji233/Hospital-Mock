package djordje.zivanovic.backend.repository;

import djordje.zivanovic.backend.model.db.organization.OrganizationType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrganizationTypeRepository extends JpaRepository<OrganizationType, Long> {
}
