
var user_age = 23; //ENTER YOUR AGE HERE

var user_pin = "453331"; //ENTER YOUR PINCODE

var mobile ="1234567899"; //ENTER YOUR PHONE NUMBER


console.log("Search Started....... ")

console.log("Script will open the browser if the Found open slots ")

const fetch = require("node-fetch");
const open = require('open');
var _open = false;
mobile = Number(mobile);


async function details(){

        var list;
        var found = false;
        
        var today = new Date(); 
        var date = today.getDate() +'-'+(today.getMonth()+1)+'-'+today.getFullYear();
        var url = "https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByPin?pincode="+user_pin+"&date="+date;
        // console.log(url)
        var list;
       list  = await fetch(url,{         
            method: "GET",           
            headers: {"Content-type": "application/json",
            "accept-encoding":" gzip",
            "accept-language": "en_US",
            "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36"
            
        }

        });
        list = await list.json();
        //console.log(list);
           console.log("Searching slots for pincode =="+user_pin+" And Age == "+user_age);



        var total_centers = list.centers.length;
        for(var i = 0 ; i<total_centers;i++){
            var total_sessions = list.centers[i].sessions.length;

            for(var j =0; j < total_sessions;j++){

                var capicity = list.centers[i].sessions[j].available_capacity;
                var age = list.centers[i].sessions[j].min_age_limit;
                if(age <= user_age && capicity >0){
                    console.log(list);
                    console.log("Found Open Slots");
                    _open = true;
                    clearInterval(_run);              
                    break;
                }
               
            }
            if(found){
                break;
            }
        }

}
let run = async ()=>{
    await details().catch(e => { console.log(e) });
    if(_open){
        open("https://selfregistration.cowin.gov.in/");
        open("https://www.youtube.com/watch?v=vE2ETqUGj6Q&autoplay=1", "myWindow", "width=400,height=400");
        
    }
  }
var _run = setInterval(run, 4000);
