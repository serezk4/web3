package com.serezk4.managment;

import com.serezk4.database.model.Result;
import com.serezk4.database.service.ResultService;
import jakarta.annotation.PostConstruct;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Named;
import jakarta.validation.Valid;
import org.primefaces.model.FilterMeta;
import org.primefaces.model.LazyDataModel;
import org.primefaces.model.SortMeta;

import java.io.Serializable;
import java.util.List;
import java.util.Map;

@Named
@ApplicationScoped
public class ResultBean implements Serializable {
    private final ResultService resultService = ResultService.getInstance();
    private LazyDataModel<Result> lazyModel;

    @PostConstruct
    public void init() {
        // Настройка ленивой модели данных
        lazyModel = new LazyDataModel<Result>() {
            @Override
            public int count(Map<String, FilterMeta> filterBy) {
                return resultService.count();
            }

            @Override
            public List<Result> load(int first, int pageSize, Map<String, SortMeta> sortBy, Map<String, FilterMeta> filterBy) {
                this.setRowCount(resultService.count()); // Установка общего числа записей
                return resultService.findRange(first, pageSize);
            }
        };
    }

    public LazyDataModel<Result> getLazyModel() {
        return lazyModel;
    }

    public void addResult(@Valid AttemptBean attempt) {
        Result result = Result.builder()
                .x(attempt.getX())
                .y(attempt.getY())
                .r(attempt.getR())
                .result(attempt.isResult())
                .build();
        resultService.save(result);
    }

    public void clear() {
        resultService.clear();
    }
}