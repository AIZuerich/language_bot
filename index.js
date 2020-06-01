const keepAlive = require('./server.js');
const weather = require('weather-js');
const Discord = require('discord.js');
const config = require('./config.json');


const german = require('./german.json');
const germandb = require('./germandb.json');
const hiragana= require('./hiragana.json');
const kanji = require('./kanji.json');
const russian = require('./russian.json');
const french = require('./french.json');
const french2 = require('./french2.json');
const englishz = require('./english.json');
const kan = require('./kanjidb.json');
const spanish = require('./spanish.json');
const russiandb = require('./russiandb.json');
const xp = require('./xp.json');
const lvl = require('./lvl.json');

const fs = require("fs");
let db = JSON.parse(fs.readFileSync("./xp.json", "utf8"));
let db2 = JSON.parse(fs.readFileSync("./lvl.json", "utf8"));
let db3 = JSON.parse(fs.readFileSync("./shelf.json", "utf8"));
let db4 = JSON.parse(fs.readFileSync("./hiraganadb.json","utf8"));
let db5 = JSON.parse(fs.readFileSync("./kanjidb.json","utf8"));
let db6 = JSON.parse(fs.readFileSync("./spanishdb.json","utf8"));
let db7 = JSON.parse(fs.readFileSync("./russiandb.json","utf8"));
let db8 = JSON.parse(fs.readFileSync("./germandb.json","utf8"));
let db9 = JSON.parse(fs.readFileSync("./roles.json","utf8"));


const client = new Discord.Client({
  disableEvertyone: true
});








client.on('ready', () => {
  console.log('Ready!');
  client.user.setActivity("discord.me/Languages"); 
});


const isValidCommand = (message, cmdName) => (message.content.toLowerCase().startsWith(config.prefix + cmdName))
//role
const checkPermissionRole = (role) => 
          role.permissions.has('ADMINISTRATOR') ||
          role.permissions.has('BAN_MEMBERS') ||
          role.permissions.has('KICK_MEMBERS') ||
          role.permissions.has('MANAGE_GUILD') ||
          role.permissions.has('MANAGE_CHANNELS')||
          role.permissions.has('MANAGE_MESSAGES')||
          role.permissions.has('MANAGE_ROLES')||
          role.permissions.has('MANAGE_WEBHOOKS')||
          role.permissions.has('MANAGE_EMOJIS')



client.on('message', async function(message){
    if(message.author.bot){
     return;}


    else{

      console.log("location->"+ message.guild.name+"/"+ message.member.user.tag + ": " + message.content + "|"+ message.createdAt);
   
    if (!db[message.author.id]) db[message.author.id] = {
        frenchxp: 1,
        germanxp: 1,
        russianxp: 1,
        hiraganaxp:1,
        kanjiganaxp:1,
        spanishxp:1
      };
    if (!db2[message.author.id]) db2[message.author.id] = {
        level:1
      };
    if (!db3[message.author.id]) db3[message.author.id] = {
        channelfrench:[1,]
      };
      if (!db4[message.author.id]) db4[message.author.id] = {
        channelhiragana:[1,],
      };
      if (!db5[message.author.id]) db5[message.author.id] = {
        channelkan:[1,],
      };
      if (!db6[message.author.id]) db6[message.author.id] = {
        channelspanish:[1,],
      };
      if (!db7[message.author.id]) db7[message.author.id] = {
        channelrussian:[1,],
      };
      if (!db8[message.author.id]) db8[message.author.id] = {
        channelgerman:[1,]
      };
      if (!db9[message.author.id]) db9[message.author.id] = {
        addroles:[1,]
      };



    let userInfo = db[message.author.id];

    let userInfo2 = db2[message.author.id];

    let userInfo3 = db3[message.author.id];

    let userInfo4 = db4[message.author.id];

    let userInfo5 = db5[message.author.id];

    
    let userInfo6 = db6[message.author.id];

    let userInfo7 = db7[message.author.id];

    let userInfo8 = db8[message.author.id];

    let userInfo9 = db9[message.author.id];


    if(userInfo.frenchxp > 200){
              userInfo2.level++
        userInfo.frenchxp = 1;
    } 
    if(userInfo.germanxp > 200){
        userInfo2.level++
        userInfo.germanxp = 1;
    }
    if(userInfo.russianxp >200){
              userInfo2.level++
        userInfo.russianxp = 1;
    }
    if(userInfo.spanishxp>200) {
        userInfo2.level++
        userInfo.spanishxp = 1;
    }
    if(userInfo.kanjiganaxp>200 || userInfo.hiraganaxp >200){
      userInfo2.level++
      userInfo.hiragana =1;
      userInfo.kanjiganaxp =1;
    }


    if(isValidCommand(message,"help")){
      const used = process.memoryUsage().heapUsed / 1024 / 1024;
      let ram = Math.round(used * 100) / 100
      let embed3 = new Discord.MessageEmbed()
        .setImage("https://i.imgur.com/u8YNr6I.png")
        .setTitle("Join languages!")
        .setDescription("**Learn vocabulary in different languages!\n**")
        .addField("**__[zzchannelfr / ru / spa / hi / kan / ger]__**", "```fix\nType zzchannelxx. Ex: zzchannelfr```")
        .addField("**__[zzfr / ru / spa / hi / kan / ger]__**", "```fix\nNow write zz<yourlanguage>. Ex: zzfr```")
        .addField("**__[zzlang]__**","```fix\nYour profile.```")
        .addField("**__[zzreset]__**","```fix\nAll your Id`s will be deleted.```")
        .addField("**[zzbanuser/zzkickuser/zzmuteuser/zzremove nr/zzsay/\nzzchannelroles and zzadd role/zzdel role]**","Some moderation commands!")
        .addField("Hardware","Ping: "+ Math.round(client.ws.ping) + ' ms | ' +"Ram: " + ram.toString() +" MB" + " | Servers: "+client.guilds.cache.size)
        .setURL("https://discord.gg/k49sq4d")
        .setColor(0x8ffcff)
      .setTimestamp()
      .setFooter("Bot made by Pangloss#4111")
      message.channel.send(embed3)
    }

      

    

      //roles
      
      if(isValidCommand(message,'channelroles')){
        //message.member.hasPermission('ADMINISTRATOR')||!
      if(!message.member.hasPermission('ADMINISTRATOR')||!message.member.hasPermission('MANAGE_GUILD')||!message.member.hasPermission('MANAGE_ROLES')||!message.member.hasPermission('MANAGE_MESSAGES')|| !message.member.hasPermission('MANAGE_EMOJIS') || !message.member.hasPermission('MANAGE_WEBHOOKS')){
        message.channel.send("You dont have the permissions, to use this command.")
      }else{
        message.channel.send("Write your channel id for the add roles command.");
        const collector = new Discord.MessageCollector(message.channel, m => m.author.id === message.author.id, { max: 1, time: 20000 });
        collector.on('collect', message => {
            userInfo9.addroles.push(message.content);
            message.channel.send("Your AddRoles Id`s are: "+ userInfo9.addroles);
            fs.writeFile("./roles.json", JSON.stringify(db9), (x) => {
            if (x) console.error(x)
            }); 
            }   
        )}}


      if(isValidCommand(message,'reset')){
        if(message.member.hasPermission('READ_MESSAGE_HISTORY')&& message.member.hasPermission('SEND_MESSAGES')){
        userInfo3.channelfrench = [];
        userInfo4.channelhiragana = [];
        userInfo5.channelkan = [];
        userInfo6.channelspanish = [];
        userInfo7.channelrussian = [];
        userInfo8.channelgerman = [];


        fs.writeFile("./roles.json", JSON.stringify(db3), (x) => {
            if (x) shelf.error(x)
            }); 
        fs.writeFile("./hiraganadb.json", JSON.stringify(db4), (x) => {
            if (x) shelf.error(x)
            }); 
        fs.writeFile("./kanjidb.json", JSON.stringify(db5), (x) => {
            if (x) shelf.error(x)
            }); 
        fs.writeFile("./spanishdb.json", JSON.stringify(db6), (x) => {
            if (x) shelf.error(x)
            }); 
        fs.writeFile("./russiandb.json", JSON.stringify(db7), (x) => {
            if (x) shelf.error(x)
            }); 
        fs.writeFile("./germandb.json", JSON.stringify(db8), (x) => {
            if (x) shelf.error(x)
            }); 
        message.channel.send("All your ID`s are deleted from the database. 🕵️")
      }


      if(isValidCommand(message,'channelkan')){
      if(!message.member.hasPermission('READ_MESSAGE_HISTORY')){
        message.channel.send("Not enough permissions")
      }else{
        message.channel.send("Write your channel id for Kanji.");
        const collector = new Discord.MessageCollector(message.channel, m => m.author.id === message.author.id, { max: 1, time: 20000 });
        collector.on('collect', message => {
            console.log(userInfo5.channelkanji);
            userInfo5.channelkan.push(message.content.toString());
            message.channel.send("Your Kanji Id`s are: "+ userInfo5.channelkan);
            fs.writeFile("./kan.json", JSON.stringify(db5), (x) => {
            if (x) console.error(x)
            }); 
            }   
        )}
        }
        }


      if(isValidCommand(message,'channelhi')){
      if(!message.member.hasPermission('READ_MESSAGE_HISTORY')){
        message.channel.send("Not enough permissions")
      }else{
        message.channel.send("Write your channel id for Hiragana.");
        const collector = new Discord.MessageCollector(message.channel, m => m.author.id === message.author.id, { max: 1, time: 20000 });
        collector.on('collect', message => {
            var hiraganas = message.content.toString()
            console.log(hiraganas)
            userInfo4.channelhiragana.push(hiraganas)
            message.channel.send("Your Hiragana Id`s are:"+ userInfo4.channelhiragana);
            fs.writeFile("./hiraganadb.json", JSON.stringify(db4), (x) => {
            if (x) console.error(x)
            }); 
            }   
        )}}

      if(isValidCommand(message,'channelspa')){
      if(!message.member.hasPermission('READ_MESSAGE_HISTORY')){
        message.channel.send("Not enough permissions")
      }else{
        message.channel.send("Write your channel id for Spanish.");
        const collector = new Discord.MessageCollector(message.channel, m => m.author.id === message.author.id, { max: 1, time: 20000 });
        collector.on('collect', message => {
            console.log(userInfo6.channelkanji);
            userInfo6.channelspanish.push(message.content.toString());
            message.channel.send("Your Spanish Id`s are: "+ userInfo6.channelspanish);
            fs.writeFile("./spanishdb.json", JSON.stringify(db6), (x) => {
            if (x) console.error(x)
            }); 
            }   
        )}}

   
    if(isValidCommand(message,'channelfr')){
      if(!message.member.hasPermission('READ_MESSAGE_HISTORY')){
        message.channel.send("Not enough permissions")
      }else{
        message.channel.send("Write your channel id for French.");
        const collector = new Discord.MessageCollector(message.channel, m => m.author.id === message.author.id, { max: 1, time: 20000 });
        collector.on('collect', message => {
            userInfo3.channelfrench.push(message.content.toString())
            message.channel.send("Your French Id`s are: "+ userInfo3.channelfrench);
            fs.writeFile("./shelf.json", JSON.stringify(db3), (x) => {
            if (x) console.error(x)
            }); 
            }   
        )}}
       
    if(isValidCommand(message,'channelger')){
      if(!message.member.hasPermission('READ_MESSAGE_HISTORY')){
        message.channel.send("Not enough permissions")
      }else{
        message.channel.send("Write your channel id for German.");
        const collector = new Discord.MessageCollector(message.channel, m => m.author.id === message.author.id, { max: 1, time: 20000 });
        collector.on('collect', message => {
            userInfo8.channelgerman.push(message.content.toString())
            message.channel.send("Your German Id`s are: "+ userInfo3.channelgerman);
            fs.writeFile("./germandb.json", JSON.stringify(db8), (x) => {
            if (x) console.error(x)
            }); 
            }   
        )}}
    
    if(isValidCommand(message,'channelru')){
      if(!message.member.hasPermission('READ_MESSAGE_HISTORY')){
        message.channel.send("Not enough permissions")
      }else{
        message.channel.send("Write your channel id for Russian.");
        const collector = new Discord.MessageCollector(message.channel, m => m.author.id === message.author.id, { max: 1, time: 40000 });
        collector.on('collect', message => {
            userInfo7.channelrussian.push(message.content.toString())
            message.channel.send("Your Russian Id`s are: "+ userInfo7.channelrussian);
            fs.writeFile("./russiandb.json", JSON.stringify(db7), (x) => {
            if (x) console.error(x)
            }); 
            }   
        )}}
      
      
    if(isValidCommand(message,'fr')){
      if(userInfo3.channelfrench.includes(message.channel.id)){
        let len = Object.keys(french).length
        let random = Math.floor(Math.random() * len)
        let frenchz = Object.keys(french)
        let englishz = Object.values(french)
        message.channel.send("Translate: **" + englishz[random]+"** into French.");
        const collector = new Discord.MessageCollector(message.channel, m => m.author.id === message.author.id, { max: 1, time: 40000 });
        collector.on('collect', message => {
            if (frenchz[random]==message.content) {
                userInfo.frenchxp++
                message.channel.send("Correct! You are gathering "+userInfo.frenchxp+" Xp-points in French.["+frenchz[random]+"]")
            } else {
              userInfo.frenchxp--
              message.channel.send("The correct word was: "+ frenchz[random] +".")
            }

            fs.writeFile("./xp.json", JSON.stringify(db), (x) => {
            if (x) console.error(x)
            });
            fs.writeFile("./lvl.json", JSON.stringify(db2), (x) => {
            if (x) console.error(x)
            });
            
        })}}

      if(isValidCommand(message,'kan')){
        console.log(message.channel.id.toString())
        console.log(userInfo5.channelkan)
      if(userInfo5.channelkan.includes(message.channel.id)){
        let random = Math.floor(Math.random() * 500)
        let ka = Object.keys(kanji)
        let kas = Object.values(kanji)
        message.channel.send("Translate this Kanji **" + ka[random]+"**");
        const collector = new Discord.MessageCollector(message.channel, m => m.author.id === message.author.id, { max: 1, time: 50000 });
        collector.on('collect', message => {
            if (kas[random].includes(message.content.toString())) {
                console.log(userInfo.kanjiganaxp)
                userInfo.kanjiganaxp++
                message.channel.send("Correct! You are gathering "+userInfo.kanjiganaxp.toString()+(" Xp-points in Kanji Solution:["+kas[random]+"]"))
            } else {
              userInfo.kanjiganaxp--
              message.channel.send("The correct meaning was: " +kas[random] +".")
            }

            fs.writeFile("./xp.json", JSON.stringify(db), (x) => {
            if (x) console.error(x)
            });
            
            fs.writeFile("./lvl.json", JSON.stringify(db2), (x) => {
            if (x) console.error(x)
            });
            
        })}}

      if(isValidCommand(message,'hi')){
        console.log(message.channel.id.toString())
        console.log(userInfo3.channelkanji)
      if(userInfo4.channelhiragana.includes(message.channel.id.toString())){
        let random = Math.floor(Math.random() * 42)
        let hi = Object.keys(hiragana)
        let his = Object.values(hiragana)
        message.channel.send("Pronounce this hiragana: **" + hi[random]+"**");
        const collector = new Discord.MessageCollector(message.channel, m => m.author.id === message.author.id, { max: 1, time: 40000 });
        collector.on('collect', message => {
            if (message.content.includes(his[random])) {
                console.log(userInfo.hiraganaxp)
                userInfo.hiraganaxp++
                message.channel.send("Correct! You are gathering "+userInfo.hiraganaxp+(" Xp-points in Hiragana."))
            } else {
              userInfo.hiraganaxp--
              message.channel.send("The correct sound was: " +his[random] +".")
            }

            fs.writeFile("./xp.json", JSON.stringify(db), (x) => {
            if (x) console.error(x)
            });
            fs.writeFile("./lvl.json", JSON.stringify(db2), (x) => {
            if (x) console.error(x)
            });
        })}}


      if(isValidCommand(message,'ger')){
        console.log(message.channel.id.toString())
        console.log(userInfo8.channelgerman)
      if(userInfo8.channelgerman.includes(message.channel.id.toString())){
        let len = Object.keys(german).length
        let random = Math.floor(Math.random() * len)
        let germans = Object.keys(german)
        let englishs = Object.values(german)
        message.channel.send("Translate: **" + englishs[random]+"** into German.");
        const collector = new Discord.MessageCollector(message.channel, m => m.author.id === message.author.id, { max: 1, time: 40000 });
        collector.on('collect', message => {
            if (germans[random].includes(message.content) && message.content.toString().length>2 ) {
                userInfo.germanxp++
                message.channel.send("Correct! You are gathering "+userInfo.germanxp+(" Xp-points in German.["+germans[random]+"]"))
            } else {
              userInfo.germanxp--
              message.channel.send("The correct word was: "+ germans[random] +".")
            }

            fs.writeFile("./xp.json", JSON.stringify(db), (x) => {
            if (x) console.error(x)
            });
            fs.writeFile("./lvl.json", JSON.stringify(db2), (x) => {
            if (x) console.error(x)
            });

            
        })}}

        
      if(isValidCommand(message,'spa')){
        console.log(message.channel.id.toString())
        console.log(userInfo6.channelspanish)
      if(userInfo6.channelspanish.includes(message.channel.id.toString())){
        let len = Object.keys(spanish).length
        let random = Math.floor(Math.random() * len)
        let spanishs = Object.keys(spanish)
        let spaneng = Object.values(spanish)
        message.channel.send("Translate: **" + spanishs[random]+"** into English.");
        const collector = new Discord.MessageCollector(message.channel, m => m.author.id === message.author.id, { max: 1, time: 40000 });
        collector.on('collect', message => {
            if (spaneng[random].includes(message.content) && message.content.toString().length>1) {
                userInfo.spanishxp++
                message.channel.send("Correct! You are gathering "+userInfo.spanishxp+(" Xp-points in Spanish.["+spanishs[random]+"]"))
            } else {
              userInfo.spanishxp--
              message.channel.send("The correct word was: "+ spaneng[random] +".")
            }

            fs.writeFile("./xp.json", JSON.stringify(db), (x) => {
            if (x) console.error(x)
            });
            fs.writeFile("./lvl.json", JSON.stringify(db2), (x) => {
            if (x) console.error(x)
            });


            
        })}}

      if(isValidCommand(message,'ru')){
        console.log(message.channel.id.toString())
        console.log(userInfo7.channelrussian)
      if(userInfo7.channelrussian.includes(message.channel.id)){
        let len = Object.keys(russian).length
        let random = Math.floor(Math.random() * len)
        let russians = Object.keys(russian)
        let englishr = Object.values(russian)
        message.channel.send("Translate: **" + russians[random]+"** into English.");
        const collector = new Discord.MessageCollector(message.channel, m => m.author.id === message.author.id, { max: 1, time: 40000 });
        collector.on('collect', message => {
            if (englishr[random].includes(message.content)&&message.content.toString().length>2) {
                userInfo.russianxp++
                message.channel.send("Correct! You are gathering "+ userInfo.russianxp.toString() +(" Xp-points in Russian.["+englishr[random]+"]"))
            } else {
              userInfo.russianxp--
              message.channel.send("The correct word was: "+ englishr[random] +".")
            }

            fs.writeFile("./xp.json", JSON.stringify(db), (x) => {
            if (x) console.error(x)
            });
            fs.writeFile("./lvl.json", JSON.stringify(db2), (x) => {
            if (x) console.error(x)
            });

            
        })}}
    if(isValidCommand(message, "add")){
      let args = message.content.toLowerCase().substring(6);
      let roleNames = args.split(", ");
      let roleSet = new Set(roleNames);
      let {cache} = message.guild.roles;
      
      roleSet.forEach(roleName => {
        let role = cache.find(role => role.name.toLowerCase() === roleName);
        if(role && userInfo9.addroles.includes(message.channel.id)){
          if(message.member.roles.cache.has(role.id)){
          message.channel.send("You have this already");
            return;
            }
          if(checkPermissionRole(role))
            {
            message.channel.send('You cannot add yourself to this role.')
            }
          else{
            message.member.roles.add(role)
              .then(member => message.channel.send("Role added"))
              .catch(err => {
                console.log(err);
                channel.send("Something went wrong");
                });
            }
        }else {
          message.channel.send("role not found or wrong channel.");
          console.log(message.createdAt);
          }
        
      });
    }
    if(isValidCommand(message, "del")){
      var args = message.content.toLowerCase().substring(6);
      let roleNames = args.split(", ");
      let roleSet = new Set(roleNames);
      let {cache} = message.guild.roles;
      
      roleSet.forEach(roleName => {
        let role = cache.find(role => role.name.toLowerCase() === roleName);
        if(role){
          if(message.member.roles.cache.has(role.id)){
          message.member.roles.remove(role)
            .then(member => message.channel.send("Removed!"))
            .catch(err => {
              console.log(err);
              message.channel.send("something went wrong...");
            });
            
          }
        }
        else {
          message.channel.send("Role not found.");
          console.log(message.createdAt);
          }
        
      });
    }
    //SAY
    if(isValidCommand(message, "say")){
        if(!message.member.hasPermission('BAN_MEMBERS')){
        message.channel.send("...")
      }
      else{
      let announcement = message.content.substring(message.content.indexOf(" ") + 1 );
      let ticketSupportChannel = client.channels.cache.find(channel => channel.name.toLowerCase() === message.channel.name);
      if(ticketSupportChannel)
        message.delete({ timeout: 1000, reason: 'It had to be done.' });
        ticketSupportChannel.send(announcement); }

    }
    //BAN
    if(isValidCommand(message, "banuser")){
      if(!message.member.hasPermission('BAN_MEMBERS')){
        message.channel.send("...")
      }
      else{
        let memberId = message.content.substring(message.content.indexOf(" ") + 1 );
        try { 
          let bannedMember = await message.guild.members.ban(memberId)
          if(bannedMember){
            console.log(bannedMember.tag + " was banned.");
          }else {
          console.log("Ban did not happen.");
          }
        }catch(err){
            console.log(err);
          }
      }
    }
        //Kick
    if(isValidCommand(message, "kickuser")){
      if(!message.member.hasPermission('KICK_MEMBERS')){
        message.channel.send("...")
      }
      else{
        let memberId = message.content.substring(message.content.indexOf(" ") + 1 );
        let member = message.guild.members.cache.get(memberId);
        if(member){
        try { 
          await member.kick();
          console.log(member.user.tag + " was kicked.");
      
        }catch(err){
            console.log(err);
          }
      }
    }
    }
    //REMOVE
    if(isValidCommand(message, "remove")){
      if(!message.member.hasPermission('ADMINISTRATOR')){
      return
      }
      else{
        let a = message.content.substring(message.content.indexOf(" ") + 1 );
        try {
          //let fetched = await channel.fetchMessages({limit: 20}).then(bulkDelete(fetched))
          message.channel.bulkDelete(a)
        }catch(err){
            console.log(err);
          }
      }}
    //mute
    if (isValidCommand(message, "muteuser")){
      if(!message.member.hasPermission(['KICK_MEMBERS', 'BAN_MEMBERS'])){
        return
      }
      else{
        let memberId = message.content.substring(message.content.indexOf(" ") + 1 )
        let member = message.guild.members.cache.get(memberId);
        if(member){
          if(member.hasPermission(['KICK_MEMBERS','BAN_MEMBERS']) && !message.member.hasPermission('ADMINISTRATOR')){
            message.channel.send("Nope");
          }
          else {
            try{
            var role = member.guild.roles.cache.find(r => r.name === 'muted');
            if(role){
                member.roles.add(role)
                message.channel.send(member.user.tag + " muted");
            }else{
              message.channel.send("Nope");
            }}catch{
              console.log(Error)
            }
            
          }
        }
        else {
          message.channel.send("nope");
        }
      }

    }

     if(isValidCommand(message, "lang")) {
      try{
        let member = message.mentions.members.first();
        let userInfo = db[message.author.id];
        let userInfo2 = db2[message.author.id];
        console.log(userInfo2.level)
        const used = process.memoryUsage().heapUsed / 1024 / 1024;
        let embed = new Discord.MessageEmbed()
        .setDescription(" ```css\n Languages ``` ")
        .setColor(0x36393e)
        .addField("**[Name]**", message.author.tag)
        .addField("**[Level]**", userInfo2.level.toString())
        .addFields(
              { name: "**[French]**", value: userInfo.frenchxp +"/200 XP", inline: true },
              { name: '**[German]**', value: userInfo.germanxp+"/200 XP", inline: true },
              { name: '**[Russian]**', value: userInfo.russianxp+"/200 XP", inline: true },
              { name: '**[Spanish]**', value: userInfo.spanishxp+"/200 XP", inline: true },
              { name: "**[Hiragana]**", value: userInfo.hiraganaxp+"/200 XP", inline: true },
              { name: "**[Kanji]**", value: userInfo.kanjiganaxp+"/200 XP", inline: true }
            )
        .addField("Ram", `Bot is using ${Math.round(used * 100) / 100} MB`)
        .setThumbnail(message.author.displayAvatarURL({dynamic: true}))
        .setTimestamp()
        if(!member) return message.channel.send(embed)

        const userz = message.mentions.users.first();
        let memberInfo = db[member.id]
        let memberInfo2 = db2[member.id]
        let embed2 = new Discord.MessageEmbed()
        .setDescription(" ```css\n Languages ``` ")
        .addField("**[Name]**", userz.username)
        .setColor(0x36393e)
        .addFields(
              { name: "**[French]**", value: memberInfo.frenchxp+"/200 XP", inline: true },
              { name: '**[German]**', value: memberInfo.germanxp+"/200 XP", inline: true },
              { name: '**[Russian]**', value: memberInfo.russianxp+"/200 XP", inline: true },
              { name: '**[Spanish]**', value: memberInfo.spanishxp+"/200 XP", inline: true },
              { name: "**[Hiragana]**", value: memberInfo.hiraganaxp+"/200 XP", inline: true },
              { name: "**[Kanji]**", value: memberInfo.kanjiganaxp+"/200 XP", inline: true }
            )
        .addField("Last", userz.lastMessage)
        .setThumbnail(userz.displayAvatarURL({dynamic: true}))
        .setTimestamp()
        message.channel.send(embed2)

        }
          catch{
            console.log(Error)
          }

        
    
}}});




keepAlive();

client.login(config.token);
