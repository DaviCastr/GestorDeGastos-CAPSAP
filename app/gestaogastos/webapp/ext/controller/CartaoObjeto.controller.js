sap.ui.define([
	'sap/ui/core/mvc/ControllerExtension',
	"sap/ui/model/json/JSONModel",
	"apps/dflc/gestaogastos/ext/fragment/AnaliseCategoriaCartao"],
	function (ControllerExtension, JSONModel, AnaliseCategoriaCartao) {
		'use strict';

		return ControllerExtension.extend('apps.dflc.gestaogastos.ext.controller.CartaoObjeto', {
			// this section allows to extend lifecycle hooks or hooks provided by Fiori elements

			defineModeloFaturaAtual: async function (oBindingContext) {

				//Pesquisa formulário da fatura
				let oPainelSemFatura = sap.ui.core.Element.registry.filter(function (oControl) {
					return oControl.isA("sap.m.Panel") && oControl.getId().includes("PainelSemFatura");
				});

				//Paineis de fatura atual
				let oPaineis = sap.ui.core.Element.registry.filter(function (oControl) {
					return oControl.isA("sap.m.Panel") && oControl.getId().includes("PainelFatura")
						|| oControl.isA("sap.m.Panel") && oControl.getId().includes("PainelTransacoes");
				});

				let oVBoxs = sap.ui.core.Element.registry.filter(function (oControl) {
					return oControl.isA("sap.m.VBox") && oControl.getId().includes("FaturaAtualVBox");
				});

				if (Array.isArray(oPainelSemFatura)) {

					oPainelSemFatura[0].setVisible(false);

				}

				if (Array.isArray(oPaineis)) {
					oPaineis.forEach(painel => {
						painel.setVisible(false);
					});
				}

				let oVBoxFaturaAtual = oVBoxs[0];

				oVBoxFaturaAtual.setBusy(true)

				setTimeout(async function () {

					if (this.getView().getModel('ui').getData().isEditable == false) {

						let oCartao = {};

						if (oBindingContext) {

							oCartao = await oBindingContext.requestObject(oBindingContext.getPath());
			
						} else if (sap.ui.getCore().oCartao) {

							oCartao = sap.ui.getCore().oCartao;

						}

						if (!oCartao.ID) {

							do {

								await this.wait();

								oCartao = await oBindingContext.requestObject(oBindingContext.getPath());

							} while (!oCartao.ID);

						}

						const oView = this.getView();
						const oFunctionName = "Fatura"; // Nome da função para consulta
						const oCartaoId = oCartao.ID;  // ID do cartão
						let oDateAtual = new Date().toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" });
						oDateAtual = oDateAtual.replaceAll(",", " ");
						let [oDay, oMes, oAno] = oDateAtual.split(" ")[0].split("/");

						oDay = Number(oDay);
						oMes = Number(oMes);
						oAno = Number(oAno);

						if (oCartao.DiaFechamento > oCartao.DiaVencimento) {

							if (oMes == 12) {
								oMes = 1;
								oAno += 1;
							} else {
								oMes += 1;
							}

						}

						const oModel = oView.getModel();

						if (oCartao.DiaFechamento <= oDay) {

							if (oMes < 12) {
								oMes += 1;
							} else {
								oMes = 1
								oAno += 1
							}

						}

						// Configurando os filtros
						let oFiltros = [
							new sap.ui.model.Filter("Cartao_ID", sap.ui.model.FilterOperator.EQ, oCartaoId),
							new sap.ui.model.Filter("Ano", sap.ui.model.FilterOperator.EQ, oAno),
							new sap.ui.model.Filter("Mes", sap.ui.model.FilterOperator.EQ, oMes),
						];

						// Fazendo a consulta
						oModel.bindList(`/${oFunctionName}`, null, null, oFiltros).requestContexts().then(async function (oContextos) {
							if (oContextos.length > 0) {
								// Obtendo o primeiro resultado
								const oContext = oContextos[0];

								oVBoxFaturaAtual.bindElement(oContext.getPath())
								oVBoxFaturaAtual.setModel(oContext.oModel);

								//Pesquisa tabelas da tela para manipulação
								let oTabelas = sap.ui.core.Element.registry.filter(function (oControl) {
									return oControl.isA("sap.m.Table") && oControl.getId().includes("transactionsTable");
								});

								if (oTabelas.length > 0) {

									var oBinding = oTabelas[0].getBinding("items");

									if (oBinding) {
										// Configura o sorter para o campo "Data" (ordem crescente)
										var oSorter = new sap.ui.model.Sorter("Data", false);
										oBinding.sort(oSorter);
									}

								}

								if (Array.isArray(oPaineis)) {
									oPaineis.forEach(painel => {
										painel.setVisible(true);
									});
								}

								oVBoxFaturaAtual.setBusy(false);

							} else {

								if (Array.isArray(oPainelSemFatura)) {

									oPainelSemFatura[0].setVisible(true);

								}

								oVBoxFaturaAtual.setBusy(false);

								console.warn("Nenhuma fatura encontrada.");
							}

						}.bind(this)).catch((error) => {
							console.error("Erro ao buscar a fatura:", error);
						});

					}

				}.bind(this), 5000);

			},

			defineCategoriasFaturaAtual: async function (oBindingContext) {

				AnaliseCategoriaCartao.defineCategoriasFaturaAtual(this, oBindingContext);

			},

			sleep: function (ms) {
				return new Promise(resolve => setTimeout(resolve, ms));
			},

			wait: async function () {
				await this.sleep(500);
			},

			override: {
				/**
				 * Called when a controller is instantiated and its View controls (if available) are already created.
				 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
				 * @memberOf apps.dflc.gestaogastos.ext.controller.CartaoObjeto
				 */

				onInit: function (oEvent) {

					//Pesquisa formulário da fatura
					let oPainelSemFatura = sap.ui.core.Element.registry.filter(function (oControl) {
						return oControl.isA("sap.m.Panel") && oControl.getId().includes("PainelSemFatura");
					});

					//Paineis de fatura atual
					let oPaineis = sap.ui.core.Element.registry.filter(function (oControl) {
						return oControl.isA("sap.m.Panel") && oControl.getId().includes("PainelFatura") || oControl.getId().includes("PainelTransacoes");
					});

					let oVBoxs = sap.ui.core.Element.registry.filter(function (oControl) {
						return oControl.isA("sap.m.VBox") && oControl.getId().includes("FaturaAtualVBox");
					});

					if (Array.isArray(oPainelSemFatura)) {

						oPainelSemFatura[0].setVisible(false);

					}

					if (Array.isArray(oPaineis)) {
						oPaineis.forEach(painel => {
							painel.setVisible(false);
						});
					}

					let oVBoxFaturaAtual = oVBoxs[0];

					let oJsonFaturaAtual = {
						Ano: '',
						Mes: '',
						Descricao: '',
						ValorTotal: '',
						Moeda_code: '',
						Transacoes: []
					}

					let oJsonModelo = new JSONModel(oJsonFaturaAtual);

					oVBoxFaturaAtual.setModel(oJsonModelo);
					oVBoxFaturaAtual.setBusy(true)

				},

				routing: {

					onAfterBinding: async function (oBindingContext) {

						this.defineModeloFaturaAtual(oBindingContext);


						this.defineCategoriasFaturaAtual(oBindingContext);

					},
				}
			}
		});
	});
