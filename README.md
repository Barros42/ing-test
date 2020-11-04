# InGaia Test

## Premissa
Um estudo organizado por um grupo de pesquisadores desocupados demonstrou que as pessoas tendem a preferir diferentes gêneros musicais de acordo com a temperatura ambiente. Baseado nesta incrível descoberta, contratamos você para desenvolver um serviço revolucionário que irá sugerir músicas ao usuário de acordo com a temperatura atual da cidade dele! Não é sensacional?

## Requisitos Funcionais
- Seu serviço deve ser acessível através de uma API REST ✅
- Seu serviço deve ter rota que aceita nome de cidade como parâmetro e retornar uma playlist de acordo com a temperatura atual ✅
- Seu serviço deve seguir as regras das temperaturas ✅
- Seu serviço deve possuir um endpoint que indique as estatísticas de cidades consultadas desde a criação do serviço. ✅

## Requisitos não funcionais
- Seu serviço deve executar em um container **Docker** ✅
- Seu serviço deve ser construído com atenção aos seguintes aspectos:
	-   Latência ✅
	-   Resiliência ✅
	-   Tolerância à falhas ✅
	-   Segurança ✅
	-   Escalabilidade ✅
- Seu serviço deverá ser stateless, porém poderá fazer uso de ferramentas de **cache** para garantir a performance nas respostas. ✅
- Você deve apresentar uma **documentação** que represente a arquitetura de seu serviço e, se necessário, uma explicação para suas decisões de arquitetura. ✅

## API

- URL BASE ➡ https://ing-test-api.azurewebsites.net
- Documentação da API (Swagger) ➡ https://ing-test-api.azurewebsites.net/swagger
- URL Playlist ➡ /city/{cityName}/playlist
- URL Stats ➡ /city/stats

## Escolhas de Projeto
- Framework Utilizado ➡  **NESTJS**
- Hospedagem ➡ **Azure Platform**
- Hospedagem de Imagem ➡ **DockerHub**
- API de Clima ➡ **OpenWheater**
- API de Musicas ➡ **Spotify**
- Serviço de Cache ➡ **Redis**

## Técnicas Utilizadas
- **Injeção de dependência**
	- Projeto desenvolvido utilizando injeção de dependência evitando o alto nível de acoplamento do código, visando um sistema mais manutenível, testável e escalável, pois é possível manipular determinadas partes do sistema sem afetar outras, além disso habilita a utilização de mocks para realizar testes unitários

- **Clean Architeture**
	- Projeto desenvolvido seguindo e respeitando os padrões da arquitetura limpa, seguindo as camadas e facilitando ainda mais a testagem do código, além disso, é extremamente simples e fácil altear as funcionalidades da ultima camada, como: API de Clima, API de música ou serviço de Cache, pois desde que estes novos serviços respeitem o contrato das interfaces, o sistema continua funcionando sem maiores alterações

- **Variáveis de Ambiente**
	- Dados sensiveis como Chaves de API, Senhas de serviço e Strings de conexão são armazenadas em variáveis de ambiente, visando a segurança do projeto, visto que mesmo que o código fonte do projeto for exposto devido a alguma falha de segurança os dados sensíveis não serão expostos.
	
- **Integração Continua**
	- Projeto desenvolvido utilizando integração continua seguindo o seguinte fluxo:
		- Projeto é atualizado no repositório (GitHub) (Branch Master)
		- DockerHub é acionado e inicializa o processo instação dos pacotes, builds e geração da Imagem
		- Azure é acionado pelo DockerHub após a geração da Imagem
		- Azure baixa a imagem e disponibiliza em produção a versão latest da imagem
## Diagramas

### Integração Continua

![Integração Continua](https://i.ibb.co/dm9cp9r/a.png)

### Fluxo de Dados
![Fluxo de Dados](https://i.ibb.co/VBSCKfM/a.png)