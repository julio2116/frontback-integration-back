#!/bin/bash

# Criar 100 itens
for i in {1..10}
do
  autocannon -c 10 -d 20 -p 10 -m POST -b "{\"nome\": \"Vans Old Skool\", \"tamanho\": [\"37\", \"38\", \"39\", \"40\", \"41\"], \"preco\": 299.99, \"cor\": \"Preto/Branco\", \"categoria\": \"Tênis Casual\", \"imagem\": \"https://passarelacalcados.vteximg.com.br/arquivos/ids/5798858-440-660/tenis-casual-beira-rio-keds-preto-cor-preto-tamanho-34_0.webp?v=638763403978200000\"}" http://localhost:8000/api/v1/teste
done

# Alterar 100 itens
for i in {1..10}
do
  autocannon -c 10 -d 20 -p 10 -m PATCH -b '{"nome": "Vans Old Skool 2.0", "preco": 319.99}' http://localhost:8000/api/v1/teste/item-$i
done

# Deletar 100 itens
for i in {1..10}
do
  autocannon -c 10 -d 20 -p 10 -m DELETE http://localhost:8000/api/v1/teste/item-$i
done

for i in {1..10}
do
  autocannon -c 10 -d 20 -p 10 -m GET http://localhost:8000/api/v1/teste/item-$i
done

for i in {1..10}
do
  autocannon -c 100 -d 20 -p 10 -m GET http://localhost:8000/api/v1/teste
done



