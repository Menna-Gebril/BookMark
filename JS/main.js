var siteName = document.getElementById("siteName");
var siteUrl = document.getElementById("siteUrl");
var allSites = [];

if(localStorage.getItem("site" ) !==null){
    allSites = JSON.parse(localStorage.getItem("site"))
    displayData()

}

function addWebsite(){
    if(allValidation(siteName, 'msgName') && allValidation(siteUrl, 'msgUrl') ){
        var website = {
            name: siteName.value,
            url: siteUrl.value,
        };
    
        allSites.push(website);
        localStorage.setItem("site" , JSON.stringify(allSites))
        displayData();
        clearForm();
        console.log(allSites)
    }else{
        alert("error")
    }



   
}

function clearForm(){
    siteName.value ="";
    siteUrl.value ="";
    siteName.classList.remove('is-valid');
    siteUrl.classList.remove('is-valid');

}

function displayData(){
    var cartona ="";
    for(var i = 0; i < allSites.length; i++){
        cartona += `
        <tr>
            <td>${i}</td>
            <td>${allSites[i].name}</td>
            <td><button onclick="visitSite()"   class="btn btn-outline-success btn-sm">Visit</button></td>
            <td><button onclick="deletSite()"  class="btn btn-outline-danger btn-sm">Delete</button></td>
        </tr>`
        ;
    }
    document.getElementById("tableData").innerHTML = cartona;
}

function deletSite(index){
    console.log(index);
    allSites.splice(index, 1);
    displayData();
    localStorage.setItem("site" , JSON.stringify(allSites))
}


 function visitSite(index){
     window.open(allSites[index].url, "_blank")
    
}


function allValidation(element , msgID) {

    var msg = document.getElementById(msgID);
    var regex = {
        siteName: /^[A-Z][a-z]{3,8}$/,
        siteUrl: /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/,
    };

    if(regex[element.id].test(element.value ) == true){
        element.classlist.add('is valid');
        element.classlist.remove('is invalid');
        msg.classList.add('d-none');

        return true;
    }
    else{
        element.classList.add('is invalid');
        element.classList.remove('is-valid');
        element.classList.remove('d-none');
        return false;
    }
    
    
}