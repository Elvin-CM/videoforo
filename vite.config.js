import { defineConfig } from "vite";
import htmlPurge from 'vite-plugin-purgecss';
import { ViteMinifyPlugin } from 'vite-plugin-minify'; //Plugin para minificar el código html
//spa single page application
//mpa multi page application
import path, { resolve } from 'node:path';
import * as glob from 'glob'; //Glob sirve para tener mas de un index.html
import handlebars from "vite-plugin-handlebars";

import getPageContext from './siteData';

const obtenerEntradas = () => { //Entradas son archivos que van a entrar a un proceso de compilación
    return Object.fromEntries(
        [
            ...glob.sync(
                './**/*.html',
                {
                    ignore: [
                        './dist/**',
                        './node_modules/**'
                    ]
                }
            ).map(
                file => [
                    file.slice(0, file.length - path.extname(file).length),
                    resolve(__dirname, file)
                ]
            )
        ]
    );

}
export default defineConfig(
    {
        appType: 'mpa',
        base: process.env.DEPLOY_BASE_URL, //Base URL para el despliegue, si no se especifica, se usa la raíz del dominio
        build: {
            rollupOptions: {
                input: obtenerEntradas()
            },
            minify: true, //Minifica el código, borra los comentarios y espacios en blanco
        },
        plugins: [
            handlebars({
                partialDirectory: resolve(__dirname, 'partials'),
                context: getPageContext
            }),
            htmlPurge({}),
            ViteMinifyPlugin(),
        ]
    }
);