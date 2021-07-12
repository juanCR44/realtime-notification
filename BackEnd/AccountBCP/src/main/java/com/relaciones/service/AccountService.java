package com.relaciones.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.relaciones.model.Account;
import com.relaciones.repositorio.AccountRepository;

@Service
public class AccountService {
	@Autowired
	AccountRepository accountRepository;

	@Transactional(rollbackFor = Exception.class)
	public Account registrarAccount(Account account) throws Exception {
		return accountRepository.save(account);
	}
	
	public Account buscarAccount(Long codigo) throws Exception{
		Account acc = accountRepository.findById(codigo).orElseThrow(() -> new Exception("No se encontro entidad"));
		return acc;
	}
	
	public void updateAccount(Long codigo, Boolean habilitado)throws Exception {
		Account acc = accountRepository.findById(codigo).orElseThrow(() -> new Exception("No se encontro entidad"));
		acc.setHabilitado(habilitado);
		acc.setId(acc.getId());
		acc.setNombre(acc.getNombre());
		acc.setNotification(acc.getNotification());
		accountRepository.save(acc);
	}	
}
