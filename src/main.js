import { Plugin, Notice, addIcon } from 'obsidian'; // eslint-disable-line
import PublishModal from './modal';
import SettingTab from './settings';
import { DEFAULT_SETTINGS, ICON_VIEW_NAME, ICON_VIEW_SVG, VIEW_TYPE_REVIEW } from './constants';
import ReviewView from './review';
import Twitter from './channels/twitter';

export default class NewsletterPlugin extends Plugin {
    async onload() {
        await this.loadSettings();

        addIcon(ICON_VIEW_NAME, ICON_VIEW_SVG);

        this.twitterClient = Twitter.createClient(this.settings.twitter);

        this.addSettingTab(new SettingTab(this.app, this));

        this.registerView(VIEW_TYPE_REVIEW, (leaf) => new ReviewView(leaf, this));

        if (!this.app.workspace.getLeavesOfType(VIEW_TYPE_REVIEW).length) {
            this.app.workspace.getRightLeaf(false).setViewState({
                type: VIEW_TYPE_REVIEW,
                active: true,
            });
        }

        this.addCommand({
            id: 'publish-content',
            name: 'Publish a new content',
            callback: async () => {
                new PublishModal(this.app, this).open();
            },
        });
    }

    async loadSettings() {
        this.settings = { ...DEFAULT_SETTINGS, ...await this.loadData() };
    }

    async saveSettings() {
        await this.saveData(this.settings);
    }

    async notice(message) {
        const notice = new Notice(message);
        setTimeout(() => notice.hide(), 5000);
    }
}
