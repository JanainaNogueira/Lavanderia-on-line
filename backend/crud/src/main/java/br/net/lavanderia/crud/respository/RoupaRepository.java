package br.net.lavanderia.crud.respository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import br.net.lavanderia.crud.model.Roupa;


public interface RoupaRepository extends JpaRepository<Roupa, Integer> {
  public Roupa findById(int id);
  List<Roupa> findByTipo(String tipo);
}
