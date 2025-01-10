sap.ui.define(["sap/m/MessageToast","sap/ui/comp/valuehelpdialog/ValueHelpDialog","sap/ui/model/Filter","sap/ui/model/FilterOperator"],function(e,t,a,s){"use strict";return{onInit:function(e){console.log(e)},onCancelarGasto:function(e){this.getParent().close()},onAdicionarGasto:async function(e){const t=this.getParent().getParent();const a=this.getParent();a.setBusy(true);var s=t.byId("descricaoGastoInput");var o=t.byId("valorGastoInput");var l=t.byId("moedaGastoInput");var r=t.byId("dataGastoPicker");var i=t.byId("gastoFixoCheckBox");var n=t.byId("totalParcelasInput");var u=t.byId("cartaoSelect");var c=true;if(!s.getValue()){s.setValueState("Error");c=false}else if(s.getValue()==" "){s.setValueState("Error");c=false}else{s.setValueState("None")}if(!o.getValue()){o.setValueState("Error");c=false}else if(o.getValue()==0){o.setValueState("Error");c=false}else if(o.getValue()<0){o.setValueState("Error");c=false}else{o.setValueState("None")}if(!l.getValue()){l.setValueState("Error");c=false}else{let e=t.getModel("Moedas").getData().filter(e=>[l.getValue()].includes(e.code));if(e.length==0){l.setValueState("Error");c=false}else{l.setValueState("None")}}if(!r.getValue()){r.setValueState("Error");c=false}else{r.setValueState("None")}if(!n.getValue()){n.setValueState("Error");c=false}else if(n.getValue()==0){n.setValueState("Error");c=false}else{n.setValueState("None")}if(!u.getSelectedKey()){u.setValueState("Error");c=false}else{u.setValueState("None")}if(!c){sap.m.MessageToast.show("Por favor, preencha todos os campos obrigatórios.");a.setBusy(false);return}if(i.getSelected()&&n.getValue()>1){sap.m.MessageToast.show("Quando o gasto é fixo a parcela deve ser igual a 1");a.setBusy(false);return}const d=t.byId("descricaoGastoInput").getValue();const g=t.byId("valorGastoInput").getValue();const p=t.byId("moedaGastoInput").getValue();const f=t.byId("dataGastoPicker").getValue();const V=t.byId("totalParcelasInput").getValue();const m=t.byId("gastoFixoCheckBox").getSelected();const h=t.byId("cartaoSelect").getSelectedKey();const b=f.split("/");const I=`${b[2]}-${b[1]}-${b[0]}`;var y=new Date(f.split("/").reverse().join("-"));if(isNaN(y.getTime())){r.setValueState("Error");sap.m.MessageToast.show("Data inválida. Por favor, insira uma data válida.");a.setBusy(false);return}const S={pessoa:this.getBindingContext().getValue().ID,descricao:d,valor:parseFloat(g),moeda:p,data:I,parcelas:parseInt(V,10),gastofixo:m,cartao:h};let v="adicionarGasto";const P=t.getModel().bindContext(`/${v}(...)`);P.setParameter("pessoa",S.pessoa);P.setParameter("descricao",S.descricao);P.setParameter("valor",S.valor);P.setParameter("moeda",S.moeda);P.setParameter("data",S.data);P.setParameter("parcelas",S.parcelas);P.setParameter("gastofixo",S.gastofixo);P.setParameter("cartao",S.cartao);await P.execute();a.setBusy(false);const x=P.getBoundContext();let w=x.getProperty("sucesso");if(w){s.setValue("");o.setValue(0);r.setValue("");n.setValue(1);i.setSelected(false);let e=sap.ui.core.Element.registry.filter(function(e){return e.isA("sap.m.Table")&&e.getId().includes("innerTable")});let t=e[0];t.refreshItems();const l=this.getBindingContext();l.refresh();let u=sap.ui.core.Element.registry.filter(function(e){return e.isA("sap.m.VBox")&&e.getId().includes("FaturaAtualVBox")});if(u.length){let e=u[0];e.getBindingContext().refresh()}a.close();sap.m.MessageToast.show("Gasto adicionado com sucesso!")}},onValueHelpRequest:function(e){var o=this.getParent().getParent().getParent().getParent();if(!this._oValueHelpDialog){this._oValueHelpDialog=new t({title:"Selecione a Moeda",supportMultiselect:false,key:"code",width:"200px",descriptionKey:"descr",supportRanges:false,filterMode:true,basicSearchText:"",ok:function(e){var t=e.getParameter("tokens");if(t.length>0){var a=t[0].getKey();o.byId("moedaGastoInput").setValue(a)}this._oValueHelpDialog.close()}.bind(this),cancel:function(){this._oValueHelpDialog.close()}.bind(this)});this._oValueHelpDialog.setFilterBar(new sap.ui.comp.filterbar.FilterBar({basicSearch:new sap.m.SearchField({placeholder:"Buscar...",liveChange:function(e){var t=e.getParameter("newValue");var o=new a({filters:[new a("code",s.Contains,t),new a("name",s.Contains,t)],and:false});l.getBinding("rows").filter(o)}})}));var l=this._oValueHelpDialog.getTable();l.setModel(o.getModel("Moedas"));l.bindRows("Moedas>/");l.addColumn(new sap.ui.table.Column({label:new sap.m.Label({text:"Código"}),template:new sap.m.Text({text:"{Moedas>code}"})}));l.addColumn(new sap.ui.table.Column({label:new sap.m.Label({text:"Descrição"}),template:new sap.m.Text({text:"{Moedas>descr}"})}));o.addDependent(this._oValueHelpDialog)}this._oValueHelpDialog.open()}}});
//# sourceMappingURL=AdicionarGasto.js.map