import bootstrap5 from "./bootstrap-lib.mjs";

bootstrap5.dialogs.viewModal = function ({title, view, openParams, headerClass, backdrop, focus, keyboard, size, draggable, closeable, aboveAll}) {

    const bodyContents = "";

    if(aboveAll === undefined){
        aboveAll = true;
    }

    const elModal = bootstrap5.dialogs.prepareModal({title, bodyContents, headerClass, size,draggable, closeable, aboveAll})

    let canClose = closeable !== false;

    let options = {} ;
    if(backdrop !== undefined){ options.backdrop = backdrop; }
    if(focus !== undefined){ options.focus = focus; }
    if(keyboard !== undefined){ options.keyboard = keyboard; }
    if(!canClose){
        //not closeable, for keyboard to false
        options.keyboard = false;
        options.backdrop = "static";
    }

    const elModalBody = elModal.querySelector(".modal-body") ;
    const bsModal = new bootstrap5.bootstrap.Modal(elModal, options) ;

    return new Promise(resolve=>{
        let resultData = null;
        view.closePopup = (data)=>{
            resultData = data;
            bsModal.hide();
        }

        view.render({container: elModalBody, route: openParams});


        bsModal.show() ;

        elModal.addEventListener('hidden.bs.modal', ()=>{
            view.destroy() ;
            bsModal.dispose() ;
            document.body.removeChild(elModal) ;
            resolve(resultData) ;
        })
    }); 
};

bootstrap5.dialogs.routeModal = function ({title, route, openParams, headerClass, backdrop, focus, keyboard, size, draggable, closeable, aboveAll}) {

    const bodyContents = "";

    if(aboveAll === undefined){
        aboveAll = true;
    }

    const elModal = bootstrap5.dialogs.prepareModal({title, bodyContents, headerClass, size,draggable, closeable, aboveAll})

    let canClose = closeable !== false;

    let options = {} ;
    if(backdrop !== undefined){ options.backdrop = backdrop; }
    if(focus !== undefined){ options.focus = focus; }
    if(keyboard !== undefined){ options.keyboard = keyboard; }
    if(!canClose){
        //not closeable, for keyboard to false
        options.keyboard = false;
        options.backdrop = "static";
    }

    const elModalBody = elModal.querySelector(".modal-body") ;
    const bsModal = new bootstrap5.bootstrap.Modal(elModal, options) ;

    return new Promise((resolve, reject)=>{
        (async ()=>{
            let resultData = null;

            // @ts-ignore
            const router = window.routerz ;

            let path = route;
            if(router.base){
                path = router.base +path;
            }

            const routeDef = router.allRoutes.find(r=>r.regexp.regexp.exec(path)) ;
            if(!routeDef){
                return reject(`View not found for route ${route}`) ;
            }
            
            let data ;
            if(openParams){
                data = {params: JSON.parse(JSON.stringify(openParams))} ;
            }else{
                data = router._parseLocation({ pathname: path, search: "", hash: "" }, router.getRoute(path));
            }

            const view = await routeDef.createView() ;
            view.render({container: elModalBody, route: data});
        
            view.closePopup = (data)=>{
                resultData = data;
                bsModal.hide();
            }
    
            bsModal.show() ;
    
            elModal.addEventListener('hidden.bs.modal', ()=>{
                view.destroy() ;
                bsModal.dispose() ;
                document.body.removeChild(elModal) ;
                resolve(resultData) ;
            })
        })() ;
    }); 
};

let extensionConfig = {
    cancelConfirm: "Are you sure to cancel ?",
    unsaveChangeConfirm: "You have not saved modification, are you sure to leave ?"
}


function containerFactory({router, layoutCode, layoutParams}){
    //handle the dialog stack container

    if(layoutCode === "()"){
        //dialog layout
        const {element, modal} = bootstrap5.dialogs.modal({title: "", bodyContents: "",  
            size: "medium", draggable: true, 
            closeable: layoutParams.includes("x")}) ;

        const stackContainer = element.querySelector(".modal-body") ;
        // @ts-ignore
        stackContainer.setTitle = title=>{
            element.querySelector(".modal-title").innerHTML = title ;
        }

        let destroying = false;
        // @ts-ignore
        stackContainer.destroy = ()=>{
            destroying = true;
            modal.hide() ;
        }

        element.addEventListener('hide.bs.modal', (ev)=>{
            if(!destroying){
                router.closeStack() ;
                ev.preventDefault() ;
            }
        })

        return stackContainer;
    }
}

export default {
    set config(config){
        extensionConfig = config ;
    },

    get config(){
        return extensionConfig ;
    },

    containerFactory,

    globals: {
        bootstrap: bootstrap5,
        bootstrap5: bootstrap5,
        dialogs: bootstrap5.dialogs,
    },

    extends: {
        // Expected route : /my/form/:id?

        //example of compatible loader
        /*
        view.loader = async ()=>{
            let contact;
            let mode = "create";  // Default mode is create
            if(view.route.params.id){
                // If an ID is provided in the route parameters, we're in read mode
                mode = "read";
                // Fetch the contact from the database using the ID
                contact = await dbApi.db.contact.getBy_id(view.route.params.id)
            }else{
                // No ID provided, initialize an empty contact object
                contact = {};
            }
            return {
                contact,
                mode
            }
        }
        */

        /**
         * Manage a form in the view
         * 
         * @param {HTMLFormElement} form the form to manage (if not given, search first form in the view)
         * @returns 
         */
        manageForm: function(form=null){
            if(!form){
                form = this.querySelector("form") ;
            }
            // Initialize the form with bootstrap5 utilities
            this.managedForm = bootstrap5.initForm(form) ;

            form.addEventListener("changeMode", (ev)=>{
                // @ts-ignore
                if(ev.detail === "read"){
                    this.router?.unblock() ;
                }else{
                    this.router?.block(extensionConfig.unsaveChangeConfirm) ;
                }
            })
            form.addEventListener("validated", ()=>{
                //form validation succeed
                this.router?.unblock() ;
            })

            // Set the form mode (create or read)
            form.applyMode(this.data.mode);

            this.data.addListener("mode", ()=>{
                form.applyMode(this.data.mode);
            });

            return this.managedForm ;
        },

        formMode: async function(mode){
            if(mode === "create"){
                //go to create mode : clear route parameters
                const params = JSON.parse(JSON.stringify(this.route.params)) ;
                delete params.id ;
                this.route.setParams(params) ;
            }else if(mode === "edit"){
                // refresh before edit to get most recent data from database
                await this.refresh();

                this.data.mode = "edit" ;
            }else if(mode === "read"){
                if(this.data.mode !== "read"){
                    if(await bootstrap5.dialogs.confirm(extensionConfig.cancelConfirm)){
                        if(this.data.mode === "edit"){
                            // if we are in edit mode, we need to refresh the data
                            await this.refresh();
                        }else if(this.data.mode === "create"){
                            // if we are in edit mode, go back to previous page
                            this.router?.unblock() ;
                            this.router?.back() ;
                        }
                    }
                }
            }
        },

        validateForm: function(form){
            return bootstrap5.validateForm(form??this.querySelector("form")) ;
        }


    }
}
