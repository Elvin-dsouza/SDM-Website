

var sites = []; // array to store a list of all pages that the user can navigate to
var urls = [];// array to store a list of all urls of pages that the user can navigate to
var flag = false;

var $logo = $("body > header img");
var $header = $("body > header");
var $navigation = $("body > header > nav");
var $heading = $("body > header section");

$("body > header nav").hide();
$(".home-icon-button").css('display','flex');
$(".home-icon-button").hide();

var names=[];// array to store the names of all sites the user can navigate to
var ref=[];

/*
The Following lines must be configured before transferrring a site to another location subdomain or folder
	1) If the site has a base folder alter the base variable, else it can be left as its default (/) root
	2)The website option must be altered when the domain name changes to make sure pages navigate consistantly

*/
var base = "/";
var website = "http://sdm.ac.in"


//flag to make sure the title doesnt display if a user navigated to a page before the animation at the start completes
var sdmTitleDisabled = false;



$(document).ready(function(){
		//getting the dimensions of the header
		var height = $header.height();
		var width = $header.width();
		height = (height/2)-125;
		width = (width/2)-125;

		// centering the logo's position relative to the hader
		$logo.css({'top':height, 'left':width});

		// starting the enlarge animation/transition
    	$logo.toggleClass('enlarge');
		$("main").hide();
		$("footer").hide();
		$(".spinner").show();
		/*
		Animation to move the logo to the top left corner after page load(?)
		*/
		// setTimeout(function(){
		// 	  $logo.animate({top:"2",left:"7",height:"80px", width: "80px"},300);
		// 		$navigation.fadeIn(200);
		// 		$header.animate({height:"85vh"},200);
		// 		setTimeout(function(){
		// 			if(!sdmTitleDisabled)
		// 				$heading.fadeIn(200);
		// 		},1000);
		// },1000);
		flag = true;// flag sets that the page has loaded in it is now safe to start other actions


		/*
			Populate the lists of site navigation references and arrays effective navigation
		*/
		var iter=0;
		$navigation.children('div').each(function(){
			var id = $(this).attr('id');
			iter++;
			sites[iter]=id+".html";
			names[iter]=id;
			ref[iter]="#"+id;
		});

		checkCookies();// check if the coookie is set that indicates that a refresh has occoured and a user was on a site on this website


});

function finishLoading()
{
	setTimeout(function(){
				$(".spinner").hide();
				var w = $(document).width;

					$logo.animate({top:"2",left:"7",height:"80px", width: "80px"},300);
					$(".loadcover").fadeOut();
			$navigation.fadeIn(200);


				$header.animate({height:"90vh"},200);
	
			setTimeout(function(){
				if(!sdmTitleDisabled)
					$heading.fadeIn(200);
					$("main").fadeIn();
					$("footer").fadeIn();

			},1000);
	},1000);
}



$(".material-button").click(function(e){
			 var parentOffset = $(this).offset();//get the offset of the parent of the material layer from the window
			 var $layer = $('<div/>');//define a new div
			 $layer.addClass("material-layer");// add the material-layer class to the div
			 var relX = e.pageX - parentOffset.left;//page click x - offset of the button(x)
			 var relY = e.pageY - parentOffset.top;//page click y - offset of the button(y)
			 $layer.css({
				 "left":relX,
				 "top":relY,
			 });//assign the respective offset x y coords for the element
			 $layer.appendTo($(this));//append the created div to the button
			 $layer.show();//show the element
			 $layer.addClass("animate");//animate the element
			 setTimeout(function(){
			 $layer.remove();//remove after 2 seconds
			 },2000);
});

// Active nav item display
$("header > nav > div").click(function(e){
			$("header > nav > div").removeClass("active");
			$(this).addClass("active");
});

$(".secnav > div").click(function(e){
			$(".secnav > div").removeClass("active");
			$(this).addClass("active");
});

//take back all the ripples
$(".home-button").click(function(e){
			 $(".ripple-layer").addClass("deanimate-ripple");
			 sdmTitleDisabled = false;
});


// ----------------------------------------------------------------------------------------------------------------------------
// Ripple color Definitions
// ----------------------------------------------------------------------------------------------------------------------------
var color_blue="#2196F3";
var color_green="#009688";
var color_indigo="#3F51B5";
var color_red = "#C62828";
var color_red = "#C62828";
var color_black = "#263238";
var color_orange = "#9C27B0";
//-----------------------------------------------------------------------------------------------------------------------------

$(".ripple-enabled").click(function(e){
	 $('.ripple-layer').fadeOut();
			 var parentOffset = $(this).offset();//get the offset of the parent of the material layer from the window
			 var $layer = $('<div/>');//define a new div

			 if($(this).hasClass("blue"))
			 {
				 $layer.css("background",color_blue);
			 }
			 if($(this).hasClass("green"))
				{
						 $layer.css("background",color_green);
				}
				if($(this).hasClass("indigo"))
 				{
 						 $layer.css("background",color_indigo);
 				}
				if($(this).hasClass("red"))
				{
					 $layer.css("background",color_red);
				}
				if($(this).hasClass("black"))
				{
					 $layer.css("background",color_black);
				}
				if($(this).hasClass("orange"))
				{
					 $layer.css("background",color_orange);
				}


			$layer.css("opacity","0.7");
			 $layer.addClass("ripple-layer");// add the material-layer class to the div
			 var relX = e.pageX - 100;//page click x - offset of the button(x)
			 var relY = e.pageY - 100;//page click y - offset of the button(y)
			 $layer.css({
				 "left":relX,
				 "top":relY,
			 });//assign the respective offset x y coords for the element
			 $layer.appendTo($header);//append the created div to the button
			 $layer.show();//show the element
			 $layer.addClass("animate-ripple");//animate the element

			 //setTimeout(function(){
			 //$layer.remove();//remove after 2 seconds
			 //},2000);
});
var stateObj = { Moved: "forward" };

$("#home").click(function(e){
		$("main").empty();
		$("#heading").hide();
			$.get("home.html",function(data,success){
				console.log("test");
					if(success)
					{
						$("main").html(data);
						$("#logo").fadeIn(300);
						$("#hd").show();
						$(".home-icon-button").fadeOut(300);
						if(flag)
						{
							history.pushState(stateObj,"home",website+base);
							flag=true;
						}
						flag=true;

					}
			});
});


function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length,c.length);
        }
    }
    return "";
}

function deleteCookie(name)
{
	document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

//---------------------------------------------------------------------------------------------------------------------------------------------
/* page 1: Admission */
//---------------------------------------------------------------------------------------------------------------------------------------------

$(".navitem").click(function (e) {
	sdmTitleDisabled = true;
	var id = $(this).attr('id');
	var url = "pages/"+id+".html";
	var redirectUrl = id+".html";
		$("#hd").hide();
	$.get(url,function(data,success){
			if(success)
			{
				$("main").html(data);

				$("#logo").fadeOut(300);

				$(".home-icon-button").fadeIn(300);
				if(flag)
				{

					history.pushState(stateObj,id,redirectUrl);
					flag=true;
				}
				flag=true;
				$(".card-container").addClass("cardMove");
			}
	});
});

function checkCookies()
{
	for (var i = 1; i <= names.length; i++) {
		if (getCookie("page") == names[i] ) {
			console.log("cookie found");
			gotoSite(sites[i]);
			$(ref[i]).click();
			deleteCookie("page");
			sdmTitleDisabled = true;
			console.log("cookie deleted");
		}
		console.log("cookie not found");
	}
}

window.onpopstate = function(event) {
	flag = false;
	for (var i = 1; i <= sites.length; i++) {
		if (base+sites[i] == window.location.pathname ) {
			gotoSite(sites[i]);
			$(ref[i]).click();

		}

	}

};


function gotoSite(site)
{
	console.log("navigating to site "+site);
	$.get("pages/"+site,function(data,success){

			if(success)
			{
				$("main").html(data);
				//$("#heading").fadeIn(300);
				//$("#heading").html("Admission");
				$("#logo").fadeOut(300);
				$("#hd").fadeOut();
				$(".home-icon-button").fadeIn(300);


			}
	});
}



function footerNavigate(id)
{
	gotoSite(sites[id]);
	$(ref[id]).click();
}
