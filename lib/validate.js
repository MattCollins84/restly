/***
  Validaton controller
  all sorts of validation stuff goes on in here
  can get a bit fruity!
***/

// load the moment date/time library
var moment = require('moment');
var _ = require('underscore');

var string = require('string');

// convert a mime-type into a more commonly identifiable 3 char file extension
mimeToExtension = function(mime_type) {

  switch(mime_type) {
    case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
    return 'docx';
    break;
  case "application/vnd.oasis.opendocument.text":
    return 'odt';
    break;
  case "text/h323":
    return '323';
    break;
  case "application/internet-property-stream":
    return 'acx';
    break;
  case "audio/x-aiff":
    return 'aif';
    break;
  case "video/x-ms-asf":
    return 'asf';
    break;
  case "video/x-msvideo":
    return 'avi';
    break;
  case "application/olescript":
    return 'axs';
    break;
  case "image/bmp":
    return 'bmp';
    break;
  case "application/vnd.ms-pkiseccat":
    return 'cat';
    break;
  case "application/x-cdf":
    return 'cdf';
    break;
  case "application/x-netcdf":
    return 'cdf';
    break;
  case "application/x-msclip":
    return 'clp';
    break;
  case "image/x-cmx":
    return 'cmx';
    break;
  case "image/cis-cod":
    return 'cod';
    break;
  case "application/x-mscardfile":
    return 'crd';
    break;
  case "application/pkix-crl":
    return 'crl';
    break;
  case "application/x-x509-ca-cert":
    return 'crt';
    break;
  case "application/x-csh":
    return 'csh';
    break;
  case "text/css":
    return 'css';
    break;
  case "text/csv' || mime_type == 'application/csv' || mime_type == 'application/vnd.ms-excel":
    return 'csv';
    break;
  case "application/x-director":
    return 'dcr';
    break;
  case "application/x-msdownload":
    return 'dll';
    break;
  case "application/msword":
    return 'doc';
    break;
  case "application/x-dvi":
    return 'dvi';
    break;
  case "application/postscript":
    return 'eps';
    break;
  case "text/x-setext":
    return 'etx';
    break;
  case "application/envoy":
    return 'evy';
    break;
  case "application/fractals":
    return 'fif';
    break;
  case "image/gif":
    return 'gif';
    break;
  case "application/x-gtar":
    return 'gtar';
    break;
  case "application/x-gzip":
    return 'gz';
    break;
  case "application/x-hdf":
    return 'hdf';
    break;
  case "application/winhlp":
    return 'hlp';
    break;
  case "application/mac-binhex40":
    return 'hqx';
    break;
  case "application/hta":
    return 'hta';
    break;
  case "text/x-component":
    return 'htc';
    break;
  case "text/html":
    return 'htm';
    break;
  case "text/webviewhtml":
    return 'htt';
    break;
  case "image/x-icon":
    return 'ico';
    break;
  case "image/ief":
    return 'ief';
    break;
  case "application/x-iphone":
    return 'iii';
    break;
  case "application/x-internet-signup":
    return 'ins';
    break;
  case "image/pipeg":
    return 'jfif';
    break;
  case "image/jpeg":
    return 'jpg';
    break;
  case "application/x-javascript":
    return 'js';
    break;
  case "application/x-latex":
    return 'latex';
    break;
  case "video/x-la-asf":
    return 'lsf';
    break;
  case "audio/x-mpegurl":
    return 'm3u';
    break;
  case "application/x-troff-man":
    return 'man';
    break;
  case "application/x-msaccess":
    return 'mdb';
    break;
  case "application/x-troff-me":
    return 'me';
    break;
  case "message/rfc822":
    return 'mht';
    break;
  case "audio/mid":
    return 'mid';
    break;
  case "application/x-msmoney":
    return 'mny';
    break;
  case "video/quicktime":
    return 'mov';
    break;
  case "video/x-sgi-movie":
    return 'movie';
    break;
  case "video/mpeg":
    return 'mp2';
    break;
  case "audio/mpeg":
    return 'mp3';
    break;
  case "video/mpeg":
    return 'mpg';
    break;
  case "application/vnd.ms-project":
    return 'mpp';
    break;
  case "application/x-troff-ms":
    return 'ms';
    break;
  case "application/vnd.ms-outlook":
    return 'msg';
    break;
  case "application/x-msmediaview":
    return 'mvb';
    break;
  case "application/x-netcdf":
    return 'nc';
    break;
  case "application/oda":
    return 'oda';
    break;
  case "application/pkcs10":
    return 'p10';
    break;
  case "application/x-pkcs12":
    return 'p12';
    break;
  case "application/x-pkcs7-certificates":
    return 'p7b';
    break;
  case "application/x-pkcs7-mime":
    return 'p7m';
    break;
  case "application/x-pkcs7-certreqresp":
    return 'p7r';
    break;
  case "application/x-pkcs7-signature":
    return 'p7s';
    break;
  case "image/x-portable-bitmap":
    return 'pbm';
    break;
  case "application/pdf":
    return 'pdf';
    break;
  case "application/x-pdf":
    return 'pdf';
    break;
  case "applications/vnd.pdf":
    return 'pdf';
    break;
  case "application/vnd.pdf":
    return 'pdf';
    break;
  case "application/acrobat":
    return 'pdf';
    break;
  case "text/pdf":
    return 'pdf';
    break;
  case "text/x-pdf":
    return 'pdf';
    break;
  case "application/x-pkcs12":
    return 'pfx';
    break;
  case "image/x-portable-graymap":
    return 'pgm';
    break;
  case "application/ynd.ms-pkipko":
    return 'pko';
    break;
  case "application/x-perfmon":
    return 'pma';
    break;
  case "image/x-portable-anymap":
    return 'pnm';
    break;
  case "image/x-portable-pixmap":
    return 'ppm';
    break;
  case "application/vnd.ms-powerpoint":
    return 'pps';
    break;
  case "application/pics-rules":
    return 'prf';
    break;
  case "application/x-mspublisher":
    return 'pub';
    break;
  case "audio/x-pn-realaudio":
    return 'ra';
    break;
  case "image/x-cmu-raster":
    return 'ras';
    break;
  case "image/x-rgb":
    return 'rgb';
    break;
  case "application/x-troff":
    return 'roff';
    break;
  case "application/rtf":
    return 'rtf';
    break;
  case "text/richtext":
    return 'rtx';
    break;
  case "application/x-msschedule":
    return 'scd';
    break;
  case "text/scriptlet":
    return 'sct';
    break;
  case "application/set-payment-initiation":
    return 'setpay';
    break;
  case "application/set-registration-initiation":
    return 'setreg';
    break;
  case "application/x-sh":
    return 'sh';
    break;
  case "application/x-shar":
    return 'shar';
    break;
  case "application/x-stuffit":
    return 'sit';
    break;
  case "audio/basic":
    return 'snd';
    break;
  case "application/x-pkcs7-certificates":
    return 'spc';
    break;
  case "application/futuresplash":
    return 'spl';
    break;
  case "application/x-wais-source":
    return 'src';
    break;
  case "application/vnd.ms-pkicertstore":
    return 'sst';
    break;
  case "application/vnd.ms-pkistl":
    return 'stl';
    break;
  case "application/x-sv4cpio":
    return 'sv4cpio';
    break;
  case "application/x-sv4crc":
    return 'sv4crc';
    break;
  case "image/svg+xml":
    return 'svg';
    break;
  case "application/x-shockwave-flash":
    return 'swf';
    break;
  case "application/x-tar":
    return 'tar';
    break;
  case "application/x-tcl":
    return 'tcl';
    break;
  case "application/x-tex":
    return 'tex';
    break;
  case "application/x-texinfo":
    return 'texi';
    break;
  case "application/x-compressed":
    return 'tgz';
    break;
  case "image/tiff":
    return 'tif';
    break;
  case "application/x-troff":
    return 'tr';
    break;
  case "application/x-msterminal":
    return 'trm';
    break;
  case "text/tab-separated-values":
    return 'tsv';
    break;
  case "text/plain":
    return 'txt';
    break;
  case "text/iuls":
    return 'uls';
    break;
  case "application/x-ustar":
    return 'ustar';
    break;
  case "text/x-vcard":
    return 'vcf';
    break;
  case "audio/x-wav":
    return 'wav';
    break;
  case "application/vnd.ms-works":
    return 'wps';
    break;
  case "application/x-mswrite":
    return 'wri';
    break;
  case "x-world/x-vrml":
    return 'wrl';
    break;
  case "image/x-xbitmap":
    return 'xbm';
    break;
  case "application/vnd.ms-excel":
    return 'xls';
    break;
  case "image/x-xpixmap":
    return 'xpm';
    break;
  case "image/x-xwindowdump":
    return 'xwd';
    break;
  case "application/x-compress":
    return 'z';
    break;
  case "application/zip":
    return 'zip';
    break;
  case "image/vnd.microsoft.icon":
    return 'ico';
    break;
  }
  
  if(mime_type.indexOf("/")!=-1) {
    var n = mime_type.split("/");
    return n[1];
  }

  return mime_type;

}


//validate parameters of an API call
var parameters = function(apicall, opts, files) {

  var errors = [];
  
  var endpoint = toString(apicall.endpoint); 

  // is this an entity API call
  var bits = endpoint.split("/");  
  
  // validate each parameter of this api call
  for(i in apicall.parameters) {
    
    var param = apicall.parameters[i];
    
    // error if a required parameter is missing
    if(param.required && param.type != "file" && (_.isUndefined(opts[i]) || _.isNull(opts[i]) || opts[i].length == 0)) {
      errors.push(i + " is a required parameter");
    }
    
    // error relating to provided file (or lack of)
    if(param.type=='file') {

      if(param.required && (typeof files == "undefined" || !files[i])) {
        // File required, but missing
        errors.push(i + " is a requirement");
      } else if(param.file_types && files[i]) {

        // File must be of a specific type
        var matching_file_type = false;

        // Note for why we do files[i].length-1 - if you submit a file, it errors, then you submit another file, 
        // details of BOTH files seem to be stashed in the 'files' parameter (it becomes an array), so we need to make sure it's the most recent
        // submission we're actually validating! Only likely to happen via the JADE based front end as this uses AJAX woo to 're-structure' the form...

        if(_.isArray(files[i])) {
          var file_type = files[i][files[i].length-1].type;
        } else {
          var file_type = files[i].type;
        }

        if(file_type) {
          // Here we'll convert the encoding type to something a bit more 'English' (e.g text/html becomes html)
          file_type = mimeToExtension(file_type);
          for(var ft=0;ft<param.file_types.length;ft++) {
            if(file_type == param.file_types[ft]) {
              matching_file_type = true;
            }
          }
        } 

        if(!matching_file_type) {
          errors.push(i + " is not a suitable file type. Please see documentation");
          errors.push(i + " should be of type " + param.file_types.join(", "));
        }

      }

    }
    
    // strip tags if needed
    if (param.strip_tags && !_.isUndefined(opts[i]) && !_.isNull(opts[i])) {
       opts[i] = string(opts[i]).stripTags().s;  
     }

    // max length error checking for strings
    if (param.type == "string" && _.isNumber(param.max_length) && !_.isUndefined(opts[i]) && _.isString(opts[i])) {
      
      if (opts[i].length > param.max_length) {
        errors.push(i + " exceeds the maximum allowed length ("+param.max_length+")");
      }
      
    }
    
    // min length error checking for strings
    if (param.type == "string" && _.isNumber(param.min_length) && !_.isUndefined(opts[i])) {
      
      if (opts[i].length < param.min_length) {
        errors.push(i + " is not valid, a minimum of "+param.min_length+" characters is required");
      }
      
    }
    
    // JSON checking
    if (param.type == "json") {
      if(!_.isUndefined(opts[i]) && (typeof opts[i] != "string" || !isValidJSON(opts[i]))){
        errors.push(i + " is not valid JSON");
      }
    }

    // check email types
    if (param.type == "email" && !_.isUndefined(opts[i]) && opts[i] != "" && !isValidEmail(opts[i])) {
      errors.push(i+" requires a valid email");
    }

    // error if a parameter is supplied and doesn't match regular expression
    if(param.regex && typeof opts[i] == "string") {
      var rex = new RegExp(param.regex);
      if(!rex.exec(opts[i])) {
        errors.push(i + " does not match required format. Please see documentation");
      }
    }
    
    // if this is an enumeration, check whether the supplied value is allowed
    if(param.type=='enum' && typeof param.values != "undefined" && typeof param.values == "object") {
      if((!_.isUndefined(opts[i])) && param.values.indexOf(opts[i])==-1) {
        errors.push(i + " does not match one of the required values. Please see documentation");
      }
    }
    
    // handle date manipulation
    var dateRegex = new RegExp(/-?[0-9]+\s\b(days|months|years|hours|minutes)\b/);
    if (param.type=="date" && !_.isUndefined(opts[i]) && dateRegex.exec(opts[i])) {
      
      var parts = opts[i].split(" ");
      opts[i] = moment.utc().add(parts[1], parts[0]).format("YYYY-MM-DD HH:mm:ss Z");
      
    }
    
    // apply a default
    if(typeof opts[i]== "undefined" && !_.isUndefined(param.default)) {

      // for dates
      if(param.type=="date" && param.default=="now") {
        opts[i] = moment.utc().format("YYYY-MM-DD HH:mm:ss Z");
      } 
      
      // handle date manipulation
      else if (param.type=="date" && dateRegex.exec(param.default)) {        
        
        var parts = param.default.split(" ");
        opts[i] = moment.utc().add(parts[1], parts[0]).format("YYYY-MM-DD HH:mm:ss Z");
        
      }
      
      // other types
      else {
        opts[i] = param.default;
      }
      
      // for bools
      if (param.type == "bool") {
        opts[i] = param.default;
      }
      
    }

    // type check the params. Convert things to integers or floats where appropriate.
    switch(param.type) {
      
      case "int":
        if(_.isNumber(opts[i])) {
          opts[i] = Math.round(opts[i]);
        }

        else if (!_.isUndefined(opts[i])) {
          opts[i] = opts[i]?parseInt(opts[i],10):0;        
        }
        
        if(!_.isUndefined(opts[i]) && isNaN(opts[i])) {
          errors.push(i + " must be an integer");
        }
        
        // too big?
        if (!_.isUndefined(opts[i]) && param.max && param.max < opts[i]) {
          errors.push(i + " must be smaller than or equal to "+param.max);
        }
        
        // too small?
        if (!_.isUndefined(opts[i]) && !_.isUndefined(param.min) && param.min > opts[i]) {
          errors.push(i + " must be larger than or equal to "+param.min);
        }
        
        break;

      case "float":
        if(_.isString(opts[i])) {
          opts[i] = opts[i]?parseFloat(opts[i]):0;
        }

        if(_.isUndefined(opts[i])) {
          opts[i] = 0;
        }

        if(isNaN(opts[i])){
          errors.push(i + " must be an number");
        } 
        
        // too big?
        else if (!_.isUndefined(opts[i]) && param.max && param.max < opts[i]) {
          errors.push(i + " must be smaller than "+param.max);
        }
      
        // too small?
        else if (!_.isUndefined(opts[i]) && !_.isUndefined(param.min) && param.min > opts[i]) {
          errors.push(i + " must be larger than "+param.min);
        }
        break;

      case "date":
        opts[i] = moment.utc(opts[i],"YYYY-MM-DD HH:mm:ss Z").format("YYYY-MM-DD HH:mm:ss Z");
        
        // check that we have a valid date
        var dateCheck = moment(opts[i]);
        if(dateCheck.year() == 0) {
          errors.push(i + " is not an accepted date format. Please see documentation");
        }
        
        break;

      case "bool":
        if(!_.isUndefined(opts[i])) {
          if(typeof opts[i] != 'boolean') {
            var vals=["true","false"];
            if(vals.indexOf(opts[i])==-1) {
              errors.push(i + " must be either true or false. Please see documentation");            
            } else {
              
            }
            opts[i] = (opts[i]=="true")?true:false;
          }
        }

        break;

      case "string":
        if (!_.isString(opts[i]) && !_.isUndefined(opts[i])) {
          opts[i] = (opts[i] == null)?"":opts[i].toString();
        }
        break;

      case "collection":
        
        // attempt to change non-arrays into arrays via comma separateness 
        if (!_.isArray(opts[i]) && !_.isUndefined(opts[i])) {
          opts[i] = opts[i].replace(/\s?,\s?/ig, ",").split(",");
        }
        
        // clean up array
        var toRemove = [];
        for (j in opts[i]) {
          
          // remove object
          if (typeof opts[i][j] == "object") {
            toRemove.push(j);
          }
          
          // remove nulls
          else if (opts[i][j] == null) {
            opts[i][j] = "";
          }
          
          else if (typeof opts[i][j] == "number" || typeof opts[i][j] == "boolean") {
            opts[i][j] = opts[i][j].toString();
          }
          
        }
        
        // do the remove stuff
        for (r in toRemove) {
          opts[i].splice(toRemove[r], 1);
        }
        
        break;
      case "number collection":
        
        // attempt to change non-arrays into arrays via comma separateness 
        if (!_.isArray(opts[i]) && !_.isUndefined(opts[i])) {
          opts[i] = opts[i].replace(/\s?,\s?/ig, ",").split(",");
        }
        
        // clean up array
        var toRemove = [];
        for (j in opts[i]) {
          
          // remove object
          if (_.isObject(opts[i][j])) {
            toRemove.push(j);
          }
          
          // remove nulls
          else if (opts[i][j] == null) {
            opts[i][j] = "";
          }
          
          // remove non-numbers
          else if (isNaN(opts[i][j])) {
            toRemove.push(j);
          }
          
          // parse as number
          else {
            opts[i][j] = parseInt(opts[i][j]);
          }
        }
        
        // do the remove stuff
        for (r in toRemove) {
          opts[i].splice(toRemove[r], 1);
        }
        
        break;

      case "date collection":
        
        // attempt to change non-arrays into arrays via comma separateness 
        if (!_.isArray(opts[i]) && !_.isUndefined(opts[i])) {
          opts[i] = opts[i].replace(/\s?,\s?/ig, ",").split(",");
        }
        
        // clean up array
        var toRemove = [];
        for (j in opts[i]) {
          
          // remove object
          if (_.isObject(opts[i][j])) {
            toRemove.push(j);
          }
          
          // remove nulls
          else if (opts[i][j] == null) {
            opts[i][j] = "";
          }
          
          // remove non-numbers
          else if (!moment(opts[i][j]).isValid()) {
            toRemove.push(j);
          }
          
          // parse as mysql date
          else {
            opts[i][j] = moment(opts[i][j]).format("YYYY-MM-DD");
          }
        }
        
        // do the remove stuff
        for (r in toRemove) {
          opts[i].splice(toRemove[r], 1);
        }
        
        break;
        
      case "url":
        
        //Format the URL to have http:// at the begining
        if(!_.isUndefined(opts[i]) && opts[i]) {
          opts[i] = opts[i].toLowerCase();
          if(!opts[i].match(/(https?:\/\/)/) && !opts[i].match(/(ftp:\/\/)/)){
            //No http at the begining add it
            opts[i] = removeWhitespaces("http://"+opts[i]);
          }
        }
        break;
        
      case "email":
        //Format the Email to be lower case
        if(!_.isUndefined(opts[i]) && opts[i]) {
          opts[i] = removeWhitespaces(opts[i].toLowerCase());
        }
        break;
        
      default:
    }
    
    // max length error checking for collections
    if (param.type == "number collection") {
      if (_.isNumber(param.max_length) && !_.isUndefined(opts[i])){
        if (opts[i].length > param.max_length) {
         errors.push(i + " exceeds the maximum allowed number of elements ("+param.max_length+")");
        } 
      }
    }
    
    // max length error checking for collections
    if (param.type == "date collection") {
      if (_.isNumber(param.max_length) && !_.isUndefined(opts[i])){
        if (opts[i].length > param.max_length) {
         errors.push(i + " exceeds the maximum allowed number of elements ("+param.max_length+")");
        } 
      }
    }
    
    // max length error checking for collections
    if (param.type == "collection" && _.isNumber(param.max_length) && !_.isUndefined(opts[i])) {
      if (opts[i].length > param.max_length) {
        errors.push(i + " exceeds the maximum allowed number of elements ("+param.max_length+")");
      }
    }
    
    // URL checking
    if (param.type == "url") {
      if(!_.isUndefined(opts[i]) && param.required && (typeof opts[i] != "string" || !isValidWebsite(opts[i]))){
        errors.push(i + " is not a valid url");
      }
    }
        
  }

  return errors;
}

//Validates an URL address structure
var isValidWebsite = function(str){

  // if the structure of the url is ok then curl it to see if it exists
  if(str.length < 2083 && str.match(/^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i)){

    return true;

  }
  else{
    // the url structure is all kinds of wrong
    return false;
  }
}

// is the supplied email address valid?
var isValidEmail = function(email) {  
  var valid = email.match(/^(?:[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+\.)*[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+@(?:(?:(?:[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!\.)){0,61}[a-zA-Z0-9]?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!$)){0,61}[a-zA-Z0-9]?)|(?:\[(?:(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\.){3}(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\]))$/);
  if(!valid) {
    return false;
  } else {
    return true;
  }  
}

var isValidJSON = function(json) {

  var valid=false;
  if (!_.isObject(json)) {
    // Check that we have a valid JSON string
    try {
      var newdata = JSON.parse(json);
      valid = true;
    } catch(e) {
      valid = false;
    }
  }
  return valid; 
}

var removeWhitespaces = function (str) {

    // trim the mo fo
    var processedString = string(str).trim().s;
    
    // remove double spaces
    processedString = processedString.replace(/\s{2,}/g, ' ')

    
    return processedString
}

module.exports = {
  parameters: parameters,
  isValidWebsite: isValidWebsite,
  isValidEmail: isValidEmail,
  isValidJSON: isValidJSON

}