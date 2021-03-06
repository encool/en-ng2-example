<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<!DOCTYPE html>
<html id="ng-app" ng-app="app">
<head>
<%
String path = request.getContextPath();  
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";  
%> 
<title>C2平台开发者社区 - 登录</title>
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
<meta charset="utf-8" />
<meta name="description" content="overview &amp; stats" />
<meta name="viewport"
	content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
<base href="<%=basePath%>">
<!--[if !IE]> -->
<link rel="stylesheet" href="assets/css/c2-all.css" />
<!-- <![endif]-->
<!-- 一些扩展特性  -->
<script src="assets/ace-extra.min.js"></script>

<!-- HTML5 shim and Respond.js IE8 support of HTML5 elements and media queries -->
<!--[if lt IE 10]>
	<link rel="stylesheet" href="assets/compatible/dup/bootstrap.min.css"/>
	<link rel="stylesheet" href="assets/compatible/dup/messenger.css"/>
	<link rel="stylesheet" href="assets/compatible/dup/messenger-theme-flat.css"/>
    <link rel="stylesheet" href="assets/compatible/ace-part2.min.css"/>
    <link rel="stylesheet" href="assets/compatible/ace-ie.min.css"/>
<![endif]-->

<!-- 进度条 -->
<script data-pace-options='{ "target": "#progress"}'
	src="assets/pace.min.js"></script>
</head>
<body style="background-color: #f5f5f5;" ng-controller="loginController">
	<center>
		<br>
		<div style="height: 60px; width: 400px;"></div>


		<h1 class="text-primary">
			<strong>C2开发者社区</strong>
		</h1>

		<div class="panel panel-default text-left" style="width: 400px;">
			<div class="panel-body">
				<form role="form" ng-submit="submitForm()">
					<div class="form-group">
						<label class="text-muted">登录名</label> <input type="text" id="username"
							class="form-control" ng-model="username"  required autofocus>
					</div>
					<div class="form-group">
						<label class="text-muted">密码</label> <input type="password" id="password"
							class="form-control" ng-model="password"  required>
					</div>
					<!-- <div class="form-group">
						<div class="checkbox">
							<label> <input type="checkbox" ng-model="rememberme">
								记住我（公共场所慎用）
							</label>
						</div>
					</div> -->
					<div class="form-group">
						<button type="submit" class="btn btn-primary">登 录</button>
					</div>
				</form>
			</div>
		</div>
		Copyright ©2007-2014 All Rights Reserved <br> <a href="#">www.chinacreator.com</a>
	</center>

	<!-- basic scripts -->
	<script src="assets/jquery.min.js"></script>
	<script src="assets/js/c2-all.js"></script>

	<script type="text/javascript">
		app.controller('loginController', [ '$scope', 'SecurityFactory',
				function($scope, SecurityFactory) {
					$scope.submitForm = function() {
						SecurityFactory.login($scope.username, $scope.password);
					};
				} ]);		
	</script>
</body>
</html>
