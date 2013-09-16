var files = [];
var allowMultiFiles = false;

//When we change a file element lets get it
window.onload = function(){
	$(':file').change(function(){
		(!allowMultiFiles?files = []:"");
		files.push(this.files[0]);
	});
}

var generateCurl=function(protocol,domain,port,key,method,endpoint) {
  var formid = 'form'+key;
  var curlcommand = 'curlcommand'+key;
  var serialized= $('#'+formid).serializeArray();
  var idmatches = endpoint.match(/:[-a-zA-Z0-9_]+/g);
  var idcount=0;
  var serializedarr=[];
  
  //Work out if there is a file element
  var fileElements = $('#'+formid+' input[type="file"]');
  if(fileElements.length>0){
  	var formData = new FormData();
  	for(f in files){
  		formData.append('filedata', files[f]);
  	}
  }
  
  if(typeof formData !="undefined"){
  	for(j in serialized) {
  		 if(serialized[j].value.length>0) {
  		 	formData.append(serialized[j].name, serialized[j].value);
  		 }
  	}
  }
  
  for(i in serialized) {
    if(serialized[i].name.indexOf(":") == 0) {
      endpoint = endpoint.replace(idmatches[idcount],serialized[i].value);
      idcount++;
    } else {
      if(serialized[i].value.length>0) {
        serializedarr.push(encodeURIComponent(serialized[i].name)+"="+encodeURIComponent(serialized[i].value));       
      }
    }
    
  }
  
  // calculate method str
	var methodstr="";
	var datastr="";
	var endpointstr = protocol+"://"+domain+":"+port+endpoint;
	
	//Is this just a normal get or post? Eg no file upload
  if(typeof formData == "undefined"){
		var serializedstr = serializedarr.join('&');
		
		switch(method) {
			case "get":
			 if(serializedstr.length>0) {
				 endpointstr += "?"+serializedstr;
			 }
				break;
			default:
				methodstr = "-X "+method.toUpperCase();
				datastr = " -d'"+serializedstr+"'";
		}
	}
	else{
		//Lets make a curl with the file params
		var serializedstr = "";
		for(f in files){
			serializedstr += " -F file=@"+files[f].name;
		}
		serializedstr += " -F "+serializedarr.join(' -F ');
		methodstr = "-X "+method.toUpperCase();
		datastr = serializedstr;
		
		//Put the formData in the var to send
		serializedstr = formData;
	}
  
  var command = "curl "+methodstr+datastr+" '"+endpointstr+"'<br />";
  $('#'+curlcommand).html(command);
  $('#'+curlcommand).removeClass('hidden');  
  
  var ajax_options = {
    url: endpoint,
    type: method,
    data: serializedstr
  };
  
  console.log(ajax_options);
  
  if(typeof formData != "undefined"){
  	serializedstr=formData;
  	ajax_options.contentType = false;
    ajax_options.processData = false;
  }
  
  $.ajax(ajax_options).done(function(data) { 
  	console.log("success",data);
		$('#'+curlcommand).append("<pre>"+JSON.stringify(data,null,4)+"</pre>");
		if(endpoint == '/logo') {
			// Render the logo in a nice fashion
			var logo = data.data;
			logo = logo.replace(/&#(\d+);/g, function (m, n) { return String.fromCharCode(n); });
			$('#'+curlcommand).append("The Logo<pre>"+logo+"</pre>");
		}
	}).fail(function(data) {
		console.log("fail",data);
    $('#'+curlcommand).append("<pre>"+data.responseText+"</pre>");    
  });
  
  
}

// find user
var findUser = function() {
  
  if ($('.findUser').val() == "") {
    alert("Enter an email address, dummy");
    return false;
  }
  
  var ajax_options = {
    url: "/user/by_email",
    type: "get",
    data: "email="+$('.findUser').val()
  };
  
  $.ajax(ajax_options).done(function(data) { 
		
		$("input[name=_user_id]").val(data.data._id);
		
		alert("Added user_id "+data.data._id+" to all forms");
		
	}).fail(function(data) {
    
    data = JSON.parse(data.responseText)
    
    console.log("FAIL", data);
    alert(data.msg);
    
  });
  
}
