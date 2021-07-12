package com.relaciones.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.relaciones.model.Account;
import com.relaciones.model.Notification;
import com.relaciones.repositorio.AccountRepository;
import com.relaciones.repositorio.NotificacionRepository;

@Service
public class NotificationService {

	@Autowired
	NotificacionRepository notificacionRepository;
	@Autowired
	AccountRepository accountRepository;
	
	@Transactional(rollbackFor = Exception.class)
	public Notification registerNotification(Notification notification, Long codigo) throws Exception{
		Account acc = accountRepository.findById(codigo).orElseThrow(() -> new Exception("No se encontro entidad"));
		acc.getNotification().add(notification);
		notification.setAccount(acc);
		return notificacionRepository.save(notification);
	}
	
	public List<Notification> listadoNotification() throws Exception{
		return notificacionRepository.findAll();
	}
	
	public Notification updateNotification(Long codigo, Boolean habilitado)throws Exception {
		Notification notif = notificacionRepository.findById(codigo).orElseThrow(() -> new Exception("No se encontro entidad"));
		notif.setId(notif.getId());
		notif.setContenido(notif.getContenido());
		notif.setAccount(notif.getAccount());
		notif.setTipo(notif.getTipo());
		notif.setVisto(habilitado);
		return notificacionRepository.save(notif);
	}
}
