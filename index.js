const Discord = require('discord.js');
const client = new Discord.Client();
client.commands = new Discord.Collection();
let fs = require('fs');

let prefix = ";"

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}


client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`);
	client.user.setActivity("Ethereum", { type: "WATCHING"})
});

client.on('message', async msg => {
	const args = msg.content.slice(prefix.length).trim().split(/ +/);
	const command = args.shift().toLowerCase();

	if (!client.commands.has(command) && !client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(command))) return;
	
	if(msg.content.indexOf(prefix) !== 0) return;

	const cmdExec = client.commands.get(command) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(command))

	try {
		cmdExec.execute(msg, args);
	} catch (error) {
		console.error(error);
		msg.reply('there was an error trying to execute that command!');
	}
});

global.Client = client

fs.readFile('./token.token', 'utf-8', (err, data) => {
	if (err) {
		console('No token.token File!')
		return;
	}
	client.login(data)
})
