package br.net.lavanderia.crud.respository;

import org.springframework.data.jpa.repository.JpaRepository;

import br.net.lavanderia.crud.model.Funcionario;

public interface FuncionarioRepository extends JpaRepository<Funcionario, Integer> {

}