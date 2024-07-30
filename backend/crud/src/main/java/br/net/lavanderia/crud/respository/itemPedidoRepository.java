package br.net.lavanderia.crud.respository;

import org.springframework.data.jpa.repository.JpaRepository;

import br.net.lavanderia.crud.model.ItemPedido;

public interface itemPedidoRepository extends JpaRepository<ItemPedido, Integer> {
}