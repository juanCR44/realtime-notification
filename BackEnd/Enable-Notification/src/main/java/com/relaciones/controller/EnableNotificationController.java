package com.relaciones.controller;

import org.codehaus.jettison.json.JSONException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
public class EnableNotificationController {
	
	@Bean
	public RestTemplate getRestTemplate() {
		return new RestTemplate();
	}

	@Autowired
	private RestTemplate restTemplate;
	
	@MessageMapping("/enablenotification")
    @SendTo("/topic/enable")
	public String mandar(String jsonContent) throws JSONException {
		String jsonString = restTemplate.postForObject("http://localhost:8089/habilitar", jsonContent,String.class);
		return "Ok";
	}
}
