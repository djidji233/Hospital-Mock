package djordje.zivanovic.backend.repository;

import djordje.zivanovic.backend.model.db.practitioner.Practitioner;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PractitionerRepository extends JpaRepository<Practitioner, Long> {
}
