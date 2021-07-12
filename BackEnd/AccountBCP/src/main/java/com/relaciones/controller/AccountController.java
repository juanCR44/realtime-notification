package com.relaciones.controller;

import java.util.List;

import org.codehaus.jettison.json.JSONException;
import org.codehaus.jettison.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpStatus;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.server.ResponseStatusException;

import com.relaciones.model.Account;
import com.relaciones.model.Notification;
import com.relaciones.service.AccountService;
import com.relaciones.service.NotificationService;

@RestController
public class AccountController {

	@Bean
	public RestTemplate getRestTemplate() {
		return new RestTemplate();
	}
	
	@Autowired
	private AccountService accountService;
	@Autowired
	private NotificationService notificationService;
	
	
	@RequestMapping(value = "/", method=RequestMethod.POST)
	public String notification(@RequestBody String jsonObject) throws JSONException{
		JSONObject jsonObj= new JSONObject(jsonObject);
		String codigo = jsonObj.getString("id");
		String tipo = jsonObj.getString("tipo");
		String notif = jsonObj.getString("notificacion");
		
		Notification notification = new Notification();
		try {
			notification.setTipo(tipo);
			notification.setContenido(notif);
			notification.setVisto(false);
			notification = notificationService.registerNotification(notification, Long.parseLong(codigo));
		} catch (Exception e) {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Imposible de concretar");
		}
		return "Ok";
	}
	
	@RequestMapping(value = "/habilitar", method=RequestMethod.POST)
	public String habilitarNotificacion(@RequestBody String jsonObject) throws JSONException{
		JSONObject jsonObj= new JSONObject(jsonObject);
		String codigo = jsonObj.getString("id");
		String afirmacion = jsonObj.getString("afirmacion");
		Account acc = null;
		try {
			accountService.updateAccount(Long.parseLong(codigo), Boolean.parseBoolean(afirmacion));
		} catch (Exception e) {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Imposible de concretar");
		}
		return "Account Ok";
	}
	
	@MessageMapping("/codigonotif")
	@SendTo("/topic/updatenotif")
	public Notification updateNotification(String jsonContent) throws JSONException {
		JSONObject jsonGet= new JSONObject(jsonContent);
		String codigo = jsonGet.getString("id");
		String habilitado = jsonGet.getString("afirmacion");
		Notification notif = null;
		try {
			notif = notificationService.updateNotification(Long.parseLong(codigo), Boolean.parseBoolean(habilitado));
		} catch (Exception e) {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No se encontro entidad");
		}
		return notif;
	}
	
	@MessageMapping("/codigoaccount")
	@SendTo("/topic/getaccount")
	public Account buscarAccount(String id) {
		Long codigo = Long.parseLong(id);
		Account acc = null;
		try {
			acc = accountService.buscarAccount(codigo);
		} catch (Exception e) {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No se encontro entidad");
		}
		return acc;
	}
	
	@MessageMapping("/jsonnotification")
	@SendTo("/topic/newnotif")
	public String newNotification(String jsonContent) throws JSONException {
		JSONObject jsonGet= new JSONObject(jsonContent);
		String codigo = jsonGet.getString("id");
		String tipo = jsonGet.getString("tipo");
		String contenido = jsonGet.getString("contenido");
		
		Notification notification = new Notification();
		
		try {
			notification.setTipo(tipo);
			notification.setContenido(contenido);
			notification.setVisto(false);
			notification = notificationService.registerNotification(notification, Long.parseLong(codigo));
		} catch (Exception e) {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Imposible de concretar");
		}
		return "Ok";
	}
	
	@GetMapping("/listanotificaciones")
	public List<Notification> listaNotificaciones() throws Exception{
		return notificationService.listadoNotification();
	}
	
	
	@PostMapping("/registraraccount")
	public Account registrarAccount(@RequestBody Account account) {
		Account acc = null;
		try {
			acc = accountService.registrarAccount(account);
		} catch (Exception e) {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Imposible de concretar");
		}
		return acc;
	}
	
	@PostMapping("/registrarnotificacion/{codigo}")
	public Notification registrarNotificacion(@PathVariable(value = "codigo")Long codigo,  @RequestBody Notification notificacion) {
		Notification notif = null;
		try {
			notif = notificationService.registerNotification(notificacion, codigo);
		} catch (Exception e) {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Imposible de concretar");
		}
		return notif;
	}
}
