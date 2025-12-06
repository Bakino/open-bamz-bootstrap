function applyClassToComponent(newClasses, component, allPossibleClasses){
    const existingClasses = component.getClasses().filter(c => allPossibleClasses.includes(c));

    const classesToRemove = existingClasses.filter(c => !newClasses.includes(c));
    const classesToAdd = newClasses.filter(c => !existingClasses.includes(c)).filter(c => allPossibleClasses.includes(c));
    for (let c of classesToRemove) {
        component.removeClass(c);
    }
    for (let c of classesToAdd) {
        component.addClass(c);
    }
}


const DEVICES = [
    { code: "xs", cssCode: "-", icon: `<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="currentColor" class="bi bi-phone" viewBox="0 0 16 16">  <path d="M11 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM5 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"/> <path d="M8 14a1 1 0 1 0 0-2 1 1 0 0 0 0 2"/></svg>` },
    { code: "sm", cssCode: "-sm-", icon: `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" class="bi bi-phone" viewBox="0 0 16 16"><path d="M11 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM5 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"/><path d="M8 14a1 1 0 1 0 0-2 1 1 0 0 0 0 2"/></svg>` },
    { code: "md", cssCode: "-md-", icon: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-tablet" viewBox="0 0 16 16"><path d="M12 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM4 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"/><path d="M8 14a1 1 0 1 0 0-2 1 1 0 0 0 0 2"/></svg>` },
    { code: "lg", cssCode: "-lg-", icon: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-laptop" viewBox="0 0 16 16"><path d="M13.5 3a.5.5 0 0 1 .5.5V11H2V3.5a.5.5 0 0 1 .5-.5zm-11-1A1.5 1.5 0 0 0 1 3.5V12h14V3.5A1.5 1.5 0 0 0 13.5 2zM0 12.5h16a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 12.5"/></svg>` },
    { code: "xl", cssCode: "-xl-", icon: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-display" viewBox="0 0 16 16"><path d="M0 4s0-2 2-2h12s2 0 2 2v6s0 2-2 2h-4q0 1 .25 1.5H11a.5.5 0 0 1 0 1H5a.5.5 0 0 1 0-1h.75Q6 13 6 12H2s-2 0-2-2zm1.398-.855a.76.76 0 0 0-.254.302A1.5 1.5 0 0 0 1 4.01V10c0 .325.078.502.145.602q.105.156.302.254a1.5 1.5 0 0 0 .538.143L2.01 11H14c.325 0 .502-.078.602-.145a.76.76 0 0 0 .254-.302 1.5 1.5 0 0 0 .143-.538L15 9.99V4c0-.325-.078-.502-.145-.602a.76.76 0 0 0-.302-.254A1.5 1.5 0 0 0 13.99 3H2c-.325 0-.502.078-.602.145"/></svg>` },
    { code: "xxl",cssCode: "-xxl-", icon: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-tv" viewBox="0 0 16 16"><path d="M2.5 13.5A.5.5 0 0 1 3 13h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5M13.991 3l.024.001a1.5 1.5 0 0 1 .538.143.76.76 0 0 1 .302.254c.067.1.145.277.145.602v5.991l-.001.024a1.5 1.5 0 0 1-.143.538.76.76 0 0 1-.254.302c-.1.067-.277.145-.602.145H2.009l-.024-.001a1.5 1.5 0 0 1-.538-.143.76.76 0 0 1-.302-.254C1.078 10.502 1 10.325 1 10V4.009l.001-.024a1.5 1.5 0 0 1 .143-.538.76.76 0 0 1 .254-.302C1.498 3.078 1.675 3 2 3zM14 2H2C0 2 0 4 0 4v6c0 2 2 2 2 2h12c2 0 2-2 2-2V4c0-2-2-2-2-2"/></svg>` },
]

export const typeClassSelectResponsive = {
    createInput: ({trait})=>{

        
    
        let opts = trait.get('options') || [];

        let allClasses = [];
        for (let opt of opts) {
            if (opt.value) {
                opt.value.split(' ').forEach(v => {
                    for(let device of DEVICES){
                        let val = v.replaceAll("${DEVICE}", device.cssCode).replaceAll("--", "-").replace(new RegExp(device.cssCode.replaceAll("-", "\\-")+"$"), device.cssCode.replace(/-$/, ""))
                        if(!val.endsWith("-")){
                            allClasses.push(val);
                        }
                    }
                });
            }
        }
        trait.allClasses = allClasses;

        
        const el = document.createElement('div');

        let deviceSelected = null;
        const deviceManager = trait.em.get("DeviceManager");
        if(deviceManager){
            const currentDevice = deviceManager.getSelected();
            if(currentDevice){
                deviceSelected = currentDevice.id ;
            }
        }
        

        
        el.innerHTML = `<div style="display: flex; align-items: center">`+DEVICES.map(device=>`
            <button type="button" style="color: white;border: none; margin-top: 3px; padding-left: 2px; padding-right: 2px; position: relative" class="bt-${device.code}" device="${device.code}" title="${device.code}">
            ${device.icon}
            <span class="has-value-indicator" style="    position: absolute;
    display: block;
    top: 5px;
    text-align: center;
    font-size: 7px;
    left: 0;
    right: 0;"></span>
            </button>
            `).join("")+
            `<a href="https://getbootstrap.com/docs/5.3/layout/breakpoints/" style="margin-left: auto; color: white ; margin-right: 3px;" target="_blank"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" class="bi bi-question-circle" viewBox="0 0 16 16">
<path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"></path>
<path d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286m1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94"></path></svg>
</a></div>`+DEVICES.map(device=> `<select style="display: 'none'; border-top: #444444 5px solid; margin-top: 3px;" class="select-type select-${device.code}">
                ${opts.map(opt => {
    return `<option value="${opt.value.replaceAll("${DEVICE}", device.cssCode).replaceAll("--", "-").replace(new RegExp(device.cssCode.replaceAll("-", "\\-")+"$"), device.cssCode.replace(/-$/, ""))}">${opt.name}</option>`;
}).join("")}
            </select>`).join("")
       ;

       let selects = Array.from(el.querySelectorAll("select")) ;
       let buttons = Array.from(el.querySelectorAll("button")) ;
       

       const selectDevice = (deviceCode)=>{
            for(let select of selects){
                if(select.classList.contains("select-"+deviceCode)){
                    select.style.display = "block" ;
                }else{
                    select.style.display = "none" ;
                }
            }
            for(let bt of buttons){
                if(bt.getAttribute("device") === deviceCode){
                    bt.style.backgroundColor = "rgba(255, 255, 255, 0.2)" ;
                }else{
                    bt.style.backgroundColor = "transparent" ;
                }
            }
       }
       selectDevice(deviceSelected) ;
        for(let button of buttons){
            button.addEventListener("click", ()=>{
                selectDevice(button.getAttribute("device")) ;
            })
        }

        trait.em.on("device:select", ()=>{
            const currentDevice = deviceManager.getSelected();
            if(currentDevice){
                deviceSelected = currentDevice.id ;
                selectDevice(deviceSelected) ;
            }
        });

        return el;
    }, 

    
    //user change property
    onEvent: function({ elInput, component, trait }) {
        let newClasses = [];
        for(let device of DEVICES){
            const selectType = elInput.querySelector('.select-'+device.code);
            if (selectType.value) {
                newClasses = newClasses.concat(selectType.value.split(' '));
            }
        }

        applyClassToComponent(newClasses, component, trait.allClasses) ;

        this.onUpdate({ elInput, component, trait }) ;
    },
    
    //component selected in canvas
    onUpdate: function({ elInput, component, trait }) {

        const existingClasses = component.getClasses().filter(c => trait.allClasses.includes(c));

        for(let device of DEVICES){
            const selectType = elInput.querySelector('.select-'+device.code);
            const button = elInput.querySelector('.bt-'+device.code);
            let found = false;
            for (let opt of selectType.options) {
                if (opt.value) {
                    if (opt.value.split(" ").every(c => existingClasses.includes(c))) {
                        opt.selected = true;
                        found = true;
                        break;
                    }
                }
            }
            if (!found) {
                selectType.value = "";
                button.querySelector(".has-value-indicator").innerHTML = "" ;
            }else{
                button.querySelector(".has-value-indicator").innerHTML = "&#x2714;" ;
            }
        }
    },
};



export const typeClassCheckboxResponsive = {
    createInput: function({trait}){      
        const el = document.createElement('div');

        let deviceSelected = null;
        const deviceManager = trait.em.get("DeviceManager");
        if(deviceManager){
            const currentDevice = deviceManager.getSelected();
            if(currentDevice){
                deviceSelected = currentDevice.id ;
            }
        }
        

        
        el.innerHTML = `<div style="display: flex; align-items: center">`+DEVICES.map(device=>`
            <button type="button" style="color: white;border: none; margin-top: 3px; padding-left: 2px; padding-right: 2px; position: relative" class="bt-${device.code}" device="${device.code}" title="${device.code}">
            ${device.icon}
            <span class="has-value-indicator" style="    position: absolute;
    display: block;
    top: 5px;
    text-align: center;
    font-size: 7px;
    left: 0;
    right: 0;"></span>
            </button>
            `).join("")+
            `<a href="https://getbootstrap.com/docs/5.3/layout/breakpoints/" style="margin-left: auto; color: white ; margin-right: 3px;" target="_blank"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" class="bi bi-question-circle" viewBox="0 0 16 16">
<path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"></path>
<path d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286m1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94"></path></svg>
</a></div>`+DEVICES.map(device=> `<input type="checkbox" class="form-check-input input-${device.code}" style="display: none; width: auto; margin-left: 2px; appearance: auto;" /> `
                ).join("")
       ;

       let inputs = Array.from(el.querySelectorAll("input")) ;
       let buttons = Array.from(el.querySelectorAll("button")) ;
       

       const selectDevice = (deviceCode)=>{
            for(let input of inputs){
                if(input.classList.contains("input-"+deviceCode)){
                    input.style.display = "block" ;
                }else{
                    input.style.display = "none" ;
                }
            }
            for(let bt of buttons){
                if(bt.getAttribute("device") === deviceCode){
                    bt.style.backgroundColor = "rgba(255, 255, 255, 0.2)" ;
                }else{
                    bt.style.backgroundColor = "transparent" ;
                }
            }
       }
       selectDevice(deviceSelected) ;
        for(let button of buttons){
            button.addEventListener("click", ()=>{
                selectDevice(button.getAttribute("device")) ;
            })
        }

        trait.em.on("device:select", ()=>{
            const currentDevice = deviceManager.getSelected();
            if(currentDevice){
                deviceSelected = currentDevice.id ;
                selectDevice(deviceSelected) ;
            }
        });

        return el;
    }, 
    
    
    //user change property
    onEvent: function({elInput, component, trait }){
        for(let device of DEVICES){
            const input = elInput.querySelector('.input-'+device.code);
            let opts = trait.get('options') || [];
            if(!Array.isArray(opts)){
                opts = [opts] ;
            }
            opts = opts.map(v=>v.replaceAll("${DEVICE}", device.cssCode).replaceAll("--", "-")) ;
    
            if (input.checked) {
                component.addClass(opts);
            } else {
                component.removeClass(opts);
            }
        }
        this.onUpdate({ elInput, component, trait }) ;

    },
    //component selected in canvas
    onUpdate: function ({elInput, component, trait }){
        for(let device of DEVICES){
            const input = elInput.querySelector('.input-'+device.code);
            const button = elInput.querySelector('.bt-'+device.code);
            let opts = trait.get('options') || [];
            if(!Array.isArray(opts)){
                opts = [opts] ;
            }
            opts = opts.map(v=>v.replaceAll("${DEVICE}", device.cssCode).replaceAll("--", "-")) ;

        
           input.checked = opts.every(className=>component.getClasses().includes(className));
           if(input.checked){
               button.querySelector(".has-value-indicator").innerHTML = "&#x2714;" ;
           }else{
               button.querySelector(".has-value-indicator").innerHTML = "" ;
           }
        }
    },

};

export const typeAttributeMargin = {
    createInput({ trait }) {
        let opts = trait.get('options') || "m";

        let positions = ["s", "e", "t", "b", "x", "y"] ;
        let values = ["0", "1", "2", "3", "4", "5", "auto"] ;

        let allClasses = [];
        let prefix = opts;
        for(let v of values){
            allClasses.push(prefix+"-"+v);
        }
        for(let p of positions){
            for(let v of values){
                allClasses.push(prefix+p+"-"+v);
                for(let device of DEVICES){
                    allClasses.push(prefix+p+"-"+device+"-"+v);
                }
            }
        }
        trait.allClasses = allClasses;

        let deviceSelected = null;
        const deviceManager = trait.em.get("DeviceManager");
        if(deviceManager){
            const currentDevice = deviceManager.getSelected();
            if(currentDevice){
                deviceSelected = currentDevice.id ;
            }
        }


        const el = document.createElement('div');
        let styleSelect = "border: 1px #dddddd solid; appearance: auto; border-radius: 2px;"
        el.innerHTML = `<div style="display: flex; align-items: center">`+DEVICES.map(device=>`
            <button type="button" style="color: white;border: none; margin-top: 3px; padding-left: 2px; padding-right: 2px; position: relative" class="bt-${device.code}" device="${device.code}" title="${device.code}">
            ${device.icon}
            <span class="has-value-indicator" style="    position: absolute;
    display: block;
    top: 5px;
    text-align: center;
    font-size: 7px;
    left: 0;
    right: 0;"></span>
            </button>
            `).join("")+
            `<a href="https://getbootstrap.com/docs/5.3/layout/breakpoints/" style="margin-left: auto; color: white ; margin-right: 3px;" target="_blank"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" class="bi bi-question-circle" viewBox="0 0 16 16">
<path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"></path>
<path d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286m1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94"></path></svg>
</a></div>`+
            
            DEVICES.map(device=> `
        <div class="device-type device-${device.code}" style="display: 'none'; border-top: #444444 5px solid; margin-top: 3px;">
        <div>
            <div style="text-align: center">
                <select class="margin-top" style="${styleSelect} width: auto;" >
                    <option value=""></option>
                    ${values.map(v=>`<option value="${v}">${v}</option>`).join("")}
                </select>
            </div>
            <div style="display: flex">
                <select class="margin-left" style="${styleSelect} width: auto;">
                    <option value=""></option>
                    ${values.map(v=>`<option value="${v}">${v}</option>`).join("")}
                </select>
                <div style="flex-grow: 1; text-align: center">
                    <select class="margin-all" style="${styleSelect} width: auto;">
                        <option value=""></option>
                        ${values.map(v=>`<option value="${v}">${v}</option>`).join("")}
                    </select>
                </div>
                <select class="margin-right" style="${styleSelect} width: auto;">
                    <option value=""></option>
                    ${values.map(v=>`<option value="${v}">${v}</option>`).join("")}
                </select>
            </div>
            <div style="text-align: center">
                <select class="margin-bottom" style="${styleSelect} width: auto;">
                    <option value=""></option>
                    ${values.map(v=>`<option value="${v}">${v}</option>`).join("")}
                </select>
            </div>
        </div>
        </div>
        `).join("");

        const marginTop = /** @type {NodeListOf<HTMLInputElement>} */ (el.querySelectorAll(".margin-top"));
        const marginLeft = /** @type {NodeListOf<HTMLInputElement>} */ (el.querySelectorAll(".margin-left"));
        const marginRight = /** @type {NodeListOf<HTMLInputElement>} */ (el.querySelectorAll(".margin-right"));
        const marginBottom = /** @type {NodeListOf<HTMLInputElement>} */ (el.querySelectorAll(".margin-bottom"));
        const marginAll = /** @type {NodeListOf<HTMLInputElement>} */ (el.querySelectorAll(".margin-all"));

        for(let i=0; i<marginAll.length; i++){
            marginAll[i].addEventListener("change", ()=>{
                if(marginAll[i].value){
                    marginTop[i].value = null;
                    marginLeft[i].value = null;
                    marginRight[i].value = null;
                    marginBottom[i].value = null;
                }
            }) ;
        }

        let buttons = Array.from(/** @type {NodeListOf<HTMLElement>} */ (el.querySelectorAll("button"))) ;
        let selects = Array.from(/** @type {NodeListOf<HTMLElement>} */ (el.querySelectorAll(".device-type"))) ;

        const selectDevice = (deviceCode)=>{
            for(let select of selects){
                if(select.classList.contains("device-"+deviceCode)){
                    select.style.display = "block" ;
                }else{
                    select.style.display = "none" ;
                }
            }
            for(let bt of buttons){
                if(bt.getAttribute("device") === deviceCode){
                    bt.style.backgroundColor = "rgba(255, 255, 255, 0.2)" ;
                }else{
                    bt.style.backgroundColor = "transparent" ;
                }
            }
       }
       selectDevice(deviceSelected) ;
        for(let button of buttons){
            button.addEventListener("click", ()=>{
                selectDevice(button.getAttribute("device")) ;
            })
        }

        trait.em.on("device:select", ()=>{
            const currentDevice = deviceManager.getSelected();
            if(currentDevice){
                deviceSelected = currentDevice.id ;
                selectDevice(deviceSelected) ;
            }
        });

        return el;
    },

    //user change property
    onEvent({ elInput, component, trait }) {
        let prefix = trait.get('options') || "m";

        const existingClasses = component.getClasses().filter(c => trait.allClasses.includes(c));
        let newClasses = [];

        for(let device of DEVICES){
            const selectType = elInput.querySelector('.device-'+device.code);
            
            const marginTop = selectType.querySelector(".margin-top");
            const marginLeft = selectType.querySelector(".margin-left");
            const marginRight = selectType.querySelector(".margin-right");
            const marginBottom = selectType.querySelector(".margin-bottom");
            const marginAll = selectType.querySelector(".margin-all");
    
            if (marginTop.value) { newClasses.push(prefix+"t"+device.cssCode+marginTop.value) }
            if (marginLeft.value) { newClasses.push(prefix+"s"+device.cssCode+marginLeft.value) }
            if (marginRight.value) { newClasses.push(prefix+"e"+device.cssCode+marginRight.value) }
            if (marginBottom.value) { newClasses.push(prefix+"b"+device.cssCode+marginBottom.value) }
            if (marginAll.value) { newClasses.push(prefix+device.cssCode+marginAll.value) }
        }


        const classesToRemove = existingClasses.filter(c => !newClasses.includes(c));
        const classesToAdd = newClasses.filter(c => !existingClasses.includes(c));
        for (let c of classesToRemove) {
            component.removeClass(c);
        }
        for (let c of classesToAdd) {
            component.addClass(c);
        }

        this.onUpdate({ elInput, component, trait }) ;
    },
    
    //component selected in canvas
    onUpdate({ elInput, component, trait }){
        let prefix = trait.get('options') || "m";

        let classes = component.getClasses()
        for(let device of DEVICES){
            const selectType = elInput.querySelector('.device-'+device.code);
            const button = elInput.querySelector('.bt-'+device.code);
            let found = false;
            
            const marginTop = selectType.querySelector(".margin-top");
            const marginLeft = selectType.querySelector(".margin-left");
            const marginRight = selectType.querySelector(".margin-right");
            const marginBottom = selectType.querySelector(".margin-bottom");
            const marginAll = selectType.querySelector(".margin-all");
    
            //class has form mt-xl-3
            let classTop = classes.find(c => c.match(new RegExp("^"+prefix+"t"+device.cssCode+"[^-]+$")));
            if(classTop){ marginTop.value = classTop.substring(classTop.lastIndexOf("-")+1) ; found = true; }
            let classLeft = classes.find(c => c.match(new RegExp("^"+prefix+"s"+device.cssCode+"[^-]+$")));
            if(classLeft){ marginLeft.value = classLeft.substring(classLeft.lastIndexOf("-")+1) ;found = true; }
            let classRight = classes.find(c => c.match(new RegExp("^"+prefix+"e"+device.cssCode+"[^-]+$")));
            if(classRight){ marginRight.value = classRight.substring(classRight.lastIndexOf("-")+1) ;found = true; }
            let classBottom = classes.find(c => c.match(new RegExp("^"+prefix+"b"+device.cssCode+"[^-]+$")));
            if(classBottom){ marginBottom.value = classBottom.substring(classBottom.lastIndexOf("-")+1) ;found = true; }
            let classAll = classes.find(c => c.match(new RegExp("^"+prefix+device.cssCode+"[^-]+$")));
            if(classAll){ marginAll.value = classAll.substring(classAll.lastIndexOf("-")+1) ;found = true; }

            if (!found) {
                button.querySelector(".has-value-indicator").innerHTML = "" ;
            }else{
                button.querySelector(".has-value-indicator").innerHTML = "&#x2714;" ;
            }
        }

        
    },
}

export const typeAttributeMarginXY = {
    createInput({ trait }) {
        let opts = trait.get('options') || "m";

        let positions = ["x", "y"] ;
        let values = ["0", "1", "2", "3", "4", "5"] ;

        let allClasses = [];
        let prefix = opts;
        for(let v of values){
            allClasses.push(prefix+"-"+v);
        }
        for(let p of positions){
            for(let v of values){
                allClasses.push(prefix+p+"-"+v);
            }
        }
        trait.allClasses = allClasses;


        const el = document.createElement('div');
        let styleSelect = "border: 1px #dddddd solid; appearance: auto; border-radius: 2px;"
        el.innerHTML = `
        <div>
            <div style="display: flex; align-items: center">
                <svg xmlns="http://www.w3.org/2000/svg" style="fill: white; width:14px;height:14px; margin-right: 2px" viewBox="0 0 512 512"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M406.6 374.6l96-96c12.5-12.5 12.5-32.8 0-45.3l-96-96c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 224l-293.5 0 41.4-41.4c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-96 96c-12.5 12.5-12.5 32.8 0 45.3l96 96c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 288l293.5 0-41.4 41.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0z"/></svg>
                <select class="margin-x" style="${styleSelect} width: auto;">
                    <option value=""></option>
                    ${values.map(v=>`<option value="${v}">${v}</option>`).join("")}
                </select>
                <svg xmlns="http://www.w3.org/2000/svg" style="fill: white; width:14px;height:14px;" viewBox="0 0 320 512"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M182.6 9.4c-12.5-12.5-32.8-12.5-45.3 0l-96 96c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L128 109.3l0 293.5L86.6 361.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l96 96c12.5 12.5 32.8 12.5 45.3 0l96-96c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 402.7l0-293.5 41.4 41.4c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-96-96z"/></svg>
                <select class="margin-y" style="${styleSelect} width: auto;">
                    <option value=""></option>
                    ${values.map(v=>`<option value="${v}">${v}</option>`).join("")}
                </select>
                <svg xmlns="http://www.w3.org/2000/svg" style="fill: white; width:14px;height:14px; margin-left: 2px" viewBox="0 0 512 512"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M278.6 9.4c-12.5-12.5-32.8-12.5-45.3 0l-64 64c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l9.4-9.4L224 224l-114.7 0 9.4-9.4c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-64 64c-12.5 12.5-12.5 32.8 0 45.3l64 64c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-9.4-9.4L224 288l0 114.7-9.4-9.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l64 64c12.5 12.5 32.8 12.5 45.3 0l64-64c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-9.4 9.4L288 288l114.7 0-9.4 9.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l64-64c12.5-12.5 12.5-32.8 0-45.3l-64-64c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l9.4 9.4L288 224l0-114.7 9.4 9.4c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-64-64z"/></svg>
                <div style="flex-grow: 1; text-align: center">
                    <select class="margin-all" style="${styleSelect} width: auto;">
                        <option value=""></option>
                        ${values.map(v=>`<option value="${v}">${v}</option>`).join("")}
                    </select>
                </div>
            </div>


        </div>
        `;

        const marginX = /** @type {HTMLInputElement} */ (el.querySelector(".margin-x"));
        const marginY = /** @type {HTMLInputElement} */ (el.querySelector(".margin-y"));
        const marginAll = /** @type {HTMLInputElement} */ (el.querySelector(".margin-all"));

        marginAll.addEventListener("change", ()=>{
            if(marginAll.value){
                marginX.value = null;
                marginY.value = null;
            }
        }) ;


        return el;
    },

    //user change property
    onEvent: ({ elInput, component, trait }) => {
        let prefix = trait.get('options') || "m";

        const marginX = elInput.querySelector(".margin-x");
        const marginY = elInput.querySelector(".margin-y");
        const marginAll = elInput.querySelector(".margin-all");

        const existingClasses = component.getClasses().filter(c => trait.allClasses.includes(c));
        let newClasses = [];
        if (marginX.value) { newClasses.push(prefix+"x-"+marginX.value) }
        if (marginY.value) { newClasses.push(prefix+"y-"+marginY.value) }
        if (marginAll.value) { newClasses.push(prefix+"-"+marginAll.value) }

        const classesToRemove = existingClasses.filter(c => !newClasses.includes(c));
        const classesToAdd = newClasses.filter(c => !existingClasses.includes(c));
        for (let c of classesToRemove) {
            component.removeClass(c);
        }
        for (let c of classesToAdd) {
            component.addClass(c);
        }
    },
    
    //component selected in canvas
    onUpdate: ({ elInput, component, trait })=>{
        let prefix = trait.get('options') || "m";

        const marginX = elInput.querySelector(".margin-x");
        const marginY = elInput.querySelector(".margin-y");
        const marginAll = elInput.querySelector(".margin-all");

        let classX = component.getClasses().find(c => c.startsWith(prefix+"x-"));
        if(classX){ marginX.value = classX.substring(classX.indexOf("-")+1) ; }
        let classY = component.getClasses().find(c => c.startsWith(prefix+"y-"));
        if(classY){ marginY.value = classY.substring(classY.indexOf("-")+1) ; }
        let classAll = component.getClasses().find(c => c.startsWith(prefix+"-"));
        if(classAll){ marginAll.value = classAll.substring(classAll.indexOf("-")+1) ; }
    },
}

