const Discord = require('discord.js');
const client = new Discord.Client();

let fs = require('fs');

module.exports = {
	name: 'rights',
	description: 'rights',
	aliases: ['rights', '채굴권'],
	execute(msg, args) {
		let path = './userdata/' + msg.author.id + '.json';

        if (fs.existsSync(path)) {
            
            fs.readFileSync(path, 'utf-8', (err, data) => {

                let parse = JSON.parse(data);
                print(parse);

                if (err) {
                    const SaveErr3Embed = new Discord.MessageEmbed()
                    .setColor('#31373D')
                    .setTitle(':pirate_flag:  데이터 문제 발생')
                    .setDescription('데이터 로드 중에 예기치 못한 문제가 발생했어요.\n개발자에게 문의해주세요.')
                    .setTimestamp()
                    .setFooter(msg.author.tag, msg.author.displayAvatarURL({
                      size: 1024,
                      format: 'png',
                      dynamic: true
                    }));
                  msg.channel.send(SaveErr3Embed);
                  return;
                } else {
                    const RightsEmbed = new Discord.MessageEmbed()
                    .setColor('#CCD6DD')
                    .setTitle(':page_with_curl:  채굴권 현황')
                    .addField('ID', parse.id, true)
                    .addField('MINER', parse.miner, true)
                    .setTimestamp()
                    .setFooter(msg.author.tag, msg.author.displayAvatarURL({
                        size: 1024,
                        format: 'png',
                        dynamic: true
                    }));
        
                    msg.channel.send(RightsEmbed);
                    return;
                }
            })

        } else {
            const RightsErrorEmbed = new Discord.MessageEmbed()
            .setColor('#BE1931')
            .setTitle(':exclamation:  채굴권 현황')
            .setDescription('가입하지 않으셨어요! `가입` 명령어를 통해 가입을 진행해주세요!')
            .setTimestamp()
            .setFooter(msg.author.tag, msg.author.displayAvatarURL({
                size: 1024,
                format: 'png',
                dynamic: true
            }));

        msg.channel.send(RightsErrorEmbed);
        return;
        }

	},
};