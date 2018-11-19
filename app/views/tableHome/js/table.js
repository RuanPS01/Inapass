$('table').on('click', '.parent', function(){   
    $(this).toggleClass('.child').nextUntil('.parent').slideToggle(30);
});

$(document).ready(function() {
  console.log("Ready!");
  //listTable();
});
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
  var out = "";
  console.log("Array: "+arr);
  var i;
  for(i = 0; i < arr.length; i++) {
    var siteOrigem = arr[i].siteOrigem;
    var nameUser = arr[i].nameUser;
    var linkSite = arr[i].linkSite;
    var senhaUser = arr[i].senhaUser;
    var descricao = arr[i].descricao;

    var table = document.getElementById("Table");

    var rowCount = table.rows.length;
    var newRow = table.insertRow(rowCount);
    newRow.className = "parent";
  
    var cell0_SiteOrigem = newRow.insertCell(0);
    cell0_SiteOrigem.innerHTML = '<td>'+siteOrigem+'</td>';
    cell0_SiteOrigem.className = 'column1';
  
    var cell1_NomeUsuario = newRow.insertCell(1);
    cell1_NomeUsuario.innerHTML = '<td>'+nameUser+'</td>';
    cell1_NomeUsuario.className = 'column2';
  
    var cell2_Link = newRow.insertCell(2);
    cell2_Link.innerHTML = '<td>'+linkSite+'</td>';
    //cell2_Link.href = linkSite;
    cell2_Link.className = 'column3';
  
    var cell3_Blank= newRow.insertCell(3);
    cell3_Blank.innerHTML = '<td></td>';
    cell3_Blank.className = 'column4';
  
    /////////////ROW CHILD///////////////////////////
    var newRowCHILD = table.insertRow(rowCount+1);
    newRowCHILD.className = "cchild child";
    
    var cell0_CHILD_Text = newRowCHILD.insertCell(0);
    cell0_CHILD_Text.innerHTML = '<td>Senha:</td>';
    cell0_CHILD_Text.className = 'column1';
  
    var cell1_CHILD_Senha = newRowCHILD.insertCell(1);
    cell1_CHILD_Senha.innerHTML = '<td>'+senhaUser+'</td>';
    cell1_CHILD_Senha.className = 'column2';
  
    var cell2_CHILD_Descr = newRowCHILD.insertCell(2);
    cell2_CHILD_Descr.innerHTML = '<td>Obs: '+descricao+'</td>';
    cell2_CHILD_Descr.className = 'column3';
  
    var cell2_CHILD_Button = newRowCHILD.insertCell(3);
    cell2_CHILD_Button.innerHTML = '<td><button>Selecionar</button></td>';
    cell2_CHILD_Button.setAttribute("onclick", "selectRegister()");
    cell2_CHILD_Button.className = 'pillbutton';
  }
}


function openForm() {
  document.getElementById("myForm").style.display = "block";
}

function openFormEdit() {
  if(true){
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
  var confirmar = confirm("Excluir cadastro?");
  if (confirmar == true) {
    txt = "You pressed OK!";
  }else{
    txt = "You pressed Cancel!";
  }
  console.log("Confirmar? -> "+ txt);
}
 
function getNewRegister() { /*change*/
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


  ///////////NEW ROW///////////////////
  var table = document.getElementById("Table");

  var rowCount = table.rows.length;
  var newRow = table.insertRow(rowCount);
  newRow.className = "parent";

  var cell0_SiteOrigem = newRow.insertCell(0);
  cell0_SiteOrigem.innerHTML = '<td>'+siteOrigem+'</td>';
  cell0_SiteOrigem.className = 'column1';

  var cell1_NomeUsuario = newRow.insertCell(1);
  cell1_NomeUsuario.innerHTML = '<td>'+nameUser+'</td>';
  cell1_NomeUsuario.className = 'column2';

  var cell2_Link = newRow.insertCell(2);
  cell2_Link.innerHTML = '<td>'+linkSite+'</td>';
  //cell2_Link.href = linkSite;
  cell2_Link.className = 'column3';

  var cell3_Blank= newRow.insertCell(3);
  cell3_Blank.innerHTML = '<td></td>';
  cell3_Blank.className = 'column4';

  /////////////ROW CHILD///////////////////////////
  var newRowCHILD = table.insertRow(rowCount+1);
  newRowCHILD.className = "cchild child";
  
  var cell0_CHILD_Text = newRowCHILD.insertCell(0);
  cell0_CHILD_Text.innerHTML = '<td>Senha:</td>';
  cell0_CHILD_Text.className = 'column1';

  var cell1_CHILD_Senha = newRowCHILD.insertCell(1);
  cell1_CHILD_Senha.innerHTML = '<td>'+senhaUser+'</td>';
  cell1_CHILD_Senha.className = 'column2';

  var cell2_CHILD_Descr = newRowCHILD.insertCell(2);
  cell2_CHILD_Descr.innerHTML = '<td>Obs: '+descricao+'</td>';
  cell2_CHILD_Descr.className = 'column3';

  var cell2_CHILD_Button = newRowCHILD.insertCell(3);
  cell2_CHILD_Button.innerHTML = '<td><button>Selecionar</button></td>';
  cell2_CHILD_Button.setAttribute("onclick", "selectRegister()");
  cell2_CHILD_Button.className = 'pillbutton';

  var $contentExample =  
  "<tr class='parent'>"+
    "<td class='column1'>"+siteOrigem+"</td>"+
    "<td class='column2'>"+nameUser+"</td>"+
    "<td href='"+linkSite+"' class='column3'>"+linkSite+"</td>"+
  "</tr>"+
  "<tr class='cchild'>"+
    "<td class='column1'>Senha:</td>"+
    "<td class='column2'>"+senhaUser+"</td>"+
    "<td class='column3'>Obs: "+descricao+"</td>"+
    "<td><button class='pillbutton' onclick='selectRegister()'>Selecionar</button></td>"+
  "</tr>";
};

function selectRegister(){
  console.log("SELECIONAR CADASTRO")
};
