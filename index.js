const yargs = require("yargs")

const contacts = require('./tulisPertanyaa.js')

// const main = async () => {
//     const nama = await contacts.pertanyaan('nama');
//     const email = await contacts.pertanyaan('email');
//     const nomor = await contacts.pertanyaan('nomor hp');

//     contacts.simpan(nama,email,nomor)
// }
// main()

yargs.command([
    {
        command: 'add',
        describe: 'Menambahkan kontak baru',
        builder: {
            nama:{
                describe: 'nama lengkap',
                demandOption: true,
                type: 'string'
            },
            email:{
                describe: 'email',
                demandOption: false,
                type: 'string'
            },
            nomor:{
                describe: 'nomor Handphone',
                demandOption: true,
                type: 'string'
            }
        },
        handler(argv){
            const contact = {
                nama: argv.nama,
                email: argv.email,
                noHp: argv.nomor
            }
            
            contacts.simpan(contact.nama,contact.email,contact.noHp)
            console.log(contact)
        }
    },
    {
        command: 'remove',
        describe: 'Mengapus Kontak',
        builder: {
            nama:{
                describe: 'nama lengkap(case sensitive)',
                demandOption: true,
                type: 'string'
            }
        },
        handler(argv){
            contacts.hapus(argv.nama)
        }
    },
    {
        command: 'list',
        describe: 'Menglist Kontak',
        builder: {
            detail: {
                describe: 'detail dari kontak',
                demandOption: false,
                type: 'boolean'
            }
        },
        handler(argv){
            contacts.list(argv.detail)
        }
    }
]).demandCommand()

yargs.parse()