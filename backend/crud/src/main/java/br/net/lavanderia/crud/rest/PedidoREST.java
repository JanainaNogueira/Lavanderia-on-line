package br.net.lavanderia.crud.rest;

import java.util.ArrayList;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import br.net.lavanderia.crud.model.ItemPedido;
import br.net.lavanderia.crud.model.Pedido;
import br.net.lavanderia.crud.model.Roupa;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;


@CrossOrigin
@RestController
public class PedidoREST {
    public static List<Pedido> listaPedido = new ArrayList<>();
    @GetMapping("/Pedidos")
      public ResponseEntity<List<Pedido>>getPedidos() {
          return ResponseEntity.ok(listaPedido);
      }
    @GetMapping("/Pedidos/{id}")
    public ResponseEntity<Pedido>getPedidoId(
      @PathVariable("id")
      int id){
        Pedido pedido = listaPedido.stream().filter(
          rou->rou.getId()==id).findAny().orElse(null);
          if(pedido==null){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
          }else{
            return ResponseEntity.ok(pedido);
          }
    }
    @PostMapping("/Pedidos")
    public ResponseEntity<Pedido>inserir(@RequestBody Pedido pedido){
      Pedido pedidoExite = listaPedido.stream()
      .filter(ped->ped.getId() == pedido.getId())
      .findAny().orElse(null);
      if(pedidoExite != null){
        return ResponseEntity.status(HttpStatus.CONFLICT).build();
      }
      listaPedido.add(pedido);
      return ResponseEntity.status(HttpStatus.CREATED).body(pedido);
    }

    @PutMapping("/Pedido/{id}")
      public ResponseEntity<Pedido> alterar(
        @PathVariable("id") int id,
        @RequestBody Pedido pedidoAtualizado) {
          Pedido pedidoExist = listaPedido.stream().filter(
            ped -> ped.getId() == id
          ).findAny().orElse(null);
          if(pedidoExist !=null){
            pedidoExist.setValor(pedidoAtualizado.getValor());
            pedidoExist.setPrazo(pedidoAtualizado.getPrazo());
            pedidoExist.setRoupas(pedidoAtualizado.getRoupas());
            pedidoExist.setHora(pedidoAtualizado.getHora());
            pedidoExist.setStatus(pedidoAtualizado.getStatus());
            pedidoExist.setData(pedidoAtualizado.getData());
            pedidoExist.setClienteId(pedidoAtualizado.getClienteId());
            return ResponseEntity.ok(pedidoExist);
          }else{
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
          }
      }
      @DeleteMapping("/Pedido/{id}")
      public ResponseEntity<Pedido> remover(
        @PathVariable("id") int id
      ){
        Pedido pedido = listaPedido.stream().filter(
          ped->ped.getId()==id
        ).findAny().orElse(null);

      if(pedido !=null){
        listaPedido.removeIf(ped->ped.getId()== id);
        return ResponseEntity.ok(pedido);
      }else{
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
      }
    }

    static {
      // Criando instâncias de Roupa
        Roupa calca = new Roupa("calça", 5);
        Roupa camisa = new Roupa("camisa", 3);

        // Criando instâncias de ItemPedido
        ItemPedido itemCalca = new ItemPedido(calca, 2);
        ItemPedido itemCamisa = new ItemPedido(camisa, 1);

        // Criando pedidos e adicionando diretamente à lista
        listaPedido.add(
          new Pedido(1, 50.0, 3, List.of(itemCalca, itemCamisa), "12:00", "Pendente", "2024-07-25", 1)
        );
        listaPedido.add(
          new Pedido(2, 30.0, 2, List.of(itemCalca), "14:00", "Pendente", "2024-07-26", 2)
        );
        }
}
