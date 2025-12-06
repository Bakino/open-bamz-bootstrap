import { panelDevices } from "./devices.mjs";
import { typeClassCheckboxResponsive, typeClassSelectResponsive, typeAttributeMargin, typeAttributeMarginXY } from "./traits.mjs";

const categoryBase = {id: 'general', label: "General"}

function createCustomTrait({ createInput, onEvent, onUpdate }){
    return {
        templateLabel() {
            console.log("template label "+this.model.get("title"))
            const { ppfx } = this;
            return `<div class="${ppfx}label d-flex" title="${this.model.get("title")}">${this.model.get("label")}</div>`;
        },

        //noLabel: true,
        createInput({ trait }) {
            let compHtml;
            if(typeof(createInput) === "function"){
                var md = this.model;
                var options = md.get('options') || [];
                compHtml = createInput.bind(this)({options, trait}) ;
            }else{
                compHtml = createInput ;
            }
            if(typeof(compHtml) === "string"){
                const el = document.createElement('div');
                el.innerHTML = compHtml ;
                return el;
            }else{
                return compHtml;
            }
        },
    
        onEvent({ elInput, component, event, trait }) {
            if(onEvent){
                onEvent.bind(this)({ elInput, component, event, trait })
            }
        },
        onUpdate({ elInput, component, trait }) {
            if(onUpdate){
                onUpdate.bind(this)({ elInput, component, trait })
            }
        }
    };
}

let allColClasses = [".col"];
for(let i=1; i<=12; i++){
    allColClasses.push(".col-"+i);
    for(let size of ["sm", "md", "lg", "xl", "xxl"]){
        allColClasses.push(".col-"+size+"-"+i);
    }
}

const BOOTSTRAP_TEXT = [  
    {
        id: "bs-text",
        icon: `<h5>Text</h5>`,
        label: "Text",
        content: `<span>Text</span>`,
        editable: true,
        properties: []
    },
    {
        id: "bs-header",
        isComponent(el) {
            return el && ['H1','H2','H3','H4','H5','H6'].includes(el.tagName) ;
        },
        url: "https://getbootstrap.com/docs/5.3/content/typography/#headings",
        icon: `<h5><u>Header</u></h5>`,
        label: "Header",
        content: `<h1>Header</h1>`,
        editable: true,
        properties: [
            { 
                label: "Title level",
                property: "tagName",
                propertiesValues: [
                    {value: 'h1', name: "First level (biggest)" },
                    {value: 'h2', name: "Second level" },
                    {value: 'h3', name: "Third level" },
                    {value: 'h4', name: "Fourth level" },
                    {value: 'h5', name: "Fifth level" },
                    {value: 'h6', name: "Sixth level (lowest)" },
                ],
                url: "https://getbootstrap.com/docs/5.3/content/typography/#headings"
            },
            { 
                label: "Display heading",
                classPrefix: "display",
                classes: [ "", "1",  "2", "3", "4", "5", "6" ],
                url: "https://getbootstrap.com/docs/5.3/content/typography/#display-headings"
            },
        ]
    },
    {
        id: "bs-link",
        isComponent(el) {
            return el && el.tagName === "A" ;
        },
        url: "https://getbootstrap.com/docs/5.3/utilities/link/",
        icon: `<h5><a class="pe-none" tabindex="-1">Link</a></h5>`,
        label: "Link",
        content: `<a>Link</a>`,
        editable: true,
        properties: [
            { 
                label: "URL",
                property: "href",
            },
            { 
                label: "Target",
                property: "target",
                propertiesValues: [
                    {value: '_self', name: "Current tab" },
                    {value: '_blank', name: "New tab" },
                    {value: '_parent', name: "Parent window" },
                    {value: '_top', name: "Top window" }
                ],
                url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#target"
            },
            { 
                label: "Color",
                classPrefix: "link",
                classes: [ "", "primary",  "secondary", "success", "danger", "warning", "info", "light", "dark", "body-emphasis" ],
                url: "https://getbootstrap.com/docs/5.3/utilities/link/#colored-links"
            },
            { 
                label: "Underline color",
                classPrefix: "link-underline",
                classes: [ "", "primary",  "secondary", "success", "danger", "warning", "info", "light", "dark" ],
                url: "https://getbootstrap.com/docs/5.3/utilities/link/#underline-color"
            },
            { 
                label: "Opacity",
                classPrefix: "link-opacity",
                classes: [ "", "10",  "25", "50", "75", "100" ],
                url: "https://getbootstrap.com/docs/5.3/utilities/link/#link-opacity"
            },
            { 
                label: "Opacity on hover",
                classPrefix: "link-opacity",
                classes: [ "", "10-hover",  "25-hover", "50-hover", "75-hover", "100-hover" ],
                url: "https://getbootstrap.com/docs/5.3/utilities/link/#link-opacity"
            },
            { 
                label: "Underline offset",
                classPrefix: "link-offset",
                classes: [ "", "1",  "2", "3" ],
                url: "https://getbootstrap.com/docs/5.3/utilities/link/#underline-offset"
            },
            { 
                label: "Underline opacity",
                classPrefix: "link-underline link-underline-opacity",
                classes: [ "", "0",  "10", "25", "50", "75", "100" ],
                url: "https://getbootstrap.com/docs/5.3/utilities/link/#underline-opacity"
            },
            { 
                label: "Pointer event",
                classPrefix: "pe",
                classes: [ "", "auto",  "none" ],
                url: "https://getbootstrap.com/docs/5.3/utilities/interactions/#pointer-events"
            },
            
        ]
    },
]

const BOOTSTRAP_MEDIA = [  
    {
        id: "bs-img",
        isComponent(el) {
            return el && el.tagName === "IMG" ;
        },
        icon: `<svg xmlns="http://www.w3.org/2000/svg" style="transform: scale(1.5);margin-top: 5px;" width="16" height="16" fill="currentColor" class="bi bi-card-image" viewBox="0 0 16 16">
  <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0"/>
  <path d="M1.5 2A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2zm13 1a.5.5 0 0 1 .5.5v6l-3.775-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12v.54L1 12.5v-9a.5.5 0 0 1 .5-.5z"/>
</svg>`,
        label: "Image",
        content: `<img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAiIHZpZXdCb3g9IjAgMCAyNCAyNCIgc3R5bGU9ImZpbGw6IHJnYmEoMCwwLDAsMC4xNSk7IHRyYW5zZm9ybTogc2NhbGUoMC43NSkiPgogICAgICAgIDxwYXRoIGQ9Ik04LjUgMTMuNWwyLjUgMyAzLjUtNC41IDQuNSA2SDVtMTYgMVY1YTIgMiAwIDAgMC0yLTJINWMtMS4xIDAtMiAuOS0yIDJ2MTRjMCAxLjEuOSAyIDIgMmgxNGMxLjEgMCAyLS45IDItMnoiPjwvcGF0aD4KICAgICAgPC9zdmc+"/>`,
        properties: [
            { 
                label: "URL (src)",
                property: "src"
            },
            { 
                label: "Image responsive",
                classToggle: "img-fluid",
                url: "https://getbootstrap.com/docs/5.3/content/images/#responsive-images"
            },
            { 
                label: "Image thumbnail",
                classToggle: "img-thumbnail",
                url: "https://getbootstrap.com/docs/5.3/content/images/#responsive-images"
            },
            { 
                label: "Object fit",
                classPrefixResponsive: "object-fit${DEVICE}",
                classes: [ "", "contain",  "cover","fill",  "scale", "none"],
                url: "https://getbootstrap.com/docs/5.3/utilities/object-fit/"
            },
        ]
    },
    {
        id: "bs-video",
        isComponent(el) {
            return el && el.tagName === "VIDEO" ;
        },
        icon: `<svg xmlns="http://www.w3.org/2000/svg" style="transform: scale(1.5);margin-top: 5px;"  width="16" height="16" fill="currentColor" class="bi bi-play-btn" viewBox="0 0 16 16">
  <path d="M6.79 5.093A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l3.5-2.5a.5.5 0 0 0 0-.814z"/>
  <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm15 0a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1z"/>
</svg>`,
        label: "Video",
        content: `<video />`,
        properties: [
            { 
                label: "Object fit",
                classPrefixResponsive: "object-fit${DEVICE}",
                classes: [ "", "contain",  "cover","fill",  "scale", "none"],
                url: "https://getbootstrap.com/docs/5.3/utilities/object-fit/"
            },
        ]
    },
    
]

const propertiesInputField = [
    { 
        label: "Type of field",
        
        customType: {
            createInput: function({trait}){

                if(!trait.baseTraitIndex){
                    trait.baseTraitIndex = trait.component.getTraits().length ;
                }

                trait.updateTrait = function({component, trait}){
                    let type = component.get("tagName");
                    if(type !== "textarea" && type !== "select"){
                        type = component.getAttributes()["type"];
                    }
                    let changed = false;
                    let typeProps = [] ;
                    function addProperty(types, property){
                        if(types.includes(type)){
                            if(!typeProps.includes(property)){
                                typeProps.push(property)
                            }
                            if(!component.getTrait(property.name)){
                                console.log("ADD "+property.name);
                                changed = true;
                                component.addTrait({
                                    ...property,
                                    label: `${property.title} <a href="${property.url}" target="_blank" class="ms-auto text-decoration-none text-white">${IMG_HELP}</a>`,
                                    templateLabel: function (){
                                        const { ppfx } = this;
                                        return `<div class="${ppfx}label d-flex" title="${this.model.get("title")}">${this.model.get("label")}</div>`;
                                    },
                                    category: trait.category
                                  }, { at: typeProps.indexOf(property)+trait.baseTraitIndex });
                            }
                        }else{
                            if(component.getTrait(property.name)){
                                changed = true;
                                console.log("REMOVE "+property.name);
                                component.removeTrait(property.name);
                            }
                        }
                    }

                    addProperty(["file"], {
                        name: 'accept',
                        type: "prop_input",
                        placeholder: "ex: image/*,application/pdf",
                        title: "Accept",
                        url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/accept"
                    });
                    addProperty(["file"], {
                        name: 'capture',
                        type: "prop_select",
                        title: "Capture",
                        options: [
                            {value: 'user', name: "User (front camera)" },
                            {value: 'environment', name: "environment (back camera)" }
                        ],
                        url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/capture"
                    });

                    addProperty(["file", "email", "select"], {
                        name: 'multiple',
                        options: 'multiple',
                        type: "attribute_checkbox",
                        title: "Multiple",
                        url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/multiple"
                    });

                    addProperty(["select"], {
                        name: 'select_options',
                        type: "select_options",
                        title: "Options",
                        url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/option"
                    });

                    addProperty(["number","date", "month", "week", "datetime-local", "time", "range"], {
                        name: 'step',
                        type: "prop_input",
                        title: "step",
                        url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/step"
                    });
                    addProperty(["number","date", "month", "week", "datetime-local", "time", "range"], {
                        name: 'min',
                        type: "prop_input",
                        title: "Min",
                        url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/min"
                    });
                    addProperty(["number","date", "month", "week", "datetime-local", "time", "range"], {
                        name: 'max',
                        type: "prop_input",
                        title: "Max",
                        url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/max"
                    });
                   
                    
                    addProperty(["text", "textarea", "number", "email", "tel", "color", "select", 
                            "date", "month", "week", "datetime-local", "time", "password", "url"], {
                        name: 'autocomplete',
                        options: 'autocomplete',
                        type: "attribute_checkbox",
                        title: "Autocomplete",
                        url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete"
                    });
                    addProperty(["text", "textarea", "email", "tel", "password", "url"], {
                        name: 'minlength',
                        type: "prop_input",
                        title: "Min length",
                        url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/minlength"
                    });
                    addProperty(["text", "textarea", "email", "tel", "password", "url"], {
                        name: 'maxlength',
                        type: "prop_input",
                        title: "Max length",
                        url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/maxlength"
                    });
                    addProperty(["text"], {
                        name: 'autocapitalize',
                        options: [
                            {value: 'none', name: "None" },
                            {value: 'sentences', name: "Sentences" },
                            {value: 'words', name: "Words" },
                            {value: 'characters', name: "Characters" }
                        ],
                        type: "prop_select",
                        title: "Autocapitalize",
                        url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/autocapitalize"
                    });
                    addProperty(["text"], {
                        name: 'inputmode',
                        options: [
                            {value: 'none', name: "None" },
                            {value: 'text', name: "Text" },
                            {value: 'tel', name: "Phone" },
                            {value: 'url', name: "URL" },
                            {value: 'email', name: "E-mail" },
                            {value: 'numeric', name: "Numeric" },
                            {value: 'decimal', name: "Decimal" },
                            {value: 'search', name: "Search" },
                        ],
                        type: "prop_select",
                        title: "Input mode",
                        url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#inputmode"
                    });
                    
                    
                    
                    addProperty(["text", "textarea", "email", "tel", "password", "url"], {
                        name: 'placeholder',
                        type: "prop_input",
                        title: "Placeholder",
                        url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/placeholder"
                    });
                    addProperty(["text", "email", "tel", "password", "url"], {
                        name: 'pattern',
                        type: "prop_input",
                        title: "Pattern",
                        url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/pattern"
                    });
                    


                    addProperty(["text", "textarea", "number", "email", "tel", "range", "color", "select",
                            "date", "month", "week", "datetime-local", "time", "password", "url", "file"], {
                        name: 'tabindex',
                        type: "prop_input",
                        title: "TAB index",
                        url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex"
                    });
                    addProperty(["text", "textarea", "number", "email", "tel", "range", "color", "select",
                            "date", "month", "week", "datetime-local", "time", "password", "url",  "file"], {
                        name: 'disabled',
                        options: 'disabled',
                        type: "attribute_checkbox",
                        title: "Disabled",
                        url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/disabled"
                    });
                    addProperty(["text", "textarea", "number", "email", "tel", "range", "color", "select",
                            "date", "month", "week", "datetime-local", "time", "password", "url",  "file"], {
                        name: 'readonly',
                        options: 'readonly',
                        type: "attribute_checkbox",
                        title: "Readonly",
                        url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/readonly"
                    });
                    addProperty(["text", "textarea", "number", "email", "tel", "range", "color", "select",
                            "date", "month", "week", "datetime-local", "time", "password", "url", "file"], {
                        name: 'required',
                        options: 'required',
                        type: "attribute_checkbox",
                        title: "Required",
                        url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/required"
                    });
                
                    addProperty(["text", "textarea", "number", "email", "tel", "range", "color", "select",
                            "date", "month", "week", "datetime-local", "time", "password", "url",  "file"], {
                        name: 'value',
                        type: "prop_input",
                        title: "Value",
                        url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#value"
                    });
                    
                    addProperty(["text", "textarea", "number", "email", "tel", "range", "color", "select",
                            "date", "month", "week", "datetime-local", "time", "password", "url", "file"], {
                        name: 'name',
                        type: "prop_input",
                        title: "Name",
                        url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#name"
                    });

                    if(changed){
                        //reselect to force rerender traits
                        setTimeout(()=>{
                            component.em.setSelected(null);
                            component.em.setSelected(component);
                        }, 0)
                    }
                } ;
                let opts = [
                    { value: "text", name: "Text" },
                    { value: "textarea", name: "Textarea" },
                    { value: "select", name: "Select dropdown" },
                    { value: "number", name: "Number" },
                    { value: "email", name: "E-mail" },
                    { value: "tel", name: "Phone number" },
                    { value: "range", name: "Range" },
                    { value: "color", name: "Color" },
                    { value: "date", name: "Date" },
                    { value: "month", name: "Month" },
                    { value: "week", name: "Week" },
                    { value: "datetime-local", name: "Date time" },
                    { value: "time", name: "Time" },
                    { value: "file", name: "File" },
                    { value: "password", name: "Password" },
                    { value: "url", name: "URL" },
                ];
        
                let allClasses = [];
                for (let opt of opts) {
                    if (opt.value) {
                        opt.value.split(' ').forEach(v => {
                            if(!v.endsWith("-")){
                                allClasses.push(v);
                            }
                        });
                    }
                }
                trait.allClasses = allClasses;
        
                
                const el = document.createElement('div');
                el.innerHTML = `<select class="select-type">
                                ${opts.map(opt => {
                    return `<option value="${opt.value}">${opt.name}</option>`;
                }).join("")}
                            </select>`;
        
                return el;
            }, 

            

            //user change property
            onEvent: function({elInput, component, trait }){
                const selectType = elInput.querySelector('.select-type');
                let type = selectType.value;
                if(type === "textarea"){
                    component.set("tagName", "textarea");
                    component.removeClass("form-select");
                }else if(type === "select"){
                    component.set("tagName", "select");
                    component.addClass("form-select");
                }else {
                    component.set("tagName", "input");
                    component.removeClass("form-select");
                    component.setAttributes({...component.getAttributes(), "type": type});
                }
                trait.updateTrait({component, trait}) ;
            },
            //component selected in canvas
            onUpdate: function({elInput, component , trait}){
                const selectType = elInput.querySelector('.select-type');
                let found = false;

                let propValue = component.get("tagName");
                if(propValue !== "textarea" && propValue !== "select"){
                    propValue = component.getAttributes()["type"];
                }


                for (let opt of selectType.options) {
                    if (opt.value) {
                        if (opt.value == propValue) {
                            opt.selected = true;
                            found = true;
                            break;
                        }
                    }
                }
                if (!found) {
                    selectType.value = "";
                }
                trait.updateTrait({component, trait}) ;
            },
        }
    },
]

const BOOTSTRAP_FORM = [  
    {
        id: "bs-form",
        isComponent(el) {
            return el && el.tagName === "FORM" ;
        },
        icon: `<svg xmlns="http://www.w3.org/2000/svg" style="transform: scale(1.5);margin-top: 5px;"  width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
  <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
  <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
</svg>`,
        label: "Form",
        content: `<form></form>`,
        properties: [
            { 
                label: "Action",
                property: "action",
                placeholder: "URL to submit the form",
                url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form#action"
            },
            { 
                label: "Method",
                property: "method",
                propertiesValues: [
                    {value: '', name: "" },
                    {value: 'post', name: "POST" },
                    {value: 'get', name: "GET" },
                    {value: 'dialog', name: "dialog" },
                ],
                url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form#method"
            },
            { 
                label: "Target",
                property: "target",
                propertiesValues: [
                    {value: '_self', name: "Current tab" },
                    {value: '_blank', name: "New tab" },
                    {value: '_parent', name: "Parent window" },
                    {value: '_top', name: "Top window" }
                ],
                url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form#target"
            },
            { 
                label: "Autocomplete",
                attributeToggle: "autocomplete",
                url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete"
            },
            { 
                label: "Autocapitalize",
                property: "autocapitalize",
                propertiesValues: [
                    {value: 'none', name: "None" },
                    {value: 'sentences', name: "Sentences" },
                    {value: 'words', name: "Words" },
                    {value: 'characters', name: "Characters" }
                ],
                url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/autocapitalize"
            },
            
        ]
    },
    {
        id: "bs-label-input",
        icon: `
        <div style="text-align: left">
        <div class="placeholder placeholder-sm" style="width: 30px"></div>
        
  <input type="text" class="form-control form-control-sm" readonly="" style="height:20px;min-height:20px;background: #dddddd;" value="|"></div>`,
        label: "Label and field",
        content: `<div class="mb-3">
  <label for="formInput1" class="form-label">Label</label>
  <input type="text" class="form-control" id="formInput1">
</div>`,
        properties: []
    },
    {
        id: "bs-input",
        classId: "form-control",
        icon: `  <input type="text" class="form-control form-control-sm" readonly="" style="height:20px;min-height:20px;background: #dddddd;" value="|">`,
        label: "Form field",
        content: `<input type="text" class="form-control">`,
        // @ts-ignore
        properties: propertiesInputField.concat([
            { 
                label: "Id",
                name: "id",
                category: categoryBase,
                customType : {
                    createInput:  `<input type="text" placeholder="Id of input" /> `,
                    //user change property
                    onEvent: ({elInput, component })=>{
                        const input = elInput.querySelector('input');

                        component.parent().components().each(c=>{
                            //don't test the label for attribute because grapesjs change automatically id of input
                            if(c.get("tagName") === "label" /*&& c.getAttributes().for === component.getAttributes().id*/){
                                //this is the label tag linked to this form field, update its for attribute too
                                c.setAttributes({...c.getAttributes(), for: input.value});
                            }
                        })
                        component.setAttributes({...component.getAttributes(), id: input.value});
                    },
                    //component selected in canvas
                    onUpdate: ({elInput, component })=>{
                        const input = elInput.querySelector('input');

                        input.value = component.getAttributes().id??"";
                    },
                }
            },
            { 
                label: "Size",
                classPrefix: "form-control",
                classes: [ "", "lg",  "sm"],
                url: "https://getbootstrap.com/docs/5.3/forms/form-control/#sizing"
            },
            { 
                label: "Readonly plain text",
                classToggle: "form-control-plaintext",
                url: "https://getbootstrap.com/docs/5.3/forms/form-control/#readonly-plain-text"
            },
        ])
    },
    {
        id: "bs-checkbox-label",
        icon: `<div class="d-flex align-items-center"><div class="form-check ms-auto me-auto">
  <input class="form-check-input" type="checkbox" checked>
</div></div>`,
        label: "Checkbox",
        content: `<div class="form-check">
  <input class="form-check-input" type="checkbox" value="" id="myCheckbox">
  <label class="form-check-label" for="myCheckbox">
    Checkbox label
  </label>
</div>`,
        properties: []
    },
    {
        id: "bs-radio-label",
        classId: "form-check",
        icon: `<div class="d-flex align-items-center"><div class="form-check ms-auto me-auto">
  <input class="form-check-input" type="radio" checked>
</div></div>`,
        label: "Radio",
        content: `<div class="form-check">
  <input class="form-check-input" type="radio" name="radioGroupName" id="firstRadio">
  <label class="form-check-label" for="firstRadio">
    First radio
  </label>
</div>
<div class="form-check">
  <input class="form-check-input" type="radio" name="radioGroupName" id="secondRadio">
  <label class="form-check-label" for="secondRadio">
    Second radio
  </label>
</div>`,
        properties: [
            { 
                label: "Display as switch",
                classToggle: "form-switch",
                url: "https://getbootstrap.com/docs/5.3/forms/checks-radios/#switches"
            },
            { 
                label: "Display inline",
                classToggle: "form-check-inline",
                url: "https://getbootstrap.com/docs/5.3/forms/checks-radios/#inline"
            },
            { 
                label: "Display reverse",
                classToggle: "form-check-reverse",
                url: "https://getbootstrap.com/docs/5.3/forms/checks-radios/#reverse"
            },
        ]
    },
    {
        id: "bs-checkbox-radio",
        classId: "form-check-input",
        label: "Checkbox",
        propertiesOnly: true,
        properties: [
            { 
                label: "Id",
                name: "id",
                category: categoryBase,
                customType : {
                    createInput:  `<input type="text" /> `,
                    //user change property
                    onEvent: ({elInput, component })=>{
                        const input = elInput.querySelector('input');

                        component.parent().components().each(c=>{
                            //don't test the label for attribute because grapesjs change automatically id of input
                            if(c.get("tagName") === "label" /*&& c.getAttributes().for === component.getAttributes().id*/){
                                //this is the label tag linked to this form field, update its for attribute too
                                c.setAttributes({...c.getAttributes(), for: input.value});
                            }
                        })
                        component.setAttributes({...component.getAttributes(), id: input.value});
                    },
                    //component selected in canvas
                    onUpdate: ({elInput, component })=>{
                        const input = elInput.querySelector('input');

                        input.value = component.getAttributes().id??"";
                    },
                }
            },
            { 
                label: "Name",
                name: "name",
                url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#name",
                customType : {
                    createInput:  `<input type="text" /> `,
                    //user change property
                    onEvent: ({elInput, component })=>{
                        const input = elInput.querySelector('input');

                        if(component.getAttributes().type === "radio"){
                            let radios = component.em.getWrapper().find('input[type="radio"]') ;
                            for(let c of radios){
                                if(c !== component && c.getAttributes().name === component.getAttributes().name){
                                    //this is other radio of the same name, automatically update them
                                    c.setAttributes({...c.getAttributes(), name: input.value});
                                }
                            }
                        }

                        component.setAttributes({...component.getAttributes(), name: input.value});
                    },
                    //component selected in canvas
                    onUpdate: ({elInput, component })=>{
                        const input = elInput.querySelector('input');

                        input.value = component.getAttributes().name??"";
                    },
                }
            },
            { 
                label: "Value",
                property: "Value",
                url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#value"
            },
            { 
                label: "Checked",
                attributeToggle: "checked",
                url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#checked"
            },
            { 
                label: "Disabled",
                attributeToggle: "disabled",
                url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/disabled"
            },
            { 
                label: "Readonly",
                attributeToggle: "readonly",
                url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/readonly"
            },
            { 
                label: "Required",
                attributeToggle: "required",
                url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/required"
            },
            { 
                label: "TAB index",
                property: "tabindex",
                placeholder: "TAB key order (-1 to remove from TAB)",
                url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex"
            },
            { 
                label: "Toggle button",
                name: "toggle-button",
                url: "https://getbootstrap.com/docs/5.3/forms/checks-radios/#toggle-buttons",
                customType : {
                    createInput:  `<input type="checkbox" class="form-check-input" style="width: auto; margin-left: 2px; appearance: auto;"> `,
                    //user change property
                    onEvent: ({elInput, component })=>{
                        const input = elInput.querySelector('input');

                        if(input.checked){
                            component.removeClass("form-check-input");
                            component.addClass("btn-check");
                            component.parent().removeClass("form-check");
                        }else{
                            component.addClass("form-check-input");
                            component.removeClass("btn-check");
                            component.parent().addClass("form-check");
                        }

                        component.parent().components().each(c=>{
                            //don't test the label for attribute because grapesjs change automatically id of input
                            if(c.get("tagName") === "label" /* && c.getAttributes().for === component.getAttributes().id*/){
                                //this is the label tag linked to this form field, update its class too
                                if(input.checked){
                                    c.addClass("btn");
                                    c.addClass("btn-primary");
                                    c.removeClass("form-check-label");
                                }else{
                                    c.removeClass("btn");
                                    c.removeClass("btn-primary");
                                    c.addClass("form-check-label");
                                }
                                c.replaceWith(c.toHTML())
                            }
                        })
                    },
                    //component selected in canvas
                    onUpdate: ({elInput, component })=>{
                        const isToggle = component.getClasses().some(c=>c==="btn-check");
                        const input = elInput.querySelector('input');

                        input.checked = isToggle;
                    },
                }
            },
        ]
    },
    {
        id: "bs-input-group",
        classId: "input-group",
        icon: `
        <div class="input-group input-group-sm mb-3">
  <span class="input-group-text" style="font-size: 8px; height: 20px; background: #919191;">A</span>
  <input type="text" class="form-control" style="height:20px;min-height:20px;background: #dddddd;" value="|">
</div>`,
        label: "Input group",
        content: `<div class="input-group mb-3">
  <span class="input-group-text" id="inputGroup-sizing-default">Prefix</span>
  <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default">
</div>`,
        properties: [
            { 
                label: "Size",
                classPrefix: "input-group",
                classes: [
                    "", "sm", "lg"
                ],
                url: "https://getbootstrap.com/docs/5.3/forms/input-group/#sizing"
            },
        ]
    },
    {
        id: "bs-input-group-btn",
        icon: `
        <div class="input-group input-group-sm mb-3">
  <button class="btn btn-info" style="font-size: 8px; height: 20px;">Btn</button>
  <input type="text" class="form-control" style="height:20px;min-height:20px;background: #dddddd;" value="|">
</div>`,
        label: "Input group button",
        content: `<div class="input-group mb-3">
    <button class="btn btn-outline-secondary" type="button" id="button-addon1">Button</button>
  <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default">
</div>`,
        properties: [ ]
    },
    {
        id: "bs-floating-label",
        url: "https://getbootstrap.com/docs/5.3/forms/floating-labels/",
        icon: `
        <div class="form-floating mb-3" style="--bs-body-bg: transparent">
  <input type="text" class="form-control"  style="height: 15px;min-height: 15px;background: #dddddd;padding-left: 5px;font-size: 8px;padding-top: 21px;padding-bottom: 8px;" value="|">
  <label style="font-size: 10px;background-color: transparent; padding: 11px 1px;">Floating label</label>
</div>`,
        label: "Floating label",
        content: `<div class="form-floating mb-3">
  <input type="text" class="form-control" id="floatingInput" placeholder="Label">
  <label for="floatingInput">Label</label>
</div>`,
        properties: [ ]
    },
]

const BOOTSTRAP_LAYOUT = [  
    {
        id: "bs-container",
        isComponent(el) {
            return el && el.classList &&  ( el.classList.contains("container")
            || el.classList.contains("container-sm") || el.classList.contains("container-md")
            || el.classList.contains("container-lg")|| el.classList.contains("container-xl")
            || el.classList.contains("container-xxl")|| el.classList.contains("container-fluid"));
        },
        classId: "container",
        url: "https://getbootstrap.com/docs/5.3/layout/containers/",
        icon: `<div class="border border-info rounded p-1"><div class="row ms-1 me-1">
    <div class="col-12 p-0 bg-info border rounded-1">... </div>
    
  </div></div>`,
        label: "Container",
        content: `<div class="container"><div class="row">
    <div class="col-12"></div>

  </div></div>`,
  
        properties: [
            { 
                label: "Type",
                classPrefix: "",
                classes: [ "container", "container-sm",  "container-md", "container-lg", "container-xl", 
                    "container-xxl", "container-fluid"],
                url: "https://getbootstrap.com/docs/5.3/layout/containers/#responsive-containers"
            },
        ]
    },
    {
        id: "bs-row",
        draggable: 
            [
                ".container", ".container-sm", ".container-md", ".container-lg", 
                ".container-xl", ".container-xxl", ".container-fluid",
                ".container-fluid", ".col-12", ".col-11", ".col-10", ".col-9",
                ".col-8", ".col-7", ".col-6", ".col-5", ".col-4", ".col-3",
                ".col-2", ".col-1"
            ].concat(allColClasses),
        classId: "row",
        url: "https://getbootstrap.com/docs/5.3/layout/grid/",
        icon: `<div class="row ms-1 me-1">
    <div class="col-4 p-0 bg-info border rounded-1">... </div>
    <div class="col-4 p-0 bg-info border rounded-1">... </div>
    <div class="col-4 p-0 bg-info border rounded-1">... </div>
  </div>`,
        label: "Grid row",
        content: `<div class="row">
    <div class="col-12 col-lg-6 col-xxl-4"></div>
    <div class="col-12 col-lg-6 col-xxl-4"> </div>
    <div class="col-12 col-lg-6 col-xxl-4"></div>
  </div>`,
        properties: [
            { 
                label: "Vertical Alignment",
                classPrefix: "align-items",
                classes: [ "", "start",  "center", "end"],
                url: "https://getbootstrap.com/docs/5.3/layout/columns/#vertical-alignment"
            },
            { 
                label: "Horizontal Alignment",
                classPrefix: "justify-content",
                classes: [ "", "start",  "center", "end", "around", "between", "evenly"],
                url: "https://getbootstrap.com/docs/5.3/layout/columns/#horizontal-alignment"
            },
            { 
                label: "Number of columns",
                classPrefix: "row-cols",
                classes: [ "", "1",  "2", "3", "4", "5", "6", "auto"],
                url: "https://getbootstrap.com/docs/5.3/layout/grid/#row-columns"
            },
            { 
                label: "Gutters",
                marginClassXY: "g",
                url: "https://getbootstrap.com/docs/5.3/layout/gutters/"
            },
        ],
        toolbar: [
            {
                label: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-square" viewBox="0 0 16 16">
  <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"/>
  <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/>
</svg>`,
                command: (editor) => {
                    const selectedRow = editor.getSelectedAll()[0] ;

                    selectedRow.append({
                        tagName: 'div',
                        type: 'bs-col',//_extended',
                        attributes: { 
                            "class": "col-12"
                        },
                    }) ;
                }
            }
        ]
    },
    {
        id: "bs-flex",
        classId: "d-flex",
        url: "https://getbootstrap.com/docs/5.3/utilities/flex/",
        icon: `<div class="d-flex border border-info rounded p-1">
    <div class=" p-0 bg-info border rounded-1">... </div>
    <div class=" p-0 bg-info border rounded-1">... </div>
    <div class=" p-0 bg-info border rounded-1">... </div>
  </div>`,
        label: "Flex layout",
        content: `<div class="d-flex">
    <div></div>
  </div>`,
        properties: [
            { 
                label: "Direction",
                classPrefix: "flex",
                classes: [ "", "row",  "row-reverse", "column", "column-reverse"],
                url: "https://getbootstrap.com/docs/5.3/utilities/flex/#direction"
            },
            { 
                label: "Horizontal Alignment",
                classPrefix: "justify-content",
                classes: [ "", "start",  "center", "end", "around", "between", "evenly"],
                url: "https://getbootstrap.com/docs/5.3/utilities/flex/#justify-content"
            },
            { 
                label: "Vertical Alignment",
                classPrefix: "align-items",
                classes: [ "", "start",  "center", "end", "baseline", "stretch"],
                url: "https://getbootstrap.com/docs/5.3/utilities/flex/#align-items"
            },
            {
                label: "Wrapping",
                url: "https://getbootstrap.com/docs/5.3/utilities/flex/#wrap",
                classButtonRadio: [
                    { value: "text-wrap", img: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-text-wrap" viewBox="0 0 16 16">
        <path fill-rule="evenodd" d="M2 3.5a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5m0 4a.5.5 0 0 1 .5-.5h9a2.5 2.5 0 0 1 0 5h-1.293l.647.646a.5.5 0 0 1-.708.708l-1.5-1.5a.5.5 0 0 1 0-.708l1.5-1.5a.5.5 0 0 1 .708.708l-.647.646H11.5a1.5 1.5 0 0 0 0-3h-9a.5.5 0 0 1-.5-.5m0 4a.5.5 0 0 1 .5-.5H7a.5.5 0 0 1 0 1H2.5a.5.5 0 0 1-.5-.5"/>
    </svg>` },
                    { value: "text-nowrap", img: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-body-text" viewBox="0 0 16 16">
        <path fill-rule="evenodd" d="M0 .5A.5.5 0 0 1 .5 0h4a.5.5 0 0 1 0 1h-4A.5.5 0 0 1 0 .5m0 2A.5.5 0 0 1 .5 2h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5m9 0a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m-9 2A.5.5 0 0 1 .5 4h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5m5 0a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m7 0a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5m-12 2A.5.5 0 0 1 .5 6h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5m8 0a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m-8 2A.5.5 0 0 1 .5 8h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m7 0a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5m-7 2a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 0 1h-8a.5.5 0 0 1-.5-.5m0 2a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5m0 2a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5"/>
    </svg>` },
                ]
            },
            { 
                label: "Align content",
                classPrefix: "align-content",
                classes: [ "", "start",  "center", "end", "between", "around", "stretch"],
                url: "https://getbootstrap.com/docs/5.3/utilities/flex/#align-content"
            },
        ]
    },
    {
        id: "bs-flex-element",
        draggable: [  ".d-flex" ],
        isComponent(el) {
            return el && el.parentElement && el.parentElement.classList.contains("d-flex") ;
        },
        url: "https://getbootstrap.com/docs/5.3/utilities/flex/",
        icon: `<div class="d-flex border border-info rounded p-1">
    <div class=" p-0 bg-secondary border rounded-1">... </div>
    <div class=" p-0 bg-secondary border rounded-1">... </div>
    <div class=" p-0 pe-1 ps-1 bg-info text-black border rounded-1 ms-2"> + </div>
  </div>`,
        label: "Flex element",
        content: `<div></div>`,
        properties: [
            { 
                label: "Align",
                classPrefix: "align-self",
                classes: [ "", "start",  "end", "center", "baseline", "stretch"],
                url: "https://getbootstrap.com/docs/5.3/utilities/flex/#align-self"
            },
            { 
                label: "Fill",
                classToggleResponsive: "flex${DEVICE}fill",
                url: "https://getbootstrap.com/docs/5.3/utilities/flex/#fill"
            },
            { 
                label: "Grow/Shrink",
                classPrefixResponsive: "flex${DEVICE}",
                classes: [ "", "grow-1",  "shrink-1","grow-0",  "shrink-0"],
                url: "https://getbootstrap.com/docs/5.3/utilities/flex/#grow-and-shrink"
            },
            { 
                label: "Order",
                classPrefixResponsive: "order${DEVICE}",
                classes: [ "", "1",  "2","3",  "4", "5"],
                url: "https://getbootstrap.com/docs/5.3/utilities/flex/#order"
            }
            
        ]
    },
    {
        id: "bs-table",
        classId:"table",
        url: "https://getbootstrap.com/docs/5.3/content/tables/",
        icon: `<svg xmlns="http://www.w3.org/2000/svg" style="transform: scale(1.5); margin-top:5px" width="16" height="16" fill="currentColor" class="bi bi-table" viewBox="0 0 16 16">
  <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm15 2h-4v3h4zm0 4h-4v3h4zm0 4h-4v3h3a1 1 0 0 0 1-1zm-5 3v-3H6v3zm-5 0v-3H1v2a1 1 0 0 0 1 1zm-4-4h4V8H1zm0-4h4V4H1zm5-3v3h4V4zm4 4H6v3h4z"/>
</svg>`,
        label: "Table",
        content: `<table class="table">
  <thead>
    <tr>
      <th scope="col"></th>
      <th scope="col"></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row"></th>
      <td></td>
    </tr></tbody></table>`,
        properties: [
            { 
                label: "Color",
                classPrefix: "table",
                classes: [ "", "primary",  "secondary", "success", "danger", "warning", "info", "light", "dark" ],
                url: "https://getbootstrap.com/docs/5.3/content/tables/#variants"
            },
            { 
                label: "Striped rows",
                classToggle: "table-striped",
                url: "https://getbootstrap.com/docs/5.3/content/tables/#striped-rows"
            },
            { 
                label: "Striped columns",
                classToggle: "table-striped-columns",
                url: "https://getbootstrap.com/docs/5.3/content/tables/#striped-columns"
            },
            { 
                label: "Hoverable rows",
                classToggle: "table-hover",
                url: "https://getbootstrap.com/docs/5.3/content/tables/#hoverable-rows"
            },
            { 
                label: "Bordered",
                classToggle: "table-bordered",
                url: "https://getbootstrap.com/docs/5.3/content/tables/#bordered-tables"
            },
            { 
                label: "Borderless",
                classToggle: "table-borderless",
                url: "https://getbootstrap.com/docs/5.3/content/tables/#tables-without-borders"
            },
            { 
                label: "Condensed",
                classToggle: "table-sm",
                url: "https://getbootstrap.com/docs/5.3/content/tables/#small-tables"
            },            
        ]
    },
    {
        id: "bs-tr",
        isComponent(el) {
            return el && el.tagName === "TR" ;
        },
        draggable: [  "thead" , "tbody" ],
        url: "https://getbootstrap.com/docs/5.3/content/tables/",
        icon: `<svg xmlns="http://www.w3.org/2000/svg" style="transform: scale(1.5); margin-top:5px" width="16" height="16" fill="currentColor" class="bi bi-table" viewBox="0 0 16 16">
  <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm15 2h-4v3h4zm0 4h-4v3h4zm0 4h-4v3h3a1 1 0 0 0 1-1zm-5 3v-3H6v3zm-5 0v-3H1v2a1 1 0 0 0 1 1zm-4-4h4V8H1zm0-4h4V4H1zm5-3v3h4V4zm4 4H6v3h4z"/>
</svg>`,
        label: "Table row",
        content: `<tr><td></td></tr>`,
        properties: [
            { 
                label: "Color",
                classPrefix: "table",
                classes: [ "", "primary",  "secondary", "success", "danger", "warning", "info", "light", "dark" ],
                url: "https://getbootstrap.com/docs/5.3/content/tables/#variants"
            },
            { 
                label: "Active",
                classToggle: "table-active",
                url: "https://getbootstrap.com/docs/5.3/content/tables/#active-tables"
            },            
        ]
    },
    {
        id: "bs-td",
        isComponent(el) {
            return el && ['TH','TD'].includes(el.tagName) ;
        },
        draggable: [  "tr" ],
        url: "https://getbootstrap.com/docs/5.3/content/tables/",
        icon: `<svg xmlns="http://www.w3.org/2000/svg" style="transform: scale(1.5); margin-top:5px" width="16" height="16" fill="currentColor" class="bi bi-table" viewBox="0 0 16 16">
  <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm15 2h-4v3h4zm0 4h-4v3h4zm0 4h-4v3h3a1 1 0 0 0 1-1zm-5 3v-3H6v3zm-5 0v-3H1v2a1 1 0 0 0 1 1zm-4-4h4V8H1zm0-4h4V4H1zm5-3v3h4V4zm4 4H6v3h4z"/>
</svg>`,
        label: "Table cell",
        editable: true,
        content: `<td></td>`,
        properties: [
            { 
                label: "Cell type",
                property: "tagName",
                propertiesValues: [
                    {value: 'td', name: "Normal cell" },
                    {value: 'th', name: "Title cell" }
                ],
                url: "https://getbootstrap.com/docs/5.3/content/typography/#headings"
            },
            { 
                label: "Color",
                classPrefix: "table",
                classes: [ "", "primary",  "secondary", "success", "danger", "warning", "info", "light", "dark" ],
                url: "https://getbootstrap.com/docs/5.3/content/tables/#variants"
            },
            { 
                label: "Active",
                classToggle: "table-active",
                url: "https://getbootstrap.com/docs/5.3/content/tables/#active-tables"
            },            
        ]
    }
]

const BOOTSTRAP_COMPONENTS = [    
    {
        id: "bs-alerts",
        classId: "alert",
        url: "https://getbootstrap.com/docs/5.1/components/alerts/",
        icon: `<div class="alert alert-primary p-1 mb-0" role="alert">
        <div class="d-flex align-items-center">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" class="bi bi-exclamation-triangle-fill flex-shrink-0 me-2" viewBox="0 0 16 16" role="img" aria-label="Warning:">
            <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
        </svg>
        <div>...</div>
        </div>
        </div>`,
        label: "Alert",
        content: `<div class="alert alert-primary" role="alert">
        <div class="d-flex align-items-center">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" class="bi bi-exclamation-triangle-fill flex-shrink-0 me-2" viewBox="0 0 16 16" role="img" aria-label="Warning:">
            <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
        </svg>
        <div>
            <span>Your alert message</span>
        </div>
        </div>
      </div>`,
        properties: [
            { 
                label: "Color",
                classPrefix: "alert",
                url: "https://getbootstrap.com/docs/5.3/components/alerts/#examples"
            },
            { 
                label: "Dismissible",
                url: "https://getbootstrap.com/docs/5.3/components/alerts/#dismissing",
                customType: {
                    createInput:  `<input type="checkbox" class="form-check-input" style="width: auto; margin-left: 2px; appearance: auto;" /> `,
                    //user change property
                    onEvent: ({elInput, component })=>{
                        const input = elInput.querySelector('input');

                        if (input.checked) {
                            component.addClass(["alert-dismissible","fade","show"]);
                            component.append('<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>');
                        } else {
                            let buttonClose = component.find('.btn-close');
                            for(let bt of buttonClose){
                                bt.remove() ;
                            }
                            component.removeClass(["alert-dismissible","fade","show"]);
                        }
                    },
                    //component selected in canvas
                    onUpdate: ({elInput, component })=>{
                        const input = elInput.querySelector('input');

                        input.checked = component.getClasses().includes("alert-dismissible");
                    },
                }
            }
        ]
    },
    {
        id: "bs-accordion",
        classId: "accordion",
        url: "https://getbootstrap.com/docs/5.1/components/accordion/",
        icon: `<style>
        .gjs-block__media .accordion-button::after {width: 10px;height: 10px; background-size: 10px;}
        .gjs-block__media .accordion-button {font-size: 10px;}
        </style><div class="accordion mb-0">
  <div class="accordion-item">
    <div class="accordion-header">
      <button class="accordion-button collapsed ps-2 pe-1 py-0" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
        ...
      </button>
    </div>
  </div>
  <div class="accordion-item">
    <div class="accordion-header">
      <button class="accordion-button bg-info collapsed ps-2 pe-1 py-0" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
        ...
      </button>
    </div>

  </div></div>`,
        label: "Accordion",
        content: `<div class="accordion" id="accordionExample">
  <div class="accordion-item">
    <h2 class="accordion-header">
      <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
        Accordion Item #1
      </button>
    </h2>
    <div id="collapseOne" class="accordion-collapse collapse show" data-bs-parent="#accordionExample">
      <div class="accordion-body">
        <strong>This is the first item's accordion body.</strong> It is shown by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
      </div>
    </div>
  </div>
  <div class="accordion-item">
    <h2 class="accordion-header">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
        Accordion Item #2
      </button>
    </h2>
    <div id="collapseTwo" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
      <div class="accordion-body">
        <strong>This is the second item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
      </div>
    </div>
  </div>
  <div class="accordion-item">
    <h2 class="accordion-header">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
        Accordion Item #3
      </button>
    </h2>
    <div id="collapseThree" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
      <div class="accordion-body">
        <strong>This is the third item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
      </div>
    </div>
  </div>
</div>`,
        properties: [
            { 
                label: "Flush",
                classToggle: "accordion-flush",
                url: "https://getbootstrap.com/docs/5.3/components/accordion/#flush"
            },
        ]
    },
    {
        id: "bs-accordion-body",
        classId: "accordion-body",
        propertiesOnly: true,
        label: "Accordion body",
        editable: true,
        droppable: true
    },
    {
        id: "bs-badge",
        classId: "badge",
        url: "https://getbootstrap.com/docs/5.1/components/badge/",
        icon: `<span class="badge text-bg-info">badge</span>`,
        label: "Badge",
        content: `<span class="badge text-bg-secondary">badge</span>`,
        properties: [
            { 
                label: "Color",
                classPrefix: "text-bg",
                url: "https://getbootstrap.com/docs/5.3/components/badge/#background-colors"
            },
            { 
                label: "Pill",
                classToggle: "rounded-pill",
                url: "https://getbootstrap.com/docs/5.3/components/badge/#pill-badges"
            },
        ]
    },
    {
        id: "bs-breadcrumb",
        classId: "breadcrumb",
        url: "https://getbootstrap.com/docs/5.1/components/breadcrumb/",
        icon: `<nav aria-label="breadcrumb">
  <ol class="breadcrumb pt-1" style="font-size: 0.8em;">
    <li class="breadcrumb-item font-weight-bold">Bread</li>
    <li class="breadcrumb-item active text-white" style="--bs-breadcrumb-item-padding-x:2px; --bs-breadcrumb-divider-color: white" aria-current="page">Crumb</li>
  </ol>
</nav>`,
        label: "Breadcrumb",
        content: `<nav aria-label="breadcrumb">
  <ol class="breadcrumb">
    <li class="breadcrumb-item"><a href="#">Home</a></li>
    <li class="breadcrumb-item active" aria-current="page">Library</li>
  </ol>
</nav>`,
        properties: [
            
        ]
    },
    {
        id: "bs-button",
        classId: "btn",
        url: "https://getbootstrap.com/docs/5.1/components/buttons/",
        icon: `<button type="button" class="btn btn-info btn-sm">Btn</button>`,
        label: "Button",
        content: `<button type="button" class="btn btn-primary"><span>Button</span></button>`,
        properties: [
            { 
                label: "Color",
                classPrefix: "btn",
                classes: [
                    "primary", "secondary", "success", "danger", 
                    "warning", "info", "light", "dark", 
                    "outline-primary", "outline-secondary", "outline-success", "outline-danger", 
                    "outline-warning", "outline-info", "outline-light", "outline-dark", 
                    "link"],
                url: "https://getbootstrap.com/docs/5.3/components/buttons/#variants"
            },
            { 
                label: "Size",
                classPrefix: "btn",
                classes: [ "", "sm",  "lg"],
                url: "https://getbootstrap.com/docs/5.3/components/buttons/#sizes"
            },
            { 
                label: "Disabled",
                attributeToggle: "disabled",
                url: "https://getbootstrap.com/docs/5.3/components/buttons/#disabled-state"
            },
            { 
                label: "Toggle button",
                attributeToggle: {"data-bs-toggle": "button"},
                url: "https://getbootstrap.com/docs/5.3/components/buttons/#toggle-states"
            },
        ]
    },
    {
        id: "bs-button-group",
        classId: "btn-group",
        url: "https://getbootstrap.com/docs/5.3/components/button-group/",
        icon: `<div class="btn-group btn-group-sm" role="group" aria-label="Basic example">
  <button type="button" class="btn btn-info ps-1 pe-0">Btn</button>
  <button type="button" class="btn btn-primary ps-0 pe-1">Grp</button>
</div>`,
        label: "Button group",
        content: `<div class="btn-group" role="group" aria-label="Basic example">
  <button type="button" class="btn btn-primary">Left</button>
  <button type="button" class="btn btn-primary">Middle</button>
  <button type="button" class="btn btn-primary">Right</button>
</div>`,
        properties: [
            { 
                label: "Size",
                classPrefix: "btn-group",
                classes: [ "", "sm",  "lg"],
                url: "https://getbootstrap.com/docs/5.3/components/button-group/#sizing"
            },
            { 
                label: "Vertical",
                classToggle: "btn-group-vertical",
                url: "https://getbootstrap.com/docs/5.3/components/button-group/#vertical-variation"
            }
        ]
    },
    {
        id: "bs-button-toolbar",
        classId: "btn-toolbar",
        url: "https://getbootstrap.com/docs/5.3/components/button-group/#button-toolbar",
        icon: `<div class="btn-group btn-group-sm" role="group" aria-label="Basic example">
  <button type="button" class="btn btn-info ps-1 pe-0">Tool</button>
  <button type="button" class="btn btn-primary ps-0 pe-1">Bar</button>
</div>`,
        label: "Button toolbar",
        content: `<div class="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups">
  <div class="btn-group me-2" role="group" aria-label="First group">
    <button type="button" class="btn btn-primary">1</button>
    <button type="button" class="btn btn-primary">2</button>
    <button type="button" class="btn btn-primary">3</button>
    <button type="button" class="btn btn-primary">4</button>
  </div>
  <div class="btn-group me-2" role="group" aria-label="Second group">
    <button type="button" class="btn btn-secondary">5</button>
    <button type="button" class="btn btn-secondary">6</button>
    <button type="button" class="btn btn-secondary">7</button>
  </div>
  <div class="btn-group" role="group" aria-label="Third group">
    <button type="button" class="btn btn-info">8</button>
  </div>
</div>`,
        properties: [
        ]
    },
    {
        id: "bs-card",
        classId: "card",
        url: "https://getbootstrap.com/docs/5.3/components/card/",
        icon: `<div class="card" style="width: 50px;font-size: 8px;">
  <svg class="bd-placeholder-img card-img-top" width="100%" height="20" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Image cap" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#868e96"></rect><text x="5" y="10" fill="#dee2e6" dy=".3em">Image</text></svg>
  <div class="card-body" style="font-size: 8px;padding: 3px 5px;text-align: left;">
    <p class="card-text" style="text-align: left;margin: 0;">Text</p>
  </div>
</div>`,
        label: "Card with image",
        content: `<div class="card" style="width: 18rem;">
  <img class="card-img-top"  src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAiIHZpZXdCb3g9IjAgMCAyNCAyNCIgc3R5bGU9ImZpbGw6IHJnYmEoMCwwLDAsMC4xNSk7IHRyYW5zZm9ybTogc2NhbGUoMC43NSkiPgogICAgICAgIDxwYXRoIGQ9Ik04LjUgMTMuNWwyLjUgMyAzLjUtNC41IDQuNSA2SDVtMTYgMVY1YTIgMiAwIDAgMC0yLTJINWMtMS4xIDAtMiAuOS0yIDJ2MTRjMCAxLjEuOSAyIDIgMmgxNGMxLjEgMCAyLS45IDItMnoiPjwvcGF0aD4KICAgICAgPC9zdmc+">
  <div class="card-body">
    <h5 class="card-title">Card title</h5>
    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    <a href="#" class="btn btn-primary">Go somewhere</a>
  </div>
</div>`,
        properties: [
        ]
    },
    {
        id: "bs-card-header-footer",
        url: "https://getbootstrap.com/docs/5.3/components/card/#header-and-footer",
        icon: `<div class="card" style="width: 50px;font-size: 8px;">
  <div class="card-header" style="padding: 0">
    Header
  </div>
  <div class="card-body" style="font-size: 8px;padding: 3px 5px;text-align: left;">
    <p class="card-text" style="text-align: left;margin: 0;">Text</p>
  </div>
  <div class="card-footer" style="padding: 0">
    Footer
  </div>
</div>`,
        label: "Card with header/footer",
        content: `<div class="card">
  <div class="card-header">
    Header
  </div>
  <div class="card-body">
    <h5 class="card-title">Special title treatment</h5>
    <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
  </div>
  <div class="card-footer text-body-secondary">
    Footer
  </div>
</div>`,
        properties: [
        ]
    },
    {
        id: "bs-carousel",
        classId: "carousel",
        url: "https://getbootstrap.com/docs/5.3/components/carousel/",
        icon: `<div id="carouselExample" class="carousel slide">
  <div class="carousel-inner">
    <div class="carousel-item active" style="font-size: 8px;">
      <svg class="bd-placeholder-img bd-placeholder-img-lg d-block w-100" width="50" height="40" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: First slide" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#777"></rect><text x="22%" y="50%" fill="#555" dy=".3em">First slide</text></svg>
    </div>
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>`,
        label: "Carousel",
        content: `<div id="carouselExample" class="carousel slide">
  <div class="carousel-inner">
    <div class="carousel-item active">
      <img class="d-block w-100" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAiIHZpZXdCb3g9IjAgMCAyNCAyNCIgc3R5bGU9ImZpbGw6IHJnYmEoMCwwLDAsMC4xNSk7IHRyYW5zZm9ybTogc2NhbGUoMC43NSkiPgogICAgICAgIDxwYXRoIGQ9Ik04LjUgMTMuNWwyLjUgMyAzLjUtNC41IDQuNSA2SDVtMTYgMVY1YTIgMiAwIDAgMC0yLTJINWMtMS4xIDAtMiAuOS0yIDJ2MTRjMCAxLjEuOSAyIDIgMmgxNGMxLjEgMCAyLS45IDItMnoiPjwvcGF0aD4KICAgICAgPC9zdmc+">
    </div>
    <div class="carousel-item">
      <img class="d-block w-100"  src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAiIHZpZXdCb3g9IjAgMCAyNCAyNCIgc3R5bGU9ImZpbGw6IHJnYmEoMCwwLDAsMC4xNSk7IHRyYW5zZm9ybTogc2NhbGUoMC43NSkiPgogICAgICAgIDxwYXRoIGQ9Ik04LjUgMTMuNWwyLjUgMyAzLjUtNC41IDQuNSA2SDVtMTYgMVY1YTIgMiAwIDAgMC0yLTJINWMtMS4xIDAtMiAuOS0yIDJ2MTRjMCAxLjEuOSAyIDIgMmgxNGMxLjEgMCAyLS45IDItMnoiPjwvcGF0aD4KICAgICAgPC9zdmc+">
    </div>
    <div class="carousel-item">
      <img class="d-block w-100" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAiIHZpZXdCb3g9IjAgMCAyNCAyNCIgc3R5bGU9ImZpbGw6IHJnYmEoMCwwLDAsMC4xNSk7IHRyYW5zZm9ybTogc2NhbGUoMC43NSkiPgogICAgICAgIDxwYXRoIGQ9Ik04LjUgMTMuNWwyLjUgMyAzLjUtNC41IDQuNSA2SDVtMTYgMVY1YTIgMiAwIDAgMC0yLTJINWMtMS4xIDAtMiAuOS0yIDJ2MTRjMCAxLjEuOSAyIDIgMmgxNGMxLjEgMCAyLS45IDItMnoiPjwvcGF0aD4KICAgICAgPC9zdmc+">
    </div>
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>`,
        properties: [
            { 
                label: "Crossfade",
                classToggle: "carousel-fade",
                url: "https://getbootstrap.com/docs/5.3/components/carousel/#crossfade"
            },
        ]
    },
    {
        id: "bs-collapse",
        classId: "collapse",
        url: "https://getbootstrap.com/docs/5.3/components/carousel/",
        icon: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrows-collapse" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13A.5.5 0 0 1 1 8m7-8a.5.5 0 0 1 .5.5v3.793l1.146-1.147a.5.5 0 0 1 .708.708l-2 2a.5.5 0 0 1-.708 0l-2-2a.5.5 0 1 1 .708-.708L7.5 4.293V.5A.5.5 0 0 1 8 0m-.5 11.707-1.146 1.147a.5.5 0 0 1-.708-.708l2-2a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 11.707V15.5a.5.5 0 0 1-1 0z"/>
</svg>`,
        label: "Collapse",
        content: `<button class="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
    Expand/collapse
  </button>
<div class="collapse" id="collapseExample">
  Collapse content
</div>`,
        properties: [
            { 
                label: "Id",
                name: "id",
                customType : {
                    createInput:  `<input type="text" /> `,
                    //user change property
                    onEvent: ({elInput, component })=>{
                        const input = elInput.querySelector('input');

                        let buttons = component.em.getWrapper().find(`button[data-bs-target="${component.getAttributes().id}"]`) ;
                        for(let c of buttons){
                            //update attribute of button
                            c.setAttributes({...c.getAttributes(), "data-bs-target": input.value});
                        }

                        component.setAttributes({...component.getAttributes(), id: input.value});
                    },
                    //component selected in canvas
                    onUpdate: ({elInput, component })=>{
                        const input = elInput.querySelector('input');

                        input.value = component.getAttributes().id??"";
                    },
                }
            },
            { 
                label: "Horizontal",
                classToggle: "collapse-horizontal",
                url: "https://getbootstrap.com/docs/5.3/components/collapse/#horizontal"
            },
            
        ]
    },
    {
        id: "bs-dropdown",
        isComponent(el) {
            return el && el.classList &&  ( el.classList.contains("dropdown")|| el.classList.contains("dropup")|| el.classList.contains("dropdown-center")
            || el.classList.contains("dropend")|| el.classList.contains("dropstart"));
        },
        url: "https://getbootstrap.com/docs/5.3/components/dropdowns/",
        icon: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-menu-button" viewBox="0 0 16 16">
  <path d="M0 1.5A1.5 1.5 0 0 1 1.5 0h8A1.5 1.5 0 0 1 11 1.5v2A1.5 1.5 0 0 1 9.5 5h-8A1.5 1.5 0 0 1 0 3.5zM1.5 1a.5.5 0 0 0-.5.5v2a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-2a.5.5 0 0 0-.5-.5z"/>
  <path d="m7.823 2.823-.396-.396A.25.25 0 0 1 7.604 2h.792a.25.25 0 0 1 .177.427l-.396.396a.25.25 0 0 1-.354 0M0 8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm1 3v2a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2zm14-1V8a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v2zM2 8.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5m0 4a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5"/>
</svg>`,
        label: "Collapse",
        content: `<div class="dropdown">
  <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
    Dropdown button
  </button>
  <ul class="dropdown-menu">
    <li><a class="dropdown-item" href="#">Action</a></li>
    <li><a class="dropdown-item" href="#">Another action</a></li>
    <li><a class="dropdown-item" href="#">Something else here</a></li>
  </ul>
</div>`,
        properties: [
            { 
                label: "Direction",
                classPrefix: "",
                classes: [ "dropdown", "dropdown-center",  "dropup", 
                    "dropup-center dropup", "dropup-center dropup", "dropend", "dropstart"],
                url: "https://getbootstrap.com/docs/5.3/components/dropdowns/#directions"
            },
        ]
    },
    {
        id: "bs-dropdown-item",
        classId: "dropdown-item",
        propertiesOnly: true,
        label: "Dropdown item",
        properties: [
            { 
                label: "Active",
                classToggle: "active",
                url: "https://getbootstrap.com/docs/5.3/components/dropdowns/#active"
            },
            { 
                label: "Disabled",
                classToggle: "disabled",
                url: "https://getbootstrap.com/docs/5.3/components/dropdowns/#disabled"
            },
        ]
    },
    {
        id: "bs-list-group",
        classId: "list-group",
        url: "https://getbootstrap.com/docs/5.3/components/list-group/",
        icon: `<ul class="list-group" style="font-size: 8px;">
  <li class="list-group-item" style="padding: 0;">A</li>
  <li class="list-group-item" style="padding: 0;">B</li>
  <li class="list-group-item" style="padding: 0;">C</li>
</ul>`,
        label: "List group",
        content: `<ul class="list-group">
  <li class="list-group-item">An item</li>
  <li class="list-group-item">A second item</li>
  <li class="list-group-item">A third item</li>
</ul>`,
        properties: [
            { 
                label: "Flush",
                classToggle: "list-group-flush",
                url: "https://getbootstrap.com/docs/5.3/components/list-group/#flush"
            },
            { 
                label: "Numbered",
                classToggle: "list-group-numbered",
                url: "https://getbootstrap.com/docs/5.3/components/list-group/#numbered"
            },
            { 
                label: "Horizontal",
                classToggle: "list-group-horizontal",
                url: "https://getbootstrap.com/docs/5.3/components/list-group/#horizontal"
            },
        ]
    },
    {
        id: "bs-list-group-item",
        classId: "list-group-item",
        propertiesOnly: true,
        editable: true,
        label: "List group item",
        properties: [
            { 
                label: "Active",
                classToggle: "active",
                url: "https://getbootstrap.com/docs/5.3/components/list-group/#active-items"
            },
            { 
                label: "Disabled",
                classToggle: "disabled",
                url: "https://getbootstrap.com/docs/5.3/components/list-group/#disabled-items"
            },
        ]
    },
    {
        id: "bs-navbar",
        classId: "navbar",
        url: "https://getbootstrap.com/docs/5.3/components/navbar/",
        icon: `<nav class="navbar bg-body-tertiary" style="padding: 0px;">
  <div class="container-fluid">
    <a class="navbar-brand" href="#" style="font-size: 8px;">Navbar</a>
  </div>
</nav>`,
        label: "Navbar",
        content: `<nav class="navbar navbar-expand-lg bg-body-tertiary">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">Navbar</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="#">Home</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Link</a>
        </li>
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Dropdown
          </a>
          <ul class="dropdown-menu">
            <li><a class="dropdown-item" href="#">Action</a></li>
            <li><a class="dropdown-item" href="#">Another action</a></li>
            <li><hr class="dropdown-divider"></li>
            <li><a class="dropdown-item" href="#">Something else here</a></li>
          </ul>
        </li>
        <li class="nav-item">
          <a class="nav-link disabled" aria-disabled="true">Disabled</a>
        </li>
      </ul>
      <form class="d-flex" role="search">
        <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
        <button class="btn btn-outline-success" type="submit">Search</button>
      </form>
    </div>
  </div>
</nav>`,
        properties: [
            { 
                label: "Placement",
                classPrefix: "",
                classes: [ "", "fixed-top",  "fixed-bottom", 
                    "sticky-top", "sticky-bottom"],
                url: "https://getbootstrap.com/docs/5.3/components/navbar/#placement"
            },
        ]
    },
    {
        id: "bs-nav-tabs",
        classId: "nav",
        url: "https://getbootstrap.com/docs/5.3/components/navs-tabs",
        icon: `<ul class="nav nav-tabs" style="font-size: 8px;">
  <li class="nav-item">
    <a class="nav-link active" aria-current="page" href="#" style="padding: 1px 10px;">A</a>
  </li>
  <li class="nav-item">
    <a class="nav-link" href="#" style="padding: 1px 10px;">B</a>
  </li></ul>`,
        label: "Tabs",
        content: `<ul class="nav nav-tabs" id="myTab" role="tablist">
  <li class="nav-item" role="presentation">
    <button class="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home-tab-pane" type="button" role="tab" aria-controls="home-tab-pane" aria-selected="true"><span>Home</span></button>
  </li>
  <li class="nav-item" role="presentation">
    <button class="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile-tab-pane" type="button" role="tab" aria-controls="profile-tab-pane" aria-selected="false"><span>Profile</span></button>
  </li>
  <li class="nav-item" role="presentation">
    <button class="nav-link" id="contact-tab" data-bs-toggle="tab" data-bs-target="#contact-tab-pane" type="button" role="tab" aria-controls="contact-tab-pane" aria-selected="false"><span>Contact</span></button>
  </li>
  <li class="nav-item" role="presentation">
    <button class="nav-link" id="disabled-tab" data-bs-toggle="tab" data-bs-target="#disabled-tab-pane" type="button" role="tab" aria-controls="disabled-tab-pane" aria-selected="false" disabled><span>Disabled</span></button>
  </li>
</ul>
<div class="tab-content" id="myTabContent">
  <div class="tab-pane fade show active" id="home-tab-pane" role="tabpanel" aria-labelledby="home-tab" tabindex="0"><span>Home contents</span></div>
  <div class="tab-pane fade" id="profile-tab-pane" role="tabpanel" aria-labelledby="profile-tab" tabindex="0"><span>Profile contents</span></div>
  <div class="tab-pane fade" id="contact-tab-pane" role="tabpanel" aria-labelledby="contact-tab" tabindex="0"><span>Contact contents</span></div>
  <div class="tab-pane fade" id="disabled-tab-pane" role="tabpanel" aria-labelledby="disabled-tab" tabindex="0"><span>Disabled contents</span></div>
</div>`,
        properties: [
            { 
                label: "Style",
                classPrefix: "nav",
                classes: [ "tabs", "pills", "underline"],
                url: "https://getbootstrap.com/docs/5.3/components/navs-tabs/#pills"
            },
            { 
                label: "Fill and justify",
                classPrefix: "nav",
                classes: [ "", "fill", "justified"],
                url: "https://getbootstrap.com/docs/5.3/components/navs-tabs/#fill-and-justify"
            },
        ]
    },
    {
        id: "bs-nav-link",
        classId: "nav-link",
        propertiesOnly: true,
        label: "Nav link",
        properties: [
            { 
                label: "Id",
                name: "id",
                category: categoryBase,
                customType : {
                    createInput:  `<input type="text" placeholder="id here !" /> `,
                    //user change property
                    onEvent: ({elInput, component })=>{
                        const input = elInput.querySelector('input');


                        let panes = component.em.getWrapper().find(`div[aria-labelledby="${component.getAttributes().id}"]`) ;
                        for(let c of panes){
                            c.setAttributes({...c.getAttributes(), "aria-labelledby": input.value,  id: input.value+"-pane"});
                        }

                        component.setAttributes({...component.getAttributes(), id: input.value, "data-bs-target": "#"+input.value+"-pane"});
                    },
                    //component selected in canvas
                    onUpdate: ({elInput, component })=>{
                        const input = elInput.querySelector('input');

                        input.value = component.getAttributes().id??"";
                    },
                }
            },
        ]
    },
    {
        id: "bs-nav-pane",
        classId: "tab-pane",
        propertiesOnly: true,
        label: "Nav pane",
        properties: [
            { 
                label: "Id",
                name: "id",
                category: categoryBase,
                customType : {
                    createInput:  `<input type="text" placeholder="id here !" /> `,
                    //user change property
                    onEvent: ({elInput, component })=>{
                        const input = elInput.querySelector('input');

                        let idTab = input.value.replace("-pane", "") ;
                        if(idTab === input.value){
                            idTab += "-tab" ;
                        }
                        let tabs = component.em.getWrapper().find(`[data-bs-target="#${component.getAttributes().id}"]`) ;
                        for(let c of tabs){
                            c.setAttributes({...c.getAttributes(), "data-bs-target": "#"+input.value,  id: idTab});
                        }

                        component.setAttributes({...component.getAttributes(), id: input.value, "aria-labelledby": idTab});
                    },
                    //component selected in canvas
                    onUpdate: ({elInput, component })=>{
                        const input = elInput.querySelector('input');

                        input.value = component.getAttributes().id??"";
                    },
                }
            },
        ]
    },
    {
        id: "bs-placeholder",
        classId: "placeholder",
        url: "https://getbootstrap.com/docs/5.3/components/placeholders",
        icon: `
        <div style="text-align: left">
        <div class="placeholder" style="width: 50px;min-height: 10px;display: block;margin-bottom: 5px;"></div>
        <div class="placeholder" style="width: 30px;min-height: 10px;display: block"></div>
        </div>
        `,
        label: "Placeholder",
        content: `<p class="card-text placeholder-glow">
      <span class="placeholder col-7"></span>
      <span class="placeholder col-4"></span>
      <span class="placeholder col-4"></span>
      <span class="placeholder col-6"></span>
      <span class="placeholder col-8"></span>
    </p>`,
        properties: [
            
        ]
    },
    {
        id: "bs-progress",
        classId: "progress",
        url: "https://getbootstrap.com/docs/5.3/components/progress/",
        icon: `<div class="progress" role="progressbar" aria-label="Basic example" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100">
  <div class="progress-bar" style="width: 50%"></div>
</div>`,
        label: "Progress bar",
        content: `<div class="progress" role="progressbar" aria-label="Example with label" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
  <div class="progress-bar" style="width: 25%">25%</div>
</div>`,
        properties: [
            
        ]
    },
    {
        id: "bs-progress-bar",
        classId: "progress-bar",
        label: "Progress bar",
        propertiesOnly: true,
        properties: [
            { 
                label: "Striped",
                classToggle: "progress-bar-striped",
                url: "https://getbootstrap.com/docs/5.3/components/progress/#striped"
            },
            { 
                label: "Animated",
                classToggle: "progress-bar-animated",
                url: "https://getbootstrap.com/docs/5.3/components/progress/#animated-stripes"
            },
        ]
    },
    {
        id: "bs-spinner",
        isComponent(el) {
            return el && el.classList &&  ( el.classList.contains("spinner-border")|| el.classList.contains("spinner-grow"));
        },
        url: "https://getbootstrap.com/docs/5.3/components/spinners/",
        icon: `<div class="spinner-border spinner-border-sm" role="status" style="animation: none;"></div>`,
        label: "Spinner",
        content: `<div class="spinner-border" role="status">
  <span class="visually-hidden">Loading...</span>
</div>`,
        properties: [
            { 
                label: "Style",
                classPrefix: "spinner",
                classes: [ "border", "grow"],
                url: "https://getbootstrap.com/docs/5.3/components/spinners/#growing-spinner"
            },
            { 
                label: "Small",
                classToggle: ["spinner-border-sm", "spinner-grow-sm"],
                url: "https://getbootstrap.com/docs/5.3/components/spinners/#size"
            },
        ]
    },
]

const BOOTSTRAP_BLOCKS = [
    {
        name: "Typography",
        blocks: BOOTSTRAP_TEXT
    },
    {
        name: "Media",
        blocks: BOOTSTRAP_MEDIA
    },
    {
        name: "Form",
        blocks: BOOTSTRAP_FORM
    },
    {
        name: "Layout",
        blocks: BOOTSTRAP_LAYOUT
    },
    {
        name: "Components",
        blocks: BOOTSTRAP_COMPONENTS
    }
]

const IMG_HELP = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" class="bi bi-question-circle" viewBox="0 0 16 16">
<path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"></path>
<path d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286m1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94"></path></svg>`;

function bootstrapPlugin(editor) {
    panelDevices(editor);
    //automatically update attributes related to id
    const linkedId = [
        { idElementClass: "collapse", linkedAttribute: "data-bs-target" },
        { idElementTagName: "input", linkedAttribute: "for" }
    ]
    editor.on('block:drag:stop', components => {
        if (!components) return;
        if(!Array.isArray(components)){
            components = [components] ;
        }

        for(let linkId of linkedId){
            //search for element 
            let componentWithId = components.find(c=>{
                if(linkId.idElementClass){
                    return c.getClasses().includes(linkId.idElementClass)
                }else if(linkId.idElementTagName){
                    return c.get("tagName") === linkId.idElementTagName ;
                }
            }) ;
            if(!componentWithId){
                //search in sub components
                for(let c of components){
                    if(linkId.idElementClass){
                        componentWithId = c.find("."+linkId.idElementClass)[0]
                    }else if(linkId.idElementTagName){
                        componentWithId = c.find(linkId.idElementTagName)[0]
                    }
                }
            }
            if(componentWithId){
                //search element to modify
                let componentsAttribute = components.filter(c=>c.getAttributes()[linkId.linkedAttribute]);
                for(let c of components){
                    componentsAttribute = componentsAttribute.concat(c.find(`[${linkId.linkedAttribute}]`))
                }
                for(let c of componentsAttribute){
                    //update attribute of button
                    c.setAttributes({...c.getAttributes(), [linkId.linkedAttribute]: componentWithId.getId()});
                }
            }
        }
    });

    editor.Traits.addType('class_select_responsive', createCustomTrait(typeClassSelectResponsive));
    editor.Traits.addType('class_checkbox_responsive', createCustomTrait(typeClassCheckboxResponsive));
    editor.Traits.addType('attribute_margin', createCustomTrait(typeAttributeMargin));
    editor.Traits.addType('attribute_margin_xy', createCustomTrait(typeAttributeMarginXY));
    const defaultType = editor.Components.getType('default');
    const defaultModel = defaultType.model;

    const contexts = [
        'primary',
        'secondary',
        'success',
        'info',
        'warning',
        'danger',
        'light',
        'dark',
    ]; 


    
    for(let category of BOOTSTRAP_BLOCKS){
        for(let block of category.blocks){
            if(!block.propertiesOnly){
                editor.Blocks.add(block.id, {
                    media: `<div class="position-relative">${block.icon}${block.url?`
                        <div style="position: absolute; top: -13px; right:-9px; z-index: 999">
                        ${IMG_HELP}
                        </div>`:""}</div>`,
                    label: block.label,
                    title: block.label,
                    attributes: {
                        title: block.label,
                        onclick: block.url?`(event.offsetX>70 && event.offsetY<10)?window.open('${block.url}'):''`:""
                    },
                    category: category.name,
                    content:  block.content
                });
            }
            let traits = [];
            for(let trait of defaultModel.prototype.defaults.traits){
                traits.push(trait) ;
            }
            if(block.properties && block.properties.length>0){
                const categoryTrait = {id: block.id, label: block.label}
                for(let prop of block.properties){
                    let trait = {
                        name: prop.name??(block.id+"_"+prop.label),
                        title: prop.label,
                        label: prop.label+`${prop.url?` <a href="${prop.url}" target="_blank" class="ms-auto text-decoration-none text-white">${IMG_HELP}</a>`:""}`,
                        templateLabel: function (){
                            const { ppfx } = this;
                            return `<div class="${ppfx}label d-flex" title="${this.model.get("title")}">${this.model.get("label")}</div>`;
                        },
                        category: prop.category||categoryTrait
                    }
                    if(prop.classPrefix !== undefined){
                        trait.type = 'class_select' ;
                        let classes = prop.classes;
                        if(!classes){
                            classes = contexts;
                        }
                        let prefix = "";
                        if(prop.classPrefix){
                            prefix = prop.classPrefix+"-" ;
                        }
                        trait.options = [
                            ... classes.map((v) => { return {value: `${prefix}${v}`, name: v} ; }),
                        ] ;
                    }else if(prop.classPrefixResponsive){
                        trait.type = 'class_select_responsive' ;
                        let classes = prop.classes;
                        if(!classes){
                            classes = contexts;
                        }
                        trait.options = [
                            ... classes.map((v) => { return {value: `${prop.classPrefixResponsive}-${v}`, name: v} ; }),
                        ] ;
                    }else if(prop.propertiesValues){
                        trait.type = 'prop_select' ;
                        trait.options = prop.propertiesValues ;
                        trait.name = prop.property ;
                    }else if(prop.property){
                        trait.type = 'prop_input' ;
                        trait.name = prop.property ;
                        trait.placeholder = prop.property ;
                    }else if(prop.classButtonRadio){
                        trait.type = 'class_button_checkbox' ;
                        trait.exclusive = true,
                        trait.options = prop.classButtonRadio ;
                    }else if(prop.classButtonCheckbox){
                        trait.type = 'class_button_checkbox' ;
                        trait.options = prop.classButtonCheckbox ;
                    }else if(prop.classToggle){
                        trait.type = 'class_checkbox' ;
                        trait.options = prop.classToggle ;
                    }else if(prop.classToggleResponsive){
                        trait.type = 'class_checkbox_responsive' ;
                        trait.options = prop.classToggleResponsive ;
                    }else if(prop.attributeToggle){
                        trait.type = 'attribute_checkbox' ;
                        trait.options = prop.attributeToggle ;
                    }else if(prop.marginClass){
                        trait.type = 'attribute_margin' ;
                        trait.options = prop.marginClass ;
                    }else if(prop.marginClassXY){
                        trait.type = 'attribute_margin_xy' ;
                        trait.options = prop.marginClassXY ;
                    }else if(prop.customType){
                        editor.Traits.addType(block.id+"_"+prop.label, createCustomTrait(prop.customType));
                        trait.type = block.id+"_"+prop.label ;
                    }
                    traits.push(trait) ;
                }
            }
            const compType = {
                isComponent: (el) => {
                    if(block.isComponent){
                        return block.isComponent(el) ;
                    }else if(block.classId){
                        return el && el.classList && el.classList.contains(block.classId) ;
                    }
                },
                model: {
                    defaults: {
                        "custom-name": block.label,
                        //tagName: 'card',
                        draggable: block.draggable===undefined?true:block.draggable,
                        droppable: block.droppable===undefined?true:block.droppable,
                        //textable: block.editable,
                        traits: traits
                    }
                },
            } ;
            if(block.extend){
                compType.extend = block.extend;
            }
            if(block.extendView){
                compType.extendView = block.extendView;
            }
            if(block.toolbar){
                editor.on('component:create', (component) => {
                    if(component.get('type') === block.id/*+"_extended"*/){
                        const tb = component.get('toolbar');
                        for(let t of block.toolbar){
                            if(!tb.some(e=>e.label === t.label)){
                                tb.push(t)
                            }
                        }
                        component.set('toolbar', tb) ;
                    }
                });
            }
            if(block.editable){
                compType.extend = "text" ;
            }
            editor.Components.addType(block.id, compType);
        }
    }

    
    const defaultSvg = editor.Components.getType('svg');
    editor.Traits.addType("bs-svg-icon_icon", createCustomTrait({
        createInput:  ()=>{
            let el = document.createElement("DIV") ;
            el.className="dropdown icon-picker"
            el.innerHTML = `
<div class="d-flex text-white">
  <span class="icon-current p-2 me-2" id="basic-addon1"></span>
  <input type="text" class="icon-filter" placeholder="Search icon" aria-label="Search icon" aria-describedby="basic-addon1">
</div>
<div class="iconpicker-icons"></div>
`;
            let iconList = el.querySelector(".iconpicker-icons") ;
            let button = el.querySelector(".icon-current") ;
            let filterInput = /** @type {HTMLInputElement} */ (el.querySelector(".icon-filter")) ;
            
            let allIcons = [] ;
            let visibleIcons = [] ;

            

            function showIconList(){
                iconList.innerHTML = "" ;
                for(let icon of visibleIcons){
                    let elIcon = /** @type {HTMLImageElement} */ (document.createElement("IMG")) ;
                    elIcon.style.filter = "invert(100%) contrast(0.5)" ;
                    elIcon.className="m-1 cursor-pointer"
                    let iconUrl = `https://cdn.jsdelivr.net/npm/bootstrap-icons@latest/icons/${icon}.svg` ;
                    elIcon.src = iconUrl ;
                    iconList.appendChild(elIcon) ;
                    elIcon.addEventListener("click", ()=>{
                        // @ts-ignore
                        el.currentIcon = icon;
                        el.dispatchEvent(new Event('change', { bubbles: true }));
                        button.innerHTML = `<img src="${iconUrl}"></img>` ;
                        button.querySelector("img").style.filter = "invert(100%) contrast(0.5)" ;
                    })
                }
            }
            
            
            fetch("https://cdn.jsdelivr.net/npm/bootstrap-icons@latest/font/bootstrap-icons.json").then(async response=>{
                let icons = await response.json() ;
                allIcons = Object.keys(icons) ;
                filterInput.addEventListener("input", ()=>{
                    let filter = filterInput.value;
                    if(!filter){
                        //display first 50 icons
                        visibleIcons = allIcons.slice(0,50) ;
                    }else{
                        visibleIcons = allIcons.filter(icon=> icon.includes(filter.toLowerCase().normalize("NFD"))).slice(0,100) ;
                    }
                    showIconList() ;
                }) ;
                if(filterInput.value){
                    filterInput.dispatchEvent(new Event("input"));
                }else{
                    //display first 50 icons
                    visibleIcons = allIcons.slice(0,50) ;
                    showIconList() ;
                }
            }).catch(err=>{
                iconList = document.createElement("DIV") ;
                iconList.innerHTML = "Can't load icons "+err ;
            })
            return el;
        },
        //user change property
        onEvent: async ({elInput, component, event })=>{
            if(event?.target?.classList.contains("icon-filter")){ 
                //ignore event from the filter input
                return ; 
            }
            if(elInput.currentIcon){
                //fetch SVG
                let response = await fetch(`https://cdn.jsdelivr.net/npm/bootstrap-icons@latest/icons/${elInput.currentIcon}.svg`) ;
                let svgContent = await response.text() ;
                let newComponent = component.replaceWith(svgContent)[0] ;
                newComponent.setAttributes({...newComponent.getAttributes(), "icon-filter": elInput.querySelector(".icon-filter").value});
                editor.select(newComponent) ;
            }
        },
        //component selected in canvas
        onUpdate: ({elInput, component })=>{
            

            const iconClass = component.getClasses().find(c => c.startsWith("bi-"));
            if(iconClass){
                let iconCode = iconClass.substring(3) ;

                elInput.currentIcon = iconCode;
                let button = elInput.querySelector(".icon-current") ;
                let iconUrl = `https://cdn.jsdelivr.net/npm/bootstrap-icons@latest/icons/${iconCode}.svg` ;
                button.innerHTML = `<img src="${iconUrl}"></img>` ;
                button.querySelector("img").style.filter = "invert(100%) contrast(0.5)" ;

                let filterInput = elInput.querySelector(".icon-filter") ;
                filterInput.value = component.getAttributes()["icon-filter"]??""
                filterInput.dispatchEvent(new Event("input"));
            }
        },
    }));
    editor.Components.addType("svg", {
        isComponent(el) {
            return el && el.tagName === "svg" //&& el.classList.contains("bi") ;
        },
        extend: 'svg',
        //extendView: 'svg',
        view: {
            _createElement(tagName) {
                return document.createElementNS('http://www.w3.org/2000/svg', tagName);
            },
        },
        model: {
            defaults: {
                ...defaultSvg.model.prototype.defaults,
                traits: [
                    ...defaultSvg.model.prototype.defaults.traits,
                    {
                        type: "prop_input",
                        name: 'width',
                        label: 'Width',
                    },
                    {
                        type: "prop_input",
                        name: 'height', 
                        label: 'Height',
                    },
                    { 
                        title: "Icon",
                        name: "name",
                        label: `Icon <a href="https://icons.getbootstrap.com/" target="_blank" class="ms-auto text-decoration-none text-white">${IMG_HELP}</a>`,
                        templateLabel: function (){
                            const { ppfx } = this;
                            return `<div class="${ppfx}label d-flex" title="${this.model.get("title")}">${this.model.get("label")}</div>`;
                        },
                        type : "bs-svg-icon_icon"
                    },
                   
                ]
            }
        },
    });
    
    editor.BlockManager.add('bs-svg-icon', {
        label: 'Icon',
        title: 'Icon',
        media: `<div class="position-relative"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-emoji-smile" viewBox="0 0 16 16">
  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
  <path d="M4.285 9.567a.5.5 0 0 1 .683.183A3.5 3.5 0 0 0 8 11.5a3.5 3.5 0 0 0 3.032-1.75.5.5 0 1 1 .866.5A4.5 4.5 0 0 1 8 12.5a4.5 4.5 0 0 1-3.898-2.25.5.5 0 0 1 .183-.683M7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5m4 0c0 .828-.448 1.5-1 1.5s-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5"/>
</svg>
            <div style="position: absolute; top: -13px; right:-9px; z-index: 999">
            ${IMG_HELP}
            </div></div>`,
        content: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-emoji-smile" viewBox="0 0 16 16">
  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
  <path d="M4.285 9.567a.5.5 0 0 1 .683.183A3.5 3.5 0 0 0 8 11.5a3.5 3.5 0 0 0 3.032-1.75.5.5 0 1 1 .866.5A4.5 4.5 0 0 1 8 12.5a4.5 4.5 0 0 1-3.898-2.25.5.5 0 0 1 .183-.683M7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5m4 0c0 .828-.448 1.5-1 1.5s-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5"/>
</svg>`,
        attributes: {
            title: 'Icon',
            onclick: `(event.offsetX>70 && event.offsetY<10)?window.open('https://icons.getbootstrap.com/'):''`
        },
        category: 'Media'
    });
    
    editor.Components.addType("bs-col", {
        isComponent: (el) => {
            let match = false;
            if(el && el.classList) {
                el.classList.forEach(function(klass) {
                    if(klass=="col" || klass.match(/^col-/)) {
                        match = true;
                    }
                });
            }
            return match;
        },
        model: {
            defaults: {
                "custom-name": "Column",
                draggable: '.row',
                droppable: true,
                resizable: {
                    /*
                    by default the resizer will set the width style attribute on the CSS class of the element
                    //https://github.com/GrapesJS/grapesjs/blob/819bfcf44bb23d51990eba3b4330e9932df59cde/src/commands/view/SelectComponent.ts#L483
                    in onStart / onUpdateContainer, we remove the CSS
                    */
                    onStart: (ev, opt)=>{
                        console.log("onStart", ev, opt)
                        let model = editor.getSelected() ;
                        opt.resizer.modelToStyle = editor.Styles.getModelToStyle(model);
                    },
                    onUpdateContainer: (opt)=>{
                        let model = editor.getSelected() ;
                        if(opt.resizer.modelToStyle){
                            const finalStyle = {
                                width: ""
                            };
                            opt.resizer.modelToStyle.addStyle(finalStyle, { avoidStore: true });
                            editor.Styles.__emitCmpStyleUpdate(finalStyle, { components: model });
                        }
                    },
                    //avoidContainerUpdate: true,
                    updateTarget: (el, rect)=>{
                        const selected =  editor.getSelected() ;
                        if(!selected){ return ; }
                        console.log("selected", selected)
                        
                        //compute the current screen size (bootstrap semantic)
                        let currentSize = editor.getDevice();
                        if(currentSize === "xs"){
                            currentSize = ""
                        }
                        

                        console.log("current size is "+currentSize);

                        //compute the threshold when add on remove 1 col span to the element
                        const row = el.parentElement ;
                        const oneColWidth = row.offsetWidth / 12 ;
                        console.log("one col width "+oneColWidth);
                        //the threshold is half one column width
                        const threshold = oneColWidth*0.5 ;
                        console.log("threshold "+threshold);

                        //check if we are growing or shrinking the column
                        const grow = rect.w > el.offsetWidth + threshold;
                        const shrink = rect.w < el.offsetWidth - threshold;
                        console.log("rect.w" , rect.w ,  "el.offsetWidth",  el.offsetWidth, "grow "+grow, "shrink "+shrink);

                        if(grow || shrink){
                            let found = false;
                            let sizesSpans = {} ;
                            let oldSpan = 0;
                            let oldClass = null;
                            for(let cl of el.classList){
                                if(cl.indexOf("col-") === 0){
                                    let [,size,span] = cl.split("-") ;
                                    if(!span){
                                        span = size;
                                        size = "" ;
                                    }
                                    sizesSpans[size] = span ;
                                    if(size === currentSize){
                                        //found the col-XX-99 class
                                        oldClass = cl;
                                        oldSpan = span ;
                                        found = true;
                                    }
                                }
                            }

                            if(!found){
                                const sizeOrder = ["", "xs", "sm", "md", "lg", "xl", "xxl"] ;
                                for(let s of sizeOrder){
                                    if(sizesSpans[s]){
                                        oldSpan = sizesSpans[s];
                                        found = true ;
                                    }
                                    if(s === currentSize){
                                        break;
                                    }
                                }
                            }

                            let newSpan = Number(oldSpan) ;
                            if(grow){
                                newSpan++ ;
                            }else{
                                newSpan-- ;
                            }
                            if(newSpan > 12){ newSpan = 12 ; }
                            if(newSpan < 1){ newSpan = 1 ; }

                            let newClass = "col-"+currentSize+"-"+newSpan ;
                            if(!currentSize){
                                newClass = "col-"+newSpan ;
                            }
                            //update the class
                            selected.addClass(newClass) ;
                            if(oldClass && oldClass !== newClass){
                                selected.removeClass(oldClass) ;
                            }
                            //notify the corresponding trait to update its value accordingly
                            let trait = selected.getTrait((currentSize||"xs")+"_width");
                            if(trait && trait.view){
                                trait.view.postUpdate() ;
                            }
                        }
                    },
                    tl: 0, 
                    tc: 0, 
                    tr: 0, 
                    cl: 0, 
                    cr: 1, 
                    bl: 0, 
                    bc: 0, 
                    br: 0 
                },
                traits: [
                    {
                        name: "bs-col-size",
                        category: "Layout",
                        title: "Size",
                        label: `Size <a href="https://getbootstrap.com/docs/5.3/layout/grid/#auto-layout-columns" target="_blank" class="ms-auto text-decoration-none text-white">${IMG_HELP}</a>`,
                        type: 'class_select_responsive',
                        options: [
                            { value: "col${DEVICE}", name: "Equal width" },
                            { value: "col${DEVICE}12", name: "Full width (12)" },
                            { value: "col${DEVICE}11", name: "11 twelfth" },
                            { value: "col${DEVICE}10", name: "10 twelfth" },
                            { value: "col${DEVICE}9", name: "9 twelfth (3/4)" },
                            { value: "col${DEVICE}8", name: "8 twelfth (2/3)" },
                            { value: "col${DEVICE}7", name: "7 twelfth" },
                            { value: "col${DEVICE}6", name: "6 twelfth (1/2)" },
                            { value: "col${DEVICE}5", name: "5 twelfth" },
                            { value: "col${DEVICE}4", name: "4 twelfth (1/3)" },
                            { value: "col${DEVICE}3", name: "3 twelfth (1/4)" },
                            { value: "col${DEVICE}2", name: "2 twelfth (1/6)" },
                            { value: "col${DEVICE}1", name: "1 twelfth" },
                            { value: "col${DEVICE}auto", name: "Auto" }
                            
                        ]
                    },
                ]
            }
        },
    });
    editor.on('component:create', (component) => {
        if(component.get('type') === "bs-col"/*_extended"*/){
            const tb = component.get('toolbar');
            const toolbar = [
                {
                    label: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-square" viewBox="0 0 16 16">
      <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"/>
      <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/>
    </svg>`,
                    command: (editor) => {
                        const selectedCol = editor.getSelectedAll()[0] ;
    
                        const coll = selectedCol.collection;
                        const at = coll.indexOf(selectedCol) + 1;
                        coll.add({
                            tagName: 'div',
                            type: 'bs-col',//_extended',
                            attributes: { 
                                "class": selectedCol.getClasses().filter(c=>c.startsWith("col")).join(" ")
                            },
                        }, { at }) ;
                    }
                },
                {
                    label: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-layout-split" viewBox="0 0 16 16">
      <path d="M0 3a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm8.5-1v12H14a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1zm-1 0H2a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h5.5z"/>
    </svg>`,
                    command: (editor) => {
                        const selectedCol = editor.getSelectedAll()[0] ;
    
                        const existingClasses = selectedCol.getClasses() ;
                        const modifiedClasses = selectedCol.getClasses().map((cl)=>{
                            if(cl.indexOf("col-") === 0){
                                const splitted = cl.split("-") ;
                                splitted[splitted.length-1] = Math.floor(Number(splitted[splitted.length-1])/2) ;
                                if(splitted[splitted.length-1]===0){
                                    splitted[splitted.length-1] = 1 ;
                                }
                                return splitted.join("-") ;
                            }else{
                                return cl;
                            }
                        }) ;
    
                        for(let c of existingClasses){
                            selectedCol.removeClass(c);
                        }
                        for(let c of modifiedClasses){
                            selectedCol.addClass(c);
                        }
    
                        const coll = selectedCol.collection;
                        const at = coll.indexOf(selectedCol) + 1;
                        coll.add({
                            tagName: 'div',
                            type: 'bs-col',//_extended',
                            attributes: { 
                                "class": modifiedClasses.filter(c=>c.startsWith("col")).join(" ")
                            },
                        }, { at }) ;
    
                    }
                }
            ]
            for(let t of toolbar){
                if(!tb.some(e=>e.label === t.label)){
                    tb.push(t)
                }
            }
            component.set('toolbar', tb) ;
        }
    }); 

    

    //add default trait for all types
    let types = Array.from(editor.DomComponents.getTypes());
    const categoryBackground = { id: 'bs-background', label: 'Background' , open: false};
    const categoryMargins = { id: 'bs-margins', label: 'Margins & paddings', open: false };

    const categoryTypography = {id: 'bs-typography', label: "Typography", open: false}
    const categoryBorder = {id: 'bs-borders', label: "Borders", open: false}
    const categorySize = {id: 'bs-size', label: "Sizes", open: false}
    const categoryColors = {id: 'bs-colors', label: "Colors", open: false}
    const categoryDisplay = {id: 'bs-display', label: "Display", open: false}
    const categoryShadow = {id: 'bs-shadow', label: "Shadow", open: false}
    for(let type of types){
        if(type.id !== "comment" && type.id !== "textnode" && type.id !== "svg" && type.id !== "svg-in" && type.id !== "bs-svg-icon"){
            //console.log("TYPE ???"+type.id)
            editor.Components.addType(type.id/*+"_extended"*/, {
                isComponent: type.isComponent,
                extend: type.id,
                model: { 
                    defaults: {
                        traits: 
                        type.model.prototype.defaults.traits.filter((t, index)=>{
                            if(t.category){ 
                                //component trait
                                return true ; 
                            }else{
                                //check if has component with same id
                                return !type.model.prototype.defaults.traits.some((t2, index2)=>index2>index && t2.name === t)
                            }
                        }).map(t=>{
                            if(typeof(t) === "string"){
                                t = {name: t} ;
                            }
                            if(!t.category){
                                t.category = categoryBase ;
                            }
                            return t;
                        }).concat([
                            {
                                name: "bs-text-bold-italic",
                                category: categoryTypography,
                                title: "",
                                label: ``,
                                type: 'class_button_checkbox',
                                options: [
                                    { value: "fw-bold", img: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-type-bold" viewBox="0 0 16 16">
                    <path d="M8.21 13c2.106 0 3.412-1.087 3.412-2.823 0-1.306-.984-2.283-2.324-2.386v-.055a2.176 2.176 0 0 0 1.852-2.14c0-1.51-1.162-2.46-3.014-2.46H3.843V13zM5.908 4.674h1.696c.963 0 1.517.451 1.517 1.244 0 .834-.629 1.32-1.73 1.32H5.908V4.673zm0 6.788V8.598h1.73c1.217 0 1.88.492 1.88 1.415 0 .943-.643 1.449-1.832 1.449H5.907z"/>
                </svg>` },
                                    { value: "fst-italic", img: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-type-italic" viewBox="0 0 16 16">
                    <path d="M7.991 11.674 9.53 4.455c.123-.595.246-.71 1.347-.807l.11-.52H7.211l-.11.52c1.06.096 1.128.212 1.005.807L6.57 11.674c-.123.595-.246.71-1.346.806l-.11.52h3.774l.11-.52c-1.06-.095-1.129-.211-1.006-.806z"/>
                </svg>` },
                                    { value: "text-decoration-underline", img: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-type-underline" viewBox="0 0 16 16">
                    <path d="M5.313 3.136h-1.23V9.54c0 2.105 1.47 3.623 3.917 3.623s3.917-1.518 3.917-3.623V3.136h-1.23v6.323c0 1.49-.978 2.57-2.687 2.57s-2.687-1.08-2.687-2.57zM12.5 15h-9v-1h9z"/>
                </svg>` },
                                ]
                            },
                            {
                                name: "bs-text-align",
                                category: categoryTypography,
                                title: "Alignment",
                                label: `Alignment <a href="https://getbootstrap.com/docs/5.3/utilities/text/#text-alignment" target="_blank" class="ms-auto text-decoration-none text-white">${IMG_HELP}</a>`,
                                type: 'class_button_checkbox',
                                exclusive: true,
                                options: [
                                    { value: "text-start", img: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-text-left" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M2 12.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5m0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5m0-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5m0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5"/>
                    </svg>` },
                                    { value: "text-center", img: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-text-center" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M4 12.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5m-2-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5m2-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5m-2-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5"/>
                    </svg>` },
                                    { value: "text-end", img: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-text-right" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M6 12.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5m-4-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5m4-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5m-4-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5"/>
                    </svg>` },
                                ]
                            },
                            {
                                name: "bs-text-wrap",
                                category: categoryTypography,
                                title: "Wrapping",
                                label: `Wrapping <a href="https://getbootstrap.com/docs/5.3/utilities/text/#text-wrapping-and-overflow" target="_blank" class="ms-auto text-decoration-none text-white">${IMG_HELP}</a>`,
                                type: 'class_button_checkbox',
                                exclusive: true,
                                options: [
                                    { value: "text-wrap", img: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-text-wrap" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M2 3.5a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5m0 4a.5.5 0 0 1 .5-.5h9a2.5 2.5 0 0 1 0 5h-1.293l.647.646a.5.5 0 0 1-.708.708l-1.5-1.5a.5.5 0 0 1 0-.708l1.5-1.5a.5.5 0 0 1 .708.708l-.647.646H11.5a1.5 1.5 0 0 0 0-3h-9a.5.5 0 0 1-.5-.5m0 4a.5.5 0 0 1 .5-.5H7a.5.5 0 0 1 0 1H2.5a.5.5 0 0 1-.5-.5"/>
                    </svg>` },
                                    { value: "text-nowrap", img: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-body-text" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M0 .5A.5.5 0 0 1 .5 0h4a.5.5 0 0 1 0 1h-4A.5.5 0 0 1 0 .5m0 2A.5.5 0 0 1 .5 2h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5m9 0a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m-9 2A.5.5 0 0 1 .5 4h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5m5 0a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m7 0a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5m-12 2A.5.5 0 0 1 .5 6h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5m8 0a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m-8 2A.5.5 0 0 1 .5 8h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m7 0a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5m-7 2a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 0 1h-8a.5.5 0 0 1-.5-.5m0 2a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5m0 2a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5"/>
                    </svg>` },
                                ]
                            },
                            {
                                name: "bs-text-transform",
                                category: categoryTypography,
                                title: "Text transform",
                                label: `Text transform <a href="https://getbootstrap.com/docs/5.3/utilities/text/#text-transform" target="_blank" class="ms-auto text-decoration-none text-white">${IMG_HELP}</a>`,
                                type: 'class_select',
                                options: [
                                    { value: "", name: "" },
                                    { value: "text-lowercase", name: "lower case" },
                                    { value: "text-uppercase", name: "UPPER CASE" },
                                    { value: "text-capitalize", name: "Capitalize Text" },
                                ]
                            },
                            {
                                name: "bs-text-size",
                                category: categoryTypography,
                                title: "Text size",
                                label: `Text size <a href="https://getbootstrap.com/docs/5.3/utilities/text/#font-size" target="_blank" class="ms-auto text-decoration-none text-white">${IMG_HELP}</a>`,
                                type: 'class_select',
                                options: [
                                    { value: "", name: "" },
                                    { value: "fs-1", name: "Size 1 (biggest)" },
                                    { value: "fs-2", name: "Size 2" },
                                    { value: "fs-3", name: "Size 3" },
                                    { value: "fs-4", name: "Size 4" },
                                    { value: "fs-5", name: "Size 5" },
                                    { value: "fs-6", name: "Size 6 (smallest)" },
                                ]
                            },
                            {
                                name: "bs-text-select",
                                category: categoryTypography,
                                title: "Text selection",
                                label: `Text selection <a href="https://getbootstrap.com/docs/5.3/utilities/interactions/#text-selection" target="_blank" class="ms-auto text-decoration-none text-white">${IMG_HELP}</a>`,
                                type: 'class_select',
                                options: [
                                    { value: "", name: "" },
                                    { value: "user-select-all", name: "Select all" },
                                    { value: "user-select-auto", name: "Select auto" },
                                    { value: "user-select-none", name: "Select none" }
                                ]
                            },
                            {
                                name: "bs-shadow",
                                category: categoryShadow,
                                title: "Shadow",
                                label: `Shadow <a href="https://getbootstrap.com/docs/5.3/utilities/shadows/" target="_blank" class="ms-auto text-decoration-none text-white">${IMG_HELP}</a>`,
                                type: 'class_select',
                                options: [
                                    { value: "", name: "" },
                                    { value: "shadow-none", name: "No shadow" },
                                    { value: "shadow-sm", name: "Small shadow" },
                                    { value: "shadow", name: "Regular shadow" },
                                    { value: "shadow-lg", name: "Large shadow" },
                                ]
                            },
                            {
                                name: "bs-bg-color",
                                category: categoryBackground,
                                title: "Background color",
                                label: `Background color <a href="https://getbootstrap.com/docs/5.3/utilities/background/#background-color" target="_blank" class="ms-auto text-decoration-none text-white">${IMG_HELP}</a>`,
                                type: 'class_select',
                                options: [
                                    { value: "", name: "" },
                                    { value: "bg-primary", name: "primary" },
                                    { value: "bg-primary-subtle", name: "primary-subtle" },
                                    { value: "bg-secondary", name: "secondary" },
                                    { value: "bg-secondary-subtle", name: "secondary-subtle" },
                                    { value: "bg-success", name: "success" },
                                    { value: "bg-success-subtle", name: "success-subtle" },
                                    { value: "bg-danger", name: "danger" },
                                    { value: "bg-danger-subtle", name: "danger-subtle" },
                                    { value: "bg-warning", name: "warning" },
                                    { value: "bg-warning-subtle", name: "warning-subtle" },
                                    { value: "bg-info", name: "info" },
                                    { value: "bg-info-subtle", name: "info-subtle" },
                                    { value: "bg-light", name: "light" },
                                    { value: "bg-light-subtle", name: "light-subtle" },
                                    { value: "bg-dark", name: "dark" },
                                    { value: "bg-dark-subtle", name: "dark-subtle" },
                                    { value: "bg-body-secondary", name: "body-secondary" },
                                    { value: "bg-body-tertiary", name: "body-tertiary" },
                                    { value: "bg-body", name: "body" },
                                    { value: "bg-black", name: "black" },
                                    { value: "bg-white", name: "white" },
                                    { value: "bg-transparent", name: "transparent" },
                                ]
                            },
                            {
                                name: "bs-bg-gradient",
                                category: categoryBackground,
                                title: "Background gradient",
                                label: `Background gradient <a href="https://getbootstrap.com/docs/5.3/utilities/background/#background-gradient" target="_blank" class="ms-auto text-decoration-none text-white">${IMG_HELP}</a>`,
                                type: 'class_checkbox',
                                options:'bg-gradient'
                            },

                            {
                                name: "bs-display",
                                category: categoryDisplay,
                                title: "Display",
                                label: `Display <a href="https://getbootstrap.com/docs/5.3/utilities/display/" target="_blank" class="ms-auto text-decoration-none text-white">${IMG_HELP}</a>`,
                                type: 'class_select_responsive',
                                options: [
                                    { value: "", name: " - " },
                                    { value: "d${DEVICE}none", name: "None" },
                                    { value: "d${DEVICE}inline", name: "Inline" },
                                    { value: "d${DEVICE}inline-block", name: "Inline block" },
                                    { value: "d${DEVICE}block", name: "Block" },
                                    { value: "d${DEVICE}grid", name: "Grid" },
                                    { value: "d${DEVICE}inline-grid", name: "Inline grid" },
                                    { value: "d${DEVICE}table", name: "Table" },
                                    { value: "d${DEVICE}table-cell", name: "Table cell" },
                                    { value: "d${DEVICE}table-row", name: "Table row" },
                                    { value: "d${DEVICE}flex", name: "Flex" },
                                    { value: "d${DEVICE}inline-flex", name: "Inline flex" },
                                ]
                            },
                            {
                                name: "bs-text-color",
                                category: categoryColors,
                                title: "Text color",
                                label: `Text color <a href="https://getbootstrap.com/docs/5.3/utilities/colors/#colors" target="_blank" class="ms-auto text-decoration-none text-white">${IMG_HELP}</a>`,
                                type: 'class_select',
                                options: [
                                    { value: "", name: "" },
                                    { value: "text-primary", name: "primary" },
                                    { value: "text-primary-emphasis", name: "primary-emphasis" },
                                    { value: "text-secondary", name: "secondary" },
                                    { value: "text-secondary-emphasis", name: "secondary-emphasis" },
                                    { value: "text-success", name: "success" },
                                    { value: "text-success-emphasis", name: "success-emphasis" },
                                    { value: "text-danger", name: "danger" },
                                    { value: "text-danger-emphasis", name: "danger-emphasis" },
                                    { value: "text-warning", name: "warning" },
                                    { value: "text-warning-emphasis", name: "warning-emphasis" },
                                    { value: "text-info", name: "info" },
                                    { value: "text-info-emphasis", name: "info-emphasis" },
                                    { value: "text-light", name: "light" },
                                    { value: "text-light-emphasis", name: "light-emphasis" },
                                    { value: "text-dark", name: "dark" },
                                    { value: "text-dark-emphasis", name: "dark-emphasis" },
                                    { value: "text-body", name: "body" },
                                    { value: "text-body-emphasis", name: "body-emphasis" },
                                    { value: "text-body-secondary", name: "body-secondary" },
                                    { value: "text-body-tertiary", name: "body-tertiary" },
                                    { value: "text-black", name: "black" },
                                    { value: "text-white", name: "white" },
                                ]
                            },
                            // {
                            //     name: "bs-text-opacity",
                            //     category: categoryColors,
                            //     title: "Text opacity",
                            //     label: `Text opacity <a href="https://getbootstrap.com/docs/5.3/utilities/colors/#opacity" target="_blank" class="ms-auto text-decoration-none text-white">${IMG_HELP}</a>`,
                            //     type: 'class_select',
                            //     options: [
                            //         { value: "", name: "" },
                            //         { value: "text-opacity-75", name: "Opacity 75%" },
                            //         { value: "text-opacity-50", name: "Opacity 50%" },
                            //         { value: "text-opacity-25", name: "Opacity 25%" },
                            //     ]
                            // },


                            {
                                name: "bs-borders",
                                category: categoryBorder,
                                title: "Borders",
                                label: `Borders <a href="https://getbootstrap.com/docs/5.3/utilities/borders/#border" target="_blank" class="ms-auto text-decoration-none text-white">${IMG_HELP}</a>`,
                                type: 'class_button_checkbox',
                                options: [
                                    { value: "border", img: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-border-outer" viewBox="0 0 16 16">
  <path d="M7.5 1.906v.938h1v-.938zm0 1.875v.938h1V3.78h-1zm0 1.875v.938h1v-.938zM1.906 8.5h.938v-1h-.938zm1.875 0h.938v-1H3.78v1zm1.875 0h.938v-1h-.938zm2.813 0v-.031H8.5V7.53h-.031V7.5H7.53v.031H7.5v.938h.031V8.5zm.937 0h.938v-1h-.938zm1.875 0h.938v-1h-.938zm1.875 0h.938v-1h-.938zM7.5 9.406v.938h1v-.938zm0 1.875v.938h1v-.938zm0 1.875v.938h1v-.938z"/>
  <path d="M0 0v16h16V0zm1 1h14v14H1z"/>
</svg>` },
                                    { value: "border-top", img: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-border-top" viewBox="0 0 16 16">
  <path d="M0 0v1h16V0zm1 2.844v-.938H0v.938zm6.5-.938v.938h1v-.938zm7.5 0v.938h1v-.938zM1 4.719V3.78H0v.938h1zm6.5-.938v.938h1V3.78h-1zm7.5 0v.938h1V3.78h-1zM1 6.594v-.938H0v.938zm6.5-.938v.938h1v-.938zm7.5 0v.938h1v-.938zM.5 8.5h.469v-.031H1V7.53H.969V7.5H.5v.031H0v.938h.5zm1.406 0h.938v-1h-.938zm1.875 0h.938v-1H3.78v1zm1.875 0h.938v-1h-.938zm2.813 0v-.031H8.5V7.53h-.031V7.5H7.53v.031H7.5v.938h.031V8.5zm.937 0h.938v-1h-.938zm1.875 0h.938v-1h-.938zm1.875 0h.938v-1h-.938zm1.875 0h.469v-.031h.5V7.53h-.5V7.5h-.469v.031H15v.938h.031zM0 9.406v.938h1v-.938zm7.5 0v.938h1v-.938zm8.5.938v-.938h-1v.938zm-16 .937v.938h1v-.938zm7.5 0v.938h1v-.938zm8.5.938v-.938h-1v.938zm-16 .937v.938h1v-.938zm7.5 0v.938h1v-.938zm8.5.938v-.938h-1v.938zM0 16h.969v-.5H1v-.469H.969V15H.5v.031H0zm1.906 0h.938v-1h-.938zm1.875 0h.938v-1H3.78v1zm1.875 0h.938v-1h-.938zm1.875-.5v.5h.938v-.5H8.5v-.469h-.031V15H7.53v.031H7.5v.469zm1.875.5h.938v-1h-.938zm1.875 0h.938v-1h-.938zm1.875 0h.938v-1h-.938zm1.875-.5v.5H16v-.969h-.5V15h-.469v.031H15v.469z"/>
</svg>` },
                                    { value: "border-end", img: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-border-right" viewBox="0 0 16 16">
  <path d="M.969 0H0v.969h.5V1h.469V.969H1V.5H.969zm.937 1h.938V0h-.938zm1.875 0h.938V0H3.78v1zm1.875 0h.938V0h-.938zM7.531.969V1h.938V.969H8.5V.5h-.031V0H7.53v.5H7.5v.469zM9.406 1h.938V0h-.938zm1.875 0h.938V0h-.938zm1.875 0h.938V0h-.938zM16 0h-1v16h1zM1 2.844v-.938H0v.938zm6.5-.938v.938h1v-.938zM1 4.719V3.78H0v.938h1zm6.5-.938v.938h1V3.78h-1zM1 6.594v-.938H0v.938zm6.5-.938v.938h1v-.938zM.5 8.5h.469v-.031H1V7.53H.969V7.5H.5v.031H0v.938h.5zm1.406 0h.938v-1h-.938zm1.875 0h.938v-1H3.78v1zm1.875 0h.938v-1h-.938zm2.813 0v-.031H8.5V7.53h-.031V7.5H7.53v.031H7.5v.938h.031V8.5zm.937 0h.938v-1h-.938zm1.875 0h.938v-1h-.938zm1.875 0h.938v-1h-.938zM0 9.406v.938h1v-.938zm7.5 0v.938h1v-.938zM0 11.281v.938h1v-.938zm7.5 0v.938h1v-.938zM0 13.156v.938h1v-.938zm7.5 0v.938h1v-.938zM0 16h.969v-.5H1v-.469H.969V15H.5v.031H0zm1.906 0h.938v-1h-.938zm1.875 0h.938v-1H3.78v1zm1.875 0h.938v-1h-.938zm1.875-.5v.5h.938v-.5H8.5v-.469h-.031V15H7.53v.031H7.5v.469zm1.875.5h.938v-1h-.938zm1.875 0h.938v-1h-.938zm1.875 0h.938v-1h-.938z"/>
</svg>` },
                                    { value: "border-bottom", img: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-border-bottom" viewBox="0 0 16 16">
  <path d="M.969 0H0v.969h.5V1h.469V.969H1V.5H.969zm.937 1h.938V0h-.938zm1.875 0h.938V0H3.78v1zm1.875 0h.938V0h-.938zM7.531.969V1h.938V.969H8.5V.5h-.031V0H7.53v.5H7.5v.469zM9.406 1h.938V0h-.938zm1.875 0h.938V0h-.938zm1.875 0h.938V0h-.938zm1.875 0h.469V.969h.5V0h-.969v.5H15v.469h.031zM1 2.844v-.938H0v.938zm6.5-.938v.938h1v-.938zm7.5 0v.938h1v-.938zM1 4.719V3.78H0v.938h1zm6.5-.938v.938h1V3.78h-1zm7.5 0v.938h1V3.78h-1zM1 6.594v-.938H0v.938zm6.5-.938v.938h1v-.938zm7.5 0v.938h1v-.938zM.5 8.5h.469v-.031H1V7.53H.969V7.5H.5v.031H0v.938h.5zm1.406 0h.938v-1h-.938zm1.875 0h.938v-1H3.78v1zm1.875 0h.938v-1h-.938zm2.813 0v-.031H8.5V7.53h-.031V7.5H7.53v.031H7.5v.938h.031V8.5zm.937 0h.938v-1h-.938zm1.875 0h.938v-1h-.938zm1.875 0h.938v-1h-.938zm1.875 0h.469v-.031h.5V7.53h-.5V7.5h-.469v.031H15v.938h.031zM0 9.406v.938h1v-.938zm7.5 0v.938h1v-.938zm8.5.938v-.938h-1v.938zm-16 .937v.938h1v-.938zm7.5 0v.938h1v-.938zm8.5.938v-.938h-1v.938zm-16 .937v.938h1v-.938zm7.5 0v.938h1v-.938zm8.5.938v-.938h-1v.938zM0 15h16v1H0z"/>
</svg>` },
                                    { value: "border-start", img: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-border-left" viewBox="0 0 16 16">
  <path d="M0 0v16h1V0zm1.906 1h.938V0h-.938zm1.875 0h.938V0H3.78v1zm1.875 0h.938V0h-.938zM7.531.969V1h.938V.969H8.5V.5h-.031V0H7.53v.5H7.5v.469zM9.406 1h.938V0h-.938zm1.875 0h.938V0h-.938zm1.875 0h.938V0h-.938zm1.875 0h.469V.969h.5V0h-.969v.5H15v.469h.031zM7.5 1.906v.938h1v-.938zm7.5 0v.938h1v-.938zM7.5 3.781v.938h1V3.78h-1zm7.5 0v.938h1V3.78h-1zM7.5 5.656v.938h1v-.938zm7.5 0v.938h1v-.938zM1.906 8.5h.938v-1h-.938zm1.875 0h.938v-1H3.78v1zm1.875 0h.938v-1h-.938zm2.813 0v-.031H8.5V7.53h-.031V7.5H7.53v.031H7.5v.938h.031V8.5zm.937 0h.938v-1h-.938zm1.875 0h.938v-1h-.938zm1.875 0h.938v-1h-.938zm1.875 0h.469v-.031h.5V7.53h-.5V7.5h-.469v.031H15v.938h.031zM7.5 9.406v.938h1v-.938zm8.5.938v-.938h-1v.938zm-8.5.937v.938h1v-.938zm8.5.938v-.938h-1v.938zm-8.5.937v.938h1v-.938zm8.5.938v-.938h-1v.938zM1.906 16h.938v-1h-.938zm1.875 0h.938v-1H3.78v1zm1.875 0h.938v-1h-.938zm1.875-.5v.5h.938v-.5H8.5v-.469h-.031V15H7.53v.031H7.5v.469zm1.875.5h.938v-1h-.938zm1.875 0h.938v-1h-.938zm1.875 0h.938v-1h-.938zm1.875-.5v.5H16v-.969h-.5V15h-.469v.031H15v.469z"/>
</svg>` },
                                ]
                            },
                            {
                                name: "bs-border-color",
                                category: categoryBorder,
                                title: "Borders color",
                                label: `Borders color <a href="https://getbootstrap.com/docs/5.3/utilities/borders/#color" target="_blank" class="ms-auto text-decoration-none text-white">${IMG_HELP}</a>`,
                                type: 'class_select',
                                options: [
                                    { value: "", name: "" },
                                    { value: "border-primary", name: "primary" },
                                    { value: "border-primary-subtle", name: "primary-subtle" },
                                    { value: "border-secondary", name: "secondary" },
                                    { value: "border-secondary-subtle", name: "secondary-subtle" },
                                    { value: "border-success", name: "success" },
                                    { value: "border-success-subtle", name: "success-subtle" },
                                    { value: "border-danger", name: "danger" },
                                    { value: "border-danger-subtle", name: "danger-subtle" },
                                    { value: "border-warning", name: "warning" },
                                    { value: "border-warning-subtle", name: "warning-subtle" },
                                    { value: "border-info", name: "info" },
                                    { value: "border-info-subtle", name: "info-subtle" },
                                    { value: "border-light", name: "light" },
                                    { value: "border-light-subtle", name: "light-subtle" },
                                    { value: "border-dark", name: "dark" },
                                    { value: "border-dark-subtle", name: "dark-subtle" },
                                    { value: "border-black", name: "black" },
                                    { value: "border-white", name: "white" },
                                ]
                            },
                            {
                                name: "bs-border-size",
                                category: categoryBorder,
                                title: "Borders size",
                                label: `Borders size <a href="https://getbootstrap.com/docs/5.3/utilities/borders/#width" target="_blank" class="ms-auto text-decoration-none text-white">${IMG_HELP}</a>`,
                                type: 'class_select',
                                options: [
                                    { value: "", name: "" },
                                    { value: "border-1", name: "1 (smallest)" },
                                    { value: "border-2", name: "2" },
                                    { value: "border-3", name: "3" },
                                    { value: "border-4", name: "4" },
                                    { value: "border-5", name: "5 (largest)" },
                                ]
                            },
                            {
                                name: "bs-border-radius",
                                category: categoryBorder,
                                title: "Borders rounding",
                                label: `Borders rounding <a href="https://getbootstrap.com/docs/5.3/utilities/borders/#radius" target="_blank" class="ms-auto text-decoration-none text-white">${IMG_HELP}</a>`,
                                type: 'class_select',
                                options: [
                                    { value: "", name: "" },
                                    { value: "rounded", name: "Rounded" },
                                    { value: "rounded-circle", name: "Circle" },
                                    { value: "rounded-pill", name: "Pill" }
                                ]
                            },
                            {
                                name: "bs-border-round-size",
                                category: categoryBorder,
                                title: "Borders round size",
                                label: `Borders round size <a href="https://getbootstrap.com/docs/5.3/utilities/borders/#sizes" target="_blank" class="ms-auto text-decoration-none text-white">${IMG_HELP}</a>`,
                                type: 'class_select',
                                options: [
                                    { value: "", name: "" },
                                    { value: "rounded-0", name: "0 (no rounding)" },
                                    { value: "rounded-1", name: "1 (smallest)" },
                                    { value: "rounded-2", name: "2" },
                                    { value: "rounded-3", name: "3" },
                                    { value: "rounded-4", name: "4" },
                                    { value: "rounded-5", name: "5 (largest)" },
                                ]
                            },
                            {
                                name: "bs-width",
                                category: categorySize,
                                title: "Width (relative to parent)",
                                label: `Width (relative to parent) <a href="https://getbootstrap.com/docs/5.3/utilities/sizing/#relative-to-the-parent" target="_blank" class="ms-auto text-decoration-none text-white">${IMG_HELP}</a>`,
                                type: 'class_select',
                                options: [
                                    { value: "", name: "" },
                                    { value: "w-25", name: "25 %" },
                                    { value: "w-50", name: "50 %" },
                                    { value: "w-75", name: "75 %" },
                                    { value: "w-100", name: "100 %" },
                                    { value: "w-auto", name: "Auto" }
                                ]
                            },
                            {
                                name: "bs-height",
                                category: categorySize,
                                title: "Height (relative to parent)",
                                label: `Height (relative to parent) <a href="https://getbootstrap.com/docs/5.3/utilities/sizing/#relative-to-the-parent" target="_blank" class="ms-auto text-decoration-none text-white">${IMG_HELP}</a>`,
                                type: 'class_select',
                                options: [
                                    { value: "", name: "" },
                                    { value: "h-25", name: "25 %" },
                                    { value: "h-50", name: "50 %" },
                                    { value: "h-75", name: "75 %" },
                                    { value: "h-100", name: "100 %" },
                                    { value: "h-auto", name: "Auto" }
                                ]
                            },
                            {
                                name: "bs-width-viewport",
                                category: categorySize,
                                title: "Width (relative to viewport)",
                                label: `Width (relative to viewport) <a href="https://getbootstrap.com/docs/5.3/utilities/sizing/#relative-to-the-viewport" target="_blank" class="ms-auto text-decoration-none text-white">${IMG_HELP}</a>`,
                                type: 'class_select',
                                options: [
                                    { value: "", name: "" },
                                    { value: "vw-100", name: "100 %" },
                                ]
                            },
                            {
                                name: "bs-height-viewport",
                                category: categorySize,
                                title: "Height (relative to viewport)",
                                label: `Height (relative to viewport) <a href="https://getbootstrap.com/docs/5.3/utilities/sizing/#relative-to-the-viewport" target="_blank" class="ms-auto text-decoration-none text-white">${IMG_HELP}</a>`,
                                type: 'class_select',
                                options: [
                                    { value: "", name: "" },
                                    { value: "vh-100", name: "100 %" },
                                ]
                            },
                            



                            {
                                name: "bs-margin",
                                category: categoryMargins,
                                title: "Margin",
                                label: `Margin <a href="https://getbootstrap.com/docs/5.3/utilities/spacing/#margin-and-padding" target="_blank" class="ms-auto text-decoration-none text-white">${IMG_HELP}</a>`,
                                type: 'attribute_margin',
                                options:'m'
                            },
                            {
                                name: "bs-padding",
                                category: categoryMargins,
                                title: "Padding",
                                label: `Padding <a href="https://getbootstrap.com/docs/5.3/utilities/spacing/#margin-and-padding" target="_blank" class="ms-auto text-decoration-none text-white">${IMG_HELP}</a>`,
                                type: 'attribute_margin',
                                options:'p'
                            },
                        ])
                    }
                }, 
            });
        }
    }

}

let zoomPlugin = (editor, opts = {}) => {
    const options = { ...{
      // default options
      zoomInKey: ['ctrl', '='],
      zoomOutKey: ['ctrl', '-'],
      panelCategory: "Custom Category"
    },  ...opts };
  
    // zoomout button
    editor.Panels.addButton('options', {
      id: 'Zoom Out',
      className: 'fa fa-minus',
      command: 'zoomout',
      attributes: { title: 'Back' },
      category: options.panelCategory // add a new category for the custom icon
    })
  
    // zoomin button
    editor.Panels.addButton('options', {
      id: 'Zoom In',
      className: 'fa fa-plus',
      command: 'zoomin',
      attributes: { title: 'Back' },
      category: options.panelCategory // add a new category for the custom icon
    })
  
    editor.Commands.add('zoomin', {
      run: () => {
        const zoom = editor.Canvas.getZoom()
        editor.Canvas.setZoom(`${zoom + 5}`)
      }
    })
  
    editor.Commands.add('zoomout', {
      run: () => {
        const zoom = editor.Canvas.getZoom()
        editor.Canvas.setZoom(`${zoom - 5}`)
      }
    })
  
    /*document.addEventListener('keydown', function (event) {
      if (event.shiftKey && (event.keyCode === 187 || event.keyCode === 107)) {
        event.preventDefault()
        editor.runCommand('zoomin')
      }
      if (event.shiftKey && (event.key === '-' || event.key === '_')) {
        event.preventDefault()
        editor.runCommand('zoomout')
      }
    })*/
  };

export default {
    configure: async function({config}){
        config.plugins.splice(0,0,zoomPlugin, bootstrapPlugin) ;

         //fix space bar when zoom is applied (https://github.com/GrapesJS/grapesjs/issues/2422)
        config.canvas.notTextable = ['input[type=checkbox]', 'input[type=radio]'] ;

        //config.canvas.styles.push("https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css")
        config.canvas.styles.push("/plugin/bootstrap5/grapesjs/canvas-style.css")
        config.canvas.styles.push(`/bootstrap5/theme-bootstrap5.css`)
        
        //window.openbamz.loadCss("https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css")
    },       
}
