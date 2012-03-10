// JavaScript Document

var d1Color;
var d2Color;
$(document).ready(function(){
	$('form.jimify').submit(function() {
		return true;
		return jimifyFormValidate(this);
	});
	///// theme forms /////
	$('form.jimify input[type=text], form.jimify input[type=password], form.jimify select').focus(function() {
		var obj = $(this);
		//console.log(obj.parents('.theme_input'));
		obj.parents('.theme_input').css({backgroundPosition:'0px -50px'});
		obj.parents('.theme_input span').css({backgroundPosition:'right -50px'});
	}).blur(function() {
		var obj = $(this);
		//console.log(obj.parents('.theme_input'));
		obj.parents('.theme_input').css({backgroundPosition:'0px 0px'});
		obj.parents('.theme_input span').css({backgroundPosition:'right 0px'});
	}).wrap('<span class="theme_input"><span></span></span>');
	
	$('form.jimify input[type=submit], form.jimify input[type=button]').wrap('<span class="theme_button"><span></span></span>');
	//$('form.jimify textarea').wrap('<span class="theme_textarea"><span></span></span>');
	
	///// default input text /////
	$('input[defaultText]').each(function(i,o){
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
	
	$('input[disabled]').each(function(i,o){
		jimifyMakeDisabled($(o));
		//$(o).closest('.theme_button').addClass('disabledBT').click(function(){ return false });
	});
	
	$('form.jimify select').css({color:d2Color}).change(function() {
		if($(this).val() != -1){
			this.style.color = d1Color;
		} else {
			this.style.color = d2Color;
		}
	})
	
	$('form.jimify').parent().find('.generalSpinner').fadeOut(200,function(){
		$('form.jimify').fadeIn(550);
	})
	
<<<<<<< .mine
	$('[jRequired]').each(function(i,o){
		var objLabel = $('label[for=' + $(o).attr('name') + ']');
		$(o).attr('jLabel',objLabel.text());
		objLabel.addClass('required').append('&nbsp;<span>*</span>');
=======
	$('[jRequired=1]').each(function(i,o){
		var o = $(o);
		var objLabel = $('label[for=' + o.attr('name') + ']');
		o.attr('jLabel', objLabel.text());
		objLabel.addClass('required').append('&nbsp;<span>*</span>');
>>>>>>> .r66
	});
});

function jimifyMakeDisabled(obj) {
	if(obj.is('[disabled]')) {
		//console.log('disd');
	} else {
		obj.attr('disabled','disabled');
	}
	obj.closest('.theme_button').addClass('disabledBT').click(function(){ return false });
}
function jimifyRemoveDisabled(obj) {
	//console.log('remove');
	obj.removeAttr('disabled');
	obj.closest('.theme_button').removeClass('disabledBT');
}
function jimifyClearErrors(obj) {
	$(obj).find('.errorInput').each(function(i,o){
		$(o).removeClass("errorInput");
	});
}
function jimifyValidateRequired(obj, doFocus) {
	var result = true;
	
	$(obj).find('[jRequired=1]').each(function(i,o){
		var obj = $(o);
		if (trim(obj.val()) == '') {
			if (result) {
				if (doFocus) {
					obj.focus();
				}
				result = false;
			}
			obj.parents('.theme_input').addClass("errorInput");
			obj.parents('.theme_input span').addClass("errorInput");
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
				obj.parents('.theme_input').addClass("errorInput");
				obj.parents('.theme_input span').addClass("errorInput");
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
			result = (p == trim(obj.val()));
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
			obj.parents('.theme_input').addClass("errorInput");
			obj.parents('.theme_input span').addClass("errorInput");
		});
	}
	return result;
}

function jimifyFormValidate(obj) {
	var errorMsg = '';
	var validateResult = true;
		
	jimifyClearErrors(obj);
	
	var result = jimifyValidateRequired(obj, true);
	if (!result) {
		errorMsg += '<li>Fields in red are required</li>';
	}
	validateResult = validateResult && result;
	
	var result = jimifyValidateEmail(obj, validateResult);
	if (!result) {
		errorMsg += '<li>Invalid Email Address</li>';
	};
	validateResult = validateResult && result;
	
	result = jimifyValidatePassword(obj, validateResult);
	if (!result) {
		errorMsg += '<li>Passwords do not match</li>';
	}
	validateResult = validateResult && result;
	
	if (!validateResult) {
		$(obj).find('.errorMsg').css('display','block').html('<ul>' + errorMsg  + '</ul>');
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
