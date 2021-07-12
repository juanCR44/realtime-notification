package com.relaciones.repositorio;

import org.springframework.data.jpa.repository.JpaRepository;

import com.relaciones.model.Account;

public interface AccountRepository extends JpaRepository<Account, Long>{

}
