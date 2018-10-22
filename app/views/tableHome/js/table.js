('table').on('click', 'tr.parent .fa-chevron-down', function(){
  $(this).closest('tbody').toggleClass('open');
});


function openForm() {
  document.getElementById("myForm").style.display = "block";
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
 
function getNewRegister(siteOrigem, nameUser, linkSite, senhaUser, descricao) { /*change*/
  var siteOrigem = document.getElementById("site").textContent;
  var nameUser = document.getElementById("user").textContent;
  var linkSite = document.getElementById("linkSite").textContent;
  var senhaUser = document.getElementById("site").textContent;
  var descricao = document.getElementById("site").textContent;
  
  console.log("Site: "+siteOrigem);
  console.log("User: "+nameUser);
  console.log("Link: "+linkSite);
  console.log("Senha: "+senhaUser);
  console.log("Descrição: "+descricao);
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
};

function selectRegister(){

};
