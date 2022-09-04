# Jogo "Qual é o numero?"

Para o desenvolvimento desse jogo foi solicitado o que o resultado fosse impresso em um display de 7 segmentos, mas o que é display de sete segmento? lá vai uma breve definição.

![This is an image](https://myoctocat.com/assets/images/base-octocat.svg)
Um display de sete segmentos, como seu nome indica, é composto de sete elementos (a, b, b, c, d, e, f, g) os quais podem ser ligados ou desligados individualmente. Eles podem ser combinados para produzir representações simplificadas mostrar números de 0 a 9 e opcionalmente as letras A,b,C,d,E e F. (outros símbolos são possíveis desde que se utilize um circuito decodificador adequado. A maioria dos displays também possui em 8 elemento correspondente ao ponto decimal (dp).

## Tecnologias utilizadas

- HTML
- CSS
- Javascript

## Para o teste temos os seguintes pontos:

- Visão geral

O problema consiste em receber um número através de uma requisição e implementar
um jogo para acertar este número através de palpites. Ao errar um palpite, irá ser informado se
o número obtido é maior ou menor do que o palpite feito. O palpite realizado ou status code de
erro de requisição devem ser exibidos na tela no formato de LED de 7 segmentos. O palpite
será obtido como entrada em um campo de texto, que deverá ser processado apenas quando o
botão ENVIAR for clicado.
