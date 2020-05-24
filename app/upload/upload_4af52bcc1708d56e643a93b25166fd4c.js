var cnpj = "";
let listDocuments = [];
var idDocumentUpdate = 0;
var dataExpiracaoUpdate = "";
var idParentUpdate = 0;
var versionUpdate = 0;
var dataStarUpdate = "";
var descriptionUpdate = "";
var phisicalFileUpdate = "";
var dataNow = new Date();
var dateDay = (dataNow.getDate() < 10) ? "0" + dataNow.getDate() : dataNow.getDate();
var dateMonth = (dataNow.getMonth() + 1 < 10) ? "0" + dataNow.getMonth() + 1 : dataNow.getMonth() + 1;
dataNow = dataNow.getFullYear() + "-" + dateMonth + "-" + dateDay;

function generateNonce() {
	let text = '';
	const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	for (let i = 0; i < 11; i++) {
		text += possible.charAt(Math.floor(Math.random() * possible.length));
	}
	return text;
}

// Validação do  CNPJ  Inicio 


function pesquisarCNPJ() {
	var finalizouBusca = false;
	listDocuments = [];

	$('#grid').data('kendoGrid').dataSource.data([]);

	cnpj = document.getElementById("cnpj").value;

	var oauth = OAuth({
		consumer: {
			key: '219f5f27-e3c1-4427-be3d-afd5ef387b64',
			secret: '219f5f27-e3c1-4427-be3d-afd5ef387b64-219f5f27-e3c1-4427-be3d-afd5ef387b64'
		},
		signature_method: 'HMAC-SHA1',
		hash_function: function (base_string, key) {
			return CryptoJS.HmacSHA1(base_string, key).toString(CryptoJS.enc.Base64);
		},
		nonce_length: 6
	});

	// Tokens do usuário aplicativo para o Oauth APP cadastrado
	var token = {
		key: '4a18c0c9-e620-436c-b862-5d27705b61cf',
		secret: '6368e1e5-1dbe-4dd0-8979-63816e7810eb21dae970-885c-4238-894e-fd1d1ede14a1'
	};
	var request_data = {
		// Necessário passar URL completa para não dar erro de signature invalid
		url: parent.WCMAPI.getServerURL() + '/api/public/ecm/dataset/datasets/',
		method: 'POST',
	};

	var data = {
		'name': 'ds_documentExp',
		'constraints': []
	}

	var loadingWindow = FLUIGC.loading(window);

	$.ajax({
		url: request_data.url,
		contentType: 'application/json',
		type: request_data.method,
		headers: oauth.toHeader(oauth.authorize(request_data, token)),
		data: JSON.stringify(data),
		success: (resp) => {

			console.log(resp);

			var dsResponse = resp;

			dadosProcessos = [];
			
			loadingWindow.show();


			dsResponse.content.values.forEach((x) => {

				var cnpjDataset = x['Codigo'];

				if (cnpjDataset == cnpj) {



					var obs = "";
					var cst = [];

					var status = "";

					let token_3 = {
						key: '4a18c0c9-e620-436c-b862-5d27705b61cf',
						secret: '6368e1e5-1dbe-4dd0-8979-63816e7810eb21dae970-885c-4238-894e-fd1d1ede14a1'
					};
					let request_data_3 = {
						// Necessário passar URL completa para não dar erro de signature invalid
						url: parent.WCMAPI.getServerURL() + '/api/public/ecm/dataset/datasets/',
						method: 'POST',
					};

					let oauth_3 = OAuth({
						consumer: {
							key: '219f5f27-e3c1-4427-be3d-afd5ef387b64',
							secret: '219f5f27-e3c1-4427-be3d-afd5ef387b64-219f5f27-e3c1-4427-be3d-afd5ef387b64'
						},
						signature_method: 'HMAC-SHA1',
						hash_function: function (base_string, key) {
							return CryptoJS.HmacSHA1(base_string, key).toString(CryptoJS.enc.Base64)
						},
						nonce_length: 6
					});

					var cst = [];

					cst.push({
						"_field": "documentId",
						"_initialValue": x['documentId'],
						"_finalValue": x['documentId'],
						"_type": 1
					})

					let data = {
						"name": "ds_status_document",
						"constraints": cst
					}
					$.ajax({
						url: request_data_3.url,
						contentType: 'application/json',
						type: request_data_3.method,
						headers: oauth_3.toHeader(oauth_3.authorize(request_data_3, token_3)),
						async: false,
						data: JSON.stringify(data),
						success: (resp) => {
							status = parseInt(resp.content.values[0]['Status']);
						}
					})


					console.log("Documento " + x['documentId']);
					console.log("Status " + status);
					if (status != 2) {

						try {

							cst.push({
								"_field": "approvalMovementPK.documentId",
								"_initialValue": x['documentId'],
								"_finalValue": x['documentId'],
								"_type": 1
							})
							1
							cst.push({
								"_field": "analised",
								"_initialValue": true,
								"_finalValue": true,
								"_type": 1
							})
							cst.push({
								"_field": "approved",
								"_initialValue": false,
								"_finalValue": false,
								"_type": 1
							})

							let token2 = {
								key: '4a18c0c9-e620-436c-b862-5d27705b61cf',
								secret: '6368e1e5-1dbe-4dd0-8979-63816e7810eb21dae970-885c-4238-894e-fd1d1ede14a1'
							};
							let request_data2 = {
								// Necessário passar URL completa para não dar erro de signature invalid
								url: parent.WCMAPI.getServerURL() + '/api/public/ecm/dataset/datasets/',
								method: 'POST',
							};

							let oauth2 = OAuth({
								consumer: {
									key: '219f5f27-e3c1-4427-be3d-afd5ef387b64',
									secret: '219f5f27-e3c1-4427-be3d-afd5ef387b64-219f5f27-e3c1-4427-be3d-afd5ef387b64'
								},
								signature_method: 'HMAC-SHA1',
								hash_function: function (base_string, key) {
									return CryptoJS.HmacSHA1(base_string, key).toString(CryptoJS.enc.Base64)
								},
								nonce_length: 6
							});

							var data2 = {
								"name": "documentApprovalHistory",
								"constraints": cst
							}


							$.ajax({
								url: request_data2.url,
								contentType: 'application/json',
								type: request_data2.method,
								async: false,
								headers: oauth2.toHeader(oauth2.authorize(request_data2, token2)),
								data: JSON.stringify(data2),
								success: (resp) => {
									var dataset = resp;
									var dataset_length = dataset.content.values.length;


									if (dataset_length != 0) {
										obs = dataset.content.values[dataset_length - 1]['observation'];

										var versao_rep = parseInt(dataset.content.values[dataset_length - 1]['approvalMovementPK.version']);

										var versao_doc = parseInt(x['documentVersion']);

										if (versao_rep <= versao_doc) {
											obs = "";
										}
									}
								}
							})


						} catch (error) {

						}
						var obj = {
							numSolic: x['documentId'],
							produto: x['Produto'],
							nameArq: x['documentDescription'],
							dataCreat: (x['documentDateCreat'].split('-')[2] + '/' + (x['documentDateCreat'].split('-')[1]) + '/' + x['documentDateCreat'].split('-')[0]),
							dataExp: x['documentDateExpiration'],
							docType: obs,
							version: x['documentVersion'],
							notify: x['notifyDays']
						}

						dadosProcessos.push(obj);
					}







					const dataSource = new kendo.data.DataSource({
						data: dadosProcessos,
						pageSize: 50,
						schema: {
							model: {
								fields: {
									dateSolic: { type: "date" },
									createDate: { type: "date" }
								}
							}
						}
					});

					$('#grid').data('kendoGrid').setDataSource(dataSource);
					loading.hide();

					var oauth = OAuth({
						consumer: {
							key: '219f5f27-e3c1-4427-be3d-afd5ef387b64',
							secret: '219f5f27-e3c1-4427-be3d-afd5ef387b64-219f5f27-e3c1-4427-be3d-afd5ef387b64'
						},
						signature_method: 'HMAC-SHA1',
						hash_function: function (base_string, key) {
							return CryptoJS.HmacSHA1(base_string, key).toString(CryptoJS.enc.Base64)
						},
						nonce_length: 6
					});

					// Tokens do usuário aplicativo para o Oauth APP cadastrado
					var token = {
						key: '4a18c0c9-e620-436c-b862-5d27705b61cf',
						secret: '6368e1e5-1dbe-4dd0-8979-63816e7810eb21dae970-885c-4238-894e-fd1d1ede14a1'
					};

					var request_data = {
						// Necessário passar URL completa para não dar erro de signature invalid
						url: 'http://indukerntst.fluig.com/ecm/upload',
						method: 'POST',
					};

					$("input[id^=anexo]").fileupload({

						headers: oauth.toHeader(oauth.authorize(request_data, token)),
						dataType: 'json',
						start: function (teste) {

							if (listDocuments.length >= 1) {
								FLUIGC.toast({
									title: '',
									message: 'Anexe e envie um arquivo por vez.',
									type: 'danger'
								});

							} else {
								FLUIGC.toast({
									title: '',
									message: 'Carregado com sucesso!',
									type: 'success'
								});
							}
						},
						done: function (e, data) {
							console.log('entrou');

							if (listDocuments.length == 0) {
								$.each(data.result.files, function (index, file) {
									listDocuments.push(file);
								});
							} else {
								listDocuments = [];
							}
						}

					});
				}

			});

			loadingWindow.hide();

			$('#load').hide();

			if (!dadosProcessos.length) {
				swal(
					"Atenção!",
					"Nenhum arquivo foi encontrado para o CNPJ informado",
					"info"
				);
			}
		},
		error: (resp, err, op) => {
			console.log(resp);
		}
	});


}






// Validação do  CNPJ  Fim

const customDateFilter = (elem) => {
	elem.kendoDatePicker();
}

var loading = FLUIGC.loading(window);

function template7(dataItem, campo) {





	if (dataItem.dataExp) {
		var dataNow = new Date().getTime();
		var datVencimento = new Date(dataItem.dataExp).getTime();
		var form = (dataItem.dataExp.split('-')[2] + '/' + (dataItem.dataExp.split('-')[1]) + '/' + dataItem.dataExp.split('-')[0]);
		if (datVencimento < dataNow) {
			if (campo == 'dataExp') {
				return "<strong style='color: #ff4f4f'>" + form + "</strong>";
			}
			return "<strong style='color: #ff4f4f'>" + dataItem[campo] + "</strong>";

		} else {
			if (campo == 'dataExp') {
				return form;
			}
			return dataItem[campo];
		}
	}

}


// Templates dos Campos da Tabela do Kendo  Inicio 
function template6(dataItem, campo) {

	if (dataItem.dataExp) {
		var dataNow = new Date().getTime();
		var datVencimento = new Date(dataItem.dataExp).getTime();
		var form = (dataItem.dataExp.split('-')[2] + '/' + (dataItem.dataExp.split('-')[1]) + '/' + dataItem.dataExp.split('-')[0]);
		if (datVencimento < dataNow) {
			if (campo == 'dataExp') {
				return "<strong  style='color:red;' >" + form + "</strong>";
			}
			return "<strong style='color: #ff4f4f;'id='descricao" + dataItem[campo] + "'>" + dataItem["nameArq"] + "</strong>";

		} else {
			if (campo == 'dataExp') {
				return form;
			}
			return "<strong id='descricao" + dataItem[campo] + "'>" + dataItem["nameArq"] + "</strong>";
		}
	}

}
function template5(dataItem, campo, campo2) {

	if (dataItem.dataExp) {
		var dataNow = new Date().getTime();
		var datVencimento = new Date(dataItem.dataExp).getTime();
		var form = (dataItem.dataExp.split('-')[2] + '/' + (dataItem.dataExp.split('-')[1]) + '/' + dataItem.dataExp.split('-')[0]);
		if (datVencimento < dataNow) {
			if (campo == 'dataExp') {
				return "<strong style='color:red'>" + form + "</strong>";
			}
			return (
				'<button name="salvar' +
				dataItem[campo] +
				'" id="salvar' +
				dataItem[campo] +
				'" data-days=' + dataItem[campo2] +
				' onclick="sendDocECM(' +
				dataItem[campo] +
				')" style="color: white; background-color: #3f50b0; border: none; width: 100px; height: 30px;">Salvar</button>'
			);
		} else {
			if (campo == 'dataExp') {
				return form;
			}
			return (
				'<button name="salvar' +
				dataItem[campo] +
				'" id="salvar' +
				dataItem[campo] +
				'" data-days=' + dataItem[campo2] +
				' onclick="sendDocECM(' +
				dataItem[campo] +
				')" style="color: white; background-color: #3f50b0; border: none; width: 100px; height: 30px;">Salvar</button>'
			);
		}
	}

}

function template4(dataItem, campo) {

	if (dataItem.dataExp) {
		var dataNow = new Date().getTime();
		var datVencimento = new Date(dataItem.dataExp).getTime();
		var form = (dataItem.dataExp.split('-')[2] + '/' + (dataItem.dataExp.split('-')[1]) + '/' + dataItem.dataExp.split('-')[0]);
		if (datVencimento < dataNow) {
			if (campo == 'dataExp') {
				return "<strong style='color:red'>" + form + "</strong>";
			}

			FLUIGC.calendar("#validade" + dataItem[campo]);

			return '<input type="date" class="fluig-control" name="validade' + dataItem[campo] + '" id="validade' + dataItem[campo] + '" style="color: #ff4f4f; width: 135px; border: solid 1px #ffa2a2;">';
		} else {
			if (campo == 'dataExp') {
				return form;
			}

			return '<input  type="date" class="fluig-control" name="validade' + dataItem[campo] + '" id="validade' + dataItem[campo] + '" style="width: 135px;border: solid 1px #d0d0d0;">';
		}
	}

}
function template3(dataItem, campo) {

	if (dataItem.dataExp) {
		var dataNow = new Date().getTime();
		var datVencimento = new Date(dataItem.dataExp).getTime();
		var form = (dataItem.dataExp.split('-')[2] + '/' + (dataItem.dataExp.split('-')[1]) + '/' + dataItem.dataExp.split('-')[0]);
		if (datVencimento < dataNow) {
			if (campo == 'dataExp') {
				return "<strong style='color:red'>" + form + "</strong>";
			}
			return '<label for="anexo' + dataItem[campo] + '"><i aria-hidden="true" style="padding-left: 25px;color: #f2bb67;" class="fas fa-file-upload fa-2x"></i></label><input display="none" type="file" name="anexo' + dataItem[campo] + '" data-url="/ecm/upload" id="anexo' + dataItem[campo] + '" >';

		} else {
			if (campo == 'dataExp') {
				return form;
			}
			return '<label for="anexo' + dataItem[campo] + '"><i aria-hidden="true" style="padding-left: 25px;color: #f2bb67;" class="fas fa-file-upload fa-2x"></i></label><input display="none" type="file" name="anexo' + dataItem[campo] + '" data-url="/ecm/upload" id="anexo' + dataItem[campo] + '" >';
		}
	}

}

function template2(dataItem, campo) {
	if (dataItem.dataExp) {
		var dataNow = new Date().getTime();
		var datVencimento = new Date(dataItem.dataExp).getTime();
		var form = (dataItem.dataExp.split('-')[2] + '/' + (dataItem.dataExp.split('-')[1]) + '/' + dataItem.dataExp.split('-')[0]);
		if (datVencimento < dataNow) {
			if (campo == 'dataExp') {
				return "<strong style='color:red'>" + form + "</strong>";
			}
			return '<i class="fas fa-download fa-2x" onclick="openDocument(' + dataItem[campo] + ')" aria-hidden="true"; style="padding-left: 25px; color: #10c2c9;"></i>';

		} else {
			if (campo == 'dataExp') {
				return form;
			}
			return '<i class="fas fa-download fa-2x" onclick="openDocument(' + dataItem[campo] + ')" aria-hidden="true"; style="padding-left: 25px; color: #10c2c9;"></i>';
		}
	}

}
function template(dataItem, campo) {

	if (dataItem.dataExp) {
		var dataNow = new Date().getTime();
		var datVencimento = new Date(dataItem.dataExp).getTime();
		var form = (dataItem.dataExp.split('-')[2] + '/' + (dataItem.dataExp.split('-')[1]) + '/' + dataItem.dataExp.split('-')[0]);
		if (datVencimento < dataNow) {
			if (campo == 'dataExp') {
				return "<strong style='color: #ff4f4f'>" + form + "</strong>";
			}
			return "<strong style='color: #ff4f4f'>" + dataItem[campo] + "</strong>";

		} else {
			if (campo == 'dataExp') {
				return form;
			}
			return dataItem[campo];
		}
	}

}
// Templates dos Campos da Tabela do Kendo  Fim

// Set dos Campos da Tabela do Kendo  Inicio 
var kendoColumns = [
	{ field: "numSolic", title: "Código", width: '100px', template: (dataItem) => template(dataItem, "numSolic") },
	{ field: "produto", title: "Produto", width: '100px', template: (dataItem) => template(dataItem, "produto") },
	{ field: "nameArq", title: "Nome do Arquivo", width: '150px', template: (dataItem) => template6(dataItem, "numSolic") },
	{ field: "dataCreat", title: "Data da Entrada no Ged", width: '150px', template: (dataItem) => template(dataItem, "dataCreat") },
	{ field: "dataExp", class: "teste", title: "Data de Vencimento", width: '150px', template: (dataItem) => template(dataItem, "dataExp") },
	{ field: "docType", title: "Obs.:", width: '180px', template: (dataItem) => template7(dataItem, "docType") },
	{ field: "Open", title: "Baixar", width: '70px', template: (dataItem) => template2(dataItem, "numSolic") },
	{ field: "Upload", title: "Anexar", width: '70px', template: (dataItem) => template3(dataItem, "numSolic") },
	{ field: "dataExpiracao", title: "Nova Data de Vencimento", width: '160px', template: (dataItem) => template4(dataItem, "numSolic") },
	{ field: "salvarAnexo", title: "Salvar", width: '150px', template: (dataItem) => template5(dataItem, "numSolic", "notify") },
	{ field: "version", hidden: true },
	{ field: "notify", hidden: true, }
];

// Set as configurações do Kendo  Inicio

let dadosProcessos = [];
let atividades = [];
let users = [];

$(document).ready(() => {



	document.getElementsByClassName("wcm-all-content")[0].style.padding = "60px 0 0 0px";

	//movendo a widget p/ a esquerda pq ñ há barra lateral do Fluig

	var grid = $("#grid").kendoGrid({
		dataSource: {
			// Rafael comentou - Se deixar o "data" descomentado ele irá tentar trazer info para a grid e, como não há info, mostrará "undefined"
			// data: [
			// 	{numSolic: 'Loading'}
			// ],
			pageSize: 5
		},
		height: '500px',
		scrollable: true,
		columns: kendoColumns,
		toolbar: [
			"excel",
		],
		excel: {
			fileName: "processos.xlsx",
			proxyURL: "https://demos.telerik.com/kendo-ui/service/export",
			filterable: true
		},
		pageable: true,
		groupable: true,
		filterable: {
			mode: 'row'
		},
		selectable: 'multiple, row',
		resizable: true
	}).data("kendoGrid");


	var url = window.location.search.replace("?", "");
	var cod = url.split("=")[1];

	$('#cnpj').val(cod);

	pesquisarCNPJ()



});

// Set as configurações do Kendo  Fim

// Verificar se está utilizando esse código
const loadSolic = (numSolic) => {
	window.open('http://izettledobrasilmeios.fluig.cloudtotvs.com.br/portal/p/1/pageworkflowview?app_ecm_workflowview_detailsProcessInstanceID=' + numSolic);
}



// Função para Visualizar o Documento Inicio
function openDocument(docId, docVersion) {
	// var parentOBJ;
	// if (window.opener) {
	// 	parentOBJ = window.opener.parent;
	// } else {
	// 	parentOBJ = parent;
	// }
	// var cfg = {
	// 	url: "/ecm_documentview/documentView.ftl",
	// 	maximized: true,
	// 	title: "Visualizador de Documentos",
	// 	callBack: function () {
	// 		parentOBJ.ECM.documentView.getDocument(docId, docVersion);
	// 	},
	// 	customButtons: []
	// };
	// parentOBJ.ECM.documentView.panel = parentOBJ.WCMC.panel(cfg);

	var oauth = OAuth({
		consumer: {
			key: '219f5f27-e3c1-4427-be3d-afd5ef387b64',
			secret: '219f5f27-e3c1-4427-be3d-afd5ef387b64-219f5f27-e3c1-4427-be3d-afd5ef387b64'
		},
		signature_method: 'HMAC-SHA1',
		hash_function: function (base_string, key) {
			return CryptoJS.HmacSHA1(base_string, key).toString(CryptoJS.enc.Base64)
		},
		nonce_length: 6
	});

	// Tokens do usuário aplicativo para o Oauth APP cadastrado
	var token = {
		key: '4a18c0c9-e620-436c-b862-5d27705b61cf',
		secret: '6368e1e5-1dbe-4dd0-8979-63816e7810eb21dae970-885c-4238-894e-fd1d1ede14a1'
	};

	var documentId = docId;

	var request_data = {
		// Necessário passar URL completa para não dar erro de signature invalid
		url: parent.WCMAPI.getServerURL() + '/api/public/2.0/documents/getDownloadURL/' + docId,
		method: 'GET',
	};

	$.ajax({
		url: request_data.url,
		contentType: 'application/json',
		type: request_data.method,
		headers: oauth.toHeader(oauth.authorize(request_data, token)),
		success: (resp) => {

			if (resp.content.slice(-6).includes(".")) { //se o caminho do arquivo possui extensão (.png, .txt, etc)
				document.getElementById("downloadLink").setAttribute("href", resp.content);
				document.getElementById("downloadLink").click();

			} else {

				swal("Houve um problema ao gerar o download do documento. O documento não possui extensão de arquivo (ex: .png, .txt, .xlsx, etc)", {
					button: false,
					className: "kendoStyleModal"
				});
			}

			// window.open(resp.content, '_blank');

			// swal("Hello world!", {
			// 	button: false,
			// 	className: "kendoStyleModal"
			// });

			// document.getElementsByClassName("swal-text")[0].textContent = "";

			// var a = document.createElement("a");
			// a.innerHTML = "Clique aqui para baixar o documento";
			// a.setAttribute("download", "");
			// a.setAttribute("href", resp.content);

			// document.getElementsByClassName("swal-text")[0].appendChild(a);
		},
		error: (resp, err, op) => {
			console.log("aa");
		}
	});
}
// Função para Visualizar o Documento Fim


function sendDocECM(sel) {

	var dataSet = $('#validade' + sel).val();
	var dataAtual = new Date().getFullYear() + "-" + (new Date().getMonth() + 1) + "-" + new Date().getDate();

	var days = parseInt($('#salvar' + sel).attr("data-days"));

	var dataMin = new Date();
	dataMin = dataMin.setDate(dataMin.getDate() + days);

	dataMin = new Date(dataMin);

	dataMin = dataMin.getFullYear() + "-" + (dataMin.getMonth() + 1) + "-" + dataMin.getDate();



	if (new Date(dataSet).getTime() < new Date(dataAtual).getTime()) {
		FLUIGC.toast({
			title: '',
			message: 'Não é possível definir datas retroativas para o upload de documentos.',
			type: 'danger'
		});

		return 0;
	} else if (new Date(dataSet).getTime() <= new Date(dataMin).getTime()) {
		FLUIGC.toast({
			title: '',
			message: 'Validade mínima de ' + days + ' dias.',
			type: 'danger'
		});

		return 0;
	}

	else if (dataSet == "") {
		FLUIGC.toast({
			title: '',
			message: 'Insira uma data de Validade para o cocumento.',
			type: 'danger'
		});

		return 0

	} else if (listDocuments.length == 0 || listDocuments[0].length == 0) {
		FLUIGC.toast({
			title: '',
			message: 'Insira um Documento antes efetuar o envio.',
			type: 'danger'
		});

		return 0

	} else if (listDocuments.length > 1) {
		FLUIGC.toast({
			title: '',
			message: 'Por Favor insira um Documento por vez.',
			type: 'danger'
		});

		listDocuments = [];

		return 0;
	}

	else {

		var docId = sel;
		let parameterForVersion = docId;

		var constraintDocument1 = DatasetFactory.createConstraint('documentPK.documentId', docId, docId, ConstraintType.MUST);
		var constraintDocument2 = DatasetFactory.createConstraint('activeVersion', 'true', 'true', ConstraintType.MUST);
		var datasetDocument = DatasetFactory.getDataset('document', null, new Array(constraintDocument1, constraintDocument2), null);


		idDocumentUpdate = docId;
		dataStarUpdate = dataNow;
		dataExpiracaoUpdate = $('#validade' + docId).val().split('-').reverse().join("/");
		idParentUpdate = datasetDocument.values[0].parentDocumentId;

		descriptionUpdate = datasetDocument.values[0].documentDescription;
		phisicalFileUpdate = datasetDocument.values[0].phisicalFile;

		var version = Object.values(datasetDocument.values[0])
		versionUpdate = version[1];

		$.ajax({
			url: WCMAPI.serverURL + "/ecm/api/rest/ecm/widgetpartgeneralinformation/getInfGeral/" + docId + "/" + datasetDocument.values[0]["documentPK.version"] + "/2?_=1570112088626",
			method: "GET",
			contentType: "application/json",
			success: (docInfo) => {
				var novaDataValidade = dataSet.split("-").reverse().join("/");
				docInfo.expirationDate = dataExpiracaoUpdate;
				docInfo.validationStartDate = new Date().toLocaleDateString();
				docInfo.url = listDocuments[0].name;
				docInfo.notificationDays = datasetDocument.values[0]["notificationDays"];
				docInfo.additionalComments = "Validade: " + novaDataValidade;
				var data = {
					"companyId": 1,
					"documentId": docId,
					"version": datasetDocument.values[0]["documentPK.version"],
					"parentDocumentId": datasetDocument.values[0]["parentDocumentId"],
					"privateDocument": false,
					"manualVersion": false,
					"documentDescription": descriptionUpdate,
					"additionalComments": "Validade: " + novaDataValidade,
					"versionDescription": "",
					"cardDescription": null,
					"publisherId": null,
					"inheritSecurity": true,
					"uploadFolder": "http://indukerntst.fluig.com/webdesk/Upload",
					"deleteUploadFiles": true,
					"publicDocument": false,
					"inheritApprovers": true,
					"documentType": "2",
					"documentTypeId": null,
					"infGeralVO": docInfo,
					"approved": false,
					"securityPermissionVOs": null,
					"securityRestrictionVOs": null,
					"publisherApproverVOs": null,
					"activeApproverTab": false,
					"openBy": "central",
					"principalFileName": listDocuments[0].name,
					"hasParentApprover": true,
					"attachments": [listDocuments[0].name],
					"allocatedPK": null,
					"editableDocumentData": "",
					"saveDraft": false,
					"userSecurityLevel": 3,
					"defaultPropertyVO": null,
					"ckbDefaultPropertyVO": null,
					"adminUser": false,
					"phisicalFile": "",
					"folderList": null,
					"formData": null,
					"attach": null,
					"relatedFiles": null,
					"rootPrivateFolder": false,
					"tabActivated": false,
					"metaListId": null,
					"cardFormData": null,
					"changeAllActiveCards": false,
					"permissionType": 0,
					"restrictionType": 0,
					"uploadId": null,
					"oldViewer": false,
					"uploadUrl": null,
					"imutable": true,
					"hasPendentApprovals": false,
					"formDatasetVOs": [],
					"message": null,
					"internalFields": null,
					"hasApprovers": false,
					"documentPublisherApproverVOs": null
				}
				$.ajax({
					url: "http://indukerntst.fluig.com/ecm/api/rest/ecm/documentPublisher/editDocument",
					contentType: "application/json",
					method: "POST",
					data: JSON.stringify(data),
					success: (res) => {
						// console.log(res)
						FLUIGC.toast({
							title: '',
							message: 'Documento atualizado com sucesso!',
							type: 'success'
						});

						var grid = $('#grid').data('kendoGrid');
						var cod = sel;
						grid.dataSource.data().forEach((x, i) => {
							if (x.numSolic == cod) {
								var solicitacao = grid.dataSource.data()[i].get('numSolic');
								var validade = $('#validade' + solicitacao).val();
								// var nomeDocumento = $("#nameArq" + solicitacao).val();

								var dia = new Date().getDate() < 10 ? "0" + new Date().getDate() : new Date().getDate(); //apagar
								var mes = new Date().getMonth() + 1; //apagar
								var ano = new Date().getFullYear(); //apagar

								var dataHoje = dia + "/" + mes + "/" + ano; //apagar

								grid.dataSource._data[i].set('dataExp', validade);
								grid.dataSource._data[i].set('dataCreat', dataHoje); //apagar
								grid.dataSource._data[i].set('nameArq', listDocuments[0].name);

							}
						})

						listDocuments = [];
						pesquisarCNPJ();
					}
				})
			}
		})
	}
};


