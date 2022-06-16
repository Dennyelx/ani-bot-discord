const { readdirSync } = require("fs");

const ascii = require("ascii-table");

let table = new ascii("Command's");
table.setHeading("Command's", "Status");

module.exports = (client) => {
    readdirSync("hecommands/").forEach(dir => {
        const commands = readdirSync(`./hecommands/${dir}/`).filter(file => file.endsWith(".js"));

        for(let file of commands) {
            let pull = require(`../hecommands/${dir}/${file}`);
            
            if(pull.name){
                client.commands.set(pull.name, pull)
                table.addRow(file, "Done");
            }else{
                table.addRow(file, "Error");
                continue;
            }

            if(pull.aliases && Array.isArray(pull.aliases)) pull.aliases.forEach(alias => client.aliases.set(alias, pull.name));
        }
    });

    console.log(table.toString());
}
