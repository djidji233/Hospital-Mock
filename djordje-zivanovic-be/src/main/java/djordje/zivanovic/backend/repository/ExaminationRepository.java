package djordje.zivanovic.backend.repository;

import djordje.zivanovic.backend.model.db.examination.Examination;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ExaminationRepository extends JpaRepository<Examination, Long> {
}
