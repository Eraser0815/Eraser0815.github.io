"use strict";
const PWA = {
    isInstalled : ()=>{return window.matchMedia('(display-mode: standalone)').matches}
}
const FILEHandel = {
    url : "file:///C:/Users/MichasDESKTOP/Documents/TagebuchTEST/speicherTEST.txt",
    // url : "../Documents/TagebuchTEST",
    init : async function(){    
        // Erstellen der Handler für Directory und DBTrade. DBTrades wird erstellt falls nicht vorhanden.
        FILEHandel.Directory = await window.showDirectoryPicker({mode: "readwrite", startIn: "documents"});
        FILEHandel.DBTrades = await FILEHandel.Directory.getFileHandle("meinFile.csv",{create:true});
    },
    create : async function(){
        
    },
    read :()=>{
        console.log("file wird gelesen: ",FILEHandel.url);
        const reader = new FileReader();
        reader.onload = (e)=>{
            console.log("reader ready",e.target.result);
        }
    },
    save : async function(){
        let data = {obj1 : "TEST", obj2:35, obj3:102.859}
        const saveHandle = await FILEHandel.DBTrades.createWritable();
        saveHandle.write(JSON.stringify(data));
        saveHandle.close();
        
        console.log("saving data....", JSON.stringify(data));
    }
}; 


!function addListeners(){
    /* 1:  init*/   
    console.log("Funktionsaufruf: 'addListeners'...");
    document.querySelectorAll("#btnwrapper button")[0].addEventListener("click",FILEHandel.init);

    /* 2:  read file*/
    document.getElementById("CDbtn").addEventListener('click', FILEHandel.read);

    /* 3: BeforeUnloadEvent des Browsers. Um alles im File zu speichern */
    window.addEventListener("beforeunload", FILEHandel.save)
    
    /* 4: save to file button  */
    document.getElementById("savebtn").addEventListener("click", FILEHandel.save)

    /* 5: beforeinstallpromt -> Bevor der user die App Installiert! */
    window.addEventListener('beforeinstallprompt', (e) => {
        // Prevent the mini-infobar from appearing on mobile
        e.preventDefault();
        // für später speichern:
        PWA.PWAInstallPromt = e;
        console.log("App instalation preventet : ",e);
        // Install button einfügen.
        document.getElementById("anzeige").insertAdjacentHTML("afterend",`<button class="normalBtn">Install PWA</button>`);
});
    /* 6: Wenn die PWA installiert wurde */
    window.addEventListener('appinstalled', (e) => {
        console.log("PWA installiert!! ", e);
       
    });
}();














window.onload = (e)=>{
    // console.log("Seite vollständig geladen", e);
    // document.getElementById("anzeige").insertAdjacentHTML("afterend",`<button class="normalBtn">Install PWA</button>`);
    // console.log(document.getElementsByClassName("normalBtn")[0]);
}



