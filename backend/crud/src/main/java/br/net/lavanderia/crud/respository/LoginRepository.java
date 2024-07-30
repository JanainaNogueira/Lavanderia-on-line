package br.net.lavanderia.crud.respository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import br.net.lavanderia.crud.model.Login;

public interface LoginRepository extends JpaRepository<Login, Integer> {
  public Optional<Login> findBylogin(String login);

  public Optional<Login> findByLoginAndSenha(String email, String senha);
}