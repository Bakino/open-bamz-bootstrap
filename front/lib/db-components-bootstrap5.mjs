export default {

    customCss: "/plugin/open-bamz-bootstrap/style/bootstrap5-form.css",

    /**
     * apply the bootstrap form styling
     * 
     * <div class="mb-3">
  <label for="exampleFormControlInput1" class="form-label">Email address</label>
  <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="name@example.com">
</div>
     */
    appendElements: async function({/*label,*/ type,/*, schema, table, column,*/ el, elLabel, elInput}){
        if(type === "boolean"){
            const elDiv = document.createElement("DIV") ;
            elDiv.className = "form-check" ;
            if(elInput){
                elInput.className = "form-check-input" ;
                for(let cl of el.classList){
                    if(cl.startsWith("form")){
                        elDiv.classList.add(cl) ;
                    }
                }
                elDiv.appendChild(elInput);
            }
            if(elLabel){
                elLabel.className = "form-check-label" ;
                elDiv.appendChild(elLabel);
            }
            el.appendChild(elDiv) ;
        }else{
            const elDiv = document.createElement("DIV") ;
            elDiv.classList.add("form-bootstrap5")
            if(!el.noMargin){
                elDiv.classList.add("mb-3") ;
            }
            if(elLabel){
                elLabel.className = "form-label" ;
                elDiv.appendChild(elLabel);
            }
            if(elInput){
                if(type === "enum"){
                    if(elInput.tagName === "SELECT"){
                        elInput.className = "form-select" ;
                    }else{
                        const radios = Array.prototype.slice.apply(elInput.querySelectorAll("input[type=radio]")) ;
                        const labels = Array.prototype.slice.apply(elInput.querySelectorAll("label")) ;
                        for(let i = 0; i < radios.length; i++){
                            const elDivRadio = document.createElement("DIV") ;
                            elDivRadio.className = "form-check form-check-inline" ;
                            elInput.appendChild(elDivRadio) ;
                            radios[i].className = "form-check-input" ;
                            labels[i].className = "form-check-label" ;
                            elDivRadio.appendChild(radios[i]);
                            elDivRadio.appendChild(labels[i]);
                        }
                    }
                }else{
                    elInput.className = "form-control" ;
                }
                for(let cl of el.classList){
                    if(cl.startsWith("form")){
                        elDiv.classList.add(cl) ;
                    }
                }
                elDiv.appendChild(elInput);
            }
            el.appendChild(elDiv) ;
        }
    }
}
