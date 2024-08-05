package br.net.lavanderia.crud.rest;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PostMapping;
import br.net.lavanderia.crud.model.Roupa;
import br.net.lavanderia.crud.respository.RoupaRepository;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

@CrossOrigin
@RestController
public class RoupaREST {

  @Autowired
  private RoupaRepository roupaRepository;

  @GetMapping("/Roupas")
  public ResponseEntity<List<Roupa>> getRoupas() {
    return ResponseEntity.ok(roupaRepository.findAll());
  }

  @GetMapping("/Roupas/{id}")
  public ResponseEntity<Roupa> getRoupaId(@PathVariable("id") Integer id) {
    Roupa roupa = roupaRepository.findById(id).orElse(null);
    if (roupa == null) {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    } else {
      return ResponseEntity.ok(roupa);
    }
  }

  @PostMapping("/Roupas")
  public ResponseEntity<Roupa> inserir(@RequestBody Roupa novaRoupa) {
    try {
      if (novaRoupa.getTipo() == null || novaRoupa.getTipo().isEmpty()) {
        return ResponseEntity.badRequest().body(null);
      }
      if (novaRoupa.getTempo() <= 0 || novaRoupa.getPrecoRoupa() <= 0) {
        return ResponseEntity.badRequest().body(null);
      }

      Roupa result = roupaRepository.save(novaRoupa);

      return new ResponseEntity<>(result, HttpStatus.CREATED);
    } catch (DataAccessException e) {
      return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @PutMapping("Roupas/{id}")
  public ResponseEntity<Roupa> alterar(
      @PathVariable("id") Integer id,
      @RequestBody Roupa roupaAtualizada) {
    Roupa roupaExist = roupaRepository.findById(id).orElse(null);
    if (roupaExist != null) {
      roupaExist.setTipo(roupaAtualizada.getTipo());
      roupaExist.setTempo(roupaAtualizada.getTempo());
      roupaExist.setDescricao(roupaAtualizada.getDescricao());
      roupaExist.setPrecoRoupa(roupaAtualizada.getPrecoRoupa());
      roupaRepository.save(roupaExist);
      return ResponseEntity.ok(roupaExist);
    } else {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }
  }

  @DeleteMapping("/Roupas/{id}")
  public ResponseEntity<Roupa> remover(
      @PathVariable("id") Integer id) {
    Roupa roupa = roupaRepository.findById(id).orElse(null);
    if (roupa != null) {
      roupa.setDescricao("DELETADO");
      roupaRepository.save(roupa);
      return ResponseEntity.ok(roupa);
    } else {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }
  }

}
