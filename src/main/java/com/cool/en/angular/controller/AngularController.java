package com.cool.en.angular.controller;

import org.springframework.context.ApplicationContext;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.chinacreator.c2.ioc.ApplicationContextManager;
import com.chinacreator.c2.sysmgr.AuthenticationProvider;

@Controller
public class AngularController {
	@RequestMapping(value="/**",method={ RequestMethod.POST, RequestMethod.GET })
	public String index(){
		ApplicationContext context = ApplicationContextManager.getContext();
		AuthenticationProvider acs = (AuthenticationProvider) context.getBean("AuthenticationProvider");
		boolean athed = acs.isAuthenticated();
		if(athed){
			return "index";
		}
		return "login";
	}
}
