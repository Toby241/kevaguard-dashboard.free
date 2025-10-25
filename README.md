# kevaguard-dashboard.free

🇫🇷 Français  Tableau de bord front-end pour la gestion et la traçabilité des opérations forestières. Construit avec Tailwind CSS et JavaScript.  

🇧🇷 Português  Dashboard front-end para gestão e rastreabilidade de operações florestais. Construído com Tailwind CSS e JavaScript



# KevaGuard FP - Tableau de Bord de Traçabilité Forestière

![Status](https://img.shields.io/badge/status-en--d%C3%A9veloppement-yellow.svg)
![Licence](https://img.shields.io/badge/licence-MIT-blue.svg)

(FR) **KevaGuard FP** est une interface de tableau de bord front-end conçue pour la gestion et la traçabilité des opérations forestières. Ce projet fournit une interface utilisateur riche et réactive pour visualiser les indicateurs de performance clés (KPIs), suivre les coupes, gérer les concessions et analyser les données relatives à l'exploitation forestière.

(PT) **KevaGuard FP** é uma interface de dashboard front-end projetada para a gestão e rastreabilidade de operações florestais. Este projeto fornece uma interface de usuário rica e reativa para visualizar indicadores-chave de desempenho (KPIs), acompanhar cortes, gerenciar concessões e analisar dados relativos à exploração florestal.

---

### Aperçu / Preview

![Aperçu de KevaGuard FP](./screenshot.png)
*(FR) Il est fortement recommandé de remplacer cette image par une capture d'écran réelle du tableau de bord.*
*(PT) É altamente recomendável substituir esta imagem por uma captura de tela real do dashboard.*

---

### ✨ Fonctionnalités / Funcionalidades

* **(FR)** **Tableau de bord principal** avec KPIs dynamiques pour les coupes, le volume et les activités récentes.
* **(PT)** **Dashboard principal** com KPIs dinâmicos para cortes, volume e atividades recentes.

* **(FR)** **Graphiques interactifs** pour visualiser la performance des coupes sur différentes périodes.
* **(PT)** **Gráficos interativos** para visualizar a performance dos cortes em diferentes períodos.

* **(FR)** **Gestion des Opérations :** Sections dédiées pour :
    * Concessions (visualisation sur carte)
    * Inventaire Forestier
    * Registre des Coupes
    * Suivi du Transport
    * Documents Légaux
* **(PT)** **Gerenciamento de Operações:** Seções dedicadas para:
    * Concessões (visualização em mapa)
    * Inventário Florestal
    * Registro de Cortes
    * Acompanhamento de Transporte
    * Documentos Legais

* **(FR)** **Thème Clair et Sombre (Light/Dark Mode)** avec persistance dans le `localStorage`.
* **(PT)** **Tema Claro e Escuro (Light/Dark Mode)** com persistência no `localStorage`.

* **(FR)** **Design entièrement responsif** pour une utilisation sur ordinateurs et tablettes.
* **(PT)** **Design totalmente responsivo** para uso em desktops e tablets.

* **(FR)** **Modaux interactifs** pour la saisie de données (ex: création d'un bon de roulage).
* **(PT)** **Modais interativos** para entrada de dados (ex: criação de uma guia de transporte).

---

### 🔧 Technologies Utilisées / Tecnologias Utilizadas

| Technologie | Description |
| :--- | :--- |
| **HTML5** | (FR) Structure sémantique du contenu. / (PT) Estrutura semântica do conteúdo. |
| **CSS3** | (FR) Styles personnalisés et variables pour le theming. / (PT) Estilos customizados e variáveis para o tema. |
| **Tailwind CSS** | (FR) Framework CSS "utility-first" pour un développement rapide de l'UI. / (PT) Framework CSS "utility-first" para desenvolvimento rápido da UI. |
| **JavaScript (ES6+)** | (FR) Logique de l'interface, interactivité et manipulation du DOM. / (PT) Lógica da interface, interatividade e manipulação do DOM. |
| **GSAP** | (FR) Bibliothèque d'animation pour des transitions fluides et des micro-interactions. / (PT) Biblioteca de animação para transições fluidas e micro-interações. |

---

### 🚀 Démarrage Rapide / Guia de Início Rápido

(FR) Ce projet est un template front-end pur et ne nécessite aucune installation de dépendances.

(PT) Este projeto é um template puramente front-end e não requer instalação de dependências.

1.  **(FR)** Clonez le référentiel sur votre machine locale :
    **(PT)** Clone o repositório para sua máquina local:
    ```bash
    git clone [https://github.com/votre-utilisateur/kevaguard-fp.git](https://github.com/votre-utilisateur/kevaguard-fp.git)
    ```

2.  **(FR)** Naviguez jusqu'au répertoire du projet :
    **(PT)** Navegue até o diretório do projeto:
    ```bash
    cd kevaguard-fp
    ```

3.  **(FR)** Ouvrez le fichier `index.html` directement dans votre navigateur web.
    **(PT)** Abra o arquivo `index.html` diretamente no seu navegador.

---

### 🔗 Connexion au Backend / Conectando ao Backend

(FR) Ce template est conçu pour être connecté à une API backend. La logique de récupération des données se trouve dans le fichier `dashboard.js`.

(PT) Este template foi projetado para ser conectado a uma API de backend. A lógica de busca de dados está no arquivo `dashboard.js`.

Pour connecter vos données :
1.  **Ouvrez / Abra** o arquivo `dashboard.js`.
2.  **Localisez / Localize** as funções `async` destinadas à busca de dados:
    * `fetchKpiData(period)`: Pour mettre à jour les KPIs du tableau de bord.
    * `fetchChartData(period)`: Pour alimenter le graphique de performance.
3.  **Modifiez / Modifique** ces fonctions pour effectuer des appels `fetch` à vos propres endpoints d'API. Les endroits à modifier sont marqués avec des commentaires `// TODO:`.

---

### 📂 Structure du Projet / Estrutura do Projeto
