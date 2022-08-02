/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable no-extra-semi */

const express = require('express');
const app = express();

app.listen(2000, () => {
	console.log('Project Running');
});

app.get('/', (req, res) => {
	res.send('Hello World!');
});
/* eslint-disable no-undef */
const fs = require('node:fs');

// Other Vars
const prefix = '!';

// Djs Objects

const { Client, Collection, GatewayIntentBits } = require('discord.js');
// Packages

const { GiveawaysManager } = require('discord-giveaways');

// Secrets

const token = "MTAwMzcwMTM5MjYxMzA1NjYwMg.GjkA_U.jMLLYd4tA5muBBGWvlxUaZ-tpNhZfTacb2x1wg"

// Client

const client = new Client({
	intents: [
		[GatewayIntentBits.GuildBans],
		[GatewayIntentBits.Guilds],
		[GatewayIntentBits.GuildMessages],
		[GatewayIntentBits.MessageContent],
		[GatewayIntentBits.GuildMessageReactions],
	],
});
client.giveaways = new GiveawaysManager(client, {
	storage: './giveaways.json',
	updateCountDownEvery: 5000,
	embedColor: '#ff0000',
	reaction : '🎉',
});

// Command Paths

client.commands = new Collection();
const commands = fs.readdirSync('./Commands').filter(file => file.endsWith('.js'));
for (file of commands) {
	const commandName = file.split('.')[0];
	const command = require(`./Commands/${commandName}`);
	client.commands.set(commandName, command);
}

// The Event Listener

client.on('messageCreate', message => {
	if (message.content.startsWith(prefix)) {
		const args = message.content.slice(prefix.length).trim().split(/ +/g);
		const commandName = args.shift();
		const command = client.commands.get(commandName);


		if (!command) return;

		command.run(client, message, args);
	}
});

function get_ready() {
	client.user.setPresence({
		status: 'idle',
		activities: {
		  name: 'For Giveaway\'s',
		  type: 'WATCHING',
		},
	});
	console.log(`Bot Online And Logged In As ${client.user.tag}`);
}


client.on('ready', () => {
	get_ready();
});


client.login(token);