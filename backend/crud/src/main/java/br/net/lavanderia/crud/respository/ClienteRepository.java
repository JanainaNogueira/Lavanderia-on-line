package br.net.lavanderia.crud.respository;

import org.springframework.data.jpa.repository.JpaRepository;

import br.net.lavanderia.crud.model.Cliente;

public interface ClienteRepository extends JpaRepository<Cliente, Integer> {

}