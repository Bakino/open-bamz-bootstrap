import express from 'express';
// @ts-ignore
import sass from 'sass';
// @ts-ignore
import path from 'path';
import { fileURLToPath } from "url";
import { readFile } from 'node:fs/promises';

/**
 * Called on each application startup (or when the plugin is enabled)
 * 
 * Use it to prepare the database and files needed by the plugin
 */
export const prepareDatabase = async ({options, client, grantSchemaAccess}) => {
    await client.query(`CREATE SCHEMA IF NOT EXISTS bootstrap5`);

    //keep boostrap SASS variables
    await client.query(`create table if not exists bootstrap5.variable (
        variable varchar primary key,
        value varchar
    )`);

    //keep compile status to know if we need to recompile variable
    await client.query(`create table if not exists bootstrap5.sass_cache (
        need_compile boolean,
        css varchar
    )`);

    //set status need compile when add or change variable
    await client.query(`CREATE OR REPLACE FUNCTION bootstrap5.set_compile_status() RETURNS TRIGGER AS
$$
    if(!OLD || OLD.value !== NEW.value){
        let result = plv8.execute("UPDATE bootstrap5.sass_cache SET need_compile = true RETURNING need_compile");
        if(result.length===0){
            plv8.execute("INSERT INTO bootstrap5.sass_cache(need_compile) VALUES (true)");
        }
    }
    return NEW;
$$
LANGUAGE "plv8" SECURITY DEFINER`);

    await client.query(`CREATE OR REPLACE TRIGGER bootstrap5_set_compile_status
    AFTER INSERT OR UPDATE
    ON bootstrap5.variable FOR EACH ROW
    EXECUTE PROCEDURE bootstrap5.set_compile_status()`)


    await grantSchemaAccess("bootstrap5") ;

}

/**
 * Called when the plugin is disabled
 * 
 * Use it to eventually clean the database and files created by the plugin
 */
export const cleanDatabase = async ({client}) => {
    await client.query(`drop schema if exists bootstrap5 CASCADE`);
}


/**
 * Init plugin when Open BamZ platform start
 */
export const initPlugin = async ({ loadPluginData, runQuery, hasCurrentPlugin, logger }) => {
    const router = express.Router();

    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    router.get("theme-bootstrap5.css", (req, res, next)=>{
        (async ()=>{
            try{
                let appName = req.appName;                   
                if(await hasCurrentPlugin(appName)){

                    const { rows } = await runQuery({database: appName}, 
                        `SELECT * FROM bootstrap5.sass_cache`
                    );

                    let css;
                    if(rows.length === 0){
                        //no variable, serve standard bootstrap file
                        css = await readFile(path.join(__dirname, "node_modules", "bootstrap", "dist", "css", "bootstrap.min.css"), {encoding: "utf8"})
                    }else{
                        css = rows[0].css ;
                        if(rows[0].need_compile){
                            //we must recompile the CSS (variables changed)

                            const variables = await runQuery({database: appName}, 
                                `SELECT * FROM bootstrap5.variable`
                            );
                            const scss = `
                            ${variables.rows.map(v=>`${v.variable}: ${v.value};`).join("\n")}
                            
                            @import "scss/bootstrap";
                            
                            `;
                            const result = await sass.compileStringAsync(scss, {
                                loadPaths: [
                                    path.join(__dirname, "node_modules", "bootstrap"),
                                ],
                                quietDeps: true
                            });
                            css = result.css ;

                            await runQuery({database: appName}, 
                                `UPDATE bootstrap5.sass_cache SET need_compile = false, css = $1`,
                                [css]
                            );
                        }
                    }

                    res.setHeader("Content-Type", "text/css") ;
                    res.end(css) ;
                }else{
                    next() ;
                }
            }catch(err){
                logger.error("Can't load bootstrap variables %o", err)
                res.status(err.statusCode??500).end("/*Error loading bootstrap5 variables*/");
            }
        })();
    })


    loadPluginData(async ({pluginsData})=>{
        if(pluginsData?.["grapesjs-editor"]?.pluginSlots?.grapesJsEditor){
            pluginsData?.["grapesjs-editor"]?.pluginSlots?.grapesJsEditor.push( {
                plugin: "bootstrap5",
                extensionPath: "/plugin/bootstrap5/grapesjs/grapesjs-bootstrap5-extension.mjs"
            })
        }
        if(pluginsData?.pwa?.pluginSlots?.urlsToCache){
            //always store dev that is the default lang
            pluginsData?.pwa?.pluginSlots?.urlsToCache.push({
                url: `/bootstrap5/theme-bootstrap5.css`
            });
        }

        if(pluginsData?.["sources-export"]?.pluginSlots?.urlsToDownload){
            //always store dev that is the default lang
            pluginsData?.["sources-export"]?.pluginSlots?.urlsToDownload.push({
                url: `/bootstrap5/theme-bootstrap5.css`,
                dest: `bootstrap5/theme-bootstrap5.css`
            });
        }

        if(pluginsData?.["viewz"]?.pluginSlots?.viewzExtensions){
            pluginsData?.["viewz"]?.pluginSlots?.viewzExtensions.push( {
                plugin: "bootstrap5",
                extensionPath: "/plugin/:appName/bootstrap5/lib/viewz-bootstrap5.mjs",
                "d.ts": `
                declare const bootstrap: Bootstrap5;
                declare const bootstrap5: Bootstrap5;
                declare const dialogs: Bootstrap5DialogsViewZ;

                
                `
            })
        }
        if(pluginsData?.["dbadmin"]?.pluginSlots?.dbFieldsExtensions){
            pluginsData?.["dbadmin"]?.pluginSlots?.dbFieldsExtensions.push( {
                plugin: "bootstrap5",
                extensionPath: "/plugin/:appName/bootstrap5/lib/db-components-bootstrap5.mjs",
            })
        }
        if(pluginsData?.["dbadmin"]?.pluginSlots?.dbValuesExtensions){
            pluginsData?.["dbadmin"]?.pluginSlots?.dbValuesExtensions.push( {
                plugin: "bootstrap5",
                extensionPath: "/plugin/:appName/bootstrap5/lib/db-values-bootstrap5.mjs",
            })
        }
        if(pluginsData?.["code-editor"]?.pluginSlots?.javascriptApiDef){
            pluginsData?.["code-editor"]?.pluginSlots?.javascriptApiDef.push( {
                plugin: "bootstrap5",
                url: "/plugin/:appName/bootstrap5/lib/bootstrap-lib.d.ts"
            })
        }
    })

    return {
        // path in which the plugin provide its front end files
        frontEndPath: "front",
        //lib that will be automatically load in frontend
        frontEndLib: "lib/bootstrap-lib.mjs",
        router: router,
        //menu entries
        // menu: [
        //     {
        //         name: "admin", entries: [
        //             { name: "Users Settings", link: "/plugin/open-bamz-users/settings/index.html" }
        //         ]
        //     }
        // ]
    }
}