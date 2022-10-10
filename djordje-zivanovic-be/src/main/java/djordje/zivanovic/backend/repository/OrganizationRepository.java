package djordje.zivanovic.backend.repository;

import djordje.zivanovic.backend.model.db.organization.Organization;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface OrganizationRepository extends JpaRepository<Organization, Long> {

    Optional<Organization> findByIdentifier(String identifier);

    Optional<Organization> findByName(String name);

}
