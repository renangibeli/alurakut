const {SiteClient} = require('datocms-client')


export default async function requestReceiver(req, res){

    if(req.method === 'POST'){
        const TOKEN = '4242625a96776fa93ebbf68664466f'
        const client = new SiteClient(TOKEN)
    
        //validar os dados antes de cadastrar
        const record = await client.items.create({
            itemType: "979196", //model ID
            ...req.body,
            // title: "Comunidade de Teste",
            // imageUrl: "https://github.com/renangibeli.png",
            // creatorSlug: "renangibeli"
        })
    
        res.json({
            record: record
        })

        return
    }

    res.status(404).json({
        message: 'Ainda não temos nada no GET'
    })
}