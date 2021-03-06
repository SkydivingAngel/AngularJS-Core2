# AngularJS - Core 2 (No Razor Pages) - Url Rewrite Example

Simple Project to Demonstrate Url Rewriting for AngularJS on Asp Net Core 2

Take a look at:
<br> **ViewsRedirectRule.cs**
<br> **startup.cs**
<br> **app.js**
<br> and change accordingly to the publish folder.

This project was published on IIS in a folder called "angularcore",
and shows how to use url rewriting with AngularJS on refreshing pages.
<br> **Login** is hard coded:
<br> **username: a**
<br> **password: b**

IIS needs:
<br> DotNetCore.2.0.3-WindowsHosting per IIS e Kestrel.exe
<br> and this patch for Windows 7, Server 2008 etc etc: Windows6.1-KB2533623-x64.msu


1.
In order to test on your pc change **File hosts** in "C:\Windows\System32\drivers\etc"
<br>192.168.X.X www.netcoreangularjs.com

2.
Change in **"base href"** in **"Index.html"** according to your publish folder
<br> Mine is: href="/angularcore/"<br>

Change in **appsettings.json** according to your web site address (needed for page refresh):
"WebSiteAddress": {
"DEFAULT": "www.netcoreangularjs.com"
}
  
3.
Change in **"ViewsRedirectRule.cs"** according to your publish folder:
**SiteAddress is what you wrote in appjson.config**

	if (matchPaths.Contains(request.Path.Value))
	{
		**string newLocation = "http://" + SiteAddress + "/angularcore/#" + request.Path;**

		var response = context.HttpContext.Response;
		response.StatusCode = StatusCodes.Status302Found;
		context.Result = RuleResult.EndResponse;
		response.Headers[HeaderNames.Location] = newLocation;
	}

4)ì.
Change in **"startup.cs"** for url rewriting (add route, change name etc etc):
**newPath: "/"** is not used but is required.

	var options = new RewriteOptions()
		.Add(new ViewsRedirectRule(
			**matchPaths: new[] { "/login", "/home", "/prodotti" }**,
			newPath: "/"));
		
5.
Change in **"app.js"** according to your publish folder:
Change in **templateUrl** according to your publish folder:

    var configFunction = function ($routeProvider, $httpProvider, $locationProvider)
	{
		$routeProvider.caseInsensitiveMatch = true;

		$routeProvider
			.when('/',
			{
				redirectTo: '/home'
			})
			.when('/login',
				{
					templateUrl: '/angularcore/views/login.html',
					controller: 'LoginViewCtrl'
				})
			.when('/home',
			{
				templateUrl: '/angularcore/views/home.html',
				controller: 'HomeViewCtrl'
			})
			.when('/products',
			{
				templateUrl: '/angularcore/views/products.html',
				controller: 'ProductsCtrl'
			})
			.otherwise({
				redirectTo: '/home'
			});

		$locationProvider.html5Mode(true);
		$locationProvider.hashPrefix('');
	}