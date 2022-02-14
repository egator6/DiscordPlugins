/**
 * @name TypingClick
 * @author egator6
 * @authorId 934127371848646717
 * @description Plays a sound when you type something/press a button on your keyboard
 * @version 2.2.0
 * @updateUrl https://raw.githubusercontent.com/SpoonMcForky/BetterDiscordPlugins/main/Plugins/KeyboardClick.plugin.js
 * @source https://raw.githubusercontent.com/SpoonMcForky/BetterDiscordPlugins/main/Plugins/KeyboardClick.plugin.js
 * @website https://github.com/SpoonMcForky/BetterDiscordPlugins/blob/main/Plugins/KeyboardClick.plugin.js
 */
// Thanks @ChipChaddleson#0001 and @Toaster#0110 on discord for helping with code
                    const click1 = new Audio('https://dl.dropboxusercontent.com/s/vfxrfu2u8jiq6xw/click1.wav?raw=1');
                    const click2 = new Audio('https://dl.dropboxusercontent.com/s/wtw25tzfctkpers/click2.wav?raw=1');
                    const click3 = new Audio('https://dl.dropboxusercontent.com/s/kqjn62hwk035d2w/click3.wav?raw=1');
                    const backspace = new Audio('https://dl.dropboxusercontent.com/s/lluvdpgt8n8ohm0/backspace.wav?raw=1');
                 //   const enter = new Audio('https://dl.dropboxusercontent.com/s/lluvdpgt8n8ohm0/backspace.wav?raw=1');
module.exports = (() => {
    const config = {
        info: {
            name: 'KeyboardClick',
            authors: [{
                name: 'egator6',
                discord_id: '934127371848646717',
                github_username: 'egator6'
            }],
            version: '1.0.0',
            description: 'Plays a sound when you type something/press a button on your keyboard)',
            github: 'https://github.com/SpoonMcForky/BetterDiscordPlugins',
            github_raw: 'https://raw.githubusercontent.com/SpoonMcForky/BetterDiscordPlugins/main/Plugins/KeyboardClick.plugin.js'
        },
            {
            type: "textbox",
            id: "exceptions",
            name: "Exceptions (Requires Reload)",
            note: "Add keys here to stop them from making a click sound. Separate keys by a comma, no space {Key1,Key2}. Letter keys are formatted like this: \"KeyA\". Easily see key codes here: https://keycode.info",
            value: ",,ControlLeft,ControlRight,ShiftLeft,ShiftRight,AltLeft,AltRight,ArrowUp,ArrowRight,ArrowLeft,ArrowDown,CapsLock,MetaLeft,MetaRight,MediaPlayPause,",
        }]
    };

 return !global.ZeresPluginLibrary ? class {

        constructor() { this._config = config; }
        getName() { return config.info.name; }
        getAuthor() { return config.info.authors.map(a => a.name).join(', '); }
        getDescription() { return config.info.description; }
        getVersion() { return config.info.version; }
        load() {
            BdApi.showConfirmationModal('Library Missing', `The library plugin needed for ${config.info.name} is missing. Please click Download Now to install it.`, {
                confirmText: 'Download Now',
                cancelText: 'Cancel',
                onConfirm: () => {
                    require('request').get('https://rauenzi.github.io/BDPluginLibrary/release/0PluginLibrary.plugin.js', async (error, response, body) => {
                        if (error) return require('electron').shell.openExternal('https://betterdiscord.net/ghdl?url=https://raw.githubusercontent.com/rauenzi/BDPluginLibrary/master/release/0PluginLibrary.plugin.js');
                        await new Promise(r => require('fs').writeFile(require('path').join(BdApi.Plugins.folder, '0PluginLibrary.plugin.js'), body, r));
                    });
                }
            });
        }
        start() {
            ZeresPluginLibrary.PluginUpdater.checkForUpdate(this.getName(), this.getVersion(), 'https://raw.githubusercontent.com/SpoonMcForky/BetterDiscordPlugins/main/Plugins/KeyboardClick.plugin.js');
        if (window.PluginUpdates && window.PluginUpdates.plugins) delete PluginUpdates.plugins['https://github.com/SpoonMcForky/BetterDiscordPlugins/blob/main/Plugins/KeyboardClick.plugin.js'];
         }
        stop() { }

    } : (([Plugin, Api]) => {
        const plugin = (Plugin, Api) => {
            const {
                DiscordModules
            } = Api;
    
            const {
                DiscordConstants
            } = DiscordModules;
    

            return class clicker extends Plugin {
                
                onStart() {
                    var keyArray = this.createExceptions()
                    
                    document.addEventListener('keydown', clicking);
                    this.clicking = clicking;
                    
                        async function clicking(e) {
                        var num = Math.floor(Math.random() * 3) + 1 // Generate a random number, used later to determine which click sound will be played
                        function playSound(click) {
                            backspace.pause()
                            backspace.currentTime = 0
                            click1.pause()
                            click1.currentTime = 0
                            click2.pause()
                            click2.currentTime = 0
                            click3.pause()
                            click3.currentTime = 0
                            click.play(click)
                        }
                        async function click() {

                            if (keyArray.includes(e.code)) // Checks the array 'keyArray', and if the condition is met, do nothing
                                return
                            else if (e.code == 'Backspace') {
                                playSound(backspace)
                            }
                            else if (num == 1) {
                                playSound(click1)
                            }
                            else if (num == 2) {
                                playSound(click2)
                            }
                            else if (num == 3) {
                                playSound(click3)
                            }
                        }
                        click()
                    }
                }
                stop() {
                    document.removeEventListener('keydown', this.clicking);
                }
                changeVolume() {
                    click1.volume = (this.settings.volume / 100);
                    click2.volume = (this.settings.volume / 100);
                    click3.volume = (this.settings.volume / 100);
                    backspace.volume = (this.settings.volume / 100);
                }
                createExceptions() {
                    return this.settings.exceptions.split(",")
                }
                getSettingsPanel() {
                    const panel = this.buildSettingsPanel();
                    panel.addListener((id) => {
                        if (id == "volume") {
                            this.changeVolume()
                        } else if (id == "exceptions") {
                            this.createExceptions()
                        }

                    });
                    return panel.getElement();
                }
            
            }
        }
    
    return plugin(Plugin, Api);
})(global.ZeresPluginLibrary.buildPlugin(config));
})();
