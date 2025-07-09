### Como foi a experiência no decorrer de todo o processo de desenvolvimento?

A experiência no desenvolvimento deste teste técnico foi extremamente positiva e completa, abrangendo desde a consolidação de tecnologias dominadas até a exploração de novas fronteiras com IA.

#### Base Técnica e Execução Ágil

O projeto me permitiu aplicar minha experiência prática em um ecossistema de frontend moderno, utilizando tecnologias com as quais tenho grande familiaridade, como React, Next.js, TypeScript e Tailwind CSS. A utilização de bibliotecas como **Shadcn/UI** e **Framer Motion** agilizou a criação de uma interface polida e responsiva, permitindo que eu focasse na lógica de negócio e na experiência do usuário.

#### O Valor Prático dos Testes Automatizados

Uma parte fundamental do meu processo foi a implementação de uma estratégia de testes robusta desde o início, com **Vitest** para testes unitários e **Playwright** para testes E2E. O valor dessa abordagem se provou imenso durante o desenvolvimento: ao refatorar componentes ou a lógica da `store`, a suíte de testes funcionava como uma rede de segurança contra regressões, alertando imediatamente quando uma quebra de funcionalidade era introduzida. Isso permitiu correções rápidas e eficientes, reforçando a importância de um ciclo de desenvolvimento orientado a testes para garantir a qualidade e a segurança do software.

#### Desafios de Produto e Exploração Tecnológica

O desafio mais estratégico foi, sem dúvida, a concepção da UI/UX. O objetivo não era apenas técnico, mas criar uma ponte entre a ferramenta e o usuário final — uma interface que transmitisse confiança, profissionalismo e simplicidade para um público B2B.

O ponto alto da exploração técnica foi a integração com Inteligência Artificial via **Hugging Face**. Sendo uma ferramenta nova para mim, o processo envolveu desde a pesquisa e escolha de um modelo de linguagem adequado (`LLM`) até a implementação de uma API Route segura no Next.js para gerenciar as chamadas. A facilidade de uso e o poder dos modelos disponíveis me impressionaram, e a Hugging Face posicionou-se como uma ferramenta estratégica no meu arsenal técnico para futuras implementações de IA.

### Quais foram as principais decisões tomadas?

A construção deste projeto envolveu diversas decisões estratégicas de arquitetura e tecnologia para garantir um resultado robusto, escalável e alinhado às melhores práticas do mercado. As principais foram:

- **Gerenciamento de Estado com Zustand:**
    
    - **Decisão:** Optei por utilizar Zustand em vez de outras soluções como Context API ou Redux.
        
    - **Raciocínio:** Para um projeto desta complexidade, o Context API poderia levar a re-renderizações desnecessárias. O Zustand oferece um controle de estado centralizado e reativo com um boilerplate mínimo, uma API de hooks intuitiva e performance otimizada, sendo a escolha ideal para gerenciar o fluxo da conversa de forma eficiente e limpa.
        
- **Arquitetura de Componentes com shadcn/ui e Tailwind CSS:**
    
    - **Decisão:** Utilizar shadcn/ui como base para os componentes de UI, em conjunto com Tailwind CSS.
        
    - **Raciocínio:** Diferente de bibliotecas de componentes tradicionais, shadcn/ui permite total posse e customização do código dos componentes. Isso, combinado com a agilidade do Tailwind CSS, criou um fluxo de desenvolvimento de UI extremamente rápido e flexível, permitindo a criação de um design system consistente e de fácil manutenção.
        
- **Estratégia de Testes com Vitest e React Testing Library:**
    
    - **Decisão:** Adotar Vitest como executor de testes no lugar de alternativas como o Jest.
        
    - **Raciocínio:** Vitest oferece uma experiência de desenvolvimento superior em projetos modernos com Vite/Next.js, com configuração simplificada e performance excepcional. Combinado com a filosofia da React Testing Library de testar o comportamento do ponto de vista do usuário, pude criar testes unitários que garantem a funcionalidade da aplicação sem se acoplar aos detalhes de implementação.
        
- **Chatbot Híbrido (Scripted + AI):**
    
    - **Decisão:** Implementar uma lógica que inicia a conversa com um fluxo pré-definido (scripted) e transiciona para um modo de IA dinâmico assim que o usuário desvia do roteiro.
        
    - **Raciocínio:** Esta abordagem híbrida oferece o melhor dos dois mundos: garante uma jornada de onboarding guiada e consistente para o caso de uso principal, ao mesmo tempo que oferece a flexibilidade e a inteligência de uma IA para lidar com perguntas inesperadas, demonstrando uma solução de produto mais completa e robusta.
        
- **Integração Segura com a API (Next.js API Route):**
    
    - **Decisão:** Criar uma API Route interna no Next.js (`/api/chat`) para servir como um intermediário entre o frontend e a API da Hugging Face.
        
    - **Raciocínio:** Esta é uma prática de segurança fundamental. Ela impede que a chave de API secreta (`API Token`) seja exposta no navegador do cliente. Toda a comunicação com o serviço externo é feita de forma segura no lado do servidor, que é o ambiente correto para gerenciar tokens.

### Como foi organizado o projeto em termos de estrutura de pastas e arquivos?

A estrutura do projeto foi pensada para ser intuitiva, escalável e manter uma clara separação de responsabilidades, utilizando um diretório `src/` para isolar o código da aplicação das configurações na raiz.

A organização principal é a seguinte:

```
dolado-chatbot/
├── src/
│   ├── app/              # Roteamento e páginas (convenção do Next.js App Router)
│   │   ├── api/          # API Routes, como o intermediário para o Hugging Face
│   │   │   └── chat/
│   │   │       └── route.ts
│   │   ├── layout.tsx    # Layout raiz da aplicação
│   │   └── page.tsx      # Página principal
│   │
│   ├── components/       # Todos os componentes React
│   │   ├── features/     # Componentes de UI genéricos e reutilizáveis (ex: Button, Card)
│   │   └── ui/           # Componentes específicos de funcionalidades (ex: Chat)
│   │
│   ├── data/             # Mocks e dados estáticos (ex: conversation-steps.ts)
│   │
│   ├── lib/              # Funções utilitárias (ex: `cn`, helpers de formatação)
│   │
│   ├── store/            # Lógica de estado global com Zustand (chat-store.ts)
│   │
│   ├── tests/            # Configuração dos testes (ex: setup.ts)
        ├── e2e/          # Implementação dos testes end-to-end
│   │
│   └── types/            # Definições de tipos e interfaces do TypeScript
│
├── .env.local            # Variáveis de ambiente
├── package.json
├── tailwind.config.ts
└── vitest.config.ts
```

#### Justificativa da Estrutura:

- **`/app`**: Segue a convenção do Next.js App Router para roteamento de páginas e APIs.
    
- **`/components`**: Centraliza todos os componentes React, com uma subdivisão estratégica:
    
    - **`/ui`**: Contém os blocos de construção básicos e de apresentação, como botões e inputs (geralmente vindos do `shadcn/ui`).
        
    - **`/features`**: Contém componentes mais complexos que orquestram a lógica de uma funcionalidade específica, como o `ChatWindow`, que utiliza os componentes de `/ui`.
        
- **`/store`**: Isola completamente a lógica de estado global, facilitando a manutenção e os testes.
    
- **`/lib`, `/data`, `/types`**: Pastas com nomes convencionais que separam claramente utilitários, dados estáticos e tipos, melhorando a organização geral do projeto.
    
- **Co-localização de Testes**: Os arquivos de teste (ex: `Button.test.tsx`) são mantidos na mesma pasta que os componentes que eles testam. Isso facilita a localização e a manutenção dos testes junto com o código-fonte. 
**Observação**: os testes end-to-end estão localizados na pasta e2e, dentro de tests, pois não estão associados a unidades específicas do sistema, mas sim ao fluxo completo da aplicação.

 ## Como Rodar o Projeto

Siga os passos abaixo para configurar e executar o projeto.

#### ✅ Pré-requisitos

- **Node.js**: `v18.x` ou superior.
    
- **npm** ou um gerenciador de pacotes similar (yarn, pnpm).
    

#### ⚙️ Configuração

1. **Clone o repositório:**
    ```
    git clone https://github.com/Dynylson/job-frontend-developer.git
    ```
    
2. **Entre na pasta do projeto:**
    ```
    cd job-frontend-developer/dolado-chatbot
    ```
    
3. **Instale as dependências:**
    ```
    npm install
    ```
    
1. **Instale os Navegadores para o Playwright (Passo Essencial para Testes E2E):**
    
    > ⚠️ **Importante:** Este comando faz o download dos navegadores (Chromium, Firefox, WebKit) que o Playwright utiliza para executar os testes End-to-End.

    ```
    npx playwright install
    ```
    
2. **Configure as Variáveis de Ambiente:**
    
    Copie o arquivo de exemplo `.env.example` para criar seu arquivo de ambiente local.
    
    ```
    cp .env.example .env.local
    ```
    
    Em seguida, edite o `.env.local` e insira sua chave da Hugging Face. A `PLAYWRIGHT_BASE_URL` por padrão aponta para "http://localhost:3000", mas você pode alterá-la se necessário.
    
    ```
    # .env.local
    
    # Chave para a funcionalidade de IA
    HUGGING_FACE_API_KEY="seu_token_aqui"
    
    # URL base para os testes E2E do Playwright
    PLAYWRIGHT_BASE_URL="http://localhost:3000"
    ```
    

#### ▶️ Executando a Aplicação e os Testes

Com o ambiente configurado, você pode utilizar os seguintes scripts:

- **Iniciar a Aplicação:**
    
    ```
    npm run dev
    ```
    
    Abra seu navegador e acesse **[http://localhost:3000](https://www.google.com/search?q=http://localhost:3000&authuser=3)**.
    
- **Rodar Testes Unitários e de Integração (Vitest):**
    
    ```
    npm run test
    ```
    
    Para uma visualização interativa dos testes unitários:
    
    ```
    npm run test:ui
    ```
    
    
- **Rodar Testes End-to-End (Playwright):**
    
    > **Nota:** Certifique-se de que a aplicação esteja rodando em um terminal (`npm run dev`) antes de executar os testes E2E em outro.
    
    ```
    npm run test:e2e
    ```
    
    Para abrir a interface gráfica do Playwright e depurar os testes E2E visualmente:
    
    ```
    npm run test:e2e:ui
    ```
    

### Resumo dos Scripts Disponíveis

- `npm run dev`: Inicia a aplicação em modo de desenvolvimento.

- `npm run build`: Compila a aplicação para um ambiente de produção.

- `npm run start`: Inicia um servidor de produção.

- `npm run lint`: Executa o linter para verificar a qualidade do código.

- `npm run format`: Formata os arquivos com o Prettier.

- `npm run test`: Roda os testes unitários (Vitest).

- `npm run test:ui`: Abre a UI do Vitest.

- `npm run test:e2e`: Roda os testes End-to-End (Playwright).

- `npm run test:e2e:ui`: Abre a UI do Playwright.