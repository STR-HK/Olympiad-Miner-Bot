const Discord = require('discord.js');
const client = new Discord.Client();

let fs = require('fs');


module.exports = {
  name: 'help',
  description: 'help',
  aliases: ['help', '도움','ehdna'],
  execute(msg, args) {
    const HelpEmbed = new Discord.MessageEmbed()
	.setColor('#83BD61')
	.setTitle(':herb:  봇 설명서')
	.setDescription('봇 명령어들에 대한 간단한 설명들 모음집')
	.addFields(
		{ name: '가입', value: '서비스에 가입 또는 정보 수정을 합니다', inline: true },
		{ name: '탈퇴', value: '서비스를 탈퇴합니다', inline: true },
        { name: '현황', value: '나에게 등록된 정보을 보여줍니다', inline: true },
	)
    .addFields(
		{ name: '채굴권', value: '내가 모은 채굴권 개수를 보여줍니다', inline: true },
		{ name: '문제', value: '채굴권을 모으기 위한 문제를 드립니다', inline: true },
        { name: '채굴 <count>', value: '개수만큼 채굴을 합니다', inline: true },
	)
	.setTimestamp()
    .setFooter(msg.author.tag, msg.author.displayAvatarURL({
        size: 1024,
        format: 'png',
        dynamic: true
      }));

    msg.channel.send(HelpEmbed);
  }
};