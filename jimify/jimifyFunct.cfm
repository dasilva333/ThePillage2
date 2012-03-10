<cfparam name="variables.RequiredFields" default="">
<cfparam name="variables.ValidateEmail" default="">
<cfparam name="variables.ValidatePassword" default="">
<cfparam name="variables.ValidateNumeric" default="">

<cfset jimifyFunctDefined = true>

<cffunction name="checkRequired" access="private" output="no" returntype="numeric">
	<cfargument name="fieldName" type="string" required="yes">
	<cfset var result = 0>
	
	<cfif ListFindNoCase(variables.RequiredFields, arguments.fieldName) GT 0>
		<cfset result = 1>
	</cfif>
	
	<cfreturn result>
</cffunction>

<cffunction name="checkValidate" access="private" output="no" returntype="string">
	<cfargument name="fieldName" type="string" required="yes">	
	
	<cfset var result = "">
	
	<cfif ListFindNoCase(variables.ValidateEmail, arguments.fieldName) GT 0>
		<cfset result = "email">
	<cfelseif ListFindNoCase(variables.ValidatePassword, arguments.fieldName) GT 0>
		<cfset result = "password">
	<cfelseif ListFindNoCase(variables.ValidateNumeric, arguments.fieldName) GT 0>
		<cfset result = "numeric">
	</cfif>

	<cfreturn result>
</cffunction>

<cffunction name="ValidateRequired" access="private" output="no" returntype="string">
	<cfset var result = "">
	
	<cfloop list="#variables.RequiredFields#" index="field">
		<cfif TRIM(FORM[field]) EQ "">
			<cfset result = ListAppend(result, field)>
		</cfif>
	</cfloop>
	
	<cfreturn result>
</cffunction>

