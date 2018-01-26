const Discord = require("discord.js");
const client = new Discord.Client();

const config = require("./config.json")

client.on("ready", () => {
	console.log(`Foxbot loaded into memory but VAC won't care anyways`);
	client.user.setActivity(`Hello bois`);
});

client.on("message", message => {
	if (message.author.bot) return;
	if(message.content.indexOf(config.prefix) !==0) return; 
	
	const args = message.content.slice(config.prefix.length).trim().split(/ +/g)
	const command = args.shift().toLowerCase();

	try {
		let commandFile = require(`./commands/${command}.js`);
		commandFile.run(client, message, args);
	} catch (err) {
		console.error(err);
	}
});

client.login(config.token);