package br.net.lavanderia.crud.rest;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import br.net.lavanderia.crud.model.ItemPedido;
import br.net.lavanderia.crud.model.Pedido;
import br.net.lavanderia.crud.respository.PedidoRepository;
import br.net.lavanderia.crud.respository.itemPedidoRepository;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

@CrossOrigin
@RestController
public class PedidoREST {
  @Autowired
  private PedidoRepository pedidoRepositoiry;
  @Autowired
  private itemPedidoRepository itemPRepository;

  @GetMapping("/Pedidos")
  public ResponseEntity<List<Pedido>> getPedidos() {
    return ResponseEntity.ok(pedidoRepositoiry.findAll());
  }

  @GetMapping("/Pedidos/{id}")
  public ResponseEntity<Pedido> getPedidoId(
      @PathVariable("id") int id) {
    Pedido pedido = pedidoRepositoiry.findById(id).orElse(null);
    if (pedido == null) {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    } else {
      return ResponseEntity.ok(pedido);
    }
  }

  @PostMapping("/Pedidos")
  public ResponseEntity<Pedido> inserir(@RequestBody Pedido pedido) {
    Pedido pedidoExite = pedidoRepositoiry.findById(pedido.getId()).orElse(null);
    if (pedidoExite != null) {
      return ResponseEntity.status(HttpStatus.CONFLICT).build();
    }
    Pedido pedidoReturn = pedidoRepositoiry.save(pedido);
    for (ItemPedido itP : pedido.getRoupas()) {
      itP.setPedido(pedidoReturn);
      itemPRepository.save(itP);
    }
    return ResponseEntity.status(HttpStatus.CREATED).body(pedidoReturn);
  }

  @PutMapping("/Pedido/{id}")
  public ResponseEntity<Pedido> alterar(
      @PathVariable("id") int id,
      @RequestBody Pedido pedidoAtualizado) {
    Pedido pedidoExist = pedidoRepositoiry.findById(id).orElse(null);
    if (pedidoExist != null) {
      pedidoExist.setStatus(pedidoAtualizado.getStatus());
      pedidoRepositoiry.save(pedidoExist);
      return ResponseEntity.ok(pedidoExist);
    } else {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }
  }

  @DeleteMapping("/Pedido/{id}")
  public ResponseEntity<Pedido> remover(
      @PathVariable("id") int id) {
    Pedido pedido = pedidoRepositoiry.findById(id).orElse(null);
    if (pedido != null) {
      pedido.setStatus("DELETADO");
      pedidoRepositoiry.save(pedido);
      return ResponseEntity.ok(pedido);
    } else {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }
  }

}
