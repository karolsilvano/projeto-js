const tabelaAlunos = document.getElementById('tabelaAlunos');
const tabelaAbaixoMedia = document.getElementById('tabelaAbaixoMedia');
const tabelaMediaGeral = document.getElementById('tabelaMediaGeral');
const alunos = []; 

function calcularMediaTurma() {
  if (alunos.length === 0) {
    return 0;
  }
  const totalMedia = alunos.reduce((sum, aluno) => sum + aluno.media, 0);
  return totalMedia / alunos.length;
}


function atualizarMedias() {
  const mediaTurma = calcularMediaTurma();
  tabelaMediaGeral.innerHTML = `
    <tr>
      <th>Média Geral da Sala</th>
    </tr>
    <tr>
      <td>${mediaTurma.toFixed(2)}</td>
    </tr>
  `; 

  tabelaAbaixoMedia.innerHTML = `
    <tr>
      <th>Nome</th>
      <th>Média</th>
    </tr>

  `;

  alunos.forEach(aluno => {
    if (aluno.media < mediaTurma) {
      const newRowAbaixoMedia = tabelaAbaixoMedia.insertRow();
      newRowAbaixoMedia.innerHTML = `
        <td>${aluno.nome}</td>
        <td>${aluno.media.toFixed(2)}</td>
      `;
    }
  });
}


function adicionarAluno() {
  const nome = document.getElementById('nome').value;
  const notas = [
    parseFloat(document.getElementById('nota1').value),
    parseFloat(document.getElementById('nota2').value),
    parseFloat(document.getElementById('nota3').value),
    parseFloat(document.getElementById('nota4').value)
  ];


  const media = notas.reduce((sum, nota) => sum + nota, 0) / notas.length;
  let situacao = '';
  let backgroundColor = '';

  if (media < 50) {
    situacao = 'Reprovado';
    backgroundColor = 'reprovado';
  } else if (media < 70) {
    situacao = 'Recuperação';
    backgroundColor = 'recuperacao';
  } else {
    situacao = 'Aprovado';
  }

  const newRow = tabelaAlunos.insertRow();
  newRow.innerHTML = `
    <td>${nome}</td>
    <td>${notas[0]}</td>
    <td>${notas[1]}</td>
    <td>${notas[2]}</td>
    <td>${notas[3]}</td>
    <td>${media.toFixed(2)}</td>
    <td class="${backgroundColor}">${situacao}</td>
  `;


  alunos.push({ nome, media });

  atualizarMedias();

  // Limpar campos do formulário

  document.getElementById('nome').value = '';
  document.getElementById('nota1').value = '';
  document.getElementById('nota2').value = '';
  document.getElementById('nota3').value = '';
  document.getElementById('nota4').value = '';

}