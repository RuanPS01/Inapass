//Utilidades para teste básico
module.exports = {
  generateString: function () {
    var charPossivel = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnoçâãõÚúóéáñpqrstuvwxyz0123456789";
    var result = "";

    //pega 5 caracteres aleatórios
    for (var i = 0; i < 5; i++)
      result += charPossivel.charAt(Math.floor(Math.random() * charPossivel.length));

    return result;
  },

  generateDateString: function() {
    var dia = Math.floor(Math.random() * 31);
    var mes = Math.floor(Math.random() * 12);
    var ano = Math.floor(Math.random() * 300)+1900
    var result = dia+'/'+mes+'/'+ano;
    return result;
  }
};
