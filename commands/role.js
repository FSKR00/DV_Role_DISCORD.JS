const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageActionRow, MessageButton, MessageEmbed } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("인증")
    .setDescription("SVN Entertainment의 인증을 진행합니다."),
  async execute(interaction) {
    if (interaction.channel.id != "944765399415795734") return;

    const row = new MessageActionRow().addComponents(
      new MessageButton()
        .setCustomId("allow")
        .setLabel("이용약관 동의")
        .setStyle("SUCCESS"),

      new MessageButton()
        .setCustomId("nonallow")
        .setLabel("이용약관 비동의")
        .setStyle("DANGER"),

      new MessageButton()
        .setURL(
          "https://discord.com/channels/687302920173125657/687607630696284163/748919186826461196"
        )
        .setLabel("이용약관")
        .setStyle("LINK")
    );

    const embed = new MessageEmbed()
      .setColor("#2dbbbc")
      .setTitle("SVN Entertainment 인증")
      .setDescription(
        "이용약관을 확인하시려면 하단에 이용약관 버튼을 클릭해주세요.\n\n**이용약관에 동의하신다면, 아래 이용약관 동의 버튼을 클릭해주세요.**"
      );

    const embed1 = new MessageEmbed()
      .setColor("#2dbbbc")
      .setTitle("SVN Entertainment 인증")
      .setDescription("**인증에 실패하였습니다.**\n\n인증을 재시도 해주세요.");
    const embed2 = new MessageEmbed()
      .setColor("#2dbbbc")
      .setTitle("SVN Entertainment 인증")
      .setDescription("**인증에 성공하였습니다.**");

    await interaction.reply({
      embeds: [embed],
      components: [row],
      ephemeral: true,
    });

    const filter = (interaction) => {
      return interaction.customId === "allow" || "nonallow";
    };

    const collector = interaction.channel.createMessageComponentCollector({
      filter: filter,
    });

    collector.on("collect", async (interaction) => {
      try {
        if (interaction.customId === "allow") {
          role = "758630615317741598";
          member = interaction.member;
          interaction.guild.roles
            .fetch(role)
            .then((role) => member.roles.add(role));

          await interaction.update({
            embeds: [embed2],
            components: [],
            ephemeral: true,
          });
        } else if (interaction.customId === "nonallow") {
          await interaction.update({
            embeds: [embed1],
            components: [],
            ephemeral: true,
          });
        }
      } catch (error) {
        console.log(error);
      }
    });
  },
};
