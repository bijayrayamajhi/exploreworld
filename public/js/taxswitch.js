
let taxSwitch = document.getElementById("flexSwitchCheckDefault");
taxSwitch.addEventListener("click", () => {
    let taxToogle = document.getElementsByClassName("taxtoogle");

   for(toogle of taxToogle){

    if(toogle.style.display != "inline"){
        toogle.style.display = "inline" ;
    }else {
        toogle.style.display = "none" ;
 
    }
   };
});