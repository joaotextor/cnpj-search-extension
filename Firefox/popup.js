const $razaoSocial = document.querySelector(".razao_social");
const $situacaoCadastral = document.querySelector(".situacao_cadastral");
const $nomeFantasia = document.querySelector(".nome_fantasia");
const $porte = document.querySelector(".porte");
const $cnpj = document.querySelector(".cnpj");
const $inicioAtividades = document.querySelector(".data_inicio_atividades");
const $dataSituacaoCadastral = document.querySelector(
  ".data_situacao_cadastral"
);
const $enderecoCompleto = document.querySelector(".endereco_completo");
const $telefone = document.querySelector(".telefone");
const $opcaoPeloMei = document.querySelector(".opcao_pelo_MEI");
const $dataOpcaoMei = document.querySelector(".data_opcao_pelo_mei");
const $dataExclusaoMei = document.querySelector(".data_exclusao_do_mei");
const $opcaoPeloSimples = document.querySelector(".opcao_pelo_simples");
const $dataOpcaoSimples = document.querySelector(".data_opcao_pelo_simples");
const $dataExclusaoSimples = document.querySelector(
  ".data_exclusao_do_simples"
);
const $buttonTeste = document.querySelector(".button");
const $$cnaePrincipal = document.querySelector(".cnae_fiscal_descricao");
const $cnaesSecundarios = document.querySelector(".cnaes_secundarios");
const $socios = document.querySelector(".socios");

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const CNPJ = urlParams.get("cnpj");

async function fetchCNPJData(cnpj) {
  const cnpjData = await fetch(`https://minhareceita.org/${cnpj}`);
  return cnpjData.json();
}

function formatDate(date) {
  if (!date) {
    return " --- ";
  }
  const newDate = new Date(`${date}T04:00:00.000Z`);
  const brazilDate = newDate.toLocaleDateString("pt-BR", { timeZone: "UTC" });
  return brazilDate;
}

function formatCep(cep) {
  const formatedCep = `${cep.substring(0, 2)}.${cep.substring(
    2,
    5
  )}-${cep.substring(5, 8)}`;
  return formatedCep;
}

function formatPhone(phone) {
  const formatedPhone = `(${phone.substring(0, 2)}) ${phone.substring(
    2,
    6
  )}-${phone.substring(6)}`;
  return formatedPhone;
}

function formatText(bold, fontSize, element, text) {
  return `<${element} style='font-weight: ${
    bold ? "bold;" : "normal;"
  } font-size: ${fontSize ? fontSize : "20"}px;'>${text}</${element}>`;
}

async function fillHTML() {
  const dadosDaEmpresa = await fetchCNPJData(CNPJ);

  console.log(dadosDaEmpresa);

  $razaoSocial.innerHTML = `${dadosDaEmpresa.razao_social}`;
  $situacaoCadastral.innerHTML = `Situação Cadastral: ${formatText(
    true,
    20,
    "span",
    dadosDaEmpresa.descricao_situacao_cadastral
  )}`;
  $nomeFantasia.innerHTML = `Nome Fantasia: ${
    dadosDaEmpresa.nome_fantasia ||
    formatText(false, 16, "span", "Não informado")
  }`;
  $porte.innerHTML = `Porte: ${formatText(
    false,
    16,
    "span",
    dadosDaEmpresa.porte
  )}`;
  $cnpj.innerHTML = `CNPJ: ${formatText(false, 16, "span", CNPJ)}`;
  $inicioAtividades.innerHTML = `Início das Atividades: ${formatText(
    false,
    16,
    "span",
    formatDate(dadosDaEmpresa.data_inicio_atividade)
  )}`;
  $dataSituacaoCadastral.innerHTML = `Data da Situação Cadastral: ${formatText(
    false,
    16,
    "span",
    formatDate(dadosDaEmpresa.data_situacao_cadastral)
  )}`;
  const enderecoCompleto = `${dadosDaEmpresa.descricao_tipo_de_logradouro} ${
    dadosDaEmpresa.logradouro
  }, ${dadosDaEmpresa.numero}, BAIRRO ${dadosDaEmpresa.bairro}, ${
    dadosDaEmpresa.municipio
  }, CEP ${formatCep(dadosDaEmpresa.cep)}`;
  $enderecoCompleto.innerHTML = `Endereço Completo: ${formatText(
    false,
    16,
    "span",
    enderecoCompleto
  )}`;
  $telefone.innerHTML = `Telefone: ${formatText(
    false,
    16,
    "span",
    formatPhone(dadosDaEmpresa.ddd_telefone_1)
  )}`;
  $opcaoPeloMei.innerHTML = `- Opção pelo MEI: ${
    dadosDaEmpresa.opcao_pelo_mei
      ? formatText(false, 16, "span", "Sim")
      : formatText(false, 16, "span", "Não")
  }`;
  $dataOpcaoMei.innerHTML = `- Data da Opção pelo MEI: ${formatText(
    false,
    16,
    "span",
    formatDate(dadosDaEmpresa.data_opcao_pelo_mei)
  )}`;
  $dataExclusaoMei.innerHTML = `- Data da Exclusão do MEI: ${formatText(
    false,
    16,
    "span",
    formatDate(dadosDaEmpresa.data_exclusao_do_mei)
  )}`;
  $opcaoPeloSimples.innerHTML = `- Opção pelo Simples: ${
    dadosDaEmpresa.opcao_pelo_simples
      ? formatText(false, 16, "span", "Sim")
      : formatText(false, 16, "span", "Não")
  }`;
  $dataOpcaoSimples.innerHTML = `- Data da Opção pelo Simples: ${formatText(
    false,
    16,
    "span",
    formatDate(dadosDaEmpresa.data_opcao_pelo_simples)
  )}`;
  $dataExclusaoSimples.innerHTML = `- Data da Exclusão do Simples: ${formatText(
    false,
    16,
    "span",
    formatDate(dadosDaEmpresa.data_exclusao_do_simples)
  )}`;
  $$cnaePrincipal.innerHTML = formatText(
    false,
    16,
    "span",
    dadosDaEmpresa.cnae_fiscal_descricao
  );
  dadosDaEmpresa.cnaes_secundarios.forEach((cnae) => {
    $cnaesSecundarios.innerHTML += `- ${formatText(
      false,
      16,
      "span",
      cnae.descricao || "Não existem"
    )}<br/>`;
  });
  dadosDaEmpresa.qsa.forEach((socio) => {
    const qualificacaoSocio = `${socio.nome_socio}, ${socio.qualificacao_socio}`;
    $socios.innerHTML += `- ${formatText(
      false,
      16,
      "span",
      qualificacaoSocio
    )}<br/>`;
  });
}

fillHTML();
