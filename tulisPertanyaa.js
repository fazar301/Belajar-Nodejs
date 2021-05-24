const fs = require('fs');
const validator = require('validator')
const chalk = require('chalk')

if(!fs.existsSync('./data')) {
    fs.mkdirSync('data')
    fs.writeFileSync('data/contacts.json','[]')
}
if(!fs.existsSync('./data/contacts.json')) fs.writeFileSync('data/contacts.json','[]');

 
const json = JSON.parse(fs.readFileSync('./data/contacts.json','utf-8'));

const simpan = (nama,email,nomor) => {
    const duplicat = json.find(contact => contact.nama === nama)
    if(duplicat){
        console.log(chalk `{bgYellowBright.black Kontak sudah terdaftar}, gunakan nama lain.`)
        return false
    }
    if(email){
        if(!validator.default.isEmail(email)){
            console.log(chalk.bgYellowBright.black('Masukkan email yang valid!'));
            return false;
        }
    }
    if(!validator.default.isMobilePhone(nomor,'id-ID')){
        console.log(chalk.bgYellowBright.black('Masukkan nomor yang valid!'));
        return false;
    }
    
    json.push({nama, email, nomor})
    fs.writeFileSync('./data/contacts.json',JSON.stringify(json,null, '\t'))
    console.log(chalk.bgGreenBright.black('Terimakasih sudah memasukkan data.'))
}

const hapus = (nama) => {
    const result = json.find(contact => contact.nama === nama)

    if(json.indexOf(result) < 0){
        console.log('Kontak tidak ditemukan.')
        return false
    };

    json.splice(json.indexOf(result),1)

    fs.writeFileSync('./data/contacts.json',JSON.stringify(json,null, '\t'))
    console.log(chalk.bgGreenBright.black('Sukses menghapus kontak'))
}

const list = (detail) => {
    if(detail){
        console.table(json)
        return false;
    }
    const noEmail = json.filter(e => e.email === undefined);
    console.table(noEmail)
}

module.exports.list = list;
module.exports.hapus = hapus;
module.exports.simpan = simpan;
