import chalk from "chalk";
import fs from "fs";

function extrailinks(texto){
    const regex = /\[([^\]]*)\]\((https?:\/\/[^$#\s].[^\s]*)\)/gm
    const arrayResultado = [];

    let temp;
    while ((temp = regex.exec(texto)) != null) {
        arrayResultado.push({ [temp[1]] : [temp[2]]}) 
    }
    return arrayResultado.length === 0 ? "Não há links" : arrayResultado;
}

function trataErro(erro){
    throw new Error(chalk.red(erro.code, "Não há arquivo no caminho..."));
} 

async function pegaArquivo(caminhoDoArquivo){
    const encoding = "utf-8";

    try {         
        const texto = await fs.promises.readFile(caminhoDoArquivo, encoding);
        return(extrailinks(texto))
    } catch(erro) {
        trataErro(erro);
    }
};
//pegaArquivo('./Arquivos/texto.md');

export default pegaArquivo;