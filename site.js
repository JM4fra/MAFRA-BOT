// Como integrar o bot ao site/webapp
// 1. O arquivo site.js já está criado como base Express.
// 2. Para comunicação em tempo real, use Socket.io ou API REST.
// 3. Exemplo de integração:
//    - O bot pode enviar eventos para o site via Socket.io (mensagens, status, comandos).
//    - O site pode enviar comandos para o bot via API REST (Express).
// 4. Para iniciar o site, rode: node site.js
// 5. Para conectar o bot ao site, importe o socket ou API no index.js e envie/receba dados conforme necessário.
// 6. Recomenda-se criar rotas protegidas e autenticação para segurança.
// 7. O deploy pode ser feito junto no Render.com, adicionando ambos os arquivos ao mesmo projeto.
// 8. Expanda conforme sua necessidade: painel de controle, dashboard, logs, etc.

// site.js - Conexão Web (placeholder)
// Aqui será implementada a integração do bot com o site/webapp
// Exemplo: Express, Socket.io, API REST, etc.

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('MAFRA-BOT Web API rodando!');
});

app.listen(PORT, () => {
    console.log(`🌐 Site/API rodando em http://localhost:${PORT}`);
});
