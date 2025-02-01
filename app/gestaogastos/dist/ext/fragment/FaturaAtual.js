<<<<<<< HEAD
sap.ui.define(["sap/m/MessageToast","sap/ui/core/Fragment","sap/ui/model/json/JSONModel","sap/ui/model/Filter","sap/ui/model/FilterOperator"],function(e,t,a,i,r){"use strict";return{onPress:function(t){e.show("Custom handler invoked.")},formatter:{formatDate:function(e){if(!e){return""}const t=new Date(`${e}T00:00:00`);const a=String(t.getDate()).padStart(2,"0");const i=String(t.getMonth()+1).padStart(2,"0");const r=t.getFullYear();return`${a}/${i}/${r}`}},excluirTransacao:async function(e){let i=sap.ui.core.Element.registry.filter(function(e){return e.isA("sap.ui.layout.form.SimpleForm")&&e.getId().includes("idFaturaForm")});let r=i[0];let o=sap.ui.core.Element.registry.filter(function(e){return e.isA("sap.m.Table")&&e.getId().includes("transactionsTable")});let s=o[0];const n=s.getSelectedItems();if(n.length===0){sap.m.MessageToast.show("Selecione uma transação para excluir.");return}let l=r.getBindingContext().getValue();let u=n[0].getBindingContext().getValue();const c=this._view;const d=this._view.getModel();sap.ui.getCore().oFatura=l;if(u.ID){var g=function(){return new Promise(function(e,i){try{fetch(`${d.getServiceUrl()}Transacao?$filter=Identificador eq ${u.Identificador} and ID ne ${u.ID}`,{method:"GET",headers:{"Content-Type":"application/json",Accept:"application/json"}}).then(async function(i){console.log(i);let r=await i.json();let o=Array.isArray(r.value)?r.value:[r.value];o=o.sort(function(e,t){return t.Parcela-e.Parcela});let s={Dados:u,Fixo:u.ParcelasTotais==1&&o.length>0?true:false,Relacionadas:o};const n=new a(s);if(!sap.ui.getCore().pDialogExcluir){sap.ui.getCore().pDialogExcluir=t.load({id:"ExcluirTransacaoFragment",name:"apps.dflc.gestaogastos.ext.fragment.ExcluirTransacao"}).then(function(e){c.addDependent(e);return e})}sap.ui.getCore().pDialogExcluir.then(function(e){e.open();e.setModel(n,"Transacao")}.bind(this));e()}.bind(this)).catch(function(e){sap.m.MessageToast.show("Erro ao chamar serviço de Transações: "+e);i()})}catch(e){sap.m.MessageToast.show("Erro ao chamar serviço: "+e.message)}}.bind(this))}.bind(this);let e={busy:{set:true,check:true},dataloss:{popup:true,navigation:false}};this.editFlow.securedExecution(g,e).finally(e=>{console.log(e)})}},mudarCategoria:async function(i){try{let i=sap.ui.core.Element.registry.filter(function(e){return e.isA("sap.ui.layout.form.SimpleForm")&&e.getId().includes("idFaturaForm")});let r=i[0];let o=sap.ui.core.Element.registry.filter(function(e){return e.isA("sap.m.Table")&&e.getId().includes("transactionsTable")});let s=o[0];const n=s.getSelectedItems();if(n.length===0){sap.m.MessageToast.show("Selecione uma transação para mudar.");return}sap.ui.core.BusyIndicator.show();let l=r.getBindingContext().getValue();sap.ui.getCore().oFatura=l;let u=n[0].getBindingContext().getValue();const c=this._view,d=c.getModel();if(!l.Cartao_ID){let e=[new sap.ui.model.Filter("ID",sap.ui.model.FilterOperator.EQ,l.ID)];let t=await d.bindList(`/Fatura`,null,null,e).requestContexts();if(t.length>0){l=t[0].getObject()}}if(!u.Categoria_ID){let e=[new sap.ui.model.Filter("ID",sap.ui.model.FilterOperator.EQ,u.ID)];let t=await d.bindList(`/Transacao`,null,null,e).requestContexts();if(t.length>0){u=t[0].getObject()}}if(u.Categoria_ID){let e=[new sap.ui.model.Filter("ID",sap.ui.model.FilterOperator.EQ,u.Categoria_ID)];let i=`/Categoria`;d.bindList(`${i}`,null,null,e).requestContexts().then(async function(e){if(e.length>0){for(let i of e){i=i.getValue();let e=[new sap.ui.model.Filter("Pessoa_ID",sap.ui.model.FilterOperator.EQ,i.Pessoa_ID)];let r=`/Categoria`;let o=await d.bindList(`${r}`,null,null,e).requestContexts();u.Categoria=i;let s={Dados:u,Categorias:o.map(e=>e.getObject())};const n=new a(s);if(!sap.ui.getCore().pMudar){sap.ui.getCore().pMudar=t.load({id:"MudarCategoria",name:"apps.dflc.gestaogastos.ext.fragment.MudarCategoria"}).then(function(e){c.addDependent(e);return e})}sap.ui.getCore().pMudar.then(function(e){e.open();e.setModel(n,"TransacaoMudar");sap.ui.core.BusyIndicator.hide()}.bind(this))}}}.bind(this))}else{let i={};if(sap.ui.getCore().oCartao?.Pessoa_ID){i=sap.ui.getCore().oCartao}else{let e=[new sap.ui.model.Filter("ID",sap.ui.model.FilterOperator.EQ,l.Cartao_ID)];let t=await d.bindList(`/Cartao`,null,null,e).requestContexts();if(t.length>0){i=t[0].getObject()}}if(i.Pessoa_ID){let r={ID:"sem",Nome:"Sem categoria"};let o=[new sap.ui.model.Filter("Pessoa_ID",sap.ui.model.FilterOperator.EQ,i.Pessoa_ID)];let s=`/Categoria`;let n=await d.bindList(`${s}`,null,null,o).requestContexts();if(n.length==0){e.show("Não há categorias cadastradas.");sap.ui.core.BusyIndicator.hide();return}u.Categoria=r;let l={Dados:u,Categorias:n.map(e=>e.getObject())};const g=new a(l);if(!sap.ui.getCore().pMudar){sap.ui.getCore().pMudar=t.load({id:"MudarCategoria",name:"apps.dflc.gestaogastos.ext.fragment.MudarCategoria"}).then(function(e){c.addDependent(e);return e})}sap.ui.getCore().pMudar.then(function(e){e.open();e.setModel(g,"TransacaoMudar");sap.ui.core.BusyIndicator.hide()}.bind(this))}else{e.show("Erro ao buscar categoria");sap.ui.core.BusyIndicator.hide()}}}catch(t){e.show("Erro ao buscar categoria: "+t);sap.ui.core.BusyIndicator.hide()}},pesquisarTransacao:function(e){var t=[],a=e.getParameter("query");if(a&&a.length>0){t=[new i({filters:[new i("Descricao",r.Contains,a)]})]}let o=sap.ui.core.Element.registry.filter(function(e){return e.isA("sap.m.Table")&&e.getId().includes("transactionsTable")});let s=o[0];if(s){s.getBinding("items").filter(t,"Application")}}}});
=======
sap.ui.define(["sap/m/MessageToast","sap/ui/core/Fragment","sap/ui/model/json/JSONModel"],function(e,t,a){"use strict";return{onPress:function(t){e.show("Custom handler invoked.")},formatter:{formatDate:function(e){if(!e){return""}const t=new Date(`${e}T00:00:00`);const a=String(t.getDate()).padStart(2,"0");const n=String(t.getMonth()+1).padStart(2,"0");const s=t.getFullYear();return`${a}/${n}/${s}`}},excluirTransacao:async function(e){let n=sap.ui.core.Element.registry.filter(function(e){return e.isA("sap.ui.layout.form.SimpleForm")&&e.getId().includes("idFaturaForm")});let s=n[0];let o=sap.ui.core.Element.registry.filter(function(e){return e.isA("sap.m.Table")&&e.getId().includes("transactionsTable")});let i=o[0];const r=i.getSelectedItems();if(r.length===0){sap.m.MessageToast.show("Selecione uma transação para excluir.");return}let c=s.getBindingContext().getValue();let l=r[0].getBindingContext().getValue();const u=this._view;sap.ui.getCore().oFatura=c;if(l.ParcelasTotais>1){var d=()=>new Promise((e,n)=>{try{fetch(`/Gerenciamento/Transacao?$filter=Identificador eq ${l.Identificador} and ID ne ${l.ID}`,{method:"GET",headers:{"Content-Type":"application/json",Accept:"application/json"}}).then(async function(n){console.log(n);let s=await n.json();let o=Array.isArray(s.value)?s.value:[s.value];o=o.sort(function(e,t){return t.Parcela-e.Parcela});let i={Dados:l,Relacionadas:o};const r=new a(i);u.setModel(r,"Transacao");if(!this.pDialog){this.pDialog=t.load({id:u.getId(),name:"apps.dflc.gestaogastos.ext.fragment.ExcluirTransacao"}).then(function(e){u.addDependent(e);return e})}this.pDialog.then(function(e){e.open()});e()}.bind(this)).catch(function(e){sap.m.MessageToast.show("Erro ao chamar serviço de Transações: "+e);n()})}catch(e){sap.m.MessageToast.show("Erro ao chamar serviço: "+e.message)}});let e={busy:{set:true,check:true},dataloss:{popup:true,navigation:false}};this.editFlow.securedExecution(d,e).finally(e=>{console.log(e)})}else{let e={Dados:l,Relacionadas:[]};const n=new a(e);u.setModel(n,"Transacao");if(!this.pDialog){this.pDialog=t.load({id:u.getId(),name:"apps.dflc.gestaogastos.ext.fragment.ExcluirTransacao"}).then(function(e){u.addDependent(e);return e})}this.pDialog.then(function(e){e.open()})}},pesquisarTransacao:function(e){var t=[],a=e.getParameter("query");if(a&&a.length>0){t=[new Filter("Name",FilterOperator.Contains,a)]}const n=this._view.byId("transactionsTable").getBinding("items").filter(t,"Application")}}});
>>>>>>> 7f01fe1936688df1011ce89337a57e281209142a
//# sourceMappingURL=FaturaAtual.js.map