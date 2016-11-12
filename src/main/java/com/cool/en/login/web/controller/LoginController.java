package com.cool.en.login.web.controller;

import org.en.core.common.UnionAjaxMessage;
import org.en.core.eenum.APIStatus;
import org.springframework.context.ApplicationContext;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.chinacreator.asp.comp.sys.core.security.service.AccessControlService;
import com.chinacreator.c2.ioc.ApplicationContextManager;
import com.chinacreator.c2.sysmgr.AuthenticationProvider;
import com.chinacreator.c2.sysmgr.Subject;
import com.chinacreator.c2.sysmgr.exception.AuthenticationException;
import com.chinacreator.c2.web.controller.ResponseFactory;

@Controller
public class LoginController {
	@SuppressWarnings("rawtypes")
	@RequestMapping(value="/loginAction",method=RequestMethod.POST)
	public Object login(@RequestParam(value = "username") String username,
			@RequestParam(value = "password") String password) {
		
		ApplicationContext context = ApplicationContextManager.getContext();
		AuthenticationProvider acs = (AuthenticationProvider) context.getBean("AuthenticationProvider");
		try {
			
			Subject subject = acs.login(username, password);
			UnionAjaxMessage unionAjaxMessage = new UnionAjaxMessage();
			unionAjaxMessage.setStatus(APIStatus.SCUUESS);
			unionAjaxMessage.setMessage("success");
//			return unionAjaxMessage;
			return "redirect:index";
		} catch (AuthenticationException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			UnionAjaxMessage unionAjaxMessage = new UnionAjaxMessage();
			unionAjaxMessage.setStatus(APIStatus.FAILED);
			unionAjaxMessage.setMessage("failed");
//			return unionAjaxMessage;
			return "redirect:login";
		}
	}
	
	@SuppressWarnings("rawtypes")
	@ResponseBody
	@RequestMapping(value="logoutAction",method=RequestMethod.POST)
	public Object logout() {
		
		ApplicationContext context = ApplicationContextManager.getContext();
		AuthenticationProvider acs = (AuthenticationProvider) context.getBean("AuthenticationProvider");
		String subject = acs.logout();
		UnionAjaxMessage unionAjaxMessage = new UnionAjaxMessage();
		unionAjaxMessage.setStatus(APIStatus.SCUUESS);
		unionAjaxMessage.setMessage("success");
		return unionAjaxMessage;
	}
}
