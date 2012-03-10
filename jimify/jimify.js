/* 
//Jimify 1.1 //
- new in 1.1 includes ignoring required fields that are in hidden areas.

*/

var d1Color;
var d2Color;

$(document).ready(function(){
	initJimify();
});

function initJimify(context) {
	
	if(typeof context == 'undefined') {
		context = 'body';
	}
	
	//$('form.jimify',context).each(function(i,o) {
		
		/*var validate = $(o).find('[jValidate]');
		
		alert(validate.length);
		
		if(validate.length > 0){
			
		}*/
		
		/*if(extendSubmit) {
			submitForm = true;
		}*/
		
		//console.log(isValid);
		//alert(isValid);
		
		/*
		if(isValid) {
			submitForm = true;
		}*/
		
		
		
		/*
		extendJimifyFormValidation = $(this).attr('onSubmit');
		alert(extendJimifyFormValidation);
		
		if(typeof extendJimifyFormValidation != 'undefined' && isValid) {
			isValid = extendJimifyFormValidation();
			alert('made it in');
		}*/
		//alert('jimify: ' + isValid);
		
	//})
	
	
	/*  
	jQuery(function($) {
		var form = $('form'), oldSubmit = form[0].onsubmit;
		form[0].onsubmit = null;
		
		$('form').submit(function() {
			alert("First");
			oldSubmit.call(this); // preserve the context
		});
	});
	*/
	
	$('form.jimify',context).bind('submit',function() {
		return jimifyOnSubmit(this);
	})//[0].onsubmit = null;
	
	///// theme forms /////
	$('form.jimify input[type=text], form.jimify input[type=password], form.jimify select',context)
		.wrap('<span class="theme_input"><span></span></span>')
		.focus(function() {
			var obj = $(this);
			var hasError = obj.attr('jHasError');
			var pos = (hasError ? '-100' : '-50');
			//console.log(obj.parents('.theme_input'));
			jimifySetThemeInputPos(obj, pos);
		}).blur(function() {
			var obj = $(this);
			var hasError = obj.attr('jHasError');
			var pos = (hasError ? '-100' : '0');
			//console.log(obj.parents('.theme_input'));
			jimifySetThemeInputPos(obj, pos);
		});
	
	$('form.jimify input.buttonSmall',context).addClass('inputDirect').wrap('<span class="theme_buttonSM"><span></span></span>');
	
	$('form.jimify input[type=submit], form.jimify input[type=button], form.jimify input[type=reset]',context)
		.not('.buttonSmall')
		.addClass('inputDirect')
		//.val('hi')
		.wrap('<span class="theme_button"><span></span></span>');
	
	///// textarea /////
	$('form.jimify textarea',context)
		.wrap('<span class="theme_textarea"><span class="textareaTop"><span></span></span></span>')
		.closest('.theme_textarea')
		.append('<span class="textareaBottom"><span>&nbsp;</span></span>');
	
	///// default input text /////
	$('input[defaultText]',context).each(function(i,o){
		var o = $(o);
		var dt = o.attr('defaultText');
		d1Color = o.css('color');
		d2Color = '#999';
		o.val(o.attr('defaultText')).css({color:d2Color}).focus(function(){
			var obj = $(this);
			if(obj.val() == dt){
				obj.val('').css({color:d1Color});
			}
		}).blur(function(){
			var obj = $(this);
			if(obj.val() == ''){
				obj.val(dt).css({color:d2Color});
			}
		});
	})
	
	$('input[disabled]',context).each(function(i,o){
		jimifyMakeDisabled($(o));
		//$(o).closest('.theme_button').addClass('disabledBT').click(function(){ return false });
	});
	
	$('form.jimify select',context).css({color:d2Color}).change(function() {
		if($(this).val() != -1){
			this.style.color = d1Color;
		} else {
			this.style.color = d2Color;
		}
	})
	
	$('form.jimify',context).parent().find('.generalSpinner').fadeOut(200,function(){
		$('form.jimify').fadeIn(550);
	})
	
	$('[jRequired=1]',context).each(function(i,o){
		var o = $(o);
		var objLabel = $('label[for=' + o.attr('name') + ']');
		o.attr('jLabel', objLabel.text());
		objLabel.addClass('required').append('&nbsp;<span>*</span>');
	});
}

function jimifySubmit(obj) {
	if (jimifyOnSubmit(obj)) {
		obj.submit();
	}
}
function jimifyOnSubmit(obj) {
	var submitForm = false;
		
	//var extendSubmit = this.onsubmit;
	//console.log(extendSubmit);
	//alert(extendSubmit);
	//if(typeof extendSubmit != 'undefined') {
		//this.onsubmit = null;
		//submitForm = extendSubmit.call(this);
		//alert('1 ' + submitForm);
	//}
	//alert('2 ' + submitForm);
	//return false;
	
	isValid = jimifyFormValidate(obj);
	if(isValid) {
		submitForm = isValid;
	}
	
	if (submitForm) {
		if (obj.getAttribute("jAjaxPost") == "1") {
			var action = obj.getAttribute("action");
			var onSuccess = obj.getAttribute("jOnSuccess");
			$.post(action, $(obj).serialize(), function() {
				eval(onSuccess);
			});	
			return false;
		}
	}
	
	return submitForm;
}

function jimifySetThemeInputPos(obj, pos) {
	obj.parents('.theme_input').css({backgroundPosition:'0px ' + pos + 'px'});
	obj.parents('.theme_input span').css({backgroundPosition:'right ' + pos + 'px'});
}
function jimifyMakeDisabled(obj) {
	if(obj.is('[disabled=true]')) {
		//console.log('disd');
	} else {
		//obj[0].disabled = true;
		obj.attr('disabled','disabled');
	}
	obj.closest('.theme_button').addClass('disabledBT').click(function(){ return false });
}
function jimifyRemoveDisabled(obj) {
	//console.log('enabled');
	obj.removeAttr('disabled');
	//obj[0].disabled = false;
	obj.closest('.theme_button').removeClass('disabledBT');
}
function jimifySetError(obj) {
	obj.attr('jHasError', true);
	jimifySetThemeInputPos(obj, '-100');
}
function jimifyClearErrors(obj) {
	$(obj).find('[jHasError=true]').each(function(i,o){
		var obj = $(o);
		obj.removeAttr('jHasError');
		jimifySetThemeInputPos(obj, '0');
	});
}
function jimifyValidateRequired(obj, doFocus) {
	var result = true;
	$(obj).find('[jRequired=1]:visible').each(function(i,o){
		var obj = $(o);
		if (trim(obj.val()) == '') {
			if (result) {
				if (doFocus) {
					obj.focus();
				}
				result = false;
			}
			jimifySetError(obj);
		}
	});
	return result;
}
function jimifyValidateEmail(obj, doFocus) {
	var result = true;
	var objEmail = $(obj).find('[jValidate=email]');
	var email = '';
		
	objEmail.each(function(i,o){
		var obj = $(o);
		email = trim(obj.val());
		if (email != '') {
			if (!emailTest(email)) {
				result = false;
				if (doFocus) {
					obj.focus();
				};
				jimifySetError(obj);
				return;
			};
		};
	});
	
	return result;
}
function jimifyValidatePassword(obj, doFocus) {
	var result = true;
	var objPassword = $(obj).find('[jValidate=password]');
	var p = '';
	
	objPassword.each(function(i,o){
		var obj = $(o);
		if (p == '') {
			p = trim(obj.val());
		} else if (result) {
			result = (p == trim(obj.val()) && p.length >=6);
		}
	});
	if (!result) {
		objPassword.each(function(i,o){
			var obj = $(o);
			obj.val("");
			if (doFocus) {
				obj.focus();
				doFocus = false;
			}
			jimifySetError(obj);
		});
	}
	return result;
}
function jimifyValidateNumeric(obj, doFocus) {
	var result = true;
	var objNumeric = $(obj).find('[jValidate=numeric]');
	var n = 0;
	
	objNumeric.each(function(i,o){
		var obj = $(o);
		n = trim(obj.val());
		if (n != '') {
			if (!$.isNumeric(n)) {
				if (result) {
					if (doFocus) {
						obj.focus();
					}
					result = false;
				}
				jimifySetError(obj);
			};
		}
	});
	
	return result;
}
function jimifyFormValidate(obj) {
	var errorMsg = '';
	var validateResult = true;
		
	jimifyClearErrors(obj);
	
	var result = jimifyValidateRequired(obj, true);
	if (!result) {
		//errorMsg += '<li>Fields in red are required</li>';
		errorMsg += 'Fields in red are required\n\n';
	}
	validateResult = validateResult && result;
	
	var result = jimifyValidateNumeric(obj, validateResult);
	if (!result) {
		//errorMsg += '<li>Invalid Email Address</li>';
		errorMsg += 'Numeric value required\n\n';
	};
	validateResult = validateResult && result;
	
	var result = jimifyValidateEmail(obj, validateResult);
	if (!result) {
		//errorMsg += '<li>Invalid Email Address</li>';
		errorMsg += 'Invalid Email Address\n\n';
	};
	validateResult = validateResult && result;
	
	result = jimifyValidatePassword(obj, validateResult);
	if (!result) {
		//errorMsg += '<li>Passwords do not match</li>';
		errorMsg += 'Please check the password.\n\n';
	}
	validateResult = validateResult && result;
	
	if (!validateResult) {
		//$(obj).find('.errorMsg').css('display','block').html('<ul>' + errorMsg  + '</ul>');
		alert(errorMsg);
	} 
	
	return validateResult;
}
function emailTest(value) {
	var re = new RegExp("^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?");
	
	return re.test(value);
}
function trim(stringToTrim) {
	return stringToTrim.replace(/^\s+|\s+$/g,"");
}
function ltrim(stringToTrim) {
	return stringToTrim.replace(/^\s+/,"");
}
function rtrim(stringToTrim) {
	return stringToTrim.replace(/\s+$/,"");
}
