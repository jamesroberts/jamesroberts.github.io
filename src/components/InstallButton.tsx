import React from 'react'
import { Button } from '@material-ui/core';

let installPrompt: IBeforeInstallPromptEvent | null;

export default function InstallButton() {
    if (!installPrompt)
        return <Button variant="contained" color="primary" onClick={promptInstall}> Install </Button>
    else
        return (null)
}

export function promptInstall(event: any) {
    console.log(event);
    if (installPrompt) {
        installPrompt.prompt();
        installPrompt.userChoice.then((choice: any,) => {
            if (choice.outcome === 'accepted') {
                console.log('User accepted the install prompt on ' + choice.platform);
                window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
                installPrompt = null;
            } else {
                console.log('User dismissed the install prompt on ' + choice.platform);
                window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
                installPrompt = null;
            }
        });
    }
};

function handleBeforeInstallPrompt(event: any) {
    event.preventDefault();
    installPrompt = event;
}

window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

window.addEventListener('appinstalled', (event) => {
    installPrompt = null;
    console.log('INSTALL: Success');
});

interface IBeforeInstallPromptEvent extends Event {
    readonly platforms: string[];
    readonly userChoice: Promise<{
        outcome: "accepted" | "dismissed";
        platform: string;
    }>;
    prompt(): Promise<void>;
}
