package djordje.zivanovic.backend.repository;

import djordje.zivanovic.backend.model.db.practitioner.Practitioner;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PractitionerRepository extends JpaRepository<Practitioner, Long> {
    Optional<Practitioner> findByIdentifier(String identifier);
}
