const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('./ayarlar.json');
const chalk = require('chalk');
const fs = require('fs');
const moment = require('moment');
require('./util/eventLoader')(client);

var prefix = ayarlar.prefix;

const log = message => {
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] ${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komutlar/', (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komut: ${props.help.name}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};


client.on('message', msg => {
  if (msg.content.toLowerCase() === 'sa') {
    msg.reply(' Aleyküm selam,  hoş geldin ^_^');
  }
});

client.elevation = message => {
  if(!message.guild) {
	return; }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === ayarlar.sahip) permlvl = 4;
  return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// });

client.on('warn', e => {
  console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});

client.on('error', e => {
  console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});

client.login(ayarlar.token);

//--------------------------------KODLAMALAR-------------------------------\\
//----------------------------------HOSGELDIN-----------------------------//
client.on('guildMemberAdd', member => {
  let guild = member.guild;
  const channel = member.guild.channels.find('name', 'kayıt');
  if (!channel) return;
  const embed = new Discord.RichEmbed()
  .setColor('#e7a3ff')
        .setAuthor(`Kayıt Sistemi`)
        .addField(`Kayıt Olmak İçin`,`Ses Teyit Odasına Gir!`)
  channel.sendEmbed(embed); 
});

//----------------------------------HOSGELDIN-----------------------------//
client.on("guildMemberAdd", member => {
var rol = member.guild.roles.get("680872754295472232")
var rol2 = member.guild.roles.get("680872754295472232")
member.addRole(rol)
member.addRole(rol2)
   })
//----------------------------------HOSGELDIN-----------------------------//
client.on("guildMemberAdd", async member => {
  const kanal = member.guild.channels.find("name", "kayıt");
  kanal.sendMessage(
      `Selam ${member} HOŞGELDİN.`
  );
});
//----------------------------------HOSGELDIN-----------------------------//

client.on("userUpdate", async(old, nev) => {
  if(old.username !== nev.username) {
  if(!nev.username.includes("ϟ") && client.guilds.get("679756597303836672").members.get(nev.id).roles.has("680490381703774272")) {
     client.guilds.get("679756597303836672").members.get(nev.id).removeRole("Tag Alınca Verilecek Rol ID")
     client.channels.get('690898029917634611').send(`** ${nev}, "Tagınız" tagını çıkardığı için (Team of Brigthness rolü alındı!**`)
    } 
     if(nev.username.includes("ϟ") && !client.guilds.get("679756597303836672").members.get(nev.id).roles.has("680490381703774272")) {
      client.channels.get('690898029917634611').send(`** ${nev}, "Tagınız" tagını aldığı için (Team Of Brigthness) Rolü verildi!**`) 
      client.guilds.get("679756597303836672").members.get(nev.id).addRole("680490381703774272")}
  }
  })
