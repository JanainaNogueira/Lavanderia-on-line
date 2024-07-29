package br.net.lavanderia.crud.rest;

import java.util.ArrayList;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PostMapping;

  import br.net.lavanderia.crud.model.Roupa;

  import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;



  @CrossOrigin
  @RestController
public class RoupaREST {

      public static List <Roupa> listaRoupas = new ArrayList<>();

      @GetMapping("/Roupas")
      public ResponseEntity<List<Roupa>>getRoupas() {
          return ResponseEntity.ok(listaRoupas);
      }
      @GetMapping("/Roupas/{tipo}")
      public ResponseEntity<Roupa>getRoupaTipo(@PathVariable("tipo") String tipo){
        Roupa roupa=listaRoupas.stream().filter(rou->rou.getTipo().equals(tipo)).findAny().orElse(null);
          if(roupa==null){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
          }else{
            return ResponseEntity.ok(roupa);
          }
      }

      @PostMapping("/Roupas")
      public ResponseEntity<Roupa> inserir(@RequestBody Roupa roupa){
        Roupa roupaExiste = listaRoupas.stream()
        .filter(rou->rou.getTipo()
        .equals(roupa.getTipo())).findAny().orElse(null);
        if(roupaExiste != null){
          return ResponseEntity.status(HttpStatus.CONFLICT).build();
        }
        listaRoupas.add(roupa);
        return ResponseEntity.status(HttpStatus.CREATED).body(roupa);
      }

      @PutMapping("Roupas/{tipo}")
      public ResponseEntity<Roupa> alterar(
        @PathVariable("tipo") String tipo,
        @RequestBody Roupa roupaAtualizada) {
          Roupa roupaExist = listaRoupas.stream().filter(
            rou -> rou.getTipo().equals(tipo)
          ).findAny().orElse(null);
          if(roupaExist !=null){
            roupaExist.setTipo(roupaAtualizada.getTipo());
            roupaExist.setTempo(roupaAtualizada.getTempo());
            return ResponseEntity.ok(roupaExist);
          }else{
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
          }
      }

      @DeleteMapping("/Roupas/{tipo}")
      public ResponseEntity<Roupa> remover(
        @PathVariable("tipo") String tipo
      ){
        Roupa roupa = listaRoupas.stream().filter(
          rou->rou.getTipo().equals(tipo)
        ).findAny().orElse(null);

      if(roupa !=null){
        listaRoupas.removeIf(usu->usu.getTipo().equals(tipo));
        return ResponseEntity.ok(roupa);
      }else{
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
      }
    }
      static {
          listaRoupas.add(
              new Roupa ("calça", 5)
          );
          listaRoupas.add(new Roupa("camisa", 3));
      }
  }
