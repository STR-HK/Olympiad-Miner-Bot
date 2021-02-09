const Discord = require('discord.js');
const client = new Discord.Client();

let fs = require('fs');

module.exports = {
	name: 'rights',
	description: 'rights',
	aliases: ['rights', '채굴권','cornfrnjs'],
	execute(msg, args) {
		let path = './userdata/' + msg.author.id + '.json';

		if (fs.existsSync(path)) {

			fs.readFile(path, 'utf-8', (err, data) => {

				let parse = JSON.parse(data);

				if (err) {
					const SaveErr1Embed = new Discord.MessageEmbed()
						.setColor('#31373D')
						.setTitle(':pirate_flag:  데이터 문제 발생')
						.setDescription('데이터 로드 중에 예기치 못한 문제가 발생했어요.\n개발자에게 문의해주세요.')
						.setTimestamp()
						.setFooter(msg.author.tag, msg.author.displayAvatarURL({
							size: 1024,
							format: 'png',
							dynamic: true
						}));
					msg.channel.send(SaveErr1Embed);
					return;
				}

				if (parse.hasOwnProperty('rights')) {
					const RightsEmbed = new Discord.MessageEmbed()
						.setColor('#F4900C')
						.setTitle(':large_orange_diamond:  채굴권 현황')
						.setDescription('현재 ' + parse.rights + '개의 채굴권을 가지고 계세요.')
						.setTimestamp()
						.setFooter(msg.author.tag, msg.author.displayAvatarURL({
							size: 1024,
							format: 'png',
							dynamic: true
						}));

					msg.channel.send(RightsEmbed);
					return;

				} else {
					parse['rights'] = 0;
					savedata = JSON.stringify(parse);

					fs.writeFile(path, savedata, function (err) {
						if (err) {
							const SaveErr2Embed = new Discord.MessageEmbed()
								.setColor('#31373D')
								.setTitle(':pirate_flag:  데이터 문제 발생')
								.setDescription('데이터 로드 중에 예기치 못한 문제가 발생했어요.\n개발자에게 문의해주세요.')
								.setTimestamp()
								.setFooter(msg.author.tag, msg.author.displayAvatarURL({
									size: 1024,
									format: 'png',
									dynamic: true
								}));
							msg.channel.send(SaveErr2Embed);
							return;
						}
					})

					const RightsZeroEmbed = new Discord.MessageEmbed()
						.setColor('#F4900C')
						.setTitle(':large_orange_diamond:  채굴권 현황')
						.setDescription('현재 0개의 채굴권을 가지고 계세요.')
						.setTimestamp()
						.setFooter(msg.author.tag, msg.author.displayAvatarURL({
							size: 1024,
							format: 'png',
							dynamic: true
						}));

					msg.channel.send(RightsZeroEmbed);
					return;
				}


			})

		} else {
			const StatusErrorEmbed = new Discord.MessageEmbed()
				.setColor('#BE1931')
				.setTitle(':exclamation:  채굴권 현황')
				.setDescription('가입하지 않으셔서 채굴권을 불러올 수 없어요! `가입` 명령어를 통해 가입을 진행해주세요!')
				.setTimestamp()
				.setFooter(msg.author.tag, msg.author.displayAvatarURL({
					size: 1024,
					format: 'png',
					dynamic: true
				}));

			msg.channel.send(StatusErrorEmbed);
			return;

		}
	},
};