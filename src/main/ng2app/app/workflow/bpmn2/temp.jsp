<%@ page contentType="text/html; charset=utf-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
	String processDefinitionId = request
			.getParameter("processDefinitionId");
	String processInstanceId = request
			.getParameter("processInstanceId");
	String processName = processDefinitionId.substring(0,
			processDefinitionId.lastIndexOf(":"));

	String dataUrl = path
			+ "/workflow/monitor/wfmonitor?processInstanceId="
			+ processInstanceId;
	
%>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">

<link rel="stylesheet" href="style.css" type="text/css" media="screen">
<link rel="stylesheet" type="text/css"
	href="jquery/themes/default/easyui.css">
<link rel="stylesheet" type="text/css"
	href="jquery/themes/icon.css">
<link rel="stylesheet" type="text/css"
	href="jquery/demo/demo.css">

<script type="text/javascript"
	src="jquery/jquery-1.8.0.min.js"></script>
<script type="text/javascript"
	src="jquery/jquery.easyui.min.js"></script>
<script type="text/javascript"
	src="jquery/locale/easyui-lang-zh_CN.js"></script>
<script type="text/javascript"
	src="js/tools.js"></script>
	  

<script src="js/jstools.js" type="text/javascript" charset="utf-8"></script>
<script src="js/raphael.js" type="text/javascript" charset="utf-8"></script>
<script src="js/jquery/jquery.progressbar.js" type="text/javascript"
	charset="utf-8"></script>
<script src="js/jquery/jquery.asyncqueue.js" type="text/javascript"
	charset="utf-8"></script>

<script src="js/Color.js" type="text/javascript" charset="utf-8"></script>
<script src="js/Polyline.js" type="text/javascript" charset="utf-8"></script>
<script src="js/ActivityImpl.js" type="text/javascript" charset="utf-8"></script>
<script src="js/ActivitiRest.js" type="text/javascript" charset="utf-8"></script>
<script src="js/LineBreakMeasurer.js" type="text/javascript"
	charset="utf-8"></script>
<script src="js/ProcessDiagramGenerator.js" type="text/javascript"
	charset="utf-8"></script>
<script src="js/ProcessDiagramCanvas.js" type="text/javascript"
	charset="utf-8"></script>
<!-- 
<script src="index.js" type="text/javascript" charset="utf-8"></script> -->
<script type="text/javascript">
	var dataUrl = "<%=dataUrl%>";

	function fixWidth(percent) {
		return document.body.clientWidth * percent; // 这里你可以自己做调整
	}

	function setWidth() {
		return $(window).width();
	}
	/* $(function() {

		$('#handled').datagrid({
			url:	dataUrl,
			//title: '未办任务',
			//width:setWidth(),
			//height: '300px',
			fitColumns: true,
			rownumbers : true,
			pagination : false,
			singleSelect :true,
			columns : [ [ {
				field : 'taskDefinitionKey',
				title: '活动定义ID',
				width : fixWidth(0.2)
			}, {
				field: 'name',
				title : '活动名称',
				width :fixWidth(0.2)
			}, {
				field : 'assignee',
				title: '任务处理人',
				width : fixWidth(0.2)
			}, { 
				field: 'status',
				title : '任务状态',
				width :fixWidth(0.2)
			}, {
				field : 'startTime',
				title: '任务开始时间',
				width : fixWidth(0.2)
			}, {
				field: 'dueDate',
				title : '任务到期时间',
				width :fixWidth(0.2)
			}, {
				field : 'endTime',
				title: '任务结束时间',
				width : fixWidth(0.2)
			}, {
				field: 'overDue',
				title : '是否超期',
				width :fixWidth(0.2)
			}, {
				field : 'description',
				title: '描述',
				width :fixWidth(0.2)
			} ] ]
		});
	}); */

	$(window).resize(function() {
	//	$("#diagram-panel").css("width", setWidth());
	//	$("svg").css("width", setWidth());
	//	$(".panel-header").css("width", setWidth());
	//	$("#diagramHolder").width(setWidth());
	//	$(".diagram").width(setWidth());

	//	$("#task-panel").css("width", setWidth());
	//	$("#handled").datagrid("resize", {
	//		width:setWidth()
	//	}); 
		location.reload();
	});
</script>

<style type="text/css">
.dialog-toolbar {
	background: #ecf5fc;
}

.datagrid-toolbar,.datagrid-pager {
	background: #ecf5fc;
}
</style>

</head>
<body scroll=yes style='padding:0'>
	<div class="easyui-panel" id='diagram-panel'
		title="流程图[<%=processName%>]" collapsible="true" width="100%">
		<div id="diagramHolder" class="diagramHolder"></div>
		<div id="tipDiv" style="width: 700px;height: auto;top: 11px;left:11px;display: none;position: absolute;">
		<div><input type="image" src="images/close.png" onclick="hideDivPop()" style="float:right"/></div>
		
		 <div id="tipDivInner" style="position: relative;"></div> 
		<!-- <table style="border: #FEFFD4 solid 1px;"><tr><td>id</td><td>名称</td></tr><tr><td>1</td><td>一</td></tr></table> -->
		</div>
		<!-- <div id="overlayBox">
			<div id="diagramBreadCrumbs" class="diagramBreadCrumbs" onmousedown="return false" onselectstart="return false"></div>
			<div id="diagramHolder" class="diagramHolder"></div>
			<div class="diagram-info" id="diagramInfo"></div>
		</div> -->
	</div>
	<!-- <div class="easyui-panel" id='task-panel' region="center" title="任务轨迹"
		collapsible="true" width="100%"> -->
		<!-- <div id="handled"></div> -->
	<!-- </div> -->
	<div id="actInfo">
	</div>

<script language='javascript'>
var DiagramGenerator = {};
var pb1;
function hideDivPop(){
	if($("#tipDiv").css("display")=='block'){
	   $("#tipDiv").hide();
	}
}


$(document).ready(function(){
	
  var query_string = {};
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i=0;i<vars.length;i++) {
    var pair = vars[i].split("=");
    query_string[pair[0]] = pair[1];
  } 
  
  var processDefinitionId = query_string["processDefinitionId"];
  var processInstanceId = query_string["processInstanceId"];
  
  console.log("Initialize progress bar");
  
  pb1 = new $.ProgressBar({
    boundingBox: '#pb1',
    label: 'Progressbar!',
    on: {
      complete: function() {
        console.log("Progress Bar COMPLETE");
        this.set('label', 'complete!');
        if (processInstanceId) {
          ProcessDiagramGenerator.drawHighLights(processInstanceId);
        }
      },
      valueChange: function(e) {
        this.set('label', e.newVal + '%');
      }
    },
    value: 0
  });
  console.log("Progress bar inited");
  
  ProcessDiagramGenerator.options = {
    diagramBreadCrumbsId: "diagramBreadCrumbs",
    diagramHolderId: "diagramHolder",
    diagramInfoId: "diagramInfo",
    on: {
    	click: function(canvas, element, contextObject){

        var mouseEvent = this;
        
  	  	var taskType=contextObject.getProperty("type");
  	  	var heightOfObject=contextObject.height;
  	  	var taskDefKey=contextObject.id;
  	  	
  	  	console.log("yyc debug-->"+"流程实例ID:"+processInstanceId+",流程定义ID:"+processDefinitionId+",任务定义key:"+taskDefKey+",任务类型:"+taskType);

        console.log("[CLICK] mouseEvent: %o, canvas: %o, clicked element: %o, contextObject: %o", mouseEvent, canvas, element, contextObject);

	  	if(taskType == "userTask"){
			  //$ajax()
			  //var htmlStr = "<table><tr><td>id</td><td>名称</td></tr><tr><td>1</td><td>一</td></tr></table>";
			 // $('#tipDivInner').html(htmlStr);
			  //handlegrid
			  var objOfDiv = $('#tipDiv');
			  
			  if(objOfDiv[0]){
				  $('#tipDiv').css("top",heightOfObject+contextObject.y+11+28+"px");
				  $('#tipDiv').css("left",contextObject.x+11+"px");
				  $('#tipDiv').show();
	//			  console.log(dataUrl);
				  $('#tipDivInner').datagrid({
						url: dataUrl+"&taskDefinitionKey="+taskDefKey,
						//title: '未办任务',
						//width:setWidth(),
						//height: '300px',
						fitColumns: true,
						rownumbers : true,
						pagination : false,
						singleSelect :true,
						columns : [ [/* {
							field : 'taskDefinitionKey',
							title: '活动定义ID',
							width : fixWidth(0.2)
						},*/ {
							field: 'name',
							title : '活动名称',
							width :fixWidth(0.2)
						}, {
							field : 'assignee',
							title: '任务处理人',
							width : fixWidth(0.2)
						},{
							field : 'candidate',
							title: '候选人',
							width : fixWidth(0.2)
						}, {
							field: 'status',
							title : '任务状态',
							width :fixWidth(0.1)
						}, {
							field : 'startTime',
							title: '任务开始时间',
							width : fixWidth(0.2)
						}, {
							field: 'dueDate',
							title : '任务到期时间',
							width :fixWidth(0.2)
						}, {
							field : 'endTime',
							title: '任务结束时间',
							width : fixWidth(0.2)
						}, {
							field: 'overDue',
							title : '是否超期',
							width :fixWidth(0.2)
						}/*, {
							field : 'description',
							title: '描述',
							width :fixWidth(0.2)
						}*/ ] ]
					});
			  }
		  }else if (taskType == "callActivity") {
	          var processDefinitonKey = contextObject.getProperty("processDefinitonKey");
	          var processDefinitons = contextObject.getProperty("processDefinitons");
	          var processDefiniton = processDefinitons[0];
	          console.log("Load callActivity '" + processDefiniton.processDefinitionKey + "', contextObject: ", contextObject);
	
	          // Load processDefinition
	        ProcessDiagramGenerator.drawDiagram(processDefiniton.processDefinitionId);
        }
      },
      rightClick: function(canvas, element, contextObject){

        var mouseEvent = this;
        console.log("[RIGHTCLICK] mouseEvent: %o, canvas: %o, clicked element: %o, contextObject: %o", mouseEvent, canvas, element, contextObject);
      },
      over: function(canvas, element, contextObject){

        var mouseEvent = this;
        //console.log("[OVER] mouseEvent: %o, canvas: %o, clicked element: %o, contextObject: %o", mouseEvent, canvas, element, contextObject);

        // TODO: show tooltip-window with contextObject info
        ProcessDiagramGenerator.showActivityInfo(contextObject);
      },
      out: function(canvas, element, contextObject){

        var mouseEvent = this;
        //console.log("[OUT] mouseEvent: %o, canvas: %o, clicked element: %o, contextObject: %o", mouseEvent, canvas, element, contextObject);

        ProcessDiagramGenerator.hideInfo();
        
 	    if($("#tipDiv").css("display")=='block'){
		   //$("#tipDiv").hide();
	    }
 	   
      }
    }
  };
  
  var baseUrl = "<%=basePath %>";
  
  ActivitiRest.options = {
    processInstanceHighLightsUrl: baseUrl + "workflow/service/process-instance/{processInstanceId}/highlights?callback=?",
    processDefinitionUrl: baseUrl + "workflow/service/process-definition/{processDefinitionId}/diagram-layout?callback=?",
    processDefinitionByKeyUrl: baseUrl + "workflow/service/process-definition/{processDefinitionKey}/diagram-layout?callback=?"
  };
  
  if (processDefinitionId) {
    ProcessDiagramGenerator.drawDiagram(processDefinitionId);
   
  } else {
    alert("processDefinitionId parameter is required");
  }
	
});

</script>

</body>
</html>
