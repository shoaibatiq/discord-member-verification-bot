require("dotenv").config()
const {REST} = require("@discordjs/rest")
const {Client, GatewayIntentBits, Routes, Collection, ButtonBuilder, ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle} = require("discord.js")
const fs = require('fs');
const {sendOTP} = require("./otp")
const {addRecord, getDiscordUid, userExists} = require("./dbHandler")

const client = new Client(
    {
        intents: [
            GatewayIntentBits.Guilds,
            GatewayIntentBits.GuildMessages,
        ]
    }
);

const isEmailValid = (email) => {
    let regex = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');
    return regex.test(email)
}

client.commands = new Collection
const commands = []
const OTPS = {}
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  commands.push(command.data.toJSON())
  client.commands.set(command.data.name,command)
}

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    const CLIENT_ID = client.user.id
    const rest = new REST({
        version:10
    }).setToken(process.env.BOT_TOKEN);
    
    (async() => {
        try{
            if(process.env.ENV === "production"){
                await rest.put(
                    Routes.applicationCommands(CLIENT_ID),
                    { body: commands },
                  );
            }else{
                await rest.put(
                    Routes.applicationGuildCommands(CLIENT_ID, process.env.GUILD_ID),
                    { body: commands },
                  );
            }
            console.log("Successfully registered your commands")
        }catch(err){
            console.error(err)   
        }
    })()
  })
  
client.on("interactionCreate",async interaction => {
    try{
        if(interaction.isChatInputCommand()){
            const command = client.commands.get(interaction.commandName)
            if(!command) return
            try{
                await command.execute(interaction)
            }catch(err){
                console.log(err)
            }
        }else if(interaction.isButton()){
            if(interaction.customId === "verify_button"){
                const emailModal = new ModalBuilder()
                .setCustomId('email_verification_modal')
                .setTitle('Verification step-1');
                
                const userEmail = new TextInputBuilder()
                    .setCustomId('user_email')
                    .setLabel("Enter the email used to purchase the course")
                    .setPlaceholder("someone@example.com")
                    .setStyle(TextInputStyle.Short)
                    .setRequired(true);
    
                const firstActionRow = new ActionRowBuilder().addComponents([userEmail]);
                emailModal.addComponents([firstActionRow]);
                await interaction.showModal(emailModal);
            }else if(interaction.customId === "verification_code"){
                const otpModal = new ModalBuilder()
                .setCustomId('otp_verification_modal')
                .setTitle('Verification step-2');
                
                const userOTP = new TextInputBuilder()
                    .setCustomId('user_otp')
                    .setLabel("Please enter the verification code")
                    .setPlaceholder("000000")
                    .setStyle(TextInputStyle.Short)
                    .setRequired(true);
    
                const secondActionRow = new ActionRowBuilder().addComponents([userOTP]);
                otpModal.addComponents([secondActionRow]);
                await interaction.showModal(otpModal);
            }
        }else if(interaction.type==5){
            if(interaction.customId === "email_verification_modal"){
                let email = interaction.fields.getTextInputValue("user_email")
                await interaction.deferReply({ephemeral: true});
                if(!isEmailValid(email)) {
                    interaction.editReply({content:"Invalid email format!", ephemeral:true})
                    return
                }
                let _userExists = await userExists(email)
                if(!_userExists){
                    interaction.editReply({content:"Kindly enter the email that you used to purchase course.", ephemeral: true})
                    return
                }
                if(await getDiscordUid(email)){
                    interaction.editReply({content:"This email is already registered!", ephemeral:true})
                    return
                }
                let uid = interaction.user.id
                const otp = await sendOTP(email)
                OTPS[uid] = {'email':email,'otp':otp}
                setTimeout(() => {
                    OTPS[uid].otp = null;
                }, parseInt(process.env.OTP_EXPIRE))
                const row = new ActionRowBuilder()
                row.addComponents(
                    new ButtonBuilder()
                        .setCustomId('verification_code')
                        .setLabel('Click here to enter verification code')
                        .setStyle('Success'),
                );
                interaction.editReply({content:"Verification code sent to your email. This code expires in 10 minutes.", components: [row], ephemeral: true})
                setTimeout(()=>{
                    interaction.editReply({content:"Your verification code has been expired.",components:[]})
                },parseInt(process.env.OTP_EXPIRE))
            }else if(interaction.customId === "otp_verification_modal"){
                await interaction.deferReply({ephemeral: true});
                let uid = interaction.user.id
                let correctOTP = OTPS[uid].otp
                let otp = interaction.fields.getTextInputValue("user_otp")
                if(correctOTP === undefined){
                    interaction.editReply({content:"First verify yourself by clicking on Verify Me.", ephemeral: true})
                    return
                }
                else if(correctOTP === null){
                    interaction.editReply({content:"Your verification code is now expired!", ephemeral: true})
                    return
                }else if(parseInt(otp) === parseInt(correctOTP)){
                    const myGuild = client.guilds.cache.get(process.env.GUILD_ID);
                    const verifiedRole = myGuild.roles.cache.find(role => role.id === process.env.ROLE_ID);
                    let user = await myGuild.members.fetch(uid)
                    await user.roles.add(verifiedRole)
                    let userName = `${interaction.user.username}#${interaction.user.discriminator}`
                    addRecord(OTPS[uid].email,userName,uid)
                    OTPS[uid].otp = undefined
                    interaction.editReply({content:"Thank you! You are now a ✨divine being✨", ephemeral: true})
                    return
                }else{
                    interaction.editReply({content:"Invalid verification code", ephemeral: true})
                }
            }
        }
    }
    catch(e){
        console.log(e)
    }
})

client.login(process.env.BOT_TOKEN)