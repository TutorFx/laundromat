import * as cheerio from 'cheerio'
import PQueue from 'p-queue';
type AsyncEnvelope<TData> = {
data: TData;
error: null;
} | {
data: null;
error: Error;
};
export async function asyncEnvelope<TData>(
asyncFunction: () => Promise<TData>
): Promise<AsyncEnvelope<TData>> {
try {
const data = await asyncFunction();
return { data: data, error: null };
} catch (error) {
const typedError = error instanceof Error ? error : new Error(String(error));
console.error("Ocorreu um erro na execução:", typedError.message, );
return { data: null, error: typedError };
}
}
function stripHtml(html: string) {
const $ = cheerio.load(html);
return $.text().replace(/\s{2,}/g, ' ').trim()
}
export default defineEventHandler(async () => {
const queue = new PQueue({ concurrency: 4, interval: 300 });
const headers = {
"accept": "application/json",
"accept-language": "en-US,en;q=0.9",
"authorization": "Bearer eyJ4NXQiOiJZbU0yWkRjMVpqZzFOakk1WkRGaFlqVXdaR0V4TldWaFpEY3hOakZrT0dFMk16Wm1OVFF5WWprek9UQTJNR0ZoTnpCbE5tUmlOamhqWlRWaE9EQTNZdyIsImtpZCI6IlltTTJaRGMxWmpnMU5qSTVaREZoWWpVd1pHRXhOV1ZoWkRjeE5qRmtPR0UyTXpabU5UUXlZamt6T1RBMk1HRmhOekJsTm1SaU5qaGpaVFZoT0RBM1l3X1JTMjU2IiwiYWxnIjoiUlMyNTYifQ.eyJzdWIiOiJnb2lhc2RpZ2l0YWwiLCJhdXQiOiJBUFBMSUNBVElPTiIsImF1ZCI6ImpNUW95SF9UMkdwV1h3QmxINmdvV2ZCQmRyMGEiLCJuYmYiOjE3NTU0NjE1MTMsImF6cCI6ImpNUW95SF9UMkdwV1h3QmxINmdvV2ZCQmRyMGEiLCJpc3MiOiJodHRwczpcL1wvc3NvLmdvLmdvdi5icjo0NDNcL29hdXRoMlwvdG9rZW4iLCJleHAiOjE3NTU0NjUxMTMsImlhdCI6MTc1NTQ2MTUxMywianRpIjoiZDQxNjY0ODQtZDI5NC00ZjgwLWEwYmUtY2FlYjk5Nzk0ZmUwIn0.RV2Fk8uKguPk__LDXNwx3mcQwXAATYIZ6naNKxgdqNcTmXBbeTfCDJct2gYikz2Qj7FMazKfHtN1uxxEO0la9h8ddUoeD6CbsMO0Km48TqDue5fQf8LnwA52YLTtsvZm6GQeOYd2zuJ1lpO150Pfr0xV_Rld0aAJ5Tt8sZ33yrU3tkRnpeUQNk-SbBYmi5xvybXU5TKgmc1t6xCUEHdER6ucEY-4fofk4ZQHjDtAx5wcG3a5rcsgCb24a4IPVVtVbTPfz4zDlj_nLn29R2ZdaxzCb3ByBrwntKbC8pTu2AJVTjmYk-x9wwJG_RZkuk3sSckIJq44p8OUhPDD0aM3cQ",
"content-type": "application/json",
"sec-ch-ua": "\"Google Chrome\";v=\"137\", \"Chromium\";v=\"137\", \"Not/A)Brand\";v=\"24\"",
"sec-ch-ua-mobile": "?0",
"sec-ch-ua-platform": "\"Linux\"",
"sec-fetch-dest": "empty",
"sec-fetch-mode": "cors",
"sec-fetch-site": "same-origin",
"cookie": "BIGipServer~Apps~pool_www-go=rd3o00000000000000000000ffff0a060422o8080; GA_CUSTOM_COOKIE=GA1.4.564099203.1755438671; GA_CUSTOM_COOKIE_gid=GA1.4.1296208667.1755438671; _ga=GA1.1.564099203.1755438671; _gid=GA1.1.305301970.1755438671; BIGipServer~Apps~pool_api-goiasdigital-go=rd3o00000000000000000000ffff0a060569o80; CookieGenericoGoias=rd3o00000000000000000000ffff0a0c0013o8243; _gat=1; _gat_gtag_UA_156304994_1=1; dummy_session=e79534c8dc2cc8a27beb1364f7319f99; dummy_session_exp=1755465130; TS014d2fc0=01c51a2261c6dc366334f8b8a452a058e058205d5a53e0a68af329cbc27f66aa0a42e7ad57a09bddb72de3b709b8dde679d247c893e396b58b6d3c8c4bb47026ce98cfb88659cb08629fe1b19e434b9f5731b535a7ecec9dd6392e7b72b3fa1a7996e3a89d36fe701c1e69a903a1d5a4f4b5075cfe88e2c2add91df54074528e9a027c9ead; TS1b8341c4027=08b9c2a2deab200027d1ddafa436f6a8692a4f05e30b5f92a529f9a01f3c064a74673c007efdfe370881141dfb113000201bf8d1b479df8e4621c52b8b54e048575ac07cc1c0bbc8d43a5a0d721d4ec6b60bc8fc008afa19160966c4277d6b74; _ga_YS5P4XM8ME=GS2.1.s1755461501$o4$g1$t1755461531$j30$l0$h0",
"Referer": "https://www.go.gov.br/servicos/todos-os-servicos",
"Referrer-Policy": "strict-origin-when-cross-origin"
}
const getMeta = await $fetch<BuscaServicos.Response>('https://www.go.gov.br/expresso-publico-api/servicos?start=1&qtdBusca=1', {
headers
})
const qtdLapada = getMeta.qtdRegistros
const paginaDataPromises = getMeta.servicos.map(async (_s, index) => {
const page = await $fetch<BuscaServicos.Response>(`https://www.go.gov.br/expresso-publico-api/servicos?start=${index}&qtdBusca=${qtdLapada}&indiServicoDigital=D,N,P&govBr=N`, {
headers
})
const cartasPromises = page.servicos.map(async (service, sid) => queue.add(async () => {
const detServico = await asyncEnvelope(async() => await $fetch<BuscaServicos.Servico>(`https://www.go.gov.br/expresso-publico-api/servico/${service.descUrlAmigavel}`, {
headers: {
...headers,
"Referer": `https://www.go.gov.br/servicos/servico/${service.descUrlAmigavel}`,
}
}))
if (!detServico.data) return null
const quem = {
id: `cartas-quem-${detServico.data.descUrlAmigavel}`,
meta: {
title: `Para quem é o serviço ${detServico.data.nomeServico}?`
},
data: `o serviço ${detServico.data.nomeServico} do órgão é para "${detServico.data.solicitanteServico.map(
(solicitante) => solicitante.descTipoSolic.trim()
).join(' ou, ')}"`
}
const oque = {
id: `cartas-o-que-${detServico.data.descUrlAmigavel}`,
meta: {
title: `O que é o serviço ${detServico.data.nomeServico} prestado pelo órgão ${detServico.data.idPrestadorServico.nomePrestadorServico}?`
},
data: `${stripHtml(detServico.data.infoServico)}`
}
const como = {
id: `cartas-como-${detServico.data.descUrlAmigavel}`,
meta: {
title: `Como funciona o serviço ${detServico.data.nomeServico} prestado pelo órgão ${detServico.data.idPrestadorServico.nomePrestadorServico}?`
},
data: `Para ${detServico.data.nomeServico}, o "${detServico.data.solicitanteServico.map(
(solicitante) => solicitante.descTipoSolic
).join(', ')}" deve: ${detServico.data.etapaServico.toSorted(
(a, b) => a.numrOrdemEtapaServico - b.numrOrdemEtapaServico
).map(
(service, i) => (i + 1)+': '+service.nomeEtapaServico.replace(/\s{2,}/g, ' '
).trim()).join(' \n')}.`
}
const onde = {
id: `cartas-onde-${detServico.data.descUrlAmigavel}`,
meta: {
title: `Onde o serviço ${detServico.data.nomeServico} é prestado?`
},
data: `O serviço "${detServico.data.nomeServico}" pode ser acessado nos seguintes canais:\n${detServico.data.etapaServico.flatMap(etapa => etapa.canalEtapaServico.map(canal => `- ${canal.nomeTipoCanalPrestacao}: ${stripHtml(canal.infoAcessoCanal).replace(/\s{2,}/g, ' ').trim()}`)).filter((value, index, self) => self.indexOf(value) === index).join('\n')}`
}
const responsavel = {
id: `cartas-responsavel-${detServico.data.descUrlAmigavel}`,
meta: {
title: `Quem é responsável pelo serviço "${detServico.data.nomeServico}"?`
},
data: `O serviço ${detServico.data.nomeServico}, "${detServico.data.nomePopularServico.length > 0 ? 'popularmente conhecido como '+stripHtml(detServico.data.nomePopularServico) : ''}" é prestado pelo
${detServico.data.idPrestadorServico.nomePrestadorServico}, que é popularmente conhecido como
"${stripHtml(detServico.data.idPrestadorServico.nomePopularPrestadorServico)}".\n
Que por sua vez, é administrado(a) por ${stripHtml(detServico.data.infoAreaResp)}.\n
Mais informações do prestador de serviços:
${stripHtml(detServico.data.idPrestadorServico.infoPrestadorServico)}`.replace(/\s{2,}/g, ' '),
}
const custo = {
id: `cartas-custo-${detServico.data.descUrlAmigavel}`,
meta: {
title: `Qual o custo para o serviço ${detServico.data.nomeServico}?`
},
data: detServico.data.indiServicoCusto === 'S'
? `O serviço "${detServico.data.nomeServico}" possui os seguintes custos:\n${stripHtml(detServico.data.infoCustoTotal).replace(/\s{2,}/g, ' ').trim()}`
: `O serviço "${detServico.data.nomeServico}" é gratuito.`
};
const prazo = {
id: `cartas-prazo-${detServico.data.descUrlAmigavel}`,
meta: {
title: `Qual o prazo para realizar o serviço ${detServico.data.nomeServico}?`
},
data: detServico.data.qtdeEstimativaInicial
? `O tempo estimado para a conclusão do serviço "${detServico.data.nomeServico}" é de ${detServico.data.qtdeEstimativaInicial}${detServico.data.qtdeEstimativaFinal && detServico.data.qtdeEstimativaFinal !== detServico.data.qtdeEstimativaInicial ? ` a ${detServico.data.qtdeEstimativaFinal}` : ''} ${detServico.data.tipoTempoEstimadoServico}.`
: `Não há um prazo estimado definido para a conclusão deste serviço.`
};
const requisitos = {
id: `cartas-requisitos-${detServico.data.descUrlAmigavel}`,
meta: {
title: `Quais são os requisitos e documentos para o serviço ${detServico.data.nomeServico}?`
},
data: `Para solicitar o serviço "${detServico.data.nomeServico}", você precisa atender aos seguintes critérios e apresentar os documentos abaixo:\n\n**Requisitos:**\n${
detServico.data.solicitanteServico
.map(s => s.infoRequisitoNecessario ? `- Para "${s.descTipoSolic.trim()}": ${stripHtml(s.infoRequisitoNecessario).replace(/\s{2,}/g, ' ').trim()}` : `- Ser ${s.descTipoSolic.trim()}`)
.join('\n')
}\n\n**Documentação Necessária:**\n- ${
[...new Set(detServico.data.etapaServico.flatMap(etapa => etapa.documentoEtapaServico.map(doc => doc.nomeDocumentoServico.trim())))]
.join('\n- ')
}`
};
const contato = {
id: `cartas-contato-${detServico.data.descUrlAmigavel}`,
meta: {
title: `Como posso entrar em contato ou acompanhar o serviço ${detServico.data.nomeServico}?`
},
data: `Para mais informações ou para acompanhar seu processo do serviço "${detServico.data.nomeServico}", siga as orientações abaixo:\n\n**Área Responsável:**\n${stripHtml(detServico.data?.infoAreaResp ?? '').replace(/\s{2,}/g, ' ').trim()}\n\n**Instruções de Acompanhamento:**\n${stripHtml(detServico.data?.infoContato ?? '').replace(/\s{2,}/g, ' ').trim()}`
};
return [quem, oque, como, onde, responsavel, custo, prazo, requisitos, contato]
}))
const cartasData = await Promise.all(cartasPromises);
return cartasData.flat()
})
// Aguarda a resolução de todas as páginas e achata o resultado final.
const allCartas = (await Promise.all(paginaDataPromises)).flat();
// 'allCartas' agora contém todos os dados coletados de forma controlada.
// Você pode retornar 'allCartas' ou continuar o processamento aqui.
return allCartas;
})
/**
* @fileoverview Define os tipos de dados para as respostas da API de Serviços.
* @version 1.0.0
*/
/**
* Agrupa os tipos de dados relacionados ao endpoint de busca geral de serviços.
*/
export namespace BuscaServicos {
/**
* Descreve um tipo de solicitante elegível para um serviço e seus requisitos específicos.
* Um serviço pode ter múltiplos tipos de solicitantes.
*/
export interface SolicitanteServico {
/**
* O número de ordem para exibição ou organização do solicitante na lista.
* Geralmente começa em 1.
* @example 1
*/
numrOrdemSolicServico: number;
/**
* O identificador numérico único para este registro de tipo de solicitante.
* @example 57112
*/
idSolicServico: number;
/**
* Uma descrição clara e textual do perfil do solicitante.
* Informa quem é a pessoa ou entidade que pode solicitar o serviço.
* @example "Condutor infrator com CNH suspensa ou cassada."
*/
descTipoSolic: string;
/**
* Descreve os pré-requisitos, condições ou documentos necessários
* especificamente para este tipo de solicitante. O valor pode ser nulo
* se não houver requisitos adicionais ou se eles forem gerais para todos.
*
* @warning Este campo PODE CONTER TAGS HTML (`<p>`, `<ul>`, `&nbsp;`, etc.).
* É fundamental limpar (sanitizar) este conteúdo antes de exibi-lo
* em uma interface de usuário para evitar vulnerabilidades de segurança (XSS).
*
* @example "<p>Motoristas profissionais...</p>"
* @example null
*/
infoRequisitoNecessario: string | null;
}
/**
* Representa a estrutura de uma categoria associada a um serviço.
* Esta interface é compartilhada por múltiplas respostas da API.
*/
export interface CategoriaServico {
/**
* Identificador numérico único para a categoria.
* @example 59
*/
idCategoriaServico: number;
/**
* Uma string formatada para ser usada em URLs (slug).
* @example "empreendedorismo"
*/
descUrlAmigavel: string;
/**
* O nome da classe CSS para o ícone da categoria (ex: Font Awesome).
* @example "fa-regular fa-lightbulb-on"
*/
nomeIconeCategoria: string;
/**
* O nome da cor ou código usado para estilizar o ícone.
* @example "brown"
*/
descCorIconeCategoria: string;
/**
* Flag booleana que indica se o ícone da categoria deve ser exibido.
* @example true
*/
exibirIcone: boolean;
/**
* Indica se a categoria é um destaque para o serviço ('S' para Sim, 'N' para Não).
* @example "S"
*/
categoriaDestaque: 'S' | 'N';
}
/**
* Descreve um documento necessário para uma etapa específica do serviço.
*/
export interface DocumentoEtapa {
/**
* O número de ordem para exibição do documento na lista.
* @example 1
*/
numrOrdemDocEtapaServ: number;
/**
* Identificador numérico único do tipo de documento.
* @example 216
*/
idDocumentoServico: number;
/**
* Informações ou observações adicionais sobre o documento.
* Pode ser nulo se não houver detalhes extras.
* @example null
*/
infoDocumentoEtapaServico: string | null;
/**
* O nome oficial do documento exigido.
* @example "RG ou CPF"
*/
nomeDocumentoServico: string;
/**
* O nome de um arquivo para download associado ao documento, como um modelo.
* Pode ser nulo.
* @example null
*/
nomeArquivoDocumentoServico: string | null;
/**
* Status do registro do documento.
* - 'A': Ativo
* @example "A"
*/
statDocumentoServico: 'A' | 'I'; // Suposição de 'I' para Inativo
/**
* Sigla que representa o tipo de documento.
* @example "INF"
*/
siglTipoDocumento: string;
}
/**
* Descreve um canal de prestação de serviço disponível para uma etapa específica.
*/
export interface CanalEtapa {
/**
* O número de ordem para exibição do canal de atendimento.
* @example 1
*/
numrOrdemPrestEtapaServ: number;
/**
* Identificador numérico único para a associação deste canal com esta etapa.
* @example 130694
*/
idCanalPrestacaoEtapaServ: number;
/**
* Identificador numérico que define o tipo do canal (ex: 7 para Web, 4 para Presencial).
* @example 7
*/
idTipoCanalPrestacao: number;
/**
* Instruções ou informações de acesso para o canal.
* @warning Este campo PODE CONTER TAGS HTML (`<p>`, `<br>`).
* É crucial sanitizar este conteúdo antes de exibi-lo.
* @example "<p>Clicar no botão \"Acessar\"</p>"
*/
infoAcessoCanal: string;
/**
* O nome legível que descreve o tipo de canal.
* @example "Web"
*/
nomeTipoCanalPrestacao: string;
/**
* Campo de nome redundante, aparentemente dinâmico, baseado no `idTipoCanalPrestacao`.
* (Ex: 'nome_canal_7' quando o ID é 7).
* @example "Web"
*/
[key: `nome_canal_${number}`]: string;
/**
* Campo de descrição redundante e dinâmico, baseado no `idTipoCanalPrestacao`.
* @warning Também pode conter HTML.
* @example "<p>Clicar no botão \"Acessar\"</p>"
*/
[key: `desc_canal_${number}`]: string;
}
/**
* Representa uma etapa ou passo discreto dentro do processo de solicitação de um serviço.
*/
export interface EtapaServico {
/**
* O identificador numérico único para esta etapa do serviço.
* @example 4021
*/
idEtapaServico: number;
/**
* O título ou nome da etapa.
* @example "Selecionar Forma de Pagamento"
*/
nomeEtapaServico: string;
/**
* Uma descrição detalhada das ações a serem tomadas nesta etapa.
* @warning Este campo PODE CONTER TAGS HTML (`<p>`, `<br>`).
* É crucial sanitizar este conteúdo antes de exibi-lo na interface.
* @example "<p>-Escolher o d&eacute;bito;<br />\r\n-Informar a data para o Pagamento;<br />\r\n-Emitir Dare</p>"
*/
infoEtapaServico: string;
/**
* Um indicador que informa se esta etapa específica possui algum custo associado.
* - 'S': Sim
* - 'N': Não
* @example "N"
*/
indiEtapaPossuiCusto: 'S' | 'N';
/**
* O número que define a ordem cronológica desta etapa no fluxo do serviço.
* Essencial para ordenar os passos corretamente.
* @example 2
*/
numrOrdemEtapaServico: number;
/**
* Uma lista de documentos que são necessários para ou fornecidos nesta etapa.
* Pode ser um array vazio.
*/
documentoEtapaServico: DocumentoEtapa[];
/**
* Uma lista de custos associados especificamente a esta etapa.
* Pode ser um array vazio. (A estrutura interna do objeto de custo não foi fornecida).
*/
custoEtapaServico: any[]; // Usando 'any' pois a estrutura do custo não foi fornecida no exemplo.
/**
* Uma lista de canais de atendimento (Web, Presencial, Telefone, etc.)
* por onde esta etapa pode ser realizada.
*/
canalEtapaServico: CanalEtapa[];
}
/**
* Representa a estrutura detalhada de um serviço, conforme retornado
* pelo endpoint de busca geral.
*/
export interface Servico {
/**
* Indica se o serviço possui integração com a plataforma gov.br.
*/
govBr: 'S' | 'N';
/**
* Número utilizado para ordenação ou sequência de exibição.
*/
sequencia: number;
/**
* Identificador numérico único do serviço.
*/
idServico: number;
/**
* O nome oficial e completo do serviço.
*/
nomeServico: string;
/**
* Status atual do serviço ('A' para Ativo, 'I' para Inativo).
*/
statServico: 'A' | 'I';
/**
* Texto descritivo com o motivo da suspensão, se aplicável.
*/
descMotivoSuspensao: string;
/**
* Identificador do órgão ou entidade que presta o serviço.
*/
idPrestadorServico: PrestadorServico;
/**
* Nomes populares, apelidos ou termos comuns para o serviço.
*/
nomePopularServico: string;
/**
* Sigla ou acrônimo oficial do serviço.
*/
siglServico: string;
/**
* O "slug" do serviço, usado para construir a URL da sua página de detalhes.
*/
descUrlAmigavel: string;
/**
* Contador de acessos ao serviço, formatado como string.
*/
qtdeAcesso: string;
/**
* Array de "slugs" dos órgãos responsáveis pelo serviço.
*/
descUrlAmigavelOrgao: string[];
/**
* Array de "slugs" de todas as categorias às quais o serviço pertence.
*/
descUrlAmigavelCategoria: string[];
/**
* Array de "slugs" que identificam o público-alvo do serviço.
*/
descUrlAmigavelPublicoAlvo: string[];
/**
* Um link encurtado para a página do serviço, se disponível.
*/
descLinkCurto: string;
/**
* A descrição detalhada do serviço.
* @warning Este campo PODE CONTER HTML (`<p>`, `<ul>`, `&nbsp;`, etc.).
* É crucial sanitizar este conteúdo antes de renderizá-lo no frontend
* para prevenir ataques de XSS (Cross-Site Scripting).
*/
infoServico: string;
/**
* Indica a modalidade do serviço (ex: "Presencial", "Digitalizado").
*/
indiServicoDigital: string;
/**
* Indica se o serviço possui algum custo ('S' para Sim, 'N' para Não).
*/
indiServicoCusto: 'S' | 'N';
/**
* Texto que detalha os custos do serviço, se houver.
*/
infoCustoTotal: string;
/**
* A URL completa para a página do serviço na plataforma gov.br.
*/
descUrlGovBr: string;
/**
* Status da aplicação ou sistema relacionado ao serviço ('A' para Ativo, 'I' para Inativo).
*/
statAplicacaoServico: 'A' | 'I';
/**
* Descreve o tipo de integração do sistema, se houver.
*/
tipoIntegracao: string;
/**
* Descreve o tipo de identificação necessária para o serviço.
*/
tipoIdentificacao: string;
/**
* Um código ou indicador sobre o tipo de acesso ao serviço.
*/
indiTipoAcessoServico: string;
/**
* Indica se o serviço permite ou requer agendamento.
*/
statAgenda: boolean;
/**
* Um array de objetos de categoria associados a este serviço.
*/
categoriaServico: CategoriaServico[];
/**
* O identificador numérico do ícone principal do serviço.
*/
idIconeServico: number;
/**
* A classe CSS para o ícone principal do serviço (ex: Font Awesome).
*/
nomeIconeServico: string;
/**
* A URL de um vídeo explicativo sobre o serviço, se existir.
*/
urlVideoServico: string;
/**
* Indica se as informações do serviço estão na "Carta de Serviços ao Usuário".
*/
acessoCarta: boolean;
infoAreaResp: string;
/**
* Uma lista dos diferentes perfis de pessoas ou entidades
* que podem solicitar este serviço.
*/
solicitanteServico: SolicitanteServico[];
etapaServico: EtapaServico[];
qtdeEstimativaInicial: number;
qtdeEstimativaFinal: number;
tipoTempoEstimadoServico: string;
infoContato: string;
}
/**
* Representa a resposta completa do endpoint de busca de serviços.
*/
export interface Response {
/**
* O índice inicial do primeiro registro na página atual.
*/
start: number;
/**
* Identificador do cliente da API (nulo no exemplo).
*/
clientid: null;
/**
* A quantidade de registros retornados na busca atual (por página).
*/
qtdBusca: number;
/**
* A quantidade total de registros encontrados que correspondem à busca.
*/
qtdRegistros: number;
/**
* O número da página atual.
*/
page: number;
/**
* O número total de páginas disponíveis.
*/
pages: number;
/**
* Um array de caracteres ou strings para uso em filtros de navegação (ex: A-Z).
*/
filter: string[];
/**
* O array contendo os objetos de serviço da página atual.
*/
servicos: Servico[];
/**
* O ID do termo de busca utilizado, se aplicável.
*/
idTermoBuscado: number;
/**
* Metadado de performance: tempo de processamento da requisição em milissegundos.
*/
tempoProcessamentoSemElastic: number;
/**
* A chave de cache (ex: Memcached) usada para esta resposta, útil para depuração.
*/
keyMemcached: string;
}
/**
* Representa um objeto de data com informações de fuso horário,
* geralmente utilizado para registrar a data da última alteração.
*/
export interface DataAlteracao {
/**
* A data e hora no formato 'AAAA-MM-DD HH:mm:ss.SSSSSS'.
* @example "2024-01-30 11:00:07.000000"
*/
date: string;
/**
* Um identificador numérico para o tipo de fuso horário.
* @example 3
*/
timezone_type: number;
/**
* O nome do fuso horário no padrão IANA (TZ database).
* @example "America/Sao_Paulo"
*/
timezone: string;
}
/**
* Descreve a estrutura de dados de uma entidade prestadora de serviço,
* como uma secretaria de governo ou outro órgão público.
*/
export interface PrestadorServico {
/**
* O identificador numérico único para o prestador de serviço.
* Funciona como a chave primária desta entidade.
* @example 20
*/
idPrestadorServico: number;
/**
* A sigla ou acrônimo oficial do prestador de serviço,
* usada para referência rápida.
* @example "ECONOMIA"
*/
siglPrestadorServico: string;
/**
* O nome oficial e completo do prestador de serviço.
* @example "Secretaria de Estado da Economia"
*/
nomePrestadorServico: string;
/**
* Uma string contendo nomes alternativos, apelidos ou termos populares
* pelos quais o órgão é conhecido, geralmente separados por vírgula.
* Essencial para buscas e para o contexto do RAG.
* @example "SEFAZ,      Fazenda,      Secretaria da Fazenda"
*/
nomePopularPrestadorServico: string;
/**
* Um campo destinado a informações gerais sobre os canais de atendimento,
* podendo estar vazio.
* @example ""
*/
infoCanalAtendimento: string;
/**
* Campo de texto rico contendo informações de contato e institucionais detalhadas.
* @warning Este campo PODE CONTER TAGS HTML (`<p>`, `<a>`, `<span>`, `&nbsp;`, etc.).
* É crucial sanitizar este conteúdo antes de renderizá-lo em uma interface
* para prevenir ataques de XSS (Cross-Site Scripting). Para um RAG,
* o ideal é extrair o texto puro.
* @example "<p>CNPJ: <span>01.409.655/0001-80</span><br />...</p>"
*/
infoPrestadorServico: string;
/**
* Indica o status atual do cadastro do prestador de serviço.
* - 'A': Ativo
* - 'I': Inativo (suposição)
* @example "A"
*/
statPrestadorServico: 'A' | 'I';
/**
* Indica o status de publicação das informações do prestador.
* - 'N': Não publicado
* - 'S': Sim, publicado (suposição)
* @example "N"
*/
statPublicacao: 'S' | 'N';
/**
* A versão do nome do prestador formatada para ser usada em URLs (slug).
* Geralmente em minúsculas, com hifens no lugar de espaços.
* @example "secretaria-de-estado-da-economia"
*/
descUrlAmigavel: string;
/**
* Um objeto que detalha a data e hora da última modificação
* nos dados deste prestador de serviço.
*/
dataAlteracao: DataAlteracao;
}
}
