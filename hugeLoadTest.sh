#!/bin/bash

# Criar 100 itens em paralelo e consultar todos os itens e cada item individualmente após a criação
for i in {1..10}
do
  # Criar item
  autocannon -c 100 -d 5 -p 10 -m POST -b "{\"nome\": \"Vans Old Skool\", \"tamanho\": [\"37\", \"38\", \"39\", \"40\", \"41\"], \"preco\": 299.99, \"cor\": \"Preto/Branco\", \"categoria\": \"Tênis Casual\", \"imagem\": \"https://passarelacalcados.vteximg.com.br/arquivos/ids/5798858-440-660/tenis-casual-beira-rio-keds-preto-cor-preto-tamanho-34_0.webp?v=638763403978200000\"}" http://localhost:8000/api/v1/teste &
  
  # Consultar todos os itens após a criação
  autocannon -c 10 -d 5 -p 10 -m GET http://localhost:8000/api/v1/teste &

  # Consultar item individualmente após a criação
  autocannon -c 10 -d 5 -p 10 -m GET http://localhost:8000/api/v1/teste/item-$i &
done

# Espera todas as requisições de criação e consulta terminarem
wait

# Alterar 100 itens em paralelo e consultar todos os itens e cada item individualmente após a alteração
for i in {1..10}
do
  # Alterar item
  autocannon -c 100 -d 5 -p 10 -m PATCH -b '{"nome": "Vans Old Skool 2.0", "preco": 319.99}' http://localhost:8000/api/v1/teste/item-$i &
  
  # Consultar todos os itens após a alteração
  autocannon -c 10 -d 5 -p 10 -m GET http://localhost:8000/api/v1/teste &

  # Consultar item individualmente após a alteração
  autocannon -c 10 -d 5 -p 10 -m GET http://localhost:8000/api/v1/teste/item-$i &
done

# Espera todas as requisições de alteração e consulta terminarem
wait

# Deletar 100 itens em paralelo e consultar todos os itens e cada item individualmente após a deleção
for i in {1..10}
do
  # Deletar item
  autocannon -c 100 -d 5 -p 10 -m DELETE http://localhost:8000/api/v1/teste/item-$i &
  
  # Consultar todos os itens após a deleção
  autocannon -c 10 -d 5 -p 10 -m GET http://localhost:8000/api/v1/teste &

  # Consultar item individualmente após a deleção (deve retornar erro 404)
  autocannon -c 10 -d 5 -p 10 -m GET http://localhost:8000/api/v1/teste/item-$i &
done

# Espera todas as requisições de deleção e consulta terminarem
wait

# Consultar todos os itens após todas as requisições
autocannon -c 100 -d 10 -p 10 -m GET http://localhost:8000/api/v1/teste
