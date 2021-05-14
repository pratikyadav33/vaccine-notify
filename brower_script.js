var user_age = 18; //ENTER YOUR AGE HERE

var user_pin = "453331"; //ENTER YOUR PINCODE


console.log("Search Started....... ")

console.log("Script will open the browser if the Found open slots ")



async function details(){

        var list;
        var found = false;
        
        var today = new Date(); 
        var date = today.getDate() +'-'+(today.getMonth()+1)+'-'+today.getFullYear();
        var url = "https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByPin?pincode="+user_pin+"&date="+date;
        // console.log(url)
        var list;
        let x = await fetch(url);
        list = await x.json();
        console.log("Searching........");



        var total_centers = list.centers.length;
        for(var i = 0 ; i<total_centers;i++){
            var total_sessions = list.centers[i].sessions.length;

            for(var j =0; j < total_sessions;j++){

                var capicity = list.centers[i].sessions[j].available_capacity;
                var age = list.centers[i].sessions[j].min_age_limit;
                if(age <= user_age && capicity >0){
                    window.open("https://selfregistration.cowin.gov.in/", "_blank");
                    window.open("https://www.youtube.com/watch?v=vE2ETqUGj6Q&autoplay=1", "myWindow", "width=400,height=400");
                    console.log(list)
                    console.log("FOUND SLOT");                
                    found = true;
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
    await details();
   

  }
  var _run = setInterval(run, 3999);
