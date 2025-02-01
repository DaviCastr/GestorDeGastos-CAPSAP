sap.ui.define([
    "sap/m/MessageToast",
    "sap/ui/core/util/File",
    "sap/ui/core/Fragment",
    "sap/ui/model/json/JSONModel"
], function (MessageToast, File, Fragment, JSONModel) {
    'use strict';

    return {

        exportarBackup: async function () {

            try {

                let oTabelasPessoas = sap.ui.core.Element.registry.filter(function (oControl) {
                    return oControl.isA("sap.m.Table") && oControl.getId().includes("Pessoa::LineItem-innerTable");
                });

                if (oTabelasPessoas.length > 0) {

                    let oItens = oTabelasPessoas[0].getItems();

                    if (oItens.length > 0) {

                        let oID = oItens[0].getBindingContext().getValue().ID;

                        var oDialogBackup = this.getParent(); //Diálogo 
                        var oView = this.getParent().getParent();

                        oDialogBackup.close();

                        var oDialog = new sap.m.Dialog({
                            title: "Exportar Backup",
                            type: "Message",
                            content: new sap.m.Text({ text: "Gerando backup, aguarde..." })
                        });

                        oDialog.setBusy(true);
                        oDialog.open();

                        let oNomeFuncao = 'exportarBackup';
                        let oFuncao = oView.getModel().bindContext(`/${oNomeFuncao}(...)`);
                        oFuncao.setParameter("ID", oID);
                        await oFuncao.execute();

                        let oContext = oFuncao.getBoundContext();
                        let oFile = oContext.getValue("value")

                        if (oFile.backup) {

                            // Fazendo a consulta
                            let oFiltros = [
                                new sap.ui.model.Filter("ID", sap.ui.model.FilterOperator.EQ, oFile.backup)
                            ];

                            let oBackup = await oView.getModel().bindList(`/Backup`, null, null, oFiltros).requestContexts();
                            
                            if (oBackup.length > 0) {
                                let sUrl = `${oView.getModel().getServiceUrl()}Backup(ID=${oFile.backup})/Backup`;

                                $.ajax({
                                    url: sUrl,
                                    method: "GET",
                                    headers: {
                                        "Accept": "application/x-zip-compressed"
                                    },
                                    xhrFields: {
                                        responseType: "blob"
                                    },
                                    success: async function (oData, sStatus, oXHR) {

                                        const fileContent = new Uint8Array(await oData.arrayBuffer());
                                        File.save(fileContent, "backup-gestor-de-gastos", "zip", "application/zip");
                                        MessageToast.show("Backup exportado com sucesso!");

                                        for (let backup of oBackup) {
                                            await backup.delete();
                                        }

                                        oDialog.close();

                                    },
                                    error: async function (oXHR, sStatus, sError) {

                                        for (let backup of oBackup) {
                                            await backup.delete();
                                        }

                                        MessageToast.show("Erro ao baixar o backup:"+sError);

                                        oDialog.close();
                                    }
                                });

                            }else{

                                oDialog.close();
                                MessageToast.show("Erro ao baixar o backup");

                            }

                        } else {
                            MessageToast.show("Erro ao exportar backup:" + oFile.erro);
                            oDialog.close();
                        }

                    } else {
                        MessageToast.show("É necessário ter pelo menos um cadastro de pessoa");
                    }

                }

            } catch (error) {
                MessageToast.show("Erro ao exportar backup: " + error);
                if (oDialog) {
                    oDialog.close();
                }

                if (oDialogBackup) {
                    oDialogBackup.close()
                }
            }

        },

        importarBackup: async function () {

            try {

                const oView = this.getParent().getParent();
                const oModel = oView.getModel();
                const oDialog = this.getParent();
                const oFileUploader = Fragment.byId("Backup", "fileUploader");
                const oUrlBaseUpload = `${oModel.getServiceUrl()}Backup`;
                const aFiles = oFileUploader.oFileUpload.files;

                sap.ui.core.BusyIndicator.show();

                if (!aFiles || aFiles.length === 0) {
                    MessageToast.show("Por favor, selecione um arquivo.");
                    sap.ui.core.BusyIndicator.hide();
                    return;
                }

                const oFile = aFiles[0];

                let uuidv4 = function () {
                    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
                        return v.toString(16);
                    });
                }

                let getSecurityToken = async function () {
                    return await new Promise(function (resolve, reject) {

                        fetch(oModel.getServiceUrl(), {
                            method: "GET",
                            headers: {
                                "X-CSRF-Token": "Fetch"
                            }
                        })
                            .then(function (response) {
                                if (!response.ok) {
                                    throw new Error("Erro ao obter CSRF Token");
                                }
                                return response;
                            }.bind(this))
                            .then(function (response) {
                                const csrfToken = response.headers.get("X-CSRF-Token");
                                return csrfToken;
                            }.bind(this)).then(function (csrfToken) { resolve(csrfToken) }).catch((erro) => { reject(erro) });
                    }.bind(this));
                }.bind(this)

                var oBackupCreate = {
                    "ID": uuidv4()
                };

                let oNomeFuncao = '/Backup';
                const oBindingList = oView.getModel().bindList(`${oNomeFuncao}`);
                let oBackupCriado = await oBindingList.create(oBackupCreate, false)

                oView.getModel().attachEventOnce("dataReceived", async function (oEvent) {
                    const oError = oEvent.getParameter("error"); // Verifica se houve erro
                    if (oError) {
                        const oResponse = oBackupCreate.parse(oError.responseText || "{}");
                        const errorMessage = oResponse.error?.message || "Erro ao criar registro!";
                        MessageToast.show(errorMessage);
                        sap.ui.core.BusyIndicator.hide();
                    } else if (oBackupCriado) {
                        // Recupera os dados do contexto criado
                        try {

                            const oCreatedEntity = oBackupCriado.getObject();
                            const oModelJson = new JSONModel(oCreatedEntity);

                            oFileUploader.removeAllHeaderParameters();

                            let oToken = await getSecurityToken();

                            oFileUploader.addHeaderParameter(new sap.ui.unified.FileUploaderParameter({
                                name: "x-csrf-token",
                                value: oToken
                            }));

                            var oETagHeader = new sap.ui.unified.FileUploaderParameter({
                                name: "If-Match",
                                value: oCreatedEntity["@odata.etag"] || "*" // Use "*" para ignorar a validação de ETag (se permitido)
                            });

                            oFileUploader.insertHeaderParameter(oETagHeader);

                            var oContentType = new sap.ui.unified.FileUploaderParameter({
                                name: "Content-Type",
                                value: oFile.type
                            });

                            oFileUploader.insertHeaderParameter(oContentType);

                            var oAccept = new sap.ui.unified.FileUploaderParameter({
                                name: "Accept",
                                value: "application/oBackupCreate"
                            });

                            oFileUploader.insertHeaderParameter(oAccept);
                            oFileUploader.setModel(oModelJson, "Backup");
                            oFileUploader.setUploadUrl(`${oUrlBaseUpload}(${oCreatedEntity.ID})/Backup`);
                            oFileUploader.setSendXHR(true);
                            oFileUploader.upload();
                            console.log("Dados criados:", oCreatedEntity);

                        } catch (error) {

                            MessageToast.show("Erro desconhecido durante a importação" + error);
                            sap.ui.core.BusyIndicator.hide();
                        }

                    } else {
                        MessageToast.show("Erro desconhecido durante a importação!");
                        sap.ui.core.BusyIndicator.hide();
                    }
                }.bind(this));

            } catch (oError) {
                MessageToast.show("Erro ao importar o arquivo: " + oError.message);
                MessageToast.show("Tamanho de arquivo excedido");
                sap.ui.core.BusyIndicator.hide();
            }

        },

        onUploadCompleto(oEvent) {
            const oDialog = Fragment.byId("Backup", "dialogBackup");
            const oModel = this.getModel();
            const oResponse = oEvent.getParameter("responseRaw");
            const oStatus = oEvent.getParameter("status");
            oEvent.getSource().setValue("");

            var oProgressBar = Fragment.byId("Backup", "uploadProgresso");
            oProgressBar.setPercentValue(0);
            oProgressBar.setDisplayValue("0%");
            oProgressBar.setVisible(false);

            if (oStatus != 204) {

                let oErro = JSON.parse(oResponse)

                MessageToast.show(`Erro:${oErro.error.message}-${oErro.error.target}`);

            } else {

                oModel.refresh();

                let oTabelasCartoes = sap.ui.core.Element.registry.filter(function (oControl) {
                    return oControl.isA("sap.m.Table") && oControl.getId().includes("innerTable");
                });

                if (oTabelasCartoes.length > 0) {

                    let oCartoes = oTabelasCartoes[0];
                    oCartoes.refreshItems()

                }

                MessageToast.show("Backup importado.")

            }

            try {

                var oBackupDelete = {
                    "ID": oEvent.getSource().getModel("Backup").getData().ID
                };

                let oFiltros = [
                    new sap.ui.model.Filter("ID", sap.ui.model.FilterOperator.EQ, oBackupDelete.ID),
                ];

                let oNomeFuncao = `/Backup`;
                oModel.bindList(`${oNomeFuncao}`, null, null, oFiltros).requestContexts().then(async function (oContextos) {
                    if (oContextos.length > 0) {
                        for (let oBackup of oContextos) {
                            await oBackup.delete();
                        }
                    }
                });

            } catch (error) {
                console.log(error);
            }

            oDialog.close();
            sap.ui.core.BusyIndicator.hide();
        },

        onUploadAbortado(oEvent) {
            const sResponse = oEvent.getParameter("response");
            if (sResponse) {
                var oResponse = oBackupCreate.parse(sResponse);
                MessageToast.show(oResponse.error.message);
            }
            sap.ui.core.BusyIndicator.hide();
        },

        onModificaArquivo(oEvent) {

            // Reinicia a barra de progresso ao selecionar um novo arquivo e exibe-a
            var oProgressBar = Fragment.byId("Backup", "uploadProgresso");
            oProgressBar.setVisible(false); // Oculta inicialmente
            oProgressBar.setPercentValue(0);
            oProgressBar.setDisplayValue("0%");

        },

        onUploadProgresso(oEvent) {

            // Obtém os dados do progresso
            var oUploaded = oEvent.getParameter("loaded"); // Bytes já carregados
            var oTotal = oEvent.getParameter("total"); // Tamanho total em bytes

            // Calcula o progresso em porcentagem
            var oProgress = Math.round((oUploaded / oTotal) * 100);

            // Atualiza a barra de progresso
            var oProgressBar = Fragment.byId("Backup", "uploadProgresso");
            oProgressBar.setVisible(true); // Exibe a barra durante o upload
            oProgressBar.setPercentValue(oProgress);
            oProgressBar.setDisplayValue(oProgress + "%");

        },

        cancelarBackup: function (oEvent) {

            this.getParent().close();

        }
    }

});