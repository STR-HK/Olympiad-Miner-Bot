const Discord = require('discord.js');
const client = new Discord.Client();

let prefix = ";"

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  if (msg.content === prefix + 'enroll' || msg.content === prefix + '등록') {
    
    const EnrollEmbed = new Discord.MessageEmbed()
	    .setColor('#9669D4')
	    .setTitle(':id: Ethereum Miningpoolhub 아이디 등록 대기')
	    //.setAuthor(client.user.tag, client.user.displayAvatarURL({ size: 1024, format: 'png', dynamic: true }))
	    .setDescription('Ethereum을 수령하실 아이디를 입력해주세요 : ')
	    .setTimestamp()
	    .setFooter(msg.author.tag, msg.author.displayAvatarURL({ size: 1024, format: 'png', dynamic: true }));

    msg.channel.send(EnrollEmbed);

    const filter = m => m.author.id === msg.author.id;

    msg.channel.awaitMessages(filter, { max: 1, time: 10000, errors: ['time'] })
    .then(async(collected) => {
      let id = collected.first().content

      const IdCheckedEmbed = new Discord.MessageEmbed()
      .setColor('#226699')
      .setTitle(':ballot_box_with_check: 아이디 입력 완료')
      .setDescription('아이디가 정상적으로 입력되었어요 : `' + id + '`')
      .setTimestamp()
	    .setFooter(msg.author.tag, msg.author.displayAvatarURL({ size: 1024, format: 'png', dynamic: true }));
    msg.channel.send(IdCheckedEmbed);

      const GiveMinerNameEmbed = new Discord.MessageEmbed()
      .setColor('#F5900C')
      .setTitle(':pick: 마이너 이름 입력 대기')
      .setDescription('Ethereum을 수령하실 마이너 이름을 입력해주세요 : ')
      .setTimestamp()
	    .setFooter(msg.author.tag, msg.author.displayAvatarURL({ size: 1024, format: 'png', dynamic: true }));
    msg.channel.send(GiveMinerNameEmbed);
    
    const filter = m => m.author.id === msg.author.id;
    
    msg.channel.awaitMessages(filter, {max :1, time: 10000, errors: ['time'] })
    .then(async(collected) => {
      let miner = collected.first().content

      const MinerCheckedEmbed = new Discord.MessageEmbed()
      .setColor('#77B255')
      .setTitle(':white_check_mark: 마이너 이름 입력 완료')
      .setDescription('마이너 이름이 정상적으로 입력되었어요 : `' + miner + '`')
      .setTimestamp()
	    .setFooter(msg.author.tag, msg.author.displayAvatarURL({ size: 1024, format: 'png', dynamic: true }));
      msg.channel.send(MinerCheckedEmbed);
    
      let fs = require('fs');
      let options = { id : id, miner : miner};
      let data = JSON.stringify(options);

      let path = './userdata/' + msg.author.id + '.json';

      try {
        if (fs.existsSync(path)){
          fs.unlinkSync(path)
      }
      } catch(err) {
        const SaveErr2Embed = new Discord.MessageEmbed()
        .setColor('#31373D')
        .setTitle(':pirate_flag:  데이터 문제 발생')
        .setDescription('데이터 저장 중에 예기치 못한 문제가 발생했어요.\n개발자에게 문의해주세요.')
        .setTimestamp()
        .setFooter(msg.author.tag, msg.author.displayAvatarURL({ size: 1024, format: 'png', dynamic: true }));
      msg.channel.send(SaveErr2Embed);
      return;
      }

      fs.writeFile(path, data, function(err) {
       if (err) {
        const SaveErrEmbed = new Discord.MessageEmbed()
        .setColor('#31373D')
        .setTitle(':pirate_flag:  데이터 문제 발생')
        .setDescription('데이터 저장 중에 예기치 못한 문제가 발생했어요.\n개발자에게 문의해주세요.')
        .setTimestamp()
        .setFooter(msg.author.tag, msg.author.displayAvatarURL({ size: 1024, format: 'png', dynamic: true }));
      msg.channel.send(SaveErrEmbed);
         return;
       }
       const SavedEmbed = new Discord.MessageEmbed()
       .setColor('#E1E8ED')
       .setTitle(':checkered_flag: 데이터 저장 완료')
       .setDescription('아이디와 마이너 이름이 정상적으로 저장되었어요.\n이제 서비스를 이용하실 수 있어요.')
       .setTimestamp()
       .setFooter(msg.author.tag, msg.author.displayAvatarURL({ size: 1024, format: 'png', dynamic: true }));
     msg.channel.send(SavedEmbed);
       return;
      })

    })

    .catch(async(collected) => {
      const MinerTimeOutEmbed = new Discord.MessageEmbed()
      .setColor('#31373D')
      .setTitle(':heavy_multiplication_x: 마이너 이름 입력 시간 초과')
      .setDescription('시간이 초과되어 마이너 이름의 입력이 취소되었어요. 다시 시도해주세요.')
      .setTimestamp()
	    .setFooter(msg.author.tag, msg.author.displayAvatarURL({ size: 1024, format: 'png', dynamic: true }));
    msg.channel.send(MinerTimeOutEmbed);
    })

    })
    .catch(async(collected) => {
      const IdTimeOutEmbed = new Discord.MessageEmbed()
      .setColor('#DF2E45')
      .setTitle(':x: 아이디 입력 시간 초과')
      .setDescription('시간이 초과되어 아이디 입력이 취소되었어요. 다시 시도해주세요.')
      .setTimestamp()
	    .setFooter(msg.author.tag, msg.author.displayAvatarURL({ size: 1024, format: 'png', dynamic: true }));
    msg.channel.send(IdTimeOutEmbed);
    })
    
  }

  if (msg.content === prefix + 'rights') {
    msg.channel.send('채궐권 X장')
  }

});

client.login('ODA3NDk5MjUzNzMxNTU3Mzc3.YB44SA.P5gFU6AyYNVthXcOd7LyN4GzNro');

//hello world