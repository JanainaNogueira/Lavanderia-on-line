package br.net.lavanderia.crud.respository;

import org.springframework.data.jpa.repository.JpaRepository;

import br.net.lavanderia.crud.model.Pedido;

public interface PedidoRepository extends JpaRepository<Pedido, Integer> {
}