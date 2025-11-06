package service;

import domain.Analysis;
import repository.AnalysisRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AnalysisService {

    private final AnalysisRepository analysisRepository;

    public AnalysisService(AnalysisRepository analysisRepository) {
        this.analysisRepository = analysisRepository;
    }

    public List<Analysis> findAll() {
        return analysisRepository.findAll();
    }

    public Optional<Analysis> findById(int id) {
        return analysisRepository.findById(id);
    }

    public Analysis save(Analysis analysis) {
        return analysisRepository.save(analysis);
    }

    public void delete(int id) {
        analysisRepository.deleteById(id);
    }
}
