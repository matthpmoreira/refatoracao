# arquivo: [`server.ts`](src/server.ts)

- SEMÂNTICA: O número da porta pode ser decidido e armazenado numa variável antes da chamada da função. (`7:12`)

# arquivo: [`app.ts`](src/app.ts)

- SEMÂNTICA: O código de resposta HTTP pode ser representado por uma constante da biblioteca `http-status`. (`11:14`)

# arquivo: [`controllers/news-controller.ts`](src/controllers/news-controller.ts)

- DRY: A lógica para validar ID pode ser movida para uma função. (`15:7`, `32:7`, `44:7`)

# arquivo: [`middlewares/error-handler.ts`](src/middlewares/error-handler.ts)

- LÓGICA: As respostas para cada código HTTP podem ser armazenadas num objeto e obtidas por indexação. (`18:3`)

# arquivo: [`middlewares/schema-handler.ts`](src/middlewares/schema-handler.ts)

- SEMÂNTICA: O código de resposta HTTP pode ser representado por uma constante da biblioteca `http-status`. (`11:14`)

# arquivo: [`repositories/news-repository.ts`](src/repositories/news-repository.ts)

- NOMEAÇÃO: As funções do repositório devem ter nomes em inglês conforme a convenção do resto do código. (`7:17`, `15:17`, `21:23`, `27:23`, `34:23`)

# arquivo: [`services/news-service.ts`](src/services/news-service.ts)

- SEMÂNTICA: Os objetos de erro podem ser armazenados em constantes. (`12:11`, `46:13`, `55:11`, `65:11`)
- SEMÂNTICA: A comparação explícita com `null` seria mais legível que a coerção de um objeto a um booleano. (`11:7`)
- SEMÂNTICA: A lógica pode ser realizada numa variável antes da chamada da função. (`28:28`)
- TAMANHO: A função pode ser divida em funções menores. (`38:1`)
