import { PluginSettingTab, Setting } from 'obsidian'; // eslint-disable-line

export default class SettingTab extends PluginSettingTab {
    constructor(app, plugin) {
        super(app, plugin);
        this.plugin = plugin;
    }

    display() {
        const { containerEl } = this;
        containerEl.empty();
        containerEl.createEl('h2', { text: 'Twitter settings' });

        new Setting(containerEl)
            .setName('Twitter api key')
            .setDesc('Enter your Twitter api key')
            .addText((text) => text
                .setPlaceholder('xxxxxxxxxxxxxxxxxxxxxxxxx')
                .setValue(this.plugin.settings.twitter.appKey)
                .onChange(async (value) => {
                    this.plugin.settings.twitter.appKey = value;
                    await this.plugin.saveSettings();
                }));

        new Setting(containerEl)
            .setName('Twitter api secret key')
            .setDesc('Enter your Twitter api secret key')
            .addText((text) => text
                .setPlaceholder('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx')
                .setValue(this.plugin.settings.twitter.appSecret)
                .onChange(async (value) => {
                    this.plugin.settings.twitter.appSecret = value;
                    await this.plugin.saveSettings();
                }));

        new Setting(containerEl)
            .setName('Twitter access token')
            .setDesc('Enter your Twitter api access token')
            .addText((text) => text
                .setPlaceholder('xxxxxxxxxxxxxxxxxx-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx')
                .setValue(this.plugin.settings.twitter.accessToken)
                .onChange(async (value) => {
                    this.plugin.settings.twitter.accessToken = value;
                    await this.plugin.saveSettings();
                }));

        new Setting(containerEl)
            .setName('Twitter access token secret')
            .setDesc('Enter your Twitter api access token secret')
            .addText((text) => text
                .setPlaceholder('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx')
                .setValue(this.plugin.settings.twitter.accessSecret)
                .onChange(async (value) => {
                    this.plugin.settings.twitter.accessSecret = value;
                    await this.plugin.saveSettings();
                }));
    }
}
