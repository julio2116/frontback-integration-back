# Projeto de Integração Backend

Este é um serviço backend RESTful API construído com Node.js e Express.js que fornece operações CRUD para gerenciamento de produtos em um banco de dados baseado em JSON.

## Projetos Relacionados

### Frontend
O frontend deste projeto está disponível em: [frontback-integration-front](https://github.com/julio2116/frontback-integration-front)

Este frontend fornece:
- Interface de usuário para interação com a API
- Gerenciamento completo de produtos (CRUD)
- Tratamento de erros e estados de carregamento
- Integração com todos os endpoints disponíveis

## Tecnologias Utilizadas

- Node.js
- Express.js
- CORS
- dotenv

## Principais Recursos

### Sistema de Fila
O projeto implementa um sistema robusto de fila para operações em arquivos que:
- Previne condições de corrida em operações simultâneas de arquivo
- Garante execução sequencial de operações de leitura/escrita
- Mantém a integridade dos dados durante múltiplas requisições simultâneas
- Trata erros de operações em arquivos de forma adequada

## Pré-requisitos

- Node.js (v12 ou superior)
- npm (Gerenciador de Pacotes do Node)

## Instalação

1. Clone o repositório:
```bash
git clone [repository-url]
```

2. Instale as dependências:
```bash
npm install
```

3. Inicie o servidor:
```bash
npm run server
```

O servidor será iniciado em `http://localhost:8000`

## Endpoints da API

### URL Base
```
http://localhost:8000/api/v1/products
```

### Endpoints Disponíveis

#### GET /
- Descrição: Obtém todos os produtos
- Resposta: Lista de todos os produtos
- Status: 200 OK

#### GET /:id
- Descrição: Obtém um produto específico por ID
- Parâmetros: `id` (parâmetro de caminho)
- Resposta: Objeto único do produto
- Status: 200 OK | 404 Not Found

#### POST /
- Descrição: Cria um novo produto
- Campos obrigatórios no corpo da requisição:
  - nome
  - tamanho
  - preco
  - cor
  - categoria
  - imagem
- Status: 200 OK | 400 Bad Request

#### PATCH /:id
- Descrição: Atualiza um produto existente
- Parâmetros: `id` (parâmetro de caminho)
- Campos permitidos no corpo da requisição:
  - nome
  - tamanho
  - preco
  - cor
  - categoria
  - imagem
- Status: 200 OK | 400 Bad Request

#### DELETE /:id
- Descrição: Remove um produto
- Parâmetros: `id` (parâmetro de caminho)
- Status: 201 Created

## Testes de Carga

O projeto inclui dois scripts de teste de carga:

1. Teste de Carga Básico:
```bash
npm run load-test
```

2. Teste de Carga Pesada:
```bash
npm run load-huge-test
```

## Estrutura do Projeto

```
├── classes/
│   └── Queue.js         # Implementação da fila para operações em arquivos
├── config/
│   └── corsConfig.js    # Configuração do CORS
├── controllers/
│   └── controllers.js   # Manipuladores de rotas
├── middlewares/
│   └── middlewares.js   # Validação e processamento de requisições
├── routes/
│   └── routes.js        # Definição das rotas da API
├── server/
│   └── server.js        # Arquivo principal do servidor
├── utils/
│   └── ReadNWrite.js    # Utilitário de operações em arquivos com integração da fila
├── loadTest.sh          # Script de teste de carga básico
├── hugeLoadTest.sh      # Script de teste de carga pesada
└── package.json
```

## Implementação Técnica

### Fila de Operações em Arquivos
A aplicação utiliza um sistema personalizado de fila (`Queue.js`) para gerenciar operações em arquivos:
```javascript
class ReadWriteQueue {
    constructor() {
        this.queue = Promise.resolve();
    }
    enQueue(cb) {
        this.queue = this.queue
            .then(() => cb())
            .catch(err => console.error(err))
        return this.queue
    }
}
```
Esta implementação garante:
- Execução sequencial de operações em arquivos
- Prevenção de condições de corrida
- Tratamento de erros para operações em arquivos
- Acesso seguro aos dados em ambiente multi-thread

## Tratamento de Erros

A API retorna códigos de status HTTP e mensagens de erro apropriados:
- 200: Sucesso
- 201: Criado
- 400: Requisição Inválida (entrada inválida)
- 404: Não Encontrado

## Validação de Dados

A API inclui middleware para:
- Validação de campos obrigatórios
- Validação de chaves válidas
- Geração automática de ID
- Verificação de método HTTP

## Licença

ISC 