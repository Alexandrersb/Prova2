import { enablePromise, openDatabase } from 'react-native-sqlite-storage'

enablePromise(true)

export async function getConnection() {
    return await openDatabase({name: 'pessoadb1', location: 'default'})
}

export async function createTableUsuario() {
    const db = await getConnection()
    const sql = `
        CREATE TABLE IF NOT EXISTS login (
            id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
            apikey VARCHAR(255) NOT NULL,
            email VARCHAR(200) NOT NULL,
            token VARCHAR(255) NOT NULL,
            expiration_date DATETIME NOT NULL
        )
    `
    try {
        await db.executeSql(sql)
    } catch (ex) {
        console.log('Erro ao criar a tabela de login')
    }
    await db.close()
}

export async function createTableImovel () {
    const db = await getConnection();
    const sql = `
        CREATE TABLE IF NOT EXISTS imovel (
            id integer primary key autoincrement,
            tipoImovel int, 
            endereco text, 
            locado boolean, 
            foto text, 
            tipoCadastro text, 
            valorAluguel int, 
            valorCondominio int, 
            numeroQuartos int, 
            numeroBanheiros int
        );
    `;
    try {
        await db.executeSql(sql)
    } catch (ex) {
        console.log('Erro ao criar a tabela imovel')
        console.log(ex)
    }
    await db.close()
}

export async function addLogin(login) {
    const db = await getConnection()
    const loginEncontrado = await buscarLoginPorEmail(db, login?.email)
    let sql = ''
    if (!loginEncontrado) {
        sql = `
        INSERT INTO login (apikey, email, expiration_date, token)
        VALUES ("${login.apikey}", "${login.email}",
        "${login.expirationDate}", "${login.token}")
        `
    } else {
        sql = `
        UPDATE login SET apikey="${login.apikey}", 
        email="${login.email}", 
        expiration_date="${login.expirationDate}",
        token="${login.token}"
        WHERE id=${loginEncontrado.id}
        `
    }
    try {
        await db.executeSql(sql)
        console.log('Login incluido no BD')
    } catch (ex) {
        console.log('Erro ao inserir o login no BD')
        console.log(ex)
    }
    await db.close()
}

export async function buscarLoginPorEmail(db, email) {
    let login = null
    const sql = `
    SELECT id, apikey, email, token, expiration_date
    FROM login
    WHERE email="${email}"
    ORDER BY id DESC
    LIMIT 1
    `
    const select = await db.executeSql(sql)
    const selectUnico = select[0]
    if (selectUnico.rows.length > 0) {
        const row = selectUnico.rows.item(0)
        login = {
            id: row.id,
            apikey: row.apikey,
            token: row.token,
            expiration_date: row.expiration_date,
            email: row.email
        }
    }
    return login
}

export async function deleteLogin(email) {
    const db = await getConnection()
    const sql = `DELETE FROM login WHERE email="${email}"`
    await db.executeSql(sql)
    await db.close()
}

export async function buscarLogin() {
    const db = await getConnection()
    let login = null
    const sql = `
    SELECT id, apikey, email, token, expiration_date
    FROM login
    ORDER BY id DESC
    LIMIT 1
    `
    const select = await db.executeSql(sql)
    const selectUnico = select[0]
    if (selectUnico.rows.length > 0) {
        const row = selectUnico.rows.item(0)
        login = {
            id: row.id,
            apikey: row.apikey,
            token: row.token,
            expiration_date: row.expiration_date,
            email: row.email
        }
    }
    await db.close()
    return login
}

export async function addPessoa(pessoa) {
    const db = await getConnection()
    const sql = `
        INSERT INTO pessoa(nome, cpf, idade, pussuicnh, responsavel)
        VALUES ("${pessoa.nome}", "${pessoa.cpf}", ${pessoa.idade},
                ${pessoa.isPossuiCnh ? pessoa.isPossuiCnh : false},
                "${pessoa.responsavelLegal ? pessoa.responsavelLegal : ''}")
    `
    await db.executeSql(sql)
        .then((response) => console.warn('Inserido: ' + JSON.stringify(response)))
        .catch((erro) => console.warn('Erro: ' + JSON.stringify(erro)))
    await db.close()
}


export async function addImovel(imovel) {
    const db = await getConnection()
    const sql = `
        INSERT INTO imovel(tipoImovel , endereco , locado , foto , tipoCadastro, valorAluguel, valorCondominio , numeroQuartos , numeroBanheiros)
        VALUES ("${imovel.tipoImovel}", "${imovel.endereco}", ${imovel.locado},
                ${imovel.foto}, ${imovel.tipoCadastro}, ${imovel.valorAluguel}, ${imovel.valorCondominio}, 
                ${imovel.numeroQuartos}, ${imovel.numeroBanheiros}")
    `
    await db.executeSql(sql)
        .then((response) => console.warn('Inserido: ' + JSON.stringify(response)))
        .catch((erro) => console.warn('Erro: ' + JSON.stringify(erro)))
    await db.close()
}

export async function listarPessoas() {
    const db = await getConnection()
    const sql = `
        SELECT id, nome, cpf, idade, responsavel, pussuicnh FROM pessoa
    `
    const listaRetorno = []
    await db.executeSql(sql)
        .then((response) => {
            const uniqueResponse = response[0]
            const rows = uniqueResponse.rows
            for (let i = 0; i < rows.length; i++) {
                const item = rows.item(i)
                const itemPessoa = {
                    id: item.id,
                    nome: item.nome,
                    cpf: item.cpf,
                    idade: item.idade,
                    responsavelLegal: item.responsavel,
                    isPossuiCnh: item.possuicnh
                }
                listaRetorno.push(itemPessoa)
            }
            db.close()
        })
    return listaRetorno
}


export async function listarImoveis() {
    const db = await getConnection()
    const sql = `
        SELECT id, tipoImovel , endereco , locado , foto , tipoCadastro, valorAluguel, valorCondominio , numeroQuartos , numeroBanheiros FROM imovel
    `
    const listaPessoas1 = []
    await db.executeSql(sql)
        .then((response) => {
            const uniqueResponse = response[0]
            const rows = uniqueResponse.rows
            for (let i = 0; i < rows.length; i++) {
                const item = rows.item(i)
                const itemImovel = {
                    id: item.id,
                    tipoImovel: item.tipoImovel,
                    endereco: item.endereco,
                    locado: item.locado,
                    tipoCadastro: item.tipoCadastro,
                    foto: item.foto,
                    valorAluguel: item.valorAluguel,
                    valorCondominio: item.valorCondominio,
                    numQuarto: item.numeroQuartos,
                    numBanheiro: item.numeroBanheiros
                }
                listaPessoas1.push(itemImovel)
            }
            db.close()
        })
    return listaPessoas1
}