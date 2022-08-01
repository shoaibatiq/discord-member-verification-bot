const {SlashCommandBuilder} = require("@discordjs/builders")
const { ActionRowBuilder, ButtonBuilder , EmbedBuilder} = require("discord.js")
const dotenv = require("dotenv")

dotenv.config()

module.exports = {
    data : new SlashCommandBuilder()
    .setName("verify")
    .setDescription("Membership verification"),
    async execute(interaction){
        const row = new ActionRowBuilder()
        row.addComponents(
            new ButtonBuilder()
                .setCustomId('verify_button')
                .setLabel('Verify Me')
                .setStyle('Primary'),
        );
        const embed = new EmbedBuilder()
            .setAuthor({
                name:"Authorization Bot"
            })
			.setColor('#ffb400')
			.setTitle('Verify yourself')
            .setThumbnail("https://cdn.icon-icons.com/icons2/1527/PNG/512/shield_106660.png")
			.setDescription('Please help us ensure this is a safe space. Verify yourself using the email address that you used to enroll in the course.\n1. Click the VERIFY ME button, enter your email address, and click SUBMIT.\n2. Check your email for the verification code. The code will expire in 10 minutes.\n3. In Discord, click the VERIFICATION CODE button and enter the code.');
        await interaction.reply({ components: [row] , embeds:[embed]});
    }
}