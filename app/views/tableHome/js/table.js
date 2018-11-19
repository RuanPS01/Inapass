$('table').on('click', '.parent', function(){   
    $(this).toggleClass('.child').nextUntil('.parent').slideToggle(30);
});

$(document).ready(function() {
  console.log("Ready!");
  listTable();
});

var idGlobal = "";
var siteOrigemGlobal = "";
var nameUserGlobal = "";
var linkSiteGlobal = "";
var senhaUserGlobal = "";
var descricaoGlobal = "";


/* String.prototype.hashCode = function() {
  var hash = 0, i, chr;
  if (this.length === 0) return hash;
  for (i = 0; i < this.length; i++) {
    chr   = this.charCodeAt(i);
    hash  = ((hash << 5) - hash) + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
}; */



function listTable(){
  //debugger;
  var xmlhttp = new XMLHttpRequest();
  var url = "http://localhost:3000/listEntry";
  
  xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var myArr = JSON.parse(xmlhttp.responseText);
      console.log(myArr);
      arrayListing(myArr);
    }
    };
  xmlhttp.open("GET", url, true);
  xmlhttp.send();
}

function arrayListing(arr) {
  //debugger;
  var out = "";
  console.log("Array: "+arr);
  var i;
  for(i = 0; i < arr.length; i++) {
    var id = arr[i].id;
    var siteOrigem = arr[i].key.siteOrigem;
    var nameUser = arr[i].key.nameUser;
    var linkSite = arr[i].key.linkSite;
    var senhaUser = arr[i].key.senhaUser;
    var descricao = arr[i].key.descricao;
    console.log("Site: "+siteOrigem);
    console.log("User: "+nameUser);
    console.log("Link: "+linkSite);
    console.log("Senha: "+senhaUser);//.hashCode());
    console.log("Descrição: "+descricao);

    /////////////NEW ROW///////////////////////////
    var table = document.getElementById("Table");
    var tbody = document.getElementById('tbody');
    var rowCount = table.rows.length;
    var newRow = table.insertRow(rowCount);
    newRow.className = "parent";
  
    var cell0_SiteOrigem = newRow.insertCell(0);
    cell0_SiteOrigem.innerHTML = '<td>'+siteOrigem+'</td>';
    cell0_SiteOrigem.className = 'column1';
    cell0_SiteOrigem.id = 'site'+id;
  
    var cell1_NomeUsuario = newRow.insertCell(1);
    cell1_NomeUsuario.innerHTML = '<td>'+nameUser+'</td>';
    cell1_NomeUsuario.className = 'column2';
    cell1_NomeUsuario.id = 'nameUser'+id;
  
    var cell2_Link = newRow.insertCell(2);
    cell2_Link.innerHTML = '<td>'+linkSite+'</td>';
    //cell2_Link.href = linkSite;
    cell2_Link.className = 'column3';
    cell2_Link.id = 'linkSite'+id;
  
    var cell3_Blank= newRow.insertCell(3);
    cell3_Blank.innerHTML = '<td></td>';
    cell3_Blank.className = 'column4';
    cell3_Blank.id = id;
  
    /////////////ROW CHILD///////////////////////////
    var newRowCHILD = table.insertRow(rowCount+1);
    newRowCHILD.className = "cchild child";
    
    var cell0_CHILD_Text = newRowCHILD.insertCell(0);
    cell0_CHILD_Text.innerHTML = '<td>Senha:</td>';
    cell0_CHILD_Text.className = 'column1';
  
    var cell1_CHILD_Senha = newRowCHILD.insertCell(1);
    cell1_CHILD_Senha.innerHTML = '<td>'+senhaUser+'</td>';
    cell1_CHILD_Senha.className = 'column2';
    cell1_CHILD_Senha.id = 'senhaUser'+id;
  
    var cell2_CHILD_Descr = newRowCHILD.insertCell(2);
    cell2_CHILD_Descr.innerHTML = '<td>Obs: '+descricao+'</td>';
    cell2_CHILD_Descr.className = 'column3';
    cell2_CHILD_Descr.id = 'descricao'+id;
  
    var cell2_CHILD_Button = newRowCHILD.insertCell(3);
    cell2_CHILD_Button.innerHTML = '<td><button>Selecionar</button></td>';
    cell2_CHILD_Button.setAttribute("onclick", "selectRegister('"+id+"')");
    cell2_CHILD_Button.className = 'pillbutton';
  }
}


function openForm() {
  document.getElementById("myForm").style.display = "block";
}

function openFormEdit() {
  if(siteOrigemGlobal !== ""){
    document.getElementById("siteEdit").value = siteOrigemGlobal;
    document.getElementById("linkSiteEdit").value = nameUserGlobal;
    document.getElementById("nameUserEdit").value = linkSiteGlobal;
    document.getElementById("senhaUserEdit").value = senhaUserGlobal;
    document.getElementById("descricaoEdit").value = descricaoGlobal;
    document.getElementById("myFormEdit").style.display = "block";
  }else{
    alert("Selecione um cadastro!");
  }
}

function closeFormEdit() {
  document.getElementById("myFormEdit").style.display = "none";
}

function closeForm() {
  document.getElementById("myForm").style.display = "none";
}

function confirmation() {
  var txt;
  var confirmar = confirm("Excluir cadastro do site "+siteOrigemGlobal+"?");
  if (confirmar == true) {
    xhr = new XMLHttpRequest();
    var url = "http://localhost:3000/deleteEntry?docId=("+idGlobal+")";
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/json");
    var data = JSON.stringify(idGlobal);
    xhr.send(data);
    location.reload();
    alert("Cadastro excluído");
  }else{
    txt = "Process canceled!";
  }
  console.log("Confirmar? -> "+ txt);
}

function updateRegister(){

}

function getNewRegister() {
  var siteOrigem = document.getElementById("site").value;
  var nameUser = document.getElementById("user").value;
  var linkSite = document.getElementById("linkSite").value;
  var senhaUser = document.getElementById("senhaUser").value;
  var descricao = document.getElementById("descricao").value;
  console.log("Site: "+siteOrigem);
  console.log("User: "+nameUser);
  console.log("Link: "+linkSite);
  console.log("Senha: "+senhaUser);//.hashCode());
  console.log("Descrição: "+descricao);

  var payloadPadraoTabela = {
      "siteOrigem": siteOrigem,
      "nameUser": nameUser,
      "senhaUser": senhaUser,
      "descricao": descricao,
      "linkSite": linkSite
    }

  xhr = new XMLHttpRequest();
  var url = "http://localhost:3000/newEntry";
  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-type", "application/json");
  //xhr.onreadystatechange = function () { }
  var data = JSON.stringify(payloadPadraoTabela);
  xhr.send(data);

  location.reload();
};

function selectRegister(id){
  console.log("CADASTRO SELECIONADO:")
  //debugger;
  var siteID = "site"+id;
  idGlobal = id;
  siteOrigemGlobal = document.getElementById(siteID).textContent;
  nameUserGlobal = document.getElementById("nameUser"+id).textContent;
  linkSiteGlobal = document.getElementById("linkSite"+id).textContent;
  senhaUserGlobal = document.getElementById("senhaUser"+id).textContent;
  descricaoGlobal = document.getElementById("descricao"+id).textContent;
  alert("Cadastro do site "+ siteOrigemGlobal +" selecionado para edição ou exclusão!");
  
};
