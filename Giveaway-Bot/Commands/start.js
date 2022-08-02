const ms = require('ms');

module.exports.run = async (client, message, args) => {
	if (!message.member.permissions.has('MANAGE_MESSAGES')) return message.channel.send('You dont have manage messages permission.');

	const channel = message.mentions.channels.first();
	if (!channel) return message.channel.send('Please specify a channel');

	const duration = args[1];
	if (!duration) return message.channel.send('please enter a valid duration');

	const winners = args[2];
	if (!winners) return message.channel.send('Please specify an amount of winners');

	const prize = args.slice(3).join(' ');
	if (!prize) return message.channel.send('Please sepcify a prize to win');

	client.giveaways.start(channel, {
		duration : ms(duration),
		prize : prize,
		winnerCount: parseInt(winners),
		hostedBy: message.author || null,
		messages: {
			giveaway: '\n\n' + 'Giveaway',
			giveawayEnd: '<@1003674073756344520>\n\n' + 'Giveaway Ended',
			timeRemaining:`Time Remaining **${duration}**`,
			inviteToParticipate: 'React with 🎉 to join the giveaway',
			winMessage: 'Congrats {winners}, you have  won the giveaway',
			embedFooter: 'Giveaway Time!',
			noWinner: 'Could not determine a winner',
			hostedBy: `Hosted by ${message.author}`,
			winners: 'winners',
			endedAt: 'Ends at',
			units: {
				seconds: 'seconds',
				minutes: 'minutes',
				hours: 'hours',
				days: 'days',
				pluralS: false,
			},
		},

	}).catch(err => {
		console.log(err);
	});

	message.channel.send(`Giveaway is starting in ${channel}`);
};