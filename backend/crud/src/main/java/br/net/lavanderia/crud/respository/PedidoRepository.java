package br.net.lavanderia.crud.respository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import br.net.lavanderia.crud.model.Login;
import br.net.lavanderia.crud.model.Pedido;
import br.net.lavanderia.crud.model.Roupa;
import java.util.List;

public interface PedidoRepository extends JpaRepository<Pedido, Integer> {
}