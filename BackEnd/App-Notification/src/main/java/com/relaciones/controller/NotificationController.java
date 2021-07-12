package com.relaciones.controller;

import java.util.ArrayList;
import java.util.Random;

import org.codehaus.jettison.json.JSONException;
import org.codehaus.jettison.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.ResponseEntity.BodyBuilder;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.scheduling.TaskScheduler;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@EnableScheduling
@RestController
public class NotificationController {

	@Bean
	public RestTemplate getRestTemplate() {
		return new RestTemplate();
	}

	@Autowired
	private RestTemplate restTemplate;
	
	@Autowired
    private SimpMessagingTemplate template;

	private Random aleatorio = new Random(System.currentTimeMillis());
	
	@MessageMapping("/gennotification")
	public void getConfirmation(String id) throws JSONException, InterruptedException{
		Thread.sleep(1000); 
		this.template.convertAndSend("/topic/notifresponse", "Realizado correctamente!");

		ArrayList<String> res = getNotification();
		String tipo = res.get(0);
		String notificacion = res.get(1);
		JSONObject jsonObj2 = new JSONObject();
		jsonObj2.put("id", id);
		jsonObj2.put("tipo", tipo);
		jsonObj2.put("notificacion", notificacion);
		String jsonString = restTemplate.postForObject("http://localhost:8089", jsonObj2.toString(),String.class);
	}


	public ArrayList<String> getNotification() {
		ArrayList<String> arrString = new ArrayList<String>();

		int randomTipo = 1 + aleatorio.nextInt(4 - 1 + 1);
		int randomNotif = 1 + aleatorio.nextInt(2 - 1 + 1);
		String tipo = "";
		String notificacion = "";
		
		switch (randomTipo) {
		case 1: {
			tipo = "Deposito";
			if (randomNotif == 1)
				notificacion = "Se realizó con éxito el depósito";
			if (randomNotif == 2)
				notificacion = "Usted ha recibido un depósito";
			break;
		}
		case 2: {
			tipo = "Login";
			if (randomNotif == 1)
				notificacion = "Notificacion de login en otra PC";
			if (randomNotif == 2)
				notificacion = "Reestablezca contraseña";
			break;
		}
		case 3: {
			tipo = "Retiro";
			if (randomNotif == 1)
				notificacion = "Se realizó con éxito retiro de soles";
			if (randomNotif == 2)
				notificacion = "Se ha retirado dolares de la cuenta";
			break;
		}
		case 4: {
			tipo = "Promociones";
			if (randomNotif == 1)
				notificacion = "Gana un bono de millas";
			if (randomNotif == 2)
				notificacion = "Te devolvemos el 40% de todas tus compras";
			break;
		}
		}

		arrString.add(tipo);
		arrString.add(notificacion);

		return arrString;
	}
}
