require('dotenv').config();

const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

// Ready event (Bot has logged in)
client.once('ready', () => {
  console.log(Intents.FLAGS.GUILDS);
	console.log(`🤖 ${client.user.tag} is Ready 🤖`);
});

client.on('info', (info) => {
  console.log('debug info:', info);
})

client.on('messageCreate', (message) => {
  // console.log(message);
  console.log('message object str:', JSON.stringify(message));
  
  if (message.content.toLowerCase().includes('ding')) {
    return message.reply('Dong!');
  }

  if (message.channel.id === '878321046091087922' && (message.author.tag === 'Tyler Cole#8656')) {
    return message.reply('I only trade with Tyler if he butters me up first :butter: :wink:');
  }
})

// Login to Discord with your client's token
client.login(process.env.PRAXTON_BOT_TOKEN);
