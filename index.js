// index.js - Conexão WhatsApp + Site Express
require('dotenv').config();
require('./site'); // 🔗 Sobe também o servidor web (Render detecta a porta)

const {
    default: makeWASocket,
    useMultiFileAuthState,
    DisconnectReason,
    fetchLatestBaileysVersion
} = require('@whiskeysockets/baileys');

const qrcode = require('qrcode-terminal');
const fs = require('fs');
const path = require('path');

async function startBot() {
    const { state, saveCreds } = await useMultiFileAuthState(path.join(__dirname, 'auth_info'));
    const { version } = await fetchLatestBaileysVersion();

    const sock = makeWASocket({
        version,
        printQRInTerminal: false,
        auth: state,
    });

    sock.ev.on('connection.update', (update) => {
        const { qr, connection, lastDisconnect } = update;

        if (qr) {
            console.log('\n📲 Escaneie o QR code abaixo para conectar o bot ao WhatsApp:');
            qrcode.generate(qr, { small: true });
        }

        if (connection === 'close') {
            const reason = lastDisconnect?.error?.output?.statusCode;
            if (reason === DisconnectReason.loggedOut) {
                fs.rmSync(path.join(__dirname, 'auth_info'), { recursive: true, force: true });
                process.exit(0);
            } else {
                startBot();
            }
        } else if (connection === 'open') {
            console.log('✅ Bot conectado ao WhatsApp!');
        }
    });

    sock.ev.on('creds.update', saveCreds);
}

startBot();
