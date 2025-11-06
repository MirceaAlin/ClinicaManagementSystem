package service;

import domain.Consultation;
import repository.ConsultationRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ConsultationService {

    private final ConsultationRepository consultationRepository;

    public ConsultationService(ConsultationRepository consultationRepository) {
        this.consultationRepository = consultationRepository;
    }

    public List<Consultation> findAll() {
        return consultationRepository.findAll();
    }

    public Optional<Consultation> findById(int id) {
        return consultationRepository.findById(id);
    }

    public Consultation save(Consultation consultation) {
        return consultationRepository.save(consultation);
    }

    public void delete(int id) {
        consultationRepository.deleteById(id);
    }
}
