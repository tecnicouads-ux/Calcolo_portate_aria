# Android / Google Play

La versione Android usa Capacitor e incorpora la web app esistente senza modificare la logica dei calcoli.

## Requisiti locali
- Node.js 22
- Android Studio
- Android SDK 36
- JDK 17

## Prima configurazione

```bash
npm install
npm run android:init
npx cap open android
```

Il comando `android:init` genera la cartella Android nativa a partire dalla web app.

## Aggiornare Android dopo modifiche alla web app

```bash
npm run cap:sync
```

## APK di test

```bash
npm run android:debug
```

## Bundle per Google Play

Apri il progetto con:

```bash
npx cap open android
```

Poi in Android Studio usa:

**Build > Generate Signed App Bundle / APK > Android App Bundle**

Configurazione iniziale:
- App name: **Calcolo Portate Aria**
- Package ID: `it.airdistributionsystems.calcoloportatearia`
- Target/Compile SDK: **36**
- Version name: **1.0**
- Version code: **1**

Il package ID va considerato definitivo dopo la prima pubblicazione sul Play Store.
