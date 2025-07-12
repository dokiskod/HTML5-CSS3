function confirmarEnvio(){
  if (confirm("Você deseja realmente enviar esta mensagem?")){
    alert("Mensagem enviada com sucesso!");
    return true;
  } else {
    alert("Mensagem não enviada.");
    return false;
  }
}

function chamarfuncao(){
  document.getElementById("texto-dinamico").innerHTML = "texto alterado dinamicamente!";
}