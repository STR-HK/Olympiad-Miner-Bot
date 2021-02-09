const Discord = require('discord.js');
const client = new Discord.Client();

let fs = require('fs');

module.exports = {
	name: 'leave',
	description: 'leave',
	aliases: ['leave', '탈퇴','xkfxhl'],
	execute(msg, args) {
		let path = './userdata/' + msg.author.id + '.json';

		if (fs.existsSync(path)) {
			const LeaveEmbed = new Discord.MessageEmbed()
				.setColor('#BE1931')
				.setTitle(':no_entry:  탈퇴 메뉴')
				.setDescription('정말로 Olympiad Miner 서비스를 탈퇴하시겠어요?\n탈퇴 후에 재가입은 가능하지만 기존 데이터는 소실돼요.\n탈퇴하시려면 `탈퇴`, 취소하시려면 ``취소``라고 입력해주세요.\n+ 시간 초과 메시지가 뜰 때까지 응답하지 않으시면 탈퇴가 취소돼요.')
				.setTimestamp()
				.setFooter(msg.author.tag, msg.author.displayAvatarURL({
					size: 1024,
					format: 'png',
					dynamic: true
				}));
			msg.channel.send(LeaveEmbed);
		} else {
			const LeaveEmbed = new Discord.MessageEmbed()
				.setColor('#BE1931')
				.setTitle(':no_entry:  탈퇴 불가')
				.setDescription('가입하시지 않으셔서 탈퇴가 불가능해요.')
				.setTimestamp()
				.setFooter(msg.author.tag, msg.author.displayAvatarURL({
					size: 1024,
					format: 'png',
					dynamic: true
				}));
			msg.channel.send(LeaveEmbed);
			return;
		}

		const filter = m => m.author.id === msg.author.id;

		msg.channel.awaitMessages(filter, {
				max: 1,
				time: 10000,
				errors: ['time']
			})
			.then(async(collected) => {
				let boolean = collected.first().content
				if (boolean == '취소') {
					const NoLeaveEmbed = new Discord.MessageEmbed()
						.setColor('#DF2E45')
						.setTitle(':x:  탈퇴 취소')
						.setDescription('탈퇴가 정상적으로 취소되었어요.')
						.setTimestamp()
						.setFooter(msg.author.tag, msg.author.displayAvatarURL({
							size: 1024,
							format: 'png',
							dynamic: true
						}));
					msg.channel.send(NoLeaveEmbed);
					return;
				} else if (boolean == '탈퇴') {
					fs.unlinkSync(path)

					const LeavedEmbed = new Discord.MessageEmbed()
						.setColor('#226699')
						.setTitle(':ballot_box_with_check:  정상 탈퇴 완료')
						.setDescription('정상적으로 탈퇴가 완료되었어요. 나중에 다시 가입하실 수 있어요.')
						.setTimestamp()
						.setFooter(msg.author.tag, msg.author.displayAvatarURL({
							size: 1024,
							format: 'png',
							dynamic: true
						}));
					msg.channel.send(LeavedEmbed);
					return;

				} else {
					const UnknownArgsEmbed = new Discord.MessageEmbed()
						.setColor('#31373D')
						.setTitle(':pirate_flag:  잘못된 응답')
						.setDescription('잘못된 응답이 들어와 탈퇴가 취소되었어요.\n원하시면 다시 시도해주세요.')
						.setTimestamp()
						.setFooter(msg.author.tag, msg.author.displayAvatarURL({
							size: 1024,
							format: 'png',
							dynamic: true
						}));
					msg.channel.send(UnknownArgsEmbed);
					return;
				}
			})
			.catch(async(collected) => {
				const TimeOutEmbed = new Discord.MessageEmbed()
					.setColor('#31373D')
					.setTitle(':pirate_flag:  시간 초과')
					.setDescription('시간이 초과되어 탈퇴가 취소되었어요. 다시 시도해주세요.')
					.setTimestamp()
					.setFooter(msg.author.tag, msg.author.displayAvatarURL({
						size: 1024,
						format: 'png',
						dynamic: true
					}));
				msg.channel.send(TimeOutEmbed);
				return;
			})
	},
};