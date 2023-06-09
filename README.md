# Maratonic

Web app for competitive programming academic entity (Maratonic) - MC 426 Project

## Brief description

We are all Computer Science students at UNICAMP who are involved with an entity in our university called Maratonic. Our goal with this project is to create a web app to help us to encorage and to teach other students about competitive programming.

Our application main features include:

- Being able to search for exercises inside and outside the site.
- Read lessons and discuss about them and other topics in blogs with other students and teachers.
- Two factor authentication with UNICAMP login.
- Dashboard with each students' data to help them see how much they improved.

## Contributors

- Daniel Yuji Hosomi - RA: 248255
- Gabriel Ribeiro Paiva - RA: 223475
- Lucas Francisco Silva Paiva - RA: 248390
- Matheus Henrique de Sousa Silva - RA: 239995
- Vinícius Alves Damasceno - RA: 235121

## Arquitetura

### Diagrama

- [Aqui](architecture_diagram/diagram.pdf) está o diagrama da arquitetura.

### Estilo de Arquitetura Adotado

O estilo de arquitetura adotado neste projeto é o server-client, em que o servidor _(backend)_ é responsável por processar as requisições do cliente _(frontend)_ e fornecer os dados necessários. O cliente _(frontend)_ é implementado em uma tecnologia como React, que consome a API do servidor e exibe as informações ao usuário.

O servidor segue o padrão **REST** (Representational State Transfer) para a definição das rotas e comunicação com o cliente. O REST é um estilo arquitetural que utiliza os métodos HTTP (GET, POST, PUT, DELETE) para interações entre cliente e servidor. Cada rota do servidor representa um recurso específico e pode ser acessada pelo cliente para realizar operações CRUD (Create, Read, Update, Delete) nos dados.

### Principais Componentes e Responsabilidades

No projeto, os principais componentes e suas responsabilidades são os seguintes:

- Controllers: Os controllers são responsáveis por receber as requisições do cliente e direcionar a lógica adequada para manipular os dados correspondentes. Eles atuam como intermediários entre as rotas do servidor e os serviços de negócio. Os controllers podem realizar validações, autenticações e chamadas aos serviços necessários para atender às solicitações do cliente.

- Repositories: Os repositories são responsáveis por interagir diretamente com a camada de banco de dados. Eles encapsulam as operações de consulta, inserção, atualização e exclusão de dados. No contexto do projeto, cada repositório possui sua instância única, seguindo o conceito de singleton. Os repositories garantem a abstração do acesso ao banco de dados e fornecem métodos para a manipulação dos dados relacionados a um determinado modelo.

- Routes: As routes são responsáveis por definir as rotas do servidor e mapear as requisições HTTP recebidas para os controllers correspondentes. Elas especificam os endpoints do servidor e os métodos HTTP associados a cada rota. As routes direcionam as requisições para os controllers adequados, permitindo a execução das ações necessárias.

- Pages (Páginas): No contexto do Next.js, as páginas representam os componentes React responsáveis por exibir o conteúdo no lado do cliente. Elas são responsáveis pela renderização das interfaces de usuário e pela interação com os dados recebidos do servidor. Cada rota do cliente corresponde a uma página específica, que pode consumir os dados fornecidos pela API do servidor e exibi-los aos usuários.

- Components (Componentes): Os componentes são elementos reutilizáveis que podem ser compostos nas páginas para construir a interface do usuário de forma modular. Eles podem conter lógica específica e serem compartilhados entre diferentes partes do projeto. Os componentes ajudam na organização e manutenção do código, permitindo a criação de interfaces coesas e encapsuladas.

Cada componente do projeto desempenha um papel fundamental na aplicação:

- Os controllers recebem as requisições do cliente, invocam os serviços apropriados e retornam as respostas adequadas.
- Os repositories lidam com as operações de banco de dados e garantem o acesso único e controlado aos dados.
- As routes definem os endpoints do servidor e mapeiam as requisições para os controllers correspondentes.
- As pages representam as diferentes telas ou rotas do cliente, responsáveis por renderizar o conteúdo e interagir com os dados.
- Os components são elementos modulares e reutilizáveis que compõem as páginas e ajudam na construção da interface do usuário.

Entre as principais componentes das pages e components, temos:

#### Pages

Cada componente da page é uma rota (e página) da aplicação, sendo as principais:

- /: Rota da página principal da aplicação, onde o usuário pode ver uma descrição do MaratonIC e logar na aplicação. Depois que o usuário fizer o login, ele pode navegar para as outras páginas através da NavBar.
- /login: Rota da página em que o usuário pode fazer login com seu email, google ou github.
- /profile: Rota para a página de perfil de usuário, onde ele pode ver e alterar seus dados na plataforma.
- /problems: Rota para a página de problemas, onde um usuário pode ver os problemas cadastrados na plataforma.
- /classes: Rota para a página de aulas, onde o usuário pode ver o conteúdo de cada aula.
- /standings: Rota para a página de ranking de alunos, onde os alunos são ranqueados a partir de quantos problemas resolveram.

#### Components

Os components são componentes pequenas usadas pelas pages. Sendo as principais:

- NavBar: Barra de navegação do site, com os links para cada página.
- MainPage: Container principal da página inicial do site (na rota /).
- Problem: Card de problema usado na página de problemas.
- Class: Card de aulas usado na página de aulas.

### Factory Method como padrão de projeto para os CRUDs

Para evitar repetição de código, criamos uma classe abstrata *Controller*, que controla como um request da API será realizado nosso backend, criando uma interface de CRUD.

Como temos várias tabelas no banco de dados e as rotas CRUD são bem parecidas para cada uma delas, fizemos uma extensão classe *Controller* para cada tabela, em que cada uma constrói seu próprio CRUD abstrato. Assim aproveitamos o código que lida com a requisição.

Com o padrão de projeto adotado, evitaremos ter que modificar código em vários locais, caso precisemos modificar as tabelas do banco e/ou seus schemas. Além disso, fica mais fácil de adicionar novas tabelas, tornando a aplicação apta a mudanças de forma simples.
