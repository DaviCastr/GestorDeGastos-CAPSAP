sap.ui.define(["sap/ui/core/mvc/ControllerExtension","sap/ui/model/json/JSONModel","apps/dflc/gestaogastos/ext/fragment/AnaliseCategoriaCartao"],function(e,t,a){"use strict";return e.extend("apps.dflc.gestaogastos.ext.controller.CartaoObjeto",{defineModeloFaturaAtual:async function(e){let t=sap.ui.core.Element.registry.filter(function(e){return e.isA("sap.m.Panel")&&e.getId().includes("PainelSemFatura")});let a=sap.ui.core.Element.registry.filter(function(e){return e.isA("sap.m.Panel")&&e.getId().includes("PainelFatura")||e.isA("sap.m.Panel")&&e.getId().includes("PainelTransacoes")});let i=sap.ui.core.Element.registry.filter(function(e){return e.isA("sap.m.VBox")&&e.getId().includes("FaturaAtualVBox")});if(Array.isArray(t)){t[0].setVisible(false)}if(Array.isArray(a)){a.forEach(e=>{e.setVisible(false)})}let s=i[0];s.setBusy(true);setTimeout(async function(){if(this.getView().getModel("ui").getData().isEditable==false){let i={};if(e){i=await e.requestObject(e.getPath())}else if(sap.ui.getCore().oCartao){i=sap.ui.getCore().oCartao}if(!i.ID){do{await this.wait();i=await e.requestObject(e.getPath())}while(!i.ID)}const r=this.getView();const n="Fatura";const l=i.ID;let o=(new Date).toLocaleString("pt-BR",{timeZone:"America/Sao_Paulo"});o=o.replaceAll(","," ");let[u,c,f]=o.split(" ")[0].split("/");u=Number(u);c=Number(c);f=Number(f);if(i.DiaFechamento>i.DiaVencimento){if(c==12){c=1;f+=1}else{c+=1}}const d=r.getModel();if(i.DiaFechamento<=u){if(c<12){c+=1}else{c=1;f+=1}}let g=[new sap.ui.model.Filter("Cartao_ID",sap.ui.model.FilterOperator.EQ,l),new sap.ui.model.Filter("Ano",sap.ui.model.FilterOperator.EQ,f),new sap.ui.model.Filter("Mes",sap.ui.model.FilterOperator.EQ,c)];d.bindList(`/${n}`,null,null,g).requestContexts().then(async function(e){if(e.length>0){const t=e[0];s.bindElement(t.getPath());s.setModel(t.oModel);let n=sap.ui.core.Element.registry.filter(function(e){return e.isA("sap.m.Table")&&e.getId().includes("transactionsTable")});if(n.length>0){var i=n[0].getBinding("items");if(i){var r=new sap.ui.model.Sorter("Data",false);i.sort(r)}}if(Array.isArray(a)){a.forEach(e=>{e.setVisible(true)})}s.setBusy(false)}else{if(Array.isArray(t)){t[0].setVisible(true)}s.setBusy(false);console.warn("Nenhuma fatura encontrada.")}}.bind(this)).catch(e=>{console.error("Erro ao buscar a fatura:",e)})}}.bind(this),5e3)},defineCategoriasFaturaAtual:async function(e){a.defineCategoriasFaturaAtual(this,e)},sleep:function(e){return new Promise(t=>setTimeout(t,e))},wait:async function(){await this.sleep(500)},override:{onInit:function(e){let a=sap.ui.core.Element.registry.filter(function(e){return e.isA("sap.m.Panel")&&e.getId().includes("PainelSemFatura")});let i=sap.ui.core.Element.registry.filter(function(e){return e.isA("sap.m.Panel")&&e.getId().includes("PainelFatura")||e.getId().includes("PainelTransacoes")});let s=sap.ui.core.Element.registry.filter(function(e){return e.isA("sap.m.VBox")&&e.getId().includes("FaturaAtualVBox")});if(Array.isArray(a)){a[0].setVisible(false)}if(Array.isArray(i)){i.forEach(e=>{e.setVisible(false)})}let r=s[0];let n={Ano:"",Mes:"",Descricao:"",ValorTotal:"",Moeda_code:"",Transacoes:[]};let l=new t(n);r.setModel(l);r.setBusy(true)},routing:{onAfterBinding:async function(e){this.defineModeloFaturaAtual(e);this.defineCategoriasFaturaAtual(e)}}}})});
//# sourceMappingURL=CartaoObjeto.controller.js.map