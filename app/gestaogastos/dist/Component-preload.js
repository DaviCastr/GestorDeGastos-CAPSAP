//@ui5-bundle apps/dflc/gestaogastos/Component-preload.js
sap.ui.require.preload({
	"apps/dflc/gestaogastos/Component.js":function(){
sap.ui.define(["sap/fe/core/AppComponent"],function(e){"use strict";return e.extend("apps.dflc.gestaogastos.Component",{metadata:{manifest:"json"}})});
},
	"apps/dflc/gestaogastos/ext/controller/AdicionarGasto.js":function(){
sap.ui.define(["sap/m/MessageToast","sap/ui/core/Fragment","sap/ui/model/json/JSONModel"],function(e,t,o){"use strict";return{adicionarGasto:function(e){const a=this.editFlow.getView();const s=a.getModel();var n=()=>new Promise((e,s)=>{try{fetch(`/Gerenciamento/Currencies`,{method:"GET",headers:{"Content-Type":"application/json",Accept:"application/json"}}).then(async function(t){console.log(t);let s=await t.json();const n=new o(s.value.flat());a.setModel(n,"Moedas");e()}.bind(this)).catch(function(e){sap.m.MessageToast.show("Erro ao chamar serviço de Moedas: "+e);s()});const n={Pessoa_ID:this.getBindingContext().getObject().ID};fetch(`/Gerenciamento/Cartao?$filter=Pessoa_ID eq ${n.Pessoa_ID}`,{method:"GET",headers:{"Content-Type":"application/json",Accept:"application/json"}}).then(async function(s){console.log(s);let n=await s.json();let i;if(Array.isArray(n.value))i=n.value;else i=[n.value];const c=new o(i);a.setModel(c,"Cartoes");if(!this.pDialog){this.pDialog=t.load({id:a.getId(),name:"apps.dflc.gestaogastos.ext.fragment.AdicionarGasto"}).then(function(e){a.addDependent(e);return e})}this.pDialog.then(function(e){e.open()});e()}.bind(this)).catch(function(e){sap.m.MessageToast.show("Erro ao chamar serviço: "+e);s()})}catch(e){sap.m.MessageToast.show("Erro ao chamar serviço: "+e.message)}});let i={busy:{set:true,check:true},dataloss:{popup:true,navigation:false}};this.editFlow.securedExecution(n,i).finally(e=>{console.log(e)})}}});
},
	"apps/dflc/gestaogastos/ext/controller/CartaoObjeto.controller.js":function(){
sap.ui.define(["sap/ui/core/mvc/ControllerExtension","sap/ui/model/json/JSONModel"],function(e,n){"use strict";return e.extend("apps.dflc.gestaogastos.ext.controller.CartaoObjeto",{override:{onInit:function(){var e=this.base.getExtensionAPI().getModel();var t={Ano:2025,Mes:1};const o=new n(t);this.getView().setModel(o,"Variantes")},onBeforeRendering:function(e){let t=sap.ui.core.Element.registry.filter(function(e){return e.isA("sap.m.Table")&&e.getId().includes("Fatura")});let o=t[0];var s={Ano:2025,Mes:1};const i=new n(s);this.getView().setModel(i,"Variantes")},onAfterRendering:function(e){var t={Ano:2025,Mes:1};const o=new n(t);this.getView().setModel(o,"Variantes")},routing:{onAfterBinding:async function(e){var t={Ano:2025,Mes:1};const o=new n(t);this.getView().setModel(o,"Variantes")},onBeforeBinding:async function(e){var t={Ano:2025,Mes:1};const o=new n(t);this.getView().setModel(o,"Variantes")}}}})});
},
	"apps/dflc/gestaogastos/ext/controller/ExcluirTransacao.js":function(){
sap.ui.define(["sap/m/MessageToast","sap/ui/core/Fragment","sap/ui/model/json/JSONModel"],function(e,a,t){"use strict";return{excluirTransacao:function(e){let n=sap.ui.core.Element.registry.filter(function(e){return e.isA("sap.m.Table")&&e.getId().includes("i18nTransaescompras-innerTable")});let o=n[0];let s=o.getSelectedItems()[0].getBindingContext().getValue();const i=this.getBindingContext().getValue();const r=this.editFlow.getView();if(s.ParcelasTotais>1){var c=()=>new Promise((e,n)=>{try{fetch(`/Gerenciamento/Transacao?$filter=ID eq ${s.ID}`,{method:"GET",headers:{"Content-Type":"application/json",Accept:"application/json"}}).then(async function(o){console.log(o);let i=await o.json();let c=Array.isArray(i.value)?i.value:[i.value];if(!o.ok){throw new Error("Erro ao selecionar transações")}s=c[0];fetch(`/Gerenciamento/Transacao?$filter=Identificador eq ${s.Identificador} and ID ne ${s.ID}`,{method:"GET",headers:{"Content-Type":"application/json",Accept:"application/json"}}).then(async function(n){console.log(n);let o=await n.json();let i=Array.isArray(o.value)?o.value:[o.value];i=i.sort(function(e,a){return a.Parcela-e.Parcela});let c={Dados:s,Relacionadas:i};const l=new t(c);r.setModel(l,"Transacao");if(!this.pDialog){this.pDialog=a.load({id:r.getId(),name:"apps.dflc.gestaogastos.ext.fragment.ExcluirTransacao"}).then(function(e){r.addDependent(e);return e})}this.pDialog.then(function(e){e.open()});e()}.bind(this)).catch(function(e){sap.m.MessageToast.show("Erro ao chamar serviço de Transações: "+e);n()})}.bind(this)).catch(function(e){sap.m.MessageToast.show("Erro ao chamar serviço de Transações: "+e);n()})}catch(e){sap.m.MessageToast.show("Erro ao chamar serviço: "+e.message)}});let e={busy:{set:true,check:true},dataloss:{popup:true,navigation:false}};this.editFlow.securedExecution(c,e).finally(e=>{console.log(e)})}else{let e={Dados:s,Relacionadas:[]};const n=new t(e);r.setModel(n,"Transacao");if(!this.pDialog){this.pDialog=a.load({id:r.getId(),name:"apps.dflc.gestaogastos.ext.fragment.ExcluirTransacao"}).then(function(e){r.addDependent(e);return e})}this.pDialog.then(function(e){e.open()})}}}});
},
	"apps/dflc/gestaogastos/ext/controller/PessoaObjeto.controller.js":function(){
sap.ui.define(["sap/ui/core/mvc/ControllerExtension","sap/ui/core/message/Message","sap/ui/core/MessageType","sap/ui/model/json/JSONModel"],function(e,t,s,a){"use strict";return e.extend("apps.dflc.gestaogastos.ext.controller.PessoaObjeto",{override:{onInit:function(){var e=this.base.getExtensionAPI().getModel()},onAfterRendering:function(e){let t=sap.ui.core.Element.registry.filter(function(e){return e.isA("sap.ui.layout.form.FormElement")&&e.getId().includes("Imagem")});let s=t[0]},routing:{onAfterBinding:async function(e){let a=sap.ui.core.Element.registry.filter(function(e){return e.isA("sap.m.Table")&&e.getId().includes("innerTable")});let o=a[0];let n=await e.requestObject(e.getPath());const i=this.base.getExtensionAPI();const r=[];var l=()=>new Promise((e,a)=>{try{const o={Pessoa_ID:n.ID};fetch(`/Gerenciamento/Cartao?$filter=Pessoa_ID eq ${o.Pessoa_ID}`,{method:"GET",headers:{"Content-Type":"application/json",Accept:"application/json"}}).then(async function(a){let o=await a.json();let l;if(Array.isArray(o.value))l=o.value;else l=[o.value];let c=(new Date).toLocaleString("pt-BR",{timeZone:"America/Sao_Paulo"});c=c.replaceAll(","," ");let[u,g,p]=c.split(" ")[0].split("/");l.forEach(e=>{if(e.DiaVencimento-u>=0&&e.DiaVencimento-u<2){if(r.length==0){r.push(new t({type:s.Warning,message:`A fatura do cartão ${e.NomeCartao} está vencendo`}))}}});if(n.TotalDoMes>n.ObjetivoDeGasto&&r.length==0){r.push(new t({type:s.Warning,message:"Seu gasto está acima do seu objetivo de gasto mensal"}))}if(n.TotalDoMes>n.Renda&&r.length==0){r.push(new t({type:s.Warning,message:"Seu gasto está acima mensal está superior a sua renda, fique de olho e reduza seus gastos!"}))}i.showMessages(r);e()}.bind(this)).catch(function(e){sap.m.MessageToast.show("Erro:"+e);a()})}catch(e){sap.m.MessageToast.show("Erro ao chamar serviço: "+e.message)}});let c={busy:{set:true,check:true},dataloss:{popup:true,navigation:false}};this.base.getExtensionAPI().editFlow.securedExecution(l,c).finally(e=>{console.log(e)})}}}})});
},
	"apps/dflc/gestaogastos/ext/fragment/AdicionarGasto.fragment.xml":'<core:FragmentDefinition\n    xmlns:core="sap.ui.core"\n    xmlns="sap.m"\n    xmlns:layout="sap.ui.layout.form"\n    xmlns:VL="sap.ui.comp.valuehelpdialog"\n    id="AdicionarGasto"\n><Dialog\n        id="_IDGenDialog1"\n        title="Adicionar Gasto"\n        class="sapUiResponsivePadding"\n        core:require="{ handler: \'apps/dflc/gestaogastos/ext/fragment/AdicionarGasto\'}"\n    ><content><VBox\n                id="_IDGenVBox"\n                class="sapUiSmallMargin"\n            ><Label\n                    id="_IDGenLabel7"\n                    text="Descrição"\n                    required="true"\n                /><Input\n                    id="descricaoGastoInput"\n                    value=""\n                    type="Text"\n                    textAlign="End"\n                    required="true"\n                /><Label\n                    id="_IDGenLabel8"\n                    text="Valor do Gasto"\n                    required="true"\n                /><HBox\n                    id="valorHBox"\n                    width="100%"\n                    class="sapUiNoMargin"\n                ><Input\n                        id="valorGastoInput"\n                        value="0.00"\n                        type="Number"\n                        textAlign="End"\n                        width="auto"\n                        class="sapUiTinyMarginEnd"\n                        required="true"\n                    /><Input\n                        id="moedaGastoInput"\n                        value="BRL"\n                        type="Text"\n                        textAlign="End"\n                        width="auto"\n                        class="sapUiTinyMarginEnd"\n                        required="true"\n                        showValueHelp="true"\n                        valueHelpRequest="handler.onValueHelpRequest"\n                    /></HBox><Label\n                    id="_IDGenLabel9"\n                    text="Data do Gasto"\n                    required="true"\n                /><DatePicker\n                    id="dataGastoPicker"\n                    displayFormat="dd/MM/yyyy"\n                    required="true"\n                /><Label\n                    id="_IDGenLabel10"\n                    text="Total de Parcelas"\n                    required="true"\n                /><Input\n                    id="totalParcelasInput"\n                    value="1"\n                    type="Number"\n                    textAlign="End"\n                    required="true"\n                /><Label\n                    id="_IDGenLabel6"\n                    text="Selecionar Cartão"\n                    required="true"\n                /><Select\n                    id="cartaoSelect"\n                    items="{\n                        path: \'Cartoes>/\' }"\n                    required="true"\n                ><core:Item\n                        id="_IDGenItem21"\n                        key="{Cartoes>ID}"\n                        text="{Cartoes>NomeCartao}"\n                    /></Select></VBox></content><buttons><Button\n                id="_IDGenButton1"\n                text="Cancelar"\n                press="handler.onCancelarGasto"\n            /><Button\n                id="_IDGenButton2"\n                text="Adicionar"\n                type="Emphasized"\n                press="handler.onAdicionarGasto"\n            /></buttons></Dialog></core:FragmentDefinition>\n',
	"apps/dflc/gestaogastos/ext/fragment/AdicionarGasto.js":function(){
sap.ui.define(["sap/m/MessageToast","sap/ui/comp/valuehelpdialog/ValueHelpDialog","sap/ui/model/Filter","sap/ui/model/FilterOperator"],function(e,t,a,s){"use strict";return{onInit:function(e){console.log(e)},onCancelarGasto:function(e){this.getParent().close()},onAdicionarGasto:function(e){const t=this.getParent().getParent();const a=this.getParent();a.setBusy(true);var s=t.byId("descricaoGastoInput");var o=t.byId("valorGastoInput");var l=t.byId("moedaGastoInput");var n=t.byId("dataGastoPicker");var r=t.byId("totalParcelasInput");var i=t.byId("cartaoSelect");var u=true;if(!s.getValue()){s.setValueState("Error");u=false}else if(s.getValue()==" "){s.setValueState("Error");u=false}else{s.setValueState("None")}if(!o.getValue()){o.setValueState("Error");u=false}else if(o.getValue()==0){o.setValueState("Error");u=false}else{o.setValueState("None")}if(!l.getValue()){l.setValueState("Error");u=false}else{let e=t.getModel("Moedas").getData().filter(e=>[l.getValue()].includes(e.code));if(e.length==0){l.setValueState("Error");u=false}else{l.setValueState("None")}}if(!n.getValue()){n.setValueState("Error");u=false}else{n.setValueState("None")}if(!r.getValue()){r.setValueState("Error");u=false}else if(r.getValue()==0){r.setValueState("Error");u=false}else{r.setValueState("None")}if(!i.getSelectedKey()){i.setValueState("Error");u=false}else{i.setValueState("None")}if(!u){sap.m.MessageToast.show("Por favor, preencha todos os campos obrigatórios.");a.setBusy(false);return}const c=t.byId("descricaoGastoInput").getValue();const d=t.byId("valorGastoInput").getValue();const g=t.byId("moedaGastoInput").getValue();const p=t.byId("dataGastoPicker").getValue();const f=t.byId("totalParcelasInput").getValue();const h=t.byId("cartaoSelect").getSelectedKey();const V=p.split("/");const m=`${V[2]}-${V[1]}-${V[0]}`;var b=new Date(p.split("/").reverse().join("-"));if(isNaN(b.getTime())){n.setValueState("Error");sap.m.MessageToast.show("Data inválida. Por favor, insira uma data válida.");a.setBusy(false);return}const S={pessoa:this.getBindingContext().getValue().ID,descricao:c,valor:parseFloat(d),moeda:g,data:m,parcelas:parseInt(f,10),cartao:h};var y=()=>new Promise((e,t)=>{fetch("/Gerenciamento",{method:"GET",headers:{"X-CSRF-Token":"Fetch"}}).then(function(e){if(!e.ok){throw new Error("Erro ao obter CSRF Token")}return e}.bind(this)).then(function(e){const t=e.headers.get("X-CSRF-Token");return t}.bind(this)).then(function(l){fetch("/Gerenciamento/adicionarGasto",{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json","X-CSRF-Token":l},body:JSON.stringify(S)}).then(async function(t){a.setBusy(false);if(!t.ok){throw new Error("Erro ao adicionar gasto")}let l=await t.json();s.setValue("");o.setValue(0);n.setValue("");r.setValue(1);let i=sap.ui.core.Element.registry.filter(function(e){return e.isA("sap.m.Table")&&e.getId().includes("innerTable")});let u=i[0];u.refreshItems();const c=this.getBindingContext();c.refresh();a.close();sap.m.MessageToast.show("Gasto adicionado com sucesso!");e()}.bind(this)).catch(e=>{sap.m.MessageToast.show(e.message);a.setBusy(false);t()})}.bind(this)).catch(function(e){sap.m.MessageToast.show("Erro ao obter csrf token: "+e);t()})});let w={busy:{set:true,check:true},dataloss:{popup:true,navigation:false}};let I=this.getParent().getParent().getController().getExtensionAPI().getEditFlow();I.securedExecution(y,w).finally(e=>{console.log(e)})},onValueHelpRequest:function(e){var o=this.getParent().getParent().getParent().getParent();if(!this._oValueHelpDialog){this._oValueHelpDialog=new t({title:"Selecione a Moeda",supportMultiselect:false,key:"code",width:"200px",descriptionKey:"descr",supportRanges:false,filterMode:true,basicSearchText:"",ok:function(e){var t=e.getParameter("tokens");if(t.length>0){var a=t[0].getKey();o.byId("moedaGastoInput").setValue(a)}this._oValueHelpDialog.close()}.bind(this),cancel:function(){this._oValueHelpDialog.close()}.bind(this)});this._oValueHelpDialog.setFilterBar(new sap.ui.comp.filterbar.FilterBar({basicSearch:new sap.m.SearchField({placeholder:"Buscar...",liveChange:function(e){var t=e.getParameter("newValue");var o=new a({filters:[new a("code",s.Contains,t),new a("name",s.Contains,t)],and:false});l.getBinding("rows").filter(o)}})}));var l=this._oValueHelpDialog.getTable();l.setModel(o.getModel("Moedas"));l.bindRows("Moedas>/");l.addColumn(new sap.ui.table.Column({label:new sap.m.Label({text:"Código"}),template:new sap.m.Text({text:"{Moedas>code}"})}));l.addColumn(new sap.ui.table.Column({label:new sap.m.Label({text:"Descrição"}),template:new sap.m.Text({text:"{Moedas>descr}"})}));o.addDependent(this._oValueHelpDialog)}this._oValueHelpDialog.open()}}});
},
	"apps/dflc/gestaogastos/ext/fragment/ExcluirTransacao.fragment.xml":'<core:FragmentDefinition\n    xmlns:core="sap.ui.core"\n    xmlns="sap.m"\n    xmlns:layout="sap.ui.layout.form"\n    id="ExcluirTransacao"\n><Dialog\n        id="dialogExcluirTransacao"\n        title="Excluir Transação"\n        class="sapUiResponsivePadding"\n        core:require="{ handler: \'apps/dflc/gestaogastos/ext/fragment/ExcluirTransacao\'}"\n    ><content><VBox\n                id="contentVBox"\n                class="sapUiSmallMargin"\n            ><Label\n                    id="_IDGenLabel111"\n                    text="Descrição da Transação"\n                /><Input\n                    id="dataTransacao"\n                    value="{Transacao>/Dados/Descricao}"\n                    enabled="false"\n                /><Label\n                    id="_IDGenLabel11"\n                    text="Data da Transação"\n                /><Input\n                    id="nomeTransacao"\n                    value="{Transacao>/Dados/Data}"\n                    enabled="false"\n                /><Label\n                    id="_IDGenLabel2"\n                    text="Valor"\n                /><Input\n                    id="valorTransacao"\n                    value="{Transacao>/Dados/Valor}"\n                    enabled="false"\n                /><Label\n                    id="_IDGenLabel13"\n                    text="Parcela"\n                /><Input\n                    id="parcelaTransacao"\n                    value="{=${Transacao>/Dados/Parcela} === undefined ? 1 : ${Transacao>/Dados/Parcela} }"\n                    enabled="false"\n                /><Label\n                    id="_IDGenLabel4"\n                    text="Quantidade de Parcelas Totais"\n                /><Input\n                    id="quantidadeParcelas"\n                    value="{Transacao>/Dados/ParcelasTotais}"\n                    enabled="false"\n                /><Input\n                    id="identificadorTransacao"\n                    visible="false"\n                    value="{Transacao>/Dados/Identificador}"\n                    enabled="false"\n                /><Input\n                    id="idTransacao"\n                    visible="false"\n                    value="{Transacao>/Dados/ID}"\n                    enabled="false"\n                /><Label\n                    id="_IDGenLabel5"\n                    text="Transações Relacionadas"\n                    visible="{= ${Transacao>/Relacionadas}.length > 0 }"\n                /><Table\n                    id="listaTransacoesRelacionadas"\n                    items="{ path: \'Transacao>/Relacionadas\' }"\n                    visible="{= ${Transacao>/Relacionadas}.length > 0 }"\n                    width="300px"\n                    growing="true"\n                    growingScrollToLoad="true"\n                ><columns><Column\n                            id="_IDGenColumn"\n                            minScreenWidth="Small"\n                            demandPopin="true"\n                            width="50%"\n                        ><Text\n                                id="_IDGenText"\n                                text="Valor"\n                            /></Column><Column\n                            id="_IDGenColumn1"\n                            minScreenWidth="Small"\n                            demandPopin="true"\n                            width="50%"\n                        ><Text\n                                id="_IDGenText1"\n                                text="Parcela"\n                            /></Column></columns><items><ColumnListItem id="_IDGenColumnListItem"><cells><Text\n                                    id="_IDGenText2"\n                                    text="{Transacao>Valor}"\n                                /><Text\n                                    id="_IDGenText3"\n                                    text="{Transacao>Parcela}"\n                                /></cells></ColumnListItem></items></Table><CheckBox\n                    id="excluirTransacoesRelacionadas"\n                    text="Excluir transações relacionadas"\n                    visible="{= ${Transacao>/Relacionadas}.length > 0 }"\n                /></VBox></content><buttons><Button\n                id="botaoCancelar"\n                text="Cancelar"\n                press="handler.cancelarExclusao"\n            /><Button\n                id="botaoConfirmar"\n                text="Confirmar"\n                type="Emphasized"\n                press="handler.excluirTransacao"\n            /></buttons></Dialog></core:FragmentDefinition>',
	"apps/dflc/gestaogastos/ext/fragment/ExcluirTransacao.js":function(){
sap.ui.define(["sap/m/MessageToast"],function(e){"use strict";return{excluirTransacao:function(e){var t=e.getSource().getParent();var n=this.getParent().getParent();var a=n.byId("idTransacao").getValue();var r=n.byId("identificadorTransacao").getValue();var s=n.byId("excluirTransacoesRelacionadas").getSelected();let o=sap.ui.core.Element.registry.filter(function(e){return e.isA("sap.m.Table")&&e.getId().includes("i18nTransaescompras-innerTable")});let i=o[0];var c={fatura:this.getBindingContext().getValue().ID,transacao:a,identificador:r,excluirRelacionadas:s};t.setBusy(true);var u=()=>new Promise((e,n)=>{fetch("/Gerenciamento",{method:"GET",headers:{"X-CSRF-Token":"Fetch"}}).then(function(e){if(!e.ok){throw new Error("Erro ao obter CSRF Token")}return e}.bind(this)).then(function(e){const t=e.headers.get("X-CSRF-Token");return t}.bind(this)).then(function(a){fetch("/Gerenciamento/excluirTransacao",{method:"POST",headers:{"Content-Type":"application/json","X-CSRF-Token":a},body:JSON.stringify(c)}).then(function(e){if(!e.ok){throw new Error("Erro ao excluir transação.")}return e.json()}).then(function(n){let a=sap.ui.core.Element.registry.filter(function(e){return e.isA("sap.m.Table")&&e.getId().includes("innerTable")});let r=a[0];r.refreshItems();const s=this.getBindingContext();s.refresh();sap.m.MessageToast.show("Transação excluída com sucesso.");t.setBusy(false);t.close();i.getModel().refresh();e()}.bind(this)).catch(function(e){t.setBusy(false);sap.m.MessageToast.show("Erro: "+e.message);n()})}.bind(this)).catch(function(e){sap.m.MessageToast.show("Erro ao obter csrf token: "+e);n()})});let l={busy:{set:true,check:true},dataloss:{popup:true,navigation:false}};let d=this.getParent().getParent().getController().getExtensionAPI().getEditFlow();d.securedExecution(u,l).finally(e=>{console.log(e)})},cancelarExclusao:function(e){this.getParent().close()}}});
},
	"apps/dflc/gestaogastos/ext/fragment/PrevisaoDeGasto.fragment.xml":'<core:FragmentDefinition\n    xmlns:core="sap.ui.core"\n    xmlns="sap.m"\n    xmlns:macros="sap.fe.macros"\n    xmlns:layout="sap.ui.layout.form"\n><VBox\n        id="_IDGenVBox1"\n        core:require="{ handler: \'apps/dflc/gestaogastos/ext/fragment/PrevisaoDeGasto\'}"\n    ><HBox\n            id="_IDGenHBox1"\n            alignItems="Center"\n            class="sapUiTinyMarginBottom"\n        ><Select\n                id="ListaAno"\n                class="sapUiTinyMarginEnd"\n            ><core:Item\n                    id="_IDGenItem"\n                    text="2024"\n                /><core:Item\n                    id="_IDGenItem1"\n                    text="2025"\n                /><core:Item\n                    id="_IDGenItem2"\n                    text="2026"\n                /><core:Item\n                    id="_IDGenItem3"\n                    text="2027"\n                /><core:Item\n                    id="_IDGenItem4"\n                    text="2028"\n                /><core:Item\n                    id="_IDGenItem5"\n                    text="2029"\n                /><core:Item\n                    id="_IDGenItem6"\n                    text="2030"\n                /></Select><Select\n                id="ListaMes"\n            ><core:Item\n                    id="_IDGenItem7"\n                    text="1"\n                /><core:Item\n                    id="_IDGenItem8"\n                    text="2"\n                /><core:Item\n                    id="_IDGenItem9"\n                    text="3"\n                /><core:Item\n                    id="_IDGenItem10"\n                    text="4"\n                /><core:Item\n                    id="_IDGenItem11"\n                    text="5"\n                /><core:Item\n                    id="_IDGenItem12"\n                    text="6"\n                /><core:Item\n                    id="_IDGenItem13"\n                    text="7"\n                /><core:Item\n                    id="_IDGenItem14"\n                    text="8"\n                /><core:Item\n                    id="_IDGenItem15"\n                    text="9"\n                /><core:Item\n                    id="_IDGenItem16"\n                    text="10"\n                /><core:Item\n                    id="_IDGenItem17"\n                    text="11"\n                /><core:Item\n                    id="_IDGenItem18"\n                    text="12"\n                /></Select><Button\n                id="_IDGenButton"\n                text="Buscar"\n                press="handler.onBuscarSimulação"\n            /></HBox><layout:SimpleForm\n            id="form"\n            layout="ResponsiveGridLayout"\n            editable="true"\n            class="sapUiSmallMargin"\n            width="300px"\n        ><Label\n                id="_IDGenLabel"\n                text="Total Do Mês"\n            /><Input\n                id="TotalDoMes"\n                type="Number"\n                value=""\n                description=""\n                editable="false"\n                textAlign="End"\n            /><Label\n                id="_IDGenLabel1"\n                text="Total De Gastos"\n            /><Input\n                id="TotalDeGastos"\n                type="Number"\n                value=""\n                description=""\n                editable="false"\n                textAlign="End"\n            /><Label\n                id="_IDGenLabel3"\n                text="Valor à Economizar"\n            /><Input\n                id="ValorAEconomizar"\n                type="Number"\n                value=""\n                description=""\n                editable="false" \n                textAlign="End"\n            /></layout:SimpleForm></VBox></core:FragmentDefinition>\n',
	"apps/dflc/gestaogastos/ext/fragment/PrevisaoDeGasto.js":function(){
sap.ui.define(["sap/m/MessageToast"],function(e){"use strict";return{onInit:function(e){console.log(e)},"onBuscarSimulação":function(e){let t=this.getModel();var o=()=>new Promise((e,t)=>{let o=this.byId("ListaAno").getSelectedItem().getText();let s=this.byId("ListaMes").getSelectedItem().getText();const n={pessoa:this.getBindingContext().getObject().ID,mes:s,ano:o};try{fetch("/Gerenciamento",{method:"GET",headers:{"X-CSRF-Token":"Fetch"}}).then(function(e){if(!e.ok){throw new Error("Erro ao obter CSRF Token")}return e}.bind(this)).then(function(e){const t=e.headers.get("X-CSRF-Token");return t}.bind(this)).then(function(o){fetch("/Gerenciamento/simulaPorMesAno",{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json","X-CSRF-Token":o},body:JSON.stringify(n)}).then(async function(t){console.log(t);let o=await t.json();let s=this.byId("TotalDoMes");let n=this.byId("TotalDeGastos");let a=this.byId("ValorAEconomizar");s.setValue(o.TotalDoMes);s.setDescription(o.Moeda_code);n.setValue(o.TotalDeGastos);n.setDescription(o.Moeda_code);a.setValue(o.ValorAEconomizar);a.setDescription(o.Moeda_code);e()}.bind(this)).catch(function(e){sap.m.MessageToast.show("Erro ao chamar serviço: "+e);t()})}.bind(this)).catch(function(e){sap.m.MessageToast.show("Erro ao obter csrf token: "+e);t()})}catch(e){sap.m.MessageToast.show("Erro ao chamar serviço: "+e.message)}});let s={busy:{set:true,check:true},dataloss:{popup:true,navigation:false}};this.editFlow.securedExecution(o,s).finally(e=>{console.log(e)})}}});
},
	"apps/dflc/gestaogastos/i18n/i18n.properties":'# This is the resource bundle for apps.dflc.gestaogastos\n\n#Texts for manifest.json\n\n#XTIT: Application name\nappTitle=Gest\\u00e3o De Gastos\n\n#YDES: Application description\nappDescription=Gest\\u00e3o De Gastos\n\n#XTIT: Custom section title\nfiltrarPrevisoDeGasto=Filtrar Previs\\u00e3o de Gasto\n\n#XBUT,45\nadicionarGasto=Adicionar Gasto\n\n#XBUT,51\nexcluirTransao=Excluir Transa\\u00e7\\u00e3o\n',
	"apps/dflc/gestaogastos/manifest.json":'{"_version":"1.65.0","sap.app":{"id":"apps.dflc.gestaogastos","type":"application","i18n":"i18n/i18n.properties","applicationVersion":{"version":"0.0.1"},"title":"{{appTitle}}","description":"{{appDescription}}","resources":"resources.json","sourceTemplate":{"id":"@sap/generator-fiori:lrop","version":"1.16.1","toolsId":"b5fab8be-a8a4-4bf3-96db-079ae62fac4e"},"dataSources":{"mainService":{"uri":"../Gerenciamento/","type":"OData","settings":{"annotations":[],"odataVersion":"4.0"}}},"crossNavigation":{"inbounds":{"gestaogastos-display":{"semanticObject":"gestaogastos","action":"display","signature":{"parameters":{},"additionalParameters":"allowed"}}}}},"sap.ui":{"technology":"UI5","icons":{"icon":"","favIcon":"","phone":"","phone@2":"","tablet":"","tablet@2":""},"deviceTypes":{"desktop":true,"tablet":true,"phone":true}},"sap.ui5":{"flexEnabled":true,"dependencies":{"minUI5Version":"1.131.1","libs":{"sap.m":{},"sap.ui.core":{},"sap.fe.templates":{}}},"contentDensities":{"compact":true,"cozy":true},"models":{"i18n":{"type":"sap.ui.model.resource.ResourceModel","settings":{"bundleName":"apps.dflc.gestaogastos.i18n.i18n"}},"":{"dataSource":"mainService","preload":true,"settings":{"operationMode":"Server","autoExpandSelect":true,"earlyRequests":true}},"@i18n":{"type":"sap.ui.model.resource.ResourceModel","uri":"i18n/i18n.properties"},"Variantes":{}},"resources":{"css":[]},"routing":{"config":{},"routes":[{"pattern":":?query:","name":"PessoaList","target":"PessoaList"},{"pattern":"Pessoa({key}):?query:","name":"PessoaObjectPage","target":"PessoaObjectPage"},{"pattern":"Pessoa({key})/Cartao({key2}):?query:","name":"CartaoObjectPage","target":"CartaoObjectPage"},{"name":"Pessoa_Cartao_FaturaObjectPage","pattern":"Pessoa({key})/Cartao({key2})/Fatura({FaturaKey}):?query:","target":"Pessoa_Cartao_FaturaObjectPage"},{"name":"Pessoa_Cartao_Fatura_TransacoesObjectPage","pattern":"Pessoa({key})/Cartao({key2})/Fatura({FaturaKey})/Transacoes({TransacoesKey}):?query:","target":"Pessoa_Cartao_Fatura_TransacoesObjectPage"}],"targets":{"PessoaList":{"type":"Component","id":"PessoaList","name":"sap.fe.templates.ListReport","options":{"settings":{"contextPath":"/Pessoa","variantManagement":"Page","navigation":{"Pessoa":{"detail":{"route":"PessoaObjectPage"}}},"controlConfiguration":{"@com.sap.vocabularies.UI.v1.LineItem":{"tableSettings":{"type":"ResponsiveTable"}}}}}},"PessoaObjectPage":{"type":"Component","id":"PessoaObjectPage","name":"sap.fe.templates.ObjectPage","options":{"settings":{"editableHeaderContent":false,"contextPath":"/Pessoa","navigation":{"Cartao":{"detail":{"route":"CartaoObjectPage"}}},"content":{"body":{"sections":{"Dados":{"subSections":{"PrevisaoDeGasto":{"template":"apps.dflc.gestaogastos.ext.fragment.PrevisaoDeGasto","title":"{i18n>filtrarPrevisoDeGasto}"}}}}},"header":{"actions":{"AdicionarGasto":{"press":"apps.dflc.gestaogastos.ext.controller.AdicionarGasto.adicionarGasto","visible":true,"enabled":true,"requiresSelection":false,"text":"{@i18n>adicionarGasto}"}}}},"controlConfiguration":{"Cartao/@com.sap.vocabularies.UI.v1.LineItem#i18nCartes":{"tableSettings":{"creationMode":{"name":"Inline"}}}}}}},"CartaoObjectPage":{"type":"Component","id":"CartaoObjectPage","name":"sap.fe.templates.ObjectPage","options":{"settings":{"editableHeaderContent":false,"contextPath":"/Pessoa/Cartao","navigation":{"Fatura":{"detail":{"route":"Pessoa_Cartao_FaturaObjectPage"}}}}}},"Pessoa_Cartao_FaturaObjectPage":{"type":"Component","id":"Pessoa_Cartao_FaturaObjectPage","name":"sap.fe.templates.ObjectPage","options":{"settings":{"navigation":{"Transacoes":{"detail":{"route":"Pessoa_Cartao_Fatura_TransacoesObjectPage"}}},"contextPath":"/Pessoa/Cartao/Fatura","content":{"header":{"actions":{}}},"controlConfiguration":{"Transacoes/@com.sap.vocabularies.UI.v1.LineItem#i18nTransaescompras":{"actions":{"ExcluirTransacaoo":{"press":"apps.dflc.gestaogastos.ext.controller.ExcluirTransacao.excluirTransacao","visible":true,"enabled":true,"requiresSelection":true,"text":"{i18n>excluirTransao}"}},"tableSettings":{"selectAll":false,"selectionMode":"Single"}}}}}},"Pessoa_Cartao_Fatura_TransacoesObjectPage":{"type":"Component","id":"Pessoa_Cartao_Fatura_TransacoesObjectPage","name":"sap.fe.templates.ObjectPage","options":{"settings":{"navigation":{},"contextPath":"/Pessoa/Cartao/Fatura/Transacoes"}}}}},"extends":{"extensions":{"sap.ui.controllerExtensions":{"sap.fe.templates.ObjectPage.ObjectPageController#apps.dflc.gestaogastos::CartaoObjectPage":{"controllerName":"apps.dflc.gestaogastos.ext.controller.CartaoObjeto"},"sap.fe.templates.ObjectPage.ObjectPageController#apps.dflc.gestaogastos::PessoaObjectPage":{"controllerName":"apps.dflc.gestaogastos.ext.controller.PessoaObjeto"}}}}},"sap.fiori":{"registrationIds":[],"archeType":"transactional"},"sap.cloud":{"public":true,"service":"GestorDeGastos.service"}}'
});
//# sourceMappingURL=Component-preload.js.map
