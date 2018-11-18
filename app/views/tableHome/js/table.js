$('table').on('click', '.parent', function(){   
    $(this).toggleClass('.child').nextUntil('.parent').slideToggle(30);
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


  var $content =  
  "<tr class='parent'>"+
    "<td class='column1'>"+siteOrigem+"</td>"+
    "<td class='column2'>"+nameUser+"</td>"+
    "<td href='"+linkSite+"' class='column3'>"+linkSite+"</td>"+
    "<td onclick='expand()'><i class='fa fa-chevron-down'></i></td>"+
  "</tr>"+
  "<tr class='cchild'>"+
    "<td class='column1'>Senha:</td>"+
    "<td class='column2'>"+senhaUser+"</td>"+
    "<td class='column3'>Obs: "+descricao+"</td>"+
    "<td></td>"+
  "</tr>";

  //document.getElementById("Table").inserRow($content);
};

function selectRegister(){

};
