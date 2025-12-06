let decimalFormat = new Intl.NumberFormat(undefined,{ maximumFractionDigits: 30 });
let decimalDisplayFormat = new Intl.NumberFormat(undefined,{ minimumFractionDigits: 2, maximumFractionDigits: 2 });

export default {


    setValue: async function({type, elValue, value, formattedValue, defaultExtension}){
        if(type === "uuid"){
            elValue.innerHTML = value ? `<span class="badge text-bg-light border text-secondary border-secondary" title="${value}">${value.split("-")[0]}</span>`:""
        }else if(type?.startsWith("timestamp") || type === "datetime"){
            if(!value){
                elValue.innerHTML = "" ;
            }else{
                const indexSpace = formattedValue.indexOf(" ");
                elValue.innerHTML = `${formattedValue.substring(0, indexSpace)} <span class="text-secondary">${formattedValue.substring(indexSpace+1)}</span>`
            }
        }else if(type === "integer" || type === "smallint" || type === "bigint"){
            elValue.innerHTML = (""+value) ? `<div class="text-end me-1 overflow-hidden text-truncate">${formattedValue}</div>`:""
        }else if(type === "real" || type === "double precision" || type === "numeric" || type === "decimal"){
            elValue.innerHTML = (""+value) ? `<div class="text-end me-1 overflow-hidden text-truncate" title="${decimalFormat.format(value)}">${decimalDisplayFormat.format(value)}</div>`:""
        }else if(type === "text" || type === "character varying" || type === "bpchar"){
            elValue.innerHTML = (""+value) ? `<div class="me-1 overflow-hidden text-truncate" title="${formattedValue}">${formattedValue}</div>`:""
        }else if(type.startsWith("json")){
            if(!value){
                elValue.innerHTML = "" ;
            }else{
                let jsonStr = JSON.stringify(value) ;
                let preview = JSON.stringify(value, null, 2).replace(/"([^"]+)":/g, '$1:').replace(/,/g, ', ').replace(/:/g, ': ').replaceAll("<", '&lt;');
                elValue.innerHTML = `<div class="me-1" title='${jsonStr}'><code class="text-secondary" style="white-space: pre">${preview}</code></div>`
            }
        }else if(type.startsWith("xml")){
            if(!value){
                elValue.innerHTML = "" ;
            }else{
                let str = value.replaceAll("<", "&lt;").replaceAll(">", "&gt;") ;
                elValue.innerHTML = `<div class="me-1 overflow-hidden text-truncate" title="${str.replaceAll('"', '')}">${str}</div>`
            }
        }else if(type === "boolean"){
            if(value){
                elValue.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-square-fill" viewBox="0 0 16 16">
  <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm10.03 4.97a.75.75 0 0 1 .011 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.75.75 0 0 1 1.08-.022z"/>
</svg>` ;
            }else{
                elValue.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-square" viewBox="0 0 16 16">
  <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"/>
</svg>` ;
            }
        }else if(type === "bytea"){
            await defaultExtension.setValue({type, elValue, value, formattedValue, defaultExtension})
            elValue.querySelector("button").className = "btn btn-sm btn-outline-secondary" ;
        }else{
            await defaultExtension.setValue({type, elValue, value, formattedValue, defaultExtension})
        }
    },

    postProcesses: [
        async function(/*{type, elValue, dbApi, schema, column, table, label, type, schema, table, column, el, elLabel, elInput, defaultExtension}*/){
        }
    ]
    
}
