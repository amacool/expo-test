### General Installation Guide:

This repository contains the code that is based on the React Native + Expo.

https://github.com/AdamOnLinux/pet_id_app.git


### Setup Application in Local Environment

## Setup development environment in local machine

1. Node JS : Install NodeJS from https://nodejs.org/
2. Expo CLI : ```npm install -g expo-cli``` Install Expo cli tool
3. Git : ```git clone https://github.com/AdamOnLinux/pet_id_app.git``` Strongly suggested to clone into `C:\` or similar so you end up with `C:\pet_id_app` or a similar very SHORT path (long paths will often cause ```npm install``` to fail on windows since some dependencies will end up in subfolders that are longer than 256 characters)
4. Check out latest project from Git repository
5. VS Code : Install VSCode From https://code.visualstudio.com/
6. Create an Expo account  and login that in default browser: https://expo.io/
7. Device / Simulator we need to install the Expo client. Real device we need to install “Expo” manually from App Store. Simulator we need to install manually, please refer this section “Setup Expo client in iOS simulator”

After check please open that project in VS Code, drag bade project folder into VS Code. Open open terminal from VS Code or from system base terminal.
For open the VS code terminal from tool bar Terminal => New Terminal.

### Please confirm we are in base folder, run ```npm install```. It may take some time to complete the dependency library downloading.

```npm install``` or ```yarn install```(in the project directory)

Once download completed we can run our project, below command for running the project.

## To start the project in Expo client

```Expo Run  / Expo r```

## To start project with clear cache

```Expo r -c```

Will start a Metro Builder server  and open that in default browser.

## Expo service running
![Expo service running](https://content.screencast.com/users/Anatoly_Sokolov/folders/Jing/media/6a51f4f6-0e28-40bb-b6dd-9a584b690f43/2019-03-13_1711.png)
</br>
## Also you can see the Expo Metro Bundler on your browser ```http://localhost:19002/```
![Expo service running on browser](https://content.screencast.com/users/Anatoly_Sokolov/folders/Jing/media/519fbff3-3a61-4d7b-8210-80a7b0185176/2019-03-13_1713.png)
In browser, in order to run the app on your simulator or device, you can click ```Run on Android Device/emulator``` or ```Run on iOS Simulator```

### Expo server settings details

```Expo Server.png``` file in project base folder

### Simulator application running settings

```Simulator Settings.png``` file in the project base folder

### Setup Expo client in iOS simulator

If automatic expo client install failed in simulator case, please follow below steps

1. Download latest expo client latest simulator build
2. Extract the download folder
3. Run this command ```mkdir Exponent-X.XX.X.app && tar xvf Exponent-X.XX.X.tar.gz -C Exponent-X.XX.X.app```
4. You will get a directory like ```Exponent-X.XX.X.app```
5. Start simulator to install the expo client
6. Run this command At a terminal, run ```xcrun simctl install booted [path to Exponent-X.XX.X.app]```
7. To get all simulator UDID, please run this ```xcrun simctl list```
8. Sample path run ```xcrun simctl install 98EF9586-C6E5-4D9D-8211-16244780B8CB Exponent-2.13.0.app```


### Publish application to Expo Client

Please signup and login in Expo browser.
https://expo.io

We need to login in Expo with same user in CLI.

login ```expo login```

logout ```expo logout```

Reference Links: https://docs.expo.io/versions/v35.0.0/workflow/expo-cli/


Please navigate to project base folder

run ```sudo expo publish```

This may take some time to build the application and deploy in the expo client.

Process behind the expo client deploy
 
```log
sudo expo publish
Password: *

┌──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│                                                                                                                                          │
│   There is a new version of expo-cli available (3.3.0).                                                                                  │
│   You are currently using expo-cli 3.1.2                                                                                                 │
│   Install expo-cli globally using the package manager of your choice; for example: `npm install -g expo-cli` to get the latest version   │
│                                                                                                                                          │
└──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┘

Unable to find an existing Expo CLI instance for this directory, starting a new one...
Starting Metro Bundler on port 19001.
Tunnel ready.
Publishing to channel 'default'...
Building iOS bundle
Finished building JavaScript bundle in 57145ms.
Building Android bundle
Finished building JavaScript bundle in 75543ms.
Analyzing assets
Finished building JavaScript bundle in 3397ms.
Finished building JavaScript bundle in 2761ms.
Uploading assets
No assets changed, skipped.
Uploading JavaScript bundles
Published
Your URL is

### https://exp.host/@bugsniper/petsidapp

› Closing Expo server
› Stopping Metro bundler
```

### Please select the URl and navigate  https://exp.host/@bugsniper/petsidapp

When we open that url in browser, will display our application name with ```QR Code ```. Please scan the QR code in real device we are able to run in Expo Client.


