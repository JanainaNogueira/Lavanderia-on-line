package br.net.lavanderia.crud.rest;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
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

  @GetMapping("/Roupas/{tipo}")
  public ResponseEntity<Roupa> getRoupaTipo(@PathVariable("tipo") String tipo) {
    Roupa roupa = roupaRepository.findByTipo(tipo);
    if (roupa == null) {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    } else {
      return ResponseEntity.ok(roupa);
    }
  }

  @PostMapping("/Roupas")
  public ResponseEntity<Roupa> inserir(@RequestBody Roupa roupa) {
    Roupa roupaExiste = roupaRepository.findByTipo(roupa.getTipo());
    if (roupaExiste != null) {
      return ResponseEntity.status(HttpStatus.CONFLICT).build();
    }
    Roupa Result = roupaRepository.save(roupa);
    return ResponseEntity.status(HttpStatus.CREATED).body(Result);
  }

  @PutMapping("Roupas/{tipo}")
  public ResponseEntity<Roupa> alterar(
      @PathVariable("tipo") String tipo,
      @RequestBody Roupa roupaAtualizada) {
    Roupa roupaExist = roupaRepository.findByTipo(tipo);
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

  @DeleteMapping("/Roupas/{tipo}")
  public ResponseEntity<Roupa> remover(
      @PathVariable("tipo") String tipo) {
    Roupa roupa = roupaRepository.findByTipo(tipo);
    if (roupa != null) {
      roupa.setDescricao("DELETADO");
      roupaRepository.save(roupa);
      return ResponseEntity.ok(roupa);
    } else {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }
  }

}
