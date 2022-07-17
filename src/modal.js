import { Setting, Modal } from 'obsidian'; // eslint-disable-line
import Twitter from './channels/twitter';
import { CHANNELS } from './constants';

export default class PublishModal extends Modal {
    constructor(app, plugin) {
        super(app);
        this.plugin = plugin;
        [this.channel] = Object.values(CHANNELS);
    }

    onOpen() {
        const { contentEl } = this;

        contentEl.createEl('h2', { text: 'Publish your content' });

        new Setting(contentEl)
            .setName('Channel')
            .setDesc('Select the channel to publish the content')
            .addDropdown((component) => {
                component
                    .addOptions(CHANNELS)
                    .onChange(async (value) => {
                        this.channel = value;
                    });
            });

        new Setting(contentEl)
            .addButton((btn) => btn
                .setButtonText('Publish')
                .setCta()
                .onClick(async () => {
                    if (this.channel === CHANNELS.twitter) {
                        const file = await this.app.workspace.getActiveFile();

                        if (!file) {
                            this.plugin.notice('No content found.');
                            return;
                        }

                        this.plugin.notice('Publishing on Twitter...');
                        const text = await this.app.vault.cachedRead(file);
                        await Twitter.tweet(text, this.plugin.twitterClient);
                        this.plugin.notice('Published on Twitter!');
                    }
                    this.close();
                }));
    }

    onClose() {
        const { contentEl } = this;
        contentEl.empty();
    }
}
