package com.serezk4.database.repository;

import com.serezk4.database.model.Result;

import java.util.List;

public interface ResultRepository {
    List<Result> findAll();
    Result save(Result result);
    void clear();

    List<Result> findRange(int first, int pageSize);

    int count();
}