
(function() {
    "use strict";
    
    //clock

    document.addEventListener("DOMContentLoaded", function() {
        
        let c = document.getElementById("clock");
       
        //setTimeout(updateClock, 2000);
        setInterval(updateClock, 1000);
        
        function updateClock() {
            
            let date = new Date();
            let millis = date.getTime() - 1000;
            date.setTime(millis);
            let h = date.getHours()%12;
            let m = date.getMinutes();
            let s = date.getSeconds();

            if (h < 10) {
                h = "0" + h;
            }

            if (m < 10) {
                m = "0" + m;
            }

            if (s < 10) {
                s = "0" + s;
            }

            c.innerHTML = h + ":" + m + ":" + s;
            
        };
        
    });
    
    // forms
    
    document.getElementById("form").addEventListener("submit", estimateDelivery);
    
    let e = document.getElementById("delivery");
    e.innerHTML = "0,00 &euro;";
    
    function estimateDelivery(event) {
        event.preventDefault();
        if(document.getElementById("fname").value =="") {
			alert("First name is empty!");
			return;
		}
		else if ( /[0-9]/.test(document.getElementById("fname").value) ) {
			alert("First name contains digit!");
			return;
		}
		else if(document.getElementById("lname").value =="") {
			alert("Second name is empty!");
			return;
		} else if ( /[0-9]/.test(document.getElementById("lname").value) ) {
			alert("Second name contains digit!");
			return;
		}; 

		
        let linn = document.getElementById("linn");
        
        if (linn.value === "") {
            
            alert("Palun valige linn nimekirjast");
            
            linn.focus();
            
            return;
            
            
        } else {
		e.innerHTML = "x,xx &euro;";
        let price = 0;
		            
		if(document.getElementById("v1").checked)
			price += 5;            
		if(document.getElementById("v2").checked)
			price += 1; 
   		if(document.getElementById("rb1").checked)
			price += 1;  
		else
			price += 0.5;			
               
		if(linn.value=="prn")
			price += 3;
		if(linn.value=="nrv")
			price += 2.5;
		if(linn.value=="trt")
			price += 2.5;
		e.innerHTML =  price +" EUR";
		}
		
        console.log("Tarne hind on arvutatud");
    }
    
})();

// map

let mapAPIKey = "AqLLRE37SJGqIxXEYxezPUa6fF2oCzl3cvG4n05FtFIVBrotBYxchpMYYpwuxBak";

var map, ibox;

function GetMap() {
    
    "use strict";
	let latTU = 58.38104;
	let longTU = 26.71992;
	let latLM = 58.287957; 
	let longLM = 26.764772;
    let centerPoint = new Microsoft.Maps.Location(
            (latTU-latLM)/2 + latLM, 
            (longTU-longLM)/2 + longLM
        );
	let point1 =  new Microsoft.Maps.Location(
            latTU, 
            longTU
        );
	let point2 = new Microsoft.Maps.Location(
			latLM,
			longLM
        );
    map = new Microsoft.Maps.Map("#map", {
        credentials: mapAPIKey,
        center: centerPoint,
        zoom: 10,
        mapTypeId: Microsoft.Maps.MapTypeId.road,
        disablePanning: true
    });
    ibox = new Microsoft.Maps.Infobox(point2, {
        title: 'Infobox',
        description: 'ibox',
		visible: false
    });
	ibox.setMap(map);
    
    let pushpin1 = new Microsoft.Maps.Pushpin(point1, {
            title: 'Tartu Ülikool',
            //subTitle: 'Hea koht',
            //text: 'UT'
        });
        
    pushpin1.metadata = {
        title: 'University of Tartu',
        description: 'We do study here!'
    };
    map.entities.push(pushpin1);
    let pushpin2 = new Microsoft.Maps.Pushpin(point2, {
            title: 'Lennundusmuuseum',
            //subTitle: 'lennukid',
            text: 'LM'
		});
    pushpin2.metadata = {
        title: 'Lennundusmuuseum',
        description: 'Siin on palju vaadata!'
    };
    map.entities.push(pushpin2);
    Microsoft.Maps.Events.addHandler(pushpin1, 'click', pushpinClicked);
    Microsoft.Maps.Events.addHandler(pushpin2, 'click', pushpinClicked);
}

function pushpinClicked(e) {
    if (e.target.metadata) {
            ibox.setOptions({
                location: e.target.getLocation(),
                title: e.target.metadata.title,
                description: e.target.metadata.description,
                visible: true
            });
    }
}
// https://dev.virtualearth.net/REST/v1/Locations?q=1000 Vin Scully Ave, Los Angeles,CA&key=YOUR_KEY_HERE

