const Discord = require('discord.js');
const client = new Discord.Client();

let fs = require('fs');

module.exports = {
	name: 'rights',
	description: 'rights',
	aliases: ['rights', '채굴권'],
	execute(msg, args) {
		let path = './userdata/' + msg.author.id + '.json';

        if (!fs.existsSync(path)) {
            console.log('없어요')
        }

        fs.readFileSync(path, 'utf-8', (err, data) => {

            if (err) {
                console.log(err);
                return;
            }

            const RightsEmbed = new Discord.MessageEmbed()
			    .setColor('#CCD6DD')
			    .setTitle(':page_with_curl:  채굴권 현황')
			    //.setDescription('Some description here')
			    .addField('ID', 'Some value here', true)
                .addField('MINER', 'Some value here', true)
			    .setTimestamp()
			    .setFooter(msg.author.tag, msg.author.displayAvatarURL({
				    size: 1024,
				    format: 'png',
				    dynamic: true
			    }));

		    msg.channel.send(RightsEmbed);
        })
	},
};