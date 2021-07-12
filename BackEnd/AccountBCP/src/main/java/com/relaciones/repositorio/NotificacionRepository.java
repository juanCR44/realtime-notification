package com.relaciones.repositorio;

import org.springframework.data.jpa.repository.JpaRepository;

import com.relaciones.model.Notification;

public interface NotificacionRepository extends JpaRepository<Notification, Long>{

}
